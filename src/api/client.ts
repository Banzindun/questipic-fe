import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants/theme';
import { Quest, Player } from '../constants/types';

interface LoginResponse {
  result: { type: 'LoginDto'; userToken: string };
  involved: { user: { name: string; [key: string]: unknown } };
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await AsyncStorage.getItem('auth_token');
  const url = `${API_URL}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`API ${response.status}: ${body}`);
  }
  return response.json();
}

const api = {
  login: (name: string) =>
    request<LoginResponse>('/login', {
      method: 'POST',
      body: JSON.stringify({ name }),
    }),
  getMe: () => request<Player>('/user'),
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
