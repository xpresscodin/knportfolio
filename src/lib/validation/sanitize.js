const allowedTags = ['p','br','strong','b','em','i','u','ul','ol','li','a','h1','h2','h3','h4','blockquote','span']
export function sanitizeRichText(html='') {
  const doc = new DOMParser().parseFromString(String(html), 'text/html')
  doc.body.querySelectorAll('*').forEach((el) => {
    const tag = el.tagName.toLowerCase()
    if (!allowedTags.includes(tag)) { el.replaceWith(...el.childNodes); return }
    ;[...el.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase()
      if (name.startsWith('on') || name === 'style') el.removeAttribute(attr.name)
      if (tag === 'a' && name === 'href') {
        const value = attr.value.trim()
        if (!/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(value)) el.removeAttribute('href')
        else { el.setAttribute('rel','noopener noreferrer'); if (/^https?:\/\//i.test(value)) el.setAttribute('target','_blank') }
      } else if (tag !== 'a' && name !== 'class') el.removeAttribute(attr.name)
    })
  })
  return doc.body.innerHTML
}
export function safeHref(href='/') { return /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(href) ? href : '/' }
export const allowedMimes = ['image/jpeg','image/png','image/webp','image/gif','application/pdf','application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','text/plain','video/mp4']
export function fileKind(mime='') { if (mime.startsWith('image/')) return 'image'; if (mime === 'application/pdf') return 'pdf'; if (mime.includes('presentation') || mime.includes('powerpoint')) return 'presentation'; if (mime.includes('word') || mime === 'text/plain') return 'document'; if (mime.startsWith('video/')) return 'video'; return 'other' }
