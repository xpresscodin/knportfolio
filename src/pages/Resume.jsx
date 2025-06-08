export default function Resume() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">📜 Resume</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">🎓 Education</h2>
          <ul className="list-disc ml-5 mt-2">
            <li>B.Sc. Computer Science - MIT (2020–2024)</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">💼 Experience</h2>
          <ul className="list-disc ml-5 mt-2">
            <li>Frontend Dev @ DevTech (2022–2023)</li>
          </ul>
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-accent text-white px-4 py-2 rounded mt-4"
        >
          📥 Download Resume
        </a>
      </div>
    </>
  )
}
