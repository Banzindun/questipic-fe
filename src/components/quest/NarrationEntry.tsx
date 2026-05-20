import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NarrationEntry as NarrationEntryType } from '../../constants/types';
import { COLORS } from '../../constants/theme';

const C = {
  inkHi: COLORS.text.primary,
  ink: 'rgba(235,230,215,0.78)',
  inkXLo: 'rgba(235,230,215,0.35)',
  rule: COLORS.border.light,
} as const;

interface Props {
  entry: NarrationEntryType;
}

export default function NarrationEntry({ entry }: Props) {
  return (
    <View style={styles.container}>
      {entry.image && (
        <View style={styles.imageWrap}>
          <LinearGradient
            colors={[
              `hsl(${entry.image.hue}, 40%, 22%)`,
              `hsl(${entry.image.hue2}, 40%, 16%)`,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.35)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.imageCaption}>
            <Text style={styles.imageCaptionText}>AI SCENE · {entry.image.label.toUpperCase()}</Text>
          </View>
        </View>
      )}
      <Text style={[
        styles.text,
        entry.isOpening && styles.textOpening,
      ]}>
        {entry.text}
      </Text>
      {entry.timeAgo && (
        <Text style={styles.footer}>NARRATION · {entry.timeAgo.toUpperCase()}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    paddingBottom: 14,
  },
  imageWrap: {
    aspectRatio: 16 / 9,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(235,230,215,0.10)',
  },
  imageCaption: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.28)',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 4,
  },
  imageCaptionText: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.8,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
    color: 'rgba(235,230,215,0.78)',
    lineHeight: 24,
    letterSpacing: -0.03,
  },
  textOpening: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#EBE6D7',
  },
  footer: {
    marginTop: 10,
    fontFamily: 'monospace',
    fontSize: 8.5,
    letterSpacing: 2.2,
    color: 'rgba(235,230,215,0.35)',
    fontWeight: '600',
  },
});
