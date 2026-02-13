"use client";

import { useContext } from "react";
import { CartContext } from "@/contexts/cartcontext";

export default function CartContent() {
  const cartContext = useContext(CartContext);  
  
  if (!cartContext) return null;

  const { cart } = cartContext;
console.log("Cart from context:", cart);


  return (
    <div className="w-full space-y-2">
      {cart.map((p, i) => (
        <p key={i}>
          - {p.name} x{p.quantity} : ฿{p.price}
        </p>
      ))}
    </div>
  );
}
