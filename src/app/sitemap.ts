import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://finesseclub.com.br';

  const productUrls = PRODUCTS.map((product) => ({
    url: `${baseUrl}/produto/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productUrls,
  ];
}
