"use client";

import { useEffect, useState } from "react";
import generatePayload from "promptpay-qr";
import QRCode from "qrcode";

import CartContent from "./cartcontent";
import { useCart } from "@/contexts/cartcontext";

export default function PaymentPage() {

  const [qr, setQr] = useState("");
  const [user, setUser] = useState(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { cart } = useCart();

  const phoneNumber = "0886416734";

  const amount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Check Login
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Generate QR
  useEffect(() => {
    if (amount === 0) {
      setQr("");
      return;
    }

    const payload = generatePayload(phoneNumber, { amount });

    QRCode.toDataURL(payload)
      .then((url) => setQr(url))
      .catch((err) => console.error(err));

  }, [amount]);

  // ✅ Submit Review
  const submitReview = async () => {

    if (!user) {
      alert("Please login first");
      return;
    }

    const res = await fetch("/api/review", {
      method: "POST",
      body: JSON.stringify({
        user_id: user._id,
        restaurant_id: cart[0]?.restaurant_id,  // ✅ assuming cart has this
        order_id: null,
        rating,
        comment
      })
    });

    const data = await res.json();

    if (data.error) {
      alert("Failed to save review");
      return;
    }

    alert("Review submitted 🎉");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black gap-10 px-6">

      {/* QR */}
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">PromptPay QR</h2>

        {qr ? (
          <img src={qr} className="w-64 h-64" />
        ) : (
          <p>No items in cart</p>
        )}

        <p className="mt-4 text-gray-600">
          Amount: ฿{amount.toFixed(2)}
        </p>
      </div>

      {/* Ordered */}
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-96">
        <h3 className="text-lg font-semibold mb-4">Ordered</h3>
        <CartContent />

        {/* ✅ REVIEW SECTION */}
        <div className="w-full mt-6 border-t pt-4">

          <h3 className="font-bold mb-2">Write Review</h3>

          {user ? (
            <>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full border p-2 rounded mb-2"
              >
                <option value={5}>⭐⭐⭐⭐⭐</option>
                <option value={4}>⭐⭐⭐⭐</option>
                <option value={3}>⭐⭐⭐</option>
                <option value={2}>⭐⭐</option>
                <option value={1}>⭐</option>
              </select>

              <textarea
                placeholder="Comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border p-2 rounded mb-2"
              />

              <button
                onClick={submitReview}
                className="w-full bg-black text-white py-2 rounded"
              >
                Submit Review
              </button>
            </>
          ) : (
            <p className="text-red-500">
              Login to write a review
            </p>
          )}

        </div>

      </div>

    </div>
  );
}
