"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

//////////////////////////
// Types
//////////////////////////

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  restaurantId: string; // prevent mixing restaurants
};

export type CartItem = MenuItem & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  restaurantId: string | null;
  addToCart: (item: MenuItem) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
};

//////////////////////////
// Create Context
//////////////////////////

const CartContext = createContext<CartContextType | undefined>(undefined);

//////////////////////////
// Provider
//////////////////////////

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  //////////////////////////
  // Load from localStorage
  //////////////////////////
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedRestaurant = localStorage.getItem("cart_restaurant");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    if (savedRestaurant) {
      setRestaurantId(savedRestaurant);
    }
  }, []);

  //////////////////////////
  // Save to localStorage
  //////////////////////////
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (restaurantId) {
      localStorage.setItem("cart_restaurant", restaurantId);
    }
  }, [restaurantId]);

  //////////////////////////
  // Add to Cart
  //////////////////////////
  const addToCart = (item: MenuItem) => {
    // Prevent mixing restaurants
    if (restaurantId && restaurantId !== item.restaurantId) {
      const confirmClear = confirm(
        "Your cart contains items from another restaurant. Clear cart?"
      );

      if (!confirmClear) return;

      setCart([]);
    }

    setRestaurantId(item.restaurantId);

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  //////////////////////////
  // Increase Quantity
  //////////////////////////
  const increaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  //////////////////////////
  // Decrease Quantity
  //////////////////////////
  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  //////////////////////////
  // Remove Item
  //////////////////////////
  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  //////////////////////////
  // Clear Cart
  //////////////////////////
  const clearCart = () => {
    setCart([]);
    setRestaurantId(null);
    localStorage.removeItem("cart");
    localStorage.removeItem("cart_restaurant");
  };

  //////////////////////////
  // Total Price
  //////////////////////////
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        restaurantId,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

//////////////////////////
// Hook
//////////////////////////

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
