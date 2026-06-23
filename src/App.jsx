import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import { SiteDataProvider } from './lib/site-data/SiteDataContext'
import { loadSite } from './lib/site-data/client'

function DraftPreview() {
  const [site, setSite] = useState(null)
  useEffect(() => { let active = true; loadSite('draft').then((loaded) => active && setSite(loaded)); return () => { active = false } }, [])
  if (!site) return <p className="p-6">Loading website preview...</p>
  return <SiteRenderer site={site} preview />
}

function PublicLayout() {
  return <SiteDataProvider><Layout /></SiteDataProvider>
}

export default function App() {
  return <BrowserRouter><Routes><Route path="/admin/*" element={<AdminApp />} /><Route path="/editor/*" element={<AdminApp />} /><Route path="/preview/*" element={<DraftPreview />} /><Route path="/" element={<PublicLayout />}><Route index element={<About />} /><Route path="resume" element={<Resume />} /><Route path="portfolio" element={<Portfolio />} /><Route path="portfolio/:category" element={<Portfolio />} /><Route path="portfolio/:category/:sub" element={<Portfolio />} /><Route path="portfolio/:category/:sub/:id" element={<Portfolio />} /><Route path="blog" element={<Blog />} /><Route path="contact" element={<Contact />} /><Route path="reviews" element={<Reviews />} /></Route></Routes></BrowserRouter>
}
