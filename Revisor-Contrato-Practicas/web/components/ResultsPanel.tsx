'use client';

import type { RiskItem, DocumentType } from '@/types/risk';

const DOC_TYPE_CONFIG: Record<DocumentType, { label: string; color: string; bg: string; border: string }> = {
  convenio_no_laboral: { label: 'Convenio de prácticas no laborales', color: '#1A4A7A', bg: '#EEF4FC', border: '#C0D4EC' },
  contrato_pre2022: { label: 'Contrato en prácticas · anterior a la Ley 32/2021 (reforma laboral)', color: '#5A3A8A', bg: '#F5F0FC', border: '#D0C0EC' },
  contrato_post2022: { label: 'Contrato formativo · Ley 32/2021', color: '#1A6640', bg: '#EDFAF3', border: '#A8DCC0' },
  documento_informativo: { label: 'Documento informativo', color: '#C45A1A', bg: '#FEF3EC', border: '#F0C8A0' },
  desconocido: { label: 'Tipo no detectado', color: '#666', bg: '#F5F5F0', border: '#D8D0C0' },
};

const SEVERITY = {
  red: { emoji: '🔴', label: 'ILEGAL / ABUSIVO', color: '#9A2020', bg: '#FDF8F8', border: '#F0CCCC', accent: '#B03030' },
  yellow: { emoji: '🟡', label: 'REVISA ANTES DE FIRMAR', color: '#8A5010', bg: '#FEFAF4', border: '#EDD8A0', accent: '#C47A1A' },
  weak: { emoji: '🔵', label: 'PREGUNTA O VERIFICA', color: '#1A3A6A', bg: '#F4F8FD', border: '#B8D0EC', accent: '#1A4A7A' },
};

interface Props {
  documentType: DocumentType;
  items: RiskItem[];
  onReset: () => void;
}

export default function ResultsPanel({ documentType, items, onReset }: Props) {
  const doc = DOC_TYPE_CONFIG[documentType];

  if (documentType === 'documento_informativo') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <DocBadge doc={doc} />
        <div style={{ borderRadius: '16px', padding: '36px 28px', textAlign: 'center', background: '#FEF3EC', border: '1.5px solid #F0C8A0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '40px', marginBottom: '14px' }}>⚠️</div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.15rem', color: '#7A3A10', marginBottom: '10px' }}>
            Este documento parece ser un folleto informativo
          </p>
          <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#9A5A30', maxWidth: '380px', margin: '0 auto 10px' }}>
            Hemos detectado que el PDF es probablemente una guía del SEPE o del Ministerio de Trabajo, no un contrato real para firmar.
          </p>
          <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#9A5A30', maxWidth: '380px', margin: '0 auto' }}>
            Sube el <strong>contrato o convenio que te ha entregado la empresa</strong>, no el folleto explicativo.
          </p>
        </div>
        <ResetButton onReset={onReset} label="Subir otro documento" />
      </div>
    );
  }

  const red = items.filter(i => i.severity === 'red');
  const yellow = items.filter(i => i.severity === 'yellow');
  const weak = items.filter(i => i.severity === 'weak');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      <DocBadge doc={doc} />

      {/* Counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
        {[
          { n: red.length, label: 'Ilegales', emoji: '🔴', color: '#9A2020', bg: '#FDF8F8', border: '#F0CCCC' },
          { n: yellow.length, label: 'A revisar', emoji: '🟡', color: '#8A5010', bg: '#FEFAF4', border: '#EDD8A0' },
          { n: weak.length, label: 'Verificar', emoji: '🔵', color: '#1A3A6A', bg: '#F4F8FD', border: '#B8D0EC' },
        ].map(({ n, label, emoji, color, bg, border }) => (
          <div key={label} style={{ borderRadius: '14px', padding: '16px 8px', background: bg, border: `1.5px solid ${border}`, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{emoji}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 900, color, lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: '11px', fontWeight: 600, color, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ height: '1px', background: '#D8D0C0' }} />

      {/* Items */}
      {items.length === 0 ? (
        <div style={{ borderRadius: '16px', padding: '36px 28px', textAlign: 'center', background: '#EDFAF3', border: '1.5px solid #A8DCC0' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem', color: '#1A6640', marginBottom: '8px' }}>
            No se han detectado cláusulas problemáticas
          </p>
          <p style={{ fontSize: '13px', color: '#3A8860', lineHeight: 1.65 }}>
            Revisión orientativa. Si tienes dudas, consulta con un asesor laboral.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[...red, ...yellow, ...weak].map((item) => {
            const s = SEVERITY[item.severity];
            return (
              <div key={item.id} style={{
                borderRadius: '14px',
                background: s.bg,
                border: `1px solid ${s.border}`,
                overflow: 'hidden',
                boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
              }}>
                {/* Top accent bar */}
                <div style={{ height: '3px', background: s.accent }} />
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '16px' }}>{s.emoji}</span>
                    <span style={{
                      fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
                      textTransform: 'uppercase', color: s.color,
                      background: `${s.accent}18`, padding: '3px 8px', borderRadius: '6px',
                    }}>
                      {s.label}
                    </span>
                    {item.page && (
                      <span style={{ fontSize: '12px', color: '#A09080' }}>pág. {item.page}</span>
                    )}
                  </div>
                  <h3 style={{ fontWeight: 600, fontSize: '14px', color: '#1A1830', margin: '0 0 6px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#4A4440', margin: 0 }}>
                    {item.explanation}
                  </p>
                  {item.legalRef && (
                    <p style={{ fontSize: '11px', color: '#A09080', marginTop: '8px', fontFamily: 'monospace' }}>
                      {item.legalRef}
                    </p>
                  )}
                  {item.snippet && (
                    <blockquote style={{
                      marginTop: '10px', paddingLeft: '12px',
                      borderLeft: `3px solid ${s.accent}55`,
                      fontSize: '12px', fontStyle: 'italic',
                      color: '#7A7068', lineHeight: 1.65,
                    }}>
                      {item.snippet}
                    </blockquote>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p style={{ fontSize: '12px', color: '#A09080', textAlign: 'center', lineHeight: 1.65 }}>
        Este análisis es orientativo y no sustituye el asesoramiento jurídico profesional.<br />
        Para dudas laborales puedes contactar con el sindicato de tu sector o con un asesor laboral.
      </p>

      <ResetButton onReset={onReset} label="Analizar otro documento" />
    </div>
  );
}

function DocBadge({ doc }: { doc: { label: string; color: string; bg: string; border: string } }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '7px 16px', borderRadius: '999px', background: doc.bg, border: `1px solid ${doc.border}` }}>
      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: doc.color, flexShrink: 0, display: 'inline-block' }} />
      <span style={{ fontSize: '12px', fontWeight: 600, color: doc.color }}>{doc.label}</span>
    </div>
  );
}

function ResetButton({ onReset, label }: { onReset: () => void; label: string }) {
  return (
    <button onClick={onReset}
      style={{
        width: '100%', padding: '13px', borderRadius: '12px',
        border: '1.5px solid #C8C0B0', background: 'transparent',
        color: '#5A5248', fontSize: '14px', fontWeight: 500,
        cursor: 'pointer', transition: 'all 0.2s',
        fontFamily: "'DM Sans', sans-serif",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#EAE4D8'; e.currentTarget.style.borderColor = '#2A1F3D'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#C8C0B0'; }}>
      {label}
    </button>
  );
}

