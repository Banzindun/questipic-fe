import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface Props {
  label: string;
  sub: string;
  accent?: string;
  topGap?: boolean;
}

export default function SectionHeader({ label, sub, accent = COLORS.accent, topGap }: Props) {
  return (
    <View style={[styles.container, topGap && styles.topGap]}>
      <View style={[styles.dot, { backgroundColor: accent }]} />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
      <Text style={styles.sub}>{sub}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 2,
  },
  topGap: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border.subtle,
    marginTop: 8,
    paddingTop: 18,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 1,
  },
  label: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2.8,
    color: COLORS.gold,
    fontWeight: '700',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border.subtle,
  },
  sub: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.6,
    color: COLORS.text.muted,
  },
});
