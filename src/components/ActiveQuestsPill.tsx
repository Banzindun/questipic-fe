import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import { ChevronDownIcon } from './Icons';

interface Props {
  count: number;
  accent?: string;
  onPress: () => void;
}

export default function ActiveQuestsPill({ count, accent = COLORS.accent, onPress }: Props) {
  if (count === 0) return null;

  return (
    <TouchableOpacity style={styles.pill} onPress={onPress} activeOpacity={0.85}>
      <View style={[styles.countBadge, { backgroundColor: accent }]}>
        <Text style={styles.countText}>{count}</Text>
      </View>
      <Text style={styles.label}>YOUR ACTIVE QUESTS</Text>
      <ChevronDownIcon size={12} color={COLORS.gold} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    position: 'absolute',
    bottom: 86,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: 'rgba(14,12,16,0.9)',
    borderWidth: 1,
    borderColor: COLORS.border.goldMedium,
    // shadows handled per-platform below
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
  },
  countBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.text.dark,
  },
  label: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2.2,
    fontWeight: '700',
    color: COLORS.gold,
  },
});
