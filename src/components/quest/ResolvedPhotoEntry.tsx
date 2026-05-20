import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Polyline, Line } from 'react-native-svg';
import { ResolvedPhotoEntry as ResolvedPhotoEntryType } from '../../constants/types';
import { COLORS } from '../../constants/theme';

const C = {
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
  entry: ResolvedPhotoEntryType;
}

export default function ResolvedPhotoEntry({ entry }: Props) {
  const { passed } = entry;

  return (
    <View style={styles.card}>
      {/* Past card header */}
      <View style={styles.header}>
        <Text style={styles.headerKind}>· PHOTO CHALLENGE</Text>
        {entry.timeAgo && <Text style={styles.headerMeta}>{entry.timeAgo}</Text>}
        <View style={{ flex: 1 }} />
        <Text style={styles.headerMeta}>AI JUDGED</Text>
      </View>

      <View style={styles.row}>
        {/* Thumbnail placeholder */}
        <View style={styles.thumbnail}>
          {entry.image && (
            <LinearGradient
              colors={[
                `hsl(${entry.image.hue}, 40%, 20%)`,
                `hsl(${entry.image.hue2}, 40%, 15%)`,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          )}
        </View>

        {/* Pass/fail pill + rubric */}
        <View style={styles.rightCol}>
          <View style={[
            styles.pill,
            passed
              ? { backgroundColor: 'rgba(224,201,122,0.08)', borderColor: C.goldDim }
              : { backgroundColor: 'rgba(255,77,77,0.08)', borderColor: C.redDim },
          ]}>
            <View style={[styles.pillCircle, { backgroundColor: passed ? C.gold : C.red }]}>
              {passed ? (
                <Svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#0E0C10" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                  <Polyline points="20 6 9 17 4 12" />
                </Svg>
              ) : (
                <Svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#0E0C10" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                  <Line x1="18" y1="6" x2="6" y2="18" />
                  <Line x1="6" y1="6" x2="18" y2="18" />
                </Svg>
              )}
            </View>
            <Text style={[styles.pillLabel, { color: passed ? C.gold : C.red }]}>
              {passed ? 'PASSED' : 'DID NOT PASS'}
            </Text>
          </View>
          <View>
            <Text style={styles.rubricLabel}>Judged on</Text>
            <Text style={[styles.rubricLabel, { color: C.gold }]}>fit · originality · composition</Text>
          </View>
        </View>
      </View>

      {/* AI note */}
      <View style={styles.aiNoteWrap}>
        <Text style={styles.aiNote}>
          <Text style={styles.aiNoteLabel}>AI NOTE  </Text>
          {entry.aiNote}
        </Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
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
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  thumbnail: {
    width: 100,
    height: 130,
    flexShrink: 0,
    borderRadius: 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(235,230,215,0.10)',
    backgroundColor: '#0A080C',
  },
  rightCol: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  pillCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  pillLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 2.4,
    fontWeight: '800',
  },
  rubricLabel: {
    fontFamily: 'monospace',
    fontSize: 8.5,
    letterSpacing: 2.2,
    color: 'rgba(235,230,215,0.35)',
    fontWeight: '700',
    lineHeight: 15,
  },
  aiNoteWrap: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(235,230,215,0.06)',
  },
  aiNote: {
    fontSize: 13.5,
    fontStyle: 'italic',
    color: 'rgba(235,230,215,0.78)',
    lineHeight: 20,
  },
  aiNoteLabel: {
    fontFamily: 'monospace',
    fontStyle: 'normal',
    fontSize: 8.5,
    letterSpacing: 2.2,
    color: 'rgba(235,230,215,0.35)',
    fontWeight: '600',
  },
});
