import { PRODUCTS } from '@/lib/products';
import ProductPageClient from './ProductPageClient';

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  return <ProductPageClient product={product} />;
}
