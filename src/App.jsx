import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import About from './pages/About'
import Resume from './pages/Resume'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Reviews from './pages/Reviews'
import AdminApp from './pages/admin/AdminApp'
import { SiteDataProvider } from './lib/site-data/SiteDataContext'

function PublicLayout({ mode = 'published' }) {
  return <SiteDataProvider mode={mode}><Layout /></SiteDataProvider>
}

const publicRoutes = <><Route index element={<About />} /><Route path="resume" element={<Resume />} /><Route path="portfolio" element={<Portfolio />} /><Route path="portfolio/:category" element={<Portfolio />} /><Route path="portfolio/:category/:sub" element={<Portfolio />} /><Route path="portfolio/:category/:sub/:id" element={<Portfolio />} /><Route path="blog" element={<Blog />} /><Route path="contact" element={<Contact />} /><Route path="reviews" element={<Reviews />} /></>

export default function App() {
  return <BrowserRouter><Routes><Route path="/admin/*" element={<AdminApp />} /><Route path="/editor/*" element={<AdminApp />} /><Route path="/preview" element={<PublicLayout mode="draft" />}>{publicRoutes}</Route><Route path="/" element={<PublicLayout />}>{publicRoutes}</Route></Routes></BrowserRouter>
}
