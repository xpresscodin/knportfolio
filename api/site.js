import { seedSite } from '../src/lib/site-data/seed.js'
const keyFor = (mode) => `knportfolio:${mode === 'draft' ? 'draft' : 'published'}`
async function kv(cmd) {
  const url = process.env.KV_REST_API_URL, token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  const r = await fetch(`${url}/${cmd.map(encodeURIComponent).join('/')}`, { headers: { Authorization: `Bearer ${token}` } })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}
function authed(req) { return req.headers.cookie?.includes('editor_auth=ok') }
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
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      await kv(['set', keyFor(body.mode), JSON.stringify(body.site)])
      return res.status(200).json({ ok: true })
    }
    res.status(405).json({ error: 'Method not allowed' })
  } catch (e) { res.status(500).json({ error: e.message }) }
}
