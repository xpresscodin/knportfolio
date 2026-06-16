import { defaultTheme } from './schema'
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
