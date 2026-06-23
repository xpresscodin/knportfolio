import { seedSite } from '../site-data/seed'

const normalizeContent = (content = {}) => ({ text: '', richText: '', imageId: '', mediaIds: [], cards: [], buttons: [], ...content })

export function migrateLegacyPage(page) {
  return {
    id: page.id || crypto.randomUUID(), title: page.title || 'Untitled page', slug: (page.slug || 'page').replace(/^\//, ''),
    seoTitle: page.seoTitle || page.title || '', seoDescription: page.seoDescription || '', hidden: !!page.hidden,
    showInMenu: page.showInMenu !== false, order: page.order || 99, background: page.background || '',
    builderVersion: 1,
    sections: (page.sections || []).map((section) => ({
      id: section.id || crypto.randomUUID(), type: section.type || 'richText', title: section.title || 'Section', hidden: !!section.hidden,
      background: section.background || '', padding: section.padding || 'normal', layout: section.layout || 'standard',
      content: normalizeContent(section.content),
    })),
  }
}

export function migrateLegacySite(site) {
  const source = site?.pages?.length ? site : seedSite
  return {
    ...seedSite,
    ...source,
    version: 4,
    theme: { ...seedSite.theme, ...(source.theme || {}) },
    settings: { ...seedSite.settings, ...(source.settings || {}) },
    header: { ...seedSite.header, ...(source.header || {}) },
    footer: { ...seedSite.footer, ...(source.footer || {}) },
    profile: { ...seedSite.profile, ...(source.profile || {}) },
    media: source.media || [],
    navigation: source.navigation || [],
    navButtons: source.navButtons || [],
    pages: (source.pages || []).map(migrateLegacyPage),
    publishState: { ...seedSite.publishState, ...(source.publishState || {}) },
  }
}
