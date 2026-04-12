"use client";

import Link from "next/link";
import { THREADS } from "@/lib/data";
import { Clock, Users, MessageSquare, Tag, ArrowRight, Flame } from "lucide-react";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor(diff / 60000);
  if (h >= 24) return `${Math.floor(h / 24)}d ago`;
  if (h >= 1) return `${h}h ago`;
  return `${m}m ago`;
}

function timeLeft(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return "Ended";
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (h >= 1) return `${h}h ${m}m left`;
  return `${m}m left`;
}

export default function HomePage() {
  const activeThreads = THREADS.filter((t) => t.status === "active");
  const totalViewers = activeThreads.reduce(
    (sum, t) => sum + t.debates.reduce((s, d) => s + d.viewers, 0),
    0
  );
  const totalDebates = activeThreads.reduce((sum, t) => sum + t.debates.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#2D7D7E] to-[#236969] text-white rounded-2xl p-6 mb-8 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Today&apos;s Debate Threads
        </h1>
        <p className="text-white/80 text-sm md:text-base">
          Engage with your fellow citizens on issues that matter. Debate, comment, and learn.
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="bg-white/15 rounded-lg px-4 py-2 text-center">
            <div className="text-xl font-bold">{activeThreads.length}</div>
            <div className="text-xs text-white/70">Active Threads</div>
          </div>
          <div className="bg-white/15 rounded-lg px-4 py-2 text-center">
            <div className="text-xl font-bold">{totalDebates}</div>
            <div className="text-xs text-white/70">Live Debates</div>
          </div>
          <div className="bg-white/15 rounded-lg px-4 py-2 text-center">
            <div className="text-xl font-bold">{totalViewers.toLocaleString()}</div>
            <div className="text-xs text-white/70">Viewers Now</div>
          </div>
        </div>
      </div>

      {/* Thread Cards */}
      <div className="space-y-4">
        {activeThreads.map((thread, idx) => {
          const liveDebates = thread.debates.filter((d) => d.status === "live");
          const totalViewersNow = liveDebates.reduce((s, d) => s + d.viewers, 0);
          const isHot = totalViewersNow > 300 || idx === 0;

          return (
            <div
              key={thread.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-[#D4920A] bg-amber-50 px-2 py-0.5 rounded-full">
                    {thread.category}
                  </span>
                  {isHot && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      <Flame size={11} /> Trending
                    </span>
                  )}
                  <span className="badge-active">
                    <span className="live-dot w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Active
                  </span>
                </div>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={12} />
                  {timeLeft(thread.deadlineAt)}
                </span>
              </div>

              {/* Content */}
              <div className="px-5 py-3">
                <h2 className="text-lg font-bold text-gray-900 leading-snug mb-2">
                  {thread.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2">{thread.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {thread.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-0.5 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MessageSquare size={13} />
                    {thread.comments.length} comments
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={13} />
                    {liveDebates.length} live debates
                  </span>
                  {totalViewersNow > 0 && (
                    <span className="flex items-center gap-1 text-red-500 font-medium">
                      <span className="live-dot w-1.5 h-1.5 bg-red-500 rounded-full" />
                      {totalViewersNow} watching
                    </span>
                  )}
                </div>
                <Link
                  href={`/thread/${thread.id}`}
                  className="flex items-center gap-1 text-sm font-semibold text-[#2D7D7E] hover:text-[#D4920A] transition-colors"
                >
                  Join Discussion <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Archive link */}
      <div className="mt-6 text-center">
        <Link
          href="/archive"
          className="text-sm text-gray-500 hover:text-[#2D7D7E] underline underline-offset-2"
        >
          View Archived Threads →
        </Link>
      </div>
    </div>
  );
}
