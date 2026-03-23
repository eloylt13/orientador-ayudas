'use client'

import type { CSSProperties } from 'react'
import { EligibilityResult } from '../types/result'

interface Props {
  resultado: EligibilityResult
}

const BADGE_STYLES: Record<
  EligibilityResult['badge'],
  { background: string; color: string; icon: string }
> = {
  verde: {
    background: '#D4EDDA',
    color: '#155724',
    icon: '🟢',
  },
  amarillo: {
    background: '#FFF3CD',
    color: '#856404',
    icon: '🟡',
  },
  rojo: {
    background: '#F8D7DA',
    color: '#721C24',
    icon: '🔴',
  },
  gris: {
    background: '#E2E3E5',
    color: '#383D41',
    icon: '⚪',
  },
}

const cardStyle: CSSProperties = {
  background: '#FFFFFF',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(18, 17, 42, 0.08)',
  padding: '24px',
}

const legalStyle: CSSProperties = {
  color: '#6C757D',
  fontSize: '12px',
  lineHeight: 1.5,
  margin: 0,
}

export function ResultCard({ resultado }: Props) {
  const badgeStyle = BADGE_STYLES[resultado.badge]

  return (
    <article className="result-card" style={cardStyle}>
      <header
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: '12px',
          marginBottom: '18px',
        }}
      >
        <span
          style={{
            background: badgeStyle.background,
            borderRadius: '999px',
            color: badgeStyle.color,
            display: 'inline-flex',
            fontSize: '14px',
            fontWeight: 700,
            gap: '8px',
            padding: '8px 12px',
          }}
        >
          <span aria-hidden="true">{badgeStyle.icon}</span>
          <span>{resultado.badge.toUpperCase()}</span>
        </span>
        <h3
          style={{
            color: '#1A1830',
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {resultado.ayuda}
        </h3>
      </header>

      <p
        style={{
          color: '#3D3A46',
          fontSize: '15px',
          lineHeight: 1.7,
          margin: '0 0 18px',
        }}
      >
        {resultado.explicacion}
      </p>

      {resultado.queFalta !== null ? (
        <section
          style={{
            background: '#FFF8DB',
            borderRadius: '16px',
            color: '#856404',
            display: 'flex',
            gap: '10px',
            marginBottom: '18px',
            padding: '14px 16px',
          }}
        >
          <span aria-hidden="true">⚠️</span>
          <div>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 700,
                margin: '0 0 4px',
              }}
            >
              Qué falta
            </p>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {resultado.queFalta}
            </p>
          </div>
        </section>
      ) : null}

      <section style={{ marginBottom: '20px' }}>
        <p
          style={{
            color: '#1A1830',
            fontSize: '15px',
            fontWeight: 700,
            margin: '0 0 10px',
          }}
        >
          Documentación habitual
        </p>
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {resultado.documentacion.map((item) => (
            <li
              key={item}
              style={{
                color: '#3D3A46',
                display: 'flex',
                fontSize: '14px',
                gap: '10px',
                lineHeight: 1.6,
                marginBottom: '8px',
              }}
            >
              <span aria-hidden="true" style={{ color: '#155724', fontWeight: 700 }}>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer
        style={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <a
          href={resultado.enlaceOficial}
          target="_blank"
          rel="noreferrer"
          style={{
            background: '#2A1F3D',
            borderRadius: '12px',
            color: '#FFFFFF',
            display: 'inline-flex',
            fontSize: '14px',
            fontWeight: 600,
            padding: '12px 16px',
            textDecoration: 'none',
          }}
        >
          Solicitar en sede oficial →
        </a>
        <span
          style={{
            color: '#6C757D',
            fontSize: '12px',
            lineHeight: 1.5,
          }}
        >
          Última revisión: {resultado.ultimaRevision}
        </span>
      </footer>

      <p style={legalStyle}>
        Orientación informativa. No sustituye la solicitud oficial ni garantiza
        la concesión.
      </p>
    </article>
  )
}

export default ResultCard
