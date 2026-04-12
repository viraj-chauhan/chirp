"use client";

import { useState } from "react";
import { GOVERNMENT_WORKS } from "@/lib/data";
import type { GovernmentWork } from "@/lib/types";
import { Search, MapPin, User, CheckCircle2, Clock, AlertTriangle, ChevronDown, ChevronUp, IndianRupee } from "lucide-react";

const STATES = [...new Set(GOVERNMENT_WORKS.map((w) => w.state))].sort();
const CATEGORIES = [...new Set(GOVERNMENT_WORKS.map((w) => w.category))].sort();

function statusBadge(status: GovernmentWork["status"]) {
  if (status === "completed")
    return (
      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">
        <CheckCircle2 size={11} /> Completed
      </span>
    );
  if (status === "ongoing")
    return (
      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
        <Clock size={11} /> Ongoing
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">
      <AlertTriangle size={11} /> Delayed
    </span>
  );
}

function progressColor(pct: number, status: GovernmentWork["status"]) {
  if (status === "completed") return "bg-green-500";
  if (status === "delayed") return "bg-amber-500";
  if (pct >= 70) return "bg-blue-500";
  return "bg-blue-400";
}

function formatCrore(lakhs: number) {
  if (lakhs >= 10000) return `₹${(lakhs / 10000).toFixed(1)} lakh crore`;
  if (lakhs >= 100) return `₹${(lakhs / 100).toFixed(2)} crore`;
  return `₹${lakhs} lakh`;
}

export default function TransparencyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = GOVERNMENT_WORKS.filter((w) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      w.title.toLowerCase().includes(q) ||
      w.mp.toLowerCase().includes(q) ||
      w.mla.toLowerCase().includes(q) ||
      w.location.toLowerCase().includes(q) ||
      w.district.toLowerCase().includes(q) ||
      w.category.toLowerCase().includes(q) ||
      w.scheme.toLowerCase().includes(q);
    const matchesState = stateFilter === "all" || w.state === stateFilter;
    const matchesCategory = categoryFilter === "all" || w.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || w.status === statusFilter;
    return matchesSearch && matchesState && matchesCategory && matchesStatus;
  });

  const totalBudget = filtered.reduce((s, w) => s + w.allocatedBudget, 0);
  const totalUsed = filtered.reduce((s, w) => s + w.usedBudget, 0);
  const completed = filtered.filter((w) => w.status === "completed").length;
  const delayed = filtered.filter((w) => w.status === "delayed").length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2D7D7E] to-[#236969] text-white rounded-2xl p-6 mb-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <IndianRupee size={24} className="text-[#F0A500]" />
          Government Works Tracker
        </h1>
        <p className="text-white/80 text-sm">
          Track ongoing and completed government projects in your area.
          Real-time budget utilisation and progress data.
        </p>
        <p className="text-xs text-white/50 mt-2">
          Demo data – in production, sourced from MPLADS portal, state government dashboards, and PIB.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Projects", value: filtered.length, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Allocated", value: formatCrore(totalBudget), color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Funds Used", value: formatCrore(totalUsed), color: "text-[#D4920A]", bg: "bg-amber-50" },
          { label: "Completed", value: `${completed}/${filtered.length}`, color: "text-green-600", bg: "bg-green-50" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center`}>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative md:col-span-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location, MP, category…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>

          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 text-gray-600"
          >
            <option value="all">All States</option>
            {STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 text-gray-600"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 text-gray-600"
          >
            <option value="all">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>

        {delayed > 0 && (
          <div className="mt-3 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
            <AlertTriangle size={13} />
            {delayed} project{delayed > 1 ? "s" : ""} in your current filter {delayed > 1 ? "are" : "is"} delayed.
          </div>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-400">
          <Search size={32} className="mx-auto mb-2 opacity-30" />
          <p>No projects found matching your filters.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setStateFilter("all");
              setCategoryFilter("all");
              setStatusFilter("all");
            }}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((work) => {
            const isExpanded = expandedId === work.id;
            const utilisation = Math.round((work.usedBudget / work.allocatedBudget) * 100);

            return (
              <div
                key={work.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Card Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : work.id)}
                  className="w-full text-left p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {statusBadge(work.status)}
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {work.category}
                        </span>
                        <span className="text-xs text-gray-400">{work.state}</span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 leading-snug">
                        {work.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} /> {work.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={11} /> MP: {work.mp}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={11} /> MLA: {work.mla}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-xs text-gray-500">Progress</p>
                      <p className="text-2xl font-bold text-gray-800">{work.progress}%</p>
                      {isExpanded ? (
                        <ChevronUp size={16} className="text-gray-400 ml-auto" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400 ml-auto" />
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="progress-bar mt-3">
                    <div
                      className={`progress-fill ${progressColor(work.progress, work.status)}`}
                      style={{ width: `${work.progress}%` }}
                    />
                  </div>

                  {/* Budget quick view */}
                  <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Allocated</p>
                      <p className="text-sm font-bold text-gray-800">{formatCrore(work.allocatedBudget)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Used</p>
                      <p className="text-sm font-bold text-[#D4920A]">{formatCrore(work.usedBudget)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Utilisation</p>
                      <p className={`text-sm font-bold ${utilisation > 90 ? "text-red-600" : "text-green-600"}`}>
                        {utilisation}%
                      </p>
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                          Project Details
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed mb-3">
                          {work.description}
                        </p>
                        <div className="space-y-1 text-xs text-gray-600">
                          <p><span className="font-semibold">Scheme:</span> {work.scheme}</p>
                          <p><span className="font-semibold">Start Date:</span> {new Date(work.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                          <p><span className="font-semibold">Expected End:</span> {new Date(work.expectedEnd).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                          {work.actualEnd && (
                            <p className="text-green-700">
                              <span className="font-semibold">Actual Completion:</span> {new Date(work.actualEnd).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </p>
                          )}
                          {work.status === "delayed" && (
                            <p className="text-amber-700 font-semibold">
                              ⚠️ This project is behind schedule.
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                          Location & Officials
                        </h4>
                        <div className="space-y-1.5 text-sm text-gray-700">
                          <p><span className="font-semibold">District:</span> {work.district}, {work.state}</p>
                          <p><span className="font-semibold">Location:</span> {work.location}</p>
                          <p><span className="font-semibold">MP:</span> {work.mp}</p>
                          <p><span className="font-semibold">MLA:</span> {work.mla}</p>
                        </div>

                        {work.photoUrl && (
                          <div className="mt-3">
                            <p className="text-xs font-semibold text-gray-500 mb-1">
                              Completion Photo (uploaded by contractor)
                            </p>
                            <div className="bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-xs">
                              📷 Photo available after verification
                            </div>
                          </div>
                        )}

                        {work.status !== "completed" && (
                          <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3">
                            <p className="text-xs text-blue-700 font-medium">
                              Is this project in your area? Share an update:
                            </p>
                            <button className="mt-1.5 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                              📱 Upload Photo / Report Issue
                            </button>
                            <p className="text-xs text-gray-400 mt-1">(Feature under development)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
