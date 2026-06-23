import PagesPanel from './PagesPanel'
import WidgetPanel from './WidgetPanel'
import MediaLibraryPanel from './MediaLibraryPanel'
import ThemePanel from './ThemePanel'
import NavigationPanel from './NavigationPanel'
import { Button, Field, TextInput } from './ui.jsx'

export default function BuilderLeftSidebar({ tabs, activeTab, setActiveTab, site, selectedPage, selectedPageId, setSelectedPageId, commit, addPage, addSection, selectMediaForSection }) {
  return <aside className="grid min-h-0 grid-cols-[76px_1fr] border-r border-slate-200 bg-white shadow-2xl"><nav className="flex flex-col gap-2 border-r border-slate-100 bg-slate-950 p-2 text-white">{tabs.map((tab) => { const Icon = tab.icon; return <button key={tab.id} onClick={() => setActiveTab(tab.id)} title={tab.label} className={`flex h-14 flex-col items-center justify-center rounded-2xl text-[10px] font-bold ${activeTab === tab.id ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-white/10'}`}><Icon className="mb-1 text-lg" />{tab.label.split(' ')[0]}</button> })}</nav><div className="min-h-0 overflow-auto p-5"><p className="text-xs font-black uppercase tracking-[0.25em] text-sky-500">{tabs.find((tab) => tab.id === activeTab)?.label}</p>{activeTab === 'pages' && <PagesPanel site={site} selectedPageId={selectedPageId} setSelectedPageId={setSelectedPageId} commit={commit} addPage={addPage} />}{activeTab === 'sections' && <SectionPanel selectedPage={selectedPage} addSection={addSection} />}{activeTab === 'widgets' && <WidgetPanel addSection={addSection} />}{activeTab === 'media' && <MediaLibraryPanel site={site} commit={commit} onSelect={selectMediaForSection} />}{activeTab === 'theme' && <ThemePanel site={site} commit={commit} />}{activeTab === 'navigation' && <NavigationPanel site={site} commit={commit} />}{activeTab === 'settings' && <SettingsPanel site={site} commit={commit} />}</div></aside>
}

function SectionPanel({ selectedPage, addSection }) {
  const sections = ['hero', 'richText', 'text', 'cards', 'gallery', 'document', 'contact', 'image', 'video', 'spacer']
  return <div className="mt-5"><p className="text-sm text-slate-500">Drag a section into the page canvas or click to append it to the current page.</p><div className="mt-4 grid gap-3">{sections.map((type) => <button key={type} draggable onDragStart={(event) => event.dataTransfer.setData('builder/section-type', type)} onClick={() => addSection(type)} className="group rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 text-left shadow-sm transition hover:border-sky-400 hover:shadow-lg"><span className="text-sm font-black capitalize text-slate-900">{type}</span><span className="mt-1 block text-xs text-slate-500">Add to {selectedPage?.title}</span></button>)}</div></div>
}

function SettingsPanel({ site, commit }) {
  return <div className="mt-5 space-y-4"><Field label="Site name"><TextInput value={site.settings.siteName} onChange={(event) => commit((draft) => { draft.settings.siteName = event.target.value })} /></Field><Field label="Tagline"><TextInput value={site.settings.tagline} onChange={(event) => commit((draft) => { draft.settings.tagline = event.target.value })} /></Field><Field label="Homepage slug"><TextInput value={site.settings.homepageSlug} onChange={(event) => commit((draft) => { draft.settings.homepageSlug = event.target.value })} /></Field><Button tone="light" className="w-full">Global settings saved with draft</Button></div>
}
