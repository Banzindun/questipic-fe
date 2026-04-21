import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/client';
import { User } from '../constants/types';
import { useAuth } from './AuthContext';

const USER_CACHE_KEY = 'user_data';

interface UserContextValue {
  user: User | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
  clearUser: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | null>(null);

function hydrateUser(raw: Record<string, unknown>): User {
  return { ...(raw as User), createdAt: new Date(raw.createdAt as string) };
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(USER_CACHE_KEY).then(cached => {
      if (cached) setUser(hydrateUser(JSON.parse(cached)));
      setIsLoading(false);
    });
  }, []);

  const clearUser = useCallback(async () => {
    await AsyncStorage.removeItem(USER_CACHE_KEY);
    setUser(null);
  }, []);

  const refresh = useCallback(async () => {
    if (!token) return;
    try {
      const data = await api.getMe();
      setUser(hydrateUser(data as unknown as Record<string, unknown>));
      await AsyncStorage.setItem(USER_CACHE_KEY, JSON.stringify(data));
    } catch {
      // keep cached value on network failure
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      refresh();
    } else {
      clearUser();
    }
  }, [token, refresh, clearUser]);

  return (
    <UserContext.Provider value={{ user, isLoading, refresh, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
