import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import backgroundMusic from './assets/color-your-night.mp4'
import { bootstrapBackgroundAudio } from './backgroundAudio'
import { primeClickAudio } from './clickAudio'
import './index.css'
import App from './App.jsx'

bootstrapBackgroundAudio(backgroundMusic)
primeClickAudio().then(() => bootstrapBackgroundAudio(backgroundMusic))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
