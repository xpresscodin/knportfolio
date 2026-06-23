import ButtonLink from '../site/ButtonLink'
import { sanitizeRichText } from '../../lib/validation/sanitize'

const mediaById = (site, id) => site.media?.find((m) => m.id === id)

function Editable({ as: Tag = 'div', value, className, onChange, multiline = false }) {
  return <Tag className={className} contentEditable suppressContentEditableWarning onBlur={(e) => onChange?.(multiline ? e.currentTarget.innerText : e.currentTarget.textContent)}>{value}</Tag>
}

function MediaCard({ asset, style = 'card' }) {
  if (!asset) return <p className="rounded-xl border border-dashed p-6 text-sm text-gray-500">Choose a file in the media library.</p>
  if (asset.type === 'image') return <figure><img src={asset.url} alt={asset.alt || asset.title} className="max-h-[520px] w-full rounded-[var(--radius)] object-cover" /><figcaption className="mt-2 text-sm text-gray-500">{asset.caption}</figcaption></figure>
  if (asset.type === 'pdf' && style === 'embed') return <iframe src={asset.url} title={asset.title} className="h-[70vh] w-full rounded-[var(--radius)] border" />
  return <div className="rounded-[var(--radius)] border bg-white p-5 shadow-sm"><p className="text-xs uppercase tracking-wide text-gray-500">{asset.type === 'presentation' ? 'PowerPoint / presentation' : asset.type}</p><h3 className="text-xl font-bold">{asset.title}</h3><p className="mt-2 text-gray-600">{asset.caption || 'Open or download this file.'}</p><div className="mt-4 flex gap-3"><a className="rounded-full bg-[var(--primary)] px-4 py-2 text-white" href={asset.url} target="_blank" rel="noopener noreferrer">Open</a><a className="rounded-full border px-4 py-2" href={asset.url} download>Download</a></div></div>
}

export default function SectionRenderer({ section, site, editorMode = false, selected = false, onSelect, onInlineEdit }) {
  if (!section || section.hidden) return null
  const c = section.content || {}, img = mediaById(site, c.imageId)
  const pad = section.padding === 'large' ? 'py-16' : section.padding === 'small' ? 'py-4' : 'py-8'
  const title = editorMode ? <Editable as="h2" value={section.title} onChange={(v) => onInlineEdit?.('title', v)} className="text-3xl font-bold outline-none" /> : <h2 className="text-3xl font-bold">{section.title}</h2>
  const text = editorMode ? <Editable as="p" multiline value={c.text} onChange={(v) => onInlineEdit?.('content.text', v)} className="mt-3 whitespace-pre-wrap text-gray-700 outline-none" /> : <p className="mt-3 whitespace-pre-wrap text-gray-700">{c.text}</p>
  return <section onClick={(e) => { if (editorMode) { e.stopPropagation(); onSelect?.() } }} className={`${pad} group relative px-4 ${editorMode ? 'cursor-pointer rounded-2xl transition hover:outline hover:outline-2 hover:outline-sky-300' : ''} ${selected ? 'outline outline-2 outline-sky-500' : ''}`} style={{ background: section.background || 'transparent' }}>
    {editorMode && <div className="absolute right-3 top-3 z-10 hidden gap-1 rounded-full bg-slate-900 p-1 text-xs text-white shadow group-hover:flex"><span className="px-2 py-1">Move</span><span className="px-2 py-1">Edit</span><span className="px-2 py-1">Duplicate</span><span className="px-2 py-1">Delete</span></div>}
    <div className="mx-auto max-w-5xl">
      {section.type === 'hero' && <div className="grid gap-8 md:grid-cols-2 md:items-center"><div>{editorMode ? <Editable as="h1" value={section.title} onChange={(v) => onInlineEdit?.('title', v)} className="text-4xl font-extrabold outline-none md:text-6xl" /> : <h1 className="text-4xl font-extrabold md:text-6xl">{section.title}</h1>}{text}<div className="mt-6 flex flex-wrap gap-3">{c.buttons?.map((b) => <ButtonLink key={b.id} button={b} media={site.media} />)}</div></div><MediaCard asset={img} /></div>}
      {['text', 'contact', 'testimonials', 'timeline', 'accordion'].includes(section.type) && <div>{title}{text}<div className="mt-5 flex flex-wrap gap-3">{c.buttons?.map((b) => <ButtonLink key={b.id} button={b} media={site.media} />)}</div></div>}
      {section.type === 'richText' && <article className="prose max-w-none">{title}<div dangerouslySetInnerHTML={{ __html: sanitizeRichText(c.richText) }} /></article>}
      {section.type === 'image' && <MediaCard asset={img} />}
      {section.type === 'gallery' && <div>{title}<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{c.mediaIds?.map((id) => <MediaCard key={id} asset={mediaById(site, id)} />)}</div></div>}
      {section.type === 'cards' && <div>{title}<div className="mt-6 grid gap-4 md:grid-cols-3">{(c.cards || []).map((card, i) => <div key={card.id} className="rounded-[var(--radius)] border bg-white p-5 shadow-sm"><Editable as="h3" value={card.title} onChange={(v) => onInlineEdit?.(`content.cards.${i}.title`, v)} className="font-bold outline-none" /><Editable as="p" value={card.text} onChange={(v) => onInlineEdit?.(`content.cards.${i}.text`, v)} className="mt-2 text-sm text-gray-600 outline-none" /></div>)}</div></div>}
      {section.type === 'buttons' && <div className="flex flex-wrap justify-center gap-3">{c.buttons?.map((b) => <ButtonLink key={b.id} button={b} media={site.media} />)}</div>}
      {section.type === 'document' && <div>{title}{text}<div className="mt-6 grid gap-4 md:grid-cols-2">{c.mediaIds?.map((id) => <MediaCard key={id} asset={mediaById(site, id)} style={c.displayStyle} />)}</div></div>}
      {section.type === 'video' && <div>{title}<iframe className="mt-4 aspect-video w-full rounded-[var(--radius)] border" src={c.embedUrl || 'about:blank'} sandbox="allow-scripts allow-same-origin allow-presentation" title={section.title} /></div>}
      {section.type === 'spacer' && <div style={{ height: c.height || 48 }} />}
    </div>
  </section>
}
