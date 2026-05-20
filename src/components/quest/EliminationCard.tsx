import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { EliminationData, QuestDetailMeta } from '../../constants/types';
import { COLORS } from '../../constants/theme';
import { CoinIcon } from '../Icons';
import { fmt } from '../../utils';

const C = {
  inkHi: COLORS.text.primary,
  ink: 'rgba(235,230,215,0.78)',
  inkXLo: 'rgba(235,230,215,0.35)',
  rule: COLORS.border.light,
  gold: COLORS.gold,
  red: '#FF4D4D',
  redDim: 'rgba(255,77,77,0.4)',
} as const;

interface Props {
  elim: EliminationData;
  quest: QuestDetailMeta;
  accent: string;
}

function HeartOutline() {
  return (
    <Svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth={2}>
      <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
  );
}

export default function EliminationCard({ elim, quest, accent }: Props) {
  return (
    <View style={styles.outer}>
      <View style={styles.card}>
        {/* Red header strip */}
        <View style={styles.strip}>
          <HeartOutline />
          <Text style={styles.stripLabel}>YOU WERE ELIMINATED</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.stripRight}>{elim.finishedAt.toUpperCase()}</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.sectionLabel}>FINAL REASON</Text>
          <Text style={styles.reason}>{elim.reason}</Text>

          <Text style={styles.sectionLabel}>AI EPILOGUE</Text>
          <Text style={styles.epilogue}>{elim.resolution}</Text>

          {/* Run stats */}
          <View style={styles.statsGrid}>
            <View style={[styles.statCell, { borderRightWidth: 1, borderRightColor: C.rule }]}>
              <Text style={styles.statLabel}>EARNED</Text>
              <View style={styles.statValueRow}>
                <CoinIcon size={14} />
                <Text style={[styles.statValue, { color: C.gold }]}>{elim.reward}</Text>
              </View>
            </View>
            <View style={[styles.statCell, { borderRightWidth: 1, borderRightColor: C.rule }]}>
              <Text style={styles.statLabel}>RANK</Text>
              <Text style={styles.statValue}>#{fmt(elim.rank)}</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.statLabel}>STILL IN</Text>
              <Text style={styles.statValue}>{fmt(elim.remaining)}</Text>
            </View>
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: accent }]}>
              <Text style={[styles.primaryBtnText, { color: '#0E0C10' }]}>READ THE ENDING →</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ghostBtn}>
              <Text style={styles.ghostBtnText}>SHARE YOUR RUN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginVertical: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#1A0E10',
    borderWidth: 1,
    borderColor: 'rgba(255,77,77,0.4)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  strip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#2A0C0E',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,77,77,0.4)',
    gap: 8,
  },
  stripLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: '800',
    color: '#FF4D4D',
  },
  stripRight: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 2,
    color: 'rgba(255,77,77,0.7)',
    fontWeight: '600',
  },
  body: {
    padding: 20,
    paddingTop: 20,
  },
  sectionLabel: {
    fontFamily: 'monospace',
    fontSize: 9.5,
    letterSpacing: 2.4,
    color: '#FF4D4D',
    fontWeight: '700',
    marginBottom: 8,
  },
  reason: {
    fontSize: 17,
    fontStyle: 'italic',
    color: '#EBE6D7',
    lineHeight: 24,
    marginBottom: 18,
  },
  epilogue: {
    fontSize: 16,
    color: 'rgba(235,230,215,0.78)',
    lineHeight: 24,
    marginBottom: 18,
  },
  statsGrid: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(235,230,215,0.10)',
    borderRadius: 2,
    marginBottom: 14,
  },
  statCell: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'monospace',
    fontSize: 8.5,
    letterSpacing: 2.2,
    color: 'rgba(235,230,215,0.35)',
    fontWeight: '700',
    marginBottom: 4,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '400',
    color: '#EBE6D7',
    lineHeight: 24,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  primaryBtn: {
    flex: 1,
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 2,
    alignItems: 'center',
  },
  primaryBtnText: {
    fontFamily: 'monospace',
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 2.2,
  },
  ghostBtn: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(235,230,215,0.10)',
    alignItems: 'center',
  },
  ghostBtnText: {
    fontFamily: 'monospace',
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 2.2,
    color: '#EBE6D7',
  },
});
