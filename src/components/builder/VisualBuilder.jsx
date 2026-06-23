import { useEffect, useMemo, useState } from 'react'
import { emptyPage } from '../../lib/site-data/schema'
import { saveDraft, publishSite } from '../../lib/site-data/client'
import { createBuilderSection } from '../../lib/builder/defaultBlocks'
import { clone, setPath } from './ui.jsx'
import { builderTabs, deviceOptions } from './builderConfig'
import BuilderTopBar from './BuilderTopBar'
import BuilderLeftSidebar from './BuilderLeftSidebar'
import BuilderCanvas from './BuilderCanvas'
import BuilderRightInspector from './BuilderRightInspector'

export default function VisualBuilder({ site, setSite }) {
  const [activeTab, setActiveTab] = useState('pages')
  const [selectedPageId, setSelectedPageId] = useState(site.pages[0]?.id || '')
  const [selectedSectionId, setSelectedSectionId] = useState(site.pages[0]?.sections?.[0]?.id || '')
  const [device, setDevice] = useState('desktop')
  const [dirty, setDirty] = useState(false)
  const [status, setStatus] = useState('Draft ready')
  const [history, setHistory] = useState([])
  const [future, setFuture] = useState([])
  const [busyAction, setBusyAction] = useState('')
  const [toasts, setToasts] = useState([])

  const selectedPage = useMemo(() => site.pages.find((page) => page.id === selectedPageId) || site.pages[0], [site, selectedPageId])
  const selectedSection = selectedPage?.sections?.find((section) => section.id === selectedSectionId)
  const selectedSectionIndex = selectedPage?.sections?.findIndex((section) => section.id === selectedSectionId) ?? -1

  useEffect(() => { if (!selectedPageId && site.pages[0]) setSelectedPageId(site.pages[0].id) }, [site.pages, selectedPageId])
  useEffect(() => { const beforeUnload = (event) => { if (dirty) { event.preventDefault(); event.returnValue = '' } }; window.addEventListener('beforeunload', beforeUnload); return () => window.removeEventListener('beforeunload', beforeUnload) }, [dirty])
  useEffect(() => { if (!dirty) return undefined; const timer = setInterval(() => handleSaveDraft('Auto-saved'), 30000); return () => clearInterval(timer) }, [dirty, site])

  function notify(message, type = 'success') {
    const id = crypto.randomUUID()
    setToasts((items) => [...items, { id, message, type }])
    setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 3200)
  }

  function commit(mutator) {
    setHistory((items) => [...items.slice(-39), clone(site)])
    setFuture([])
    setSite((current) => { const next = clone(current); mutator(next); return next })
    setDirty(true)
    setStatus('Unsaved changes')
  }
  async function handleSaveDraft(message = 'Draft saved') {
    setBusyAction('save')
    try { const saved = await saveDraft(site); setSite(saved); setDirty(false); setStatus(`${message} at ${new Date().toLocaleTimeString()}`); notify(message) }
    catch (error) { notify(error.message || 'Save failed', 'error') }
    finally { setBusyAction('') }
  }
  async function handlePublish() {
    setBusyAction('publish')
    try { const published = await publishSite(site); setSite(published); setDirty(false); setStatus('Published live'); notify('Published live') }
    catch (error) { notify(error.message || 'Publish failed', 'error') }
    finally { setBusyAction('') }
  }
  function undo() { if (!history.length) return; setFuture((items) => [clone(site), ...items]); setSite(history.at(-1)); setHistory((items) => items.slice(0, -1)); setDirty(true); setStatus('Undo applied'); notify('Undo applied') }
  function redo() { if (!future.length) return; setHistory((items) => [...items, clone(site)]); setSite(future[0]); setFuture((items) => items.slice(1)); setDirty(true); setStatus('Redo applied'); notify('Redo applied') }
  function updatePage(mutator) { commit((draft) => mutator(draft.pages.find((page) => page.id === selectedPage.id))) }
  function updateSection(mutator) { updatePage((page) => mutator(page.sections.find((section) => section.id === selectedSectionId))) }
  function addPage() { commit((draft) => { const page = emptyPage(); page.title = 'Untitled visual page'; page.builderVersion = 1; draft.pages.push(page); setSelectedPageId(page.id); setSelectedSectionId(page.sections[0]?.id || '') }); notify('Page added') }
  function addSection(type, insertAt = selectedPage?.sections?.length || 0) { updatePage((page) => { const section = createBuilderSection(type); page.sections.splice(insertAt, 0, section); setSelectedSectionId(section.id) }); notify(`${type} added`) }
  function moveSection(from, to) { if (to < 0 || !selectedPage || to >= selectedPage.sections.length) return; updatePage((page) => { const [section] = page.sections.splice(from, 1); page.sections.splice(to, 0, section) }); notify('Section moved') }
  function duplicateSection(index) { updatePage((page) => { const copy = clone(page.sections[index]); copy.id = crypto.randomUUID(); copy.title = `${copy.title} copy`; page.sections.splice(index + 1, 0, copy); setSelectedSectionId(copy.id) }); notify('Section duplicated') }
  function deleteSection(index) { updatePage((page) => { page.sections.splice(index, 1); setSelectedSectionId(page.sections[Math.max(0, index - 1)]?.id || '') }); notify('Section deleted') }
  function inlineEdit(sectionId, path, value) { commit((draft) => { const page = draft.pages.find((item) => item.id === selectedPage.id); const section = page.sections.find((item) => item.id === sectionId); setPath(section, path, value) }) }
  function selectMediaForSection(mediaId) { if (!selectedSection) return; updateSection((section) => { if (section.type === 'gallery' || section.type === 'document') section.content.mediaIds = [...new Set([...(section.content.mediaIds || []), mediaId])]; else section.content.imageId = mediaId }); notify('Media selected') }

  return <div className="flex h-screen flex-col overflow-hidden bg-[#eef2f7] text-slate-950">
    <BuilderTopBar site={site} selectedPage={selectedPage} selectedPageId={selectedPageId} setSelectedPageId={setSelectedPageId} addPage={addPage} saveDraft={handleSaveDraft} publish={handlePublish} undo={undo} redo={redo} device={device} setDevice={setDevice} status={status} dirty={dirty} busyAction={busyAction} notify={notify} />
    <div className="grid min-h-0 flex-1 grid-cols-[320px_minmax(0,1fr)_360px] gap-0">
      <BuilderLeftSidebar tabs={builderTabs} activeTab={activeTab} setActiveTab={setActiveTab} site={site} selectedPage={selectedPage} selectedPageId={selectedPageId} setSelectedPageId={setSelectedPageId} commit={commit} addPage={addPage} addSection={addSection} selectMediaForSection={selectMediaForSection} notify={notify} />
      <BuilderCanvas site={site} selectedPage={selectedPage} selectedSectionId={selectedSectionId} setSelectedSectionId={setSelectedSectionId} device={device} addSection={addSection} moveSection={moveSection} duplicateSection={duplicateSection} deleteSection={deleteSection} inlineEdit={inlineEdit} />
      <BuilderRightInspector site={site} selectedPage={selectedPage} selectedSection={selectedSection} selectedSectionIndex={selectedSectionIndex} updatePage={updatePage} updateSection={updateSection} moveSection={moveSection} selectMediaForSection={selectMediaForSection} notify={notify} />
    </div>
    <div className="pointer-events-none fixed bottom-5 right-5 z-[100] space-y-2">{toasts.map((toast) => <div key={toast.id} className={`rounded-2xl px-4 py-3 text-sm font-bold shadow-2xl ring-1 ring-black/10 ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-slate-950 text-white'}`}>{toast.message}</div>)}</div>
  </div>
}
