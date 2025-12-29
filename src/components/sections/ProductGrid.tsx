"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/cart-context';
import { PRODUCTS, Product } from '@/lib/products';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <div className="block bg-black text-white group">
      <Link href={`/produto/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-black flex items-center justify-center">
          {product.image ? (
            <div className="w-full h-full transition-transform duration-300 group-hover:scale-110">
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={product.zoom ? { transform: `scale(${product.zoom})` } : {}}
                className="object-cover w-full h-full max-w-full"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-[#1F2937] flex items-center justify-center">
              <span className="text-[#9CA3AF] text-center text-[12px] font-sans uppercase">
                Imagem indisponível
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 text-center flex flex-col items-center">
        <Link href={`/produto/${product.id}`} className="block group">
          <h3 className="font-sans text-[14px] font-bold uppercase tracking-wide text-white mb-2 leading-tight group-hover:underline">
            {product.name}
          </h3>
        </Link>

        <div className="flex flex-col items-center gap-2 w-full">
          <span className="font-sans text-[14px] md:text-[12px] font-bold text-white whitespace-pre-line">
            {product.price}
          </span>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="w-full py-2 md:py-1 text-[12px] font-bold uppercase tracking-wider border border-white text-white hover:bg-white hover:text-black transition-colors duration-150"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  return (
    <main className="pt-52 pb-12 bg-black min-h-screen">
      <div className="container px-4 mx-auto max-w-[1536px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductGrid;
