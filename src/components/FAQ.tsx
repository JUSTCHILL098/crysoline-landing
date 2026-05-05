import { useState } from 'react'
import AnimatedSection from './AnimatedSection'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What is Crysoline?',
    a: 'Crysoline is a unified REST API that aggregates anime, manga, and light novel data from 50+ providers into a single, consistent interface.',
  },
  {
    q: 'Do I need a credit card to start?',
    a: 'No. The free tier requires no credit card. You can upgrade to Pro at any time from your dashboard.',
  },
  {
    q: 'How are rate limits enforced?',
    a: 'Rate limits are applied per API key on a rolling 24-hour window. You will receive a 429 response when the limit is exceeded.',
  },
  {
    q: 'Can I switch providers mid-request?',
    a: 'Yes. Each endpoint accepts an optional provider parameter. If omitted, Crysoline automatically selects the fastest available source.',
  },
  {
    q: 'Is there an SLA for the Pro plan?',
    a: 'Pro includes 99.9% uptime monitoring. Enterprise plans include a contractual SLA with dedicated infrastructure.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" style={{ padding: '120px 2rem', maxWidth: 800, margin: '0 auto' }}>
      <AnimatedSection style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{
          fontSize: 12, fontWeight: 600, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '1rem',
        }}>FAQ</p>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1,
        }}>
          Common questions
        </h2>
      </AnimatedSection>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', background: 'var(--border)' }}>
        {faqs.map((faq, i) => (
          <AnimatedSection key={i} delay={i * 60}>
            <div style={{ background: 'var(--bg)' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text)', textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>{faq.q}</span>
                <ChevronDown
                  size={16}
                  style={{
                    flexShrink: 0, color: 'var(--text3)',
                    transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s',
                  }}
                />
              </button>
              {open === i && (
                <p style={{
                  padding: '0 1.5rem 1.25rem',
                  fontSize: 14, color: 'var(--text2)', lineHeight: 1.7,
                }}>
                  {faq.a}
                </p>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
