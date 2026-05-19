import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import backgroundVideo from './assets/main1.mp4'
import BackgroundVideo from './BackgroundVideo'
import ClickSound from './ClickSound'
import P3Menu from './P3Menu'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import './App.css'

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
        <Route path="/projects" element={
          <PageTransition variant="resume"><ResumePage src={backgroundVideo} initialActive={2} /></PageTransition>
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
    </>
  )
}
