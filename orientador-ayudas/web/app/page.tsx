'use client'

import { useState } from 'react'
import Link from 'next/link'
import { EligibilityResult } from '../types/result'
import { EligibilityWizard } from '../components/EligibilityWizard'
import { ResultCard } from '../components/ResultCard'
import { CoverageNotice } from '../components/CoverageNotice'

const FAQ_ITEMS = [
  {
    question: '¿Es oficial esta herramienta?',
    answer:
      'No. Es una herramienta informativa independiente basada en fuentes oficiales. La solicitud y el reconocimiento de cualquier ayuda se hace siempre en la sede electrónica oficial.',
  },
  {
    question: '¿Por qué no pedís el DNI?',
    answer:
      'No es necesario. Tu elegibilidad depende de tu situación, no de tu número de documento. Además, solicitarlo sin base legal vulneraría el principio de minimización del RGPD.',
  },
  {
    question: '¿Cubre todas las ayudas del Estado?',
    answer:
      'No. Cubre las tres ayudas estatales más frecuentes: IMV, prestación contributiva y subsidio por desempleo. Existen muchas más ayudas autonómicas y municipales.',
  },
  {
    question: '¿Guardáis mis datos?',
    answer:
      'No. Las respuestas se procesan en el momento y no se almacenan en ningún servidor.',
  },
  {
    question: '¿El resultado es definitivo?',
    answer:
      'No. Es una orientación informativa. Solo la Administración puede reconocer oficialmente una ayuda.',
  },
]

const STEPS = [
  {
    icon: '📋',
    title: 'Responde las preguntas',
    description:
      'Sin datos personales ni documentos. Solo tu situación actual.',
  },
  {
    icon: '🔍',
    title: 'Analizamos tu perfil',
    description:
      'Cruzamos tus respuestas con los requisitos oficiales de cada ayuda.',
  },
  {
    icon: '🔗',
    title: 'Te orientamos y enlazamos',
    description:
      'Recibes un semáforo de encaje y el enlace directo a la sede oficial.',
  },
]

const ABOUT_BLOCKS = [
  {
    title: '¿Quién la desarrolla?',
    content:
      'Esta herramienta es un proyecto independiente sin ánimo de lucro, desarrollado para facilitar el acceso a información sobre ayudas públicas en España. No está afiliada a ningún organismo oficial.',
  },
  {
    title: 'Fuentes legales',
    items: [
      'Ley 19/2021, de 20 de diciembre, del Ingreso Mínimo Vital',
      'Real Decreto Legislativo 8/2015 — Ley General de la Seguridad Social (art. 263-278)',
      'Real Decreto Legislativo 8/2015 — Subsidio por desempleo (art. 274-277 bis)',
    ],
  },
  {
    title: 'Última actualización',
    content:
      'Reglas y umbrales revisados en marzo 2026. Los importes se actualizan anualmente. Consulta siempre la sede oficial para datos vigentes.',
  },
]

export default function HomePage() {
  const [resultados, setResultados] = useState<EligibilityResult[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  const resetear = () => {
    setResultados(null)
    setLoading(false)

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <main
      style={{
        background: '#F2EDE3',
        color: '#1A1830',
        fontFamily: "'DM Sans', sans-serif",
        minHeight: '100vh',
      }}
    >
      <header
        style={{
          background: 'linear-gradient(135deg, #12112A 0%, #2A1F3D 100%)',
          overflow: 'hidden',
          padding: '72px 20px 88px',
          position: 'relative',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '999px',
            height: '240px',
            position: 'absolute',
            right: '-80px',
            top: '-70px',
            width: '240px',
          }}
        />
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '999px',
            bottom: '-110px',
            height: '260px',
            left: '-90px',
            position: 'absolute',
            width: '260px',
          }}
        />

        <div
          style={{
            margin: '0 auto',
            maxWidth: '920px',
            position: 'relative',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <p
            style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              margin: '0 0 18px',
              textTransform: 'uppercase',
            }}
          >
            Orientador de ayudas estatales
          </p>
          <h1
            style={{
              color: '#FFFFFF',
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.3rem, 6vw, 4.6rem)',
              lineHeight: 1.08,
              margin: '0 auto 20px',
              maxWidth: '820px',
            }}
          >
            ¿Qué ayudas del Estado te corresponden?
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.82)',
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              lineHeight: 1.7,
              margin: '0 auto',
              maxWidth: '760px',
            }}
          >
            Responde entre 6 y 12 preguntas según tu situación y descubre en
            pocos minutos las ayudas estatales para las que podrías encajar. Sin
            registro. Sin DNI.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '24px',
            }}
          >
            <Link
              href="/blog"
              style={{
                border: '1px solid rgba(255,255,255,0.24)',
                borderRadius: '999px',
                color: '#FFFFFF',
                display: 'inline-flex',
                fontSize: '14px',
                fontWeight: 700,
                padding: '12px 18px',
                textDecoration: 'none',
              }}
            >
              Leer guías del blog
            </Link>
          </div>
        </div>
      </header>

      <div
        style={{
          margin: '-44px auto 0',
          maxWidth: '1080px',
          padding: '0 20px 88px',
          position: 'relative',
        }}
      >
        <section
          style={{
            background: 'rgba(255,255,255,0.72)',
            border: '1px solid rgba(42, 31, 61, 0.08)',
            borderRadius: '28px',
            boxShadow: '0 22px 60px rgba(18, 17, 42, 0.12)',
            marginBottom: '56px',
            padding: '22px',
            backdropFilter: 'blur(10px)',
          }}
        >
          {resultados === null ? (
            <div style={{ display: 'grid', gap: '22px' }}>
              <CoverageNotice />
              {loading ? (
                <div
                  style={{
                    alignItems: 'center',
                    background: '#FAF7F2',
                    border: '1px solid #E0D9CD',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: '320px',
                    padding: '32px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      animation: 'spin 1s linear infinite',
                      border: '4px solid rgba(42, 31, 61, 0.14)',
                      borderRadius: '50%',
                      borderTop: '4px solid #2A1F3D',
                      height: '52px',
                      marginBottom: '18px',
                      width: '52px',
                    }}
                  />
                  <p
                    style={{
                      color: '#2A1F3D',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    Analizando tu perfil…
                  </p>
                </div>
              ) : (
                <EligibilityWizard
                  onResultados={setResultados}
                  onLoading={setLoading}
                />
              )}
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '22px' }}>
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '14px',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p
                    style={{
                      color: '#6B6256',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      margin: '0 0 8px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Orientación personalizada
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
                      lineHeight: 1.15,
                      margin: 0,
                    }}
                  >
                    Resultado de tu consulta
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={resetear}
                  style={{
                    background: 'transparent',
                    border: '1px solid #B8AF9F',
                    borderRadius: '999px',
                    color: '#2A1F3D',
                    cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
                    padding: '10px 16px',
                  }}
                >
                  ← Volver a empezar
                </button>
              </div>

              {resultados.map((resultado) => (
                <ResultCard
                  key={`${resultado.ayuda}-${resultado.badge}`}
                  resultado={resultado}
                />
              ))}

              <CoverageNotice />

              <button
                type="button"
                onClick={resetear}
                style={{
                  position: 'fixed',
                  bottom: '24px',
                  right: '24px',
                  background: '#2A1F3D',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '12px 20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  zIndex: 1000,
                }}
              >
                ↺ Nueva consulta
              </button>
            </div>
          )}
        </section>

        <section style={{ marginBottom: '56px' }}>
          <div style={{ marginBottom: '24px', maxWidth: '680px' }}>
            <p
              style={{
                color: '#6B6256',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                margin: '0 0 10px',
                textTransform: 'uppercase',
              }}
            >
              Cómo funciona
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
                lineHeight: 1.15,
                margin: '0 0 14px',
              }}
            >
              Una orientación rápida, sin fricción y basada en requisitos
              reales
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gap: '18px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            }}
          >
            {STEPS.map((step) => (
              <article
                key={step.title}
                style={{
                  background: '#FAF7F2',
                  border: '1px solid #DDD5C8',
                  borderRadius: '22px',
                  boxShadow: '0 10px 24px rgba(18, 17, 42, 0.05)',
                  padding: '24px',
                }}
              >
                <div style={{ fontSize: '30px', marginBottom: '18px' }}>
                  {step.icon}
                </div>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.35,
                    margin: '0 0 10px',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: '#5C544A',
                    fontSize: '15px',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          style={{
            background: '#FAF7F2',
            border: '1px solid #DDD5C8',
            borderRadius: '28px',
            padding: '28px 22px',
          }}
        >
          <div style={{ marginBottom: '18px', maxWidth: '700px' }}>
            <p
              style={{
                color: '#6B6256',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                margin: '0 0 10px',
                textTransform: 'uppercase',
              }}
            >
              FAQ
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.9rem, 4vw, 2.7rem)',
                lineHeight: 1.15,
                margin: '0 0 12px',
              }}
            >
              Preguntas frecuentes
            </h2>
          </div>

          <div style={{ display: 'grid', gap: '10px' }}>
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index

              return (
                <div
                  key={item.question}
                  style={{
                    background: isOpen ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
                    border: '1px solid #DDD5C8',
                    borderRadius: '18px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    style={{
                      alignItems: 'center',
                      background: 'transparent',
                      border: 'none',
                      color: '#1A1830',
                      cursor: 'pointer',
                      display: 'flex',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '15px',
                      fontWeight: 700,
                      justifyContent: 'space-between',
                      lineHeight: 1.5,
                      padding: '18px 18px 18px 20px',
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    <span>{item.question}</span>
                    <span
                      aria-hidden="true"
                      style={{
                        color: '#2A1F3D',
                        fontSize: '22px',
                        lineHeight: 1,
                        marginLeft: '14px',
                      }}
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen ? (
                    <div style={{ padding: '0 20px 18px' }}>
                      <p
                        style={{
                          color: '#5C544A',
                          fontSize: '15px',
                          lineHeight: 1.8,
                          margin: 0,
                        }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </section>

        <section style={{ marginTop: '56px', marginBottom: '56px' }}>
          <div style={{ marginBottom: '24px', maxWidth: '700px' }}>
            <p
              style={{
                color: '#6B6256',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                margin: '0 0 10px',
                textTransform: 'uppercase',
              }}
            >
              Contexto
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.9rem, 4vw, 2.7rem)',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Sobre esta herramienta
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gap: '18px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              marginBottom: '22px',
            }}
          >
            {ABOUT_BLOCKS.map((block) => (
              <article
                key={block.title}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(42, 31, 61, 0.08)',
                  borderRadius: '22px',
                  boxShadow: '0 10px 24px rgba(18, 17, 42, 0.06)',
                  padding: '24px',
                }}
              >
                <h3
                  style={{
                    color: '#1A1830',
                    fontSize: '1.08rem',
                    lineHeight: 1.35,
                    margin: '0 0 12px',
                  }}
                >
                  {block.title}
                </h3>
                {block.content ? (
                  <p
                    style={{
                      color: '#5C544A',
                      fontSize: '15px',
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    {block.content}
                  </p>
                ) : (
                  <ul
                    style={{
                      color: '#5C544A',
                      fontSize: '15px',
                      lineHeight: 1.8,
                      margin: 0,
                      paddingLeft: '18px',
                    }}
                  >
                    {block.items?.map((item) => (
                      <li key={item} style={{ marginBottom: '10px' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          <div
            style={{
              background: '#F2EDE3',
              border: '1px solid #DDD5C8',
              borderRadius: '22px',
              padding: '18px 20px',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px 22px',
                justifyContent: 'center',
                marginBottom: '10px',
              }}
            >
              <a
                href="https://www.seg-social.es"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#1A1830',
                  fontSize: '15px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                🔵 Seguridad Social
              </a>
              <a
                href="https://www.sepe.es"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#1A1830',
                  fontSize: '15px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                🔵 SEPE
              </a>
            </div>
            <p
              style={{
                color: '#6B6256',
                fontSize: '12px',
                lineHeight: 1.7,
                margin: 0,
                textAlign: 'center',
              }}
            >
              Esta herramienta se basa en información de organismos oficiales.
              No está respaldada ni afiliada a ellos.
            </p>
          </div>
        </section>
      </div>

      <footer
        style={{
          background: '#12112A',
          color: 'rgba(255,255,255,0.72)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          lineHeight: 1.8,
          padding: '28px 20px 34px',
          textAlign: 'center',
        }}
      >
        <div style={{ margin: '0 auto', maxWidth: '980px' }}>
          <p style={{ margin: '0 0 6px' }}>
            Orientación informativa basada en fuentes oficiales · No sustituye
            la solicitud oficial · Última revisión: marzo 2026
          </p>
          <p style={{ margin: '0 0 10px' }}>
            <Link
              href="/blog"
              style={{ color: '#FFFFFF', textDecoration: 'underline' }}
            >
              Blog y guías →
            </Link>
          </p>
          <p style={{ margin: 0 }}>
            Otras herramientas:{' '}
            <a
              href="https://revisor-contrato-practicas.vercel.app"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#FFFFFF', textDecoration: 'underline' }}
            >
              Revisor de contrato de prácticas
            </a>{' '}
            ·{' '}
            <a
              href="https://revisor-lau.vercel.app"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#FFFFFF', textDecoration: 'underline' }}
            >
              Revisor LAU
            </a>{' '}
            ·{' '}
            <a
              href="https://revisor-contrato-habitacion.vercel.app"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#FFFFFF', textDecoration: 'underline' }}
            >
              Revisor de contrato de habitación
            </a>
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  )
}
