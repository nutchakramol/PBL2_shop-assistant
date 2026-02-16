"use client";

import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";

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

  const [profileOpen, setProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);


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
      console.log("Profile Data:", data);

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
          className="text-xl cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-md"
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
        {profileOpen && profileData && (
          <Sidebar 
          restaurant={profileData} onClose={() => setProfileOpen(false)} />
        )}

        <div className="font-semibold text-red-600">
          Lamah
        </div>
        <div
          className="w-8 h-8 bg-[#b5b5ba] text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-120 hover:shadow-md"
          onClick={async () => {
            const user_id = localStorage.getItem("user_id");

            const res = await fetch(
              `/api/profile?user_id=${user_id}`
            );

            const data = await res.json();

            setProfileData(data);
            setProfileOpen(true);
          }}
        >
          👤
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
          <div className="w-full max-w-lg">

            <div className="bg-[#efe5da] rounded-3xl p-10 shadow-xl text-center relative overflow-hidden">

              {/* Decorative subtle circle */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-200 rounded-full opacity-20"></div>

              {/* Icon */}
              <div className="text-6xl mb-4">🛎️</div>

              <h2 className="text-2xl font-semibold mb-3">
                Waiting for Orders
              </h2>

              <p className="text-gray-600 leading-relaxed">
                When customers place an order,
                it will appear here instantly.
              </p>

              <div className="mt-6 text-sm text-gray-400">
                Make sure your restaurant is open and
                your menu items are available.
              </div>

            </div>

          </div>


        ) : (
          <div className="w-full max-w-3xl space-y-6">
            {orders.map((order) => {
              const statusColor =
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700";

              return (
                <div
                  key={order._id}
                  className="bg-[#efe5da] rounded-3xl p-6 shadow-md 
                            transition-all duration-300 
                            hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Top Row */}
                  <div className="flex justify-between items-start mb-4">

                    <div>
                      <h3 className="text-lg font-semibold">
                        Table {order.table_id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor}`}
                    >
                      {order.status}
                    </span>

                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 mb-4"></div>

                  {/* Items */}
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-base"
                      >
                        <span className="font-medium">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-gray-600">
                          ฿{item.total}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="mt-5 h-1 w-16 bg-red-500 rounded-full"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>


    </div>
  );
}
