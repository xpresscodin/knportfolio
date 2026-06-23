export default function InlineText({ as: Tag = 'div', value, className = '', onChange, multiline = false, placeholder = 'Click to edit' }) {
  return <Tag className={`${className} rounded-md outline-none transition focus:bg-sky-50 focus:ring-2 focus:ring-sky-400`} contentEditable suppressContentEditableWarning data-placeholder={placeholder} onBlur={(event) => onChange?.(multiline ? event.currentTarget.innerText : event.currentTarget.textContent)}>{value}</Tag>
}
