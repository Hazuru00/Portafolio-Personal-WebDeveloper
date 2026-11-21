import type { MetadataRoute } from 'next';

const baseUrl = 'https://hazuru.vercel.app';

// Sin lastModified: una fecha fija se vuelve obsoleta y `new Date()`
// cambiaria en cada build. Los buscadores detectan cambios al rastrear.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
