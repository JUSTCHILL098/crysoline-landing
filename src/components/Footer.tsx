export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '3rem 2rem 2rem',
      fontFamily: 'var(--font-geist-mono, "JetBrains Mono", monospace)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
              <img src="https://dev.dash.crysoline.moe/crysoline.svg" alt="Crysoline" style={{ width: 22, height: 22 }} />
              <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', letterSpacing: '-0.02em' }}>Crysoline</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
              The ultimate API for anime, manga, and light novel data.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '1rem' }}>Product</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Pricing', href: '/pricing' },
                { label: 'Documentation', href: 'https://docs.crysoline.moe', external: true },
                { label: 'API Status', href: 'https://status.crysoline.moe', external: true },
              ].map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noopener noreferrer' : undefined}
                    style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '1rem' }}>Team</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '1rem' }}>Legal</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.5rem',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 13, color: 'var(--text2)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
          >
            © {year} Crysoline. All rights reserved. Made with{' '}
            <span style={{ color: '#f87171' }}>&lt;/&gt;</span>
            {' '}for developers.
          </p>
        </div>
      </div>
    </footer>
  )
}
