"use client";

import React, { useEffect } from "react";
import { X, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart-context";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    subtotal, 
    isDrawerOpen, 
    setIsDrawerOpen,
    cartCount 
  } = useCart();

  // Lock scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isDrawerOpen]);

  const handleCheckout = () => {
    if (items.length === 0) return;

    try {
      const baseUrl = "https://seguro.finesseclub.com.br/r/";
      const tokenMap = new Map<string, number>();
      
      items.forEach(item => {
        if (item.checkoutUrl) {
          const parts = item.checkoutUrl.split("/r/");
          if (parts.length > 1) {
            const token = parts[1].split(/[?#]/)[0];
            if (token) {
              tokenMap.set(token, (tokenMap.get(token) || 0) + item.quantity);
            }
          }
        }
      });

      if (tokenMap.size === 0) return;

      const tokenString = Array.from(tokenMap.entries())
        .map(([token, qty]) => `${token}:${qty}`)
        .join(",");

      const finalUrl = `${baseUrl}${tokenString}`;

      if (typeof window !== "undefined") {
        const isOrchids = window.location.hostname.includes("orchids") || 
                         window.location.hostname.includes("localhost");

        if (isOrchids && window.self !== window.top) {
          window.parent.postMessage({ 
            type: "OPEN_EXTERNAL_URL", 
            data: { url: finalUrl } 
          }, "*");
        } else {
          window.location.href = finalUrl;
        }
      }
    } catch (error) {
      console.error("Error during checkout redirection:", error);
    }
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[420px] bg-black border-l border-white/10 h-full flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-white" strokeWidth={1.5} />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                  CARRINHO ({cartCount})
                </h2>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors group"
              >
                <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              {items.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center space-y-6"
                >
                  <ShoppingCart className="w-12 h-12 text-white/10" strokeWidth={1} />
                  <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">
                    Seu carrinho está vazio
                  </span>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="border border-white/20 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
                  >
                    Voltar às compras
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {items.map((item, idx) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-6 group"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 aspect-[3/4] bg-[#111] flex items-center justify-center overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <span className="text-[10px] text-muted-foreground text-center px-1 uppercase leading-tight font-bold">
                            N/A
                          </span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-[11px] font-bold uppercase tracking-wider text-white leading-relaxed pr-4">
                              {item.name}
                            </h3>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-gray-600 hover:text-white transition-colors"
                            >
                              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                          </div>
                          <span className="text-[12px] font-bold text-white/60 block mt-2">
                            R$ {item.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </span>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border border-white/20 hover:border-white/40 transition-colors">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="px-3 text-[10px] font-bold text-white border-x border-white/20 py-1.5 min-w-[32px] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Summary */}
            {items.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 border-t border-white/10 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Subtotal
                  </span>
                  <span className="text-[14px] font-bold text-white">
                    R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleCheckout}
                    className="bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] w-full py-5 border border-white hover:bg-black hover:text-white transition-all duration-300 active:scale-[0.98]"
                  >
                    Finalizar Compra
                  </button>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] py-2 transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>

                <p className="text-[9px] text-center text-gray-600 uppercase tracking-widest opacity-60">
                  Taxas e frete calculados no checkout
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

