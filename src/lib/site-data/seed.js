import { defaultTheme } from './schema'
import projects from '../../data/projects'

const now = new Date().toISOString()
const slugify = (value) => String(value || 'page').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
const idify = (value) => slugify(value).replace(/-/g, '_')
const button = (id, text, href) => ({ id, text, href, linkType: 'internal', target: '_self', style: 'filled', backgroundColor: '', textColor: '', hoverStyle: 'darken', borderRadius: 999, size: 'medium', hidden: false })

function mediaKind(src = '', type = '') {
  const value = `${src} ${type}`.toLowerCase()
  if (value.includes('.pdf') || type === 'pdf') return ['pdf', 'application/pdf']
  if (value.includes('.ppt') || value.includes('.pptx') || type === 'presentation') return ['presentation', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']
  if (value.includes('.mp4') || type === 'video') return ['video', 'video/mp4']
  return ['image', 'image/jpeg']
}

function mediaFrom(src, title, alt = '', type = '') {
  const [kind, mimeType] = mediaKind(src, type)
  return { id: `media_${idify(src)}`, title: title || alt || src.split('/').pop() || 'Media file', url: src, type: kind, mimeType, alt, caption: title || '', size: 0, createdAt: now }
}

const baseMedia = [
  { id: 'profile', title: 'Profile image', url: '/assets/images/2.jpeg', type: 'image', mimeType: 'image/jpeg', alt: 'Profile image', caption: '', size: 0, createdAt: now },
  { id: 'resume-pdf', title: 'Resume PDF', url: "/assets/images/Kenise Needham Farquharson's Resume - ep.pdf", type: 'pdf', mimeType: 'application/pdf', alt: '', caption: 'Downloadable PDF', size: 0, createdAt: now },
]

const generatedMedia = []
const mediaMap = new Map(baseMedia.map((item) => [item.id, item]))
function rememberMedia(asset) {
  if (!mediaMap.has(asset.id)) {
    mediaMap.set(asset.id, asset)
    generatedMedia.push(asset)
  }
  return asset.id
}

function projectSections(project) {
  const sections = [
    { id: `project_${project.id}_intro`, type: 'richText', title: project.title || 'Portfolio artifact', hidden: false, background: '', padding: 'small', layout: 'standard', content: { richText: `<p><strong>Category:</strong> ${project.category || ''}</p><p><strong>Submenu:</strong> ${project.sub || ''}</p>`, text: '', imageId: '', mediaIds: [], cards: [], buttons: [] } },
  ]

  ;(project.blocks || []).forEach((block, index) => {
    const id = `project_${project.id}_${index}`
    if (block.type === 'paragraph') {
      sections.push({ id, type: 'text', title: 'Text', hidden: false, background: '', padding: 'small', layout: 'standard', content: { text: block.content || '', richText: '', imageId: '', mediaIds: [], cards: [], buttons: [] } })
    }
    if (block.type === 'image') {
      const mediaId = rememberMedia(mediaFrom(block.src, block.title, block.alt, 'image'))
      sections.push({ id, type: 'image', title: block.alt || block.title || 'Image', hidden: false, background: '', padding: 'small', layout: 'standard', content: { text: '', richText: '', imageId: mediaId, mediaIds: [], cards: [], buttons: [] } })
    }
    if (block.type === 'pdf') {
      const mediaId = rememberMedia(mediaFrom(block.src, block.title, block.alt, 'pdf'))
      sections.push({ id, type: 'document', title: block.title || 'Document', hidden: false, background: '', padding: 'small', layout: 'card', content: { text: '', richText: '', imageId: '', mediaIds: [mediaId], displayStyle: 'card', cards: [], buttons: [] } })
    }
    if (block.type === 'video') {
      const mediaId = rememberMedia(mediaFrom(block.src, block.title, block.alt, 'video'))
      sections.push({ id, type: 'document', title: block.alt || block.title || 'Video', hidden: false, background: '', padding: 'small', layout: 'card', content: { text: '', richText: '', imageId: '', mediaIds: [mediaId], displayStyle: 'card', cards: [], buttons: [] } })
    }
    if (block.type === 'slideshow') {
      const ids = (block.images || []).map((src) => rememberMedia(mediaFrom(src, src.split('/').pop(), '', 'image')))
      sections.push({ id, type: 'gallery', title: 'Gallery', hidden: false, background: '', padding: 'small', layout: 'grid', content: { text: '', richText: '', imageId: '', mediaIds: ids, cards: [], buttons: [] } })
    }
  })
  return sections
}

const projectPages = projects.map((project) => ({
  id: `portfolio_project_${project.id}`,
  title: project.title || `Portfolio ${project.id}`,
  slug: `portfolio/${project.category}/${slugify(project.sub)}/${project.id}`,
  seoTitle: project.title || `Portfolio ${project.id}`,
  seoDescription: project.sub || '',
  hidden: false,
  showInMenu: false,
  order: 100 + Number(project.id || 0),
  background: '',
  sections: projectSections(project),
}))

const categories = [...new Set(projects.map((project) => project.category).filter(Boolean))]
const categoryPages = categories.map((category, index) => {
  const categoryProjects = projects.filter((project) => project.category === category)
  return {
    id: `portfolio_category_${category}`,
    title: category,
    slug: `portfolio/${category}`,
    seoTitle: `${category} Portfolio`,
    seoDescription: `Portfolio artifacts for ${category}`,
    hidden: false,
    showInMenu: false,
    order: 50 + index,
    background: '',
    sections: [
      { id: `${category}_intro`, type: 'richText', title: `${category} Portfolio`, hidden: false, background: '', padding: 'small', layout: 'standard', content: { richText: '<p>Edit this category page, add documents, add PowerPoints, or add/remove artifact cards from the editor.</p>', text: '', imageId: '', mediaIds: [], cards: [], buttons: [] } },
      { id: `${category}_cards`, type: 'cards', title: 'Artifacts', hidden: false, background: '', padding: 'normal', layout: 'grid', content: { text: '', richText: '', imageId: '', mediaIds: [], buttons: [], cards: categoryProjects.map((project) => ({ id: `card_${project.id}`, title: project.title || project.sub, text: project.sub || category, href: `/portfolio/${project.category}/${slugify(project.sub)}/${project.id}` })) } },
    ],
  }
})

export const seedSite = {
  version: 3,
  updatedAt: now,
  settings: { siteName: 'Kenise Needham-Farquharson Portfolio', tagline: 'Spanish Teacher', homepageSlug: 'home', language: 'en' },
  profile: { name: 'Kenise Needham-Farquharson', title: 'Spanish Teacher', phone: '+1(876)-323-6986', location: 'Kingston, Jamaica', email: 'keniseneedham99@gmail.com', imageMediaId: 'profile', resumeMediaId: 'resume-pdf', resumeButtonText: 'Download CV', socialLinks: [{ href: '#' }, { href: '#' }, { href: '#' }, { href: '#' }] },
  theme: { ...defaultTheme, backgroundColor: '#fcb69f', pageBackground: '#ffffff', headerBackground: 'transparent', footerBackground: '#0f172a' },
  header: { logoMediaId: '', siteName: 'Kenise Needham-Farquharson Portfolio', showSiteName: false, mobileMenu: 'wrap', buttons: [] },
  footer: { text: '© Kenise Needham-Farquharson Portfolio. Update this footer in the editor.', columns: [{ id: 'quick', title: 'Quick links', links: [{ id: 'home', label: 'Home', href: '/', hidden: false }] }], socialLinks: [], hidden: true },
  navigation: [
    { id: 'nav-home', label: 'Home', href: '/', linkType: 'internal', target: '_self', hidden: false, order: 1, children: [] },
    { id: 'nav-resume', label: 'Resume', href: '/resume', linkType: 'internal', target: '_self', hidden: false, order: 2, children: [] },
    { id: 'nav-portfolio', label: 'Portfolio', href: '/portfolio', linkType: 'internal', target: '_self', hidden: false, order: 3, children: categories.map((category, index) => ({ id: `nav-${category}`, label: category, href: `/portfolio/${category}`, hidden: false, order: index + 1 })) },
    { id: 'nav-contact', label: 'Contact', href: '/contact', linkType: 'internal', target: '_self', hidden: false, order: 4, children: [] },
    { id: 'nav-reviews', label: 'Student Reviews', href: '/reviews', linkType: 'internal', target: '_self', hidden: false, order: 5, children: [] },
  ],
  navButtons: [],
  media: [...baseMedia, ...generatedMedia],
  pages: [
    { id: 'home', title: 'About Me', slug: 'home', seoTitle: 'About Me', seoDescription: 'Spanish teacher portfolio home page', hidden: false, showInMenu: true, order: 1, background: '', sections: [
      { id: 'about-intro', type: 'richText', title: 'About Me', hidden: false, background: '', padding: 'small', layout: 'standard', content: { richText: `<p>¡Hola! My name is Kenise Needham-Farquharson, and I am a passionate and dedicated Spanish teacher with 7 years of experience helping students of all ages and backgrounds discover the beauty of the Spanish language and culture.</p><p>Whether you're a complete beginner or looking to improve your fluency, I tailor each lesson to suit your goals, interests, and learning style. I hold a degree in Bachelors of Arts Spanish (Major) and have taught in various settings, including schools, online platforms, and private sessions.</p><p>Learning a new language should be an enjoyable and rewarding journey. I strive to create a supportive environment where students feel motivated and empowered to reach their full potential. Let’s embark on this exciting language adventure together—¡Vamos a aprender español!</p>`, text: '', imageId: '', mediaIds: [], cards: [], buttons: [] } },
      { id: 'what-i-do', type: 'cards', title: 'What I do!', hidden: false, background: '', padding: 'normal', layout: 'grid', content: { text: '', richText: '', imageId: '', mediaIds: [], buttons: [], cards: [
        { id: 'lesson-card', title: 'Personalized Spanish Lessons', text: "I create custom lesson plans based on your goals—whether you're learning for travel, school, work, or just for fun." },
        { id: 'conversation-card', title: 'Conversational Practice', text: 'Build real-world speaking skills and fluency through guided conversation and interactive speaking exercises.' },
        { id: 'grammar-card', title: 'Grammar & Writing Support', text: 'Master Spanish grammar and improve your writing with clear explanations and practical exercises.' },
        { id: 'culture-card', title: 'Cultural Insights & Real-Life Context', text: 'Learn about Hispanic cultures, customs, and expressions to understand the language beyond the textbook.' },
      ] } },
    ]},
    { id: 'resume', title: 'Resume', slug: 'resume', seoTitle: 'Resume', seoDescription: 'Professional resume', hidden: false, showInMenu: true, order: 2, background: '', sections: [
      { id: 'resume-summary', type: 'richText', title: 'Resume', hidden: false, background: '', padding: 'small', layout: 'standard', content: { richText: '<h2>Professional Summary</h2><p>Detail-oriented, motivated and student-oriented Spanish/English Teacher offering positive and nurturing learning environments to foster language development.</p><h2>Education</h2><ul><li>Northern Caribbean University - Bachelor of Arts: Secondary Education (Spanish and Literacy)</li><li>Black River High School - 8 CSEC Subjects</li></ul><h2>Skills</h2><ul><li>Excellent Classroom Management Skills</li><li>Strong Oral and Written Communication</li><li>Professional Development Skills</li><li>Lesson Plans and Curricula Development</li><li>Proficient in Spanish Language</li></ul>', text: '', imageId: '', mediaIds: [], cards: [], buttons: [button('resume-download', 'Download Resume', "/assets/images/Kenise Needham Farquharson's Resume - ep.pdf")] } },
    ]},
    { id: 'portfolio', title: 'Portfolio', slug: 'portfolio', seoTitle: 'Portfolio', seoDescription: 'Teaching portfolio artifacts', hidden: false, showInMenu: true, order: 3, background: '', sections: [
      { id: 'portfolio-intro', type: 'richText', title: 'Teaching Portfolio', hidden: false, background: '', padding: 'small', layout: 'standard', content: { richText: '<p>This portfolio is now editable. Add, remove, reorder, and update pages, documents, images, PowerPoints, buttons, and category pages from the admin editor.</p>', text: '', imageId: '', mediaIds: [], cards: [], buttons: [] } },
      { id: 'portfolio-categories', type: 'cards', title: 'Portfolio Categories', hidden: false, background: '', padding: 'normal', layout: 'grid', content: { text: '', richText: '', imageId: '', mediaIds: [], buttons: [], cards: categories.map((category) => ({ id: `category_${category}`, title: category, text: 'Open and edit this portfolio category.', href: `/portfolio/${category}` })) } },
    ]},
    { id: 'contact', title: 'Contact', slug: 'contact', seoTitle: 'Contact', seoDescription: 'Contact form', hidden: false, showInMenu: true, order: 4, background: '', sections: [
      { id: 'contact-form-copy', type: 'contact', title: '📬 Contact', hidden: false, background: '', padding: 'small', layout: 'standard', content: { text: 'Use the contact form below to send a message. You can edit this heading and helper text from the Pages editor.', richText: '', imageId: '', mediaIds: [], cards: [], buttons: [] } },
    ]},
    { id: 'reviews', title: 'Student & Parent Reviews', slug: 'reviews', seoTitle: 'Student & Parent Reviews', seoDescription: 'Student and parent reviews', hidden: false, showInMenu: true, order: 5, background: '', sections: [
      { id: 'reviews-intro', type: 'text', title: 'Student & Parent Reviews', hidden: false, background: '', padding: 'small', layout: 'standard', content: { text: 'Reviews are loaded from the connected Google Sheet. Edit this intro text from the admin editor.', richText: '', imageId: '', mediaIds: [], cards: [], buttons: [] } },
    ]},
    ...categoryPages,
    ...projectPages,
  ],
  publishState: { hasDraftChanges: false, lastPublishedAt: now, lastDraftSavedAt: now },

export const seedSite = {
  version: 1,
  updatedAt: new Date().toISOString(),
  settings: { siteName: 'Editable Portfolio', tagline: 'A customizable website', homepageSlug: 'home', language: 'en' },
  theme: defaultTheme,
  header: { logoMediaId: '', siteName: 'Editable Portfolio', showSiteName: true, mobileMenu: 'slide-down', buttons: [] },
  footer: { text: '© Editable Portfolio. Update this footer in the editor.', columns: [{ id: 'quick', title: 'Quick links', links: [{ id: 'home', label: 'Home', href: '/', hidden: false }] }], socialLinks: [], hidden: false },
  navigation: [
    { id: 'nav-home', label: 'Home', href: '/', linkType: 'internal', target: '_self', hidden: false, order: 1, children: [] },
    { id: 'nav-portfolio', label: 'Portfolio', href: '/portfolio', linkType: 'internal', target: '_self', hidden: false, order: 2, children: [] },
    { id: 'nav-contact', label: 'Contact', href: '/contact', linkType: 'internal', target: '_self', hidden: false, order: 3, children: [] },
  ],
  navButtons: [],
  media: [
    { id: 'profile', title: 'Profile image', url: '/assets/images/2.jpeg', type: 'image', mimeType: 'image/jpeg', alt: 'Profile image', caption: '', size: 0, createdAt: new Date().toISOString() },
    { id: 'resume-pdf', title: 'Resume PDF', url: "/assets/images/Kenise Needham Farquharson's Resume - ep.pdf", type: 'pdf', mimeType: 'application/pdf', alt: '', caption: 'Downloadable PDF', size: 0, createdAt: new Date().toISOString() },
  ],
  pages: [
    { id: 'home', title: 'Home', slug: 'home', seoTitle: 'Home', seoDescription: 'Editable home page', hidden: false, showInMenu: true, order: 1, background: '', sections: [
      { id: 'hero-home', type: 'hero', title: 'Build and edit this site without code', hidden: false, background: '', padding: 'large', layout: 'split', content: { text: 'Use the editor to change text, images, menus, colors, documents, buttons, and pages.', richText: '', imageId: 'profile', mediaIds: [], cards: [], buttons: [{ id: 'hero-btn', text: 'Open the editor', href: '/admin', linkType: 'internal', target: '_self', style: 'filled', backgroundColor: '', textColor: '', hoverStyle: 'darken', borderRadius: 999, size: 'large', hidden: false }] } },
      { id: 'text-home', type: 'richText', title: 'Editable content', hidden: false, background: '', padding: 'normal', layout: 'standard', content: { richText: '<p>This page is rendered from published editable data. Replace this safe placeholder with your own content from the admin area.</p>', text: '', imageId: '', mediaIds: [], cards: [], buttons: [] } }
    ]},
    { id: 'portfolio', title: 'Portfolio', slug: 'portfolio', seoTitle: 'Portfolio', seoDescription: '', hidden: false, showInMenu: true, order: 2, background: '', sections: [{ id: 'portfolio-docs', type: 'document', title: 'Documents and presentations', hidden: false, background: '', padding: 'normal', layout: 'grid', content: { text: 'Upload PDFs, documents, and PowerPoints in the media library, then choose them here.', mediaIds: ['resume-pdf'], displayStyle: 'card', buttons: [] } }]},
    { id: 'contact', title: 'Contact', slug: 'contact', seoTitle: 'Contact', seoDescription: '', hidden: false, showInMenu: true, order: 3, background: '', sections: [{ id: 'contact-info', type: 'contact', title: 'Contact information', hidden: false, background: '', padding: 'normal', layout: 'standard', content: { text: 'Edit contact text, links, and buttons here. Avoid storing private details unless you want them public.', richText: '<p>Add public contact information here.</p>', buttons: [] } }]}
  ],
  publishState: { hasDraftChanges: false, lastPublishedAt: new Date().toISOString(), lastDraftSavedAt: new Date().toISOString() }
}
