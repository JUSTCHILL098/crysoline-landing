import AnimatedSection from './AnimatedSection'
import { Check } from 'lucide-react'

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

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: '120px 2rem', maxWidth: 1200, margin: '0 auto' }}>
      <AnimatedSection style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{
          fontSize: 12, fontWeight: 600, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '1rem',
        }}>Pricing</p>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800, letterSpacing: '-0.03em',
          lineHeight: 1.1, marginBottom: '1rem',
        }}>
          Simple, Transparent Pricing
        </h2>
        <p style={{ color: 'var(--text2)', fontSize: 16, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
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
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
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

              {/* Header */}
              <div>
                <p style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{plan.name}</p>
                <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: '1rem', lineHeight: 1.5 }}>{plan.desc}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                  <span style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-0.04em' }}>{plan.price}</span>
                  <span style={{ fontSize: 14, color: 'var(--text3)', marginLeft: 2 }}>{plan.period}</span>
                </div>
              </div>

              {/* CTA */}
              <a
                href="#get-started"
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
              >
                {plan.cta}
              </a>

              {/* Features */}
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

              {/* Specs */}
              <div style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '1.25rem',
              }}>
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
  )
}
