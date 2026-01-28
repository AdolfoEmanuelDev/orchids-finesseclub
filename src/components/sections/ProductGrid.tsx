"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/cart-context';
import { PRODUCTS, Product } from '@/lib/products';
import { motion } from 'framer-motion';

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const { addToCart } = useCart();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="block bg-black text-white group"
    >
        <Link href={`/produto/${product.id}`} className="block overflow-hidden relative">
          <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
            {product.image ? (
              <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
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
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {product.originalPrice && (
              <div className="absolute top-0 right-0 p-2 z-10">
                <span className="bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest shadow-2xl">
                  Oferta
                </span>
              </div>
            )}
          </div>
        </Link>
  
        <div className="p-4 text-center flex flex-col items-center">
          <Link href={`/produto/${product.id}`} className="block group w-full">
            <h3 className="font-sans text-[14px] font-bold uppercase tracking-wide text-white mb-2 leading-tight group-hover:text-gray-300 transition-colors">
              {product.name}
            </h3>
          </Link>
  
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex items-center gap-2">
              <span className="font-sans text-[14px] font-bold text-white">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="font-sans text-[12px] text-gray-500 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => addToCart(product)}
              className="w-full py-2 text-[11px] font-bold uppercase tracking-[0.2em] border border-white text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.97]"
            >
              Adicionar
            </button>
          </div>
        </div>
    </motion.div>
  );
};

const ProductGrid = () => {
  return (
    <main className="pt-64 pb-20 bg-black min-h-screen">
      <div className="container px-4 mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductGrid;

