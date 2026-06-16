import { put } from '@vercel/blob'

const allowed = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'video/mp4',
]

const MAX_FILE_SIZE = 25 * 1024 * 1024

export const config = { api: { bodyParser: false } }

function fileKind(mime = '') {
  if (mime.startsWith('image/')) return 'image'
  if (mime === 'application/pdf') return 'pdf'
  if (mime.includes('presentation') || mime.includes('powerpoint')) return 'presentation'
  if (mime.includes('word') || mime === 'text/plain') return 'document'
  if (mime.startsWith('video/')) return 'video'
  return 'other'
}

function safeName(name = 'upload') {
  const cleaned = String(name).replace(/[^a-z0-9._-]/gi, '-').replace(/-+/g, '-').slice(0, 120)
  return cleaned || `upload-${Date.now()}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!req.headers.cookie?.includes('editor_auth=ok')) return res.status(401).json({ error: 'Please sign in before uploading files.' })

  // Add BLOB_READ_WRITE_TOKEN in Vercel Project Settings > Environment Variables,
  // or connect a Vercel Blob store to this project so Vercel injects the token.
  // This token is read only on the server and is never exposed to the browser bundle.
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({
      error: 'Blob storage is not configured. In Vercel, connect a Blob store or add BLOB_READ_WRITE_TOKEN in Project Settings → Environment Variables, then redeploy.',
      code: 'BLOB_NOT_CONFIGURED',
    })
  }

  try {
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    const buffer = Buffer.concat(chunks)
    const type = String(req.headers['content-type'] || '')
    const originalName = safeName(req.headers['x-file-name'] || 'upload')

    if (!buffer.length) return res.status(400).json({ error: 'Choose a file before uploading.' })
    if (!allowed.includes(type)) return res.status(400).json({ error: 'This file type is not allowed. Use images, PDFs, Word documents, PowerPoints, text files, or MP4 videos.' })
    if (buffer.length > MAX_FILE_SIZE) return res.status(400).json({ error: 'File is larger than 25 MB. Please upload a smaller file.' })

    const pathname = `media/${Date.now()}-${originalName}`
    const blob = await put(pathname, buffer, {
      access: 'public',
      contentType: type,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: true,
    })

    return res.status(200).json({
      id: crypto.randomUUID?.() || `${Date.now()}-${originalName}`,
      title: originalName,
      url: blob.url,
      downloadUrl: blob.downloadUrl || blob.url,
      pathname: blob.pathname,
      type: fileKind(type),
      mimeType: type,
      size: buffer.length,
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Upload failed. Please try again.' })
  }
}
