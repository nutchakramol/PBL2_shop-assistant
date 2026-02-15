"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditInfoPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [tableCount, setTableCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const user_id = localStorage.getItem("user_id");

      const res = await fetch(`/api/edit-info?user_id=${user_id}`);
      const data = await res.json();

      setUsername(data.username);
      setName(data.name);
      setLocation(data.location);
      setTableCount(data.tableCount);
      setLoading(false);
    }

    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const user_id = localStorage.getItem("user_id");

    const res = await fetch("/api/edit-info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        username,
        name,
        location,
        tableCount,
      }),
    });

    if (res.ok) {
      alert("Updated successfully");
      router.push("/home");
    } else {
      alert("Update failed");
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#b92c24] flex flex-col">

      {/* 🔹 Header */}
      <div className="bg-[#efe5da] h-14 flex items-center px-4 justify-between">
        <button
          onClick={() => router.push("/home")}
          className="font-bold text-sm font-medium hover:font-semibold"
        >
          ← Back
        </button>

        <div className="font-semibold text-red-600">
          Shop assistant
        </div>

        <div className="w-12" /> {/* spacer */}
      </div>

      {/* 🔹 Form Section */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-[#efe5da] p-8 rounded-2xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Edit Information
        </h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label htmlFor="username" className="block mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full bg-gray-300 rounded px-3 py-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full bg-gray-300 rounded px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="location" className="block mb-1">
                Location
              </label>
              <input
                id="location"
                type="text"
                className="w-full bg-gray-300 rounded px-3 py-2"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="tableCount" className="block mb-1">
                Table Count
              </label>
              <input
                id="tableCount"
                type="number"
                className="w-full bg-gray-300 rounded px-3 py-2"
                value={tableCount}
                onChange={(e) => setTableCount(Number(e.target.value))}
              />
            </div>

            <button
              type="submit"
              className="bg-[#2e2d63] text-white px-6 py-2 rounded w-full mt-4"
            >
              Save Changes
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
