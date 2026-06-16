import ButtonLink from '../site/ButtonLink'
import { sanitizeRichText } from '../../lib/validation/sanitize'
const mediaById = (site,id) => site.media?.find(m=>m.id===id)
function MediaCard({ asset, style='card' }) {
  if (!asset) return <p className="text-sm text-gray-500">Choose a file in the editor.</p>
  if (asset.type === 'image') return <figure><img src={asset.url} alt={asset.alt || asset.title} className="max-h-[520px] w-full rounded-[var(--radius)] object-cover"/><figcaption className="mt-2 text-sm text-gray-500">{asset.caption}</figcaption></figure>
  if (asset.type === 'pdf' && style === 'embed') return <iframe src={asset.url} title={asset.title} className="h-[70vh] w-full rounded-[var(--radius)] border" />
  return <div className="rounded-[var(--radius)] border bg-white p-5 shadow-sm"><p className="text-xs uppercase tracking-wide text-gray-500">{asset.type === 'presentation' ? 'PowerPoint / presentation' : asset.type}</p><h3 className="text-xl font-bold">{asset.title}</h3><p className="mt-2 text-gray-600">{asset.caption || (asset.type === 'presentation' ? 'Preview may not be available in every browser. Open or download the file safely.' : 'Open or download this file.')}</p><div className="mt-4 flex gap-3"><a className="rounded-full bg-[var(--primary)] px-4 py-2 text-white" href={asset.url} target="_blank" rel="noopener noreferrer">Open</a><a className="rounded-full border px-4 py-2" href={asset.url} download>Download</a></div></div>
}
export default function SectionRenderer({ section, site }) {
  if (!section || section.hidden) return null
  const c = section.content || {}, img = mediaById(site,c.imageId)
  const pad = section.padding === 'large' ? 'py-16' : section.padding === 'small' ? 'py-4' : 'py-8'
  return <section className={`${pad} px-4`} style={{ background: section.background || 'transparent' }}><div className="mx-auto max-w-5xl">
    {section.type === 'hero' && <div className="grid gap-8 md:grid-cols-2 md:items-center"><div><h1 className="text-4xl font-extrabold md:text-6xl">{section.title}</h1><p className="mt-4 text-lg text-gray-600">{c.text}</p><div className="mt-6 flex flex-wrap gap-3">{c.buttons?.map(b=><ButtonLink key={b.id} button={b} media={site.media}/>)}</div></div>{img && <MediaCard asset={img}/>}</div>}
    {['text','contact'].includes(section.type) && <div><h2 className="text-3xl font-bold">{section.title}</h2><p className="mt-3 whitespace-pre-wrap text-gray-700">{c.text}</p><div className="mt-5 flex flex-wrap gap-3">{c.buttons?.map(b=><ButtonLink key={b.id} button={b} media={site.media}/>)}</div></div>}
    {section.type === 'richText' && <article className="prose max-w-none"><h2>{section.title}</h2><div dangerouslySetInnerHTML={{ __html: sanitizeRichText(c.richText) }} /></article>}
    {section.type === 'image' && <MediaCard asset={img}/>} 
    {section.type === 'textImage' && <div className="grid gap-8 md:grid-cols-2"><div><h2 className="text-3xl font-bold">{section.title}</h2><p className="mt-3 text-gray-700">{c.text}</p></div><MediaCard asset={img}/></div>}
    {section.type === 'gallery' && <div><h2 className="text-3xl font-bold">{section.title}</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{c.mediaIds?.map(id=><MediaCard key={id} asset={mediaById(site,id)}/>)}</div></div>}
    {section.type === 'cards' && <div><h2 className="text-3xl font-bold">{section.title}</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{(c.cards||[]).map(card=>{ const body=<><h3 className="font-bold">{card.title}</h3><p className="mt-2 text-sm text-gray-600">{card.text}</p></>; return card.href ? <a key={card.id} href={card.href} className="rounded-[var(--radius)] border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">{body}</a> : <div key={card.id} className="rounded-[var(--radius)] border bg-white p-5 shadow-sm">{body}</div>})}</div></div>}
    {section.type === 'buttons' && <div className="flex flex-wrap justify-center gap-3">{c.buttons?.map(b=><ButtonLink key={b.id} button={b} media={site.media}/>)}</div>}
    {section.type === 'document' && <div><h2 className="text-3xl font-bold">{section.title}</h2><p className="mt-2 text-gray-600">{c.text}</p><div className="mt-6 grid gap-4 md:grid-cols-2">{c.mediaIds?.map(id=><MediaCard key={id} asset={mediaById(site,id)} style={c.displayStyle}/>)}</div></div>}
    {section.type === 'video' && <div><h2 className="text-3xl font-bold">{section.title}</h2><iframe className="mt-4 aspect-video w-full rounded-[var(--radius)] border" src={c.embedUrl || 'about:blank'} sandbox="allow-scripts allow-same-origin allow-presentation" title={section.title}/></div>}
    {section.type === 'spacer' && <div style={{height: c.height || 48}}/>}
  </div></section>
}
