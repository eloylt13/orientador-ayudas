import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/blog/posts'

const posts = getAllBlogPosts()

export const metadata: Metadata = {
  title: 'Guías sobre ayudas del Estado | Orientador de Ayudas',
  description:
    'Información actualizada sobre prestaciones, requisitos y trámites oficiales para entender las principales ayudas del Estado.',
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export default function BlogPage() {
  return (
    <main
      style={{
        background: '#F2EDE3',
        color: '#1A1830',
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
            Blog y guias
          </p>
          <h1
            style={{
              color: '#FFFFFF',
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.3rem, 6vw, 4.2rem)',
              lineHeight: 1.08,
              margin: '0 auto 20px',
              maxWidth: '820px',
            }}
          >
            Guías sobre ayudas del Estado
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
            Información actualizada sobre prestaciones, requisitos y trámites
            oficiales
          </p>
        </div>
      </header>

      <section
        style={{
          margin: '-44px auto 0',
          maxWidth: '1080px',
          padding: '0 20px 88px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: '20px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {posts.map((post) => (
            <article
              key={post.slug}
              style={{
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(42, 31, 61, 0.08)',
                borderRadius: '26px',
                boxShadow: '0 16px 42px rgba(18, 17, 42, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100%',
                padding: '24px',
              }}
            >
              <p
                style={{
                  color: '#6B6256',
                  fontSize: '13px',
                  margin: '0 0 12px',
                }}
              >
                {formatDate(post.fecha)}
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                  lineHeight: 1.14,
                  margin: '0 0 12px',
                }}
              >
                {post.titulo}
              </h2>
              <p
                style={{
                  color: '#5C544A',
                  flex: 1,
                  fontSize: '0.98rem',
                  lineHeight: 1.8,
                  margin: '0 0 20px',
                }}
              >
                {post.descripcion}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  color: '#2A1F3D',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Leer más →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
