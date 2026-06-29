"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  const res = await signIn("credentials", {
    username,
    password,
    redirect: false, // 🔥 important
  });

  if (res?.error) {
    alert("Invalid credentials");
  } else {
    window.location.href = "/admin";
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="space-y-4 w-80">
        <h1 className="text-2xl text-center">Login</h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 bg-gray-900 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-gray-900 rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-white text-black py-3 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}