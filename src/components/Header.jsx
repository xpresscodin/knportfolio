// import { NavLink } from 'react-router-dom'
// import { FaUser, FaBriefcase, FaImages, FaBlog, FaEnvelope } from 'react-icons/fa'

// const nav = [
//   { label: 'Home', to: '/', icon: <FaUser /> },
//   { label: 'Resume', to: '/resume', icon: <FaBriefcase /> },
//   { label: 'Portfolio', to: '/portfolio', icon: <FaImages /> },
//   { label: 'Blog', to: '/blog', icon: <FaBlog /> },
//   { label: 'Contact', to: '/contact', icon: <FaEnvelope /> },
// ]

// export default function Header() {
//   return (
//     <div className="flex justify-center md:justify-start flex-wrap gap-2">
//       {nav.map(({ to, label, icon }) => (
//         <NavLink
//           key={to}
//           to={to}
//           className={({ isActive }) =>
//             `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition duration-200 shadow ${
//               isActive ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-primary/10'
//             }`
//           }
//         >
//           {icon}
//           {label}
//         </NavLink>
//       ))}
//     </div>
//   )
// }
// import { NavLink } from 'react-router-dom'
// import { FaUser, FaBriefcase, FaImages, FaBlog, FaEnvelope } from 'react-icons/fa'

// const nav = [
//   { label: 'Home', to: '/', icon: <FaUser /> },
//   { label: 'Resume', to: '/resume', icon: <FaBriefcase /> },
//   { label: 'Portfolio', to: '/portfolio', icon: <FaImages /> },
//   { label: 'Blog', to: '/blog', icon: <FaBlog /> },
//   { label: 'Contact', to: '/contact', icon: <FaEnvelope /> },
// ]

// export default function Header() {
//   return (
//     <div className="flex justify-center md:justify-start flex-wrap gap-2">
//       {nav.map(({ to, label, icon }) => (
//         <NavLink
//           key={to}
//           to={to}
//           className={({ isActive }) =>
//             `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition duration-200 shadow ${
//               isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-primary/10'
//             }`
//           }
//         >
//           {icon}
//           {label}
//         </NavLink>
//       ))}
//     </div>
//   )
// } almost perfect header layout
// import { NavLink } from 'react-router-dom'
// import { FaUser, FaBriefcase, FaImages, FaBlog, FaEnvelope } from 'react-icons/fa'

// const nav = [
//   { label: 'Home', to: '/', icon: <FaUser /> },
//   { label: 'Resume', to: '/resume', icon: <FaBriefcase /> },
//   { label: 'Portfolio', to: '/portfolio', icon: <FaImages /> },
//   { label: 'Blog', to: '/blog', icon: <FaBlog /> },
//   { label: 'Contact', to: '/contact', icon: <FaEnvelope /> },
// ]

// export default function Header() {
//   return (
//     <div className="flex justify-end flex-nowrap gap-2 w-full overflow-x-auto">
//       {nav.map(({ to, label, icon }) => (
//         <NavLink
//           key={to}
//           to={to}
//           className={({ isActive }) =>
//             `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition duration-200 shadow-sm border
//             ${isActive
//               ? 'bg-primary text-white border-primary'
//               : 'bg-white text-gray-700 hover:bg-primary/10 border-gray-200'
//             }`
//           }
//         >
//           {icon}
//           {label}
//         </NavLink>
//       ))}
//     </div>
//   )
// }

import { NavLink } from 'react-router-dom'
import { FaUser, FaBriefcase, FaImages, FaBlog, FaEnvelope } from 'react-icons/fa'

const nav = [
  { label: 'Home', to: '/', icon: <FaUser /> },
  { label: 'Resume', to: '/resume', icon: <FaBriefcase /> },
  { label: 'Portfolio', to: '/portfolio', icon: <FaImages /> },
  { label: 'Blog', to: '/blog', icon: <FaBlog /> },
  { label: 'Contact', to: '/contact', icon: <FaEnvelope /> },
]

export default function Header() {
  return (
    <div className="flex flex-wrap justify-center md:justify-end gap-3 w-full px-2">
      {nav.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium transition duration-200 shadow-sm border 
             text-sm sm:text-base whitespace-nowrap
             ${isActive
               ? 'bg-primary text-white border-primary'
               : 'bg-white text-gray-700 hover:bg-primary/10 border-gray-200'
             }`
          }
        >
          {icon}
          {label}
        </NavLink>
      ))}
    </div>
  )
}

