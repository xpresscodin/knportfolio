# Editor Guide

## Opening the editor
1. Visit `/admin`.
2. Enter the private `ADMIN_PASSWORD` configured in Vercel.
3. Use plain-language tabs: Dashboard, Pages, Menu, Media, Design, Header, Footer, Settings, Publish.

## Pages
- Add, duplicate, hide, delete, and edit pages from **Pages**.
- Change the page title, URL, SEO title, SEO description, and background.
- Add sections such as hero, rich text, image, gallery, cards, buttons, document, video, contact, and spacer.
- Use section controls to edit text, rich text, images/files, backgrounds, buttons, and order.

## Menus and buttons
- Use **Navigation** to add menu items, submenu items, and navigation buttons.
- Set each label and link. External links should start with `https://`.

## Media
- Existing files can be selected by page sections.
- Upload validation only allows images, PDFs, Word/text documents, PowerPoint files, and MP4 video up to 25 MB.
- Production uploads require connecting `/api/upload.js` to Vercel Blob or another compatible storage provider using `BLOB_READ_WRITE_TOKEN`.
- PowerPoint preview is browser-dependent. The public site shows a safe card with Open and Download actions when embedded preview is unavailable.

## Design
- Use **Theme** to change fonts, colors, backgrounds, button colors, radius, card style, and spacing tokens.
- Public pages read these values as CSS variables.

## Preview and publish
- **Save draft** stores work separately from the live public site.
- **Preview** opens `/preview` to review draft content.
- **Publish** copies the draft to published content.

## Security notes
- Rich text is sanitized before rendering.
- Admin save and upload API routes require an HttpOnly editor cookie.
- Do not put private contact details in published content unless you want them visible.
