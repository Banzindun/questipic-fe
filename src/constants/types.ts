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
}

export interface Player {
  name: string;
  level: number;
  xp: number;
  qcoins: number;
  avatar: number;
  unread: number;
  fame: number;
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
