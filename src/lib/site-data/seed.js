import { defaultTheme } from './schema'
import projects from '../../data/projects'

const now = new Date().toISOString()
const slugify = (value) => String(value || 'page').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
const idify = (value) => slugify(value).replace(/-/g, '_')
const button = (id, text, href) => ({ id, text, href, linkType: 'internal', target: '_self', style: 'filled', backgroundColor: '', textColor: '', hoverStyle: 'darken', borderRadius: 999, size: 'medium', hidden: false })
const section = (id, type, title, content = {}) => ({ id, type, title, hidden: false, background: '', padding: 'normal', layout: 'standard', content: { text: '', richText: '', imageId: '', mediaIds: [], cards: [], buttons: [], ...content } })
function kind(src = '', type = '') { const v = `${src} ${type}`.toLowerCase(); if (v.includes('.pdf') || type === 'pdf') return ['pdf', 'application/pdf']; if (v.includes('.ppt')) return ['presentation', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']; if (v.includes('.mp4')) return ['video', 'video/mp4']; return ['image', 'image/jpeg'] }
function mediaFrom(src, title, alt = '', type = '') { const [assetType, mimeType] = kind(src, type); return { id: `media_${idify(src)}`, title: title || src.split('/').pop() || 'Media file', url: src, type: assetType, mimeType, alt, caption: title || '', size: 0, createdAt: now } }
const mediaMap = new Map()
const rememberMedia = (asset) => { if (!mediaMap.has(asset.id)) mediaMap.set(asset.id, asset); return asset.id }
const baseMedia = [
  { id: 'profile', title: 'Profile image', url: '/assets/images/2.jpeg', type: 'image', mimeType: 'image/jpeg', alt: 'Profile image', caption: '', size: 0, createdAt: now },
  { id: 'resume-pdf', title: 'Resume PDF', url: "/assets/images/Kenise Needham Farquharson's Resume - ep.pdf", type: 'pdf', mimeType: 'application/pdf', alt: '', caption: 'Downloadable PDF', size: 0, createdAt: now },
]
baseMedia.forEach(rememberMedia)
function projectSections(project) {
  const sections = [section(`project_${project.id}_intro`, 'richText', project.title || 'Portfolio artifact', { richText: `<p><strong>Category:</strong> ${project.category || ''}</p><p><strong>Submenu:</strong> ${project.sub || ''}</p>` })]
  ;(project.blocks || []).forEach((block, index) => {
    const id = `project_${project.id}_${index}`
    if (block.type === 'paragraph') sections.push(section(id, 'text', 'Reflection', { text: block.content || '' }))
    if (block.type === 'image') sections.push(section(id, 'image', block.alt || block.title || 'Image', { imageId: rememberMedia(mediaFrom(block.src, block.title, block.alt, 'image')) }))
    if (block.type === 'pdf') sections.push(section(id, 'document', block.title || 'Document', { mediaIds: [rememberMedia(mediaFrom(block.src, block.title, block.alt, 'pdf'))], displayStyle: 'card' }))
    if (block.type === 'video') sections.push(section(id, 'document', block.title || 'Video', { mediaIds: [rememberMedia(mediaFrom(block.src, block.title, block.alt, 'video'))], displayStyle: 'card' }))
    if (block.type === 'slideshow') sections.push(section(id, 'gallery', 'Gallery', { mediaIds: (block.images || []).map((src) => rememberMedia(mediaFrom(src, src.split('/').pop(), '', 'image'))) }))
  })
  return sections
}
const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))]
const categoryPages = categories.map((category, index) => ({ id: `portfolio_category_${category}`, title: category, slug: `portfolio/${category}`, seoTitle: `${category} Portfolio`, seoDescription: `Portfolio artifacts for ${category}`, hidden: false, showInMenu: false, order: 50 + index, background: '', sections: [section(`${category}_intro`, 'richText', `${category} Portfolio`, { richText: '<p>Edit this category page with the visual builder.</p>' }), section(`${category}_cards`, 'cards', 'Artifacts', { cards: projects.filter((p) => p.category === category).map((p) => ({ id: `card_${p.id}`, title: p.title || p.sub, text: p.sub || category, href: `/portfolio/${p.category}/${slugify(p.sub)}/${p.id}` })) })] }))
const projectPages = projects.map((project) => ({ id: `portfolio_project_${project.id}`, title: project.title || `Portfolio ${project.id}`, slug: `portfolio/${project.category}/${slugify(project.sub)}/${project.id}`, seoTitle: project.title || `Portfolio ${project.id}`, seoDescription: project.sub || '', hidden: false, showInMenu: false, order: 100 + Number(project.id || 0), background: '', sections: projectSections(project) }))

export const seedSite = {
  version: 4,
  updatedAt: now,
  settings: { siteName: 'Kenise Needham-Farquharson Portfolio', tagline: 'Spanish Teacher', homepageSlug: 'home', language: 'en' },
  profile: { name: 'Kenise Needham-Farquharson', title: 'Spanish Teacher', phone: '+1(876)-323-6986', location: 'Kingston, Jamaica', email: 'keniseneedham99@gmail.com', imageMediaId: 'profile', resumeMediaId: 'resume-pdf', resumeButtonText: 'Download CV' },
  theme: { ...defaultTheme, backgroundColor: '#fcb69f', pageBackground: '#ffffff', headerBackground: '#ffffff', footerBackground: '#0f172a' },
  header: { logoMediaId: '', siteName: 'Kenise Needham-Farquharson Portfolio', showSiteName: true, mobileMenu: 'wrap', buttons: [] },
  footer: { text: '© Kenise Needham-Farquharson Portfolio. Update this footer in the editor.', columns: [{ id: 'quick', title: 'Quick links', links: [{ id: 'home', label: 'Home', href: '/', hidden: false }] }], socialLinks: [], hidden: true },
  navigation: [
    { id: 'nav-home', label: 'Home', href: '/', linkType: 'internal', target: '_self', hidden: false, order: 1, children: [] },
    { id: 'nav-resume', label: 'Resume', href: '/resume', linkType: 'internal', target: '_self', hidden: false, order: 2, children: [] },
    { id: 'nav-portfolio', label: 'Portfolio', href: '/portfolio', linkType: 'internal', target: '_self', hidden: false, order: 3, children: categories.map((category, index) => ({ id: `nav-${category}`, label: category, href: `/portfolio/${category}`, hidden: false, order: index + 1 })) },
    { id: 'nav-contact', label: 'Contact', href: '/contact', linkType: 'internal', target: '_self', hidden: false, order: 4, children: [] },
    { id: 'nav-reviews', label: 'Student Reviews', href: '/reviews', linkType: 'internal', target: '_self', hidden: false, order: 5, children: [] },
  ],
  navButtons: [],
  media: [...mediaMap.values()],
  pages: [
    { id: 'home', title: 'About Me', slug: 'home', seoTitle: 'About Me', seoDescription: 'Spanish teacher portfolio home page', hidden: false, showInMenu: true, order: 1, background: '', sections: [section('about-intro', 'richText', 'About Me', { richText: '<p>¡Hola! My name is Kenise Needham-Farquharson, and I am a passionate and dedicated Spanish teacher with 7 years of experience helping students discover the beauty of the Spanish language and culture.</p><p>Learning a new language should be an enjoyable and rewarding journey.</p>' }), section('what-i-do', 'cards', 'What I do!', { cards: [{ id: 'lesson-card', title: 'Personalized Spanish Lessons', text: 'Custom lesson plans based on your goals.' }, { id: 'conversation-card', title: 'Conversational Practice', text: 'Build real-world speaking skills and fluency.' }, { id: 'grammar-card', title: 'Grammar & Writing Support', text: 'Master Spanish grammar and improve writing.' }] })] },
    { id: 'resume', title: 'Resume', slug: 'resume', seoTitle: 'Resume', seoDescription: 'Professional resume', hidden: false, showInMenu: true, order: 2, background: '', sections: [section('resume-summary', 'richText', 'Resume', { richText: '<h2>Professional Summary</h2><p>Detail-oriented, motivated and student-oriented Spanish/English Teacher offering positive learning environments.</p><h2>Education</h2><ul><li>Northern Caribbean University - Bachelor of Arts: Secondary Education</li></ul>', buttons: [button('resume-download', 'Download Resume', "/assets/images/Kenise Needham Farquharson's Resume - ep.pdf")] })] },
    { id: 'portfolio', title: 'Portfolio', slug: 'portfolio', seoTitle: 'Portfolio', seoDescription: 'Teaching portfolio artifacts', hidden: false, showInMenu: true, order: 3, background: '', sections: [section('portfolio-intro', 'richText', 'Teaching Portfolio', { richText: '<p>This portfolio is editable with the visual builder.</p>' }), section('portfolio-categories', 'cards', 'Portfolio Categories', { cards: categories.map((category) => ({ id: `category_${category}`, title: category, text: 'Open this portfolio category.', href: `/portfolio/${category}` })) })] },
    { id: 'contact', title: 'Contact', slug: 'contact', seoTitle: 'Contact', seoDescription: 'Contact form', hidden: false, showInMenu: true, order: 4, background: '', sections: [section('contact-form-copy', 'contact', '📬 Contact', { text: 'Use the contact form below to send a message.' })] },
    { id: 'reviews', title: 'Student & Parent Reviews', slug: 'reviews', seoTitle: 'Student & Parent Reviews', seoDescription: 'Reviews', hidden: false, showInMenu: true, order: 5, background: '', sections: [section('reviews-intro', 'text', 'Student & Parent Reviews', { text: 'Reviews are loaded from the connected source. Edit this intro text in the builder.' })] },
    ...categoryPages,
    ...projectPages,
  ],
  publishState: { hasDraftChanges: false, lastPublishedAt: now, lastDraftSavedAt: now },
}
