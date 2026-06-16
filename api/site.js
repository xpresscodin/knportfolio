import { seedSite } from '../src/lib/site-data/seed.js'

const keyFor = (mode) => `knportfolio:${mode === 'draft' ? 'draft' : 'published'}`
const hasKv = () => Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

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
      const data = await kv(['get', keyFor(mode)])
      return res.status(200).json(data?.result ? JSON.parse(data.result) : seedSite)
    }

    if (req.method === 'POST') {
      if (!authed(req)) return res.status(401).json({ error: 'Please sign in to save.' })
      if (!hasKv()) return res.status(503).json({ error: 'Production content storage is not configured. Add KV_REST_API_URL and KV_REST_API_TOKEN in Vercel. Local editor fallback will be used in this browser.' })
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      await kv(['set', keyFor(body.mode), JSON.stringify(body.site)])
      return res.status(200).json({ ok: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
