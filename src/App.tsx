import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import CodeDemo from './components/CodeDemo'
import Footer from './components/Footer'
import PricingPage from './pages/PricingPage'
import DocsPage from './pages/DocsPage'
import DevPage from './pages/DevPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <Navbar />
      <Hero />
      <Features />
      <CodeDemo />
      <Footer />
    </div>
  )
}

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}
