import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog/posts'

const siteUrl = 'https://orientador-ayudas.vercel.app'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.titulo} | Orientador de Ayudas`,
    description: post.descripcion,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

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
            Blog y guías
          </p>
          <div
            style={{
              color: 'rgba(255,255,255,0.82)',
              fontSize: '14px',
              lineHeight: 1.7,
              marginBottom: '18px',
            }}
          >
            <Link
              href="/"
              style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}
            >
              Inicio
            </Link>{' '}
            →{' '}
            <Link
              href="/blog"
              style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}
            >
              Blog
            </Link>{' '}
            → {post.titulo}
          </div>
          <h1
            style={{
              color: '#FFFFFF',
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              lineHeight: 1.08,
              margin: '0 0 20px',
              maxWidth: '820px',
            }}
          >
            {post.titulo}
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.82)',
              fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: '760px',
            }}
          >
            {post.descripcion}
          </p>
        </div>
      </header>

      <div
        style={{
          margin: '-44px auto 0',
          maxWidth: '920px',
          padding: '0 20px 88px',
          position: 'relative',
        }}
      >
        <article
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(42, 31, 61, 0.08)',
            borderRadius: '28px',
            boxShadow: '0 22px 60px rgba(18, 17, 42, 0.12)',
            padding: '32px 24px',
          }}
        >
          <p
            style={{
              color: '#6B6256',
              fontSize: '14px',
              lineHeight: 1.7,
              margin: '0 0 28px',
            }}
          >
            Última revisión: {formatDate(post.ultimaRevision)}
          </p>

          <div
            className="blog-article"
            dangerouslySetInnerHTML={{ __html: post.contenido }}
            style={{
              color: '#332E45',
              fontSize: '1rem',
              lineHeight: 1.85,
            }}
          />

          <section
            style={{
              background: '#FAF7F2',
              border: '1px solid #DDD5C8',
              borderRadius: '24px',
              marginTop: '36px',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                lineHeight: 1.2,
                margin: '0 0 12px',
              }}
            >
              ¿Quieres saber si te corresponde esta ayuda?
            </h2>
            <p
              style={{
                color: '#5C544A',
                fontSize: '15px',
                lineHeight: 1.8,
                margin: '0 0 18px',
              }}
            >
              Responde unas preguntas y obtén una orientación rápida basada en
              criterios oficiales.
            </p>
            <Link
              href="/"
              style={{
                background: '#2A1F3D',
                borderRadius: '999px',
                color: '#FFFFFF',
                display: 'inline-flex',
                fontSize: '14px',
                fontWeight: 700,
                padding: '12px 20px',
                textDecoration: 'none',
              }}
            >
              Ir al orientador
            </Link>
          </section>
        </article>
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

      <div style={{ background: '#FFFFFF', fontFamily: "'DM Sans', sans-serif" }}>
        <div
          style={{
            alignItems: 'center',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'space-between',
            margin: '0 auto',
            maxWidth: '980px',
            padding: '1.5rem 20px',
          }}
        >
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="IAMagica"
              src="/logo-iamagica.png"
              style={{ display: 'block', height: '28px' }}
            />
            <span
              style={{ color: '#9ca3af', display: 'block', fontSize: '12px', marginTop: '4px' }}
            >
              © 2026 IAMagica
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                color: '#1B4332',
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}
            >
              DIGITALIZA TU NEGOCIO
            </span>
            <a
              href="mailto:info@iamagica.es"
              style={{
                alignItems: 'center',
                color: '#6b7280',
                display: 'inline-flex',
                gap: '6px',
                marginTop: '4px',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: '20px' }}>✉</span>
              <span>info@iamagica.es</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
