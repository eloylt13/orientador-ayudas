export function CoverageNotice() {
  return (
    <section
      aria-label="Aviso sobre el alcance de la herramienta"
      style={{
        background: '#F2EDE3',
        borderLeft: '4px solid #2A1F3D',
        borderRadius: '16px',
        padding: '24px',
      }}
    >
      <h2
        style={{
          color: '#1A1830',
          fontSize: '1rem',
          fontWeight: 700,
          lineHeight: 1.4,
          margin: '0 0 16px',
        }}
      >
        ¿Qué ayudas cubre esta herramienta?
      </h2>

      <ul
        style={{
          color: '#1A1830',
          fontSize: '0.98rem',
          lineHeight: 1.7,
          listStyle: 'none',
          margin: '0 0 20px',
          padding: 0,
        }}
      >
        <li style={{ marginBottom: '8px' }}>✅ Ingreso Mínimo Vital (IMV)</li>
        <li style={{ marginBottom: '8px' }}>
          ✅ Prestación contributiva por desempleo (SEPE)
        </li>
        <li>
          ✅ Subsidio por desempleo por cotizaciones insuficientes (SEPE)
        </li>
      </ul>

      <hr
        style={{
          border: 0,
          borderTop: '1px solid rgba(42, 31, 61, 0.14)',
          margin: '0 0 18px',
        }}
      />

      <p
        style={{
          color: '#4E4A45',
          fontSize: '0.875rem',
          lineHeight: 1.7,
          margin: '0 0 12px',
        }}
      >
        Esta herramienta cubre las ayudas estatales más frecuentes. Existen
        muchas otras ayudas autonómicas, municipales y sectoriales que no están
        incluidas. Para una consulta completa visita el{' '}
        <a
          href="https://administracion.gob.es/pag_Home/ayudas/buscador.html"
          target="_blank"
          rel="noreferrer"
          style={{
            color: '#2A1F3D',
            fontWeight: 600,
            textDecoration: 'underline',
          }}
        >
          Punto de Acceso General de ayudas
        </a>
        .
      </p>

      <p
        style={{
          color: '#8C857C',
          fontSize: '0.75rem',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Orientación informativa basada en fuentes oficiales. No sustituye la
        solicitud oficial ni garantiza la concesión. Última revisión: marzo
        2026.
      </p>
    </section>
  )
}

export default CoverageNotice
