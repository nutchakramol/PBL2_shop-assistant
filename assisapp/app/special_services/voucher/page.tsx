"use client";

import styles from "./GiftVoucher.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

const gifts = [
  { id: "gift1", price: 200 },
  { id: "gift2", price: 300 },
  { id: "gift3", price: 500 },
  { id: "gift4", price: 1000 },
];

export default function GiftVoucherPage() {
  const userId = "PUT_USER_ID_HERE";
  const [points, setPoints] = useState(0);

  function loadUser() {
    fetch(`/api/user/me?userId=${userId}`)
      .then(res => res.json())
      .then(data => setPoints(data.points ?? 0));
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function buyGift(giftId: string) {
    await fetch("/api/voucher/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, gift: giftId }),
    });

    loadUser();
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/special_services" className={styles.back}>‹</Link>
        <h1>⭐ Gift Voucher ⭐</h1>
      </header>

      <p>Points: {points}</p>

      {gifts.map(g => (
        <div className={styles.card} key={g.id}>
          <img src={`/images/voucher/${g.id}.png`} />
          <div>
            <h3>{g.price}฿</h3>
            <button onClick={() => buyGift(g.id)}>buy</button>
          </div>
        </div>
      ))}
    </div>
  );
}
