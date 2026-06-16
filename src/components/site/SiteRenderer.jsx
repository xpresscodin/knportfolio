import { Link, useLocation } from 'react-router-dom'
import SectionRenderer from '../sections/SectionRenderer'
import ButtonLink from './ButtonLink'

function ThemeVars({ theme }) {
  const t = theme || {}
  return <style>{`:root{--font:${t.globalFont};--heading-font:${t.headingFont};--primary:${t.primaryColor};--button-bg:${t.buttonBackground};--button-text:${t.buttonTextColor};--radius:${t.borderRadius}px} body{font-family:var(--font);color:${t.textColor};background:${t.backgroundColor}} h1,h2,h3{font-family:var(--heading-font)} a{color:${t.linkColor}}`}</style>
}

function SidebarCard({ site }) {
  const profile = site.profile || {}
  const media = site.media || []
  const profileImage = media.find((item) => item.id === profile.imageMediaId) || media.find((item) => item.id === 'profile')
  const resume = media.find((item) => item.id === profile.resumeMediaId) || media.find((item) => item.id === 'resume-pdf')

  return <div className="relative bg-[#FBE4D6] rounded-2xl shadow-xl pt-28 pb-8 px-6 text-center border border-gray-200 overflow-visible">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-30 bg-white p-1 rounded-2xl shadow-lg border-4 border-white z-20">
      <img src={profileImage?.url || '/assets/images/2.jpeg'} alt={profileImage?.alt || profile.name || 'Profile'} className="w-full h-full object-cover rounded-2xl" />
    </div>
    <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
    <p className="text-sm text-gray-500 mb-6">{profile.title}</p>
    <div className="text-left text-sm space-y-3 mb-6 text-gray-700">
      {profile.phone && <p><strong>📞 Phone:</strong> {profile.phone}</p>}
      {profile.location && <p><strong>📍 Location:</strong> {profile.location}</p>}
      {profile.email && <p><strong>✉ Email:</strong> {profile.email}</p>}
    </div>
    <a href={resume?.url || '#'} className="bg-primary text-white px-4 py-2 rounded inline-block hover:bg-red-600 transition">📥 {profile.resumeButtonText || 'Download CV'}</a>
  </div>
}

function HeaderNav({ site }) {
  return <div className="flex flex-wrap justify-center md:justify-end gap-3 w-full px-2">
    {site.navigation?.filter((item) => !item.hidden).sort((a,b)=>(a.order||0)-(b.order||0)).map((item) => <div key={item.id} className="relative group">
      <Link to={item.href || '/'} className="flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition duration-200 shadow-sm border text-sm sm:text-base whitespace-nowrap bg-white text-gray-700 hover:bg-primary/10 border-gray-200">{item.label}</Link>
      {item.children?.filter((child)=>!child.hidden).length > 0 && <div className="absolute right-0 top-full z-50 hidden min-w-60 pt-2 text-left group-hover:block group-focus-within:block"><div className="rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
        {item.children.filter((child)=>!child.hidden).sort((a,b)=>(a.order||0)-(b.order||0)).map((child) => <Link key={child.id} to={child.href || '/'} className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-primary/10">{child.label}</Link>)}
      </div></div>}
    </div>)}
    {site.navButtons?.map((button) => <ButtonLink key={button.id} button={button} media={site.media} />)}
  </div>
}

export default function SiteRenderer({ site, preview = false }) {
  const loc = useLocation()
  const slug = loc.pathname === '/' ? site.settings.homepageSlug : loc.pathname.replace(/^\//, '')
  const page = site.pages.find((item) => item.slug === slug && (preview || !item.hidden)) || site.pages.find((item) => item.slug === site.settings.homepageSlug) || site.pages[0]

  return <><ThemeVars theme={site.theme}/><div className="bg-gradient-to-br from-[#ffecd2] to-[#fcb69f] min-h-screen w-full flex justify-center px-4 pt-28 pb-10" style={{ backgroundImage: "url('/assets/images/4882341.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
    <div className="max-w-7xl w-full flex flex-col md:flex-row gap-6 min-h-screen">
      <div className="md:hidden mb-6"><SidebarCard site={site} /></div>
      <aside className="hidden md:block w-[300px] sticky top-28 self-start"><SidebarCard site={site} /></aside>
      <section className="flex-1 flex flex-col items-center">
        <div className="relative w-full flex flex-col items-center">
          <div className="w-full"><HeaderNav site={site} /></div>
          {preview && <div className="mt-4 w-full rounded-xl bg-amber-100 px-4 py-2 text-center text-sm font-semibold text-amber-900">Preview mode — publish when you are ready.</div>}
          <main className="bg-white rounded-2xl shadow-xl p-6 flex flex-col min-h-[500px] w-full mt-6" style={{ background: page?.background || site.theme.pageBackground }}>
            {page?.sections?.map((section) => <SectionRenderer key={section.id} section={section} site={site} />)}
          </main>
        </div>
      </section>
    </div>
  </div></>
}
