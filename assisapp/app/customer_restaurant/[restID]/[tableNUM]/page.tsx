"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/cartcontext";

export default function RestaurantPage() {
  const params = useParams();
  const router = useRouter();

  const restID = params.restID as string;
  const tableNUM = params.tableNUM as string;

  const { cart, addToCart } = useCart();   // ✅ GLOBAL CART

  const [restaurant, setRestaurant] = useState<any>(null);
  const [menus, setMenus] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  /* ✅ Fetch Restaurant */
  useEffect(() => {
    fetch(`/api/restaurants/${restID}`)
      .then(res => res.json())
      .then(data => setRestaurant(data));
  }, [restID]);

  /* ✅ Fetch Menu */
  useEffect(() => {
    if (!restID) return;

    fetch(`/api/menu/${restID}`)
      .then(res => res.json())
      .then(data => setMenus(data));
  }, [restID]);

  /* ✅ Fetch Reviews */
  useEffect(() => {
    if (!restID) return;

    fetch(`/api/review/${restID}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [restID]);

  /* ✅ Cart Count */
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  /* ✅ Categories */
  const categories = [
    "All",
    ...Array.from(new Set(menus.map(item => item.category)))
  ];

  /* ✅ Featured (Always full menu) */
  const featuredItems = menus.slice(0, 2);

  /* ✅ Filter ONLY Menu Section */
  const filteredMenus =
    selectedCategory === "All"
      ? menus
      : menus.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-24 pt-16">

      {/* ✅ Header */}
      <div className="p-4">
        <h1 className="text-xl font-bold">
          {restaurant?.name || "Restaurant"}
        </h1>

        <p className="text-sm text-gray-500">
          Table {tableNUM}
        </p>
      </div>

      {/* ✅ Featured Items */}
      <div className="px-4 flex gap-4 overflow-x-auto pb-2">
        {featuredItems.map(item => (
          <div
            key={item._id}
            className="min-w-[260px] bg-white rounded-2xl shadow-sm p-4"
          >
            <img
              src={item.image}
              className="w-full h-36 object-cover rounded-xl"
            />

            <h3 className="font-semibold mt-2">
              {item.name}
            </h3>

            <div className="flex justify-between items-center mt-1">
              <span className="text-red-600 font-bold">
                ${item.price}
              </span>

              <button
                onClick={() => addToCart(item)}   // ✅ GLOBAL CART
                className="bg-black text-white w-7 h-7 rounded-full"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Category Bar */}
      <div className="px-4 flex gap-2 overflow-x-auto pb-2 mt-3">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-white shadow-sm"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ✅ Menu Title */}
      <div className="px-4 mt-4">
        <h2 className="text-lg font-bold">Menu</h2>
      </div>

      {/* ✅ Menu List */}
      <div className="p-4 space-y-3">
        {filteredMenus.map(item => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-sm p-3 flex gap-3"
          >
            <img
              src={item.image}
              className="w-20 h-20 object-cover rounded-xl"
            />

            <div className="flex-1">
              <h3 className="font-semibold">
                {item.name}
              </h3>

              <p className="text-sm text-gray-400">
                {item.category}
              </p>

              <span className="text-red-600 font-bold">
                ${item.price}
              </span>
            </div>

            <button
              onClick={() => addToCart(item)}   // ✅ GLOBAL CART
              className="bg-black text-white w-8 h-8 rounded-full"
            >
              +
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Reviews Section */}
      <div className="px-4 mt-6">

        <h2 className="text-lg font-bold mb-3">
          Customer Reviews
        </h2>

        <div className="flex gap-3 overflow-x-auto pb-2">

          {reviews.length === 0 && (
            <div className="text-gray-400 text-sm">
              No reviews yet
            </div>
          )}

          {reviews.map(review => (
            <div
              key={review._id}
              className="min-w-[220px] bg-white rounded-2xl shadow-sm p-3"
            >
              <div className="text-yellow-500 font-bold">
                ⭐ {review.rating}
              </div>

              <p className="text-sm text-gray-600 mt-2">
                {review.comment || "No comment"}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* ✅ Floating Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={() =>
            router.push(`/customer_restaurant/${restID}/${tableNUM}/cart`)
          }
          className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-full shadow-lg"
        >
          Cart ({totalItems})
        </button>
      )}
    </div>
  );
}
