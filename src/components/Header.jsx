import { NavLink } from 'react-router-dom'
import { FaUser, FaBriefcase, FaImages, FaEnvelope, FaStar } from 'react-icons/fa'
import { useSiteData } from '../lib/site-data/SiteDataContext'

const iconMap = {
  Home: <FaUser />,
  Resume: <FaBriefcase />,
  Portfolio: <FaImages />,
  Contact: <FaEnvelope />,
  'Student Reviews': <FaStar />,
}

const fallbackNav = [
  { id: 'home', label: 'Home', href: '/', hidden: false, children: [] },
  { id: 'resume', label: 'Resume', href: '/resume', hidden: false, children: [] },
  { id: 'portfolio', label: 'Portfolio', href: '/portfolio', hidden: false, children: [] },
  { id: 'contact', label: 'Contact', href: '/contact', hidden: false, children: [] },
  { id: 'reviews', label: 'Student Reviews', href: '/reviews', hidden: false, children: [] },
]

export default function Header() {
  const { site } = useSiteData()
  const nav = site?.navigation?.length ? site.navigation : fallbackNav

  return (
    <div className="flex flex-wrap justify-center md:justify-end gap-3 w-full px-2">
      {nav
        .filter((item) => !item.hidden)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((item) => (
          <div key={item.id} className="relative group">
            <NavLink
              to={item.href || '/'}
              target={item.target === '_blank' ? '_blank' : undefined}
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              className={({ isActive }) =>
                `flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition duration-200 shadow-sm border text-sm sm:text-base whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 hover:bg-primary/10 border-gray-200'
                }`
              }
            >
              {iconMap[item.label] || <FaImages />}
              {item.label}
            </NavLink>

            {item.children?.filter((child) => !child.hidden).length > 0 && (
              <div className="absolute right-0 top-full z-50 hidden min-w-60 pt-2 text-left group-hover:block group-focus-within:block"><div className="rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                {item.children
                  .filter((child) => !child.hidden)
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((child) => (
                    <NavLink
                      key={child.id}
                      to={child.href || '/'}
                      target={child.target === '_blank' ? '_blank' : undefined}
                      rel={child.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="block rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary/10"
                    >
                      {child.label}
                    </NavLink>
                  ))}
              </div></div>
            )}
          </div>
        ))}
    </div>
  )
}
