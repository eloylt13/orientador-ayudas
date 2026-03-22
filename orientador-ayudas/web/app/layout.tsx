import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: '¿Qué ayudas del Estado me corresponden? | Orientador de Ayudas',
  description:
    'Descubre en 2 minutos las ayudas estatales para las que podrías encajar según tu situación. IMV, prestación por desempleo y subsidio. Sin registro ni DNI.',
  keywords: [
    'ayudas del estado',
    'qué ayudas me corresponden',
    'ingreso mínimo vital',
    'prestación desempleo',
    'subsidio desempleo',
    'ayudas sociales España',
  ],
  openGraph: {
    title: '¿Qué ayudas del Estado te corresponden?',
    description:
      'Orientador gratuito de ayudas estatales. Responde 8 preguntas y descubre si encajas en el IMV, la prestación contributiva o el subsidio por desempleo.',
    url: 'https://orientador-ayudas.vercel.app',
    siteName: 'Orientador de Ayudas del Estado',
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical: 'https://orientador-ayudas.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '6Cr92jGfY8D6cZX4sdEC1v1vECb_mgjBy8Jd9qoUfI4',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Orientador de Ayudas del Estado',
              description:
                'Herramienta gratuita para descubrir ayudas estatales según tu situación personal',
              url: 'https://orientador-ayudas.vercel.app',
              applicationCategory: 'GovernmentService',
              inLanguage: 'es',
              isAccessibleForFree: true,
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            }),
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'DM Sans', sans-serif" }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
