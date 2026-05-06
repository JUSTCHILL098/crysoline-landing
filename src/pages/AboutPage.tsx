import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Database, Code2, Shield, Users } from 'lucide-react'

const whatWeDo = [
  {
    icon: Database,
    title: 'Data Aggregation',
    desc: 'We collect and normalize data from multiple sources to provide comprehensive information about anime, manga, and light novels.',
  },
  {
    icon: Code2,
    title: 'API Development',
    desc: 'Our RESTful API is designed for developers, with clear documentation, rate limiting, and multiple pricing tiers to suit any project.',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    desc: 'We maintain high data quality standards with automated validation and manual verification processes.',
  },
  {
    icon: Users,
    title: 'Community Support',
    desc: 'We work closely with developers and the anime community to continuously improve our service and add new features.',
  },
]

export default function AboutPage() {
  const navigate = useNavigate()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <Navbar />
      <div style={{ paddingTop: 64 }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 2rem 80px' }}>

          {/* Header */}
          <div style={{ marginBottom: '4rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }}>Company</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>About Crysoline</h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 600 }}>
              Empowering developers worldwide with comprehensive anime, manga, and light novel data.
            </p>
          </div>

          {/* Mission */}
          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1rem' }}>Our Mission</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1rem' }}>
              We believe in making anime, manga, and light novel data accessible to developers and creators worldwide. Our mission is to provide the most comprehensive, reliable, and easy-to-use API for accessing metadata from multiple sources.
            </p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              We're passionate about the anime and manga community, and we want to empower developers to build amazing applications that connect fans with the content they love.
            </p>
          </div>

          {/* Vision */}
          <div style={{ marginBottom: '3.5rem', padding: '2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1rem' }}>Our Vision</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1rem' }}>
              We envision a world where accessing anime and manga data is as simple as making a single API call. By aggregating multiple data sources and providing a unified interface, we're building the infrastructure that powers the next generation of anime and manga applications.
            </p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              From streaming platforms to recommendation engines, from fan websites to mobile apps — Crysoline is the foundation that makes it all possible.
            </p>
          </div>

          {/* What We Do */}
          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>What We Do</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {whatWeDo.map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{
                  padding: '1.5rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10,
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1rem',
                  }}>
                    <Icon size={16} style={{ color: 'rgba(255,255,255,0.6)' }} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: '0.5rem' }}>{title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trusted Partners */}
          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Trusted Partners</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' }}>
              We're proud to power some of the most popular anime and manga applications in the community.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {['1Anime', 'Zantaku'].map(name => (
                <div key={name} style={{
                  padding: '8px 18px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 8,
                  fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.6)',
                }}>{name}</div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{
            padding: '2.5rem', textAlign: 'center',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 14,
          }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>Ready to Build with Us?</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
              Join the developers and companies already building with Crysoline API
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://docs.crysoline.moe"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#fff', color: '#000',
                  padding: '11px 24px', borderRadius: 8,
                  fontSize: 14, fontWeight: 600, textDecoration: 'none',
                  transition: 'all 0.2s', display: 'inline-block',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.border = '1px solid #fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.border = '1px solid transparent' }}
              >Get Started</a>
              <button
                onClick={() => navigate('/contact')}
                style={{
                  background: 'transparent', color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '11px 24px', borderRadius: 8,
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
              >Contact Us</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
