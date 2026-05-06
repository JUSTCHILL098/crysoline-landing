import { useEffect } from 'react'
import { MessageCircle, Mail, Clock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const responseTimes = [
  { time: '< 2 hours', label: 'Critical Issues', desc: 'API downtime, security issues' },
  { time: '< 24 hours', label: 'Support Requests', desc: 'Technical help, bug reports' },
  { time: '< 48 hours', label: 'General Inquiries', desc: 'Sales, partnerships, general questions' },
]

const faqs = [
  {
    q: 'How do I get an API key?',
    a: 'Visit our dashboard to sign up and get your API key instantly. Free tier requires no payment information.',
  },
  {
    q: 'What are the rate limits?',
    a: 'Rate limits vary by plan. Check our pricing page for details.',
  },
  {
    q: 'Do you have documentation?',
    a: 'Yes! Complete API documentation is available at docs.crysoline.moe with examples and guides.',
  },
  {
    q: 'Can I use this for commercial projects?',
    a: 'Sure! Our Paid and Premium tiers are designed for commercial use.',
  },
]

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <Navbar />
      <div style={{ paddingTop: 64 }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 2rem 80px' }}>

          {/* Header */}
          <div style={{ marginBottom: '3.5rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }}>Get in Touch</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>Contact Us</h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 560 }}>
              Have questions about our API? Need technical support? Want to discuss a partnership? We'd love to hear from you.
            </p>
          </div>

          {/* Contact channels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            <a
              href="https://dsc.gg/crysoline"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '1.75rem',
                background: 'rgba(88,101,242,0.08)',
                border: '1px solid rgba(88,101,242,0.25)',
                borderRadius: 12, textDecoration: 'none',
                transition: 'border-color 0.2s, background 0.2s',
                display: 'block',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(88,101,242,0.5)'; e.currentTarget.style.background = 'rgba(88,101,242,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(88,101,242,0.25)'; e.currentTarget.style.background = 'rgba(88,101,242,0.08)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
                <MessageCircle size={20} style={{ color: '#7289da' }} />
                <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Discord Community</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                Join our community for real-time support and discussions (recommended)
              </p>
              <span style={{ fontSize: 13, color: '#7289da', fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)' }}>
                dsc.gg/crysoline
              </span>
            </a>

            <a
              href="mailto:support@crysoline.moe"
              style={{
                padding: '1.75rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, textDecoration: 'none',
                transition: 'border-color 0.2s',
                display: 'block',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
                <Mail size={20} style={{ color: 'rgba(255,255,255,0.5)' }} />
                <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Technical Support</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                API integration help, bug reports, and all support requests
              </p>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)' }}>
                support@crysoline.moe
              </span>
            </a>
          </div>

          {/* Response times */}
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
              <Clock size={16} style={{ color: 'rgba(255,255,255,0.4)' }} />
              <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Response Times</h2>
            </div>
            <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden' }}>
              {responseTimes.map((rt, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '120px 1fr',
                  gap: '1rem', padding: '1rem 1.25rem',
                  borderBottom: i < responseTimes.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontSize: 14, fontWeight: 700, color: '#22c55e',
                    fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
                  }}>{rt.time}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{rt.label}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{rt.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Before You Contact Us</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: '1.25rem' }}>
              Check these common questions that might help you faster
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{
                  padding: '1.25rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10,
                }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>{faq.q}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
