import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using Crysoline's API service ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these Terms, you may not access the Service.\n\nThese Terms constitute a legally binding agreement between you and Crysoline regarding your use of our Service.`,
  },
  {
    title: '2. Description of Service',
    content: 'Crysoline provides an API service that delivers data related to anime, manga, light novels, and related content. Our Service includes:',
    items: [
      'RESTful API endpoints for content data retrieval',
      'Multiple data providers and sources',
      'Rate-limited access based on subscription tiers',
      'Documentation and developer resources',
    ],
  },
  {
    title: '3. Account Registration',
    content: 'To access our Service, you must create an account. You agree to:',
    items: [
      'Provide accurate and complete registration information',
      'Maintain the security of your account credentials',
      'Accept responsibility for all activities under your account',
      'Notify us immediately of any unauthorized access',
    ],
  },
  {
    title: '4. API Usage and Restrictions',
    subsections: [
      {
        title: '4.1 Permitted Use',
        content: 'You may use our API to:',
        items: [
          'Integrate anime, manga, and light novel data into your applications',
          'Access data within your subscription tier limits',
          'Cache responses for reasonable periods to optimize performance',
        ],
      },
      {
        title: '4.2 Prohibited Use',
        content: 'You may not:',
        items: [
          'Exceed your rate limits or attempt to circumvent them',
          'Resell, redistribute, or sublicense API access to third parties',
          'Use the Service for illegal, harmful, or malicious purposes',
          'Attempt to reverse engineer, decompile, or hack our systems',
          'Use automated tools to scrape or harvest data beyond API limits',
          'Share your API keys with unauthorized parties',
        ],
      },
    ],
  },
  {
    title: '5. Subscription and Payment',
    subsections: [
      {
        title: '5.1 Subscription Tiers',
        items: [
          'Free Tier: Limited API calls with basic providers',
          'Paid Tier: Increased limits and extended providers',
          'Premium Tier: Unlimited access and all providers',
        ],
      },
      {
        title: '5.2 Payment Terms',
        items: [
          'Subscriptions are billed monthly in advance',
          'All fees are non-refundable except as required by law',
          'We may change pricing with 30 days notice',
          'Failed payments may result in service suspension',
        ],
      },
    ],
  },
  {
    title: '6. Rate Limits and Fair Use',
    content: 'Our Service implements rate limits based on your subscription tier. These limits are designed to ensure fair usage and system stability. Exceeding limits may result in:',
    items: [
      'Request throttling or rejection',
      'Temporary account suspension',
      'Required upgrade to higher tier',
    ],
  },
  {
    title: '7. Intellectual Property',
    content: `The Service and its infrastructure are protected by intellectual property laws. However, Crysoline does not claim ownership of the data returned by the API. Such data remains the property of the respective providers or copyright holders.\n\nAny DMCA or copyright-related requests will be forwarded to the corresponding data provider. Crysoline acts solely as an intermediary and does not host or store any of the data returned by the API.`,
  },
  {
    title: '8. Data Accuracy and Availability',
    content: 'While we strive to provide accurate and up-to-date information:',
    items: [
      'We do not guarantee the accuracy or completeness of data',
      'Data sources may become unavailable or change without notice',
      'We aim for 99.9% uptime but cannot guarantee uninterrupted service',
      'Scheduled maintenance may cause temporary outages',
    ],
  },
  {
    title: '9. Privacy and Data Protection',
    content: 'Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information. By using our Service, you consent to our data practices as outlined in the Privacy Policy.',
  },
  {
    title: '10. Termination',
    content: 'Either party may terminate this agreement at any time:',
    items: [
      'You may cancel your subscription at any time',
      'We may suspend or terminate accounts for Terms violations',
      'Termination does not relieve payment obligations for services already provided',
      'Upon termination, your access to the Service will be disabled',
    ],
  },
  {
    title: '11. Disclaimers and Limitation of Liability',
    content: `THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. CRYSOLINE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.\n\nTO THE MAXIMUM EXTENT PERMITTED BY LAW, CRYSOLINE SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE, REGARDLESS OF THE CAUSE OF ACTION.`,
  },
  {
    title: '12. Changes to Terms',
    content: 'We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting updated Terms on our website. Continued use of the Service after changes constitutes acceptance of the new Terms.',
  },
  {
    title: '13. Contact Information',
    content: 'For questions about these Terms of Service, please contact us:\n\nEmail: legal@crysoline.moe\nResponse time: Within 5 business days',
  },
]

export default function TermsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <Navbar />
      <div style={{ paddingTop: 64 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 2rem 80px' }}>
          <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }}>Legal</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>Terms of Service</h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Last updated: 01 January, 2026</p>
          </div>

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
                        <span style={{ color: 'rgba(255,255,255,0.2)', marginTop: 2, flexShrink: 0 }}>—</span>{item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.subsections && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: section.content ? '0.5rem' : 0 }}>
                    {section.subsections.map((sub, j) => (
                      <div key={j} style={{ paddingLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.06)' }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: '0.6rem' }}>{sub.title}</h3>
                        {sub.content && <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: sub.items ? '0.5rem' : 0 }}>{sub.content}</p>}
                        {sub.items && (
                          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
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
