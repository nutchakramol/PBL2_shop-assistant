// app/discovery/page.tsx
import Link from "next/link";
import MenuSlider from "@/component/menubar"; // สมมติของเพื่อน

export default function Page() {
  return (
    <div>
      <MenuSlider />

      <Link href="/special_services">
        <div className="special-service-card">
          <h3>⭐ Special Services</h3>
        </div>
      </Link>
    </div>
  );
}

