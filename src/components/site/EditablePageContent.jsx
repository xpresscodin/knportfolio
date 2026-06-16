import SectionRenderer from '../sections/SectionRenderer'
import { useEditablePage } from '../../lib/site-data/SiteDataContext'

export default function EditablePageContent({ slug, fallback = null }) {
  const { site, page, loading } = useEditablePage(slug)

  if (loading && fallback) return fallback
  if (!page || page.hidden) return fallback

  return (
    <div style={{ background: page.background || 'transparent' }}>
      {page.sections?.map((section) => (
        <SectionRenderer key={section.id} section={section} site={site} />
      ))}
    </div>
  )
}
