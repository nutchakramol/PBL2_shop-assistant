"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [ownerName, setOwnerName] = useState("");
  const [restaurantLocation, setRestaurantLocation] = useState("");
  const [tableCount, setTableCount] = useState(1);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/register-restaurant", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        ownerName,
        restaurantLocation,
        tableCount,
        }),
    });

    const data = await res.json();

    if (res.ok) {
      router.replace("/home");  // go to home page
    } else {
        alert(data.message);
    }
    }

  return (
    <div className="min-h-screen bg-[#b92c24] flex flex-col">

      {/* Header */}
      <div className="bg-[#efe5da] h-14 flex items-center justify-center font-semibold text-red-600">
        Register Restaurant
      </div>

      {/* Form Card */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-[#efe5da] w-full max-w-md rounded-2xl p-8 shadow-lg">

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label htmlFor="ownerName" className="block mb-2 text-sm font-bold">
                Owner Name & Surname
              </label>
              <input
                id="ownerName"
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full bg-gray-300 rounded-full px-4 py-2 outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block mb-2 text-sm font-bold">
                Restaurant Location
              </label>
              <input
                id="location"
                type="text"
                value={restaurantLocation}
                onChange={(e) =>
                  setRestaurantLocation(e.target.value)
                }
                className="w-full bg-gray-300 rounded-full px-4 py-2 outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="tables" className="block mb-2 text-sm font-bold">
                Number of Tables
              </label>
              <input
                id="tables"
                type="number"
                min={1}
                value={tableCount}
                onChange={(e) =>
                  setTableCount(Number(e.target.value))
                }
                className="w-full bg-gray-300 rounded-full px-4 py-2 outline-none"
                required
              />
            </div>

            <div className="text-center font-bold">
              <button
                type="submit"
                className="bg-[#2e2d63] text-white px-8 py-2 rounded-full"
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
