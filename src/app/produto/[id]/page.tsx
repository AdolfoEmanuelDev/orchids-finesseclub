import { PRODUCTS } from '@/lib/products';
import ProductClient from './ProductClient';

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  return <ProductClient product={product} />;
}
