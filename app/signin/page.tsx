"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user_id", data.user._id);
      localStorage.setItem("user_email", data.user.email);
      router.replace("/home");
      console.log("Stored ID:", data.user._id);
    } else {
      alert(data.message);
    }
    
  }


  return (
    <div className="min-h-screen bg-[#b92c24] flex flex-col">

      {/* Top Bar */}
      <div className="bg-[#efe5da] h-14 flex items-center justify-between px-4">
        <div className="text-xl">☰</div>
        <div className="font-semibold text-red-600">
          Rimberio Co
        </div>
        <div className="w-6" />
      </div>

      {/* Center Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-[#efe5da] w-full max-w-sm rounded-2xl p-8 shadow-lg">

          {/* Title */}
          <h1 className="text-2xl text-center font-semibold px-4 py-1 mb-8">
            Sign in
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">

            {/* Username */}
            <div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm"
                >
                  Username
                </label>

                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-300 rounded-full px-4 py-2 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-300 rounded-full px-4 py-2 outline-none"
              />
            </div>

            {/* Button */}
            <div className="text-center pt-2">
              <button
                type="submit"
                className="bg-[#2e2d63] text-white px-8 py-2 rounded-full hover:opacity-90"
              >
                Submit
              </button>

              <p className="text-xs mt-4">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="underline"
                >
                  Sign up here
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
