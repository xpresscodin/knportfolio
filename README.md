# Editable Portfolio Website

This is a Vite + React + Tailwind website transformed into a customizable website builder/editor.

## Stack
- Vite React SPA
- React Router browser routing
- Tailwind CSS
- Vercel serverless API routes for admin auth and content storage
- Upstash/Vercel KV REST recommended for draft/published content persistence
- Vercel Blob or compatible object storage recommended for media uploads

## Run locally
```bash
npm install
npm run dev
```
Open `http://localhost:5173`.

## Editor access
Open `/admin`. Set `ADMIN_PASSWORD` in Vercel for production. Local Vite development falls back to demo IndexedDB content if API routes are unavailable.

## Environment variables
See `.env.example`:
- `ADMIN_PASSWORD` - private editor password.
- `KV_REST_API_URL` and `KV_REST_API_TOKEN` - production content storage.
- `BLOB_READ_WRITE_TOKEN` - production file storage token.
- `VITE_EDITOR_DEMO_MODE` - local demo helper only.

## Editing workflow
1. Open `/admin`.
2. Create/edit pages, sections, menus, buttons, media metadata, theme, header, footer, and site settings.
3. Click **Save draft**.
4. Open **Preview** (`/preview`).
5. Click **Publish** when ready.

## Deployment to Vercel
1. Add environment variables in Vercel Project Settings.
2. Deploy normally with Vercel. `vercel.json` rewrites SPA routes to `index.html` while keeping API routes available.
3. Configure KV before relying on production persistence.
4. Connect `/api/upload.js` to your selected object storage provider before enabling production uploads.

## Known limitations
- PowerPoint files do not preview natively in every browser; the renderer provides Open and Download fallback cards.
- If KV variables are missing, published server content falls back to seed content and local editor changes are only stored in browser IndexedDB for demo purposes.
- The upload endpoint validates files but must be connected to Vercel Blob/Supabase Storage for permanent production uploads.
