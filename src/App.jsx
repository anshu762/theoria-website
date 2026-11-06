import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Research from './pages/Research.jsx';
import Elite from './pages/Elite.jsx';
import Podcasts from './pages/Podcasts.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Research />} />
          <Route path="elite" element={<Elite />} />
          <Route path="podcasts" element={<Podcasts />} />
          <Route path="contact" element={<Contact />} />
          {/* keep old UniVisory-style URLs working */}
          <Route path="research.html" element={<Navigate to="/" replace />} />
          <Route path="eliteresearchmentorship.html" element={<Navigate to="/elite" replace />} />
          <Route path="contact.html" element={<Navigate to="/contact" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}