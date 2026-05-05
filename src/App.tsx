import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import CodeDemo from './components/CodeDemo'
import Footer from './components/Footer'
import PricingPage from './pages/PricingPage'
import DocsPage from './pages/DocsPage'
import DevPage from './pages/DevPage'

function LandingPage({ theme, toggleTheme }: { theme: 'dark' | 'light'; toggleTheme: () => void }) {
  return (
    <div className="noise" style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Features />
      <CodeDemo />
      <Footer />
    </div>
  )
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/home" element={<LandingPage theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/dev" element={<DevPage />} />
      </Routes>
    </BrowserRouter>
  )
}
