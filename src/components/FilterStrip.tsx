import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

const CHIPS = ['For you', 'Competitive', 'Custom', 'Active', 'Fantasy', 'Sci-fi', 'Horror'];

interface Props {
  selected?: number;
  onSelect?: (index: number) => void;
}

export default function FilterStrip({ selected = 0, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {CHIPS.map((label, i) => {
          const active = i === selected;
          return (
            <TouchableOpacity
              key={label}
              onPress={() => onSelect?.(i)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {label.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bg.header,
    paddingTop: 10,
    paddingBottom: 14,
  },
  scroll: {
    paddingHorizontal: 16,
    gap: 6,
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: COLORS.border.medium,
  },
  chipActive: {
    backgroundColor: COLORS.text.primary,
    borderColor: COLORS.text.primary,
  },
  chipText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.8,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },
  chipTextActive: {
    color: COLORS.text.dark,
  },
});
