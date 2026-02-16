"use client";

import styles from "./Loyalty.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoyaltyPage() {
  const userId = "PUT_USER_ID_HERE"; // ❗ ใส่ userId จากระบบ login
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (!userId) return;

    fetch(`/api/user/me?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setPoints(data.points ?? 0);
      })
      .catch(console.error);
  }, [userId]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/special_services" className={styles.back}>‹</Link>
        <h1>⭐ Loyalty Card ⭐</h1>
      </header>

      <div className={styles.card}>
        <img src="/images/loyalty/loyalty1.png" />
        <div>
          <h3>Member Card</h3>
          <p>Points: <b>{points}</b></p>
        </div>
      </div>

      <button className={styles.home}>Back to home</button>
    </div>
  );
}
