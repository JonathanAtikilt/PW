import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import backgroundVideo from './assets/main1.mp4'
import BackgroundVideo from './BackgroundVideo'
import ClickSound from './ClickSound'
import P3Menu from './P3Menu'
import ResumePage from './ResumePage'
import ExperiencePage from './ExperiencePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import './App.css'
import './mobile.css'

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition variant="resume"><ResumePage src={backgroundVideo} /></PageTransition>
        } />
        <Route path="/experience" element={
          <PageTransition variant="experience"><ExperiencePage src={backgroundVideo} /></PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition variant="experience"><ExperiencePage src={backgroundVideo} /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <BackgroundVideo />
      <ClickSound />
      <AnimatedRoutes />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
