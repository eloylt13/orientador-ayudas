import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const baseUrl = 'https://revisor-contrato-practicas.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Revisor de contratos de prácticas | Detecta cláusulas ilegales gratis',
  description:
    'Sube tu contrato o convenio de prácticas en PDF y detectamos cláusulas ilegales o abusivas antes de que lo firmes. Gratis, sin registro, para estudiantes y recién titulados en España.',
  keywords: [
    'revisar contrato prácticas',
    'contrato prácticas ilegal',
    'contrato becario abusivo',
    'convenio prácticas universitarias',
    'contrato formativo cláusulas abusivas',
    'contrato en prácticas España',
    'revisar convenio prácticas PDF',
    'mis prácticas son legales',
    'contrato formativo práctica profesional',
    'prácticas no laborales derechos',
    'ET art 11 prácticas',
    'Ley 32/2021 contrato formativo',
    'RD 592/2014 prácticas universitarias',
  ],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    url: baseUrl,
    title: 'Revisor de contratos de prácticas — Detecta cláusulas ilegales',
    description:
      'Analiza tu contrato o convenio de prácticas en PDF y detecta cláusulas abusivas antes de firmarlo. Herramienta gratuita para estudiantes en España.',
    siteName: 'Revisor de Contratos de Prácticas',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Revisor de contratos de prácticas — Detecta cláusulas ilegales',
    description:
      'Sube tu contrato de prácticas en PDF y detectamos cláusulas ilegales gratis. Para estudiantes en España.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '6Cr92jGfY8D6cZX4sdEC1v1vECb_mgjBy8Jd9qoUfI4',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}<Analytics /></body>
    </html>
  );
}
