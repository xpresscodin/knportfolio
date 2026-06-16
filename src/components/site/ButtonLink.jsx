import { safeHref } from '../../lib/validation/sanitize'
export default function ButtonLink({ button, media=[] }) {
  if (!button || button.hidden) return null
  const file = button.fileId ? media.find(m=>m.id===button.fileId) : null
  const href = safeHref(file?.url || button.href || '/')
  const size = button.size === 'large' ? 'px-6 py-3 text-lg' : button.size === 'small' ? 'px-3 py-1 text-sm' : 'px-4 py-2'
  return <a href={href} target={button.target || '_self'} rel="noopener noreferrer" className={`inline-flex items-center justify-center font-semibold transition ${size}`} style={{ background: button.style === 'outline' ? 'transparent' : (button.backgroundColor || 'var(--button-bg)'), color: button.textColor || (button.style === 'outline' ? 'var(--primary)' : 'var(--button-text)'), border: `1px solid ${button.backgroundColor || 'var(--button-bg)'}`, borderRadius: button.borderRadius ?? '999px' }}>{button.text || 'Button'}</a>
}
