import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown, X, Menu, Copy, Check, ExternalLink } from 'lucide-react'
import { tags, endpoints, typeColors, type EndpointType } from '../data/openapi'

const TYPES = ['ALL', 'ANIME', 'MANGA', 'HENTAI', 'NOVEL', 'META']

/* ─── Type badge ─────────────────────────────────────────── */
function TypeBadge({ type }: { type: string }) {
  const color = typeColors[type] || '#94a3b8'
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
      textTransform: 'uppercase', padding: '3px 10px', borderRadius: 5,
      background: color + '18', color, border: `1px solid ${color}40`,
      flexShrink: 0, fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
    }}>{type}</span>
  )
}

/* ─── Param row ──────────────────────────────────────────── */
function ParamRow({ name, location, type, required, color }: {
  name: string; location: string; type: string; required: boolean; color: string
}) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '160px 70px 70px auto',
      alignItems: 'center', gap: 12,
      padding: '10px 16px', borderBottom: '1px solid var(--border)',
    }}>
      <code style={{
        fontSize: 13, fontWeight: 600, color,
        fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
      }}>{name}</code>
      <span style={{
        fontSize: 12, color: 'var(--text3)',
        fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
      }}>{location}</span>
      <span style={{
        fontSize: 12, color: 'var(--text3)',
        fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
      }}>{type}</span>
      <span style={{
        fontSize: 12, fontWeight: required ? 600 : 400,
        color: required ? '#f87171' : 'var(--text3)',
      }}>{required ? 'required' : 'optional'}</span>
    </div>
  )
}

/* ─── Endpoint card ──────────────────────────────────────── */
function EndpointCard({ ep }: { ep: EndpointType }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const tag = tags.find(t => t.name === ep.tag)
  const type = tag?.type || 'META'
  const color = typeColors[type] || '#94a3b8'
  const fullUrl = `https://api.crysoline.moe${ep.path}`

  const copy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 12,
      overflow: 'hidden', marginBottom: 8,
      transition: 'border-color 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color + '50'; e.currentTarget.style.boxShadow = `0 0 0 1px ${color}20` }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* ── Header ── */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 18px', background: 'var(--bg)',
          border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{
          fontSize: 11, fontWeight: 800, letterSpacing: '0.08em',
          color: '#22c55e', background: '#22c55e14',
          border: '1px solid #22c55e40',
          padding: '3px 9px', borderRadius: 5, flexShrink: 0,
          fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
        }}>GET</span>

        <code style={{
          fontSize: 14, color: 'var(--text)', flex: 1,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          minWidth: 0, fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
        }}>{ep.path}</code>

        <span style={{ fontSize: 13, color: 'var(--text3)', flexShrink: 0 }}>{ep.summary}</span>

        <button
          onClick={copy}
          style={{
            background: 'none', border: '1px solid var(--border)',
            borderRadius: 6, padding: '4px 8px', cursor: 'pointer',
            color: 'var(--text3)', display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 12, transition: 'all 0.15s', flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.borderColor = 'var(--border)' }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span style={{ fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)' }}>{copied ? 'copied' : 'copy'}</span>
        </button>

        <span style={{
          color: 'var(--text3)', flexShrink: 0, display: 'flex', alignItems: 'center',
          transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <ChevronDown size={16} />
        </span>
      </button>

      {/* ── Expanded ── */}
      {open && (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {/* Description */}
          <div style={{ padding: '20px 18px', borderBottom: ep.params.length > 0 ? '1px solid var(--border)' : 'none' }}>
            <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>{ep.description}</p>
          </div>

          {/* Parameters */}
          {ep.params.length > 0 && (
            <div>
              <div style={{
                padding: '10px 18px',
                background: 'var(--bg2)',
                borderBottom: '1px solid var(--border)',
                display: 'grid', gridTemplateColumns: '160px 70px 70px auto', gap: 12,
              }}>
                {['Parameter', 'In', 'Type', 'Required'].map(h => (
                  <span key={h} style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: 'var(--text3)',
                  }}>{h}</span>
                ))}
              </div>
              {ep.params.map(p => (
                <ParamRow key={p.name} name={p.name} location={p.in} type={p.type} required={p.required} color={color} />
              ))}
            </div>
          )}

          {/* Example request */}
          <div style={{ padding: '16px 18px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 10,
            }}>Example Request</p>
            <div style={{
              padding: '12px 16px', borderRadius: 8,
              background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <code style={{
                fontSize: 13, color: '#86efac', overflow: 'hidden',
                textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
              }}>
                GET {fullUrl}
              </code>
              <button
                onClick={copy}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.3)', flexShrink: 0,
                  display: 'flex', alignItems: 'center', transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Provider group header ──────────────────────────────── */
function ProviderSection({ tagName, eps }: { tagName: string; eps: EndpointType[] }) {
  const tag = tags.find(t => t.name === tagName)
  const type = tag?.type || 'META'
  const color = typeColors[type] || '#94a3b8'

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginBottom: '1rem', paddingBottom: '0.75rem',
        borderBottom: `2px solid ${color}30`,
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>{tagName}</h2>
        <TypeBadge type={type} />
        {tag && (
          <a
            href={tag.desc} target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: 12, color: 'var(--text3)', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 4,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
          >
            {tag.desc.replace('https://', '')} <ExternalLink size={11} />
          </a>
        )}
        <span style={{
          marginLeft: 'auto', fontSize: 12, color: 'var(--text3)',
          fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
        }}>{eps.length} endpoint{eps.length !== 1 ? 's' : ''}</span>
      </div>
      {eps.map(ep => <EndpointCard key={ep.path} ep={ep} />)}
    </div>
  )
}

/* ─── Main page ──────────────────────────────────────────── */
export default function DocsPage() {
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('ALL')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedTypes, setExpandedTypes] = useState<Record<string, boolean>>({
    ANIME: true, MANGA: false, HENTAI: false, NOVEL: false, META: false,
  })
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const groupedTags = useMemo(() => {
    const groups: Record<string, typeof tags> = {}
    tags.forEach(t => {
      if (!groups[t.type]) groups[t.type] = []
      groups[t.type].push(t)
    })
    return groups
  }, [])

  const filteredEndpoints = useMemo(() => {
    return endpoints.filter(ep => {
      const tag = tags.find(t => t.name === ep.tag)
      const type = tag?.type || 'META'
      if (activeType !== 'ALL' && type !== activeType) return false
      if (activeTag && ep.tag !== activeTag) return false
      if (search) {
        const q = search.toLowerCase()
        return ep.path.toLowerCase().includes(q) || ep.tag.toLowerCase().includes(q) || ep.summary.toLowerCase().includes(q)
      }
      return true
    })
  }, [activeType, activeTag, search])

  // Group filtered endpoints by provider
  const groupedFiltered = useMemo(() => {
    const map: Record<string, EndpointType[]> = {}
    filteredEndpoints.forEach(ep => {
      if (!map[ep.tag]) map[ep.tag] = []
      map[ep.tag].push(ep)
    })
    return map
  }, [filteredEndpoints])

  const toggleType = (type: string) =>
    setExpandedTypes(prev => ({ ...prev, [type]: !prev[type] }))

  const sidebarContent = (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <button
        onClick={() => { setActiveTag(null); setActiveType('ALL'); setSidebarOpen(false) }}
        style={{
          background: !activeTag && activeType === 'ALL' ? 'var(--bg3)' : 'none',
          border: 'none', cursor: 'pointer', textAlign: 'left',
          padding: '8px 12px', borderRadius: 7,
          fontSize: 14, fontWeight: 600,
          color: !activeTag && activeType === 'ALL' ? 'var(--text)' : 'var(--text2)',
          marginBottom: 8, transition: 'all 0.15s',
        }}
      >Overview</button>

      {Object.entries(groupedTags).map(([type, typeTags]) => {
        const color = typeColors[type] || '#94a3b8'
        const isExpanded = expandedTypes[type]
        return (
          <div key={type} style={{ marginBottom: 2 }}>
            <button
              onClick={() => toggleType(type)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '7px 12px', borderRadius: 7,
                fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--text3)',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text2)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
                {type}
                <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 400 }}>({typeTags.length})</span>
              </span>
              <span style={{ transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', display: 'flex' }}>
                <ChevronDown size={12} />
              </span>
            </button>

            {isExpanded && (
              <div style={{ paddingLeft: 8, marginTop: 2, marginBottom: 4 }}>
                {typeTags.map(t => {
                  const isActive = activeTag === t.name
                  return (
                    <button
                      key={t.name}
                      onClick={() => { setActiveTag(t.name); setActiveType(type); setSidebarOpen(false) }}
                      style={{
                        width: '100%', textAlign: 'left',
                        background: isActive ? color + '18' : 'none',
                        border: `1px solid ${isActive ? color + '45' : 'transparent'}`,
                        cursor: 'pointer', padding: '6px 12px', borderRadius: 6,
                        fontSize: 13, color: isActive ? color : 'var(--text2)',
                        fontWeight: isActive ? 600 : 400, transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--bg3)' } }}
                      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'none' } }}
                    >
                      {t.name}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )

  const activeTagInfo = activeTag ? tags.find(t => t.name === activeTag) : null
  const totalEndpoints = filteredEndpoints.length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* ── Navbar ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 56, padding: '0 1.5rem',
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--nav-bg)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: 0, flexShrink: 0 }}
        >
          <img src="https://dev.dash.crysoline.moe/crysoline.svg" alt="Crysoline" style={{ width: 22, height: 22 }} />
          <span style={{ color: 'var(--text)', fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em', fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)' }}>Crysoline</span>
        </button>
        <span style={{ color: 'var(--border-hover)', fontSize: 16, userSelect: 'none' }}>/</span>
        <span style={{ color: 'var(--text2)', fontSize: 14, fontWeight: 500, fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)' }}>docs</span>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 11, color: 'var(--text3)',
            fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
            background: 'var(--bg2)', border: '1px solid var(--border)',
            padding: '3px 9px', borderRadius: 5,
          }}>v0.1.6</span>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className="docs-mobile-btn"
            style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', color: 'var(--text)', display: 'none' }}
          >{sidebarOpen ? <X size={15} /> : <Menu size={15} />}</button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, paddingTop: 56 }}>
        {/* ── Sidebar ── */}
        <aside className="docs-sidebar" style={{
          width: 240, flexShrink: 0,
          borderRight: '1px solid var(--border)',
          padding: '1.5rem 1rem',
          position: 'sticky', top: 56, height: 'calc(100vh - 56px)',
          overflowY: 'auto',
        }}>
          {sidebarContent}
        </aside>

        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.6)' }} onClick={() => setSidebarOpen(false)}>
            <div style={{ position: 'absolute', top: 56, left: 0, bottom: 0, width: 260, background: 'var(--bg)', borderRight: '1px solid var(--border)', padding: '1.5rem 1rem', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
              {sidebarContent}
            </div>
          </div>
        )}

        {/* ── Main content ── */}
        <main style={{ flex: 1, minWidth: 0, padding: '2.5rem 3rem', maxWidth: 960 }}>

          {/* Page title */}
          <div style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
                {activeTag ?? 'API Reference'}
              </h1>
              {activeTagInfo && <TypeBadge type={activeTagInfo.type} />}
            </div>
            {activeTagInfo ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <a href={activeTagInfo.desc} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: 'var(--text2)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}
                >
                  {activeTagInfo.desc} <ExternalLink size={13} />
                </a>
                <span style={{ fontSize: 14, color: 'var(--text3)' }}>Languages: {activeTagInfo.langs}</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.6, maxWidth: 600, margin: 0 }}>
                  Complete reference for the Crysoline REST API. Authenticate with an{' '}
                  <code style={{ fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)', background: 'var(--bg2)', padding: '2px 7px', borderRadius: 4, fontSize: 13 }}>x-api-key</code>
                  {' '}header. Base URL:{' '}
                  <code style={{ fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)', background: 'var(--bg2)', padding: '2px 7px', borderRadius: 4, fontSize: 13, color: '#86efac' }}>https://api.crysoline.moe</code>
                </p>
              </div>
            )}
          </div>

          {/* Filters + search row */}
          <div style={{ display: 'flex', gap: 12, marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Type pills */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {TYPES.map(t => {
                const color = typeColors[t] || 'var(--text)'
                const active = activeType === t && !activeTag
                return (
                  <button
                    key={t}
                    onClick={() => { setActiveType(t); setActiveTag(null) }}
                    style={{
                      padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                      cursor: 'pointer', border: '1px solid',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                      borderColor: active ? color : 'var(--border)',
                      background: active ? color + '18' : 'transparent',
                      color: active ? color : 'var(--text3)',
                      transition: 'all 0.2s',
                      fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
                    }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text2)' } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text3)' } }}
                  >{t}</button>
                )
              })}
            </div>

            {/* Search */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              border: '1px solid var(--border)', borderRadius: 8,
              padding: '8px 14px', background: 'var(--bg2)',
              flex: 1, minWidth: 200, transition: 'border-color 0.2s',
            }}
              onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
              onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <Search size={14} style={{ color: 'var(--text3)', flexShrink: 0 }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search endpoints, providers..."
                style={{
                  background: 'none', border: 'none', outline: 'none',
                  fontSize: 14, color: 'var(--text)', width: '100%',
                }}
              />
              {search && (
                <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', padding: 0, display: 'flex' }}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Count */}
          <p style={{
            fontSize: 13, color: 'var(--text3)', marginBottom: '1.5rem',
            fontFamily: 'var(--font-geist-mono,"JetBrains Mono",monospace)',
          }}>
            {totalEndpoints} endpoint{totalEndpoints !== 1 ? 's' : ''}
            {activeTag ? ` · ${activeTag}` : activeType !== 'ALL' ? ` · ${activeType}` : ' across all providers'}
          </p>

          {/* Endpoints grouped by provider */}
          {Object.keys(groupedFiltered).length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--text3)' }}>
              <p style={{ fontSize: 16, marginBottom: 8 }}>No endpoints found</p>
              <p style={{ fontSize: 14 }}>Try a different search term or filter</p>
            </div>
          ) : (
            Object.entries(groupedFiltered).map(([tagName, eps]) => (
              <ProviderSection key={tagName} tagName={tagName} eps={eps} />
            ))
          )}
        </main>
      </div>

      <style>{`
        .docs-sidebar::-webkit-scrollbar { width: 3px; }
        .docs-sidebar::-webkit-scrollbar-thumb { background: var(--border-hover); border-radius: 2px; }
        @media (max-width: 900px) {
          .docs-sidebar { display: none !important; }
          .docs-mobile-btn { display: flex !important; }
          main { padding: 1.5rem !important; }
        }
      `}</style>
    </div>
  )
}

