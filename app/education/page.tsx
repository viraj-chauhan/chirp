"use client";

import { useState, useRef, useEffect } from "react";
import { LEADERS, VOTER_RIGHTS } from "@/lib/data";
import { Send, Bot, User, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

function findAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|hii+|helo|namaste|namaskar|good morning|good evening|good afternoon|good night|howdy|sup|what'?s up)[\s!?.]*$/.test(q)) {
    return `Hello! 👋 Welcome to **CivicBot** — your guide to Indian civic life.

I can help you with:
• **Voter registration & rights**
• **Party manifestos** – BJP, Congress, AAP, Samajwadi Party
• **Policy search** – tell me a problem, I'll find which leader addressed it

Type **help** to see everything I can do, or just ask away!`;
  }

  // Identity questions
  if (q.includes("who are you") || q.includes("what are you") || q.includes("what is civicbot") || q.includes("about you") || q.includes("introduce yourself")) {
    return `I'm **CivicBot** 🤖 — Chirp's civic education assistant.

I'm built to help Indian citizens stay informed about:
• Their **voting rights and registration** process
• **Party manifestos** and leader promises
• **Civic policies** – from healthcare to employment to education

I'm not a general AI — I specialise in Indian civic and electoral information. Ask me something specific and I'll do my best!`;
  }

  // How are you
  if (/how are you|how r u|how're you|you okay|you good/.test(q)) {
    return `I'm doing great, thanks for asking! 😊 Ready to help you navigate India's civic landscape.

What would you like to know today? You can ask me about voter rights, party manifestos, or type **help** for a full list of topics.`;
  }

  // Thank you
  if (/^(thanks|thank you|thank u|thanks a lot|thank you so much|ty|thx|cheers|great thanks)[\s!.]*$/.test(q)) {
    return `You're welcome! 🙏 Feel free to ask anything else about voter rights, manifestos, or civic policies. I'm here to help!`;
  }

  // Goodbye
  if (/^(bye|goodbye|good bye|see you|see ya|take care|ciao|later|ttyl)[\s!.]*$/.test(q)) {
    return `Goodbye! 👋 Stay informed, stay engaged — every vote matters. Come back anytime you have questions about civic life in India!`;
  }

  // I need help / general help (exact phrase only, so "i need help regarding X" falls through)
  if (/^(i need help|need help|can you help me|help me|assist me|i'm lost|i am lost)[\s!?.]*$/.test(q)) {
    return HELP_MESSAGE;
  }

  // ── Smart keyword extraction ──────────────────────────────────────────────
  // Strip filler/stop words so "my problem is jobs" → ["jobs"]
  const STOP_WORDS = new Set([
    "i", "my", "me", "we", "our", "us", "the", "a", "an",
    "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "do", "does", "did",
    "will", "would", "could", "should", "shall", "may", "might", "must",
    "need", "want", "like", "get", "got",
    "help", "regarding", "about", "tell", "show", "give", "know", "find",
    "what", "which", "who", "how", "when", "where", "why",
    "that", "this", "these", "those",
    "and", "or", "but", "if", "of", "to", "for", "in", "on", "at",
    "by", "with", "from", "up", "as", "it", "its", "him", "her",
    "their", "please", "can", "you", "your", "some", "any", "all",
    "let", "just", "very", "much", "more", "most", "so", "also",
    "related", "topic", "topics", "question", "information", "info",
    "detail", "details", "problem", "issue", "concern", "thing", "things",
  ]);

  const queryWords = q
    .replace(/[?!.,]/g, "")
    .split(/\s+/)
    .filter((w) => w.length >= 2 && !STOP_WORDS.has(w));

  // Word-boundary keyword matcher — prevents "st" matching inside "manifesto"
  const matchKeyword = (keyword: string): boolean => {
    const kw = keyword.toLowerCase();
    // 1. Exact word-boundary match in the full query
    try {
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (new RegExp(`\\b${escaped}\\b`).test(q)) return true;
    } catch {}
    // 2. Prefix/stem match via extracted words (handles "job"↔"jobs", "employ"↔"employment")
    return queryWords.some((w) => {
      if (w === kw) return true;
      const minLen = Math.min(w.length, kw.length);
      if (minLen >= 4 && (kw.startsWith(w) || w.startsWith(kw))) return true;
      return false;
    });
  };

  // ── Intent signals ────────────────────────────────────────────────────────
  const isManifestoQuery = [
    "manifesto", "promise", "promis", "policy", "policies", "party",
    "leader", "bjp", "congress", "aap", "sp", "samajwadi",
    "modi", "kejriwal", "kharge", "akhilesh", "rahul", "gandhi",
  ].some((w) => q.includes(w));

  const isVoterQuery = [
    "vote", "voter", "voting", "election", "register", "registration",
    "evm", "complaint", "booth", "polling", "ballot", "mcc", "nota",
  ].some((w) => q.includes(w));

  // ── Leader lookup (always runs first) ────────────────────────────────────
  const leaderMatch = LEADERS.find(
    (l) =>
      q.includes(l.name.toLowerCase()) ||
      q.includes(l.party.toLowerCase().split("(")[0].trim().toLowerCase()) ||
      (l.party.includes("BJP") && (q.includes("bjp") || q.includes("modi"))) ||
      (l.party.includes("Congress") && (q.includes("congress") || q.includes("kharge"))) ||
      (l.party.includes("AAP") && (q.includes("aap") || q.includes("kejriwal"))) ||
      (l.party.includes("Samajwadi") && (q.includes("sp") || q.includes("akhilesh") || q.includes("samajwadi")))
  );

  if (leaderMatch) {
    const lines = [
      `**${leaderMatch.name} – ${leaderMatch.party}**`,
      `*Position: ${leaderMatch.position} | Constituency: ${leaderMatch.constituency}*`,
      "",
      "**Key Manifesto Promises:**",
      ...leaderMatch.manifesto.map(
        (m, i) => `${i + 1}. **${m.category}:** ${m.promise}\n   ${m.detail}`
      ),
    ];
    return lines.join("\n");
  }

  // ── Manifesto keyword search ──────────────────────────────────────────────
  const allManifestoItems = LEADERS.flatMap((l) =>
    l.manifesto.map((m) => ({ leader: l, item: m }))
  );

  const manifMatches = allManifestoItems.filter(({ item }) =>
    item.keywords.some((kw) => matchKeyword(kw))
  );

  // ── Voter rights keyword search ───────────────────────────────────────────
  const voterMatch = VOTER_RIGHTS.find((item) =>
    item.keywords.some((kw) => matchKeyword(kw))
  );

  // ── Priority routing ──────────────────────────────────────────────────────
  // Manifesto intent → show manifesto results first
  if (isManifestoQuery && manifMatches.length > 0) {
    const lines = [
      `**Manifesto promises related to your query:**`,
      "",
      ...manifMatches.map(
        ({ leader, item }) =>
          `📌 **${leader.name} (${leader.party.split("(")[1]?.replace(")", "") || leader.party}):**\n   ${item.promise}\n   ↳ ${item.detail}`
      ),
    ];
    return lines.join("\n\n");
  }

  // Voter intent → show voter rights first
  if (isVoterQuery && voterMatch) {
    return voterMatch.answer;
  }

  // No strong intent signal → topic/problem search: manifesto first, voter fallback
  if (manifMatches.length > 0) {
    const lines = [
      `**Manifesto promises related to your query:**`,
      "",
      ...manifMatches.map(
        ({ leader, item }) =>
          `📌 **${leader.name} (${leader.party.split("(")[1]?.replace(")", "") || leader.party}):**\n   ${item.promise}\n   ↳ ${item.detail}`
      ),
    ];
    return lines.join("\n\n");
  }

  if (voterMatch) {
    return voterMatch.answer;
  }

  // ── Fallback ──────────────────────────────────────────────────────────────
  if (q.includes("help") || q.includes("what can") || q.length < 3) {
    return HELP_MESSAGE;
  }

  return `I couldn't find specific information about "${query}" in my database. Try asking about:

• **Voter registration** – how to register, documents needed
• **Voting rights** – your rights at the polling booth
• **Leader manifesto** – e.g. "What has BJP promised for healthcare?"
• **Policy search** – e.g. "Which leader promised free electricity?"
• **Voter complaints** – how to report election violations
• **EVM** – how electronic voting machines work
• **Model Code of Conduct** – what is allowed during elections

Type **help** to see all available topics.`;
}

const HELP_MESSAGE = `**Welcome to Chirp's Civic Education Chatbot!** 🗳️

I can help you with:

**📋 Voter Information**
• How to register as a voter
• Your rights at the polling booth
• How to use NOTA
• Filing election complaints

**📜 Leader Manifestos**
• BJP (Narendra Modi) – promises on jobs, health, infrastructure
• Congress (Mallikarjun Kharge) – NYAY, MSP guarantee, govt jobs
• AAP (Arvind Kejriwal) – free electricity, water, Mohalla Clinics
• Samajwadi Party (Akhilesh Yadav) – UP jobs, farmer loan waiver

**🔍 Problem-to-Promise Search**
Tell me a problem and I'll tell you which leader has addressed it!

**Try these demo queries:**
• "How do I register to vote?"
• "What has Modi promised for healthcare?"
• "Which party promises free electricity?"
• "Tell me about the Electoral Bond scheme"
• "What is a Mohalla Clinic?"
• "I have a problem with corruption"
• "What did Kejriwal promise for schools?"`;

const QUICK_PROMPTS = [
  "How do I register to vote?",
  "What has BJP promised for employment?",
  "Which leader promised free electricity?",
  "What is Mohalla Clinic?",
  "What are my rights at the polling booth?",
  "Tell me about Congress manifesto",
  "I want to complain about election violations",
  "Which leader promised MSP for farmers?",
];

export default function EducationPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: HELP_MESSAGE,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [showManifestos, setShowManifestos] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const query = (text ?? input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    const answer = findAnswer(query);
    const botMsg: Message = {
      id: `b-${Date.now()}`,
      role: "bot",
      content: answer,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const renderContent = (content: string) => {
    // Simple markdown-like renderer
    return content.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**") && !line.slice(2, -2).includes("**")) {
        return <p key={i} className="font-bold text-gray-900 mt-2">{line.slice(2, -2)}</p>;
      }
      // Bold inline
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*") && !part.slice(1, -1).includes("*")) {
          return <em key={j} className="text-gray-500">{part.slice(1, -1)}</em>;
        }
        return <span key={j}>{part}</span>;
      });
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} className="leading-relaxed">{rendered}</p>;
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2D7D7E] to-[#236969] text-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen size={24} className="text-[#F0A500]" />
          <h1 className="text-2xl font-bold">Civic Education Centre</h1>
        </div>
        <p className="text-white/80 text-sm">
          Ask about voter rights, party manifestos, or enter a problem to find which leader promised a solution.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {/* Chat */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col" style={{ height: "600px" }}>
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
            <Bot size={18} className="text-blue-600" />
            <span className="font-semibold text-gray-800">CivicBot</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-auto">Online</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === "bot"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-[#F0A500] text-white"
                  }`}
                >
                  {msg.role === "bot" ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                    msg.role === "user"
                      ? "bg-[#2D7D7E] text-white"
                      : "bg-gray-50 text-gray-800 border border-gray-100"
                  }`}
                >
                  {msg.role === "bot" ? renderContent(msg.content) : msg.content}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about manifestos, voter rights, policies…"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <button
                onClick={() => sendMessage()}
                className="px-3 py-2 bg-[#2D7D7E] text-white rounded-lg hover:bg-[#236969] transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick prompts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Try These Questions</h3>
            <div className="space-y-1.5">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="w-full text-left text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-2 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Manifesto reference */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => setShowManifestos(!showManifestos)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
              <span className="text-sm font-bold text-gray-700">Manifesto Quick Reference</span>
              {showManifestos ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showManifestos && (
              <div className="border-t border-gray-100 divide-y divide-gray-50">
                {LEADERS.map((leader) => (
                  <div key={leader.id} className="px-4 py-3">
                    <p className="text-xs font-bold text-gray-800">{leader.name}</p>
                    <p className="text-xs text-gray-500 mb-2">{leader.party}</p>
                    <ul className="space-y-1">
                      {leader.manifesto.slice(0, 3).map((m) => (
                        <li key={m.id} className="text-xs text-gray-600">
                          • <span className="font-medium">{m.category}:</span> {m.promise}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
