import {
  createBlogOgImage,
  ogImageContentType,
  ogImageSize,
} from '@/lib/blog/og'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'Blog sobre ayudas del Estado'

export default function OpenGraphImage() {
  return createBlogOgImage({
    eyebrow: 'Blog',
    title: 'Guias claras sobre ayudas del Estado',
    description:
      'IMV, prestación contributiva y subsidios explicados con enfoque práctico y enlaces oficiales.',
    footer: 'Artículos estáticos y optimizados para SEO',
    accent: 'amber',
  })
}
