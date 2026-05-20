import { ImageSourcePropType } from 'react-native';

// ─── Quest Detail types ───────────────────────────────────────────────────────

export interface QuestDetailMeta {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  chapter: number;
  chapterName: string;
  totalChapters: number;
  lives: number;
  maxLives: number;
  playersRemaining: number;
  heroHue: number;
  heroHue2: number;
  evalMode: 'AI' | 'SOCIAL';
  qcoinsEarned: number;
  status: 'active' | 'failed';
}

export interface StoryOption {
  letter: string;
  text: string;
}

export interface ActiveStoryChallenge {
  kind: 'story';
  chapter: number;
  prompt: string;
  setup: string;
  options: StoryOption[];
  evalMode: 'AI' | 'SOCIAL';
  votes: { A: number; B: number; C: number };
  timeLeft: string;
}

export interface ActivePhotoChallenge {
  kind: 'photo';
  chapter: number;
  prompt: string;
  setup: string;
  rubric: string[];
  evalMode: 'AI' | 'SOCIAL';
  timeLeft: string;
  state: 'awaiting' | 'judging' | 'passed' | 'failed';
  submittedPhotoUri?: string;
  aiNote?: string;
  nextStoryContinuation?: string;
}

export type ActiveChallenge = ActiveStoryChallenge | ActivePhotoChallenge;

export interface DiaryImage {
  hue: number;
  hue2: number;
  label: string;
}

export interface NarrationEntry {
  type: 'narration';
  chapter: number;
  timeAgo?: string;
  text: string;
  isOpening?: boolean;
  image?: DiaryImage;
}

export interface ResolvedDecisionEntry {
  type: 'resolved-decision';
  chapter: number;
  timeAgo?: string;
  prompt: string;
  setup: string;
  options: StoryOption[];
  picked: string;
  crowdPicked: string;
  evalMode: 'AI' | 'SOCIAL';
}

export interface ResolvedPhotoEntry {
  type: 'resolved-photo';
  chapter: number;
  timeAgo?: string;
  prompt: string;
  passed: boolean;
  aiNote: string;
  image?: DiaryImage;
}

export interface LifeLostEntry {
  type: 'life-lost';
  chapter: number;
  timeAgo?: string;
  reason: string;
}

export interface QuestStartEntry {
  type: 'quest-start';
  timeAgo: string;
}

export type DiaryEntry =
  | NarrationEntry
  | ResolvedDecisionEntry
  | ResolvedPhotoEntry
  | LifeLostEntry
  | QuestStartEntry;

export interface EliminationData {
  chapter: number;
  reason: string;
  resolution: string;
  finishedAt: string;
  reward: number;
  rank: number;
  remaining: number;
}

export interface QuestDetail {
  quest: QuestDetailMeta;
  active: ActiveChallenge | null;
  diary: DiaryEntry[];
  elimination?: EliminationData;
}

// ─── Feed types ───────────────────────────────────────────────────────────────

export interface Quest {
  id: string;
  kind: 'competitive' | 'custom';
  theme: string;
  title: string;
  hook: string;
  heroHue: number;
  heroHue2: number;
  players: number;
  timeLeft: string | null;
  size: number;
  chapter: number | null;
  progress?: number;
  reward: number | null;
  joined: boolean;
  lives: number | null;
  maxLives?: number;
  evalMode: 'AI' | 'SOCIAL';
  tag: string;
  host?: string;
  image?: ImageSourcePropType;
}

export interface User {
  googleId?: string;
  email?: string;
  id?: string;
  token: string;
  name: string;
  profilePicture: string | null;
  avatar: number;
  createdAt: Date;
  coins: number;
  level: number;
  xp: number;
  qcoins: number;
  unread: number;
  fame: number;
  stats: number[];
}
