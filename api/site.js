import { neon } from '@neondatabase/serverless'
import { seedSite } from '../src/lib/site-data/seed.js'

const keyFor = (mode) => `knportfolio:${mode === 'draft' ? 'draft' : 'published'}`
const hasKv = () => Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
const databaseUrl = () => process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING || ''
const hasDatabase = () => Boolean(databaseUrl())

let sqlClient
function db() {
  if (!sqlClient) sqlClient = neon(databaseUrl())
  return sqlClient
}

async function ensureTables() {
  await db()`
    create table if not exists site_documents (
      mode text primary key,
      data jsonb not null,
      updated_at timestamptz not null default now()
    )
  `
}

async function readFromDatabase(mode) {
  await ensureTables()
  const rows = await db()`select data from site_documents where mode = ${mode} limit 1`
  return rows[0]?.data || null
}

async function writeToDatabase(mode, site) {
  await ensureTables()
  await db()`
    insert into site_documents (mode, data, updated_at)
    values (${mode}, ${JSON.stringify(site)}::jsonb, now())
    on conflict (mode) do update set data = excluded.data, updated_at = now()
  `
}

async function kv(cmd) {
  if (!hasKv()) return null
  const r = await fetch(`${process.env.KV_REST_API_URL}/${cmd.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

function authed(req) {
  return req.headers.cookie?.includes('editor_auth=ok')
}

export default async function handler(req, res) {
  const mode = req.query.mode === 'draft' ? 'draft' : 'published'
  if (mode === 'draft' && !authed(req)) return res.status(401).json({ error: 'Please sign in to edit.' })

  try {
    if (req.method === 'GET') {
      if (hasDatabase()) {
        const data = await readFromDatabase(mode)
        return res.status(200).json(data || seedSite)
      }

      const data = await kv(['get', keyFor(mode)])
      return res.status(200).json(data?.result ? JSON.parse(data.result) : seedSite)
    }

    if (req.method === 'POST') {
      if (!authed(req)) return res.status(401).json({ error: 'Please sign in to save.' })
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

      if (hasDatabase()) {
        await writeToDatabase(body.mode, body.site)
        return res.status(200).json({ ok: true, storage: 'neon' })
      }

      if (!hasKv()) return res.status(503).json({ error: 'Production content storage is not configured. Connect Neon or add KV_REST_API_URL and KV_REST_API_TOKEN in Vercel. Local editor fallback will be used in this browser.' })
      await kv(['set', keyFor(body.mode), JSON.stringify(body.site)])
      return res.status(200).json({ ok: true, storage: 'kv' })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
