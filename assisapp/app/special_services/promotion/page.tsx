"use client";

import { useEffect, useState } from "react";
import {
  discountCoupons,
  freeCoupons,
  dealCoupons,
} from "@/lib/systemCoupon";

export default function CouponsPage() {
  const [myCoupons, setMyCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ โหลดคูปองของ user
  const fetchMyCoupons = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch("/api/coupon/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setMyCoupons(data.coupons || []);
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCoupons();
  }, []);

  // ✅ กด Collect
  const handleCollect = async (code: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const res = await fetch("/api/coupon/collect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Collected successfully");
      fetchMyCoupons(); // refresh count
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  // ✅ จำนวนที่มี
  const getCount = (code: string) => {
    const found = myCoupons.find((c) => c.code === code);
    return found ? found.count : 0;
  };

  // ✅ เช็ค cooldown (5 ชม)
  const getCooldown = (code: string) => {
    const found = myCoupons.find((c) => c.code === code);

    if (!found || !found.nextAvailableAt) return null;

    const now = new Date().getTime();
    const next = new Date(found.nextAvailableAt).getTime();

    if (next <= now) return null;

    const diffMs = next - now;
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));

    return diffHours;
  };

  // ✅ render list
  const renderCoupons = (list: any[]) =>
    list.map((coupon) => {
      const count = getCount(coupon.code);
      const cooldown = getCooldown(coupon.code);

      return (
        <div
          key={coupon.code}
          className="bg-white rounded-2xl shadow-md p-5 mb-6 flex flex-col md:flex-row gap-4 items-center"
        >
          <img
            src={coupon.img}
            alt={coupon.code}
            className="w-28 h-28 object-contain"
          />

          <div className="flex-1">
            <p className="text-lg font-semibold mb-2">
              {coupon.desc}
            </p>

            <p className="mb-1">
              🧾 You have:{" "}
              <span className="font-bold text-pink-600">
                {count}
              </span>
            </p>

            {cooldown && (
              <p className="text-red-500 mb-2">
                ⏳ Available in {cooldown} hour(s)
              </p>
            )}

            <button
              onClick={() => handleCollect(coupon.code)}
              disabled={!!cooldown}
              className={`px-4 py-2 rounded-lg text-white transition ${
                cooldown
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600"
              }`}
            >
              Collect
            </button>
          </div>
        </div>
      );
    });

  if (loading) {
    return (
      <div className="pt-28 text-center">
        Loading coupons...
      </div>
    );
  }

  return (
    <div className="pt-28 px-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">
        🎟 My Promotions
      </h1>

      <h2 className="text-xl font-bold mb-4">
        🔥 Discount 10%
      </h2>
      {renderCoupons(discountCoupons)}

      <h2 className="text-xl font-bold mb-4 mt-10">
        🚚 Free Delivery
      </h2>
      {renderCoupons(freeCoupons)}

      <h2 className="text-xl font-bold mb-4 mt-10">
        💰 Discount 15%
      </h2>
      {renderCoupons(dealCoupons)}
    </div>
  );
}
