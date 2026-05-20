import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';
import { QuestStartEntry } from '../../constants/types';

interface Props {
  entry: QuestStartEntry;
}

export default function QuestStartAnchor({ entry }: Props) {
  return (
    <View style={styles.container}>
      <Svg width={120} height={20} viewBox="0 0 120 20" style={styles.rule}>
        <Line x1="0" y1="10" x2="48" y2="10" stroke="#E0C97A" strokeWidth={0.7} />
        <Circle cx={60} cy={10} r={3} fill="none" stroke="#E0C97A" strokeWidth={0.7} />
        <Circle cx={60} cy={10} r={1} fill="#E0C97A" />
        <Line x1="72" y1="10" x2="120" y2="10" stroke="#E0C97A" strokeWidth={0.7} />
      </Svg>
      <Text style={styles.label}>QUEST BEGAN</Text>
      <Text style={styles.time}>{entry.timeAgo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingBottom: 24,
    alignItems: 'center',
  },
  rule: {
    marginBottom: 10,
  },
  label: {
    fontFamily: 'monospace',
    fontSize: 9.5,
    letterSpacing: 3.6,
    color: '#E0C97A',
    fontWeight: '700',
  },
  time: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'rgba(235,230,215,0.55)',
    marginTop: 6,
  },
});
