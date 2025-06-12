// import { NavLink } from 'react-router-dom'
// import ThemeToggle from './ThemeToggle'
// import { FaUser, FaBriefcase, FaImages, FaBlog, FaEnvelope } from 'react-icons/fa'

// const navItems = [
//   { path: '/', label: 'About', icon: <FaUser /> },
//   { path: '/resume', label: 'Resume', icon: <FaBriefcase /> },
//   { path: '/portfolio', label: 'Portfolio', icon: <FaImages /> },
//   { path: '/blog', label: 'Blog', icon: <FaBlog /> },
//   { path: '/contact', label: 'Contact', icon: <FaEnvelope /> },
// ]

// export default function Sidebar() {
//   return (
//     <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6 flex flex-col items-center gap-8">
//       <img src="/assets/images/1.jpg" alt="Profile" className="rounded-full w-32 h-32 object-cover border-4 border-accent" />
//       <nav className="flex flex-col gap-4">
//         {navItems.map(({ path, label, icon }) => (
//           <NavLink
//             key={path}
//             to={path}
//             className={({ isActive }) =>
//               `flex items-center gap-2 px-4 py-2 rounded-md transition ${
//                 isActive ? 'bg-accent text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
//               }`
//             }
//           >
//             {icon} {label}
//           </NavLink>
//         ))}
//       </nav>
//       <ThemeToggle />
//     </div>
//   )
// }
import { FaFacebookF, FaTwitter, FaDribbble, FaLinkedinIn } from 'react-icons/fa'

export default function Sidebar() {
  return (
    
    // <div className="bg-white p-6 border-r border-gray-200 text-center rounded-t-xl">
    //   {/* Profile image card
    //   <div className="w-[180px] mx-auto bg-[#ff014f] p-2 rounded-2xl shadow-lg mb-6">
    //     <img
    //       src="/src/assets/images/1.jpg"
    //       alt="Profile"
    //       className="rounded-2xl w-full h-auto object-cover"
    //     />
    //   </div> */}

    //   {/* Floating Profile Image */}
    //   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-2xl bg-[#ff014f] p-1 shadow-lg z-20">
    //     <img
    //       src="/src/assets/images/1.jpg"
    //       alt="Profile"
    //       className="w-full h-full object-cover rounded-2xl"
    //     />
    //   </div>
<div className="relative bg-[#FBE4D6] rounded-2xl shadow-xl pt-28 pb-8 px-6 text-center border border-gray-200 overflow-visible">

      {/* Floating Profile Image */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#ffffff] p-1 rounded-2xl shadow-lg border-4 border-white z-20">
        <img
          src="/assets/images/1.jpeg"
          alt="Profile"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Name + Title */}
      <h2 className="text-xl font-bold text-gray-900">Kenise Needham-Farquharson</h2>
      <p className="text-sm text-gray-500 mb-6">Spanish Teacher</p>

      {/* Social Icons */}
      <div className="flex justify-center gap-3 mb-6">
        <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-primary hover:text-white transition">
          <FaFacebookF />
        </a>
        <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-primary hover:text-white transition">
          <FaTwitter />
        </a>
        <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-primary hover:text-white transition">
          <FaDribbble />
        </a>
        <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-primary hover:text-white transition">
          <FaLinkedinIn />
        </a>
      </div>

      {/* Contact Info */}
      <div className="text-left text-sm space-y-3 mb-6 text-gray-700">
        <p><strong>📞 Phone:</strong> +1(876)-323-6986</p>
        <p><strong>📍 Location:</strong> Kingston, Jamaica</p>
        <p><strong>✉ Email:</strong> keniseneedham@yahoo.com</p>
        {/* <p><strong>🎂 Birthday:</strong> May 27, 1980</p> */}
      </div>

      <a href="/assets/images/Kenise Needham Farquharson's Resume - ep.pdf" className="bg-primary text-white px-4 py-2 rounded inline-block hover:bg-red-600 transition">
        📥 Download CV
      </a>
    </div>
  )
}
