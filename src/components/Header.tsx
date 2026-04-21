import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import { User } from '../constants/types';
import { BellIcon, CoinIcon } from './Icons';
import { fmt } from '../api/mockData';

interface Props {
  player: User;
}

export default function Header({ player }: Props) {
  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarWrap}>
        <View style={[styles.avatar, { backgroundColor: `hsl(${player.avatar}, 70%, 38%)` }]} />
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>L{player.level}</Text>
        </View>
      </View>

      {/* Name + meta */}
      <View style={styles.info}>
        <Text style={styles.name}>{player.name}</Text>
        <Text style={styles.meta}>
          FAME {player.fame} · {Math.round(player.xp * 100)}% TO NEXT
        </Text>
      </View>

      {/* Coin balance */}
      <View style={styles.coinPill}>
        <CoinIcon size={14} />
        <Text style={styles.coinText}>{fmt(player.qcoins)}</Text>
      </View>

      {/* Bell */}
      <TouchableOpacity style={styles.bellBtn}>
        <BellIcon size={16} color={COLORS.text.primary} />
        {player.unread > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{player.unread}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.bg.header,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.subtle,
    gap: 12,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFC93C',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    backgroundColor: COLORS.bg.footer,
    borderWidth: 1,
    borderColor: '#2A2630',
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  levelText: {
    fontSize: 8.5,
    fontWeight: '700',
    color: COLORS.gold,
    fontFamily: 'monospace',
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    letterSpacing: -0.1,
  },
  meta: {
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 1.3,
    color: COLORS.text.muted,
    marginTop: 3,
  },
  coinPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(224,201,122,0.08)',
    borderWidth: 1,
    borderColor: COLORS.border.goldSubtle,
  },
  coinText: {
    fontWeight: '600',
    fontSize: 13,
    color: COLORS.gold,
  },
  bellBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(235,230,215,0.04)',
    borderWidth: 1,
    borderColor: COLORS.border.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 14,
    height: 14,
    borderRadius: 999,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 2,
    borderColor: COLORS.bg.header,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.text.dark,
  },
});
