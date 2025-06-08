import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      className="mt-auto px-4 py-2 bg-accent text-white rounded"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
