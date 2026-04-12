import Link from "next/link";
import { THREADS } from "@/lib/data";
import { Archive, MessageSquare, Users, BarChart2, ArrowRight } from "lucide-react";

export default function ArchivePage() {
  const archivedThreads = THREADS.filter((t) => t.status === "archived");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Archive size={24} className="text-gray-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Archived Threads</h1>
          <p className="text-sm text-gray-500">Debates that have ended. Full transcripts and AI summaries available.</p>
        </div>
      </div>

      {archivedThreads.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-400">
          <Archive size={40} className="mx-auto mb-3 opacity-30" />
          <p>No archived threads yet. Check back after active threads expire.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {archivedThreads.map((thread) => {
            const endedDebates = thread.debates.filter((d) => d.status === "ended");
            const hasAiSummary = thread.commonPointsSummary !== undefined;

            return (
              <div
                key={thread.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {thread.category}
                    </span>
                    <span className="badge-ended">Archived</span>
                    {hasAiSummary && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <BarChart2 size={11} /> AI Summary Available
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 mb-2">{thread.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{thread.description}</p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {thread.tags.map((tag) => (
                      <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MessageSquare size={13} /> {thread.comments.length} comments
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={13} /> {endedDebates.length} debates
                    </span>
                  </div>

                  <Link
                    href={`/thread/${thread.id}`}
                    className="flex items-center gap-1 text-sm font-semibold text-[#2D7D7E] hover:text-[#D4920A] transition-colors"
                  >
                    View Thread <ArrowRight size={15} />
                  </Link>
                </div>

                {/* AI Common Points Summary */}
                {hasAiSummary && thread.commonPointsSummary && (
                  <div className="px-5 py-4 border-t border-purple-100 bg-purple-50">
                    <p className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-3 flex items-center gap-1">
                      <BarChart2 size={13} /> AI Summary – Most Common Arguments from All Debates
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-blue-700 mb-1.5">FOR 👍</p>
                        <ul className="space-y-1">
                          {thread.commonPointsSummary.forPoints.map((p, i) => (
                            <li key={i} className="text-xs text-gray-700 flex gap-1.5">
                              <span className="text-blue-400 flex-shrink-0">•</span> {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-red-700 mb-1.5">AGAINST 👎</p>
                        <ul className="space-y-1">
                          {thread.commonPointsSummary.againstPoints.map((p, i) => (
                            <li key={i} className="text-xs text-gray-700 flex gap-1.5">
                              <span className="text-red-400 flex-shrink-0">•</span> {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-gray-500 hover:text-[#2D7D7E] underline underline-offset-2">
          ← Back to Active Threads
        </Link>
      </div>
    </div>
  );
}
