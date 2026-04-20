import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    const trimmed = name.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.login(trimmed);
      await signIn(res.result.userToken, res.involved.user.name);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Login failed';
      setError(msg.includes('401') ? 'Name not found. Check spelling and try again.' : msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.center}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.logoRow}>
          <Text style={styles.logoSymbol}>⬡</Text>
          <Text style={styles.logoText}>QUESTIPIC</Text>
        </View>
        <Text style={styles.tagline}>DARK FANTASY PHOTO QUEST</Text>

        <View style={styles.card}>
          <Text style={styles.label}>ENTER YOUR NAME</Text>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            value={name}
            onChangeText={(v) => { setName(v); setError(null); }}
            placeholder="ExactUsername"
            placeholderTextColor={COLORS.text.dimmed}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
            editable={!loading}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity onPress={handleLogin} disabled={loading || !name.trim()} activeOpacity={0.8}>
            <LinearGradient
              colors={['#FFC93C', '#E0A020']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button, (!name.trim() || loading) && styles.buttonDisabled]}
            >
              {loading
                ? <ActivityIndicator color={COLORS.text.dark} />
                : <Text style={styles.buttonText}>ENTER THE REALM</Text>}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={styles.hint}>Name lookup — dev auth only</Text>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg.app,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  logoSymbol: {
    fontSize: 28,
    color: COLORS.accent,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text.primary,
    letterSpacing: 6,
  },
  tagline: {
    fontSize: 11,
    letterSpacing: 4,
    color: COLORS.text.muted,
    marginBottom: 48,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.bg.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    padding: 24,
    gap: SPACING.lg,
  },
  label: {
    fontSize: 11,
    letterSpacing: 3,
    color: COLORS.text.secondary,
    fontWeight: '700',
  },
  input: {
    backgroundColor: COLORS.bg.app,
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.text.primary,
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  inputError: {
    borderColor: COLORS.tag.ending,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.tag.ending,
    marginTop: -SPACING.sm,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: COLORS.text.dark,
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 3,
  },
  hint: {
    marginTop: 24,
    fontSize: 11,
    color: COLORS.text.dimmed,
    letterSpacing: 1,
  },
});
