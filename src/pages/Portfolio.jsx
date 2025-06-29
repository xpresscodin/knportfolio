// import { useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import projects from '../data/projects'

// const categoryBanners = {
//   GP1: { img: '/assets/images/teach.jpg', text: <>GP#1 Teacher knows the subject she teaches</> },
//   GP2: { img: '/assets/images/teach2.jpg', text: <>GP#2 Teacher knows how to teach the subject(s) for which she is responsible</> },
//   GP3: { img: '/assets/images/teach3.png', text: <>GP#3 Teacher knows her students - effectively managing diversity to promote inclusive classes</> },
//   GP4: { img: '/assets/images/teach4.jpg', text: <>GP#4 Teacher sharpens her professional skill</> },
//   GP5: { img: '/assets/images/teach5.jpg', text: <>GP#5 Teacher interacts with parents and community</> },
//   GP6: { img: '/assets/images/teach6.png', text: <>GP#6 Teacher conducts herself in a manner that uplifts the profession</> },
// }

// const categories = [
//   {
//     name: 'GP1',
//     content: '',
//     sub: [
//       { num: '1.1', heading: 'Knows the subject content' },
//       { num: '1.2', heading: 'Is able to relate concepts to other subjects' },
//       { num: '1.3', heading: 'Knows and understands how the subject is structured in the curriculum' },
//       { num: '1.4', heading: 'Is able to relate subject to national development' },
//     ],
//   },
//   {
//     name: 'GP2',
//     content: '',
//     sub: [
//       { num: '2.1', heading: `Develops in learners' critical thinking and creative ways to solve their problem` },
//       { num: '2.2', heading: 'Ensures interactive, teaching and learning environment' },
//       { num: '2.3', heading: 'Engages in reflective thinking and action research' },
//       { num: '2.4', heading: 'Uses language appropriately and effectively in classroom communication' },
//     ],
//   },
//   {
//     name: 'GP3',
//     content: '',
//     sub: [
//       { num: '3.1', heading: `Knows age and developmental (intellectual, physical, social) characteristics of students` },
//       { num: '3.2', heading: 'Knows diverse factors' },
//       { num: '3.3', heading: 'Knows the principles of inclusive education and their applications' },
//       { num: '3.4', heading: 'Knows the different learning styles and approaches of students' },
//       { num: '3.5', heading: 'Knows and understands student skills, interests and previous learning and the effect of these on learning' },
//       { num: '3.6', heading: 'Knows of gender differences and how these affect learning' },
//       { num: '3.7', heading: 'Manages classroom behaviour to enable learning' },
//       { num: '3.8', heading: 'Assures and maintains a safe physical and psychological environment' },
//     ],
//   },
//   {
//     name: 'GP4',
//     content: '',
//     sub: [
//       { num: '4.1', heading: '' },
//       { num: '4.2', heading: '' },
//       { num: '4.3', heading: '' },
//     ],
//   },
//   {
//     name: 'GP5',
//     content: '',
//     sub: [
//       { num: '5.1', heading: '' },
//       { num: '5.2', heading: '' },
//       { num: '5.3', heading: '' },
//       { num: '5.4', heading: '' },
//     ],
//   },
//   {
//     name: 'GP6',
//     content: '',
//     sub: [
//       { num: '6.1', heading: '' },
//       { num: '6.2', heading: '' },
//       { num: '6.3', heading: '' },
//     ],
//   },
// ]

// export default function Portfolio() {
//   const { category, sub } = useParams()
//   const navigate = useNavigate()

//   const selectedCategory = category || categories[0].name
//   const selectedSub = sub || null

//   useEffect(() => {
//     if (!category) {
//       navigate(`/portfolio/${categories[0].name}`, { replace: true })
//     }
//   }, [category, navigate])

//   const currentCategory = categories.find(cat => cat.name === selectedCategory)
//   const banner = categoryBanners[selectedCategory] || {
//     img: '/images/default-banner.jpg',
//     text: 'Welcome to the Portfolio Section',
//   }

//   // Find the sub object for heading
//   const selectedSubObj = selectedSub && currentCategory?.sub.find(s => s.num === selectedSub)

//   // Find the project for content
//   const selectedProject = selectedSubObj
//     ? projects.find(p => p.category === selectedCategory && p.sub === selectedSubObj.heading)
//     : null

//   const handleCategoryClick = catName => {
//     navigate(`/portfolio/${catName}`)
//   }

//   const handleSubClick = (catName, subNum) => {
//     navigate(`/portfolio/${catName}/${subNum}`)
//   }

//   return (
//     <>
//       {/* Category Menu */}
//       <div className="mb-6 flex flex-wrap justify-center gap-3">
//         {categories.map(cat => (
//           <div key={cat.name} className="relative group">
//             <button
//               onClick={() => handleCategoryClick(cat.name)}
//               className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 rounded-full font-medium transition duration-200 shadow-sm border text-sm sm:text-base whitespace-nowrap
//                 ${
//                   selectedCategory === cat.name && !selectedSub
//                     ? 'bg-primary text-white border-primary'
//                     : 'bg-white text-gray-700 hover:bg-primary/10 border-gray-200'
//                 }`}
//             >
//               {cat.name}
//             </button>

//             {/* Dropdown Submenu */}
//             <div className="absolute left-0 mt-0 hidden group-hover:block z-50 min-w-[220px] bg-white border rounded shadow">
//               {cat.sub.map(subItem => (
//                 <button
//                   key={subItem.num}
//                   onClick={() => handleSubClick(cat.name, subItem.num)}
//                   className={`block w-full text-left px-4 py-2 hover:bg-primary hover:text-white whitespace-nowrap text-sm sm:text-base ${
//                     selectedCategory === cat.name && selectedSub === subItem.num
//                       ? 'bg-primary text-white'
//                       : ''
//                   }`}
//                 >
//                   {subItem.num}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Banner and Intro Text */}
//       {!selectedSub && (
//         <>
//           <div className="relative w-full mb-8 rounded-2xl overflow-hidden shadow-lg">
//             <img
//               src={banner.img}
//               alt={selectedCategory + ' banner'}
//               className="w-full h-40 sm:h-48 md:h-56 object-cover"
//             />
//             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//               <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg px-4">
//                 {banner.text}
//               </h1>
//             </div>
//           </div>

//           <div className="bg-white p-4 sm:p-6 rounded-xl shadow mb-6">
//             <h2 className="text-xl sm:text-2xl font-bold mb-2 text-primary">{selectedCategory}</h2>
//             <p className="mb-2">{currentCategory?.content}</p>
//           </div>
//         </>
//       )}

//       {/* Subcategory Content */}
//       {selectedSub && (
//         <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
//           <h3 className="text-xl font-bold mb-4 text-primary">
//             {selectedSubObj?.heading || selectedSub}
//           </h3>
//           {selectedProject ? (
//             selectedProject.blocks.map((block, index) => {
//               if (block.type === 'paragraph') {
//                 return <p key={index} className="mb-4 text-gray-800">{block.content}</p>
//               }
//               if (block.type === 'image') {
//                 return (
//                   <img
//                     key={index}
//                     src={block.src}
//                     alt={block.alt}
//                     className="mb-4 w-full rounded shadow"
//                   />
//                 )
//               }
//               if (block.type === 'video') {
//                 return (
//                   <div key={index} className="mb-6 aspect-video">
//                     <iframe
//                       src={block.src}
//                       className="w-full h-full rounded shadow"
//                       allowFullScreen
//                     ></iframe>
//                   </div>
//                 )
//               }
//               if (block.type === 'slideshow') {
//                 return (
//                   <div key={index} className="flex gap-4 overflow-x-auto mb-6 py-2">
//                     {block.images.map((img, i) => (
//                       <img
//                         key={i}
//                         src={img}
//                         className="h-32 sm:h-40 rounded shadow flex-shrink-0"
//                         alt={`Slide ${i}`}
//                       />
//                     ))}
//                   </div>
//                 )
//               }
//               if (block.type === 'pdf') {
//                 return (
//                   <div key={index} className="mb-8">
//                     <div className="font-semibold text-primary mb-2">{block.title}</div>
//                     <iframe
//                       src={block.src}
//                       title={block.title}
//                       width="100%"
//                       height="600px"
//                       className="w-full border rounded shadow"
//                     ></iframe>
//                   </div>
//                 )
//               }
//               return null
//             })
//           ) : (
//             <div className="text-gray-500 text-center">No content found for this subcategory.</div>
//           )}
//         </div>
//       )}
//     </>
//   )
// }
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import projects from '../data/projects'

const categoryBanners = {
  GP1: { img: '/assets/images/teach.jpg', text: <>GP#1 Teacher knows the subject she teaches</> },
  GP2: { img: '/assets/images/teach2.jpg', text: <>GP#2 Teacher knows how to teach the subject(s) for which she is responsible</> },
  GP3: { img: '/assets/images/teach3.png', text: <>GP#3 Teacher knows her students - effectively managing diversity to promote inclusive classes</> },
  GP4: { img: '/assets/images/teach4.jpg', text: <>GP#4 Teacher sharpens her professional skill</> },
  GP5: { img: '/assets/images/teach5.jpg', text: <>GP#5 Teacher interacts with parents and community</> },
  GP6: { img: '/assets/images/teach6.png', text: <>GP#6 Teacher conducts herself in a manner that uplifts the profession</> },
}

const categories = [
  {
    name: 'GP1',
    content: '',
    sub: [
      { num: '1.1', heading: 'Knows the subject content' },
      { num: '1.2', heading: 'Is able to relate concepts to other subjects' },
      { num: '1.3', heading: 'Knows and understands how the subject is structured in the curriculum' },
      { num: '1.4', heading: 'Is able to relate subject to national development goals' },
    ],
  },
  {
    name: 'GP2',
    content: '',
    sub: [
      { num: '2.1', heading: `Develops in learners' critical thinking and creative ways to solve their problem` },
      { num: '2.2', heading: 'Ensures interactive, teaching and learning environment' },
      { num: '2.3', heading: 'Engages in reflective thinking and action research' },
      { num: '2.4', heading: 'Uses language appropriately and effectively in classroom communication' },
    ],
  },
  {
    name: 'GP3',
    content: '',
    sub: [
      { num: '3.1', heading: `Knows age and developmental (intellectual, physical, social) characteristics of students` },
      { num: '3.2', heading: 'Knows the diverse factors (social, cultural, religious,gender, environmental, special educational needs) that impact students’ learning' },
      { num: '3.3', heading: 'Knows the principles of inclusive education and their applications' },
      { num: '3.4', heading: 'Knows the different learning styles and approaches of students' },
      { num: '3.5', heading: 'Knows and understands student skills, interests and previous learning and the effect of these on learning' },
      // { num: '3.6', heading: 'Knows of gender differences and how these affect learning' },
      { num: '3.7', heading: 'Manages classroom behaviour to enable learning' },
      { num: '3.8', heading: 'Assures and maintains a safe physical and psychological environment' },
    ],
  },
  {
    name: 'GP4',
    content: '',
    sub: [
      { num: '4.1', heading: 'Rigorously assesses ones’ performance in the teaching and learning process, collaborates with peers to critically examine ones’ teaching and learning performance, creates a personal plan for improvement and shares successful practices' },
      { num: '4.2', heading: 'Seeks out and pursues opportunities for improving mastery of content and methodology and builds competences in the use of technology in education.' },
      { num: '4.3', heading: 'Maintains higher order functioning through strengthening abilities to reason, reflect, make fair judgment, evaluate, analyze and interpret.' },
    ],
  },
  {
    name: 'GP5',
    content: '',
    sub: [
      { num: '5.1', heading: 'Communicates with parents/caregivers to stimulate their interest in their children’s progress and reinforce learning, always giving priority interest to the learner' },
      { num: '5.2', heading: 'Engages community members to build trust, to foster open communication and to work collaboratively with parents to benefit students’ achievement levels' },
      // { num: '5.3', heading: 'Engages parents and community' },
      { num: '5.4', heading: 'Use community creatively as a source of educational experiences' },
    ],
  },
  {
    name: 'GP6',
    content: '',
    sub: [
      { num: '6.1', heading: 'Modelled positive behaviour and responded positively to constructive criticisms' },
      { num: '6.2', heading: 'Commits to the success oflearners as individuals andof the institution as a whole' },
      // { num: '6.3', heading: 'Commit to the success of learners' },
    ],
  },
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

  // Find the sub object for heading
  const selectedSubObj = selectedSub && currentCategory?.sub.find(s => s.num === selectedSub)

  // Find the project for content
  const selectedProject = selectedSubObj
    ? projects.find(p => p.category === selectedCategory && p.sub === selectedSubObj.heading)
    : null

  const handleCategoryClick = catName => {
    navigate(`/portfolio/${catName}`)
  }

  const handleSubClick = (catName, subNum) => {
    navigate(`/portfolio/${catName}/${subNum}`)
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
            <div className="absolute left-0 mt-0 hidden group-hover:block z-50 min-w-[220px] bg-white border rounded shadow">
              {cat.sub.map(subItem => (
                <button
                  key={subItem.num}
                  onClick={() => handleSubClick(cat.name, subItem.num)}
                  className={`block w-full text-left px-4 py-2 hover:bg-primary hover:text-white whitespace-nowrap text-sm sm:text-base ${
                    selectedCategory === cat.name && selectedSub === subItem.num
                      ? 'bg-primary text-white'
                      : ''
                  }`}
                >
                  {subItem.num}
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
      {selectedSub && (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4 text-primary">
            {selectedSubObj?.heading || selectedSub}
          </h3>
          {selectedProject ? (
            selectedProject.blocks.map((block, index) => {
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
              if (block.type === 'pdf') {
                return (
                  <div key={index} className="mb-8">
                    <div className="font-semibold text-primary mb-2">{block.title}</div>
                    <iframe
                      src={block.src}
                      title={block.title}
                      width="100%"
                      height="600px"
                      className="w-full border rounded shadow"
                    ></iframe>
                  </div>
                )
              }
              return null
            })
          ) : (
            <div className="text-gray-500 text-center">No content found for this subcategory.</div>
          )}
        </div>
      )}
    </>
  )
}
