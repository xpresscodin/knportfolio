import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Resume from './pages/Resume'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Reviews from './pages/Reviews'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<About />} />
          <Route path="resume" element={<Resume />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:category" element={<Portfolio />} />
          <Route path="/portfolio/:category/:sub" element={<Portfolio />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
