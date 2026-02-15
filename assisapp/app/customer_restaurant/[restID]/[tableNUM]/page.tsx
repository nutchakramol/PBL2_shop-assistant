"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RestaurantPage() {
  const params = useParams();
  const router = useRouter();

  const restID = params.restID as string;
  const tableNUM = params.tableNUM as string;

  const [restaurant, setRestaurant] = useState<any>(null);
  const [menus, setMenus] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const cartKey = `cart_${restID}_${tableNUM}`;

  // ✅ Fetch Restaurant
  useEffect(() => {
    fetch(`/api/restaurants/${restID}`)
      .then(res => res.json())
      .then(data => setRestaurant(data));
  }, [restID]);

  // ✅ Fetch Menu
  useEffect(() => {
    if (!restID) return;

    fetch(`/api/menu/${restID}`)
      .then(res => res.json())
      .then(data => setMenus(data));
  }, [restID]);

  // ✅ Load Cart
  useEffect(() => {
    const storedCart = localStorage.getItem(cartKey);
    if (storedCart) setCart(JSON.parse(storedCart));
  }, [cartKey]);

  // ✅ Save Cart
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey]);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id);

      if (existing) {
        return prev.map(i =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  // ✅ Categories from ALL menus
  const categories = [
    "All",
    ...Array.from(new Set(menus.map(item => item.category)))
  ];
  const [reviews, setReviews] = useState<any[]>([]);
  useEffect(() => {
  if (!restID) return;

  fetch(`/api/review/${restID}`)
    .then(res => res.json())
    .then(data => setReviews(data));
}, [restID]);

  // ✅ Featured ALWAYS from full menu
  const featuredItems = menus.slice(0, 2);

  // ✅ Filter ONLY Menu Section
  const filteredMenus =
    selectedCategory === "All"
      ? menus
      : menus.filter(item => item.category === selectedCategory);

  return (

<div className="min-h-screen bg-[#f7f7f7] pb-24 pt-15">

      {/* ✅ Header */}
      <div className="p-4">
        <h1 className="text-xl font-bold">
          {restaurant?.name || "Restaurant"}
        </h1>

        <p className="text-sm text-gray-500">
          Table {tableNUM}
        </p>
      </div>

      {/* ✅ Featured Items (NO FILTER) */}
      <div className="px-4 flex gap-3 overflow-x-auto pb-2">
        {featuredItems.map(item => (
          <div
            key={item._id}
            className="min-w-[260px] bg-white rounded-2xl shadow-sm p-4"
          >
            <img
              src={item.image}
              className="w-full h-36 object-cover rounded-xl"
            />

            <h3 className="font-semibold text-sm mt-2">
              {item.name}
            </h3>

            <div className="flex justify-between items-center mt-1">
              <span className="text-red-600 font-bold text-sm">
                ${item.price}
              </span>

              <button
                onClick={() => addToCart(item)}
                className="bg-black text-white w-6 h-6 rounded-full text-sm"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Category Bar */}
      <div className="px-12 flex gap-3 overflow-x-auto pb-2 mt-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-12 py-3 rounded-full text-sm whitespace-nowrap transition ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-white shadow-sm"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ✅ Section Title */}
      <div className="px-4 mt-4">
        <h2 className="text-lg font-bold">
          Menu
        </h2>
      </div>

      {/* ✅ Menu List (FILTERED) */}
      <div className="p-8 space-y-4">
        {filteredMenus.map(item => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-sm p-12 flex gap-4"
          >
            <img
              src={item.image}
              className="w-16 h-16 object-cover rounded-xl"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-sm">
                {item.name}
              </h3>

              <span className="text-red-600 font-bold text-sm">
                ${item.price}
              </span>
            </div>

            <button
              onClick={() => addToCart(item)}
              className="bg-black text-white w-7 h-7 rounded-full"
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
        {/* ⭐ Rating */}
        <div className="text-yellow-500 font-bold">
          ⭐ {review.rating}
        </div>

        {/* 💬 Comment */}
        {review.comment ? (
          <p className="text-sm text-gray-600 mt-2">
            {review.comment}
          </p>
        ) : (
          <p className="text-sm text-gray-400 mt-2">
            No comment
          </p>
        )}

        {/* 🕒 Date */}
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
          className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 rounded-full shadow-lg"
        >
          Cart ({totalItems})
        </button>
      )}
    </div>
  );
}
