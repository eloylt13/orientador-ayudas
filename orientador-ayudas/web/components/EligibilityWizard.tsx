'use client'

import { useRef, useState, type CSSProperties, type ReactNode } from 'react'
import type { UserProfile } from '../types/profile'
import type { EligibilityResult } from '../types/result'
import {
  PREGUNTAS,
  getPreguntasActivas,
  RANGOS,
} from '../lib/questions/flow'

interface Props {
  onResultados: (resultados: EligibilityResult[]) => void
  onLoading: (loading: boolean) => void
}

const SELECTOR_VALUE_MAP: Partial<
  Record<keyof UserProfile, Record<string, string>>
> = {
  convivencia: {
    Solo: 'solo',
    'Con más personas': 'acompanado',
  },
  situacion: {
    Trabajando: 'trabajando',
    'En paro': 'paro',
    Autónomo: 'autonomo',
    Estudiante: 'estudiante',
    Otra: 'otra',
  },
}

const containerStyle: CSSProperties = {
  background: '#FAF7F2',
  border: '1px solid #DDD5C8',
  borderRadius: '20px',
  boxShadow: '0 8px 30px rgba(18, 17, 42, 0.08)',
  padding: '28px',
}

const optionButtonStyle: CSSProperties = {
  width: '100%',
  background: '#2A1F3D',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '14px',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: 1.4,
  padding: '14px 18px',
  textAlign: 'center',
  transition: 'background-color 0.2s ease',
}

const backButtonStyle: CSSProperties = {
  background: 'transparent',
  border: '1px solid #2A1F3D',
  color: '#2A1F3D',
  borderRadius: '8px',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '14px',
  marginRight: '12px',
}

function getSelectorValue(
  field: keyof UserProfile,
  option: string,
): UserProfile[keyof UserProfile] {
  return (SELECTOR_VALUE_MAP[field]?.[option] ??
    option) as UserProfile[keyof UserProfile]
}

export function EligibilityWizard({ onResultados, onLoading }: Props) {
  const wizardRef = useRef<HTMLDivElement>(null)
  const [perfil, setPerfil] = useState<Partial<UserProfile>>({})
  const [paso, setPaso] = useState(0)
  const [historial, setHistorial] = useState<number[]>([])
  const [noSe, setNoSe] = useState<Record<string, boolean>>({})
  const [numeroInputs, setNumeroInputs] = useState<Record<string, string>>({})

  const preguntasActivas = getPreguntasActivas(perfil)
  const preguntaActual = preguntasActivas[paso]
  const totalPreguntas = preguntasActivas.length || PREGUNTAS.length
  const progreso =
    totalPreguntas === 0 ? 100 : Math.min((paso / totalPreguntas) * 100, 100)

  const avanzar = () => {
    setHistorial((prev) => [...prev, paso])
    setPaso((currentPaso) => currentPaso + 1)

    if (typeof window !== 'undefined') {
      wizardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleAtras = () => {
    if (historial.length === 0) return
    const pasoAnterior = historial[historial.length - 1]
    setHistorial((prev) => prev.slice(0, -1))
    setPaso(pasoAnterior)
  }

  const responder = (
    preguntaId: keyof UserProfile,
    valor: UserProfile[keyof UserProfile],
  ) => {
    setPerfil((currentPerfil) => ({
      ...currentPerfil,
      [preguntaId]: valor,
    }))
    setNoSe((currentNoSe) => ({
      ...currentNoSe,
      [preguntaId]: false,
    }))
    avanzar()
  }

  const marcarNoSe = (preguntaId: keyof UserProfile) => {
    setNoSe((currentNoSe) => ({
      ...currentNoSe,
      [preguntaId]: true,
    }))
    setPerfil((currentPerfil) => ({
      ...currentPerfil,
      [preguntaId]: null,
    }))
    avanzar()
  }

  const enviarResultados = async () => {
    onLoading(true)

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(perfil),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'No se pudieron cargar los resultados')
      }

      onResultados(data.resultados)
    } catch (error) {
      console.error('Error al evaluar el perfil:', error)
      onResultados([])
    } finally {
      onLoading(false)
    }
  }

  const renderAccion = (button: ReactNode) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {historial.length > 0 ? (
        <button type="button" onClick={handleAtras} style={backButtonStyle}>
          ← Atrás
        </button>
      ) : null}
      <div style={{ flex: 1 }}>{button}</div>
    </div>
  )

  const renderOpciones = () => {
    if (!preguntaActual) {
      return null
    }

    if (preguntaActual.tipo === 'booleano') {
      return (
        <div style={{ display: 'grid', gap: '12px' }}>
          {renderAccion(
            <button
              type="button"
              style={optionButtonStyle}
              onClick={() => responder(preguntaActual.id, true)}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = '#12112A'
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = '#2A1F3D'
              }}
            >
              Sí
            </button>,
          )}
          {renderAccion(
            <button
              type="button"
              style={optionButtonStyle}
              onClick={() => responder(preguntaActual.id, false)}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = '#12112A'
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = '#2A1F3D'
              }}
            >
              No
            </button>,
          )}
        </div>
      )
    }

    if (preguntaActual.tipo === 'selector') {
      return (
        <div style={{ display: 'grid', gap: '12px' }}>
          {preguntaActual.opciones?.map((opcion) => (
            <div key={opcion}>
              {renderAccion(
                <button
                  type="button"
                  style={optionButtonStyle}
                  onClick={() =>
                    responder(
                      preguntaActual.id,
                      getSelectorValue(preguntaActual.id, opcion),
                    )
                  }
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background = '#12112A'
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = '#2A1F3D'
                  }}
                >
                  {opcion}
                </button>,
              )}
            </div>
          ))}
        </div>
      )
    }

    if (preguntaActual.tipo === 'rango') {
      const rangosDisponibles =
        preguntaActual.id === 'ingresosMensualesHogar'
          ? RANGOS.ingresos
          : preguntaActual.id === 'patrimonioHogar'
            ? RANGOS.patrimonio
            : preguntaActual.id === 'diasCotizados'
              ? RANGOS.diasCotizados
              : preguntaActual.rangos ?? []

      return (
        <div style={{ display: 'grid', gap: '12px' }}>
          {rangosDisponibles.map((rango, index) => (
            <div key={rango}>
              {renderAccion(
                <button
                  type="button"
                  style={optionButtonStyle}
                  onClick={() => responder(preguntaActual.id, index)}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background = '#12112A'
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = '#2A1F3D'
                  }}
                >
                  {rango}
                </button>,
              )}
            </div>
          ))}
        </div>
      )
    }

    const valorInput = numeroInputs[preguntaActual.id] ?? ''
    const numeroValido =
      valorInput.trim() !== '' && !Number.isNaN(Number(valorInput))

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (!numeroValido) {
            return
          }

          responder(preguntaActual.id, Number(valorInput))
        }}
        style={{ display: 'grid', gap: '14px' }}
      >
        <input
          key={preguntaActual.id}
          type="number"
          inputMode="numeric"
          min="0"
          value={valorInput}
          onChange={(event) => {
            const nextValue = event.target.value

            setNumeroInputs((currentInputs) => ({
              ...currentInputs,
              [preguntaActual.id]: nextValue,
            }))

            if (noSe[preguntaActual.id]) {
              setNoSe((currentNoSe) => ({
                ...currentNoSe,
                [preguntaActual.id]: false,
              }))
            }
          }}
          placeholder="Escribe un número"
          style={{
            width: '100%',
            background: '#FFFFFF',
            border: '1px solid #CFC5B7',
            borderRadius: '14px',
            color: '#1A1830',
            fontSize: '16px',
            outline: 'none',
            padding: '14px 16px',
          }}
        />
        {renderAccion(
          <button
            type="submit"
            disabled={!numeroValido}
            style={{
              ...optionButtonStyle,
              opacity: numeroValido ? 1 : 0.6,
            }}
            onMouseEnter={(event) => {
              if (numeroValido) {
                event.currentTarget.style.background = '#12112A'
              }
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = '#2A1F3D'
            }}
          >
            Continuar
          </button>,
        )}
      </form>
    )
  }

  return (
    <section
      style={{
        background: '#F2EDE3',
        padding: '24px 0',
      }}
    >
      <div ref={wizardRef} style={containerStyle}>
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '10px',
            }}
          >
            <span
              style={{
                color: '#6B6256',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Progreso
            </span>
            <span
              style={{
                color: '#6B6256',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              {Math.round(progreso)}%
            </span>
          </div>
          <div
            style={{
              background: '#E0D9CD',
              borderRadius: '999px',
              height: '10px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: '#2A1F3D',
                borderRadius: '999px',
                height: '100%',
                transition: 'width 0.25s ease',
                width: `${progreso}%`,
              }}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <p
              style={{
                color: '#6B6256',
                fontSize: '12px',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Pregunta {Math.min(paso + 1, preguntasActivas.length || 1)} de{' '}
              {preguntasActivas.length}
            </p>
            {preguntasActivas.length > 9 ? (
              <p
                style={{
                  color: '#6B6256',
                  fontSize: '12px',
                  lineHeight: 1.5,
                  margin: '6px 0 0',
                }}
              >
                Algunas preguntas adicionales aparecen según tus respuestas
              </p>
            ) : null}
          </div>
        </div>

        {preguntaActual ? (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h2
                style={{
                  color: '#1A1830',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  lineHeight: 1.25,
                  margin: 0,
                }}
              >
                {preguntaActual.texto}
              </h2>
            </div>

            {renderOpciones()}

            {preguntaActual.permitirNoSe ? (
              <div style={{ marginTop: '14px', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => marcarNoSe(preguntaActual.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#6B6256',
                    cursor: 'pointer',
                    fontSize: '13px',
                    padding: 0,
                    textDecoration: 'underline',
                  }}
                >
                  No lo sé
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                color: '#1A1830',
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                lineHeight: 1.25,
                margin: '0 0 12px',
              }}
            >
              Ya hemos terminado
            </h2>
            <p
              style={{
                color: '#6B6256',
                fontSize: '15px',
                lineHeight: 1.7,
                margin: '0 0 24px',
              }}
            >
              Tu perfil está listo. Ahora podemos calcular las ayudas que mejor
              encajan contigo.
            </p>
            <button
              type="button"
              onClick={enviarResultados}
              style={{
                ...optionButtonStyle,
                display: 'inline-block',
                maxWidth: '280px',
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = '#12112A'
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = '#2A1F3D'
              }}
            >
              Ver mis resultados
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default EligibilityWizard
