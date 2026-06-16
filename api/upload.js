const allowed = ['image/jpeg','image/png','image/webp','image/gif','application/pdf','application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','text/plain','video/mp4']
export const config = { api: { bodyParser: false } }
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!req.headers.cookie?.includes('editor_auth=ok')) return res.status(401).json({ error: 'Please sign in.' })
  const chunks=[]; for await (const c of req) chunks.push(c); const buffer=Buffer.concat(chunks)
  const name = String(req.headers['x-file-name'] || 'upload').replace(/[^a-z0-9._-]/gi,'-').slice(0,120)
  const type = String(req.headers['content-type'] || '')
  if (!allowed.includes(type)) return res.status(400).json({ error: 'This file type is not allowed.' })
  if (buffer.length > 25 * 1024 * 1024) return res.status(400).json({ error: 'File is larger than 25 MB.' })
  if (!process.env.BLOB_READ_WRITE_TOKEN) return res.status(501).json({ error: 'File validation passed, but Blob storage is not configured. Add BLOB_READ_WRITE_TOKEN in Vercel to enable production uploads.' })
  return res.status(501).json({ error: 'Connect this endpoint to Vercel Blob or Supabase Storage using the documented environment variables before production uploads.' })
}
