import { sanitizeRichText as baseSanitizeRichText } from '../validation/sanitize'

export function sanitizeInlineText(value) {
  return String(value ?? '').replace(/[<>]/g, '')
}

export function sanitizeRichText(value) {
  return baseSanitizeRichText(value || '')
}
