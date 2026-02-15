"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const params = useParams();

  const restaurantId = params.restaurantId as string;
  const tableNumber = params.tableNumber as string;

  const cartKey = `cart_${restaurantId}_${tableNumber}`;

  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Table {tableNumber} Cart
      </h1>

      <div>Subtotal: ${subtotal}</div>
    </div>
  );
}
