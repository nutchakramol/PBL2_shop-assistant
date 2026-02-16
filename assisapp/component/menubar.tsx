"use client";

import { useState } from "react";
import { Heart, Star } from "lucide-react";

/* =======================
   DATA
======================= */
const baseMenus = [
  {
    name: "Sapporo Ramen",
    price: 1234.56,
    image: "/ramen1.png",
    rating: 4.6,
    reviews: [
      { user: "usermong username", text: "อร่อยมาก น้ำซุปเข้มข้น" },
      { user: "usermong username", text: "เส้นเหนียวนุ่ม ชอบมาก" },
    ],
  },
  {
    name: "Kagoshima Ramen",
    price: 1234.56,
    image: "/ramen2.png",
    rating: 4.3,
    reviews: [{ user: "usermong username", text: "หอมหมูมาก" }],
  },
];

/* duplicate to feel infinite */
const menus = Array.from({ length: 10 }).flatMap((_, i) =>
  baseMenus.map((m, index) => ({
    ...m,
    id: i * baseMenus.length + index,
  }))
);

/* =======================
   COMPONENT
======================= */
export default function MenuSlider() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [fav, setFav] = useState<number[]>([]);

  const toggleFav = (id: number) => {
    setFav((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full">
      <div
        className="
          flex gap-6 overflow-x-auto scroll-smooth px-6 py-4
          snap-x snap-mandatory
          scrollbar-hide
        "
      >
        {menus.map((menu) => (
          <div
            key={menu.id}
            onMouseEnter={() => setHovered(menu.id)}
            onMouseLeave={() => setHovered(null)}
            className="
              relative min-w-[260px] snap-start
              rounded-2xl bg-white shadow-lg p-4
              flex-shrink-0
            "
          >
            {/* Favorite */}
            <button
              onClick={() => toggleFav(menu.id)}
              className="absolute top-3 right-3 z-20"
            >
              <Heart
                className={`w-6 h-6 ${
                  fav.includes(menu.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400"
                }`}
              />
            </button>

            {/* Image */}
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full h-40 object-contain"
            />

            {/* Info */}
            <h3 className="font-semibold text-lg mt-2">{menu.name}</h3>
            <p className="text-red-600 font-bold">
              ${menu.price.toFixed(2)}
            </p>

            {/* Hover overlay */}
            {hovered === menu.id && (
              <div className="absolute inset-0 bg-gray-100 rounded-2xl p-4 z-10">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{menu.rating}</span>
                </div>

                <p className="font-semibold mb-1">Rating and reviews</p>

                <div className="space-y-2 text-base">
                  {menu.reviews.map((r, i) => (
                    <div key={i}>
                      <p className="font-medium">{r.user}</p>
                      <p className="text-gray-600">{r.text}</p>
                    </div>
                  ))}
                </div>

                <button className="mt-4 w-full bg-gray-300 rounded-xl py-2 text-base">
                  start review to get point
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
