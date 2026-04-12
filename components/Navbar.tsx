"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Scale, BookOpen, BarChart2, Archive, LogIn, LogOut, Menu, X, Shield, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Debates", icon: Scale },
  { href: "/education", label: "Learn", icon: BookOpen },
  { href: "/transparency", label: "Transparency", icon: BarChart2 },
  { href: "/archive", label: "Archive", icon: Archive },
];

const AVATAR_BG = [
  "bg-teal-500", "bg-purple-600", "bg-green-600",
  "bg-rose-600", "bg-amber-500", "bg-cyan-600",
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const colorIndex = user ? user.id.charCodeAt(user.id.length - 1) % AVATAR_BG.length : 0;

  return (
    <nav className="bg-[#2D7D7E] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Image src="/chirp-logo.svg" alt="Chirp" width={32} height={32} className="rounded" />
            <span className="text-white tracking-wide">Chirp</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors"
                >
                  <span className={`w-7 h-7 rounded-full ${AVATAR_BG[colorIndex]} flex items-center justify-center text-xs font-bold`}>
                    {user.avatar}
                  </span>
                  <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
                  {user.isAdmin && <Shield size={13} className="text-[#F0A500]" />}
                  <ChevronDown size={14} className="text-white/60" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        <Shield size={14} className="text-[#F0A500]" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#F0A500] hover:bg-[#D4920A] text-white text-sm font-semibold rounded-md transition-colors"
              >
                <LogIn size={14} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-3 border-t border-white/10 mt-1 pt-2">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                  pathname === href ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-2 pt-2">
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-white/70">
                    Logged in as <span className="font-semibold text-white">{user.name}</span>
                  </div>
                  {user.isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10"
                    >
                      <Shield size={14} className="text-[#F0A500]" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-300 hover:bg-white/10 w-full"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-[#F0A500] rounded-md mx-3"
                >
                  <LogIn size={14} />
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
