"use client";

import { useState } from "react";
import Link from "next/link";
import { THREADS } from "@/lib/data";
import { Eye, ArrowLeft, CheckCircle2, FileText, ChevronDown, ChevronUp } from "lucide-react";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor(diff / 60000);
  if (h >= 1) return `${h}h ago`;
  if (m < 1) return "just now";
  return `${m}m ago`;
}

const AVATAR_COLORS = [
  "bg-blue-600", "bg-purple-600", "bg-green-600",
  "bg-rose-600", "bg-amber-600", "bg-cyan-600",
];
function avatarColor(id: string) {
  return AVATAR_COLORS[id.charCodeAt(id.length - 1) % AVATAR_COLORS.length];
}

export default function DebatePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [showTranscript, setShowTranscript] = useState(false);

  // Find the debate across all threads
  let debate = null;
  let parentThread = null;
  for (const thread of THREADS) {
    const found = thread.debates.find((d) => d.id === id);
    if (found) {
      debate = found;
      parentThread = thread;
      break;
    }
  }

  if (!debate || !parentThread) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-500">
        Debate not found.{" "}
        <Link href="/" className="text-blue-600 underline">
          Go home
        </Link>
      </div>
    );
  }

  const isEnded = debate.status === "ended";

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Back */}
      <Link
        href={`/thread/${parentThread.id}`}
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <ArrowLeft size={15} /> Back to Thread
      </Link>

      {/* Debate Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-5">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            {isEnded ? (
              <span className="badge-ended">Ended</span>
            ) : (
              <span className="badge-live">
                <span className="live-dot w-1.5 h-1.5 bg-red-500 rounded-full" /> LIVE
              </span>
            )}
            {!isEnded && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Eye size={12} /> {debate.viewers} watching
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">
            Re: <span className="font-medium">{parentThread.title}</span>
          </span>
        </div>

        <h1 className="text-lg font-bold text-gray-900 mb-4">{debate.topic}</h1>

        {/* Debaters */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-1">
              <span className={`avatar w-9 h-9 ${avatarColor(debate.forUser.id)}`}>
                {debate.forUser.avatar}
              </span>
              <div>
                <p className="text-sm font-bold text-gray-800">{debate.forUser.name}</p>
                <p className="text-xs font-semibold text-blue-600">👍 FOR</p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <div className="flex items-center gap-2 mb-1">
              <span className={`avatar w-9 h-9 ${avatarColor(debate.againstUser.id)}`}>
                {debate.againstUser.avatar}
              </span>
              <div>
                <p className="text-sm font-bold text-gray-800">{debate.againstUser.name}</p>
                <p className="text-xs font-semibold text-red-500">👎 AGAINST</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-5">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-600">
            Debate Transcript – {debate.messages.length} exchanges
          </h2>
        </div>
        <div className="divide-y divide-gray-50">
          {debate.messages.map((msg, idx) => {
            const isFor = msg.side === "for";
            return (
              <div
                key={msg.id}
                className={`p-4 ${isFor ? "debate-for" : "debate-against"}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className={`avatar w-8 h-8 ${avatarColor(msg.userId)}`}>
                      {isFor ? debate.forUser.avatar : debate.againstUser.avatar}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-bold text-gray-800">{msg.userName}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          isFor
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {isFor ? "FOR" : "AGAINST"}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{timeAgo(msg.timestamp)}</span>
                      <span className="text-xs text-gray-400">#{idx + 1}</span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!isEnded && (
          <div className="px-5 py-4 bg-yellow-50 border-t border-yellow-100">
            <p className="text-xs text-yellow-700 text-center">
              🔴 This debate is live. New messages appear as the debaters respond.
              <br />
              <span className="text-gray-500">(Live updates are simulated in the demo)</span>
            </p>
          </div>
        )}
      </div>

      {/* AI Transcript (for ended debates) */}
      {isEnded && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-purple-600" />
              <span className="font-bold text-gray-800">
                {debate.aiSummary ? "AI Transcript Summary" : "Transcript Summary (Unavailable)"}
              </span>
              {debate.aiSummary && (
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                  AI Generated
                </span>
              )}
            </div>
            {showTranscript ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {showTranscript && debate.aiSummary && (
            <div className="px-5 pb-5 border-t border-gray-100">
              <p className="text-xs text-gray-500 italic mt-3 mb-4">
                The AI has summarised the key arguments from both sides. This is not a conclusion –
                draw your own judgement.
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <h4 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-1">
                    👍 Arguments FOR
                  </h4>
                  <ul className="space-y-2">
                    {debate.aiSummary.forPoints.map((p, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <CheckCircle2 size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <h4 className="text-sm font-bold text-red-800 mb-3 flex items-center gap-1">
                    👎 Arguments AGAINST
                  </h4>
                  <ul className="space-y-2">
                    {debate.aiSummary.againstPoints.map((p, i) => (
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

          {showTranscript && !debate.aiSummary && (
            <div className="px-5 pb-5 border-t border-gray-100">
              <p className="text-sm text-gray-500 mt-3">
                AI summary is not available for this debate.
              </p>
            </div>
          )}
        </div>
      )}

      {isEnded && !debate.aiSummary && (
        <div className="mt-4 bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
          <FileText size={24} className="mx-auto text-purple-400 mb-2" />
          <p className="text-sm font-semibold text-purple-700 mb-1">Get AI Transcript</p>
          <p className="text-xs text-gray-500">
            AI summary generation is available after debate ends.
            (Demo: summary not pre-generated for this debate.)
          </p>
        </div>
      )}
    </div>
  );
}
