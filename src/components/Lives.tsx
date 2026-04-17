import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  count: number;
  max: number;
}

export default function Lives({ count, max }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: max }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.pip,
            i < count ? styles.pipOn : styles.pipOff,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 3,
  },
  pip: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  pipOn: {
    backgroundColor: '#FF3B5C',
  },
  pipOff: {
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
});
