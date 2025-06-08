export default function About() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-primary inline-block">About Me</h1>
      <p className="mt-2 text-gray-700">
        ¡Hola! My name is Kenise Needham-Farquharson, and I am a passionate and dedicated Spanish teacher with 7 years of experience helping students of all ages and backgrounds discover the beauty of the Spanish language and culture. Whether you're a complete beginner or looking to improve your fluency, I tailor each lesson to suit your goals, interests, and learning style.
I hold a degree in Bachelors of Arts Spanish (Major) and have taught in various settings, including schools, online platforms, and private sessions. My teaching approach is interactive, practical, and encouraging—designed to build confidence and real-world communication skills.
Learning a new language should be an enjoyable and rewarding journey. I strive to create a supportive environment where students feel motivated and empowered to reach their full potential.
Let’s embark on this exciting language adventure together—¡Vamos a aprender español!
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">What I do!</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-purple-50 p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-1">Personalized Spanish Lessons</h3>
          <p className="text-sm text-gray-600">I create custom lesson plans based on your goals—whether you're learning for travel, school, work, or just for fun..</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-1">Conversational Practice</h3>
          <p className="text-sm text-gray-600">Build real-world speaking skills and fluency through guided conversation and interactive speaking exercises.</p>
        </div>
        <div className="bg-pink-50 p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-1">Grammar & Writing Support</h3>
          <p className="text-sm text-gray-600">Master Spanish grammar and improve your writing with clear explanations and practical exercises.</p>
        </div>
        <div className="bg-blue-50 p-4 rounded shadow">
          <h3 className="font-bold text-lg mb-1">Cultural Insights & Real-Life Context</h3>
          <p className="text-sm text-gray-600">Learn about Hispanic cultures, customs, and expressions to understand the language beyond the textbook.</p>
        </div>
      </div>
    </div>
  )
}
