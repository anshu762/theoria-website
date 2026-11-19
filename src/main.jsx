import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'            // Tailwind
import './styles/theoria.css'   // Theoria design system (loaded after Tailwind)
import './styles/about.css'
import './styles/beyondResearch.css'
import './styles/successStories.css'
import './styles/publications.css'
import './styles/researchFit.css'
import './styles/program.css'
import './styles/contact.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)