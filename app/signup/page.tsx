"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Signup successful!");
    } else {
      setMessage(data.message);
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
            Sign up
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-300 rounded-full px-4 py-2 outline-none"
                required
              />
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block mb-2 text-sm">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-300 rounded-full px-4 py-2 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-300 rounded-full px-4 py-2 outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-300 rounded-full px-4 py-2 outline-none"
                required
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
              {message && (
                <p className="text-green-600 text-center mt-4">
                  {message}
                </p>
              )}
              <p className="text-xs mt-4">
                Already have an account?{" "}
                <Link href="/signin" className="underline">
                  Sign in here
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
