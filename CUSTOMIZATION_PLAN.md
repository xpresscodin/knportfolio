# Customization Implementation Plan

## Repository findings
- Framework: Vite + React 18 single page application.
- Routing: `react-router-dom` browser routing.
- Styling: Tailwind CSS plus global CSS in `src/index.css`.
- Current data: hardcoded React pages/components and static assets in `public/assets`.
- Deployment: Vercel, configured with `vercel.json`.
- Existing CMS/storage: none.

## Architecture
1. Replace hardcoded public rendering with a site document loaded from published editable content.
2. Add a protected `/admin` editor with dashboard, pages, navigation, media, theme, header, footer, settings, preview, and publish tools.
3. Store content through Vercel-compatible API routes:
   - Production: Upstash/Vercel KV REST for draft/published site documents.
   - Media: Vercel Blob when `BLOB_READ_WRITE_TOKEN` is configured.
   - Local fallback: seed data and browser IndexedDB only for local development demos, not recommended for production.
4. Use a typed data model in `src/types/site.js` via JSDoc-friendly structures and validation helpers.
5. Use safe rich text sanitization and file validation.
6. Keep draft and published content separated.

## Implementation phases
- Phase 1: Data model, seed content, storage API, validation, theme tokens.
- Phase 2: Dynamic public renderer for pages, sections, navigation, header, footer, media, documents, and presentations.
- Phase 3: Admin editor with beginner-friendly controls for pages, sections, menus, media, theme, header/footer, settings, preview, and publish.
- Phase 4: Documentation, env setup, verification, commit, and PR.

## Production setup
Configure Vercel environment variables listed in `.env.example`. Published content should use KV; uploaded files should use Blob. Without those services, the app can be explored locally but edits are not production-persistent.
