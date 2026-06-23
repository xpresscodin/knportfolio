import { useEffect, useState } from 'react'
import VisualBuilder from '../../components/builder/VisualBuilder'
import LegacyEditor from '../../components/builder/LegacyEditor'
import { loadSite, login } from '../../lib/site-data/client'

const SESSION_KEY = 'knportfolio-admin-session'

function Login({ onDone }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  return <div className="grid min-h-screen place-items-center bg-slate-950 text-slate-900"><form onSubmit={async (event) => { event.preventDefault(); try { await login(password); sessionStorage.setItem(SESSION_KEY, 'active'); onDone() } catch (err) { setError(err.message) } }} className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl"><p className="text-xs font-black uppercase tracking-[0.3em] text-sky-500">Admin</p><h1 className="mt-2 text-3xl font-black">Visual website builder</h1><p className="mb-6 mt-2 text-sm text-slate-600">Enter the private editor password to open the live canvas editor.</p><label className="text-xs font-bold uppercase text-slate-500">Password<input className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>{error && <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button className="mt-5 w-full rounded-2xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-slate-800 active:scale-95">Open builder</button></form></div>
}

export default function AdminApp() {
  const isLegacy = window.location.pathname.includes('/legacy-editor')
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'active')
  const [site, setSite] = useState(null)

  useEffect(() => {
    if (!authenticated) return
    let active = true
    loadSite('draft').then((loadedSite) => { if (active) setSite(loadedSite) })
    return () => { active = false }
  }, [authenticated])

  if (!authenticated) return <Login onDone={() => setAuthenticated(true)} />
  if (!site) return <div className="grid min-h-screen place-items-center bg-slate-100 font-semibold text-slate-700">Loading builder…</div>
  return isLegacy ? <LegacyEditor site={site} setSite={setSite} /> : <VisualBuilder site={site} setSite={setSite} />
}
