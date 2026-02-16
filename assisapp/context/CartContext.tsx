"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/* ✅ SINGLE SOURCE OF TRUTH */
export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  restaurant_id: string; 
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  increaseQty: (_id: string) => void;
  decreaseQty: (_id: string) => void;
  removeFromCart: (_id: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  /* ✅ ADD ITEM */
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart(prev => {
      const existing = prev.find(p => p._id === item._id);

      if (existing) {
        return prev.map(p =>
          p._id === item._id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  /* ✅ INCREASE */
  const increaseQty = (_id: string) => {
    setCart(prev =>
      prev.map(p =>
        p._id === _id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  /* ✅ DECREASE */
  const decreaseQty = (_id: string) => {
    setCart(prev =>
      prev
        .map(p =>
          p._id === _id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter(p => p.quantity > 0)
    );
  };

  /* ✅ REMOVE */
  const removeFromCart = (_id: string) => {
    setCart(prev => prev.filter(p => p._id !== _id));
  };

  /* ✅ CLEAR */
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ✅ HOOK */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be inside CartProvider");
  return context;
}
