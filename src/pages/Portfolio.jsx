// import { useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import projects from '../data/projects'

// const categoryBanners = {
//   GP1: { img: '/images/gp1-banner.jpg', text: 'Welcome to GP1 - General content for GP1. You can add images, text, etc. here.' },
//   GP2: { img: '/images/gp2-banner.jpg', text: 'Welcome to GP2 - General content for GP2.' },
//   GP3: { img: '/images/gp3-banner.jpg', text: 'Welcome to GP3 - General content for GP3.' },
//   GP4: { img: '/images/gp4-banner.jpg', text: 'Welcome to GP4 - General content for GP4.' },
//   GP5: { img: '/images/gp5-banner.jpg', text: 'Welcome to GP5 - General content for GP5.' },
//   GP6: { img: '/images/gp6-banner.jpg', text: 'Welcome to GP6 - General content for GP6.' },
// }

// const categories = [
//   { name: 'GP1', content: 'General content for GP1. You can add images, text, etc. here.', sub: ['Teaching Activities and Subject Goals', 'Subject Connectivity and Relevant Checklist', 'Student paper /Essays/ Creative works'] },
//   { name: 'GP2', content: 'General content for GP2.', sub: ['Action research/Case study'] },
//   { name: 'GP3', content: 'General content for GP3.', sub: ['Teachers Incentive to Students', 'Strategies to Develop Critical Thinking in Students', 'Assessment Instruments /Records', 'Students overall development', 'Classroom Rules and Procedures'] },
//   { name: 'GP4', content: 'General content for GP4.', sub: ['Professional Development', 'Assessment Records', 'Action Research', 'Professional Membership', 'Certificates', 'Presentations', 'Observations'] },
//   { name: 'GP5', content: 'General content for GP5.', sub: ['Interaction with parents', 'Community Involvement'] },
//   { name: 'GP6', content: 'General content for GP6.', sub: [''] },
// ]

// export default function Portfolio() {
//   const { category, sub } = useParams()
//   const navigate = useNavigate()

//   // Default to GP1 if no category in URL
//   const selectedCategory = category || categories[0].name
//   const selectedSub = sub || null

//   useEffect(() => {
//     // If no category in URL, redirect to /portfolio/GP1
//     if (!category) {
//       navigate(`/portfolio/${categories[0].name}`, { replace: true })
//     }
//   }, [category, navigate])

//   const currentCategory = categories.find(cat => cat.name === selectedCategory)
//   const banner = categoryBanners[selectedCategory] || {
//     img: '/images/default-banner.jpg',
//     text: 'Welcome to the Portfolio Section',
//   }

//   const selectedProject =
//     selectedSub
//       ? projects.find(p => p.category === selectedCategory && p.sub === selectedSub)
//       : null

//   // Navigation handlers
//   const handleCategoryClick = catName => {
//     navigate(`/portfolio/${catName}`)
//   }
//   const handleSubClick = (catName, subName) => {
//     navigate(`/portfolio/${catName}/${encodeURIComponent(subName)}`)
//   }

//   return (
//     <>
//       {/* Category Buttons */}
//       <div className="mb-6 flex flex-nowrap gap-4">
//         {categories.map(cat => (
//           <div key={cat.name} className="relative group">
//             <button
//               onClick={() => handleCategoryClick(cat.name)}
//               className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition duration-200 shadow-sm border
//                 ${
//                   selectedCategory === cat.name && !selectedSub
//                     ? 'bg-primary text-white border-primary'
//                     : 'bg-white text-gray-700 hover:bg-primary/10 border-gray-200'
//                 }`}
//             >
//               {cat.name}
//             </button>
//             {/* Dropdown on hover */}
//             <div className="absolute left-0 mt-0 hidden group-hover:block z-50 w-max min-w-[220px]">
//               <div className="bg-white border rounded shadow">
//                 {cat.sub.map(subItem => (
//                   <button
//                     key={subItem}
//                     onClick={() => handleSubClick(cat.name, subItem)}
//                     className={`block w-full text-left px-4 py-2 hover:bg-primary hover:text-white whitespace-nowrap ${
//                       selectedCategory === cat.name && selectedSub === subItem
//                         ? 'bg-primary text-white'
//                         : ''
//                     }`}
//                   >
//                     {subItem}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Show banner and category content only if NOT viewing a subcategory */}
//       {!selectedSub && (
//         <>
//           {/* Banner with image and text */}
//           <div className="relative w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
//             <img
//               src={banner.img}
//               alt={selectedCategory + ' banner'}
//               className="w-full h-48 object-cover"
//             />
//             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//               <h1 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg px-4">
//                 {banner.text}
//               </h1>
//             </div>
//           </div>
//           {/* Category Content */}
//           <div className="bg-white p-6 rounded-xl shadow mb-6">
//             <h2 className="text-2xl font-bold mb-2 text-primary">{selectedCategory}</h2>
//             <p className="mb-2">{currentCategory?.content}</p>
//           </div>
//         </>
//       )}

//       {/* Subcategory/Project Content */}
//       {selectedSub && selectedProject ? (
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h3 className="text-xl font-bold mb-4 text-primary">{selectedProject.title}</h3>
//           {selectedProject.blocks.map((block, index) => {
//             if (block.type === 'paragraph') {
//               return <p key={index} className="mb-4 text-gray-800">{block.content}</p>
//             }
//             if (block.type === 'image') {
//               return (
//                 <img
//                   key={index}
//                   src={block.src}
//                   alt={block.alt}
//                   className="mb-4 w-full rounded shadow"
//                 />
//               )
//             }
//             if (block.type === 'video') {
//               return (
//                 <div key={index} className="mb-6 aspect-video">
//                   <iframe
//                     src={block.src}
//                     className="w-full h-full rounded shadow"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//               )
//             }
//             if (block.type === 'slideshow') {
//               return (
//                 <div key={index} className="flex gap-4 overflow-x-auto mb-6 py-2">
//                   {block.images.map((img, i) => (
//                     <img key={i} src={img} className="h-40 rounded shadow" alt={`Slide ${i}`} />
//                   ))}
//                 </div>
//               )
//             }
//             return null
//           })}
//         </div>
//       ) : (
//         selectedSub && (
//           <div className="text-gray-500 text-center">No content found for this subcategory.</div>
//         )
//       )}
//     </>
//   )
// }
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import projects from '../data/projects'

const categoryBanners = {
  GP1: { img: '/images/gp1-banner.jpg', text: <>Guiding Principle 1 -<br />Teacher knows the subject that he teaches</> },
  GP2: { img: '/images/gp2-banner.jpg', text: <>Guiding Principle 2 -<br />Teacher knows the subject that he teaches</> },
  GP3: { img: '/images/gp3-banner.jpg', text: <>Guiding Principle 3 -<br />Teacher knows the subject that he teaches</>},
  GP4: { img: '/images/gp4-banner.jpg', text: <>Guiding Principle 4 -<br />Teacher knows the subject that he teaches</> },
  GP5: { img: '/images/gp5-banner.jpg', text: <>Guiding Principle 5 -<br />Teacher knows the subject that he teaches</> },
  GP6: { img: '/images/gp6-banner.jpg', text: <>Guiding Principle 6 -<br />Teacher knows the subject that he teaches</> },
}

const categories = [
  { name: 'GP1', content: 'General content for GP1. You can add images, text, etc. here.', sub: ['Teaching Activities and Subject Goals', 'Subject Connectivity and Relevant Checklist', 'Student paper /Essays/ Creative works'] },
  { name: 'GP2', content: 'General content for GP2.', sub: ['Action research/Case study'] },
  { name: 'GP3', content: 'General content for GP3.', sub: ['Teachers Incentive to Students', 'Strategies to Develop Critical Thinking in Students', 'Assessment Instruments /Records', 'Students overall development', 'Classroom Rules and Procedures'] },
  { name: 'GP4', content: 'General content for GP4.', sub: ['Professional Development', 'Assessment Records', 'Action Research', 'Professional Membership', 'Certificates', 'Presentations', 'Observations'] },
  { name: 'GP5', content: 'General content for GP5.', sub: ['Interaction with parents', 'Community Involvement'] },
  { name: 'GP6', content: 'General content for GP6.', sub: [''] },
]

export default function Portfolio() {
  const { category, sub } = useParams()
  const navigate = useNavigate()

  const selectedCategory = category || categories[0].name
  const selectedSub = sub || null

  useEffect(() => {
    if (!category) {
      navigate(`/portfolio/${categories[0].name}`, { replace: true })
    }
  }, [category, navigate])

  const currentCategory = categories.find(cat => cat.name === selectedCategory)
  const banner = categoryBanners[selectedCategory] || {
    img: '/images/default-banner.jpg',
    text: 'Welcome to the Portfolio Section',
  }

  const selectedProject = selectedSub
    ? projects.find(p => p.category === selectedCategory && p.sub === selectedSub)
    : null

  const handleCategoryClick = catName => {
    navigate(`/portfolio/${catName}`)
  }

  const handleSubClick = (catName, subName) => {
    navigate(`/portfolio/${catName}/${encodeURIComponent(subName)}`)
  }

  return (
    <>
      {/* Category Menu */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {categories.map(cat => (
          <div key={cat.name} className="relative group">
            <button
              onClick={() => handleCategoryClick(cat.name)}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-full font-medium transition duration-200 shadow-sm border text-sm sm:text-base whitespace-nowrap
                ${
                  selectedCategory === cat.name && !selectedSub
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 hover:bg-primary/10 border-gray-200'
                }`}
            >
              {cat.name}
            </button>

            {/* Dropdown Submenu */}
            <div className="absolute left-0 mt-2 hidden group-hover:block z-50 min-w-[220px] bg-white border rounded shadow">
              {cat.sub.map(subItem => (
                <button
                  key={subItem}
                  onClick={() => handleSubClick(cat.name, subItem)}
                  className={`block w-full text-left px-4 py-2 hover:bg-primary hover:text-white whitespace-nowrap text-sm sm:text-base ${
                    selectedCategory === cat.name && selectedSub === subItem
                      ? 'bg-primary text-white'
                      : ''
                  }`}
                >
                  {subItem}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Banner and Intro Text */}
      {!selectedSub && (
        <>
          <div className="relative w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={banner.img}
              alt={selectedCategory + ' banner'}
              className="w-full h-40 sm:h-48 md:h-56 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg px-4">
                {banner.text}
              </h1>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-primary">{selectedCategory}</h2>
            <p className="mb-2">{currentCategory?.content}</p>
          </div>
        </>
      )}

      {/* Subcategory Content */}
      {selectedSub && selectedProject ? (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4 text-primary">{selectedProject.title}</h3>

          {selectedProject.blocks.map((block, index) => {
            if (block.type === 'paragraph') {
              return <p key={index} className="mb-4 text-gray-800">{block.content}</p>
            }

            if (block.type === 'image') {
              return (
                <img
                  key={index}
                  src={block.src}
                  alt={block.alt}
                  className="mb-4 w-full rounded shadow"
                />
              )
            }

            if (block.type === 'video') {
              return (
                <div key={index} className="mb-6 aspect-video">
                  <iframe
                    src={block.src}
                    className="w-full h-full rounded shadow"
                    allowFullScreen
                  ></iframe>
                </div>
              )
            }

            if (block.type === 'slideshow') {
              return (
                <div key={index} className="flex gap-4 overflow-x-auto mb-6 py-2">
                  {block.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="h-32 sm:h-40 rounded shadow flex-shrink-0"
                      alt={`Slide ${i}`}
                    />
                  ))}
                </div>
              )
            }

            return null
          })}
        </div>
      ) : (
        selectedSub && (
          <div className="text-gray-500 text-center">No content found for this subcategory.</div>
        )
      )}
    </>
  )
}
