"use client";

import { useRouter } from "next/navigation";

type Props = {
  restaurant: any;
  onClose: () => void;
};

export default function Sidebar({ restaurant , onClose}: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/signin");
  };

  return (
    <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 p-6 flex flex-col justify-between">

      {/* Profile Info */}
      <div>
         <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-lg"
          >
            ✕
          </button>
        </div>

        <p><strong>Name:</strong> {restaurant?.ownerName}</p>
        <p><strong>Restaurant ID:</strong> {restaurant?.restaurant_id}</p>
        <p><strong>Location:</strong> {restaurant?.location}</p>
        <p><strong>Tables:</strong> {restaurant?.tableCount}</p>
      </div>

      {/* Bottom Right Logout */}
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-[#2e2d63] text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
