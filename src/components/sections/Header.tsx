"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { motion, useScroll } from "framer-motion";

const Header = () => {
  // Header component with black background
  const { cartCount, setIsDrawerOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-black ${
        isScrolled ? "py-2 border-b border-white/5" : "py-4"
      }`}
    >
      <div className="container px-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link 
          href="/"
          className="block hover:opacity-80 transition-all duration-300 focus:outline-none"
        >
          <motion.div 
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            className="flex items-center px-[12px] py-[4px]"
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/e0354d74-faf5-4977-8775-aa3ee0f7ed6c-survclothes-psqcipms-manus-space/assets/images/logo-fc-1.png"
              alt="FC"
              width={106}
              height={88}
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>
        </Link>

        {/* Navigation Section */}
        <nav className="flex items-center gap-8">
          <Link 
            href="/termos"
            className="text-white font-sans text-[10px] font-bold uppercase tracking-[0.2em] hover:text-gray-400 transition-colors focus:outline-none"
          >
            TERMOS
          </Link>
          
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 text-white hover:text-gray-400 transition-all duration-300 focus:outline-none group"
            type="button"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={2} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-white text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </div>
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
              CARRINHO
            </span>
          </button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
