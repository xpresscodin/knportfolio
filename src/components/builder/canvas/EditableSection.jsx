import ButtonLink from '../../site/ButtonLink'
import { sanitizeRichText } from '../../../lib/validation/sanitize'
import InlineText from './InlineText'
import SectionControls from './SectionControls'

const mediaById = (site, id) => site.media?.find((item) => item.id === id)
function MediaPreview({ asset }) {
  if (!asset) return <div className="grid min-h-48 place-items-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 text-sm font-bold text-slate-500">Click section, then choose media in the inspector or Media tab</div>
  if (asset.type === 'image') return <img src={asset.url} alt={asset.alt || asset.title} className="max-h-[520px] w-full rounded-3xl object-cover shadow" />
  return <div className="rounded-3xl border bg-white p-6 shadow"><div className="text-4xl">{asset.type === 'pdf' ? '📄' : asset.type === 'video' ? '🎬' : '📎'}</div><h3 className="mt-3 text-xl font-black">{asset.title}</h3><a className="mt-4 inline-block rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white" href={asset.url} target="_blank">Open file</a></div>
}
export default function EditableSection({ site, section, index, count, selected, onSelect, onMoveUp, onMoveDown, onDuplicate, onDelete, inlineEdit, moveSection, cardAction }) {
  if (!section || section.hidden) return null
  const content = section.content || {}
  const image = mediaById(site, content.imageId)
  const padding = section.padding === 'large' ? 'py-20' : section.padding === 'small' ? 'py-8' : 'py-12'
  const shell = `group relative px-6 ${padding} transition ${selected ? 'ring-4 ring-sky-500 ring-inset' : 'hover:ring-2 hover:ring-sky-300 hover:ring-inset'}`
  const title = <InlineText as="h2" value={section.title} onChange={(value) => inlineEdit('title', value)} className="text-3xl font-black text-slate-950" />
  const paragraph = <InlineText as="p" multiline value={content.text || ''} onChange={(value) => inlineEdit('content.text', value)} className="mt-4 max-w-3xl whitespace-pre-wrap text-lg leading-8 text-slate-600" />
  return <section draggable onDragStart={(event) => event.dataTransfer.setData('canvas/section-index', index)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { const from = Number(event.dataTransfer.getData('canvas/section-index')); if (!Number.isNaN(from) && from !== index) moveSection(from, index) }} onClick={(event) => { event.stopPropagation(); onSelect() }} className={shell} style={{ background: section.background || 'transparent' }}><SectionControls index={index} count={count} onMoveUp={onMoveUp} onMoveDown={onMoveDown} onDuplicate={onDuplicate} onDelete={onDelete} /><div className="mx-auto max-w-6xl">
    {section.type === 'hero' && <div className="grid gap-10 md:grid-cols-2 md:items-center"><div><InlineText as="h1" value={section.title} onChange={(value) => inlineEdit('title', value)} className="text-5xl font-black leading-tight text-slate-950 md:text-6xl" />{paragraph}<div className="mt-8 flex flex-wrap gap-3">{content.buttons?.map((button) => <ButtonLink key={button.id} button={button} media={site.media} />)}</div></div><MediaPreview asset={image} /></div>}
    {['text', 'contact', 'testimonials', 'timeline', 'accordion'].includes(section.type) && <div>{title}{paragraph}<div className="mt-6 flex flex-wrap gap-3">{content.buttons?.map((button) => <ButtonLink key={button.id} button={button} media={site.media} />)}</div></div>}
    {section.type === 'richText' && <article className="prose max-w-none">{title}<div className="mt-4" dangerouslySetInnerHTML={{ __html: sanitizeRichText(content.richText) }} /></article>}
    {section.type === 'image' && <MediaPreview asset={image} />}
    {section.type === 'gallery' && <div>{title}<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{(content.mediaIds || []).map((id) => <MediaPreview key={id} asset={mediaById(site, id)} />)}</div></div>}
    {section.type === 'cards' && <div>{title}<div className="mt-8 grid gap-4 md:grid-cols-3">{(content.cards || []).map((card, cardIndex) => <div key={card.id} className="group/card relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg"><div className="absolute right-3 top-3 hidden overflow-hidden rounded-xl bg-slate-950 text-xs font-bold text-white shadow-xl group-hover/card:flex"><button onClick={(event) => { event.stopPropagation(); cardAction('up', cardIndex) }} className="px-2 py-1 hover:bg-white/10">↑</button><button onClick={(event) => { event.stopPropagation(); cardAction('down', cardIndex) }} className="px-2 py-1 hover:bg-white/10">↓</button><button onClick={(event) => { event.stopPropagation(); cardAction('duplicate', cardIndex) }} className="px-2 py-1 hover:bg-white/10">Copy</button><button onClick={(event) => { event.stopPropagation(); cardAction('delete', cardIndex) }} className="bg-red-600 px-2 py-1">Trash</button></div><InlineText as="h3" value={card.title} onChange={(value) => inlineEdit(`content.cards.${cardIndex}.title`, value)} className="text-lg font-black" /><InlineText as="p" value={card.text} onChange={(value) => inlineEdit(`content.cards.${cardIndex}.text`, value)} className="mt-3 text-sm leading-6 text-slate-600" /></div>)}</div></div>}
    {section.type === 'document' && <div>{title}{paragraph}<div className="mt-8 grid gap-4 md:grid-cols-2">{(content.mediaIds || []).map((id) => <MediaPreview key={id} asset={mediaById(site, id)} />)}</div></div>}
    {section.type === 'buttons' && <div className="flex flex-wrap justify-center gap-3">{content.buttons?.map((button) => <ButtonLink key={button.id} button={button} media={site.media} />)}</div>}
    {section.type === 'video' && <div>{title}<iframe className="mt-6 aspect-video w-full rounded-3xl border" src={content.embedUrl || 'about:blank'} title={section.title} sandbox="allow-scripts allow-same-origin allow-presentation" /></div>}
    {section.type === 'spacer' && <div style={{ height: content.height || 56 }} />}
  </div></section>
}
