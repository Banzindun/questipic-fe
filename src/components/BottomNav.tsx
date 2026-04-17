import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';
import { BagIcon, HammerIcon, HomeIcon, TrophyIcon, UserIcon } from './Icons';

interface Props {
  accent?: string;
  activeTab?: string;
  onTabPress?: (tab: string) => void;
}

const TABS = [
  { key: 'shop', label: 'SHOP', Icon: BagIcon },
  { key: 'forge', label: 'FORGE', Icon: HammerIcon },
  { key: 'feed', label: 'FEED', Icon: HomeIcon, primary: true },
  { key: 'ranks', label: 'RANKS', Icon: TrophyIcon },
  { key: 'you', label: 'YOU', Icon: UserIcon },
];

export default function BottomNav({ accent = COLORS.accent, activeTab = 'feed', onTabPress }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;

        if (tab.primary) {
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onTabPress?.(tab.key)}
              style={styles.primaryWrap}
            >
              <LinearGradient
                colors={['#F0D68F', accent]}
                start={{ x: 0.3, y: 0.3 }}
                end={{ x: 0.75, y: 0.75 }}
                style={styles.primaryBtn}
              >
                <tab.Icon size={22} color="#0E0C10" />
              </LinearGradient>
            </TouchableOpacity>
          );
        }

        const color = isActive ? COLORS.gold : COLORS.text.dimmed;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onTabPress?.(tab.key)}
            style={styles.tab}
          >
            <tab.Icon size={20} color={color} />
            <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(14,12,16,0.9)',
    borderTopWidth: 1,
    borderTopColor: COLORS.border.subtle,
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 14,
  },
  tab: {
    alignItems: 'center',
    gap: 3,
  },
  tabLabel: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.8,
    fontWeight: '600',
  },
  primaryWrap: {
    marginTop: -22,
  },
  primaryBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#0E0C10',
  },
});
