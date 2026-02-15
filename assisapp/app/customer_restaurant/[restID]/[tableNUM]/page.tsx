"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RestaurantPage() {
  const params = useParams();
  const router = useRouter();

  // ✅ MUST match folder names
  const restID = params.restID as string;
  const tableNUM = params.tableNUM as string;

  const [menus, setMenus] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  const cartKey = `cart_${restID}_${tableNUM}`;

  // ✅ Fetch Menu
  useEffect(() => {
    if (!restID) return;

    fetch(`/api/menu/${restID}`)
      .then(res => res.json())
      .then(data => setMenus(data));
  }, [restID]);

  // ✅ Load Cart
  useEffect(() => {
    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) setCart(JSON.parse(storedCart));
  }, [cartKey]); // ✅ important fix

  // ✅ Save Cart
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey]);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id);

      if (existing) {
        return prev.map(i =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="p-4 pb-24">

      {/* ✅ Table Number */}
      <h1 className="text-xl font-bold mb-4">
        Table {tableNUM}
      </h1>

      {/* ✅ Menu Grid */}
      <div className="grid grid-cols-2 gap-3">
        {menus.map(item => (
          <div key={item._id} className="bg-white rounded-xl shadow p-2">
            <img
              src={item.image}
              className="w-full h-32 object-cover rounded-lg"
            />

            <h3 className="font-semibold mt-2">{item.name}</h3>

            <div className="flex justify-between mt-2">
              <span>${item.price}</span>

              <button
                onClick={() => addToCart(item)}
                className="bg-black text-white px-3 rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Floating Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={() =>
            router.push(`/customer_restaurant/${restID}/${tableNUM}/cart`)
          }
          className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 rounded-full shadow-lg"
        >
          Cart ({totalItems})
        </button>
      )}
    </div>
  );
}
