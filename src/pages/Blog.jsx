

const posts = [
  {
    id: 1,
    title: 'How I built this portfolio',
    summary: 'A look into the React + Tailwind setup and my learning process...',
    date: 'May 2025',
  },
]

export default function Blog() {
  return (
    
      <><h1 className="text-3xl font-bold mb-4">📝 Blog</h1><div className="space-y-6">
      {posts.map(post => (
        <div key={post.id} className="p-4 border rounded">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-500">{post.date}</p>
          <p className="mt-2">{post.summary}</p>
        </div>
      ))}
    </div></>
    
  )
}
