import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SiteRenderer from './components/site/SiteRenderer'
import AdminApp from './pages/admin/AdminApp'
import { loadSite } from './lib/site-data/client'

function SiteApp({ mode = 'published' }) {
  const [site, setSite] = useState(null)

  useEffect(() => {
    loadSite(mode).then(setSite)
  }, [mode])

  if (!site) return <p className="p-6">Loading website...</p>

  return <SiteRenderer site={site} preview={mode === 'draft'} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/preview/*" element={<SiteApp mode="draft" />} />
        <Route path="*" element={<SiteApp />} />
      </Routes>
    </BrowserRouter>
  )
}
