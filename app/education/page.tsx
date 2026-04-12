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

  // Voter rights / general civics
  for (const item of VOTER_RIGHTS) {
    if (item.keywords.some((kw) => q.includes(kw.toLowerCase()))) {
      return item.answer;
    }
  }

  // Leader lookup
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

  // Problem → leader matching
  const allManifestoItems = LEADERS.flatMap((l) =>
    l.manifesto.map((m) => ({ leader: l, item: m }))
  );

  const matches = allManifestoItems.filter(({ item }) =>
    item.keywords.some((kw) => q.includes(kw.toLowerCase()))
  );

  if (matches.length > 0) {
    const lines = [
      `**Manifesto promises related to "${query}":**`,
      "",
      ...matches.map(
        ({ leader, item }) =>
          `📌 **${leader.name} (${leader.party.split("(")[1]?.replace(")", "") || leader.party}):**\n   ${item.promise}\n   ↳ ${item.detail}`
      ),
    ];
    return lines.join("\n\n");
  }

  // Fallback suggestions
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
