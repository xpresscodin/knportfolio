import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Layout from './components/Layout'
import About from './pages/About'
import Resume from './pages/Resume'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Reviews from './pages/Reviews'

import SiteRenderer from './components/site/SiteRenderer'
import AdminApp from './pages/admin/AdminApp'
import { loadSite } from './lib/site-data/client'

function SiteApp({ mode = 'published' }) {
  const [site, setSite] = useState(null)

  useEffect(() => {
    let active = true

    loadSite(mode).then((loadedSite) => {
      if (active) setSite(loadedSite)
    })

    return () => {
      active = false
    }
  }, [mode])

  if (!site) {
    return <p className="p-6">Loading website...</p>
  }

  return <SiteRenderer site={site} preview={mode === 'draft'} />
}

function App() {

    loadSite(mode).then(setSite)
  }, [mode])

  if (!site) return <p className="p-6">Loading website...</p>

  return <SiteRenderer site={site} preview={mode === 'draft'} />

function DraftPreview() {
  const [site, setSite] = useState(null)

  useEffect(() => {
    loadSite('draft').then(setSite)
  }, [])

  if (!site) return <p className="p-6">Loading website preview...</p>

  return <SiteRenderer site={site} preview />

}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/editor/*" element={<AdminApp />} />
        <Route path="/preview/*" element={<SiteApp mode="draft" />} />
        <Route path="*" element={<SiteApp />} />
        <Route path="/preview/*" element={<SiteApp mode="draft" />} />
        <Route path="*" element={<SiteApp />} />

        <Route path="/preview/*" element={<DraftPreview />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<About />} />
          <Route path="resume" element={<Resume />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:category" element={<Portfolio />} />
          <Route path="portfolio/:category/:sub" element={<Portfolio />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
import SiteRenderer from './components/site/SiteRenderer'
import AdminApp from './pages/admin/AdminApp'
import { loadSite } from './lib/site-data/client'
function PublicSite({ mode='published' }) { const [site,setSite]=useState(null); useEffect(()=>{loadSite(mode).then(setSite)},[mode]); if(!site) return <p className="p-6">Loading website...</p>; return <SiteRenderer site={site} preview={mode==='draft'}/> }
export default function App() { return <BrowserRouter><Routes><Route path="/admin/*" element={<AdminApp/>}/><Route path="/preview/*" element={<PublicSite mode="draft"/>}/><Route path="*" element={<PublicSite/>}/></Routes></BrowserRouter> }

