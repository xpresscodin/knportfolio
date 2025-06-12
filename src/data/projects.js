const projects = [
  // === GP1 ===
  {
    id: 1,
    category: 'GP1',
    sub: 'Teaching Activities and Subject Goals',
    title: 'Teaching Goals & Lesson Strategies',
    blocks: [
      {
        type: 'paragraph',
        content: 'This section outlines the objectives of the lesson plans and the subject-specific strategies used to engage students.',
      },
      {
        type: 'image',
        src: '/assets/images/Teaching/1.jpeg',
        alt: 'Interaction with smartboard - matching activity',
      },
      {
        type: 'paragraph',
        content: 'Interaction with smartboard - matching activity',
      },
      {
        type: 'image',
        src: '/assets/images/Teaching/2.jpeg',
        alt: 'Class collaboration with creative expression',
      },
      {
        type: 'paragraph',
        content: 'Class collaboration with creative expression',
      },
      {
        type: 'image',
        src: '/assets/images/Teaching/3.jpeg',
        alt: 'Unscrambling the months of the year on the smartboard',
      },
      {
        type: 'paragraph',
        content: 'Unscrambling the months of the year on the smartboard',
      },
      {
        type: 'image',
        src: '/assets/images/Teaching/4.jpeg',
        alt: 'Peer reading moment - One student is reading for her peers after reading was modelled by teacher',
      },
      {
        type: 'paragraph',
        content: 'Peer reading moment - One student is reading for her peers after reading was modelled by teacher',
      },
      {
        type: 'image',
        src: '/assets/images/Teaching/5.jpeg',
        alt: 'Class collaboration with creative expression',
      },
      {
        type: 'paragraph',
        content: 'Class collaboration with creative expression',
      },
      // {
      //   type: 'slideshow',
      //   images: [
      //     '/images/activity1.jpg',
      //     '/images/activity2.jpg',
      //     '/images/activity3.jpg',
      //   ],
      // },
    ],
  },
  {
    id: 2,
    category: 'GP1',
    sub: 'Subject Connectivity and Relevant Checklist',
    title: 'Curriculum Relevance Checklist',
    blocks: [
      {
        type: 'paragraph',
        content: 'Checklist showing how subject matter is aligned with real-world application and connects to cross-curricular goals.',
      },
      {
        type: 'image',
        src: '/images/checklist.jpg',
        alt: 'Connectivity Checklist',
      },
    ],
  },
  {
    id: 3,
    category: 'GP1',
    sub: 'Student paper /Essays/ Creative works',
    title: 'Student Creative Work Showcase',
    blocks: [
      {
        type: 'slideshow',
        images: [
          '/images/essay1.jpg',
          '/images/essay2.jpg',
        ],
      },
      {
        type: 'paragraph',
        content: 'These are samples of essays, poetry, and creative assignments submitted by students.',
      },
    ],
  },

  // === GP2 ===
  {
    id: 4,
    category: 'GP2',
    sub: 'Lesson Plans',
    title: 'Lesson Plans and more',
    blocks: [
      {
        type: 'powerpoint',
        src: '/assets/images/powerpoints/_week 6-7 ¿Dónde vives tú_ -.pptx',
        title: 'PowerPoint 1',
      },
      {
        type: 'powerpoint',
        src: '/assets/images//powerpoints/_Weeks 2-3 - ¿Quién eres tú_.pptx',
        title: 'PowerPoint 2',
      },
      {
        type: 'powerpoint',
        src: '/assets/images//powerpoints/_Weeks -9-10- ¿Cómo es tu casa_.pptx',
        title: 'PowerPoint 3',
      },
      {
        type: 'powerpoint',
        src: '/assets/images//powerpoints/Grade 7 Week 7-9 - ¿Cómo eres tú_.pptx',
        title: 'PowerPoint 4',
      },
      {
        type: 'powerpoint',
        src: '/assets/images//powerpoints/Grade 9 - Lávate las manos antes de cocinar - El imperativo.pptx',
        title: 'PowerPoint 5',
      },
      {
        type: 'powerpoint',
        src: '/assets/images//powerpoints/La Buena Salud - Weeks 3 - 5.pptx',
        title: 'PowerPoint 6',
      },
      {
        type: 'powerpoint',
        src: '/assets/images//powerpoints/Week 2  COUNTRIES AND NATIONALITIES GR7 .pptx',
        title: 'PowerPoint 7',
      },
      {
        type: 'powerpoint',
        src: '/assets/images//powerpoints/week 8-9 ¿Cuántos años tienes_.pptx',
        title: 'PowerPoint 7',
      },
      {
        type: 'powerpoint',
        src: '/assets/images//powerpoints/Week 2- Grade 10 Ppt- New Year Week - Review of future tense (1).pptx',
        title: 'PowerPoint 7',
      },
      {
        type: 'powerpoint',
        src: '/assets/images//powerpoints/Week 8 - Week 9 - Comparativos- Los deportes.pptx',
        title: 'PowerPoint 7',
      },
    ],
  },

  // === GP3 ===
  {
    id: 5,
    category: 'GP3',
    sub: 'Teachers Incentive to Students',
    title: 'Motivational Tools and Student Rewards',
    blocks: [
      {
        type: 'paragraph',
        content: 'Includes examples of how teachers use badges, praise, and certificates to encourage student growth.',
      },
      {
        type: 'image',
        src: '/images/incentives.jpg',
        alt: 'Student Incentives',
      },
    ],
  },
  {
    id: 6,
    category: 'GP3',
    sub: 'Strategies to Develop Critical Thinking in Students',
    title: 'Building Critical Thinking Skills',
    blocks: [
      {
        type: 'paragraph',
        content: 'Methods include Socratic questioning, problem-based learning, and open discussion prompts.',
      },
      {
        type: 'slideshow',
        images: [
          '/images/critical-thinking1.jpg',
          '/images/critical-thinking2.jpg',
        ],
      },
    ],
  },
  {
    id: 7,
    category: 'GP3',
    sub: 'Assessment Instruments /Records',
    title: 'Assessment Records Overview',
    blocks: [
      {
        type: 'image',
        src: '/images/assessment-chart.jpg',
        alt: 'Assessment Chart',
      },
      {
        type: 'paragraph',
        content: 'Overview of quizzes, rubrics, and record-keeping used in class assessments.',
      },
    ],
  },
  {
    id: 8,
    category: 'GP3',
    sub: 'Students overall development',
    title: 'Student Development Reports',
    blocks: [
      {
        type: 'image',
        src: '/src/assets/images/Development/1.jpeg',
        alt: 'Rules Poster',
      },
      {
        type: 'paragraph',
        content: 'Tracking student progress through emotional, social, and academic indicators.',
      },
      {
        type: 'image',
        src: '/src/assets/images/Development/2.jpeg',
        alt: 'Rules Poster',
      },
      {
        type: 'paragraph',
        content: 'Tracking student progress through emotional, social, and academic indicators.',
      },
      {
        type: 'slideshow',
        images: ['/src/assets/images/Development/3.jpeg', '/src/assets/images/Development/4.jpeg','/src/assets/images/Development/5.jpeg', '/src/assets/images/Development/6.jpeg'],
      },
    ],
  },
  {
    id: 9,
    category: 'GP3',
    sub: 'Classroom Rules and Procedures',
    title: 'Standard Classroom Rules',
    blocks: [
      {
        type: 'image',
        src: '/images/rules.jpg',
        alt: 'Rules Poster',
      },
      {
        type: 'paragraph',
        content: 'Posted rules and behavior expectations help maintain classroom discipline.',
      },
    ],
  },

  // === GP4 ===
  {
    id: 10,
    category: 'GP4',
    sub: 'Professional Development',
    title: 'Courses & Workshops',
    blocks: [
      {
        type: 'slideshow',
        images: ['/images/workshop1.jpg', '/images/workshop2.jpg'],
      },
      {
        type: 'paragraph',
        content: 'Certificates and attendance from PD courses attended during the school year.',
      },
    ],
  },
  {
    id: 11,
    category: 'GP4',
    sub: 'Assessment Records',
    title: 'Formal Assessment Logs',
    blocks: [
      {
        type: 'paragraph',
        content: 'Screenshots of spreadsheets and student grade logs.',
      },
      {
        type: 'image',
        src: '/images/records.jpg',
        alt: 'Assessment Records',
      },
    ],
  },
  {
    id: 12,
    category: 'GP4',
    sub: 'Action Research',
    title: 'Teacher-led Research Paper',
    blocks: [
      {
        type: 'paragraph',
        content: 'Paper describing research conducted to improve group-based learning in math.',
      },
    ],
  },
  {
    id: 13,
    category: 'GP4',
    sub: 'Professional Membership',
    title: 'Professional Groups',
    blocks: [
      {
        type: 'image',
        src: '/images/membership-card.jpg',
        alt: 'Membership',
      },
    ],
  },
  {
    id: 14,
    category: 'GP4',
    sub: 'Certificates',
    title: 'Certification & Licensing',
    blocks: [
      {
        type: 'image',
        src: '/images/cert1.jpg',
        alt: 'Certificate 1',
      },
      {
        type: 'image',
        src: '/images/cert2.jpg',
        alt: 'Certificate ',
      },
    ],
  },
  {
    id: 15,
    category: 'GP4',
    sub: 'Presentations',
    title: 'Workshop Presentations',
    blocks: [
      {
        type: 'video',
        src: 'https://www.youtube.com/embed/V-_O7nl0Ii0',
      },
      {
        type: 'paragraph',
        content: 'Recordings of sessions and slide decks used during training.',
      },
    ],
  },
  {
    id: 16,
    category: 'GP4',
    sub: 'Observations',
    title: 'Class Observations Feedback',
    blocks: [
      {
        type: 'paragraph',
        content: 'Feedback from school administrators and fellow teachers after observation.',
      },
    ],
  },

  // === GP5 ===
  {
    id: 17,
    category: 'GP5',
    sub: 'Interaction with parents',
    title: 'Parent Engagement Activities',
    blocks: [
      {
        type: 'paragraph',
        content: 'Summary of parent-teacher conferences, call logs, and newsletters sent home.',
      },
    ],
  },
  {
    id: 18,
    category: 'GP5',
    sub: 'Community Involvement',
    title: 'Community Service Project',
    blocks: [
      {
        type: 'image',
        src: '/images/community.jpg',
        alt: 'Community Event',
      },
      {
        type: 'paragraph',
        content: 'Images and descriptions from cleanup drives and volunteer activities.',
      },
    ],
  },
  // {
  //   id: 19,
  //   category: 'GP6',
  //   sub: '',
  //   title: 'GP6',
  //   blocks: [
  //     {
  //       type: 'image',
  //       src: '/images/community.jpg',
  //       alt: 'Community Event',
  //     },
  //     {
  //       type: 'paragraph',
  //       content: 'Images and descriptions from cleanup drives and volunteer activities.',
  //     },
  //   ],
  // },
]

export default projects
