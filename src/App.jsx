import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SiteRenderer from './components/site/SiteRenderer'
import AdminApp from './pages/admin/AdminApp'
import { loadSite } from './lib/site-data/client'

// Keep this file intentionally small: Vercel builds should only see the editor routes below.

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/editor/*" element={<AdminApp />} />
        <Route path="/preview/*" element={<SiteApp mode="draft" />} />
        <Route path="*" element={<SiteApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
