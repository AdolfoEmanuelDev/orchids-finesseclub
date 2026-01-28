"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from "@/components/sections/Header";
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/components/cart-context';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (product?.image) {
      setActiveImage(product.image);
    }
  }, [product]);

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

  const allImages = [product.image, ...(product.secondaryImages || [])].filter(Boolean) as string[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <Header />
      
      <motion.main 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="pt-64 pb-20"
      >
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
            {/* Image Gallery */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#111] flex items-center justify-center group">
                <AnimatePresence mode="wait">
                  {activeImage ? (
                    <motion.div 
                      key={activeImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="w-full h-full"
                    >
                      <div className="w-full h-full transition-transform duration-700 hover:scale-105">
                        <Image
                          src={activeImage}
                          alt={product.name}
                          fill
                          style={product.zoom ? { transform: `scale(${product.zoom})` } : {}}
                          className="object-cover !w-full !h-full !max-w-full"
                          priority
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <div className="w-full h-full bg-[#1F2937] flex items-center justify-center">
                      <span className="text-[#9CA3AF] uppercase text-sm tracking-widest">
                        Imagem indisponível
                      </span>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative aspect-[3/4] overflow-hidden border-2 transition-all duration-300 ${
                        activeImage === img ? 'border-white opacity-100 scale-95' : 'border-transparent opacity-40 hover:opacity-80'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} gallery ${idx}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <div className="flex flex-col">
                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight">
                    {product.name}
                  </h1>
                  {product.originalPrice && (
                    <span className="bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                      Oferta
                    </span>
                  )}
                </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-baseline gap-4 mb-8">
                <div className="text-2xl font-bold">
                  {product.price}
                </div>
                {product.originalPrice && (
                  <div className="text-lg text-gray-500 line-through">
                    {product.originalPrice}
                  </div>
                )}
              </motion.div>

              {product.description && (
                <motion.div 
                  variants={itemVariants}
                  className="mb-10 text-gray-400 leading-relaxed text-sm max-w-[500px] whitespace-pre-wrap font-light"
                >
                  {product.description}
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="space-y-4 max-w-[400px]">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-200 transition-all duration-300 active:scale-[0.98]"
                >
                  Adicionar ao Carrinho
                </button>
                
                <a
                  href={product.checkoutUrl}
                  className="block w-full text-center border border-white text-white py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.98]"
                >
                  Comprar Agora
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-12 pt-12 border-t border-gray-900">
                <div className="grid grid-cols-2 gap-8 text-[10px] uppercase tracking-widest font-bold">
                  <div className="group cursor-default">
                    <h4 className="text-gray-600 mb-2 group-hover:text-gray-400 transition-colors">Frete</h4>
                    <p>Enviamos para todo o Brasil</p>
                  </div>
                  <div className="group cursor-default">
                    <h4 className="text-gray-600 mb-2 group-hover:text-gray-400 transition-colors">Pagamento</h4>
                    <p>Até 12x no cartão ou PIX</p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </motion.main>
    </div>
  );
}
