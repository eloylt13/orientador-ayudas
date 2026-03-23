import {
  createBlogOgImage,
  ogImageContentType,
  ogImageSize,
} from '@/lib/blog/og'
import { getBlogPostBySlug } from '@/lib/blog/posts'

export const size = ogImageSize
export const contentType = ogImageContentType
export const alt = 'Artículo del blog de Orientador de Ayudas'

type OpenGraphImageProps = {
  params: Promise<{ slug: string }>
}

export default async function OpenGraphImage({
  params,
}: OpenGraphImageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  return createBlogOgImage({
    eyebrow: 'Guia',
    title: post?.titulo ?? 'Articulo del blog',
    description:
      post?.descripcion ??
      'Guía práctica sobre ayudas del Estado y trámites oficiales.',
    footer: post
      ? `Actualizado el ${post.ultimaRevision}`
      : 'Orientador de Ayudas',
    accent: 'cobalt',
  })
}
