export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  location: string;
  isAdmin: boolean;
}

export interface Comment {
  id: string;
  threadId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  likes: number;
  likedBy: string[];
  timestamp: string;
  replies: Reply[];
}

export interface Reply {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  likes: number;
  likedBy: string[];
  timestamp: string;
}

export interface DebateMessage {
  id: string;
  userId: string;
  userName: string;
  side: "for" | "against";
  content: string;
  timestamp: string;
}

export interface Debate {
  id: string;
  threadId: string;
  topic: string;
  forUser: { id: string; name: string; avatar: string };
  againstUser: { id: string; name: string; avatar: string };
  viewers: number;
  status: "live" | "ended";
  startTime: string;
  endTime?: string;
  messages: DebateMessage[];
  aiSummary?: {
    forPoints: string[];
    againstPoints: string[];
  };
}

export interface Thread {
  id: string;
  title: string;
  description: string;
  category: string;
  postedBy: string;
  postedAt: string;
  deadlineAt: string;
  status: "active" | "ended" | "archived";
  tags: string[];
  debates: Debate[];
  comments: Comment[];
  commonPointsSummary?: {
    forPoints: string[];
    againstPoints: string[];
  };
}

export interface GovernmentWork {
  id: string;
  title: string;
  mp: string;
  mla: string;
  state: string;
  district: string;
  location: string;
  category: string;
  allocatedBudget: number;
  usedBudget: number;
  progress: number;
  status: "completed" | "ongoing" | "delayed";
  startDate: string;
  expectedEnd: string;
  actualEnd?: string;
  description: string;
  photoUrl?: string;
  scheme: string;
}

export interface Leader {
  id: string;
  name: string;
  party: string;
  position: string;
  constituency: string;
  manifesto: ManifestoItem[];
}

export interface ManifestoItem {
  id: string;
  category: string;
  promise: string;
  detail: string;
  keywords: string[];
}
