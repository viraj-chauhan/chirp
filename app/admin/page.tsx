"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { THREADS, USERS, GOVERNMENT_WORKS } from "@/lib/data";
import {
  Shield, Plus, Users, MessageSquare, Swords, BarChart2,
  Eye, CheckCircle2, Clock, AlertTriangle, Trash2, Edit,
  ChevronRight, PenSquare
} from "lucide-react";

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "threads" | "users" | "works">("overview");
  const [showNewThread, setShowNewThread] = useState(false);
  const [newThread, setNewThread] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
  });
  const [threadPosted, setThreadPosted] = useState(false);

  if (!user) {
    router.replace("/login");
    return null;
  }

  if (!user.isAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Shield size={40} className="mx-auto mb-3 text-red-400" />
        <h1 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-4">You need admin privileges to access this panel.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  const activeThreads = THREADS.filter((t) => t.status === "active");
  const archivedThreads = THREADS.filter((t) => t.status === "archived");
  const totalDebates = THREADS.reduce((s, t) => s + t.debates.length, 0);
  const totalComments = THREADS.reduce((s, t) => s + t.comments.length, 0);
  const totalViewers = THREADS.reduce(
    (s, t) => s + t.debates.filter((d) => d.status === "live").reduce((s2, d) => s2 + d.viewers, 0),
    0
  );
  const completedWorks = GOVERNMENT_WORKS.filter((w) => w.status === "completed").length;

  const handlePostThread = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would add to the database
    setThreadPosted(true);
    setShowNewThread(false);
    setTimeout(() => setThreadPosted(false), 4000);
  };

  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "threads" as const, label: "Threads" },
    { id: "users" as const, label: "Users" },
    { id: "works" as const, label: "Govt Works" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2D7D7E] to-[#236969] text-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Shield size={24} className="text-[#F0A500]" />
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <p className="text-white/80 text-sm">
          Manage threads, moderate content, and post new debate topics. Logged in as{" "}
          <span className="font-semibold text-[#F5B820]">{user.name}</span>.
        </p>
      </div>

      {threadPosted && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-4 flex items-center gap-2 text-sm font-medium">
          <CheckCircle2 size={16} />
          Thread posted successfully! (Demo – visible in the thread list upon backend integration)
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl shadow-sm border border-gray-100 p-1 mb-5 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#2D7D7E] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Active Threads", value: activeThreads.length, icon: PenSquare, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Total Debates", value: totalDebates, icon: Swords, color: "text-purple-600", bg: "bg-purple-50" },
              { label: "Live Viewers", value: totalViewers, icon: Eye, color: "text-red-600", bg: "bg-red-50" },
              { label: "Comments", value: totalComments, icon: MessageSquare, color: "text-green-600", bg: "bg-green-50" },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} rounded-xl p-4`}>
                <s.icon size={20} className={`${s.color} mb-2`} />
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-3">
              <button
                onClick={() => { setActiveTab("threads"); setShowNewThread(true); }}
                className="flex items-center gap-3 px-4 py-3 bg-[#2D7D7E] text-white rounded-xl hover:bg-[#236969] transition-colors"
              >
                <Plus size={18} className="text-[#F0A500]" />
                <div className="text-left">
                  <p className="text-sm font-semibold">Post New Thread</p>
                  <p className="text-xs text-white/60">Create today&apos;s debate topic</p>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("threads")}
                className="flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors"
              >
                <Eye size={18} />
                <div className="text-left">
                  <p className="text-sm font-semibold">View Active Debates</p>
                  <p className="text-xs text-purple-500">{totalDebates} debates across all threads</p>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className="flex items-center gap-3 px-4 py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors"
              >
                <Users size={18} />
                <div className="text-left">
                  <p className="text-sm font-semibold">Manage Users</p>
                  <p className="text-xs text-green-500">{USERS.filter((u) => !u.isAdmin).length} registered users</p>
                </div>
              </button>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-800 mb-3">Thread Status</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Active Threads</span>
                  <span className="font-semibold text-green-600">{activeThreads.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Archived Threads</span>
                  <span className="font-semibold text-gray-500">{archivedThreads.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Live Debates</span>
                  <span className="font-semibold text-red-600">
                    {THREADS.reduce((s, t) => s + t.debates.filter((d) => d.status === "live").length, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Ended Debates</span>
                  <span className="font-semibold text-gray-500">
                    {THREADS.reduce((s, t) => s + t.debates.filter((d) => d.status === "ended").length, 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-800 mb-3">Govt Works Status</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-1 text-gray-600"><CheckCircle2 size={13} className="text-green-500" /> Completed</span>
                  <span className="font-semibold text-green-600">{completedWorks}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-1 text-gray-600"><Clock size={13} className="text-blue-500" /> Ongoing</span>
                  <span className="font-semibold text-blue-600">{GOVERNMENT_WORKS.filter((w) => w.status === "ongoing").length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-1 text-gray-600"><AlertTriangle size={13} className="text-amber-500" /> Delayed</span>
                  <span className="font-semibold text-amber-600">{GOVERNMENT_WORKS.filter((w) => w.status === "delayed").length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total Projects</span>
                  <span className="font-semibold">{GOVERNMENT_WORKS.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Threads Tab */}
      {activeTab === "threads" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-800">Manage Threads</h2>
            <button
              onClick={() => setShowNewThread(!showNewThread)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#2D7D7E] text-white text-sm font-semibold rounded-lg hover:bg-[#236969] transition-colors"
            >
              <Plus size={15} /> New Thread
            </button>
          </div>

          {/* New Thread Form */}
          {showNewThread && (
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <PenSquare size={18} className="text-[#F0A500]" /> Post New Thread
              </h3>
              <form onSubmit={handlePostThread} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thread Title *</label>
                  <input
                    type="text"
                    required
                    value={newThread.title}
                    onChange={(e) => setNewThread((p) => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Reservation in Private Sector – Necessary or Counterproductive?"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brief Description * (not a full article – just context)
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newThread.description}
                    onChange={(e) => setNewThread((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Provide a neutral, factual summary of the issue. 2-4 sentences is ideal."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      required
                      value={newThread.category}
                      onChange={(e) => setNewThread((p) => ({ ...p, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                    >
                      <option value="">Select…</option>
                      {["Law & Governance", "Economy", "Education", "Healthcare", "Technology & Economy", "Environment", "Social Justice", "Foreign Policy"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={newThread.tags}
                      onChange={(e) => setNewThread((p) => ({ ...p, tags: e.target.value }))}
                      placeholder="e.g. Reservation, OBC, Economy"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-700">
                  ⚠️ Thread will be active for 24 hours from posting. Debate window closes at deadline. Threads move to Archive 24 hours after deadline.
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2D7D7E] text-white font-semibold text-sm rounded-lg hover:bg-[#236969] transition-colors"
                  >
                    Post Thread
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewThread(false)}
                    className="px-5 py-2 bg-gray-100 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Thread List */}
          {THREADS.map((thread) => (
            <div key={thread.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-start gap-3 justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      thread.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {thread.status.charAt(0).toUpperCase() + thread.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-400">{thread.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800">{thread.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>{thread.debates.length} debates</span>
                    <span>{thread.comments.length} comments</span>
                    <span>Posted: {new Date(thread.postedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/thread/${thread.id}`}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                  >
                    View <ChevronRight size={13} />
                  </Link>
                  <button className="flex items-center gap-1 text-xs text-[#D4920A] hover:bg-amber-50 px-2 py-1 rounded">
                    <Edit size={12} /> Edit
                  </button>
                  <button className="flex items-center gap-1 text-xs text-red-500 hover:bg-red-50 px-2 py-1 rounded">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Registered Users ({USERS.length})</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {USERS.map((u) => (
              <div key={u.id} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold`}>
                    {u.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{u.name}</p>
                    <p className="text-xs text-gray-400">{u.email} · {u.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {u.isAdmin && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <Shield size={11} /> Admin
                    </span>
                  )}
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {u.isAdmin ? "Verified" : "Active"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Works Tab */}
      {activeTab === "works" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-gray-800">Government Works ({GOVERNMENT_WORKS.length})</h2>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-[#2D7D7E] text-white text-sm font-semibold rounded-lg hover:bg-[#236969] transition-colors">
              <Plus size={15} /> Add Work Entry
            </button>
          </div>
          {GOVERNMENT_WORKS.map((work) => (
            <div key={work.id} className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-3 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{work.title}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span>{work.state}</span>
                  <span>·</span>
                  <span>{work.category}</span>
                  <span>·</span>
                  <span className={work.status === "completed" ? "text-green-600" : work.status === "delayed" ? "text-amber-600" : "text-blue-600"}>
                    {work.progress}% – {work.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-semibold text-gray-700">₹{work.allocatedBudget}L</span>
                <button className="text-xs text-[#D4920A] hover:bg-amber-50 px-2 py-1 rounded flex items-center gap-1">
                  <Edit size={12} /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Transparency about AI */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <BarChart2 size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-amber-800 mb-1">AI Usage Policy (Admin Reminder)</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• AI summaries are factual — they list arguments, not conclusions</li>
              <li>• AI must not be used to generate biased thread descriptions</li>
              <li>• Matchmaking is purely algorithmic — random pairing, no political targeting</li>
              <li>• All AI-generated content is labelled as such on the platform</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
