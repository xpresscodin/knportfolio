import PagesPanel from './PagesPanel'
import WidgetPanel from './WidgetPanel'
import MediaLibraryPanel from './MediaLibraryPanel'
import ThemePanel from './ThemePanel'
import NavigationPanel from './NavigationPanel'
import { Button, Field, TextInput } from './ui.jsx'

export default function BuilderLeftSidebar({ tabs, activeTab, setActiveTab, site, selectedPage, selectedPageId, setSelectedPageId, commit, addPage, addSection, selectMediaForSection, notify, width, setWidth, leftOpen, setLeftOpen }) {
  function startResize(event) {
    event.preventDefault()
    const startX = event.clientX
    const startWidth = width
    const move = (moveEvent) => setWidth(Math.min(620, Math.max(360, startWidth + moveEvent.clientX - startX)))
    const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }
  return <aside className="relative grid min-h-0 border-r border-slate-200 bg-white shadow-2xl" style={{ gridTemplateColumns: leftOpen ? '76px minmax(0,1fr)' : '76px 0' }}><nav className="flex flex-col gap-2 border-r border-slate-100 bg-slate-950 p-2 text-white">{tabs.map((tab) => { const Icon = tab.icon; return <button key={tab.id} onClick={() => { setActiveTab(tab.id); setLeftOpen(true) }} title={tab.label} className={`flex h-14 flex-col items-center justify-center rounded-2xl text-[10px] font-bold transition hover:bg-white/10 active:scale-95 ${activeTab === tab.id ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'text-slate-300'}`}><Icon className="mb-1 text-lg" />{tab.label.split(' ')[0]}</button> })}</nav><div className="min-h-0 overflow-hidden"><div className="flex h-full min-w-0 flex-col overflow-hidden p-5"><div className="flex items-center justify-between gap-2"><p className="truncate text-xs font-black uppercase tracking-[0.25em] text-sky-500">{tabs.find((tab) => tab.id === activeTab)?.label}</p><button onClick={() => setLeftOpen(false)} className="rounded-lg px-2 py-1 text-slate-400 transition hover:bg-slate-100 active:scale-95">‹</button></div>{activeTab === 'pages' && <PagesPanel site={site} selectedPageId={selectedPageId} setSelectedPageId={setSelectedPageId} commit={commit} addPage={addPage} notify={notify} />}{activeTab === 'sections' && <SectionPanel selectedPage={selectedPage} addSection={addSection} />}{activeTab === 'widgets' && <WidgetPanel addSection={addSection} />}{activeTab === 'media' && <MediaLibraryPanel site={site} commit={commit} onSelect={selectMediaForSection} notify={notify} />}{activeTab === 'theme' && <ThemePanel site={site} commit={commit} />}{activeTab === 'navigation' && <NavigationPanel site={site} commit={commit} />}{activeTab === 'settings' && <SettingsPanel site={site} commit={commit} />}</div></div>{leftOpen && <button aria-label="Resize pages panel" onMouseDown={startResize} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize bg-transparent transition hover:bg-sky-400/40" />}</aside>
}

function SectionPanel({ selectedPage, addSection }) {
  const sections = ['hero', 'richText', 'text', 'cards', 'gallery', 'document', 'contact', 'image', 'video', 'spacer']
  return <div className="mt-5 overflow-auto"><p className="text-sm text-slate-500">Drag a section into the page canvas or click to append it to the current page.</p><div className="mt-4 grid gap-3">{sections.map((type) => <button key={type} draggable onDragStart={(event) => event.dataTransfer.setData('builder/section-type', type)} onClick={() => addSection(type)} className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 text-left shadow-sm transition hover:border-sky-400 hover:shadow-lg active:scale-[0.99]"><span className="text-sm font-black capitalize text-slate-900">{type}</span><span className="mt-1 block text-xs text-slate-500">Add to {selectedPage?.title}</span></button>)}</div></div>
}

function SettingsPanel({ site, commit }) {
  return <div className="mt-5 space-y-4 overflow-auto"><Field label="Site name"><TextInput value={site.settings.siteName} onChange={(event) => commit((draft) => { draft.settings.siteName = event.target.value })} /></Field><Field label="Tagline"><TextInput value={site.settings.tagline} onChange={(event) => commit((draft) => { draft.settings.tagline = event.target.value })} /></Field><Field label="Homepage slug"><TextInput value={site.settings.homepageSlug} onChange={(event) => commit((draft) => { draft.settings.homepageSlug = event.target.value })} /></Field><Button tone="light" className="w-full">Global settings saved with draft</Button></div>
}
