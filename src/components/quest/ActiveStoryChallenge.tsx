import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Polyline, Line } from 'react-native-svg';
import { ActiveStoryChallenge as ActiveStoryChallengeType } from '../../constants/types';
import { COLORS } from '../../constants/theme';
import { fmt } from '../../utils';
import ActivePhaseLiveDot from './ActivePhaseLiveDot';

const NOTIF_ORANGE = '#FF5A3C';

const C = {
  card: COLORS.bg.card,
  inkHi: COLORS.text.primary,
  ink: 'rgba(235,230,215,0.78)',
  inkLo: 'rgba(235,230,215,0.55)',
  inkXLo: 'rgba(235,230,215,0.35)',
  rule: COLORS.border.light,
  ruleLo: 'rgba(235,230,215,0.06)',
  gold: COLORS.gold,
  goldDim: 'rgba(224,201,122,0.45)',
} as const;

interface Props {
  challenge: ActiveStoryChallengeType;
  accent: string;
  onVote: (letter: string) => void;
}

export default function ActiveStoryChallenge({ challenge, accent, onVote }: Props) {
  const totalVotes = challenge.votes.A + challenge.votes.B + challenge.votes.C;
  const evalLabel = challenge.evalMode === 'SOCIAL' ? 'Decided by majority' : 'AI will judge';

  return (
    <View style={styles.outer}>
      <LinearGradient
        colors={[`${NOTIF_ORANGE}38`, 'transparent']}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.card}>
        {/* Countdown strip */}
        <View style={styles.strip}>
          <ActivePhaseLiveDot />
          <Text style={styles.stripLabel}>STORY DECISION</Text>
          <View style={{ flex: 1 }} />
          <View style={styles.stripClock}>
            <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#0E0C10" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
              <Circle cx={12} cy={12} r={10} />
              <Polyline points="12 6 12 12 16 14" />
            </Svg>
            <Text style={styles.stripRight}>{challenge.timeLeft} left</Text>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <Text style={styles.prompt}>{challenge.prompt}</Text>
          <Text style={styles.setup}>{challenge.setup}</Text>

          {/* Options */}
          <View style={styles.options}>
            {challenge.options.map((opt) => {
              const votes = challenge.votes[opt.letter as 'A' | 'B' | 'C'];
              const pct = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
              return (
                <TouchableOpacity
                  key={opt.letter}
                  style={styles.optionBtn}
                  onPress={() => onVote(opt.letter)}
                >
                  <View style={[styles.voteFill, { width: `${pct}%` }]} />
                  <View style={styles.optionLetter}>
                    <Text style={styles.optionLetterText}>{opt.letter}</Text>
                  </View>
                  <Text style={styles.optionText} numberOfLines={2}>{opt.text}</Text>
                  <Text style={styles.optionPct}>{pct}%</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.footerMeta}>{fmt(totalVotes)} voted</Text>
              <Text style={[styles.footerMeta, { color: C.gold }]}>{evalLabel}</Text>
            </View>
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: accent }]}>
              <Text style={[styles.primaryBtnText, { color: '#0E0C10' }]}>CAST YOUR VOTE →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    position: 'relative',
    marginVertical: 8,
    marginBottom: 24,
    borderRadius: 4,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#14121A',
    borderWidth: 1,
    borderColor: NOTIF_ORANGE,
    borderRadius: 2,
    overflow: 'hidden',
  },
  strip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
    paddingHorizontal: 14,
    backgroundColor: NOTIF_ORANGE,
    gap: 10,
  },
  stripLabel: {
    fontFamily: 'monospace',
    fontSize: 10.5,
    letterSpacing: 2.4,
    fontWeight: '800',
    color: '#0E0C10',
  },
  stripClock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stripRight: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.8,
    fontWeight: '700',
    color: '#0E0C10',
  },
  body: {
    padding: 18,
  },
  prompt: {
    fontSize: 28,
    fontWeight: '400',
    color: '#EBE6D7',
    lineHeight: 30,
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  setup: {
    fontSize: 15.5,
    fontStyle: 'italic',
    color: 'rgba(235,230,215,0.78)',
    lineHeight: 23,
    marginBottom: 18,
  },
  options: {
    gap: 8,
    marginBottom: 14,
  },
  optionBtn: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(235,230,215,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(235,230,215,0.10)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  voteFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(224,201,122,0.08)',
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 2,
    backgroundColor: '#0E0C10',
    borderWidth: 1,
    borderColor: 'rgba(224,201,122,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  optionLetterText: {
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: '800',
    color: '#E0C97A',
  },
  optionText: {
    flex: 1,
    fontSize: 15.5,
    color: '#EBE6D7',
    lineHeight: 20,
  },
  optionPct: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.4,
    color: 'rgba(235,230,215,0.55)',
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(235,230,215,0.06)',
  },
  footerMeta: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 2,
    color: 'rgba(235,230,215,0.35)',
    fontWeight: '600',
    lineHeight: 14,
  },
  primaryBtn: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 2,
  },
  primaryBtnText: {
    fontFamily: 'monospace',
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 2.2,
  },
});
