# Chirp – Civic Engagement Portal

<p align="center">
  <img src="public/chirp-logo.svg" width="100" alt="Chirp Logo" />
</p>

<p align="center">
  A non-partisan platform for citizen debate, civic education, and government transparency.
  <br />
  Built for the <strong>Governance & Collaboration</strong> track.
</p>

---

## The Problem

Democratic institutions are strained. Polarisation makes dialogue difficult. Civic participation is down. Communities can't coordinate around shared challenges.

Chirp addresses this by giving every citizen a structured, moderated space to debate issues, learn about policies, and hold their government accountable — all in one place.

---

## The Role of AI

AI is a core part of what makes Chirp usable at scale — not a bolt-on feature.

**Without AI, civic debate platforms fail because of information overload.** A single thread can generate dozens of debates, hundreds of arguments, and thousands of comments. No citizen has time to read all of that. AI solves this in two critical ways:

### 🤖 Debate Transcripts
After a live debate ends, AI reads the full exchange and produces a clean, structured summary — key arguments from the FOR side and the AGAINST side, in plain language. What would take a reader 10–15 minutes to parse is condensed into a 30-second read. Crucially, **AI never draws a conclusion** — it only surfaces what was said, leaving the judgement entirely to the citizen.

After the full 24-hour debate window closes, AI also aggregates arguments across *all* debates on a thread and surfaces the most common points from each side — giving the public a birds-eye view of the national conversation on an issue.

### 🤖 Civic Education Chatbot
Most citizens don't have time to read 50-page party manifestos or navigate the Election Commission website. The chatbot solves this instantly:
- Ask a question in plain language → get a clear, sourced answer in seconds
- Describe a problem you face → get told which leader has promised to address it
- Ask about voter rights, EVMs, or how to file a complaint → get step-by-step guidance

This lowers the barrier to informed participation dramatically. A first-time voter in a rural area gets the same quality of civic information as a political analyst in Delhi.

**In short: AI handles the heavy lifting of information processing so citizens can focus on forming opinions, not consuming raw data.**

---

## Features

### 🗣️ Online Debating
- **Daily threads** posted by admins on current issues — no full articles, just the facts
- **Split view** — comments on the left, live debates on the right
- **Matchmaking** — choose a topic and side (FOR / AGAINST), get paired with an opponent
- **Live debate rooms** — structured turn-by-turn exchanges visible to all viewers
- **Filters** — sort ongoing debates by viewer count or topic
- **AI Transcript** — after a debate ends, get an AI-generated summary of key arguments from both sides (no conclusion — the public decides)
- **AI Common Points** — after the 24-hour window closes, the most common arguments across all debates are surfaced automatically
- **Archive** — threads are preserved with full transcripts after expiry

### 📚 Civic Education Chatbot
- Ask about **party manifestos** (BJP, Congress, AAP, Samajwadi Party)
- **Problem-to-promise search** — describe an issue and find which leader addressed it
- Learn about **voter registration**, **voting rights**, **EVMs**, **NOTA**, **Model Code of Conduct**, and how to file election complaints
- Powered by pattern-matching on structured manifesto data (production: Claude/GPT API)

### 📊 Government Works Transparency
- Search ongoing and completed government projects by **location, MP/MLA name, state, or category**
- View **allocated vs. used budget**, **progress %**, and **project status**
- Delayed projects are flagged automatically
- Completion photos uploaded by contractors (framework in place)
- Data sourced from MPLADS, PM Gati Shakti, and state dashboards (demo uses structured dummy data)

### 🔐 Authentication & Admin
- Guest browsing — no login needed to read threads or view debates
- Login required only to participate in debates
- **Admin panel** — post new threads, manage users, update government works data
- Role-based access (admin vs. citizen)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Auth | localStorage (demo) → NextAuth.js (production) |
| Data | Structured dummy data → PostgreSQL + Prisma (production) |
| AI | Pattern matching (demo) → Claude / OpenAI API (production) |
| Real-time | Simulated (demo) → Socket.io / Supabase Realtime (production) |

---

## Getting Started

### Prerequisites
- Node.js v18 or higher

### Installation

```bash
git clone https://github.com/viraj-chauhan/chirp.git
cd chirp
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@civicportal.in | admin123 |
| Citizen – Delhi | rahul@demo.com | demo123 |
| Citizen – Mumbai | priya@demo.com | demo123 |
| Citizen – Bangalore | amit@demo.com | demo123 |
| Citizen – Chennai | sneha@demo.com | demo123 |

---

## Demo Walkthrough

### Debates
1. Home page → click any active thread → **Join Discussion**
2. Left panel: comments with likes and replies
3. Right panel: live debates sorted by viewer count — click any to watch
4. Click **Start / Join Debate** → choose topic → choose FOR or AGAINST → matchmaking
5. Go to the **UCC thread → Ended Debates → Vikram vs Sneha** → click **AI Transcript Summary**
6. Check the **Archive** page for the Electoral Bond thread with full AI common-points summary

### Education Chatbot
Try these queries:
- `How do I register to vote?`
- `What has BJP promised for healthcare?`
- `Which party promises free electricity?`
- `I have a problem with corruption`
- `Which leader promised MSP for farmers?`
- `What are my rights at the polling booth?`

### Transparency
- Search **"Barmer"** → 100% completed rural road connecting 28,000 villagers
- Filter **Status = Delayed** → Dwarka water pipeline stuck due to DMRC clearance
- Filter **State = Maharashtra** → Mumbai flyover and Powai sewage plant
- Filter **Category = Healthcare** → Jaipur hospital expansion (78% complete)

---

## Project Structure

```
chirp/
├── app/
│   ├── page.tsx              # Home – thread listings
│   ├── thread/[id]/page.tsx  # Thread detail – comments + debates split view
│   ├── debate/[id]/page.tsx  # Live debate room + AI transcript
│   ├── education/page.tsx    # Civic education chatbot
│   ├── transparency/page.tsx # Government works tracker
│   ├── login/page.tsx        # Authentication
│   ├── archive/page.tsx      # Expired threads
│   └── admin/page.tsx        # Admin panel
├── components/
│   └── Navbar.tsx
├── lib/
│   ├── data.ts               # All dummy data (threads, manifestos, govt works)
│   ├── types.ts              # TypeScript interfaces
│   └── auth-context.tsx      # Auth state management
└── public/
    └── chirp-logo.svg
```

---

## Ethical Safeguards

Chirp is built with the key ethical question in mind: *how could this tool be weaponised for manipulation?*

- **AI summaries never draw conclusions** — arguments are presented, judgement is left to citizens
- **Matchmaking is random** — no algorithmic steering toward particular viewpoints
- **Threads are factual briefs** — not full articles, to avoid framing bias
- **All AI-generated content is labelled** as such throughout the platform
- **Non-partisan by design** — equal representation of all major parties in the education module
- **Admin policy reminder** is built into the admin panel as a standing check

---

## Roadmap

- [ ] Real-time debate messaging (Socket.io / Supabase)
- [ ] Actual Claude API integration for transcript generation
- [ ] User registration & profiles
- [ ] ECI affidavit scraper for real manifesto data
- [ ] MPLADS API integration for live government works data
- [ ] Mobile app (React Native)
- [ ] Regional language support (Hindi, Tamil, Telugu, Bengali)
- [ ] Constituency-based thread filtering

---

## License

MIT
