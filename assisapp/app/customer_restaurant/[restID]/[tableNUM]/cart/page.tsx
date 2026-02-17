"use client";

import { useCart } from "@/contexts/cartcontext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const router = useRouter();   // ✅ ADD THIS

    // 🔥 ===== ADD: Coupon State =====
  const [selectedCoupon, setSelectedCoupon] = useState<number | null>(null);
  const [showCouponModal, setShowCouponModal] = useState(false);
  // 🔥 ===== END ADD =====

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = subtotal * 0.1;
  const delivery = 30;

 // 🔥 ===== MODIFY: Discount Logic =====
  const couponDiscount = selectedCoupon
    ? (subtotal * selectedCoupon) / 100
    : 0;

  const total = subtotal - couponDiscount + delivery;
  // 🔥 ===== END MODIFY =====

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-4 pt-25">

      <h1 className="text-xl font-bold mb-4">Table Cart</h1>

      <div className="space-y-3">
        {cart.map(item => (
          <div
            key={item._id}
            className="bg-white rounded-2xl p-3 flex gap-3 shadow-sm"
          >
            <img
              src={item.image}
              className="w-32 h-32 rounded-xl object-cover"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-red-600 font-bold">
                ${item.price}
              </p>
            </div>

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

      {/* 🔥 ===== ADD: Select Coupon Button ===== */}
      <button
        onClick={() => setShowCouponModal(true)}
        className="w-full bg-white border border-black py-3 rounded-xl mt-6"
      >
        🎟 Select Coupon
      </button>
      {/* 🔥 ===== END ADD ===== */}

      <div className="bg-white rounded-2xl p-4 mt-6 shadow-sm space-y-2">

        <div className="flex justify-between">
          <span>Discount</span>
          <span>฿{discount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>฿{delivery}</span>
        </div>

        <div className="border-t pt-2 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>฿{total.toFixed(2)}</span>
        </div>

      </div>

      {/* ✅ BUTTON FIXED */}
      <button
        onClick={() => router.push("/payment")}   // ✅ MAGIC LINE
        className="w-full bg-red-700 text-white py-3 rounded-full mt-6"
      >
        Proceed To Payment
      </button>

        {/* 🔥 ===== ADD: Coupon Modal ===== */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[320px]">

            <h2 className="text-lg font-bold mb-4">Your Coupons</h2>

            <div className="space-y-3">

              <button
                onClick={() => {
                  setSelectedCoupon(10);
                  setShowCouponModal(false);
                }}
                className="w-full bg-gray-100 py-3 rounded-xl"
              >
                🎉 10% OFF
              </button>

              <button
                onClick={() => {
                  setSelectedCoupon(15);
                  setShowCouponModal(false);
                }}
                className="w-full bg-gray-100 py-3 rounded-xl"
              >
                🎉 15% OFF
              </button>

            </div>

            <button
              onClick={() => setShowCouponModal(false)}
              className="mt-4 text-sm text-gray-500"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
      {/* 🔥 ===== END ADD ===== */}
    </div>
  );
}
