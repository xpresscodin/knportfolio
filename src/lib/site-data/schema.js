export const SECTION_TYPES = ['hero','text','richText','image','textImage','gallery','cards','buttons','document','video','contact','spacer','embed']
export const FILE_TYPES = ['image','pdf','document','presentation','video','other']
export const defaultTheme = {
  globalFont: 'Inter, system-ui, sans-serif', headingFont: 'Inter, system-ui, sans-serif', bodyFont: 'Inter, system-ui, sans-serif',
  baseFontSize: 16, headingScale: 1.2, primaryColor: '#0f172a', secondaryColor: '#f97316', accentColor: '#38bdf8',
  textColor: '#1f2937', linkColor: '#0f172a', backgroundColor: '#fff7ed', pageBackground: '#ffffff', sectionBackground: '#ffffff',
  headerBackground: '#ffffff', headerTextColor: '#1f2937', footerBackground: '#0f172a', footerTextColor: '#ffffff',
  buttonBackground: '#0f172a', buttonTextColor: '#ffffff', borderRadius: 18, cardStyle: 'soft shadow', spacingScale: 1,
}
export const emptyButton = () => ({ id: crypto.randomUUID(), text: 'New button', linkType: 'internal', href: '/', fileId: '', target: '_self', style: 'filled', backgroundColor: '', textColor: '', hoverStyle: 'darken', borderRadius: 999, size: 'medium', hidden: false })
export const emptySection = (type='text') => ({ id: crypto.randomUUID(), type, title: type === 'hero' ? 'Welcome headline' : 'Section title', hidden: false, background: '', padding: 'normal', layout: 'standard', content: { text: 'Add your text here.', richText: '<p>Add your text here.</p>', imageId: '', mediaIds: [], cards: [], buttons: [] } })
export const emptyPage = () => ({ id: crypto.randomUUID(), title: 'New Page', slug: 'new-page', seoTitle: 'New Page', seoDescription: '', hidden: false, showInMenu: true, order: 99, background: '', sections: [emptySection('hero')] })
