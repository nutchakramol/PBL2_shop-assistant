"use client";

import { useEffect, useState } from "react";
import {
  discountCoupons,
  freeCoupons,
  dealCoupons,
} from "@/lib/systemCoupon";

const userId = "PUT_USER_ID_HERE";

function CouponCard({ coupon }: any) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 10 }}>
      <img src={coupon.img} width={120} />
      <p>{coupon.desc}</p>
      <button
        onClick={async () => {
          const res = await fetch("/api/coupon/collect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              code: coupon.code,
            }),
          });

          const data = await res.json();
          alert(data.message);
        }}
      >
        couponcollect
      </button>
    </div>
  );
}

export default function CouponsPage() {
  return (
    <div style={{ padding: 20 }}>
      <h2>🔥discount</h2>
      {discountCoupons.map((c) => (
        <CouponCard key={c.code} coupon={c} />
      ))}

      <h2>🚚 free delivery</h2>
      {freeCoupons.map((c) => (
        <CouponCard key={c.code} coupon={c} />
      ))}

      <h2>💰 Special deal</h2>
      {dealCoupons.map((c) => (
        <CouponCard key={c.code} coupon={c} />
      ))}
    </div>
  );
}