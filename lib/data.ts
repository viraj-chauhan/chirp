import type { Thread, User, GovernmentWork, Leader } from "./types";

// ─── USERS ────────────────────────────────────────────────────────────────────
export const USERS: User[] = [
  {
    id: "admin-1",
    name: "Admin Team",
    email: "admin@civicportal.in",
    password: "admin123",
    avatar: "AT",
    location: "New Delhi",
    isAdmin: true,
  },
  {
    id: "u-1",
    name: "Rahul Sharma",
    email: "rahul@demo.com",
    password: "demo123",
    avatar: "RS",
    location: "New Delhi",
    isAdmin: false,
  },
  {
    id: "u-2",
    name: "Priya Patel",
    email: "priya@demo.com",
    password: "demo123",
    avatar: "PP",
    location: "Mumbai",
    isAdmin: false,
  },
  {
    id: "u-3",
    name: "Amit Kumar",
    email: "amit@demo.com",
    password: "demo123",
    avatar: "AK",
    location: "Bangalore",
    isAdmin: false,
  },
  {
    id: "u-4",
    name: "Sneha Gupta",
    email: "sneha@demo.com",
    password: "demo123",
    avatar: "SG",
    location: "Chennai",
    isAdmin: false,
  },
  {
    id: "u-5",
    name: "Vikram Singh",
    email: "vikram@demo.com",
    password: "demo123",
    avatar: "VS",
    location: "Jaipur",
    isAdmin: false,
  },
];

// ─── THREADS ──────────────────────────────────────────────────────────────────
export const THREADS: Thread[] = [
  // ── Thread 1: UCC ─────────────────────────────────────────────────────────
  {
    id: "t-1",
    title: "Uniform Civil Code – A Step Forward or Threat to Diversity?",
    description:
      "The central government has reiterated its push for implementing the Uniform Civil Code (UCC) across India. Uttarakhand has become the first state to enact UCC legislation. Proponents argue it ensures gender equality and national unity. Critics say it threatens the religious and cultural autonomy of minority communities guaranteed under the Constitution.",
    category: "Law & Governance",
    postedBy: "Admin Team",
    postedAt: "2026-04-12T06:00:00Z",
    deadlineAt: "2026-04-13T06:00:00Z",
    status: "active",
    tags: ["UCC", "Constitution", "Minorities", "Gender Equality"],
    comments: [
      {
        id: "c-1",
        threadId: "t-1",
        userId: "u-1",
        userName: "Rahul Sharma",
        userAvatar: "RS",
        content:
          "UCC is essential for true secularism. How can we have different personal laws for different religions? The Supreme Court itself has recommended it multiple times.",
        likes: 34,
        likedBy: ["u-2", "u-3", "u-5"],
        timestamp: "2026-04-12T07:15:00Z",
        replies: [
          {
            id: "r-1",
            userId: "u-2",
            userName: "Priya Patel",
            userAvatar: "PP",
            content:
              "I agree on gender equality, but implementation details matter a lot. Whose 'uniform' code will it be based on?",
            likes: 18,
            likedBy: ["u-4"],
            timestamp: "2026-04-12T07:45:00Z",
          },
        ],
      },
      {
        id: "c-2",
        threadId: "t-1",
        userId: "u-4",
        userName: "Sneha Gupta",
        userAvatar: "SG",
        content:
          "This feels like cultural homogenisation disguised as reform. India's diversity is its strength, not a problem to be solved.",
        likes: 27,
        likedBy: ["u-2"],
        timestamp: "2026-04-12T08:30:00Z",
        replies: [
          {
            id: "r-2",
            userId: "u-3",
            userName: "Amit Kumar",
            userAvatar: "AK",
            content:
              "But what about Muslim women suffering under triple talaq? Diversity cannot mean tolerating injustice.",
            likes: 22,
            likedBy: ["u-1"],
            timestamp: "2026-04-12T09:00:00Z",
          },
        ],
      },
      {
        id: "c-3",
        threadId: "t-1",
        userId: "u-5",
        userName: "Vikram Singh",
        userAvatar: "VS",
        content:
          "We need a national consultation process. Just legislating this top-down will create resentment and social unrest.",
        likes: 41,
        likedBy: ["u-1", "u-2", "u-3", "u-4"],
        timestamp: "2026-04-12T10:00:00Z",
        replies: [],
      },
    ],
    debates: [
      {
        id: "d-1",
        threadId: "t-1",
        topic: "Should UCC be implemented across India?",
        forUser: { id: "u-1", name: "Rahul Sharma", avatar: "RS" },
        againstUser: { id: "u-2", name: "Priya Patel", avatar: "PP" },
        viewers: 243,
        status: "live",
        startTime: "2026-04-12T08:00:00Z",
        messages: [
          {
            id: "m-1",
            userId: "u-1",
            userName: "Rahul Sharma",
            side: "for",
            content:
              "The existence of separate personal laws is fundamentally unconstitutional – it violates Article 14 (right to equality). A Muslim woman and a Hindu woman should have equal rights in divorce and inheritance.",
            timestamp: "2026-04-12T08:01:00Z",
          },
          {
            id: "m-2",
            userId: "u-2",
            userName: "Priya Patel",
            side: "against",
            content:
              "Article 25 guarantees freedom of religion, which includes following religious laws in personal matters. The Constitution itself envisions UCC as a Directive Principle – aspirational, not mandatory.",
            timestamp: "2026-04-12T08:04:00Z",
          },
          {
            id: "m-3",
            userId: "u-1",
            userName: "Rahul Sharma",
            side: "for",
            content:
              "Directive Principles are meant to be achieved progressively. 76 years is enough time. Also, Goa has had a uniform civil code since the Portuguese era and it works fine.",
            timestamp: "2026-04-12T08:08:00Z",
          },
          {
            id: "m-4",
            userId: "u-2",
            userName: "Priya Patel",
            side: "against",
            content:
              "Goa is an exception with a unique historical context. The tribal communities of Northeast India have explicitly said UCC threatens their customary laws – these are protected under the Sixth Schedule.",
            timestamp: "2026-04-12T08:12:00Z",
          },
          {
            id: "m-5",
            userId: "u-1",
            userName: "Rahul Sharma",
            side: "for",
            content:
              "Exceptions and exemptions can be built into the code. The goal is to protect vulnerable individuals within communities – especially women – not erase identity.",
            timestamp: "2026-04-12T08:16:00Z",
          },
          {
            id: "m-6",
            userId: "u-2",
            userName: "Priya Patel",
            side: "against",
            content:
              "Who defines what is 'uniform'? If it's based on Hindu law, that's majoritarianism dressed as reform. True equality needs community-led reform, not state imposition.",
            timestamp: "2026-04-12T08:20:00Z",
          },
        ],
        aiSummary: undefined,
      },
      {
        id: "d-2",
        threadId: "t-1",
        topic: "Should UCC be implemented across India?",
        forUser: { id: "u-3", name: "Amit Kumar", avatar: "AK" },
        againstUser: { id: "u-4", name: "Sneha Gupta", avatar: "SG" },
        viewers: 178,
        status: "live",
        startTime: "2026-04-12T09:30:00Z",
        messages: [
          {
            id: "m-7",
            userId: "u-3",
            userName: "Amit Kumar",
            side: "for",
            content:
              "India cannot claim to be a modern democracy while allowing practices like polygamy to continue under religious personal law. UCC is a step toward genuine equality.",
            timestamp: "2026-04-12T09:31:00Z",
          },
          {
            id: "m-8",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "against",
            content:
              "Polygamy is already restricted in practice. The government should focus on enforcing existing laws. UCC is being used as a political tool rather than a genuine reform measure.",
            timestamp: "2026-04-12T09:35:00Z",
          },
          {
            id: "m-9",
            userId: "u-3",
            userName: "Amit Kumar",
            side: "for",
            content:
              "Even if enforcement improves, the legal framework is inconsistent. A uniform framework creates clarity and removes loopholes.",
            timestamp: "2026-04-12T09:39:00Z",
          },
          {
            id: "m-10",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "against",
            content:
              "The timing matters – this push comes right before elections every time. Real reform requires consensus. Have any minority communities been meaningfully consulted?",
            timestamp: "2026-04-12T09:43:00Z",
          },
        ],
        aiSummary: undefined,
      },
      {
        id: "d-3",
        threadId: "t-1",
        topic: "Should UCC be implemented across India?",
        forUser: { id: "u-5", name: "Vikram Singh", avatar: "VS" },
        againstUser: { id: "u-4", name: "Sneha Gupta", avatar: "SG" },
        viewers: 0,
        status: "ended",
        startTime: "2026-04-11T14:00:00Z",
        endTime: "2026-04-11T15:00:00Z",
        messages: [
          {
            id: "m-11",
            userId: "u-5",
            userName: "Vikram Singh",
            side: "for",
            content:
              "A secular state cannot have one set of laws for Hindus, another for Muslims, and yet another for Christians in matters of marriage, divorce, and inheritance. Article 44 of our own Constitution directs the state to secure a Uniform Civil Code. After 76 years of independent India, this is not aspirational — it is overdue. True equality under the law demands it.",
            timestamp: "2026-04-11T14:01:00Z",
          },
          {
            id: "m-12",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "against",
            content:
              "Article 44 is a Directive Principle — non-justiciable and explicitly aspirational. Meanwhile, Article 25 is a Fundamental Right guaranteeing freedom of religion, which courts have consistently held includes following one's personal religious law in family matters. You cannot override a Fundamental Right with a Directive Principle. The Constitution's framers knew the tension and deliberately kept UCC aspirational.",
            timestamp: "2026-04-11T14:06:00Z",
          },
          {
            id: "m-47",
            userId: "u-5",
            userName: "Vikram Singh",
            side: "for",
            content:
              "Then let us talk about the women bearing the cost of this 'aspiration'. Under Muslim personal law, a husband could unilaterally divorce his wife by saying talaq three times. A woman could be left with no home, no maintenance, and no recourse. The Shayara Bano case forced Parliament to act — but that was one practice. Polygamy, unequal inheritance, and the lack of a clear maintenance framework still remain. UCC is the only systemic fix.",
            timestamp: "2026-04-11T14:11:00Z",
          },
          {
            id: "m-48",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "against",
            content:
              "Triple talaq was criminalized in 2019 without UCC. That is precisely my point — targeted, specific reform works and is far less disruptive than a wholesale replacement of all personal laws. The same approach can address polygamy and inheritance disparities. Community-driven legal reform, not state imposition, creates durable change. You are using genuine women's grievances to push through a politically convenient blanket solution.",
            timestamp: "2026-04-11T14:16:00Z",
          },
          {
            id: "m-49",
            userId: "u-5",
            userName: "Vikram Singh",
            side: "for",
            content:
              "Goa has had a Uniform Civil Code since the Portuguese Civil Code of 1867 — adopted as national law under Article 44 after liberation. Multiple religions, including Hindus, Muslims, Catholics, and tribal communities, have lived under it for over 150 years. Has Goa collapsed into cultural uniformity? No. It is proof that a common civil law and religious diversity can absolutely coexist in India.",
            timestamp: "2026-04-11T14:21:00Z",
          },
          {
            id: "m-50",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "against",
            content:
              "Goa's code has documented flaws — it still permits polygamy for Hindu men under certain circumstances, and its treatment of communidade land rights has been contested for decades. More importantly, Goa was a colony under Portuguese law for centuries; that historical context cannot be replicated nationally. And critically, the tribal communities of Nagaland, Meghalaya, and Mizoram have their customary laws constitutionally protected under the Sixth Schedule. UCC would bulldoze over those protections.",
            timestamp: "2026-04-11T14:26:00Z",
          },
          {
            id: "m-51",
            userId: "u-5",
            userName: "Vikram Singh",
            side: "for",
            content:
              "The Supreme Court has repeatedly called for UCC implementation — in Shah Bano (1985), Sarla Mudgal (1995), John Vallamattom (2003), and most recently in 2019. These were not political statements; these were constitutional courts recognizing a gap in India's commitment to equal citizenship. When the highest court of the land has asked Parliament to act four separate times across four decades, the democratic mandate is clear.",
            timestamp: "2026-04-11T14:31:00Z",
          },
          {
            id: "m-52",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "against",
            content:
              "Those Supreme Court observations were obiter dicta — remarks not binding in law. And when the Law Commission of India was formally asked to study this in 2018, it concluded that UCC is 'neither necessary nor desirable at this stage.' The Commission — the government's own legal advisory body — recommended that discrimination within personal laws be addressed through amendment, not unification. Why are we ignoring that finding?",
            timestamp: "2026-04-11T14:36:00Z",
          },
          {
            id: "m-53",
            userId: "u-5",
            userName: "Vikram Singh",
            side: "for",
            content:
              "Because the Law Commission's 2018 report reflected the political caution of that moment, not a definitive legal conclusion. Uttarakhand enacted a UCC in 2024 — India's first state-level code — covering marriage, divorce, inheritance, and live-in relationships uniformly across all religions. There was no violence, no mass protests, no social breakdown. It is working. Other states and the Centre should follow.",
            timestamp: "2026-04-11T14:41:00Z",
          },
          {
            id: "m-54",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "against",
            content:
              "Uttarakhand's UCC explicitly excluded Scheduled Tribes — carving out exemptions for political convenience while claiming universal application. It was drafted in months, without a single meaningful public consultation with Muslim, Christian, or tribal stakeholders. Every state that enacted it is BJP-governed; this is not legal reform, it is electoral signalling. If the intent were genuine equity, the government would have set up a national constitutional commission with full cross-community representation.",
            timestamp: "2026-04-11T14:46:00Z",
          },
          {
            id: "m-55",
            userId: "u-5",
            userName: "Vikram Singh",
            side: "for",
            content:
              "You are conflating the current government's political motivations with the principle itself. The right argument is not whether UCC is politically inconvenient right now — it is whether every Indian citizen deserves identical legal protection in family matters regardless of their religion. My answer is yes. A Muslim woman, a Hindu woman, and a Christian woman should all have the same right to divorce, to maintenance, to inherit equally. Anything less is institutionalized inequality.",
            timestamp: "2026-04-11T14:51:00Z",
          },
          {
            id: "m-56",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "against",
            content:
              "I want that equality too — but the path matters as much as the destination. India's secularism has always meant equal respect for all religions, not the erasure of religious difference from law. Impose a code without community buy-in, and you will harden identities, fuel separatism, and undermine the very national unity you claim to seek. Lasting reform in a pluralist democracy must be earned through dialogue, consultation, and consensus — not legislated from above in an election year.",
            timestamp: "2026-04-11T14:57:00Z",
          },
        ],
        aiSummary: {
          forPoints: [
            "UCC is a constitutional mandate under Article 44 and a prerequisite for genuine gender equality — Muslim women still face discriminatory inheritance, divorce, and polygamy practices that only a uniform code can fully address",
            "Goa's century-old Uniform Civil Code proves religious harmony and a common civil law can coexist; multiple faiths live under it without cultural erasure",
            "The Supreme Court has called for UCC implementation in four landmark judgments (Shah Bano, Sarla Mudgal, John Vallamattom, 2019) — the democratic and constitutional mandate is unambiguous",
            "True secularism means the state applies the same law to every citizen regardless of religion; maintaining separate personal laws institutionalizes inequality and contradicts equal citizenship",
          ],
          againstPoints: [
            "Article 25 (Fundamental Right to religious freedom) cannot be overridden by Article 44 (a non-justiciable Directive Principle); targeted reform — as with the triple talaq ban — is both constitutional and more effective",
            "The Law Commission of India (2018) formally concluded UCC is 'neither necessary nor desirable'; Uttarakhand's implementation excluded Scheduled Tribes and lacked any meaningful cross-community consultation",
            "Northeast tribal communities' customary laws carry constitutional protection under the Sixth Schedule — national UCC risks overriding these protections and fuelling separatist sentiment",
            "The political timing — UCC bills in BJP-ruled states ahead of elections, no national commission, no minority stakeholder consultation — suggests electoral signalling over genuine legal reform",
          ],
        },
      },
    ],
    commonPointsSummary: undefined,
  },
  // ── Thread 2: Fuel Prices ─────────────────────────────────────────────────
  {
    id: "t-2",
    title: "Rising Fuel Prices – Who Bears the Real Burden?",
    description:
      "Petrol and diesel prices have remained elevated across major cities, with petrol crossing ₹105/litre in several states after state tax revisions. Opposition parties blame central taxes that constitute nearly 55% of the pump price, while the government points to global crude oil market volatility. The burden on the middle class and transporters is significant.",
    category: "Economy",
    postedBy: "Admin Team",
    postedAt: "2026-04-12T05:00:00Z",
    deadlineAt: "2026-04-13T05:00:00Z",
    status: "active",
    tags: ["Fuel", "Taxation", "Economy", "Inflation"],
    comments: [
      {
        id: "c-4",
        threadId: "t-2",
        userId: "u-3",
        userName: "Amit Kumar",
        userAvatar: "AK",
        content:
          "Central excise on petrol is ₹19.90/litre and states add another ₹20-30. Together that's 40-50% of the pump price. This is essentially a tax on mobility.",
        likes: 56,
        likedBy: ["u-1", "u-4", "u-5"],
        timestamp: "2026-04-12T06:00:00Z",
        replies: [
          {
            id: "r-3",
            userId: "u-5",
            userName: "Vikram Singh",
            userAvatar: "VS",
            content: "Absolutely. Bring fuel under GST and the pricing will be more transparent.",
            likes: 31,
            likedBy: ["u-3"],
            timestamp: "2026-04-12T06:30:00Z",
          },
        ],
      },
      {
        id: "c-5",
        threadId: "t-2",
        userId: "u-1",
        userName: "Rahul Sharma",
        userAvatar: "RS",
        content:
          "I understand the revenue need but there should be a cap. Auto-rickshaw and truck drivers are being squeezed the most. Their income hasn't grown but fuel cost is up 40% in 5 years.",
        likes: 48,
        likedBy: ["u-2", "u-3"],
        timestamp: "2026-04-12T07:00:00Z",
        replies: [],
      },
    ],
    debates: [
      {
        id: "d-4",
        threadId: "t-2",
        topic: "Is the government primarily responsible for high fuel prices?",
        forUser: { id: "u-3", name: "Amit Kumar", avatar: "AK" },
        againstUser: { id: "u-5", name: "Vikram Singh", avatar: "VS" },
        viewers: 312,
        status: "live",
        startTime: "2026-04-12T07:00:00Z",
        messages: [
          {
            id: "m-13",
            userId: "u-3",
            userName: "Amit Kumar",
            side: "for",
            content:
              "When global crude dropped to historic lows in 2020, the government raised excise duties to pocket the savings. That decision directly causes today's high prices. The consumer never benefited from the dip.",
            timestamp: "2026-04-12T07:01:00Z",
          },
          {
            id: "m-14",
            userId: "u-5",
            userName: "Vikram Singh",
            side: "against",
            content:
              "India imports 85% of its crude. When Brent crude rose from $50 to $90+, there's limited room to subsidise. The government did cut excise by ₹5 in May 2022.",
            timestamp: "2026-04-12T07:05:00Z",
          },
          {
            id: "m-15",
            userId: "u-3",
            userName: "Amit Kumar",
            side: "for",
            content:
              "₹5 cut after raising by ₹13 during COVID is not meaningful relief. And state governments – some from the same ruling party – also refuse to reduce VAT. It's a double standard.",
            timestamp: "2026-04-12T07:09:00Z",
          },
          {
            id: "m-16",
            userId: "u-5",
            userName: "Vikram Singh",
            side: "against",
            content:
              "Fair point on double standard. But revenues from fuel taxes fund national highways, defence, and welfare schemes. Blindly cutting taxes could affect these programmes.",
            timestamp: "2026-04-12T07:13:00Z",
          },
          {
            id: "m-17",
            userId: "u-3",
            userName: "Amit Kumar",
            side: "for",
            content:
              "Then bring fuel under GST to create a competitive, transparent market. Oil PSUs posted record profits last year. Some of that should be passed to consumers.",
            timestamp: "2026-04-12T07:17:00Z",
          },
        ],
        aiSummary: undefined,
      },
      {
        id: "d-5",
        threadId: "t-2",
        topic: "Is the government primarily responsible for high fuel prices?",
        forUser: { id: "u-1", name: "Rahul Sharma", avatar: "RS" },
        againstUser: { id: "u-2", name: "Priya Patel", avatar: "PP" },
        viewers: 198,
        status: "live",
        startTime: "2026-04-12T08:30:00Z",
        messages: [
          {
            id: "m-18",
            userId: "u-1",
            userName: "Rahul Sharma",
            side: "for",
            content: "Yes – 55% of pump price is tax. The government has full control over that 55%. Blaming global markets for 100% of the problem is dishonest.",
            timestamp: "2026-04-12T08:31:00Z",
          },
          {
            id: "m-19",
            userId: "u-2",
            userName: "Priya Patel",
            side: "against",
            content: "The tax component funds LPG subsidies for the poor, PMAY homes, and Jal Jeevan Mission. Cutting it means cutting services. What's the alternative revenue source?",
            timestamp: "2026-04-12T08:35:00Z",
          },
          {
            id: "m-20",
            userId: "u-1",
            userName: "Rahul Sharma",
            side: "for",
            content: "Wealth tax, higher corporate tax for profitable PSUs, rationalising defence procurement. There are other levers. The poor use public transport anyway – fuel tax hurts middle class most.",
            timestamp: "2026-04-12T08:39:00Z",
          },
        ],
        aiSummary: undefined,
      },
    ],
    commonPointsSummary: undefined,
  },
  // ── Thread 3: NEP ─────────────────────────────────────────────────────────
  {
    id: "t-3",
    title: "National Education Policy 2020 – Transformative or Disruptive?",
    description:
      "The National Education Policy 2020 introduced sweeping changes: a 5+3+3+4 school structure, mother-tongue based instruction up to Class 5, multidisciplinary higher education, and the abolition of M.Phil. courses. Implementation varies widely across states. While some laud it as visionary, educators and students in several states have raised concerns about feasibility and resource gaps.",
    category: "Education",
    postedBy: "Admin Team",
    postedAt: "2026-04-12T04:00:00Z",
    deadlineAt: "2026-04-13T04:00:00Z",
    status: "active",
    tags: ["NEP", "Education", "Policy", "Students"],
    comments: [
      {
        id: "c-6",
        threadId: "t-3",
        userId: "u-2",
        userName: "Priya Patel",
        userAvatar: "PP",
        content:
          "Mother-tongue instruction is a great idea in theory, but what about children of migrant workers who move between states? Their language changes every few years.",
        likes: 62,
        likedBy: ["u-1", "u-3", "u-4", "u-5"],
        timestamp: "2026-04-12T05:30:00Z",
        replies: [
          {
            id: "r-4",
            userId: "u-3",
            userName: "Amit Kumar",
            userAvatar: "AK",
            content: "This is a critical gap. NEP has a vision but the ground-level infrastructure – teachers trained in local languages – simply doesn't exist yet.",
            likes: 28,
            likedBy: ["u-2"],
            timestamp: "2026-04-12T06:00:00Z",
          },
        ],
      },
      {
        id: "c-7",
        threadId: "t-3",
        userId: "u-5",
        userName: "Vikram Singh",
        userAvatar: "VS",
        content:
          "Abolishing M.Phil was a mistake. It was an important bridge between Masters and PhD, especially for students who weren't sure about full doctoral commitment.",
        likes: 45,
        likedBy: ["u-2", "u-4"],
        timestamp: "2026-04-12T07:00:00Z",
        replies: [],
      },
    ],
    debates: [
      {
        id: "d-6",
        threadId: "t-3",
        topic: "Is NEP 2020 beneficial for Indian students?",
        forUser: { id: "u-1", name: "Rahul Sharma", avatar: "RS" },
        againstUser: { id: "u-4", name: "Sneha Gupta", avatar: "SG" },
        viewers: 156,
        status: "live",
        startTime: "2026-04-12T06:00:00Z",
        messages: [
          {
            id: "m-21",
            userId: "u-1",
            userName: "Rahul Sharma",
            side: "for",
            content:
              "NEP moves away from the rote-learning exam factory model. Introducing coding from Class 6, vocational training, and flexible majors in college creates well-rounded students.",
            timestamp: "2026-04-12T06:01:00Z",
          },
          {
            id: "m-22",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "against",
            content:
              "Great vision, terrible timing. 1.5 million government schools, many without basic toilets or qualified teachers. How do you implement 'coding from Class 6' there?",
            timestamp: "2026-04-12T06:05:00Z",
          },
          {
            id: "m-23",
            userId: "u-1",
            userName: "Rahul Sharma",
            side: "for",
            content:
              "Reform has to start somewhere. NEP sets the direction. States can phase implementation. Karnataka, Tamil Nadu have already shown progress in higher ed restructuring.",
            timestamp: "2026-04-12T06:09:00Z",
          },
          {
            id: "m-24",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "against",
            content:
              "Karnataka and Tamil Nadu have strong state infrastructure. What about UP, Bihar, Jharkhand? A one-size-fits-all policy ignores massive state-level disparities.",
            timestamp: "2026-04-12T06:13:00Z",
          },
        ],
        aiSummary: undefined,
      },
    ],
    commonPointsSummary: undefined,
  },
  // ── Thread 4: AI Jobs (Newer thread) ──────────────────────────────────────
  {
    id: "t-4",
    title: "AI and Job Displacement – Should India Regulate Artificial Intelligence?",
    description:
      "As AI tools automate tasks across IT, banking, and customer service, job displacement fears are growing. India's IT sector, which employs over 5 million people, is undergoing rapid restructuring. The government has announced an AI mission with ₹10,000 crore outlay, but a comprehensive regulatory framework is absent. Should India prioritise regulation to protect jobs, or innovation to lead globally?",
    category: "Technology & Economy",
    postedBy: "Admin Team",
    postedAt: "2026-04-12T08:00:00Z",
    deadlineAt: "2026-04-13T08:00:00Z",
    status: "active",
    tags: ["AI", "Jobs", "Technology", "Regulation"],
    comments: [
      {
        id: "c-8",
        threadId: "t-4",
        userId: "u-3",
        userName: "Amit Kumar",
        userAvatar: "AK",
        content:
          "I work in IT. My company replaced 30% of QA testers with AI tools last year. These weren't low-skill jobs – people with 5-8 years experience lost their livelihoods. We need regulation now.",
        likes: 89,
        likedBy: ["u-1", "u-2", "u-4", "u-5"],
        timestamp: "2026-04-12T09:00:00Z",
        replies: [
          {
            id: "r-5",
            userId: "u-2",
            userName: "Priya Patel",
            userAvatar: "PP",
            content: "This needs to be part of the national conversation urgently. A Universal Basic Income or retraining fund should be mandatory for companies profiting from AI.",
            likes: 44,
            likedBy: ["u-3"],
            timestamp: "2026-04-12T09:30:00Z",
          },
        ],
      },
      {
        id: "c-9",
        threadId: "t-4",
        userId: "u-1",
        userName: "Rahul Sharma",
        userAvatar: "RS",
        content:
          "Over-regulating AI will push innovation to China and the US. India already lost the semiconductor race. Let's not lose AI too. Focus on reskilling instead.",
        likes: 33,
        likedBy: ["u-5"],
        timestamp: "2026-04-12T10:00:00Z",
        replies: [],
      },
    ],
    debates: [
      {
        id: "d-7",
        threadId: "t-4",
        topic: "Should India implement strict AI regulation to protect jobs?",
        forUser: { id: "u-4", name: "Sneha Gupta", avatar: "SG" },
        againstUser: { id: "u-1", name: "Rahul Sharma", avatar: "RS" },
        viewers: 421,
        status: "live",
        startTime: "2026-04-12T09:00:00Z",
        messages: [
          {
            id: "m-25",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "for",
            content:
              "The EU AI Act shows regulation is possible without killing innovation. We need mandatory impact assessments when AI replaces significant workforce sections. Unchecked automation creates a plutocracy.",
            timestamp: "2026-04-12T09:01:00Z",
          },
          {
            id: "m-26",
            userId: "u-1",
            userName: "Rahul Sharma",
            side: "against",
            content:
              "EU approach took 4 years and created compliance nightmares. Indian startups can't afford that. AI creates new job categories too – prompt engineers, AI trainers, data curators.",
            timestamp: "2026-04-12T09:05:00Z",
          },
          {
            id: "m-27",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "for",
            content:
              "Prompt engineer jobs require high English literacy and tech access. The 30 QA testers who lost jobs in Pune can't switch to that overnight. We're talking about real people, not abstract labour markets.",
            timestamp: "2026-04-12T09:09:00Z",
          },
          {
            id: "m-28",
            userId: "u-1",
            userName: "Rahul Sharma",
            side: "against",
            content:
              "Agreed on transition support. But the answer is mandatory retraining levies on companies using AI, not banning or throttling the technology itself. Slow AI = slow India.",
            timestamp: "2026-04-12T09:13:00Z",
          },
          {
            id: "m-29",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "for",
            content: "That's actually a middle ground I can support – mandatory retraining levies. But we also need algorithmic transparency laws so we know when AI is making hiring/firing decisions.",
            timestamp: "2026-04-12T09:17:00Z",
          },
          {
            id: "m-30",
            userId: "u-1",
            userName: "Rahul Sharma",
            side: "against",
            content: "Transparency requirements on consequential AI decisions – yes, that's reasonable. But job protection through output quotas would be counterproductive.",
            timestamp: "2026-04-12T09:21:00Z",
          },
        ],
        aiSummary: undefined,
      },
    ],
    commonPointsSummary: undefined,
  },
  // ── Thread 5: ARCHIVED – Electoral Bonds ────────────────────────────────
  {
    id: "t-5",
    title: "Electoral Bonds – Transparency or Opacity in Political Funding?",
    description:
      "The Supreme Court in February 2024 unanimously struck down the Electoral Bond Scheme, calling it unconstitutional. The SBI was ordered to disclose all bond data to the Election Commission. The data revealed significant correlations between bond purchases and regulatory favours. This thread explored whether the scheme served its stated transparency purpose.",
    category: "Governance",
    postedBy: "Admin Team",
    postedAt: "2026-04-10T06:00:00Z",
    deadlineAt: "2026-04-11T06:00:00Z",
    status: "archived",
    tags: ["Electoral Bonds", "Supreme Court", "Political Funding", "Democracy"],
    comments: [
      {
        id: "c-10",
        threadId: "t-5",
        userId: "u-5",
        userName: "Vikram Singh",
        userAvatar: "VS",
        content: "The Supreme Court's verdict was historic but the damage is done. Thousands of crores flowed anonymously. This needs criminal investigation, not just disclosure.",
        likes: 112,
        likedBy: ["u-1", "u-2", "u-3", "u-4"],
        timestamp: "2026-04-10T08:00:00Z",
        replies: [],
      },
    ],
    debates: [
      {
        id: "d-8",
        threadId: "t-5",
        topic: "Did the Electoral Bond scheme harm Indian democracy?",
        forUser: { id: "u-2", name: "Priya Patel", avatar: "PP" },
        againstUser: { id: "u-3", name: "Amit Kumar", avatar: "AK" },
        viewers: 0,
        status: "ended",
        startTime: "2026-04-10T08:00:00Z",
        endTime: "2026-04-10T09:00:00Z",
        messages: [
          {
            id: "m-31",
            userId: "u-2",
            userName: "Priya Patel",
            side: "for",
            content: "Voters have the right to know who funds their political parties. Anonymity in bond purchases directly violated this right.",
            timestamp: "2026-04-10T08:01:00Z",
          },
          {
            id: "m-32",
            userId: "u-3",
            userName: "Amit Kumar",
            side: "against",
            content: "Before bonds, political funding was 100% cash-based and completely untraceable. Bonds at least created a paper trail even if the donors weren't public.",
            timestamp: "2026-04-10T08:05:00Z",
          },
        ],
        aiSummary: {
          forPoints: [
            "Citizens' right to know the source of political funding is fundamental to democracy",
            "Supreme Court ruled the scheme unconstitutional – legal validation that it was wrong",
            "Data showed correlation between large bond purchases and regulatory benefits – suggests quid pro quo",
            "Opposition parties received far fewer bonds, creating an uneven electoral playing field",
          ],
          againstPoints: [
            "Previous system of cash donations was entirely opaque – bonds created some paper trail",
            "Donor protection prevents corporate victimisation by parties they don't fund",
            "Correlation between bonds and regulatory decisions may be coincidental",
            "All major democracies struggle with campaign finance – bonds were an imperfect attempt at reform",
          ],
        },
      },
    ],
    commonPointsSummary: {
      forPoints: [
        "Voters' right to information is constitutionally protected",
        "The Supreme Court's unanimous verdict validates concerns about the scheme",
        "Concentration of bond purchases in ruling party beneficiaries raises conflict-of-interest issues",
        "Democratic accountability requires transparent political funding",
      ],
      againstPoints: [
        "Cash-based pre-bond system was far more opaque",
        "Some anonymity protects smaller donors from political pressure",
        "The scheme needed reform, not abolition",
        "All parties, not just one, received electoral bonds",
      ],
    },
  },
  // ── Thread 6: Active – Urban vs Rural Development ─────────────────────────
  {
    id: "t-6",
    title: "Urban vs Rural Budget Allocation – Is India Ignoring Its Villages?",
    description:
      "India's annual Union Budget 2026-27 allocated ₹2.78 lakh crore for urban infrastructure (metro rail, smart cities, urban housing) against ₹1.36 lakh crore for rural development (MGNREGA, PM Gram Sadak Yojana, rural housing). With 65% of the population still rural, critics argue the tilt toward urban development reflects a skewed political priority. Supporters say urban investment drives GDP growth that benefits everyone.",
    category: "Economy & Development",
    postedBy: "Admin Team",
    postedAt: "2026-04-12T03:00:00Z",
    deadlineAt: "2026-04-13T03:00:00Z",
    status: "active",
    tags: ["Budget", "Rural", "Urban", "Development", "MGNREGA"],
    comments: [
      {
        id: "c-11",
        threadId: "t-6",
        userId: "u-4",
        userName: "Sneha Gupta",
        userAvatar: "SG",
        content:
          "MGNREGA got a marginal ₹86,000 crore while metro rail projects got ₹1.1 lakh crore. Rural India is 65% of the population. The math doesn't add up.",
        likes: 74,
        likedBy: ["u-2", "u-3", "u-5"],
        timestamp: "2026-04-12T04:00:00Z",
        replies: [
          {
            id: "r-6",
            userId: "u-1",
            userName: "Rahul Sharma",
            userAvatar: "RS",
            content: "Metro rail also benefits rural commuters who migrate to cities for work. Infrastructure spending has multiplier effects.",
            likes: 19,
            likedBy: [],
            timestamp: "2026-04-12T04:30:00Z",
          },
        ],
      },
    ],
    debates: [
      {
        id: "d-9",
        threadId: "t-6",
        topic: "Is India's budget allocation unfair to rural India?",
        forUser: { id: "u-4", name: "Sneha Gupta", avatar: "SG" },
        againstUser: { id: "u-5", name: "Vikram Singh", avatar: "VS" },
        viewers: 287,
        status: "live",
        startTime: "2026-04-12T04:30:00Z",
        messages: [
          {
            id: "m-33",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "for",
            content:
              "₹2.78 lakh crore for urban (35% population) vs ₹1.36 lakh crore for rural (65% population). On a per-capita basis, urban Indians receive more than 4 times the budget allocation. That's structural inequality.",
            timestamp: "2026-04-12T04:31:00Z",
          },
          {
            id: "m-34",
            userId: "u-5",
            userName: "Vikram Singh",
            side: "against",
            content:
              "Urban infrastructure generates economic returns through commerce, employment, and GST revenues that fund rural schemes. You can't compare allocations in isolation without looking at revenue generation.",
            timestamp: "2026-04-12T04:35:00Z",
          },
          {
            id: "m-35",
            userId: "u-4",
            userName: "Sneha Gupta",
            side: "for",
            content: "Rural agriculture contributes 18% of GDP but employs 47% of the workforce. That productivity gap is itself a result of decades of under-investment.",
            timestamp: "2026-04-12T04:39:00Z",
          },
          {
            id: "m-36",
            userId: "u-5",
            userName: "Vikram Singh",
            side: "against",
            content:
              "Fair – agriculture has been neglected. But the solution is better price support and input subsidies, not diverting metro rail funds. These are different budget heads.",
            timestamp: "2026-04-12T04:43:00Z",
          },
        ],
        aiSummary: undefined,
      },
    ],
    commonPointsSummary: undefined,
  },
  // ── Thread 7: Dwarka Pipeline (LINKED TO TRANSPARENCY) ────────────────────
  {
    id: "t-7",
    title: "Dwarka Water Pipeline Delayed by 8 Months — Who Is Accountable?",
    description:
      "According to data on Chirp's Government Works Tracker, the underground water pipeline project in Dwarka Phase 2 (Sectors 10–22) — allocated ₹1,200 lakh under Jal Jeevan Mission Urban — is running 8 months behind schedule. As of April 2026, only 42% of the work is complete despite 42% of the budget (₹504 lakh) already being spent. The official reason cited is delay in Right-of-Way clearances from DMRC. 1.2 lakh households in Dwarka continue to depend on water tankers. The question: is the government doing enough to resolve inter-agency deadlocks, or is this a systemic failure of project management?",
    category: "Government Accountability",
    postedBy: "Admin Team",
    postedAt: "2026-04-12T07:00:00Z",
    deadlineAt: "2026-04-13T07:00:00Z",
    status: "active",
    tags: ["Water", "Dwarka", "Jal Jeevan Mission", "Accountability", "DMRC", "Delhi"],
    sourceWorkId: "gw-4",
    comments: [
      {
        id: "c-12",
        threadId: "t-7",
        userId: "u-2",
        userName: "Priya Patel",
        userAvatar: "PP",
        content:
          "I checked the tracker — ₹504 lakh spent and only 42% done. In a normal infrastructure project that ratio is concerning. The money is going somewhere even if the pipes aren't being laid.",
        likes: 67,
        likedBy: ["u-1", "u-3", "u-5"],
        timestamp: "2026-04-12T07:30:00Z",
        replies: [
          {
            id: "r-7",
            userId: "u-3",
            userName: "Amit Kumar",
            userAvatar: "AK",
            content:
              "The DMRC clearance excuse is legitimate — I've seen this happen on multiple projects. But the government should have anticipated ROW issues before even tendering the project.",
            likes: 29,
            likedBy: ["u-2"],
            timestamp: "2026-04-12T08:00:00Z",
          },
        ],
      },
      {
        id: "c-13",
        threadId: "t-7",
        userId: "u-5",
        userName: "Vikram Singh",
        userAvatar: "VS",
        content:
          "1.2 lakh households without piped water in 2026, in the capital city. While metro expansion gets fast-tracked. There's something wrong with priority-setting here.",
        likes: 88,
        likedBy: ["u-1", "u-2", "u-3", "u-4"],
        timestamp: "2026-04-12T09:00:00Z",
        replies: [
          {
            id: "r-8",
            userId: "u-1",
            userName: "Rahul Sharma",
            userAvatar: "RS",
            content:
              "Metro has a dedicated authority (DMRC) with political backing. Water supply falls under DJB which is chronically underfunded. It's an institutional design problem.",
            likes: 41,
            likedBy: ["u-5"],
            timestamp: "2026-04-12T09:20:00Z",
          },
        ],
      },
      {
        id: "c-14",
        threadId: "t-7",
        userId: "u-4",
        userName: "Sneha Gupta",
        userAvatar: "SG",
        content:
          "This is exactly why the transparency tracker matters. Without this data, we wouldn't even know the project is delayed. Most citizens in Dwarka probably don't know their ₹1,200 lakh project is 8 months behind.",
        likes: 73,
        likedBy: ["u-1", "u-2", "u-5"],
        timestamp: "2026-04-12T10:00:00Z",
        replies: [],
      },
    ],
    debates: [
      {
        id: "d-10",
        threadId: "t-7",
        topic: "Is the government responsible for the Dwarka pipeline delay?",
        forUser: { id: "u-2", name: "Priya Patel", avatar: "PP" },
        againstUser: { id: "u-1", name: "Rahul Sharma", avatar: "RS" },
        viewers: 334,
        status: "live",
        startTime: "2026-04-12T08:00:00Z",
        messages: [
          {
            id: "m-37",
            userId: "u-2",
            userName: "Priya Patel",
            side: "for",
            content:
              "The government allocated ₹1,200 lakh and started this project knowing DMRC infrastructure exists in Dwarka. Failure to obtain ROW clearances before tendering is a planning failure, not an act of god. That's government negligence.",
            timestamp: "2026-04-12T08:01:00Z",
          },
          {
            id: "m-38",
            userId: "u-1",
            userName: "Rahul Sharma",
            side: "against",
            content:
              "ROW negotiations with DMRC are genuinely complex — DMRC is a separate legal entity with its own board. The government cannot simply override another statutory body. This is an inter-agency coordination problem, not negligence.",
            timestamp: "2026-04-12T08:05:00Z",
          },
          {
            id: "m-39",
            userId: "u-2",
            userName: "Priya Patel",
            side: "for",
            content:
              "Then why was the project approved and funded without resolving that coordination first? You don't hand ₹1,200 lakh to a contractor and then discover there's a clearance problem. That's either incompetence or deliberate disregard.",
            timestamp: "2026-04-12T08:09:00Z",
          },
          {
            id: "m-40",
            userId: "u-1",
            userName: "Rahul Sharma",
            side: "against",
            content:
              "Projects are often approved optimistically — that's a systemic issue across all infrastructure ministries globally, not specific to this government. The Jal Jeevan Mission itself has an excellent overall completion record nationally.",
            timestamp: "2026-04-12T08:13:00Z",
          },
          {
            id: "m-41",
            userId: "u-2",
            userName: "Priya Patel",
            side: "for",
            content:
              "National record doesn't help the 1.2 lakh households in Dwarka paying for water tankers today. And at 42% spend for 42% work, the budget is being consumed even while the project stalls. Someone should answer for that.",
            timestamp: "2026-04-12T08:17:00Z",
          },
          {
            id: "m-42",
            userId: "u-1",
            userName: "Rahul Sharma",
            side: "against",
            content:
              "Agreed that accountability is needed — but it should target the specific inter-ministerial bottleneck, not be used to paint the entire water mission as a failure. A Parliamentary committee review of DMRC-DJB coordination would be the right response.",
            timestamp: "2026-04-12T08:21:00Z",
          },
        ],
        aiSummary: undefined,
      },
      {
        id: "d-11",
        threadId: "t-7",
        topic: "Is the government responsible for the Dwarka pipeline delay?",
        forUser: { id: "u-5", name: "Vikram Singh", avatar: "VS" },
        againstUser: { id: "u-3", name: "Amit Kumar", avatar: "AK" },
        viewers: 189,
        status: "live",
        startTime: "2026-04-12T09:30:00Z",
        messages: [
          {
            id: "m-43",
            userId: "u-5",
            userName: "Vikram Singh",
            side: "for",
            content:
              "The tracker shows ₹504 lakh spent with 42% progress. If this were a private contractor spending 42% of the budget for 42% of the work on a stalled project, they'd be blacklisted. Why does the government get a pass?",
            timestamp: "2026-04-12T09:31:00Z",
          },
          {
            id: "m-44",
            userId: "u-3",
            userName: "Amit Kumar",
            side: "against",
            content:
              "Because 42% spend for 42% work is actually proportional — that's not a red flag. The issue is timeline, not budget misuse. The contractor has laid pipes where clearance was given. The delay is in specific DMRC-controlled stretches.",
            timestamp: "2026-04-12T09:35:00Z",
          },
          {
            id: "m-45",
            userId: "u-5",
            userName: "Vikram Singh",
            side: "for",
            content:
              "Whether it's timeline or budget, the residents lose. And since this data is now public on the tracker, the government can't claim ignorance. They know. Inaction after knowing is accountability.",
            timestamp: "2026-04-12T09:39:00Z",
          },
          {
            id: "m-46",
            userId: "u-3",
            userName: "Amit Kumar",
            side: "against",
            content:
              "I'd rather see citizens use this tracker data to pressure their local MP — that's the right democratic lever. The MP for South West Delhi should be raising this in Parliament. That's what this platform should enable.",
            timestamp: "2026-04-12T09:43:00Z",
          },
        ],
        aiSummary: undefined,
      },
    ],
    commonPointsSummary: undefined,
  },
];

// ─── GOVERNMENT WORKS ─────────────────────────────────────────────────────────
export const GOVERNMENT_WORKS: GovernmentWork[] = [
  {
    id: "gw-1",
    title: "4-Lane Road Construction: Lajpat Nagar–AIIMS Corridor",
    mp: "Manoj Tiwari",
    mla: "Raghav Chadha",
    state: "Delhi",
    district: "South Delhi",
    location: "Lajpat Nagar to AIIMS, New Delhi",
    category: "Road Construction",
    allocatedBudget: 4500,
    usedBudget: 3200,
    progress: 71,
    status: "ongoing",
    startDate: "2025-08-15",
    expectedEnd: "2026-06-30",
    description:
      "Widening and resurfacing of the Lajpat Nagar–AIIMS stretch under PM Gati Shakti. Includes pedestrian walkways, cycle lanes, and LED street lighting.",
    scheme: "PM Gati Shakti – National Master Plan",
  },
  {
    id: "gw-2",
    title: "Smart Street Lighting Installation – Connaught Place Zone",
    mp: "Meenakshi Lekhi",
    mla: "Alka Lamba",
    state: "Delhi",
    district: "Central Delhi",
    location: "Connaught Place, New Delhi",
    category: "Street Lighting",
    allocatedBudget: 800,
    usedBudget: 800,
    progress: 100,
    status: "completed",
    startDate: "2025-04-01",
    expectedEnd: "2025-12-31",
    actualEnd: "2025-11-20",
    description:
      "Installation of 1,240 solar-powered smart LED street lights with motion sensors and centralised monitoring. Completed 6 weeks ahead of schedule.",
    photoUrl: "/images/cp-lights.jpg",
    scheme: "Smart Cities Mission",
  },
  {
    id: "gw-3",
    title: "Government School Renovation – Rohini Sector 15",
    mp: "Parvesh Verma",
    mla: "Vijender Garg",
    state: "Delhi",
    district: "North West Delhi",
    location: "Govt Boys Sr Sec School, Rohini Sector 15",
    category: "School Infrastructure",
    allocatedBudget: 250,
    usedBudget: 180,
    progress: 72,
    status: "ongoing",
    startDate: "2025-10-01",
    expectedEnd: "2026-04-30",
    description:
      "Complete renovation of 18 classrooms, new computer lab with 40 systems, upgraded science lab, and sanitation block for girls.",
    scheme: "Samagra Shiksha Abhiyan",
  },
  {
    id: "gw-4",
    title: "Underground Water Pipeline – Dwarka Phase 2",
    mp: "Parvesh Verma",
    mla: "Vinay Mishra",
    state: "Delhi",
    district: "South West Delhi",
    location: "Dwarka Phase 2, Sectors 10–22",
    category: "Water Supply",
    allocatedBudget: 1200,
    usedBudget: 504,
    progress: 42,
    status: "delayed",
    startDate: "2025-06-01",
    expectedEnd: "2026-02-28",
    description:
      "New 45km underground water pipeline to provide 24×7 piped water to 1.2 lakh households. Currently delayed due to ROW clearances from DMRC.",
    scheme: "Jal Jeevan Mission – Urban",
  },
  {
    id: "gw-5",
    title: "Flyover Construction – Andheri East Junction",
    mp: "Gopal Shetty",
    mla: "Murji Patel",
    state: "Maharashtra",
    district: "Mumbai Suburban",
    location: "Andheri East, MIDC Road Junction, Mumbai",
    category: "Bridge & Flyover",
    allocatedBudget: 12000,
    usedBudget: 9480,
    progress: 79,
    status: "ongoing",
    startDate: "2024-11-01",
    expectedEnd: "2026-07-31",
    description:
      "3.2km elevated flyover to decongest the Andheri East MIDC Road junction, one of Mumbai's top-10 congestion points. Will benefit 2.5 lakh daily commuters.",
    scheme: "National Urban Infrastructure Fund (NUIF)",
  },
  {
    id: "gw-6",
    title: "Sewage Treatment Plant – Powai Lake Zone",
    mp: "Rahul Shewale",
    mla: "Parag Shah",
    state: "Maharashtra",
    district: "Mumbai City",
    location: "Powai, Mumbai",
    category: "Sanitation & Sewerage",
    allocatedBudget: 3500,
    usedBudget: 1995,
    progress: 57,
    status: "ongoing",
    startDate: "2025-03-01",
    expectedEnd: "2026-09-30",
    description:
      "New 75 MLD sewage treatment plant to prevent untreated sewage discharge into Powai Lake. Part of the Powai Lake Revival Mission.",
    scheme: "AMRUT 2.0",
  },
  {
    id: "gw-7",
    title: "Community Library & Senior Citizen Centre – Koramangala",
    mp: "Tejasvi Surya",
    mla: "Sowmya Reddy",
    state: "Karnataka",
    district: "Bangalore Urban",
    location: "Koramangala 5th Block, Bangalore",
    category: "Community Infrastructure",
    allocatedBudget: 320,
    usedBudget: 320,
    progress: 100,
    status: "completed",
    startDate: "2025-01-15",
    expectedEnd: "2025-10-15",
    actualEnd: "2025-09-30",
    description:
      "2,400 sq ft community library with digital reading room, and a dedicated senior citizen centre with daily health check-up facility.",
    photoUrl: "/images/koramangala-library.jpg",
    scheme: "MPLADS (Member of Parliament Local Area Development Scheme)",
  },
  {
    id: "gw-8",
    title: "Bus Rapid Transit Corridor – Koramangala to Electronic City",
    mp: "Tejasvi Surya",
    mla: "B.A. Basavaraju",
    state: "Karnataka",
    district: "Bangalore Urban",
    location: "Koramangala to Electronic City via Hosur Road, Bangalore",
    category: "Public Transport",
    allocatedBudget: 8500,
    usedBudget: 3995,
    progress: 47,
    status: "ongoing",
    startDate: "2025-07-01",
    expectedEnd: "2027-01-31",
    description:
      "18km dedicated BRT corridor with 22 stations, real-time passenger information systems, and integration with Metro Phase 3. Expected to serve 1.8 lakh daily passengers.",
    scheme: "Smart Cities Mission – Integrated Command and Control",
  },
  {
    id: "gw-9",
    title: "District Hospital Expansion & ICU Addition – Jaipur",
    mp: "Ramcharan Bohra",
    mla: "Ashok Lahoty",
    state: "Rajasthan",
    district: "Jaipur",
    location: "Sawai Man Singh District Hospital, Jaipur",
    category: "Healthcare",
    allocatedBudget: 1800,
    usedBudget: 1404,
    progress: 78,
    status: "ongoing",
    startDate: "2025-05-01",
    expectedEnd: "2026-05-31",
    description:
      "Addition of a new 60-bed ICU wing, MRI unit, and blood bank expansion. Will serve 8 districts of Jaipur division. New OPD block foundation work completed.",
    scheme: "Pradhan Mantri Ayushman Bharat Health Infrastructure Mission",
  },
  {
    id: "gw-10",
    title: "Rural Road Construction – 12 Village Connectivity, Barmer District",
    mp: "Kailash Choudhary",
    mla: "Mewaram Jain",
    state: "Rajasthan",
    district: "Barmer",
    location: "Barmer District, connecting 12 remote villages to NH-25",
    category: "Road Construction",
    allocatedBudget: 680,
    usedBudget: 680,
    progress: 100,
    status: "completed",
    startDate: "2024-10-01",
    expectedEnd: "2025-08-31",
    actualEnd: "2025-07-15",
    description:
      "84km all-weather roads connecting 12 remote desert villages to the main highway. Equipped with solar-powered road studs. Benefiting 28,000 villagers who previously had no paved road access.",
    photoUrl: "/images/barmer-road.jpg",
    scheme: "Pradhan Mantri Gram Sadak Yojana (PMGSY)",
  },
];

// ─── LEADERS & MANIFESTOS ──────────────────────────────────────────────────────
export const LEADERS: Leader[] = [
  {
    id: "l-1",
    name: "Narendra Modi",
    party: "Bharatiya Janata Party (BJP)",
    position: "Prime Minister",
    constituency: "Varanasi, Uttar Pradesh",
    manifesto: [
      {
        id: "ml-1",
        category: "Employment",
        promise: "Create 2 crore jobs annually through manufacturing and infrastructure",
        detail:
          "Through PLI (Production Linked Incentive) schemes across 14 sectors, the government aims to create 2 crore jobs per year by 2026. Emphasis on Make in India for smartphones, textiles, pharma, and semiconductors.",
        keywords: ["jobs", "employment", "work", "unemployment", "youth", "manufacturing", "PLI"],
      },
      {
        id: "ml-2",
        category: "Healthcare",
        promise: "Free medical care for all under Ayushman Bharat expanded to cover 70+ age group",
        detail:
          "Ayushman Bharat PM-JAY extended to cover all citizens above 70 years old regardless of income, providing ₹5 lakh annual health insurance cover. Target: 6 crore elderly citizens.",
        keywords: ["health", "medical", "hospital", "treatment", "insurance", "elderly", "Ayushman"],
      },
      {
        id: "ml-3",
        category: "Housing",
        promise: "3 crore additional houses under PM Awas Yojana by 2029",
        detail:
          "PM Awas Yojana 2.0 targets building 3 crore new affordable houses in urban and rural areas. Beneficiaries receive ₹1.5 lakh to ₹2.5 lakh subsidy based on income category.",
        keywords: ["house", "housing", "home", "shelter", "affordable", "Awas", "accommodation"],
      },
      {
        id: "ml-4",
        category: "Water",
        promise: "Every rural household gets piped water connection by 2026",
        detail:
          "Jal Jeevan Mission aims to provide functional household tap connections to all 19.32 crore rural homes. Currently 14.6 crore (76%) have been connected.",
        keywords: ["water", "tap", "piped water", "drinking water", "Jal Jeevan", "rural"],
      },
      {
        id: "ml-5",
        category: "Infrastructure",
        promise: "Complete National Infrastructure Pipeline with ₹111 lakh crore investment",
        detail:
          "Massive infrastructure push covering roads, railways, airports, ports, and urban infrastructure. PM Gati Shakti National Master Plan to coordinate multi-modal connectivity.",
        keywords: ["road", "railway", "highway", "infrastructure", "airport", "port", "connectivity"],
      },
      {
        id: "ml-6",
        category: "Agriculture",
        promise: "Double farmers' income through PM-KISAN and crop diversification",
        detail:
          "PM-KISAN provides ₹6,000 annual income support to 9.5 crore farmer families. Additional measures include e-Nam digital marketplace and Farmer Producer Organisations.",
        keywords: ["farmer", "agriculture", "crop", "kisan", "farm income", "MSP"],
      },
      {
        id: "ml-7",
        category: "Women",
        promise: "33% reservation for women in Parliament and state assemblies (Constitution Amendment)",
        detail:
          "Nari Shakti Vandan Adhiniyam, 2023 passed – reserves 33% seats in Lok Sabha and state assemblies for women. Implementation after next census delimitation.",
        keywords: ["women", "girl", "female", "reservation", "gender equality", "Nari Shakti"],
      },
      {
        id: "ml-8",
        category: "Education",
        promise: "National Education Policy 2020 full implementation, 100 new Navodaya Vidyalayas",
        detail:
          "Full rollout of NEP 2020 by 2027. Establishment of 100 new Navodaya Vidyalayas in districts that don't have one. PM e-VIDYA digital content in 12 languages.",
        keywords: ["education", "school", "college", "university", "NEP", "students", "learning"],
      },
    ],
  },
  {
    id: "l-2",
    name: "Mallikarjun Kharge",
    party: "Indian National Congress (INC)",
    position: "Leader of Opposition / Congress President",
    constituency: "Rajya Sabha (Karnataka)",
    manifesto: [
      {
        id: "ml-9",
        category: "Employment",
        promise: "Legal guarantee of 30 lakh government jobs within 5 years",
        detail:
          "Congress promises to fill all 30+ lakh vacant government posts within the first 5 years, with time-bound recruitment drives across central and state governments.",
        keywords: ["jobs", "government jobs", "employment", "sarkari naukri", "vacancy", "recruitment"],
      },
      {
        id: "ml-10",
        category: "Agriculture",
        promise: "Legal guarantee for MSP (Minimum Support Price) for all 23 crops",
        detail:
          "Congress promises a law guaranteeing MSP as the legal minimum purchase price for all 23 crops currently covered under MSP framework. Addresses farmers' primary demand from the 2021 protest.",
        keywords: ["farmer", "MSP", "minimum support price", "agriculture", "crop price", "farming"],
      },
      {
        id: "ml-11",
        category: "Poverty Alleviation",
        promise: "NYAY scheme – ₹1 lakh per year to the 5 crore poorest families",
        detail:
          "Nyuntam Aay Yojana (NYAY) promises guaranteed ₹72,000 per year (₹6,000/month) to the 5 crore poorest families in India, as a minimum income guarantee.",
        keywords: ["poverty", "poor", "income", "minimum income", "NYAY", "welfare", "BPL"],
      },
      {
        id: "ml-12",
        category: "Women",
        promise: "50% reservation for women in all government jobs at all levels",
        detail:
          "Congress promises 50% reservation for women in all government service recruitments, from constable to IAS-level posts, implemented through legislation within first year.",
        keywords: ["women", "female", "reservation", "government jobs", "gender"],
      },
      {
        id: "ml-13",
        category: "Youth & Education",
        promise: "Right to apprenticeship – ₹1 lakh annual stipend for 1 crore youth",
        detail:
          "Every youth between 18-25 years will have the legal right to a one-year apprenticeship in their chosen field with a stipend of ₹1 lakh per year funded by the government.",
        keywords: ["youth", "apprenticeship", "skill", "training", "internship", "young"],
      },
      {
        id: "ml-14",
        category: "Healthcare",
        promise: "Right to Healthcare Act – free treatment in all government hospitals",
        detail:
          "Congress promises to pass the Right to Healthcare Act making free OPD, diagnostics, medicines, and hospitalisation a legal right in all government hospitals across India.",
        keywords: ["health", "healthcare", "hospital", "treatment", "medical", "free health"],
      },
      {
        id: "ml-15",
        category: "Caste",
        promise: "Conduct caste census and revise OBC reservation based on actual population data",
        detail:
          "A nationwide socio-economic and caste census (SECC) to determine actual OBC, SC, ST population percentages, followed by revision of reservation quotas accordingly.",
        keywords: ["caste", "census", "OBC", "reservation", "SC", "ST", "backward", "social justice"],
      },
    ],
  },
  {
    id: "l-3",
    name: "Arvind Kejriwal",
    party: "Aam Aadmi Party (AAP)",
    position: "National Convenor, AAP",
    constituency: "New Delhi Constituency",
    manifesto: [
      {
        id: "ml-16",
        category: "Electricity",
        promise: "Free electricity up to 300 units per month for every household",
        detail:
          "Under AAP Delhi model, households consuming up to 200 units pay nothing. 201-400 units: 50% subsidy. Implemented in Delhi since 2015. Promises to replicate nationally if elected.",
        keywords: ["electricity", "power", "light", "bijli", "free electricity", "utility bill"],
      },
      {
        id: "ml-17",
        category: "Water",
        promise: "Free 20,000 litres of water per month for every household",
        detail:
          "Delhi model provides 20 kilolitres (20,000 litres) per month free of cost to all metered connections. AAP promises to replicate this in every state they govern.",
        keywords: ["water", "free water", "pani", "drinking water", "utility"],
      },
      {
        id: "ml-18",
        category: "Women",
        promise: "Free bus travel for women in all public buses",
        detail:
          "AAP implemented free bus travel for women in Delhi's DTC buses in 2019. Women make 80% of the journeys for free. Extends to metro if nationally elected.",
        keywords: ["women", "bus", "transport", "travel", "commute", "female"],
      },
      {
        id: "ml-19",
        category: "Healthcare",
        promise: "Mohalla Clinics – free OPD, medicines, and diagnostics within 1km of every home",
        detail:
          "Delhi's 550+ Mohalla Clinics provide free doctor consultation, 212 types of free medicines, and 38 lab tests free. AAP promises 1 lakh Mohalla Clinics nationally.",
        keywords: ["health", "clinic", "doctor", "medicine", "Mohalla Clinic", "OPD", "primary healthcare"],
      },
      {
        id: "ml-20",
        category: "Education",
        promise: "Transform government schools into world-class institutions",
        detail:
          "Delhi's school transformation model: 58% increase in education budget, new classrooms, trained teachers via Harvard & Cambridge fellowships. Delhi govt school results now beat private schools.",
        keywords: ["education", "school", "government school", "children", "learning", "teachers"],
      },
      {
        id: "ml-21",
        category: "Anti-Corruption",
        promise: "Zero tolerance for corruption – Delhi CM helpline model nationally",
        detail:
          "24/7 anti-corruption helpline where citizens report bribe demands. Action taken within 72 hours. AAP promises independent Lokayukta in every state with real investigative powers.",
        keywords: ["corruption", "bribe", "honest government", "transparency", "Lokpal", "anti-corruption"],
      },
    ],
  },
  {
    id: "l-4",
    name: "Akhilesh Yadav",
    party: "Samajwadi Party (SP)",
    position: "President, SP | Former CM Uttar Pradesh",
    constituency: "Azamgarh, Uttar Pradesh",
    manifesto: [
      {
        id: "ml-22",
        category: "Employment",
        promise: "1 crore jobs in Uttar Pradesh through expressway industrial corridors",
        detail:
          "SP's UP Expressway Industrial Corridor plan: manufacturing zones along all 6 expressways in UP to create 1 crore jobs in 5 years, focusing on food processing, textiles, and electronics.",
        keywords: ["jobs", "UP", "Uttar Pradesh", "employment", "industry", "manufacturing"],
      },
      {
        id: "ml-23",
        category: "Agriculture",
        promise: "Loan waiver for all farmers with debt under ₹2 lakh",
        detail:
          "Complete waiver of agricultural loans up to ₹2 lakh per farmer family. Covers 2.33 crore farm families in UP. Additional interest waiver for farmers who repaid during COVID.",
        keywords: ["farmer", "loan", "debt", "kisan", "waiver", "agriculture"],
      },
      {
        id: "ml-24",
        category: "Minorities",
        promise: "Restore cancelled OBC sub-categories for most backward communities",
        detail:
          "Reinstate the OBC sub-categorisation that benefits Pasmanda Muslims and most backward OBC communities, ensuring reservation benefits reach the neediest.",
        keywords: ["OBC", "minorities", "backward", "Muslim", "social justice", "reservation"],
      },
    ],
  },
];

// ─── VOTER RIGHTS INFO ─────────────────────────────────────────────────────────
export const VOTER_RIGHTS = [
  {
    question: "voter registration",
    keywords: ["register", "registration", "enroll", "voter id", "voter card", "how to vote"],
    answer: `**How to Register as a Voter in India:**

1. **Eligibility:** Indian citizen, 18+ years old on the qualifying date (1st January of the year)
2. **Online Registration:** Visit voters.eci.gov.in → Form 6 (new registration)
3. **Documents Required:** Proof of Age (Aadhaar, PAN, birth certificate) + Proof of Residence (electricity bill, ration card, Aadhaar)
4. **Offline:** Visit your local BLO (Booth Level Officer) or ERO (Electoral Registration Officer) office
5. **Voter ID Card (EPIC):** Issued within 30-60 days of approval
6. **Check status:** Track application on voters.eci.gov.in or NVSP portal
7. **Helpline:** 1950 (toll-free Election Commission helpline)

Remember: You can only be registered in ONE constituency at a time.`,
  },
  {
    question: "voting rights",
    keywords: ["right to vote", "voting", "election", "ballot", "EVM", "VVPAT", "polling booth"],
    answer: `**Your Voting Rights in India:**

• **Secret Ballot:** Your vote is completely secret – no one can legally ask who you voted for
• **NOTA:** You have the right to choose "None of the Above" on the EVM if you reject all candidates
• **Accessible Voting:** Persons with disabilities get priority entry and assistance at polling booths
• **VVPAT Verification:** You can see your vote on the VVPAT slip for 7 seconds before it drops into the sealed box
• **Paid Holiday:** Your employer must give you a paid holiday on election day (Representation of the People Act, 1951)
• **Complaint Mechanism:** If denied voting rights, call 1950 or approach the Presiding Officer at your booth
• **Mock Poll:** You can demand a mock poll demonstration if suspicious of EVM tampering
• **Proof:** Voter ID, Aadhaar, Passport, or any 12 EC-approved photo IDs are acceptable at polling booths`,
  },
  {
    question: "complaint",
    keywords: ["complaint", "problem", "issue", "violation", "malpractice", "booth capturing", "bribery"],
    answer: `**How to File an Election Complaint:**

1. **cVIGIL App:** Fastest method – take a photo/video of violation, it reaches EC within 100 minutes
2. **National Grievance Portal:** eci.gov.in/complaints
3. **Helpline:** Call 1950 (Model Code of Conduct violations)
4. **In-person:** District Election Office or Observer appointed by ECI
5. **Types of Violations You Can Report:**
   - Voter bribery (money/gifts for votes)
   - Booth capturing
   - Intimidation of voters
   - Violation of Model Code of Conduct
   - Illegal campaigning near polling booths
6. **Anonymous Reporting:** cVIGIL allows anonymous reporting`,
  },
  {
    question: "EVM",
    keywords: ["EVM", "electronic voting machine", "tamper", "hack", "fraud", "manipulation", "rigged"],
    answer: `**About EVMs (Electronic Voting Machines) in India:**

**How they work:**
- EVMs are standalone machines with no internet/Bluetooth connection – physically impossible to hack remotely
- Ballot Unit + Control Unit are a matched pair – tested and sealed before deployment
- VVPAT (Voter Verifiable Paper Audit Trail) provides independent paper backup

**Security measures:**
- EVMs are burned with software at manufacture – cannot be reprogrammed in the field
- Multi-party sealing ceremony before and after polls
- Supreme Court-directed random VVPAT sample verification
- EVMs undergo technical review by all registered political parties' nominees

**Your rights:**
- You can petition the ECI for increased VVPAT verification if suspicious
- Election Petitions can be filed in High Court within 45 days of election results`,
  },
  {
    question: "model code of conduct",
    keywords: ["MCC", "model code", "conduct", "election rules", "what is allowed", "campaign"],
    answer: `**Model Code of Conduct (MCC) – Key Points:**

The MCC comes into force as soon as election dates are announced.

**Government restrictions:**
- No new policy announcements or schemes after MCC
- No government funds for election campaigning
- No transfers of key officials without EC approval

**Candidate restrictions:**
- No use of religious symbols/places for campaigning
- No hate speech or communal appeals
- Campaign spending limits (Lok Sabha: ₹95 lakh; Assembly: ₹40 lakh in most states)
- Campaign silence period: 48 hours before polling

**Polling Day:**
- No campaigning within 100 metres of polling booths
- No alcohol distribution (prohibited 48 hours before polling)
- No exit polls until last phase polling ends

**For violations:** File on cVIGIL app or call 1950`,
  },
];
