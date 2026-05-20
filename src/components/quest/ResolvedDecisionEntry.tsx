import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ResolvedDecisionEntry as ResolvedDecisionEntryType } from '../../constants/types';
import { COLORS } from '../../constants/theme';

const C = {
  cardPast: '#100E14',
  inkHi: COLORS.text.primary,
  inkLo: 'rgba(235,230,215,0.55)',
  inkXLo: 'rgba(235,230,215,0.35)',
  rule: COLORS.border.light,
  ruleLo: 'rgba(235,230,215,0.06)',
  gold: COLORS.gold,
  goldDim: 'rgba(224,201,122,0.45)',
} as const;

interface Props {
  entry: ResolvedDecisionEntryType;
  accent: string;
}

export default function ResolvedDecisionEntry({ entry, accent }: Props) {
  const evalLabel =
    entry.evalMode === 'SOCIAL' ? 'Social vote' : 'AI judged';

  return (
    <View style={styles.card}>
      {/* Past card header */}
      <View style={styles.header}>
        <Text style={styles.headerKind}>· STORY DECISION</Text>
        {entry.timeAgo && <Text style={styles.headerMeta}>{entry.timeAgo}</Text>}
        <View style={{ flex: 1 }} />
        <Text style={styles.headerMeta}>{evalLabel}</Text>
      </View>

      <Text style={styles.setup}>{entry.setup}</Text>

      <View style={styles.options}>
        {entry.options.map((opt) => {
          const picked = opt.letter === entry.picked;
          const crowd = opt.letter === entry.crowdPicked;
          return (
            <View
              key={opt.letter}
              style={[
                styles.option,
                picked
                  ? { borderColor: C.goldDim, backgroundColor: 'rgba(224,201,122,0.06)' }
                  : { borderColor: C.ruleLo, opacity: 0.55 },
              ]}
            >
              <View style={[
                styles.letterBox,
                picked
                  ? { backgroundColor: accent, borderColor: accent }
                  : { backgroundColor: 'transparent', borderColor: C.rule },
              ]}>
                <Text style={[styles.letter, { color: picked ? '#0E0C10' : C.inkLo }]}>
                  {opt.letter}
                </Text>
              </View>
              <Text style={[
                styles.optionText,
                picked
                  ? { color: C.inkHi }
                  : { color: C.inkLo, textDecorationLine: 'line-through' },
              ]}>
                {opt.text}
              </Text>
              {crowd && (
                <Text style={styles.majorityTag}>MAJORITY</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#100E14',
    borderWidth: 1,
    borderColor: 'rgba(235,230,215,0.10)',
    borderRadius: 2,
    marginBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  headerKind: {
    fontFamily: 'monospace',
    fontSize: 8.5,
    letterSpacing: 2.2,
    color: '#E0C97A',
    fontWeight: '700',
  },
  headerMeta: {
    fontFamily: 'monospace',
    fontSize: 8.5,
    letterSpacing: 2.2,
    color: 'rgba(235,230,215,0.35)',
    fontWeight: '700',
  },
  setup: {
    fontSize: 14.5,
    fontStyle: 'italic',
    color: 'rgba(235,230,215,0.55)',
    lineHeight: 21,
    marginTop: 6,
    marginBottom: 14,
  },
  options: {
    gap: 6,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 2,
  },
  letterBox: {
    width: 22,
    height: 22,
    borderRadius: 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  letter: {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: '800',
  },
  optionText: {
    flex: 1,
    fontSize: 14.5,
    lineHeight: 19,
  },
  majorityTag: {
    fontFamily: 'monospace',
    fontSize: 8.5,
    letterSpacing: 2,
    color: '#E0C97A',
    fontWeight: '700',
  },
});
