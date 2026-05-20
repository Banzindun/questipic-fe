import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Line, Circle } from 'react-native-svg';
import { COLORS } from '../../constants/theme';
import { QuestDetailMeta } from '../../constants/types';
import Lives from '../Lives';
import { CoinIcon } from '../Icons';
import { fmt } from '../../utils';

const C = {
  gold: COLORS.gold,
  inkHi: COLORS.text.primary,
  inkLo: 'rgba(235,230,215,0.55)',
  inkXLo: 'rgba(235,230,215,0.35)',
  rule: COLORS.border.light,
  red: '#FF4D4D',
} as const;

interface Props {
  quest: QuestDetailMeta;
  onBack: () => void;
}

export default function QuestHeader({ quest, onBack }: Props) {
  const pct = Math.round((quest.chapter / quest.totalChapters) * 100);
  const failed = quest.status === 'failed';
  const evalLabel = quest.evalMode === 'SOCIAL' ? 'Social Quest' : 'AI Quest';

  return (
    <View style={styles.wrapper}>
      {/* Background mood gradient */}
      <LinearGradient
        colors={[
          `hsl(${quest.heroHue}, 40%, 15%)`,
          `hsl(${quest.heroHue2}, 40%, 10%)`,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* Dark overlay for legibility */}
      <LinearGradient
        colors={['rgba(10,8,12,0.55)', 'rgba(10,8,12,0.86)', 'rgba(10,8,12,0.96)']}
        locations={[0, 0.65, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        {/* Top bar: back · chip · (spacer) */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconBtn} onPress={onBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.inkHi} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <Line x1="15" y1="18" x2="9" y2="12" />
              <Line x1="9" y1="12" x2="15" y2="6" />
            </Svg>
          </TouchableOpacity>

          <Text style={styles.eyebrow} numberOfLines={1}>
            {quest.theme} · {evalLabel}
          </Text>

          {/* Spacer to balance the back button */}
          <View style={styles.iconBtn} />
        </View>

        {/* Big serif quest title */}
        <Text style={styles.title} numberOfLines={2}>{quest.title}</Text>

        {/* Stat strip */}
        <View style={styles.statRow}>
          <Text style={[styles.statMono, { color: C.gold }]}>
            CH {String(quest.chapter).padStart(2, '0')}/{String(quest.totalChapters).padStart(2, '0')} · {quest.chapterName.toUpperCase()}
          </Text>
          <View style={styles.statDot} />
          <Lives count={failed ? 0 : quest.lives} max={quest.maxLives} />
          <View style={styles.statDot} />
          <Text style={styles.statMono}>{fmt(quest.playersRemaining)} left</Text>
          <View style={{ flex: 1 }} />
          <View style={styles.coinRow}>
            <CoinIcon size={11} />
            <Text style={[styles.statMono, { color: C.gold }]}>{quest.qcoinsEarned}</Text>
          </View>
        </View>
      </View>

      {/* Chapter progress bar flush at bottom */}
      <View style={styles.progressTrack}>
        <LinearGradient
          colors={failed ? [C.red, C.red] : ['#FF5A3C', C.gold]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressFill, { width: `${pct}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 11,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  iconBtn: {
    width: 28,
    height: 28,
    borderRadius: 2,
    backgroundColor: 'rgba(14,12,16,0.6)',
    borderWidth: 1,
    borderColor: C.rule,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 2.6,
    color: C.gold,
    fontWeight: '700',
  },
  title: {
    fontSize: 26,
    fontWeight: '400',
    color: C.inkHi,
    lineHeight: 28,
    letterSpacing: -0.3,
    marginBottom: 7,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    overflow: 'hidden',
  },
  statMono: {
    fontFamily: 'monospace',
    fontSize: 9.5,
    letterSpacing: 1.8,
    color: C.inkLo,
    fontWeight: '700',
  },
  statDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: C.inkXLo,
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  progressTrack: {
    height: 2,
    backgroundColor: 'rgba(235,230,215,0.08)',
  },
  progressFill: {
    height: 2,
  },
});
