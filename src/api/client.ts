import { API_URL } from '../constants/theme';
import { Quest, Player } from '../constants/types';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`API ${response.status}: ${body}`);
  }
  return response.json();
}

const api = {
  getQuests: () => request<Quest[]>('/quests'),
  getPlayer: () => request<Player>('/player'),
  joinQuest: (questId: string) =>
    request<{ success: boolean }>('/quests/join', {
      method: 'POST',
      body: JSON.stringify({ questId }),
    }),
  submitPhoto: (questId: string, chapterId: number, photoUri: string) =>
    request<{ score: number; passed: boolean }>('/quests/submit', {
      method: 'POST',
      body: JSON.stringify({ questId, chapterId, photoUri }),
    }),
};

export default api;
