"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MenuItem = {
  _id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  is_available: boolean;
};

export default function MenuPage() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const router = useRouter();

  useEffect(() => {
    async function fetchMenus() {
      const email = localStorage.getItem("user_email");

      const resProfile = await fetch(
        `/api/check-restaurant?email=${email}`
      );

      const profileData = await resProfile.json();

      if (!profileData.registered) {
        setLoading(false);
        return;
      }

      const restaurant_id = profileData.restaurant_id;

      const res = await fetch(
        `/api/menu?restaurant_id=${restaurant_id}`
      );

      const data = await res.json();

      setMenus(data);
      setLoading(false);
    }

    fetchMenus();
  }, []);

  // 🔹 Group by category
  const categories = [
    "All",
    ...Array.from(new Set(menus.map((m) => m.category))),
  ];

  const filteredMenus =
    selectedCategory === "All"
      ? menus
      : menus.filter((m) => m.category === selectedCategory);


  async function toggleAvailability(id: string, current: boolean) {
    await fetch(`/api/menu/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_available: !current }),
    });

    setMenus((prev) =>
      prev.map((m) =>
        m._id === id ? { ...m, is_available: !current } : m
      )
    );
  }

  return (
    <div className="min-h-screen bg-[#b92c24] flex flex-col">

      {/* Header */}
      <div className="bg-[#efe5da] h-14 flex items-center px-4 justify-between">
        <button
          onClick={() => router.push("/home")}
          className="font-bold text-sm font-medium hover:font-semibold"
        >
          ← Back
        </button>

        <div className="font-semibold text-red-600">
          Menu Management
        </div>

        <div className="w-12" /> {/* spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6">

        {loading ? (
          <div className="text-white text-center">
            Loading...
          </div>
        ) : menus.length === 0 ? (
          <div className="text-white text-center">
            No menu items yet.
          </div>
        ) : (
          <>
      {/* Category Pills */}
      <div className="flex gap-3 overflow-x-auto mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
              selectedCategory === cat
                ? "bg-red-600 text-white"
                : "bg-[#efe5da] text-black hover:bg-red-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu List */}
      <div className="space-y-6">
        {filteredMenus.map((item: MenuItem) => (
          <div
            key={item._id}
            className="bg-[#efe5da] rounded-2xl p-4 shadow-lg flex gap-4 items-center"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-xl"
              />
            )}

            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {item.name}
              </h3>
              <p className="text-gray-500 text-sm">
                {item.category}
              </p>
              <p className="text-red-600 font-semibold mt-1">
                ฿{item.price}
              </p>
            </div>

            <button
              onClick={() =>
                toggleAvailability(item._id, item.is_available)
              }
              className={`px-4 py-1 rounded-full text-white ${
                item.is_available
                  ? "bg-green-600"
                  : "bg-gray-500"
              }`}
            >
              {item.is_available
                ? "Available"
                : "Not Available"}
            </button>
          </div>
        ))}
      </div>
    </>

        )}
      </div>

      {/* Floating Add Button */}
      <Link href="/add-menu">
        <div className="fixed bottom-8 right-8 group">
          <div className="w-14 h-14 bg-[#2e2d63] text-white rounded-full flex items-center justify-center text-3xl shadow-lg cursor-pointer hover:opacity-90">
            +
          </div>

          <div className="absolute right-16 top-3 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Add Menu
          </div>
        </div>
      </Link>

    </div>
  );
}
