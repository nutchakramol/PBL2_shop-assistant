"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMenuPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    category: "Curry",
    price: "",
    image: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const email = localStorage.getItem("user_email");

    const resProfile = await fetch(
      `/api/check-restaurant?email=${email}`
    );

    const profileData = await resProfile.json();

    if (!profileData.registered) {
      alert("Restaurant not registered");
      return;
    }

    const restaurant_id = profileData.restaurant_id;

    const res = await fetch("/api/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restaurant_id,
        name: form.name,
        category: form.category,
        price: Number(form.price),
        image: form.image,
      }),
    });

    if (res.ok) {
      router.push("/menu");
    } else {
      const data = await res.json();
      alert(data.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#b92c24] flex flex-col">

      {/* Header */}
      <div className="bg-[#efe5da] h-14 flex items-center px-4 justify-between">
        <button
          onClick={() => router.push("/menu")}
          className="font-bold text-sm font-medium hover:font-semibold"
        >
          ← Back
        </button>

        <div className="font-semibold text-red-600">
          Add menu
        </div>

        <div className="w-12" /> {/* spacer */}
      </div>

      {/* Form Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-[#efe5da] w-full max-w-md rounded-2xl p-8 shadow-lg">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Food Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full bg-gray-300 rounded-full px-4 py-2 outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block mb-2 text-sm">
                Category
              </label>
              <select
                id="category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full bg-gray-300 rounded-full px-4 py-2 outline-none"
              >
                <option value="Curry">Curry</option>
                <option value="Noodle">Noodle</option>
                <option value="Drinks">Drinks</option>
                <option value="Rice">Rice</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block mb-2 text-sm">
                Price
              </label>
              <input
                id="price"
                type="number"
                required
                min="0"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                className="w-full bg-gray-300 rounded-full px-4 py-2 outline-none"
              />
            </div>

            {/* Image URL (Optional) */}
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Image URL (optional)
              </label>
              <input
                id="image"
                type="text"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
                className="w-full bg-gray-300 rounded-full px-4 py-2 outline-none"
              />
            </div>

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-[#2e2d63] text-white px-8 py-2 rounded-full hover:opacity-90"
              >
                Save
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
