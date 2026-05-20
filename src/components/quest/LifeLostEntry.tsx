import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LifeLostEntry as LifeLostEntryType } from '../../constants/types';

interface Props {
  entry: LifeLostEntryType;
}

function HeartFilled() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="#FF3B5C" stroke="#FF3B5C" strokeWidth={2}>
      <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
  );
}

export default function LifeLostEntry({ entry }: Props) {
  return (
    <View style={styles.container}>
      <HeartFilled />
      <View style={styles.content}>
        <Text style={styles.label}>
          −1 LIFE · CH {String(entry.chapter).padStart(2, '0')}
        </Text>
        <Text style={styles.reason}>{entry.reason}</Text>
      </View>
      {entry.timeAgo && (
        <Text style={styles.timeAgo}>{entry.timeAgo.toUpperCase()}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 10,
    padding: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,77,77,0.4)',
    borderRadius: 2,
    backgroundColor: 'rgba(255,77,77,0.05)',
  },
  content: {
    flex: 1,
  },
  label: {
    fontFamily: 'monospace',
    fontSize: 9.5,
    letterSpacing: 2.2,
    color: '#FF4D4D',
    fontWeight: '700',
  },
  reason: {
    fontSize: 13.5,
    fontStyle: 'italic',
    color: 'rgba(235,230,215,0.78)',
    marginTop: 3,
    lineHeight: 19,
  },
  timeAgo: {
    fontFamily: 'monospace',
    fontSize: 8.5,
    letterSpacing: 1.8,
    color: 'rgba(235,230,215,0.35)',
    fontWeight: '600',
  },
});
