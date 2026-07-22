"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-6 shadow">
        <h1 className="mb-2 text-2xl font-bold">
          Forgot Password
        </h1>

        <p className="mb-6 text-sm text-gray-600">
          Enter your email address and we'll send you a password reset link.
        </p>

        <form>
          <input
            type="email"
            placeholder="Email"
            className="mb-4 w-full rounded border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-2 text-white"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}