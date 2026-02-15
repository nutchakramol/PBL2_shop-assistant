"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemName: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
    const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.name === item.name);
      if (existingItem) {
        return prevCart.map((i) =>
            i.name === item.name
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prevCart, item];
      }
    });
    };

    const removeFromCart = (itemName: string) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item.name !== itemName)
        );
    }
    
    const clearCart = () => {
        setCart([]);
    };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
        const context = useContext(CartContext);
        if (context === undefined) {
            throw new Error("useCart must be used within a CartProvider");
        }
        return context;
    };