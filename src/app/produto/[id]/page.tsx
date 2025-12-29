"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from "@/components/sections/Header";
import { PRODUCTS } from '@/lib/products';
import { useCart } from '@/components/cart-context';

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

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <Header />
      
      <main className="pt-64 pb-20">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden bg-black flex items-center justify-center group">
                {activeImage ? (
                  <div className="w-full h-full transition-transform duration-500 hover:scale-110">
                    <Image
                      src={activeImage}
                      alt={product.name}
                      fill
                      style={product.zoom ? { transform: `scale(${product.zoom})` } : {}}
                      className="object-cover !w-full !h-full !max-w-full"
                      priority
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-[#1F2937] flex items-center justify-center">
                    <span className="text-[#9CA3AF] uppercase text-sm tracking-widest">
                      Imagem indisponível
                    </span>
                  </div>
                )}
              </div>

              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative aspect-[3/4] overflow-hidden border-2 transition-colors ${
                        activeImage === img ? 'border-white' : 'border-transparent opacity-50 hover:opacity-100'
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
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4 leading-tight">
                  {product.name}
                </h1>
              
              <div className="text-2xl font-bold mb-8">
                {product.price}
              </div>

              {product.description && (
                <div className="mb-10 text-gray-300 leading-relaxed text-sm max-w-[500px] whitespace-pre-wrap">
                  {product.description}
                </div>
              )}

              <div className="space-y-4 max-w-[400px]">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                  Adicionar ao Carrinho
                </button>
                
                <a
                  href={product.checkoutUrl}
                  className="block w-full text-center border border-white text-white py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  Comprar Agora
                </a>
              </div>

              <div className="mt-12 pt-12 border-t border-gray-800">
                <div className="grid grid-cols-2 gap-8 text-[10px] uppercase tracking-widest font-bold">
                  <div>
                    <h4 className="text-gray-500 mb-2">Frete</h4>
                    <p>Enviamos para todo o Brasil</p>
                  </div>
                  <div>
                    <h4 className="text-gray-500 mb-2">Pagamento</h4>
                    <p>Até 12x no cartão ou PIX</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
