"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { THREADS, GOVERNMENT_WORKS } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";
import {
  Clock, Heart, Reply, ChevronDown, ChevronUp,
  Maximize2, Minimize2, Eye, Swords, ArrowRight, Lock,
  CheckCircle2, BarChart2, Filter, ExternalLink
} from "lucide-react";
import type { Thread } from "@/lib/types";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor(diff / 60000);
  if (h >= 24) return `${Math.floor(h / 24)}d ago`;
  if (h >= 1) return `${h}h ago`;
  if (m < 1) return "just now";
  return `${m}m ago`;
}

function timeLeft(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return "Deadline passed";
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h}h ${m}m remaining`;
}

const AVATAR_COLORS = [
  "bg-blue-600", "bg-purple-600", "bg-green-600",
  "bg-rose-600", "bg-amber-600", "bg-cyan-600",
];
function avatarColor(id: string) {
  return AVATAR_COLORS[id.charCodeAt(id.length - 1) % AVATAR_COLORS.length];
}

type MatchmakingTopic = {
  label: string;
  side: "for" | "against" | null;
};

// ─── Inner component (all hooks here, no early returns before hooks) ──────────
function ThreadView({ thread }: { thread: Thread }) {
  const { user } = useAuth();
  const router = useRouter();

  const [commentsCollapsed, setCommentsCollapsed] = useState(false);
  const [debateSort, setDebateSort] = useState<"viewers" | "topic">("viewers");
  const [showMatchmaking, setShowMatchmaking] = useState(false);
  const [matchmakingStep, setMatchmakingStep] = useState<"topic" | "side" | "waiting">("topic");
  const [matchmaking, setMatchmaking] = useState<MatchmakingTopic>({ label: "", side: null });
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState<Array<{id: string; userId: string; userName: string; userAvatar: string; content: string; likes: number; likedBy: string[]; timestamp: string; replies: []}>>([]);

  const linkedWork = thread.sourceWorkId
    ? GOVERNMENT_WORKS.find((w) => w.id === thread.sourceWorkId)
    : null;

  const topics = [...new Set(thread.debates.map((d) => d.topic))];
  const sortedDebates = [...thread.debates]
    .filter((d) => d.status === "live")
    .filter((d) => topicFilter === "all" || d.topic === topicFilter)
    .sort((a, b) =>
      debateSort === "viewers" ? b.viewers - a.viewers : a.topic.localeCompare(b.topic)
    );

  const toggleLike = (id: string) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleReplies = (id: string) => {
    setExpandedReplies((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const isDeadlinePassed = new Date(thread.deadlineAt) < new Date();

  const handleStartDebate = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (isDeadlinePassed) return;
    setShowMatchmaking(true);
    setMatchmakingStep("topic");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Thread Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-[#D4920A] bg-amber-50 px-2 py-0.5 rounded-full">
            {thread.category}
          </span>
          <span className={thread.status === "active" ? "badge-active" : "badge-ended"}>
            <span className={`w-1.5 h-1.5 rounded-full ${thread.status === "active" ? "bg-green-500 live-dot" : "bg-gray-400"}`} />
            {thread.status === "active" ? "Active" : "Ended"}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
            <Clock size={12} />
            Posted by {thread.postedBy} · {timeAgo(thread.postedAt)}
          </span>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{thread.title}</h1>
        <p className="text-gray-600 text-sm leading-relaxed">{thread.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
          {thread.tags.map((tag) => (
            <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <Clock size={12} />
            {isDeadlinePassed ? (
              <span className="text-red-500 font-medium">Deadline passed</span>
            ) : (
              <span className="font-medium text-green-700">{timeLeft(thread.deadlineAt)}</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleStartDebate}
              disabled={isDeadlinePassed}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isDeadlinePassed
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#2D7D7E] text-white hover:bg-[#236969]"
              }`}
            >
              <Swords size={15} />
              {user ? "Start / Join Debate" : "Login to Debate"}
            </button>
            <button
              onClick={() => setCommentsCollapsed((p) => !p)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {commentsCollapsed ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
              {commentsCollapsed ? "Show Comments" : "View All Debates"}
            </button>
          </div>
        </div>
      </div>

      {/* Linked Government Work Panel */}
      {linkedWork && (
        <div className="bg-[#2D7D7E]/5 border border-[#2D7D7E]/25 rounded-xl p-5 mb-5">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-2">
              <BarChart2 size={18} className="text-[#2D7D7E]" />
              <h3 className="font-bold text-[#2D7D7E] text-sm">
                This debate is based on real data from the Government Works Tracker
              </h3>
            </div>
            <Link
              href="/transparency"
              className="flex items-center gap-1 text-xs font-semibold text-[#2D7D7E] hover:text-[#236969] underline underline-offset-2"
            >
              Open Tracker <ExternalLink size={12} />
            </Link>
          </div>
          <p className="text-sm font-semibold text-gray-800 mb-3">{linkedWork.title}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {[
              { label: "Location", value: linkedWork.district + ", " + linkedWork.state },
              { label: "Allocated Budget", value: `₹${linkedWork.allocatedBudget} lakh` },
              { label: "Funds Used", value: `₹${linkedWork.usedBudget} lakh` },
              { label: "Progress", value: `${linkedWork.progress}% — ${linkedWork.status.toUpperCase()}` },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-lg px-3 py-2 border border-[#2D7D7E]/15">
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className={`text-sm font-bold ${s.label === "Progress" && linkedWork.status === "delayed" ? "text-amber-600" : "text-gray-800"}`}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill bg-amber-500"
              style={{ width: `${linkedWork.progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            MP: <span className="font-medium">{linkedWork.mp}</span> &nbsp;·&nbsp;
            MLA: <span className="font-medium">{linkedWork.mla}</span> &nbsp;·&nbsp;
            Scheme: <span className="font-medium">{linkedWork.scheme}</span>
          </p>
        </div>
      )}

      {/* AI Summary after deadline */}
      {isDeadlinePassed && thread.commonPointsSummary && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 size={18} className="text-purple-600" />
            <h3 className="font-bold text-purple-800">AI Summary – Common Arguments</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-blue-700 mb-2">For</h4>
              <ul className="space-y-1.5">
                {thread.commonPointsSummary.forPoints.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-red-700 mb-2">Against</h4>
              <ul className="space-y-1.5">
                {thread.commonPointsSummary.againstPoints.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Split */}
      <div className={`grid gap-5 ${commentsCollapsed ? "grid-cols-1" : "md:grid-cols-2"}`}>
        {/* Comments Panel */}
        {!commentsCollapsed && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <Reply size={16} className="text-gray-500" />
                Comments ({thread.comments.length})
              </h2>
            </div>
            <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
              {thread.comments.map((comment) => {
                const isLiked = likedComments.has(comment.id);
                const repliesOpen = expandedReplies.has(comment.id);
                return (
                  <div key={comment.id} className="space-y-2">
                    <div className="flex gap-3">
                      <span className={`avatar w-8 h-8 ${avatarColor(comment.userId)}`}>
                        {comment.userAvatar}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-800">{comment.userName}</span>
                          <span className="text-xs text-gray-400">{timeAgo(comment.timestamp)}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => toggleLike(comment.id)}
                            className={`flex items-center gap-1 text-xs transition-colors ${
                              isLiked ? "text-red-500" : "text-gray-400 hover:text-red-400"
                            }`}
                          >
                            <Heart size={13} fill={isLiked ? "currentColor" : "none"} />
                            {comment.likes + (isLiked ? 1 : 0)}
                          </button>
                          {comment.replies.length > 0 && (
                            <button
                              onClick={() => toggleReplies(comment.id)}
                              className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              <Reply size={13} />
                              {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                              {repliesOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {repliesOpen && comment.replies.length > 0 && (
                      <div className="ml-11 space-y-2 border-l-2 border-gray-100 pl-3">
                        {comment.replies.map((reply) => {
                          const replyLiked = likedComments.has(reply.id);
                          return (
                            <div key={reply.id} className="flex gap-2">
                              <span className={`avatar w-6 h-6 text-[10px] ${avatarColor(reply.userId)}`}>
                                {reply.userAvatar}
                              </span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-xs font-semibold text-gray-800">{reply.userName}</span>
                                  <span className="text-xs text-gray-400">{timeAgo(reply.timestamp)}</span>
                                </div>
                                <p className="text-xs text-gray-700">{reply.content}</p>
                                <button
                                  onClick={() => toggleLike(reply.id)}
                                  className={`flex items-center gap-1 text-xs mt-1 transition-colors ${
                                    replyLiked ? "text-red-500" : "text-gray-400 hover:text-red-400"
                                  }`}
                                >
                                  <Heart size={11} fill={replyLiked ? "currentColor" : "none"} />
                                  {reply.likes + (replyLiked ? 1 : 0)}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              {/* Locally posted comments */}
              {localComments.map((comment) => {
                const isLiked = likedComments.has(comment.id);
                return (
                  <div key={comment.id} className="flex gap-3">
                    <span className={`avatar w-8 h-8 ${avatarColor(comment.userId)}`}>
                      {comment.userAvatar}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-800">{comment.userName}</span>
                        <span className="text-xs text-[#2D7D7E] bg-[#2D7D7E]/10 px-1.5 py-0.5 rounded-full font-medium">Just now</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                      <button
                        onClick={() => toggleLike(comment.id)}
                        className={`flex items-center gap-1 text-xs mt-2 transition-colors ${isLiked ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
                      >
                        <Heart size={13} fill={isLiked ? "currentColor" : "none"} />
                        {comment.likes + (isLiked ? 1 : 0)}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Comment Input */}
            <div className="border-t border-gray-100 p-4">
              {user ? (
                <div className="flex gap-3">
                  <span className={`avatar w-8 h-8 flex-shrink-0 ${avatarColor(user.id)}`}>
                    {user.avatar}
                  </span>
                  <div className="flex-1">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Share your thoughts on this issue…"
                      rows={2}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#2D7D7E] resize-none"
                    />
                    <div className="flex justify-end mt-1.5">
                      <button
                        onClick={() => {
                          if (!commentText.trim()) return;
                          setLocalComments((prev) => [
                            ...prev,
                            {
                              id: `lc-${Date.now()}`,
                              userId: user.id,
                              userName: user.name,
                              userAvatar: user.avatar,
                              content: commentText.trim(),
                              likes: 0,
                              likedBy: [],
                              timestamp: new Date().toISOString(),
                              replies: [],
                            },
                          ]);
                          setCommentText("");
                        }}
                        disabled={!commentText.trim()}
                        className="px-4 py-1.5 bg-[#2D7D7E] text-white text-sm font-semibold rounded-lg hover:bg-[#236969] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-3">
                  <p className="text-sm text-gray-500 mb-2">
                    <Lock size={13} className="inline mr-1" />
                    Login to post a comment
                  </p>
                  <Link href="/login" className="text-sm font-semibold text-[#D4920A] hover:underline">
                    Login →
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Debates Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <Swords size={16} className="text-gray-500" />
                Ongoing Debates ({sortedDebates.length})
              </h2>
              <div className="flex items-center gap-2">
                <Filter size={13} className="text-gray-400" />
                <select
                  value={debateSort}
                  onChange={(e) => setDebateSort(e.target.value as "viewers" | "topic")}
                  className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 focus:outline-none"
                >
                  <option value="viewers">Most Viewers</option>
                  <option value="topic">By Topic</option>
                </select>
                {topics.length > 1 && (
                  <select
                    value={topicFilter}
                    onChange={(e) => setTopicFilter(e.target.value)}
                    className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 focus:outline-none max-w-[140px]"
                  >
                    <option value="all">All Topics</option>
                    {topics.map((t) => (
                      <option key={t} value={t}>{t.length > 30 ? t.slice(0, 30) + "…" : t}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
            {sortedDebates.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <Swords size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No live debates right now.</p>
                <p className="text-xs mt-1">Be the first to start one!</p>
              </div>
            ) : (
              sortedDebates.map((debate) => (
                <Link
                  key={debate.id}
                  href={`/debate/${debate.id}`}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="badge-live">
                        <span className="live-dot w-1.5 h-1.5 bg-red-500 rounded-full" />
                        LIVE
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Eye size={12} /> {debate.viewers}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1 truncate">{debate.topic}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`avatar w-6 h-6 text-[10px] ${avatarColor(debate.forUser.id)}`}>
                          {debate.forUser.avatar}
                        </span>
                        <span className="text-xs font-medium text-blue-700">{debate.forUser.name}</span>
                        <span className="text-xs text-blue-500">(FOR)</span>
                      </div>
                      <span className="text-gray-400 text-xs">vs</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`avatar w-6 h-6 text-[10px] ${avatarColor(debate.againstUser.id)}`}>
                          {debate.againstUser.avatar}
                        </span>
                        <span className="text-xs font-medium text-red-700">{debate.againstUser.name}</span>
                        <span className="text-xs text-red-500">(AGAINST)</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 flex-shrink-0" />
                </Link>
              ))
            )}
          </div>

          {thread.debates.filter((d) => d.status === "ended").length > 0 && (
            <div className="border-t border-gray-100">
              <div className="px-5 py-2 bg-gray-50">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ended Debates</h3>
              </div>
              {thread.debates
                .filter((d) => d.status === "ended")
                .map((debate) => (
                  <Link
                    key={debate.id}
                    href={`/debate/${debate.id}`}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors border-t border-gray-50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge-ended">Ended</span>
                        {debate.aiSummary && (
                          <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                            AI Transcript
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-600">{debate.forUser.name}</span>
                        <span className="text-gray-400 text-xs">vs</span>
                        <span className="text-xs font-medium text-gray-600">{debate.againstUser.name}</span>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-gray-300 flex-shrink-0" />
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Matchmaking Modal */}
      {showMatchmaking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                <Swords size={20} className="text-[#F0A500]" />
                Start a Debate
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Choose your stance and you&apos;ll be matched with an opponent.
              </p>

              {matchmakingStep === "topic" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Select Topic</label>
                  <div className="space-y-2">
                    {topics.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setMatchmaking((p) => ({ ...p, label: t }));
                          setMatchmakingStep("side");
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-sm transition-colors"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchmakingStep === "side" && (
                <div>
                  <p className="text-sm text-gray-600 mb-1 font-medium">Topic:</p>
                  <p className="text-sm text-gray-800 bg-gray-50 rounded-lg px-3 py-2 mb-4">{matchmaking.label}</p>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Choose Your Side</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => { setMatchmaking((p) => ({ ...p, side: "for" })); setMatchmakingStep("waiting"); }}
                      className="px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                    >
                      👍 FOR
                    </button>
                    <button
                      onClick={() => { setMatchmaking((p) => ({ ...p, side: "against" })); setMatchmakingStep("waiting"); }}
                      className="px-4 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                    >
                      👎 AGAINST
                    </button>
                  </div>
                </div>
              )}

              {matchmakingStep === "waiting" && (
                <div className="text-center py-4">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="font-semibold text-gray-800 mb-1">Finding an opponent…</p>
                  <p className="text-sm text-gray-500 mb-1">Topic: <span className="font-medium">{matchmaking.label}</span></p>
                  <p className="text-sm text-gray-500 mb-4">
                    Your side:{" "}
                    <span className={`font-semibold ${matchmaking.side === "for" ? "text-blue-600" : "text-red-500"}`}>
                      {matchmaking.side === "for" ? "FOR 👍" : "AGAINST 👎"}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 italic">
                    Demo mode: In production, you&apos;ll be matched with a real user from the waitlist.
                    <br />
                    <Link href={`/debate/${thread.debates[0]?.id}`} className="text-blue-500 underline mt-1 inline-block">
                      View a live debate to see how it works →
                    </Link>
                  </p>
                </div>
              )}
            </div>
            <div className="px-6 pb-5 flex justify-between">
              {matchmakingStep !== "waiting" && (
                <button
                  onClick={() => {
                    if (matchmakingStep === "side") setMatchmakingStep("topic");
                    else setShowMatchmaking(false);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back
                </button>
              )}
              <button
                onClick={() => { setShowMatchmaking(false); setMatchmakingStep("topic"); setMatchmaking({ label: "", side: null }); }}
                className="ml-auto text-sm text-red-500 hover:text-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Outer page component ─────────────────────────────────────────────────────
export default function ThreadPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const thread = THREADS.find((t) => t.id === id);

  if (!thread) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-500">
        Thread not found.{" "}
        <Link href="/" className="text-blue-600 underline">Go home</Link>
      </div>
    );
  }

  return <ThreadView thread={thread} />;
}
