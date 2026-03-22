'use client';

import { useState, useCallback } from 'react';
import ResultsPanel from '@/components/ResultsPanel';
import type { AnalysisResult, DocumentType } from '@/types/risk';

type State = 'idle' | 'loading' | 'needs_type' | 'done' | 'error';

const MANUAL_TYPES: { value: DocumentType; label: string; desc: string }[] = [
  { value: 'convenio_no_laboral', label: 'Convenio de prácticas', desc: 'Curriculares o extracurriculares universitarias / FP' },
  { value: 'contrato_pre2022', label: 'Contrato en prácticas', desc: 'Firmado antes del 31 de marzo de 2022' },
  { value: 'contrato_post2022', label: 'Contrato formativo', desc: 'Firmado desde el 31 de marzo de 2022 (Ley 32/2021)' },
];

const FAQ = [
  {
    q: '¿Es ilegal que mi contrato de prácticas no especifique el salario?',
    a: 'Sí. Todo contrato de trabajo en prácticas debe indicar la retribución de forma expresa. En contratos anteriores a 2022, el mínimo es el 60% del salario de convenio durante el primer año y el 75% durante el segundo. En contratos formativos post-2022, no puede ser inferior al Salario Mínimo Interprofesional.',
  },
  {
    q: '¿Cuánto puede durar un contrato de prácticas?',
    a: 'Depende del tipo. El contrato en prácticas antiguo (ET art. 11.1) tiene un máximo de 2 años. El contrato formativo para práctica profesional de la Ley 32/2021 tiene un máximo de 1 año. Si se supera el límite, el contrato se convierte automáticamente en indefinido.',
  },
  {
    q: '¿Pueden obligarme a hacer horas extra en prácticas?',
    a: 'No. Las horas extraordinarias están prohibidas en los contratos formativos. Si tu contrato menciona horas extra o trabajo suplementario, esa cláusula es nula y no te obliga. El ET art. 35.1 lo prohíbe expresamente para este tipo de contratos.',
  },
  {
    q: '¿Qué diferencia hay entre un convenio de prácticas y un contrato de prácticas?',
    a: 'El convenio de prácticas no es un contrato laboral: no genera relación laboral, se rige por el RD 592/2014 y cubre principalmente prácticas universitarias curriculares y extracurriculares. El contrato de prácticas sí es laboral, genera derechos como vacaciones, salario mínimo y cotización a la Seguridad Social.',
  },
  {
    q: '¿Qué hago si mi empresa me da un contrato con cláusulas ilegales?',
    a: 'Primero, no lo firmes sin revisarlo. Puedes pedir que modifiquen las cláusulas problemáticas. Si ya lo firmaste, las cláusulas ilegales son nulas aunque estén firmadas — la ley prevalece sobre el contrato. Puedes consultar con un sindicato (CCOO, UGT) de forma gratuita o presentar una denuncia ante la Inspección de Trabajo (ITSS).',
  },
];

export default function HomePage() {
  const [state, setState] = useState<State>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const analyze = useCallback(async (f: File, docType?: DocumentType) => {
    setState('loading');
    setErrorMsg('');
    const fd = new FormData();
    fd.append('file', f);
    if (docType) fd.append('documentType', docType);
    try {
      const res = await fetch('/api/evaluate', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error desconocido');
      if (data.documentType === 'desconocido') { setState('needs_type'); return; }
      setResult(data);
      setState('done');
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Error inesperado');
      setState('error');
    }
  }, []);

  const handleFile = (f: File) => { setFile(f); analyze(f); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === 'application/pdf') handleFile(f);
  };
  const reset = () => { setFile(null); setResult(null); setState('idle'); setErrorMsg(''); };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F2EDE3', fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── JSON-LD structured data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Revisor de contratos de prácticas',
            url: 'https://revisor-contrato-practicas.vercel.app',
            description: 'Herramienta gratuita para analizar contratos y convenios de prácticas en PDF y detectar cláusulas ilegales o abusivas antes de firmarlos.',
            applicationCategory: 'LegalApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            audience: { '@type': 'Audience', audienceType: 'Estudiantes universitarios y recién titulados en España' },
          }),
        }}
      />

      {/* ── Header ── */}
      <header style={{
        background: 'linear-gradient(160deg, #12112A 0%, #1E1B3A 60%, #2A1F3D 100%)',
        padding: '52px 24px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />

        <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚖️</div>
        <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#7070A0', marginBottom: '14px' }}>
          Herramienta gratuita · España
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.9rem, 5vw, 2.8rem)',
          fontWeight: 900,
          color: '#F0EBE0',
          lineHeight: 1.2,
          margin: '0 0 14px',
          letterSpacing: '-0.01em',
        }}>
          Revisor de contratos<br />de prácticas
        </h1>
        <p style={{ fontSize: '14px', color: '#8888AA', maxWidth: '400px', margin: '0 auto 36px', lineHeight: 1.75 }}>
          Sube tu contrato o convenio en PDF y detectamos cláusulas ilegales o abusivas antes de que lo firmes.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { emoji: '🔴', label: 'Ilegal / abusivo' },
            { emoji: '🟡', label: 'Revisar antes de firmar' },
            { emoji: '🔵', label: 'Verificar' },
          ].map(({ emoji, label }) => (
            <span key={label} style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              fontSize: '12px', color: '#9090B8',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '6px 14px', borderRadius: '999px',
            }}>
              <span style={{ fontSize: '10px' }}>{emoji}</span>
              {label}
            </span>
          ))}
        </div>
      </header>

      {/* ── Content ── */}
      <div style={{ maxWidth: '580px', margin: '0 auto', padding: '44px 20px 60px' }}>

        {/* IDLE / ERROR */}
        {(state === 'idle' || state === 'error') && (
          <>
            <div
              onClick={() => document.getElementById('fileInput')?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragOver ? '#2A1F3D' : '#C4BBAA'}`,
                borderRadius: '18px',
                padding: '52px 32px',
                textAlign: 'center',
                cursor: 'pointer',
                background: dragOver ? '#EAE4D8' : '#FAF7F2',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              }}
            >
              <input id="fileInput" type="file" accept=".pdf" style={{ display: 'none' }}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
              <div style={{ fontSize: '44px', marginBottom: '16px' }}>📄</div>
              <p style={{ fontWeight: 600, fontSize: '15px', color: '#1A1830', marginBottom: '6px' }}>
                Arrastra el PDF aquí
              </p>
              <p style={{ fontSize: '13px', color: '#8A8070' }}>
                o haz clic para seleccionarlo · Solo PDF · Máx. 10 MB
              </p>
            </div>

            {state === 'error' && (
              <div style={{ marginTop: '16px', fontSize: '14px', textAlign: 'center', background: '#FDF0F0', color: '#9A2020', padding: '14px 20px', borderRadius: '12px', border: '1px solid #F0CACA' }}>
                {errorMsg}
              </div>
            )}

            <p style={{ fontSize: '12px', color: '#A09080', textAlign: 'center', marginTop: '22px', lineHeight: 1.65 }}>
              Tu documento no se almacena. El análisis es instantáneo y el PDF se descarta al momento.<br />
              Este revisor es orientativo y no sustituye el asesoramiento jurídico.
            </p>
          </>
        )}

        {/* LOADING */}
        {state === 'loading' && (
          <div style={{ textAlign: 'center', padding: '72px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '28px' }}>
              {[0, 1, 2].map(i => (
                <span key={i} className={`dot-${i + 1}`} style={{
                  width: '11px', height: '11px', borderRadius: '50%',
                  background: '#2A1F3D', display: 'inline-block',
                }} />
              ))}
            </div>
            <p style={{ fontWeight: 600, fontSize: '15px', color: '#1A1830', marginBottom: '6px' }}>
              Analizando el documento
            </p>
            <p style={{ fontSize: '13px', color: '#8A8070' }}>{file?.name}</p>
          </div>
        )}

        {/* NEEDS TYPE */}
        {state === 'needs_type' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8A8070', marginBottom: '10px' }}>
                Selección necesaria
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.65rem', fontWeight: 700, color: '#1A1830', margin: '0 0 8px' }}>
                ¿Qué tipo de documento es?
              </h2>
              <p style={{ fontSize: '13px', color: '#8A8070' }}>
                No hemos podido detectarlo automáticamente
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {MANUAL_TYPES.map((t) => (
                <button key={t.value} onClick={() => { if (file) analyze(file, t.value); }}
                  style={{
                    textAlign: 'left', padding: '18px 22px', borderRadius: '14px',
                    border: '1.5px solid #D0C8BA', background: '#FAF7F2',
                    cursor: 'pointer', transition: 'all 0.2s',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#2A1F3D'; e.currentTarget.style.background = '#F2EDE3'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#D0C8BA'; e.currentTarget.style.background = '#FAF7F2'; }}>
                  <p style={{ fontWeight: 600, fontSize: '14px', color: '#1A1830', margin: 0 }}>{t.label}</p>
                  <p style={{ fontSize: '12px', color: '#8A8070', margin: '3px 0 0' }}>{t.desc}</p>
                </button>
              ))}
            </div>
          </>
        )}

        {/* DONE */}
        {state === 'done' && result && (
          <ResultsPanel documentType={result.documentType} items={result.items} onReset={reset} />
        )}

        {/* ── Sección SEO: Qué detecta ── */}
        {(state === 'idle' || state === 'error') && (
          <section style={{ marginTop: '72px' }}>
            <div style={{ borderTop: '1px solid #D8D0C4', paddingTop: '52px' }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.45rem', fontWeight: 700,
                color: '#1A1830', marginBottom: '16px',
              }}>
                ¿Qué detecta este revisor?
              </h2>
              <p style={{ fontSize: '14px', color: '#5A5040', lineHeight: 1.8, marginBottom: '16px' }}>
                Muchos contratos y convenios de prácticas incluyen cláusulas que no cumplen la ley,
                o que están en blanco cuando deberían tener valores concretos. Esta herramienta analiza
                el PDF y señala automáticamente los puntos que debes revisar antes de firmar.
              </p>
              <p style={{ fontSize: '14px', color: '#5A5040', lineHeight: 1.8, marginBottom: '24px' }}>
                Detecta problemas habituales como <strong>períodos de prueba excesivos</strong>,
                <strong> retribuciones por debajo del mínimo legal</strong>, <strong>jornadas sin concretar</strong>,
                <strong> horas extra prohibidas</strong>, ausencia de cotización a la Seguridad Social,
                cláusulas de exclusividad y mucho más. Cubre los tres tipos de documento:
                convenios de prácticas universitarias, contratos en prácticas anteriores a la reforma laboral
                de 2022, y contratos formativos para la práctica profesional regulados por la Ley 32/2021.
              </p>

              {/* Tres columnas de lo que detecta */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                {[
                  { icon: '📋', text: 'Convenios de prácticas universitarias y FP' },
                  { icon: '📝', text: 'Contratos en prácticas anteriores a 2022' },
                  { icon: '✅', text: 'Contratos formativos Ley 32/2021' },
                ].map(({ icon, text }) => (
                  <div key={text} style={{
                    background: '#FAF7F2', border: '1px solid #DDD5C8',
                    borderRadius: '12px', padding: '16px',
                    fontSize: '13px', color: '#5A5040', lineHeight: 1.5,
                  }}>
                    <span style={{ fontSize: '20px', display: 'block', marginBottom: '8px' }}>{icon}</span>
                    {text}
                  </div>
                ))}
              </div>

              <p style={{ fontSize: '12px', color: '#9A9080', lineHeight: 1.65 }}>
                El análisis es orientativo y no sustituye el asesoramiento de un profesional jurídico.
                Para dudas laborales puedes consultar con <strong>CCOO</strong>, <strong>UGT</strong> o la{' '}
                <strong>Inspección de Trabajo (ITSS)</strong> de forma gratuita.
              </p>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        {(state === 'idle' || state === 'error') && (
          <section style={{ marginTop: '56px' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.45rem', fontWeight: 700,
              color: '#1A1830', marginBottom: '24px',
            }}>
              Preguntas frecuentes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {FAQ.map(({ q, a }, i) => (
                <details key={i} style={{ borderBottom: '1px solid #DDD5C8', paddingBottom: '0' }}>
                  <summary style={{
                    cursor: 'pointer', padding: '18px 0',
                    fontWeight: 600, fontSize: '14px', color: '#1A1830',
                    listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    userSelect: 'none',
                  }}>
                    {q}
                    <span style={{ fontSize: '18px', color: '#8A8070', marginLeft: '12px', flexShrink: 0 }}>+</span>
                  </summary>
                  <p style={{
                    fontSize: '13px', color: '#5A5040', lineHeight: 1.8,
                    margin: '0 0 18px', paddingRight: '24px',
                  }}>
                    {a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ── Footer ── */}
        <footer style={{ marginTop: '72px', paddingTop: '32px', borderTop: '1px solid #D8D0C4', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#A09080', lineHeight: 1.65 }}>
            Herramienta gratuita para estudiantes y recién titulados en España.<br />
            Basada en el Estatuto de los Trabajadores, RD 592/2014 y Ley 32/2021.<br />
            No almacenamos ningún documento. Sin registro.
          </p>
        </footer>

      </div>
    </main>
  );
}
