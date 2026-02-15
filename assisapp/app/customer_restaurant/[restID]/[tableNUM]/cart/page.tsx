"use client";

import { useCart } from "@/contexts/cartcontext";

export default function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = subtotal * 0.1; // example
  const delivery = 30;

  const total = subtotal - discount + delivery;

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-4">

      <h1 className="text-xl font-bold mb-4">Table Cart</h1>

      {/* ✅ ITEMS */}
      <div className="space-y-3">
        {cart.map(item => (
          <div
            key={item._id}
            className="bg-white rounded-2xl p-3 flex gap-3 shadow-sm"
          >
            <img
              src={item.image}
              className="w-16 h-16 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-red-600 font-bold">
                ${item.price}
              </p>
            </div>

            {/* ✅ QTY CONTROL */}
            <div className="flex items-center gap-2">

              <button
                onClick={() => decreaseQty(item._id)}
                className="w-7 h-7 rounded bg-gray-200"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => increaseQty(item._id)}
                className="w-7 h-7 rounded bg-yellow-400"
              >
                +
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* ✅ SUMMARY */}
      <div className="bg-white rounded-2xl p-4 mt-6 shadow-sm space-y-2">

        <div className="flex justify-between">
          <span>Discount</span>
          <span>${discount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>${delivery}</span>
        </div>

        <div className="border-t pt-2 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

      </div>

      {/* ✅ BUTTON */}
      <button className="w-full bg-red-700 text-white py-3 rounded-full mt-6">
        Proceed To Payment
      </button>

    </div>
  );
}
