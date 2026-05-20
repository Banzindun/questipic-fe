import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line, Polyline } from 'react-native-svg';
import { ActivePhotoChallenge as ActivePhotoChallengeType } from '../../constants/types';
import { COLORS } from '../../constants/theme';

const NOTIF_ORANGE = '#FF5A3C';

const C = {
  card: COLORS.bg.card,
  inkHi: COLORS.text.primary,
  ink: 'rgba(235,230,215,0.78)',
  inkXLo: 'rgba(235,230,215,0.35)',
  rule: COLORS.border.light,
  ruleLo: 'rgba(235,230,215,0.06)',
  gold: COLORS.gold,
  goldDim: 'rgba(224,201,122,0.45)',
  red: '#FF4D4D',
  redDim: 'rgba(255,77,77,0.4)',
} as const;

interface Props {
  challenge: ActivePhotoChallengeType;
  accent: string;
  onTakePhoto: () => void;
}

// Pulsing live dot
function LiveDot() {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, { toValue: 2.2, duration: 1300, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: 0, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0, duration: 1300, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 0, useNativeDriver: true }),
        ]),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  return (
    <View style={styles.liveDotWrap}>
      <View style={styles.liveDotInner} />
      <Animated.View style={[styles.liveDotRing, { transform: [{ scale }], opacity }]} />
    </View>
  );
}

// Judging scan line animation
function JudgingScanLine() {
  const pos = useRef(new Animated.Value(0)).current;
  const alpha = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.parallel([
        Animated.timing(pos, {
          toValue: 1, duration: 1800,
          easing: Easing.linear, useNativeDriver: false,
        }),
        Animated.sequence([
          Animated.timing(alpha, { toValue: 0, duration: 0, useNativeDriver: true }),
          Animated.timing(alpha, { toValue: 1, duration: 180, useNativeDriver: true }),
          Animated.timing(alpha, { toValue: 1, duration: 1440, useNativeDriver: true }),
          Animated.timing(alpha, { toValue: 0, duration: 180, useNativeDriver: true }),
        ]),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  const topPct = pos.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.scanLine, { top: topPct, opacity: alpha }]}
    />
  );
}

// Bouncing judging dots
function JudgingDots() {
  const dots = [0, 0.15, 0.3].map((delay) => {
    const y = useRef(new Animated.Value(0)).current;
    const a = useRef(new Animated.Value(0.2)).current;
    useEffect(() => {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.delay(delay * 1000),
          Animated.parallel([
            Animated.sequence([
              Animated.timing(y, { toValue: -2, duration: 300, useNativeDriver: true }),
              Animated.timing(y, { toValue: 0, duration: 300, useNativeDriver: true }),
              Animated.timing(y, { toValue: 0, duration: 400, useNativeDriver: true }),
            ]),
            Animated.sequence([
              Animated.timing(a, { toValue: 1, duration: 300, useNativeDriver: true }),
              Animated.timing(a, { toValue: 0.2, duration: 300, useNativeDriver: true }),
              Animated.timing(a, { toValue: 0.2, duration: 400, useNativeDriver: true }),
            ]),
          ]),
        ])
      );
      loop.start();
      return () => loop.stop();
    }, []);
    return { y, a };
  });

  return (
    <View style={styles.dotsRow}>
      {dots.map((d, i) => (
        <Animated.View
          key={i}
          style={[styles.dot, { transform: [{ translateY: d.y }], opacity: d.a }]}
        />
      ))}
    </View>
  );
}

export default function ActivePhotoChallenge({ challenge, accent, onTakePhoto }: Props) {
  const { state } = challenge;

  const stripColor =
    state === 'passed' ? C.gold :
    state === 'failed' ? C.red :
    NOTIF_ORANGE;

  const stripLabel =
    state === 'passed' ? 'PASSED' :
    state === 'failed' ? 'DID NOT PASS' :
    state === 'judging' ? 'AI IS JUDGING' :
    'PHOTO CHALLENGE';

  const stripRight =
    state === 'passed' ? '2m ago' :
    state === 'failed' ? '−1 LIFE' :
    challenge.timeLeft;

  return (
    <View style={styles.outer}>
      {/* Ember glow rim */}
      <LinearGradient
        colors={[`${stripColor}38`, 'transparent']}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <View style={[styles.card, { borderColor: stripColor }]}>
        {/* Countdown / status strip */}
        <View style={[styles.strip, { backgroundColor: stripColor }]}>
          {(state === 'awaiting' || state === 'judging') && <LiveDot />}
          <Text style={styles.stripLabel}>{stripLabel}</Text>
          <View style={{ flex: 1 }} />
          {state === 'awaiting' && (
            <View style={styles.stripClock}>
              <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#0E0C10" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                <Circle cx={12} cy={12} r={10} />
                <Polyline points="12 6 12 12 16 14" />
              </Svg>
              <Text style={styles.stripRight}>{stripRight} left</Text>
            </View>
          )}
          {(state === 'judging' || state === 'passed' || state === 'failed') && (
            <Text style={styles.stripRight}>{stripRight}</Text>
          )}
        </View>

        {/* Body */}
        <View style={styles.body}>
          <Text style={styles.prompt}>{challenge.prompt}</Text>
          <Text style={styles.setup}>{challenge.setup}</Text>

          {/* === AWAITING state === */}
          {state === 'awaiting' && (
            <>
              <View style={styles.dropZone}>
                <View style={styles.cameraIconBox}>
                  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <Circle cx={12} cy={13} r={4} />
                  </Svg>
                </View>
                <Text style={styles.captureLabel}>CAPTURE IN APP · NO UPLOADS</Text>
                <View style={styles.rubricRow}>
                  {challenge.rubric.map((r) => (
                    <View key={r} style={styles.rubricChip}>
                      <Text style={styles.rubricText}>{r.toUpperCase()}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.hintBox}>
                <Text style={styles.hintText}>
                  AI judges on{' '}
                  <Text style={{ color: C.gold }}>fit · originality · composition</Text>
                  {' · The bar is hidden — submit your best read'}
                </Text>
              </View>
              <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: accent }]} onPress={onTakePhoto}>
                <Text style={[styles.primaryBtnText, { color: '#0E0C10' }]}>TAKE PHOTO</Text>
              </TouchableOpacity>
            </>
          )}

          {/* === JUDGING state === */}
          {state === 'judging' && (
            <>
              <View style={styles.photoPlaceholder}>
                <LinearGradient
                  colors={['rgba(14,12,16,0.9)', 'rgba(14,12,16,0.6)', 'rgba(14,12,16,0.9)']}
                  style={StyleSheet.absoluteFill}
                />
                <JudgingScanLine />
                <JudgingDots />
                <Text style={styles.judgingLabel}>AI IS JUDGING</Text>
                <Text style={styles.judgingCaption}>fit · originality · composition</Text>
              </View>
              <View style={[styles.primaryBtn, { backgroundColor: 'rgba(235,230,215,0.08)', borderColor: C.rule, borderWidth: 1 }]}>
                <Text style={[styles.primaryBtnText, { color: C.inkXLo }]}>SUBMITTING…</Text>
              </View>
            </>
          )}

          {/* === PASSED state === */}
          {state === 'passed' && (
            <>
              <View style={[styles.photoPlaceholder, { borderColor: C.goldDim }]}>
                <LinearGradient
                  colors={[`hsl(${challenge.chapter * 30}, 40%, 18%)`, `hsl(${challenge.chapter * 30 + 40}, 40%, 14%)`]}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.shotBadge}>
                  <Text style={styles.shotBadgeText}>Your shot</Text>
                </View>
              </View>
              {challenge.aiNote && (
                <Text style={styles.aiNote}>
                  <Text style={styles.aiNoteLabel}>AI NOTE  </Text>
                  {challenge.aiNote}
                </Text>
              )}
              <View style={[styles.continuationBox, { borderColor: C.goldDim, backgroundColor: 'rgba(224,201,122,0.06)' }]}>
                <Text style={[styles.continuationTitle, { color: C.gold }]}>YOU'RE THROUGH</Text>
                {challenge.nextStoryContinuation && (
                  <Text style={styles.continuationText}>{challenge.nextStoryContinuation}</Text>
                )}
              </View>
              <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: accent }]}>
                <Text style={[styles.primaryBtnText, { color: '#0E0C10' }]}>CONTINUE THE STORY →</Text>
              </TouchableOpacity>
            </>
          )}

          {/* === FAILED state === */}
          {state === 'failed' && (
            <>
              <View style={[styles.photoPlaceholder, { borderColor: C.redDim }]}>
                <LinearGradient
                  colors={['rgba(40,8,8,0.9)', 'rgba(20,4,4,0.6)']}
                  style={StyleSheet.absoluteFill}
                />
                <View style={[styles.shotBadge, { backgroundColor: C.red }]}>
                  <Text style={[styles.shotBadgeText, { color: '#fff' }]}>Your shot</Text>
                </View>
              </View>
              {challenge.aiNote && (
                <Text style={styles.aiNote}>
                  <Text style={styles.aiNoteLabel}>AI NOTE  </Text>
                  {challenge.aiNote}
                </Text>
              )}
              <View style={[styles.continuationBox, { borderColor: C.redDim, backgroundColor: 'rgba(255,77,77,0.05)' }]}>
                <Text style={[styles.continuationTitle, { color: C.red }]}>THE NIGHT MOVED ON</Text>
                {challenge.nextStoryContinuation && (
                  <Text style={styles.continuationText}>{challenge.nextStoryContinuation}</Text>
                )}
              </View>
              <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: C.red }]}>
                <Text style={[styles.primaryBtnText, { color: '#fff' }]}>READ WHAT HAPPENS NEXT →</Text>
              </TouchableOpacity>
            </>
          )}
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
    borderRadius: 2,
    overflow: 'hidden',
  },
  strip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
    paddingHorizontal: 14,
    gap: 10,
  },
  liveDotWrap: {
    width: 12,
    height: 12,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0E0C10',
    position: 'absolute',
  },
  liveDotRing: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#0E0C10',
    position: 'absolute',
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
    paddingTop: 18,
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
    marginBottom: 16,
  },
  dropZone: {
    aspectRatio: 4 / 3,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(224,201,122,0.45)',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 14,
    backgroundColor: 'rgba(224,201,122,0.03)',
  },
  cameraIconBox: {
    width: 56,
    height: 56,
    borderRadius: 2,
    backgroundColor: 'rgba(14,12,16,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(224,201,122,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2.2,
    color: '#E0C97A',
    fontWeight: '700',
  },
  rubricRow: {
    flexDirection: 'row',
    gap: 8,
  },
  rubricChip: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: 'rgba(235,230,215,0.10)',
    borderRadius: 2,
  },
  rubricText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.8,
    color: 'rgba(235,230,215,0.35)',
    fontWeight: '600',
  },
  hintBox: {
    padding: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(235,230,215,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(235,230,215,0.10)',
    borderRadius: 2,
    marginBottom: 14,
  },
  hintText: {
    fontFamily: 'monospace',
    fontSize: 8.5,
    letterSpacing: 2.2,
    color: 'rgba(235,230,215,0.35)',
    fontWeight: '700',
    lineHeight: 15,
  },
  primaryBtn: {
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
  photoPlaceholder: {
    aspectRatio: 4 / 3,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(235,230,215,0.10)',
    overflow: 'hidden',
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: NOTIF_ORANGE,
    opacity: 0.7,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: NOTIF_ORANGE,
  },
  judgingLabel: {
    fontFamily: 'monospace',
    fontSize: 10.5,
    letterSpacing: 2.4,
    color: NOTIF_ORANGE,
    fontWeight: '800',
  },
  judgingCaption: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.8,
    color: 'rgba(235,230,215,0.35)',
    fontWeight: '600',
    marginTop: 4,
  },
  shotBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#E0C97A',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 2,
  },
  shotBadgeText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.4,
    fontWeight: '700',
    color: '#0E0C10',
  },
  aiNote: {
    fontSize: 13.5,
    fontStyle: 'italic',
    color: 'rgba(235,230,215,0.78)',
    lineHeight: 20,
    marginBottom: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(235,230,215,0.06)',
    paddingTop: 10,
  },
  aiNoteLabel: {
    fontFamily: 'monospace',
    fontStyle: 'normal',
    fontSize: 8.5,
    letterSpacing: 2.2,
    color: 'rgba(235,230,215,0.35)',
    fontWeight: '600',
  },
  continuationBox: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 12,
    marginBottom: 14,
  },
  continuationTitle: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2.4,
    fontWeight: '800',
    marginBottom: 6,
  },
  continuationText: {
    fontSize: 14,
    color: 'rgba(235,230,215,0.78)',
    lineHeight: 20,
  },
});
