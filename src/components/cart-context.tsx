"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  checkoutUrl?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: { id: string; name: string; price: string | number; image?: string; checkoutUrl?: string }) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

    // Function to parse price string to number
    const parsePrice = (price: string | number): number => {
      if (typeof price === "number") return price;
      
      // Remove currency symbol and whitespace
      let clean = price.replace(/R\$\s?/, "").trim();
      
      // Handle Brazilian format: 1.200,00 or 1.200
      // If it has a comma, it's likely the decimal separator
      if (clean.includes(",")) {
        // Remove thousands dots and replace decimal comma with dot
        return parseFloat(clean.replace(/\./g, "").replace(",", "."));
      }
      
      // If it has no comma but has a dot, we need to decide if it's thousands or decimal
      if (clean.includes(".")) {
        const parts = clean.split(".");
        // If the last part has 3 digits, it's very likely a thousands separator (e.g., 1.200)
        if (parts[parts.length - 1].length === 3 && parts.length > 1) {
          return parseFloat(clean.replace(/\./g, ""));
        }
      }

      // Fallback to standard parsing
      const numericOnly = clean.replace(/[^\d.,]/g, "");
      if (numericOnly.includes(",") && numericOnly.includes(".")) {
        return parseFloat(numericOnly.replace(/\./g, "").replace(",", "."));
      } else if (numericOnly.includes(",")) {
        return parseFloat(numericOnly.replace(",", "."));
      }
      
      return parseFloat(numericOnly) || 0;
    };

  useEffect(() => {
    const savedCart = localStorage.getItem("survival-energy-cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("survival-energy-cart", JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addToCart = (product: { id: string; name: string; price: string | number; image?: string; checkoutUrl?: string }) => {
    setItems((prev) => {
      // Check if product with same ID already exists
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      const price = parsePrice(product.price);
      
      if (existingIndex > -1) {
        const newItems = [...prev];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1
        };
        return newItems;
      }

      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price, 
        quantity: 1, 
        image: product.image,
        checkoutUrl: product.checkoutUrl
      }];
    });
    setIsDrawerOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) => 
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      updateQuantity, 
      removeItem, 
      clearCart, 
      cartCount, 
      subtotal,
      isDrawerOpen,
      setIsDrawerOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
