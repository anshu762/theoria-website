import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import RouteEffects from './components/RouteEffects.jsx'
import BottomBanner from './components/BottomBanner.jsx'

import Home from './pages/Home.jsx'
import WhyResearch from './pages/WhyResearch.jsx'
import Programs from './pages/Programs.jsx'
import ResearchLibrary from './pages/ResearchLibrary.jsx'
import WhyTheoria from './pages/WhyTheoria.jsx'
import Podcast from './pages/Podcast.jsx'
import About from './pages/About.jsx'
import Apply from './pages/Apply.jsx'

export default function App() {
  return (
    <>
      {/* Theoria book icon (blue + purple), reused everywhere */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <symbol id="ic" viewBox="0 0 120 100">
          <circle cx="60" cy="16" r="12.5" fill="#9DBEFF" />
          <path d="M22 27 Q43 26 56 44 L51 45 Q40 34 22 33Z" fill="#9DBEFF" />
          <path d="M98 27 Q77 26 64 44 L69 45 Q80 34 98 33Z" fill="#B68AF6" />
          <path d="M6 38 Q40 33 56 52 L56 90 Q40 68 11 73 Q16 55 6 38Z" fill="#9DBEFF" />
          <path d="M114 38 Q80 33 64 52 L64 90 Q80 68 109 73 Q104 55 114 38Z" fill="#B68AF6" />
          <rect x="58.4" y="38" width="3.2" height="52" rx="1.6" fill="#9DBEFF" />
        </symbol>
      </svg>

      <ScrollProgress />
      <RouteEffects />
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/why-research" element={<WhyResearch />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/research" element={<ResearchLibrary />} />
          <Route path="/why-theoria" element={<WhyTheoria />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/about" element={<About />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
       <BottomBanner />
    </>
  )
}