import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnimatedSection from '../components/AnimatedSection'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    desc: 'Perfect for getting started and small projects',
    features: [
      '1,000 API calls per month',
      'Basic rate limiting',
      'Limited provider access',
      'Community support',
      'Standard documentation',
    ],
    specs: [
      'Rate limit: 10 requests/minute',
      'Providers: Basic anime/manga sources only',
      'No priority support',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Paid',
    price: '$5',
    period: '/month',
    desc: 'Great for growing applications and developers',
    features: [
      '50,000 API calls per month',
      'Higher rate limits',
      'Extended provider access',
      'Email support',
      'Advanced documentation',
      'Usage analytics',
    ],
    specs: [
      'Rate limit: 100 requests/minute',
      'Providers: Most anime/manga/novel sources',
      'Support (24-48h response)',
    ],
    cta: 'Start Paid Plan',
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '$10',
    period: '/month',
    desc: 'For high-traffic applications',
    features: [
      'Unlimited API calls',
      'No rate limiting',
      'All provider access',
      'Priority support',
      'Custom integrations',
      'Detailed analytics',
      'Custom rate limits',
      'Dedicated account manager',
    ],
    specs: [
      'Rate limit: 750 requests/minute',
      'Providers: All available sources including premium',
      'Priority support (1-24h response)',
    ],
    cta: 'Go Premium',
    highlighted: false,
  },
]

const comparisonRows = [
  { feature: 'API Calls', free: '1,000/month', paid: '50,000/month', premium: 'Unlimited' },
  { feature: 'Rate Limiting', free: '10 req/min', paid: '100 req/min', premium: '750 req/min' },
  { feature: 'Provider Access', free: 'Basic sources', paid: 'Extended sources', premium: 'All sources' },
  { feature: 'Support', free: 'Community', paid: 'Email (24-48h)', premium: 'Priority (1-24h)' },
  { feature: 'Analytics', free: 'Basic', paid: 'Advanced', premium: 'Advanced' },
]

const faqs = [
  {
    q: 'What happens if I exceed my rate limits?',
    a: 'If you exceed your rate limits, additional requests will be throttled or rejected with a 429 status code. Consider upgrading to a higher tier for increased limits.',
  },
  {
    q: 'Can I change my plan anytime?',
    a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.',
  },
  {
    q: 'What providers are included?',
    a: 'Free tier includes basic anime and manga providers. Paid tier adds light novel sources and additional anime/manga providers. Premium includes all available sources plus exclusive premium providers.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '1rem',
          padding: '1.25rem 0',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text)', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>{q}</span>
        <span style={{
          fontSize: 18, color: 'var(--text3)', flexShrink: 0,
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
          display: 'inline-block',
        }}>+</span>
      </button>
      <div style={{
        overflow: 'hidden',
        maxHeight: open ? 200 : 0,
        transition: 'max-height 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, paddingBottom: '1.25rem' }}>{a}</p>
      </div>
    </div>
  )
}

export default function PricingPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <Navbar />
      <div style={{ paddingTop: 64 }}>

        {/* Plans */}
        <section style={{ padding: '80px 2rem 60px', maxWidth: 1200, margin: '0 auto' }}>
          <AnimatedSection style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '0.75rem',
            }}>Pricing</p>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800, letterSpacing: '-0.03em',
              lineHeight: 1.1, marginBottom: '1rem',
            }}>Simple, Transparent Pricing</h1>
            <p style={{ color: 'var(--text2)', fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
              Choose the perfect plan for your application. Start free, scale as you grow.
            </p>
          </AnimatedSection>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            alignItems: 'start',
          }}>
            {plans.map((plan, i) => (
              <AnimatedSection key={plan.name} delay={i * 100}>
                <div style={{
                  padding: '2rem',
                  border: `1px solid ${plan.highlighted ? 'var(--text)' : 'var(--border)'}`,
                  borderRadius: 16,
                  background: plan.highlighted ? 'var(--bg2)' : 'var(--bg)',
                  display: 'flex', flexDirection: 'column', gap: '1.5rem',
                  position: 'relative',
                }}>
                  {plan.highlighted && (
                    <div style={{
                      position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                      background: 'var(--text)', color: 'var(--bg)',
                      fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', padding: '4px 14px', borderRadius: 20,
                      whiteSpace: 'nowrap',
                    }}>Most Popular</div>
                  )}
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{plan.name}</p>
                    <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: '1rem', lineHeight: 1.5 }}>{plan.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                      <span style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-0.04em' }}>{plan.price}</span>
                      <span style={{ fontSize: 14, color: 'var(--text3)', marginLeft: 2 }}>{plan.period}</span>
                    </div>
                  </div>
                  <a
                    href="#"
                    style={{
                      display: 'block', textAlign: 'center',
                      padding: '11px 20px', borderRadius: 8,
                      fontSize: 14, fontWeight: 600, textDecoration: 'none',
                      border: '1px solid var(--text)',
                      background: plan.highlighted ? 'var(--text)' : 'transparent',
                      color: plan.highlighted ? 'var(--bg)' : 'var(--text)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = plan.highlighted ? 'transparent' : 'var(--text)'
                      e.currentTarget.style.color = plan.highlighted ? 'var(--text)' : 'var(--bg)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = plan.highlighted ? 'var(--text)' : 'transparent'
                      e.currentTarget.style.color = plan.highlighted ? 'var(--bg)' : 'var(--text)'
                    }}
                  >{plan.cta}</a>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '0.75rem' }}>Features:</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {plan.features.map(f => (
                        <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 14, color: 'var(--text2)' }}>
                          <Check size={14} style={{ color: 'var(--text)', flexShrink: 0, marginTop: 2 }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '0.75rem' }}>Specifications:</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {plan.specs.map(s => (
                        <li key={s} style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>
                          <span style={{ color: 'var(--text3)', marginRight: 4 }}>•</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section style={{ padding: '0 2rem 80px', maxWidth: 900, margin: '0 auto' }}>
          <AnimatedSection style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
              Feature Comparison
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: 14 }}>See what's included in each plan</p>
          </AnimatedSection>

          <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
              background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
            }}>
              <div style={{ padding: '14px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text3)' }}>Feature</div>
              {['Free', 'Paid', 'Premium'].map(h => (
                <div key={h} style={{ padding: '14px 16px', fontSize: 13, fontWeight: 700, color: 'var(--text)', textAlign: 'center' }}>{h}</div>
              ))}
            </div>
            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div key={row.feature} style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                borderBottom: i < comparisonRows.length - 1 ? '1px solid var(--border)' : 'none',
                background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg2)',
              }}>
                <div style={{ padding: '14px 20px', fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{row.feature}</div>
                {[row.free, row.paid, row.premium].map((val, j) => (
                  <div key={j} style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text2)', textAlign: 'center' }}>{val}</div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '0 2rem 100px', maxWidth: 700, margin: '0 auto' }}>
          <AnimatedSection style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
              Frequently Asked Questions
            </h2>
          </AnimatedSection>
          <div style={{ borderTop: '1px solid var(--border)' }}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
