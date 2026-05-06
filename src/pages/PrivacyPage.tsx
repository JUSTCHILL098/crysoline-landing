import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const sections = [
  {
    title: '1. Introduction',
    content: `Welcome to Crysoline ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our API service and website.\n\nBy using our service, you agree to the collection and use of information in accordance with this Privacy Policy.`,
  },
  {
    title: '2. Information We Collect',
    subsections: [
      {
        title: '2.1 Information You Provide',
        items: [
          'Account registration information (email, username, password)',
          'Payment and billing information',
          'Communication preferences',
          'Support requests and correspondence',
        ],
      },
      {
        title: '2.2 Information We Collect Automatically',
        items: [
          'API usage data (requests, endpoints accessed, response times)',
          'IP addresses and geographic location',
          'Device and browser information',
          'Access times and duration',
        ],
      },
    ],
  },
  {
    title: '3. How We Use Your Information',
    items: [
      'Provide and maintain our API service',
      'Process transactions and manage your account',
      'Monitor API usage and enforce rate limits',
      'Improve our service and develop new features',
      'Provide customer support',
      'Send important service notifications',
      'Detect and prevent fraud or abuse',
      'Comply with legal obligations',
    ],
  },
  {
    title: '4. Information Sharing and Disclosure',
    content: 'We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:',
    subsections: [
      {
        title: '4.1 Service Providers',
        content: 'We may share information with trusted third-party service providers who assist us in operating our service, such as payment processors, hosting providers, and analytics services.',
      },
      {
        title: '4.2 Legal Requirements',
        content: 'We may disclose your information if required by law, court order, or government regulation, or to protect our rights, property, or safety.',
      },
    ],
  },
  {
    title: '5. Data Security',
    content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:',
    items: [
      'Encryption of data in transit and at rest',
      'Regular security assessments',
      'Access controls and authentication',
      'Secure data centers and infrastructure',
    ],
  },
  {
    title: '6. Data Retention',
    content: 'We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. API usage logs are typically retained for 90 days, while account information is retained until you close your account.',
  },
  {
    title: '7. Your Rights',
    content: 'You have the right to:',
    items: [
      'Access and review your personal information',
      'Correct inaccurate or incomplete information',
      'Delete your account and personal information',
      'Object to or restrict certain processing',
      'Data portability (receive your data in a structured format)',
    ],
  },
  {
    title: '8. Cookies and Analytics',
    content: 'We use cookies and similar technologies to improve your experience on our website. These help us analyze usage patterns, remember your preferences, and provide personalized content. You can control cookie settings through your browser.',
  },
  {
    title: '9. International Data Transfers',
    content: 'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.',
  },
  {
    title: '10. Changes to This Privacy Policy',
    content: 'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date.',
  },
  {
    title: '11. Contact Us',
    content: 'If you have any questions about this Privacy Policy or our data practices, please contact us at:\n\nEmail: privacy@crysoline.moe\nResponse time: Within 48 hours',
  },
]

export default function PrivacyPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <Navbar />
      <div style={{ paddingTop: 64 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 2rem 80px' }}>
          {/* Header */}
          <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }}>Legal</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>Privacy Policy</h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Last updated: 01 January, 2026</p>
          </div>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {sections.map((section, i) => (
              <div key={i}>
                <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1rem', color: '#fff' }}>{section.title}</h2>
                {section.content && (
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: section.items || section.subsections ? '1rem' : 0, whiteSpace: 'pre-line' }}>
                    {section.content}
                  </p>
                )}
                {section.items && (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {section.items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                        <span style={{ color: 'rgba(255,255,255,0.2)', marginTop: 2, flexShrink: 0 }}>—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.subsections && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: section.content ? '0.5rem' : 0 }}>
                    {section.subsections.map((sub, j) => (
                      <div key={j} style={{ paddingLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.06)' }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: '0.6rem' }}>{sub.title}</h3>
                        {sub.content && <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{sub.content}</p>}
                        {sub.items && (
                          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: sub.content ? '0.5rem' : 0 }}>
                            {sub.items.map((item, k) => (
                              <li key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                                <span style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>•</span>{item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
