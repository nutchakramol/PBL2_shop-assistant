"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Topbar() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [user, setUser] = useState<any>(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    full_name: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);


  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: form.email,
        password: form.password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
    setShowAuth(false);
  };

  const handleRegister = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
    setShowAuth(false);
  };

  /* ✅ Logout */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="fixed top-0 left-0 w-full z-80">
        <div className="flex items-center justify-between px-6 py-5 
                        bg-[#b52f27]/85 backdrop-blur-md 
                        rounded-b-2xl shadow-lg border border-white/40">

          <div className="text-xl font-bold text-[#fcf5ed]">
            <Link href="/">LAMAH</Link>
          </div>

          {/* ✅ Dynamic Button */}
          {user ? (
            <div className="flex items-center gap-3">

              <span className="text-base font-semibold">
                 {user.username}
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-1 text-base bg-black text-white rounded-xl"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="px-5 py-2 text-base font-medium text-white 
                         bg-black rounded-xl hover:scale-105 transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* ✅ Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm 
                        flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl shadow-2xl p-6 w-[380px] relative">

            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-4 right-4 text-gray-400"
            >
              ✕
            </button>

            <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 rounded-lg text-base ${
                  isLogin ? "bg-white shadow-sm font-semibold" : ""
                }`}
              >
                Login
              </button>

              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 rounded-lg text-base ${
                  !isLogin ? "bg-white shadow-sm font-semibold" : ""
                }`}
              >
                Sign Up
              </button>
            </div>

            <h2 className="text-xl font-bold mb-4">
              {isLogin ? "Welcome Back " : "Create Account "}
            </h2>

            <div className="space-y-3">

              {!isLogin && (
                <input
                  placeholder="Username"
                  onChange={e => updateField("username", e.target.value)}
                  className="w-full border rounded-xl px-4 py-2 text-base"
                />
              )}

              <input
                placeholder="Email"
                onChange={e => updateField("email", e.target.value)}
                className="w-full border rounded-xl px-4 py-2 text-base"
              />

              <input
                type="password"
                placeholder="Password"
                onChange={e => updateField("password", e.target.value)}
                className="w-full border rounded-xl px-4 py-2 text-base"
              />

              {!isLogin && (
                <input
                  placeholder="Full Name"
                  onChange={e => updateField("full_name", e.target.value)}
                  className="w-full border rounded-xl px-4 py-2 text-base"
                />
              )}

              {/* ✅ Action Button */}
              <button
                onClick={isLogin ? handleLogin : handleRegister}
                className="w-full bg-black text-white py-2 rounded-xl"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
