import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Chirp – Civic Engagement Portal",
  description: "Debate, Learn, and Track – India's premier civic engagement platform",
  icons: {
    icon: "/chirp-logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif" }}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-[#2D7D7E] text-white text-center py-4 text-sm mt-12">
            <p>
              Chirp © 2026 &nbsp;·&nbsp; Built for India&apos;s civic future &nbsp;·&nbsp;
              <span className="text-[#F0A500]">A non-partisan platform</span>
            </p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
