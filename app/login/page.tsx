"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/employee/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h1 className="text-gray-500 text-2xl font-bold mb-6">
          EMS Login
        </h1>

        <input
          className="text-gray-500 border p-2 w-full mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="text-gray-500 border p-2 w-full mb-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end mb-3">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {error && (
          <p className="text-red-500 mb-3">
            {error}
          </p>
        )}

        <button
          className="bg-green-600 text-white px-4 py-2 rounded w-full mb-3"
        >
          Login
        </button>

        <button
          type="button"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/employee/dashboard",
              prompt: "select_account",
            })
          }
          className="bg-red-600 text-white px-4 py-2 rounded w-full mb-3"
        >
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() =>
            signIn("facebook", {
              callbackUrl: "/employee/dashboard",
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Continue with Facebook
        </button>
      </form>
    </div>
  );
}