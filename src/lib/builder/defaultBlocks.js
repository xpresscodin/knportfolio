const id = (prefix) => `${prefix}_${crypto.randomUUID()}`

export const widgetGroups = [
  { type: 'heading', label: 'Heading' }, { type: 'paragraph', label: 'Paragraph' }, { type: 'richText', label: 'Rich text' },
  { type: 'image', label: 'Image' }, { type: 'button', label: 'Button' }, { type: 'hero', label: 'Hero section' },
  { type: 'gallery', label: 'Gallery' }, { type: 'cards', label: 'Portfolio grid' }, { type: 'premiumCards', label: 'Premium cards' },
  { type: 'document', label: 'PDF/document card' }, { type: 'video', label: 'Video embed' }, { type: 'divider', label: 'Divider' },
  { type: 'spacer', label: 'Spacer' }, { type: 'twoColumn', label: 'Two-column layout' }, { type: 'threeColumn', label: 'Three-column layout' },
  { type: 'testimonials', label: 'Testimonials/reviews' }, { type: 'timeline', label: 'Timeline' }, { type: 'accordion', label: 'Accordion/FAQ' },
  { type: 'contact', label: 'Contact section' },
]

export function createBuilderSection(type = 'richText') {
  const common = { id: id('section'), type, hidden: false, background: '', padding: 'normal', layout: 'standard' }
  const content = { text: 'Click to edit this text.', richText: '<p>Click to edit rich text.</p>', imageId: '', mediaIds: [], cards: [], buttons: [] }
  if (type === 'hero') return { ...common, title: 'Welcome to My Teaching Portfolio', padding: 'large', content: { ...content, text: 'A professional journey of growth, reflection, and impact.', buttons: [createButton()] } }
  if (['cards', 'premiumCards', 'testimonials', 'timeline', 'accordion'].includes(type)) return { ...common, type: type === 'premiumCards' ? 'cards' : type, title: 'Cards grid', content: { ...content, cards: [createCard(), createCard('Another card')] } }
  if (type === 'button') return { ...common, type: 'buttons', title: 'Buttons', content: { ...content, buttons: [createButton()] } }
  if (type === 'paragraph' || type === 'heading') return { ...common, type: 'text', title: type === 'heading' ? 'New heading' : 'Text section', content }
  if (type === 'divider') return { ...common, type: 'spacer', title: 'Divider', content: { ...content, height: 24 } }
  return { ...common, title: type === 'image' ? 'Image' : type === 'document' ? 'Documents' : 'New section', content }
}

export function createButton() { return { id: id('button'), text: 'Learn more', href: '/', linkType: 'internal', target: '_self', style: 'filled', backgroundColor: '', textColor: '', borderRadius: 999, hidden: false } }
export function createCard(title = 'New card') { return { id: id('card'), title, text: 'Add a helpful description.', href: '' } }
