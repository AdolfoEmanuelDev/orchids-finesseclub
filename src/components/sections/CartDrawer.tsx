"use client";

import React, { useEffect } from "react";
import { X, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart-context";

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
  
      // Yampi Multi-product checkout format:
      // seguro.seudominio.com.br/r/TOKEN1:QUANTITY1,TOKEN2:QUANTITY2
      
      try {
        const baseUrl = "https://seguro.finesseclub.com.br/r/";
        
        // Group by token to avoid duplicates in the URL if different products share the same token
        const tokenMap = new Map<string, number>();
        
        items.forEach(item => {
          if (item.checkoutUrl) {
            // Extract token from URL (e.g., https://.../r/TOKEN)
            const parts = item.checkoutUrl.split("/r/");
            if (parts.length > 1) {
              const token = parts[1].split(/[?#]/)[0]; // Remove any query params or hashes
              if (token) {
                tokenMap.set(token, (tokenMap.get(token) || 0) + item.quantity);
              }
            }
          }
        });

        if (tokenMap.size === 0) {
          console.error("No valid checkout tokens found");
          return;
        }

        // Construct the token string: TOKEN1:QTY1,TOKEN2:QTY2
        const tokenString = Array.from(tokenMap.entries())
          .map(([token, qty]) => `${token}:${qty}`)
          .join(",");

        const finalUrl = `${baseUrl}${tokenString}`;

        window.parent.postMessage({ 
          type: "OPEN_EXTERNAL_URL", 
          data: { url: finalUrl } 
        }, "*");
      } catch (error) {
        console.error("Error during checkout redirection:", error);
      }
    };

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Content */}
      <div className="relative w-full max-w-[400px] bg-black border-l border-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-white" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">
              Seu Carrinho ({cartCount})
            </h2>
          </div>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="p-1 hover:opacity-70 transition-opacity"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <span className="text-gray-500 text-xs uppercase tracking-widest">
                Seu carrinho está vazio
              </span>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="btn-luxury w-auto px-8"
              >
                Voltar às compras
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                {/* Product Thumbnail */}
                <div className="w-24 aspect-[3/4] bg-muted flex items-center justify-center overflow-hidden border border-white/10">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] text-muted-foreground text-center px-1 uppercase leading-tight font-bold">
                      Imagem indisponível
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-product-name text-white leading-tight pr-4">
                        {item.name}
                      </h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-price text-white block mt-1">
                      R$ {item.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border border-white">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 hover:bg-white hover:text-black transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-bold text-white border-x border-white py-1 min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 hover:bg-white hover:text-black transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Subtotal
              </span>
              <span className="text-sm font-bold text-white">
                R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>
            
            <div className="flex flex-col gap-2">
              <button 
                onClick={handleCheckout}
                className="bg-white text-black text-xs font-bold uppercase tracking-widest w-full py-4 border border-white hover:bg-black hover:text-white transition-all"
              >
                Finalizar Compra
              </button>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="btn-luxury py-4 border-white/20 hover:border-white"
              >
                Continuar Comprando
              </button>
            </div>

            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-tighter opacity-60">
              Taxas e frete calculados no checkout
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        
        @keyframes slide-in-from-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        .animate-in {
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}
