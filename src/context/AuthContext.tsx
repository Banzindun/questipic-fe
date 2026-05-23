import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUnauthorizedHandler } from '../api/client';

const TOKEN_KEY = 'auth_token';
const NAME_KEY = 'auth_name';

interface AuthState {
  token: string | null;
  userName: string | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  signIn: (token: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    token: null,
    userName: null,
    isLoading: true,
  });

  useEffect(() => {
    AsyncStorage.multiGet([TOKEN_KEY, NAME_KEY]).then(([[, token], [, name]]) => {
      setState({ token, userName: name, isLoading: false });
    });
  }, []);

  async function signIn(token: string, name: string) {
    await AsyncStorage.multiSet([[TOKEN_KEY, token], [NAME_KEY, name]]);
    setState({ token, userName: name, isLoading: false });
  }

  async function signOut() {
    await AsyncStorage.multiRemove([TOKEN_KEY, NAME_KEY]);
    setState({ token: null, userName: null, isLoading: false });
  }

  const signOutRef = useRef(signOut);
  signOutRef.current = signOut;

  useEffect(() => {
    setUnauthorizedHandler(() => {
      signOutRef.current();
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
