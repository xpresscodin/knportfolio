// import Sidebar from './Sidebar'
// import Header from './Header'
// import { Outlet } from 'react-router-dom'

// export default function Layout() {
//   return (
//     <div className="min-h-screen w-full px-4 py-10 flex justify-center items-start bg-gradient-to-br from-[#fdf4ff] to-[#ecf0ff]">
//       <div className="max-w-7xl w-full flex flex-col md:flex-row gap-6">
        
//         {/* Sidebar Card */}
//         <aside className="sticky top-6 h-fit md:h-[calc(100vh-80px)] w-full md:w-[300px] bg-white rounded-2xl shadow-xl p-6 overflow-y-auto">
//           <Sidebar />
//         </aside>

//         {/* Main Content Area */}
//         <main className="w-full bg-white rounded-2xl shadow-xl p-6 min-h-[500px]">
//           <Header />
//           <div className="mt-6">
//             <Outlet />
//           </div>
//         </main>

//       </div>
//     </div>
//   )
// }
// import Sidebar from './Sidebar'
// import Header from './Header'
// import { Outlet } from 'react-router-dom'

// export default function Layout() {
//   return (
//     <div className="bg-gradient-to-br from-[#fdf4ff] to-[#ecf0ff] min-h-screen w-full flex justify-center px-4 py-10">
//       <div className="max-w-7xl w-full flex flex-col md:flex-row gap-6">
        
//         {/* Left Sidebar */}
//         <aside className="relative w-full md:w-[300px] flex-shrink-0">
//           <Sidebar />
//         </aside>

//         {/* Right Content Area */}
//         <section className="flex-1 flex flex-col gap-6">
//           {/* Floating Menu Header */}
//           <div className="bg-white rounded-xl shadow-lg p-4 sticky top-4 z-20">
//             <Header />
//           </div>

//           {/* Main Content Card */}
//           <main className="bg-white rounded-xl shadow-lg p-6">
//             <Outlet />
//           </main>
//         </section>
//       </div>
//     </div>
//   )
// }
// import Sidebar from './Sidebar'
// import Header from './Header'
// import { Outlet } from 'react-router-dom'

// export default function Layout() {
//   return (
//     <div className="bg-gradient-to-br from-[#fdf4ff] to-[#ecf0ff] min-h-screen w-full flex justify-center px-4 pt-20 pb-10">
//       <div className="max-w-7xl w-full flex flex-col md:flex-row gap-6">

//         {/* Sidebar */}
//         <aside className="relative w-full md:w-[300px] flex-shrink-0">
//           <Sidebar />
//         </aside>

//         {/* Content + Menu */}
//         <section className="flex-1 flex flex-col gap-6">

//           {/* 🧭 Menu ONLY — no white block */}
//           <Header />

//           {/* Page Content */}
//           <main className="bg-white rounded-xl shadow-lg p-6">
//             <Outlet />
//           </main>
//         </section>
//       </div>
//     </div>
//   )
// }
// import Sidebar from './Sidebar'
// import Header from './Header'
// import { Outlet } from 'react-router-dom'

// export default function Layout() {
//   return (
//     <div className="bg-gradient-to-br from-[#fdf4ff] to-[#ecf0ff] min-h-screen w-full flex justify-center px-4 pt-24 pb-10 relative">
//       <div className="max-w-7xl w-full flex gap-6">

//         {/* Sidebar = Sticky & Scrolls with Page */}
//         <aside className="w-[300px] hidden md:block sticky top-24 h-[calc(100vh-6rem)]">
//           <Sidebar />
//         </aside>

//         {/* Main Content Column */}
//         <section className="flex-1 flex flex-col gap-6">
          
//           {/* Fixed Top-Right Menu (always visible) */}
//           <div className="fixed top-6 right-6 z-50">
//             <Header />
//           </div>

//           {/* Spacer for Fixed Menu */}
//           <div className="h-[-5px]" />

//           {/* Scrollable Main Content */}
//           <main className="bg-white rounded-xl shadow-lg p-6 min-h-[500px]">
//             <Outlet />
//           </main>
//         </section>
//       </div>
//     </div>
//   )
// }
// import Sidebar from './Sidebar'
// import Header from './Header'
// import { Outlet } from 'react-router-dom'

// export default function Layout() {
//   return (
//     <div
//       className="bg-gradient-to-br from-[#ffecd2] to-[#fcb69f] min-h-screen w-full flex justify-center px-4 pt-20 pb-10"
//       // style={{
//       //   backgroundImage: "url('/src/assets/images/1.jpg')",
//       //   backgroundSize: 'cover',
//       //   backgroundRepeat: 'no-repeat',
//       //   backgroundPosition: 'center',
//       // }}
//     >
//       <div className="max-w-7xl w-full flex gap-6">

//         {/* Sidebar (separate) */}
//         <aside className="w-full md:w-[300px]">
//           <Sidebar />
//         </aside>

//         {/* Menu + Content in same block */}
//         <section className="flex-1">
//           <div className="bg-white rounded-xl shadow-xl p-6">
//             {/* ✅ Menu inside card */}
//             <Header />

//             {/* ✅ Content below menu */}
//             <div className="mt-6">
//               <Outlet />
//             </div>
//           </div>
//         </section>

//       </div>
//     </div>
//   )
// }
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div
      className="bg-gradient-to-br from-[#ffecd2] to-[#fcb69f] min-h-screen w-full flex justify-center px-4 pt-28 pb-10"
      style={{
        backgroundImage: "url('/src/assets/images/4882341.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl w-full flex gap-6 min-h-screen">
        {/* Sidebar: Sticky and full height */}
        <aside className="hidden md:block w-[300px] sticky top-28 self-start">
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 flex flex-col items-center">
          <div className="relative w-full flex flex-col items-center">
            {/* Floating Menu */}
            <div className="absolute -top-8 right-0 z-10">
            {/* <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10"> */}
              <Header />
            </div>
            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col min-h-[500px] w-full mt-8">
              {/* Centered Title Example */}
              <h1 className="text-3xl font-bold text-center mb-6 text-primary">
                {/* You can pass your title as a prop or render it in each page */}
                {/* Example: Portfolio */}
                
              </h1>
              <div className="flex-1">
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}