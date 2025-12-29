"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart-context";

const Header = () => {
  const { cartCount, setIsDrawerOpen } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="container px-4 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link 
          href="/"
          className="block hover:opacity-80 transition-opacity focus:outline-none"
        >
          <div className="flex items-center">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/e0354d74-faf5-4977-8775-aa3ee0f7ed6c-survclothes-psqcipms-manus-space/assets/images/logo-fc-1.png"
              alt="FC"
              width={180}
              height={150}
              className="w-auto h-auto max-h-[120px] object-contain"
              priority
            />
          </div>
        </Link>

        {/* Navigation Section */}
        <nav className="flex items-center gap-8">
          <Link 
            href="/termos"
            className="text-white font-sans text-xs font-bold uppercase tracking-wider hover:text-gray-300 transition-colors focus:outline-none"
          >
            TERMOS
          </Link>
          
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors focus:outline-none"
            type="button"
          >
            <ShoppingCart className="w-4 h-4" strokeWidth={2} />
            <span className="font-sans text-xs font-bold uppercase tracking-wider">
              Carrinho ({cartCount})
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
