import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/blog/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllBlogPosts()

  return [
    {
      url: 'https://orientador-ayudas.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://orientador-ayudas.vercel.app/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `https://orientador-ayudas.vercel.app/blog/${post.slug}`,
      lastModified: new Date(post.ultimaRevision),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
