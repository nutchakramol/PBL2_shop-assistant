"use client";

import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";

type OrderItem = {
  menu_id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

type Order = {
  _id: string;
  table_id: string;
  table_number: number;
  items: OrderItem[];
  status: string;
  created_at: string;
};



export default function HomePage() {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔥 HomePage mounted");

    async function init() {
      const email = localStorage.getItem("user_email");
      console.log("User Email:", email);

      if (!email) {
        setIsRegistered(false);
        setLoading(false);
        return;
      }

      // 1️⃣ Check if restaurant exists by email
      const res = await fetch(
        `/api/check-restaurant?email=${email}`
      );

      const data = await res.json();

      if (!data.registered) {
        setIsRegistered(false);
        setLoading(false);
        return;
      }

      setIsRegistered(true);

      const restaurant_id = data.restaurant_id;

      // 2️⃣ Fetch orders
      const ordersRes = await fetch(
        `/api/orders?restaurant_id=${restaurant_id}`
      );

      const ordersData = await ordersRes.json();

      setOrders(ordersData);
      setLoading(false);
    }

    init();
  }, []);

  return (
    <div className="min-h-screen bg-[#b92c24] flex flex-col">

      {/* Header */}
      <div className="bg-[#efe5da] h-14 flex items-center justify-between px-4">
        <div
          className="text-xl cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </div>
        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Dashboard</h2>
              <button onClick={() => setSidebarOpen(false)}>✕</button>
            </div>

            <div className="flex flex-col space-y-4">
              <Link
                href="/edit-info"
                className="hover:bg-gray-100 p-2 rounded"
              >
                Edit General Info
              </Link>

              <Link
                href="/menu"
                className="hover:bg-gray-100 p-2 rounded"
              >
                Menu
              </Link>
            </div>
          </div>
        )}


        <div className="font-semibold text-red-600">
          Rimberio Co
        </div>
        <div className="w-8 h-8 bg-[#2e2d63] text-white rounded-full flex items-center justify-center cursor-pointer">
          T
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : !isRegistered ? (
          <div className="bg-[#efe5da] rounded-2xl p-8 w-full max-w-md shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">
              Restaurant not registered
            </h2>
            <p className="text-sm mb-6">
              You need to register your restaurant before managing orders.
            </p>

            <Link href="/register">
              <button className="bg-[#2e2d63] text-white px-8 py-2 rounded-full">
                Register
              </button>
            </Link>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-white">No orders yet.</div>
        ) : (
          <div className="w-full max-w-3xl space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#efe5da] rounded-2xl p-6 shadow-lg"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">
                    Table {order.table_id}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {new Date(order.created_at).toLocaleString()}
                  </span>
                </div>

                {order.items.map((item, index) => (
                  <p key={index} className="text-lg font-medium">
                    {item.name} × {item.quantity}
                  </p>
                ))}

                <p className="text-sm mt-2 italic">
                  Status: {order.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
  );
}
