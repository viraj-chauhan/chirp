"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";

const DEMO_ACCOUNTS = [
  { email: "admin@civicportal.in", password: "admin123", label: "Admin", badge: "Admin" },
  { email: "rahul@demo.com", password: "demo123", label: "Rahul Sharma", badge: "Delhi" },
  { email: "priya@demo.com", password: "demo123", label: "Priya Patel", badge: "Mumbai" },
  { email: "amit@demo.com", password: "demo123", label: "Amit Kumar", badge: "Bangalore" },
  { email: "sneha@demo.com", password: "demo123", label: "Sneha Gupta", badge: "Chennai" },
];

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    router.replace("/");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (success) {
      router.push("/");
    } else {
      setError("Invalid email or password. Try one of the demo accounts below.");
    }
  };

  const quickLogin = (acc: (typeof DEMO_ACCOUNTS)[0]) => {
    const success = login(acc.email, acc.password);
    if (success) router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image src="/chirp-logo.svg" alt="Chirp" width={72} height={72} className="mx-auto" />
          <h1 className="text-2xl font-bold text-[#2D7D7E] mt-2">
            Chirp
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Login to debate and participate
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#2D7D7E] text-white font-semibold rounded-lg hover:bg-[#236969] transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={16} />
              Login
            </button>

            <p className="text-center text-xs text-gray-400">
              Don&apos;t have an account?{" "}
              <span className="text-gray-500">
                (Registration coming soon – use demo accounts below)
              </span>
            </p>
          </form>

          {/* Demo accounts */}
          <div className="border-t border-gray-100 p-5 bg-gray-50">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
              Demo Accounts – Click to Login
            </p>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => quickLogin(acc)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{acc.label}</p>
                    <p className="text-xs text-gray-400">{acc.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        acc.badge === "Admin"
                          ? "bg-[#F0A500]/20 text-[#D4920A]"
                          : "bg-[#2D7D7E]/10 text-[#2D7D7E]"
                      }`}
                    >
                      {acc.badge}
                    </span>
                    <LogIn size={13} className="text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Browsing without login? You can still read threads and view debates.{" "}
          <Link href="/" className="text-blue-500 hover:underline">
            Browse as guest →
          </Link>
        </p>
      </div>
    </div>
  );
}
