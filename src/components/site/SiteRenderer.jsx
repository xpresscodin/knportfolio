import { Link, useLocation } from 'react-router-dom'
import SectionRenderer from '../sections/SectionRenderer'
import ButtonLink from './ButtonLink'

function ThemeVars({ theme }) {
  const t = theme || {}
  return <style>{`:root{--font:${t.globalFont};--heading-font:${t.headingFont};--primary:${t.primaryColor};--button-bg:${t.buttonBackground};--button-text:${t.buttonTextColor};--radius:${t.borderRadius || 18}px} body{font-family:var(--font);color:${t.textColor};background:${t.backgroundColor}} h1,h2,h3{font-family:var(--heading-font)} a{color:${t.linkColor}}`}</style>
}

export default function SiteRenderer({ site, preview = false, canvasPageId = '', editorMode = false, onSelectSection, selectedSectionId, onInlineEdit }) {
  const loc = useLocation()
  const slug = loc.pathname === '/' || loc.pathname.startsWith('/preview') ? site.settings.homepageSlug : loc.pathname.replace(/^\//, '')
  const page = site.pages.find((p) => canvasPageId ? p.id === canvasPageId : p.slug === slug && (preview || !p.hidden)) || site.pages.find((p) => p.slug === site.settings.homepageSlug) || site.pages[0]

  return <><ThemeVars theme={site.theme} /><div className="min-h-screen" style={{ background: page?.background || site.theme.backgroundColor }}>
    <header className="sticky top-0 z-40 border-b shadow-sm" style={{ background: site.theme.headerBackground, color: site.theme.headerTextColor }}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="font-bold text-inherit">{site.header?.showSiteName && (site.header.siteName || site.settings.siteName)}</Link>
        <nav className="flex flex-wrap items-center gap-2">{site.navigation?.filter((n) => !n.hidden).sort((a, b) => (a.order || 0) - (b.order || 0)).map((n) => <div className="group relative" key={n.id}><Link className="rounded-full px-3 py-2 hover:bg-black/5" to={n.href || '/'}>{n.label}</Link>{n.children?.filter((c) => !c.hidden).length > 0 && <div className="absolute hidden min-w-44 rounded-xl bg-white p-2 text-gray-800 shadow-xl group-hover:block">{n.children.filter((c) => !c.hidden).map((c) => <Link key={c.id} className="block rounded-lg px-3 py-2 hover:bg-gray-100" to={c.href || '/'}>{c.label}</Link>)}</div>}</div>)}{site.navButtons?.map((b) => <ButtonLink key={b.id} button={b} media={site.media} />)}</nav>
      </div>
    </header>
    {preview && <div className="bg-amber-100 px-4 py-2 text-center text-sm font-semibold text-amber-900">Preview mode — publish when you are ready.</div>}
    <main className="mx-auto max-w-7xl rounded-[var(--radius)]" style={{ background: site.theme.pageBackground }}>{page?.sections?.map((s, index) => <SectionRenderer key={s.id} section={s} site={site} editorMode={editorMode} selected={selectedSectionId === s.id} onSelect={() => onSelectSection?.(s.id)} onInlineEdit={(field, value) => onInlineEdit?.(s.id, field, value)} index={index} />)}</main>
    {!editorMode && !site.footer?.hidden && <footer className="mt-12" style={{ background: site.theme.footerBackground, color: site.theme.footerTextColor }}><div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3"><p>{site.footer.text}</p>{site.footer.columns?.map((col) => <div key={col.id}><h3 className="font-bold">{col.title}</h3>{col.links?.filter((l) => !l.hidden).map((l) => <a key={l.id} className="mt-2 block text-inherit opacity-90" href={l.href}>{l.label}</a>)}</div>)}</div></footer>}
  </div></>
}
