import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadSite } from './client'
import { seedSite } from './seed'

const SiteDataContext = createContext({ site: seedSite, loading: true })

export function SiteDataProvider({ children }) {
  const [site, setSite] = useState(seedSite)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    loadSite('published')
      .then((loaded) => {
        if (alive && loaded) setSite(loaded)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [])

  const value = useMemo(() => ({ site, loading }), [site, loading])
  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
}

export function useSiteData() {
  return useContext(SiteDataContext)
}

export function useEditablePage(slug) {
  const { site, loading } = useSiteData()
  const homeSlug = site?.settings?.homepageSlug || 'home'
  const actualSlug = slug === '/' ? homeSlug : slug
  const page = site?.pages?.find((item) => item.slug === actualSlug)
  return { site, page, loading }
}
