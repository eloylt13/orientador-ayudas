import { ImageResponse } from 'next/og'

type BlogOgImageOptions = {
  eyebrow: string
  title: string
  description: string
  footer: string
  accent?: 'amber' | 'cobalt'
}

const palette = {
  amber: {
    glow: 'rgba(196, 122, 26, 0.30)',
    chipBg: 'rgba(196, 122, 26, 0.16)',
    chipBorder: 'rgba(196, 122, 26, 0.3)',
    chipText: '#f6d29c',
  },
  cobalt: {
    glow: 'rgba(26, 74, 122, 0.30)',
    chipBg: 'rgba(26, 74, 122, 0.18)',
    chipBorder: 'rgba(110, 164, 220, 0.28)',
    chipText: '#bfdcff',
  },
}

export const ogImageSize = {
  width: 1200,
  height: 630,
}

export const ogImageContentType = 'image/png'

export function createBlogOgImage({
  eyebrow,
  title,
  description,
  footer,
  accent = 'amber',
}: BlogOgImageOptions) {
  const colors = palette[accent]

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'stretch',
          background:
            `radial-gradient(circle at top right, ${colors.glow}, transparent 28%), linear-gradient(135deg, #12112A 0%, #2A1F3D 55%, #171527 100%)`,
          color: '#FFFFFF',
          display: 'flex',
          height: '100%',
          padding: '44px',
          width: '100%',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '32px',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            padding: '36px',
            position: 'relative',
          }}
        >
          <div
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.08), transparent)',
              height: '140px',
              position: 'absolute',
              inset: 0,
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              position: 'relative',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                gap: '14px',
              }}
            >
              <div
                style={{
                  background: colors.chipBg,
                  border: `1px solid ${colors.chipBorder}`,
                  borderRadius: '999px',
                  color: colors.chipText,
                  display: 'flex',
                  fontSize: '20px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  padding: '12px 18px',
                  textTransform: 'uppercase',
                }}
              >
                {eyebrow}
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  display: 'flex',
                  fontSize: '24px',
                }}
              >
                Orientador de Ayudas
              </div>
            </div>

            <div
              style={{
                color: '#FFFFFF',
                display: 'flex',
                fontFamily: 'Georgia, serif',
                fontSize: title.length > 70 ? '60px' : '72px',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.02,
                maxWidth: '900px',
              }}
            >
              {title}
            </div>

            <div
              style={{
                color: 'rgba(255,255,255,0.84)',
                display: 'flex',
                fontSize: '28px',
                lineHeight: 1.4,
                maxWidth: '820px',
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              alignItems: 'center',
              borderTop: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.78)',
              display: 'flex',
              fontSize: '22px',
              justifyContent: 'space-between',
              marginTop: '26px',
              paddingTop: '24px',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex' }}>{footer}</div>
            <div
              style={{
                color: '#f7efe2',
                display: 'flex',
                fontSize: '22px',
                fontWeight: 700,
              }}
            >
              orientador-ayudas.vercel.app
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogImageSize,
    }
  )
}
