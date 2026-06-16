export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  if (!process.env.ADMIN_PASSWORD || body.password !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Wrong password.' })
  res.setHeader('Set-Cookie', 'editor_auth=ok; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400')
  res.status(200).json({ ok: true })
}
