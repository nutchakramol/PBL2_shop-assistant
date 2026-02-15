import styles from "./special.module.css";
import Link from "next/link";

export default function SpecialServicesPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/discovery" className={styles.back}>‹</Link>
        <h1>⭐ Special services ⭐</h1>
      </header>

      <div className={styles.card}>
        <img src="/images/loyalty.png" alt="loyalty" />
        <div>
          <h3>Loyalty card</h3>
          <Link href="/special_services/loyalty" className={styles.btn}>
            details
          </Link>
        </div>
      </div>

      <div className={styles.card}>
        <img src="/images/voucher.png" alt="gift" />
        <div>
          <h3>Gift Voucher</h3>
          <Link href="/special_services/voucher" className={styles.btn}>
            details
          </Link>
        </div>
      </div>

      <div className={styles.card}>
        <img src="/images/promotion.png" alt="promo" />
        <div>
          <h3>Promotions</h3>
          <Link href="/special_services/promotion" className={styles.btn}>
            details
          </Link>
        </div>
      </div>
    </div>
  );
}
