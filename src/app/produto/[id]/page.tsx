import React from 'react';
import Link from 'next/link';
import Header from "@/components/sections/Header";
import { PRODUCTS } from '@/lib/products';
import ProductPageClient from '@/components/sections/ProductPageClient';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Produto não encontrado',
    };
  }

  return {
    title: product.name,
    description: product.description || `Confira ${product.name} na Finesse Club. Curadoria High-End selecionada.`,
    openGraph: {
      title: `${product.name} | Finesse Club`,
      description: product.description || `Confira ${product.name} na Finesse Club.`,
      images: [product.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <Link href="/" className="underline uppercase tracking-widest text-sm">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  return <ProductPageClient product={product} />;
}
