import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';
import { Quest } from '../constants/types';
import { fmt } from '../api/mockData';
import { UsersIcon, ClockIcon, CoinIcon, RuneCorner } from './Icons';
import Lives from './Lives';

interface Props {
  quest: Quest;
  accent?: string;
  onPress?: () => void;
}

// Tag badge — strong (HOT/NEW/ENDING SOON) or quiet (CUSTOM/IN-PROGRESS)
function QuestTag({ tag, accent }: { tag: string; accent: string }) {
  const STRONG: Record<string, string> = {
    NEW: '#FFC93C',
    HOT: accent,
    'ENDING SOON': '#FF4D4D',
  };
  const strongColor = STRONG[tag];

  if (strongColor) {
    const isNew = tag === 'NEW';
    return (
      <View style={[styles.tagStrong, { backgroundColor: strongColor }]}>
        <Text style={[styles.tagStrongText, { color: isNew ? '#0E0C10' : '#FFFFFF' }]}>
          {tag}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.tagQuiet}>
      <Text style={styles.tagQuietText}>{tag}</Text>
    </View>
  );
}

export default function QuestCard({ quest: q, accent = COLORS.accent, onPress }: Props) {
  const isCustom = q.kind === 'custom';

  return (
    <View style={styles.card}>
      {/* Hero area with gradient background */}
      <View style={styles.hero}>
        {/* Colored gradient placeholder for scene art */}
        <LinearGradient
          colors={[
            `hsl(${q.heroHue}, 55%, 28%)`,
            `hsl(${q.heroHue2}, 55%, 42%)`,
            `hsl(${(q.heroHue + 20) % 360}, 55%, 42%)`,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {/* Cinematic bottom gradient */}
        <LinearGradient
          colors={['rgba(14,12,16,0)', 'rgba(14,12,16,0.7)', 'rgba(14,12,16,0.98)']}
          locations={[0.35, 0.7, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* Rune corners */}
        <View style={styles.runeTL}><RuneCorner /></View>
        <View style={styles.runeTR}><RuneCorner /></View>
        <View style={styles.runeBL}><RuneCorner /></View>
        <View style={styles.runeBR}><RuneCorner /></View>

        {/* Tag */}
        {q.tag ? <QuestTag tag={q.tag} accent={accent} /> : null}

        {/* Bottom content overlay */}
        <View style={styles.heroContent}>
          <Text style={[styles.themeLine, { color: accent }]}>
            {q.theme} · {q.size} CHAPTERS
          </Text>
          <Text style={styles.title}>{q.title}</Text>
          <Text style={styles.hook}>{q.hook}</Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <UsersIcon size={11} color="#8A8396" />
              <Text style={styles.statText}>{fmt(q.players)}</Text>
            </View>
            {q.timeLeft && (
              <View style={styles.stat}>
                <ClockIcon size={11} color="#8A8396" />
                <Text style={styles.statText}>{q.timeLeft}</Text>
              </View>
            )}
            <Text style={styles.statText}>
              {q.evalMode === 'AI' ? 'AI · JUDGED' : 'SOCIAL · VOTED'}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer strip */}
      <View style={styles.footer}>
        {q.joined ? (
          <>
            <View style={styles.footerInfo}>
              <View style={styles.progressHeader}>
                <Text style={styles.chapterText}>
                  CH {q.chapter} / {q.size}
                </Text>
                <Lives count={q.lives ?? 0} max={q.maxLives ?? 3} />
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${(q.progress ?? 0) * 100}%`,
                      backgroundColor: accent,
                    },
                  ]}
                />
              </View>
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: accent }]} onPress={onPress}>
              <Text style={styles.buttonText}>RESUME →</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.footerInfo}>
              {q.reward ? (
                <View style={styles.rewardRow}>
                  <CoinIcon size={16} />
                  <View>
                    <Text style={styles.rewardAmount}>{q.reward}</Text>
                    <Text style={styles.rewardLabel}>MAX REWARD</Text>
                  </View>
                </View>
              ) : isCustom && q.host ? (
                <Text style={styles.hostText}>HOSTED BY {q.host.toUpperCase()}</Text>
              ) : null}
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: accent }]} onPress={onPress}>
              <Text style={styles.buttonText}>
                {isCustom ? 'ENTER LOBBY →' : 'JOIN QUEST →'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    backgroundColor: COLORS.bg.card,
  },
  hero: {
    aspectRatio: 4 / 5,
    position: 'relative',
  },
  // Rune corner positions
  runeTL: { position: 'absolute', top: 8, left: 8, zIndex: 2 },
  runeTR: { position: 'absolute', top: 8, right: 8, zIndex: 2, transform: [{ scaleX: -1 }] },
  runeBL: { position: 'absolute', bottom: 8, left: 8, zIndex: 2, transform: [{ scaleY: -1 }] },
  runeBR: { position: 'absolute', bottom: 8, right: 8, zIndex: 2, transform: [{ scaleX: -1 }, { scaleY: -1 }] },
  // Tags
  tagStrong: {
    position: 'absolute',
    top: 14,
    left: 14,
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 2,
    zIndex: 3,
  },
  tagStrongText: {
    fontFamily: 'monospace',
    fontSize: 10.5,
    letterSpacing: 2.8,
    fontWeight: '800',
  },
  tagQuiet: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingVertical: 5,
    paddingHorizontal: 9,
    backgroundColor: 'rgba(14,12,16,0.78)',
    borderWidth: 1,
    borderColor: 'rgba(224,201,122,0.45)',
    zIndex: 3,
  },
  tagQuietText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 2.4,
    color: COLORS.gold,
    fontWeight: '700',
  },
  // Hero overlay content
  heroContent: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 16,
  },
  themeLine: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    color: '#F4F0E2',
    lineHeight: 30,
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  hook: {
    fontSize: 12.5,
    color: 'rgba(235,230,215,0.75)',
    lineHeight: 19,
    marginBottom: 14,
    maxWidth: 320,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.medium,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.4,
    color: COLORS.text.secondary,
    fontWeight: '600',
  },
  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    paddingHorizontal: 18,
    backgroundColor: COLORS.bg.footer,
    borderTopWidth: 1,
    borderTopColor: 'rgba(235,230,215,0.06)',
    gap: 12,
  },
  footerInfo: {
    flex: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  chapterText: {
    fontFamily: 'monospace',
    fontSize: 9.5,
    letterSpacing: 2,
    color: COLORS.gold,
    fontWeight: '600',
  },
  progressTrack: {
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.border.subtle,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rewardAmount: {
    fontSize: 15,
    color: COLORS.gold,
    fontWeight: '700',
    lineHeight: 16,
  },
  rewardLabel: {
    fontFamily: 'monospace',
    fontSize: 8.5,
    letterSpacing: 1.8,
    color: COLORS.text.muted,
    marginTop: 2,
  },
  hostText: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1.8,
    color: COLORS.text.secondary,
  },
  button: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 2,
  },
  buttonText: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: COLORS.text.dark,
  },
});
