import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import api from '../api/client';
import { Quest } from '../constants/types';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import SectionHeader from '../components/SectionHeader';
import QuestCard from '../components/QuestCard';
import BottomNav from '../components/BottomNav';
import ActiveQuestsPill from '../components/ActiveQuestsPill';

export default function FeedScreen() {
  const { user } = useUser();
  const [filter, setFilter] = useState(0);
  const [quests, setQuests] = useState<Quest[]>([]);
  const scrollRef = useRef<ScrollView>(null);
  const activeY = useRef(0);

  useEffect(() => {
    api.getQuests().then((data) => {
      console.log('[getQuests] raw response:', JSON.stringify(data));
      const list = Array.isArray(data) ? data : (data as { result?: Quest[]; quests?: Quest[]; data?: Quest[] }).result ?? (data as { quests?: Quest[] }).quests ?? (data as { data?: Quest[] }).data ?? [];
      setQuests(list);
    }).catch((e) => console.error('[getQuests] error:', e));
  }, []);

  const offers = quests.filter((q) => !q.joined);
  const active = quests.filter((q) => q.joined);
  const dailyOffers = offers.slice(0, 3);

  const scrollToActive = () => {
    scrollRef.current?.scrollTo({ y: activeY.current, animated: true });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        {user && <Header player={user} />}

        <View style={{ flex: 1, position: 'relative' }}>
          <ScrollView
            ref={scrollRef}
            style={styles.feed}
            contentContainerStyle={styles.feedContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Daily Offers */}
            <SectionHeader label="DAILY OFFERS" />
            {dailyOffers.map((q) => (
              <QuestCard key={q.id} quest={q} />
            ))}

            {/* Active Quests */}
            {active.length > 0 && (
              <View
                onLayout={(e) => {
                  activeY.current = e.nativeEvent.layout.y;
                }}
              >
                <SectionHeader
                  label="YOUR ACTIVE QUESTS"
                  sub={`${active.length} in progress`}
                  topGap
                />
                {active.map((q) => (
                  <QuestCard key={q.id} quest={q} />
                ))}
              </View>
            )}

            <Text style={styles.endMark}>——</Text>
          </ScrollView>

          {/* Floating pill */}
          <ActiveQuestsPill count={active.length} onPress={scrollToActive} />
        </View>

        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg.header,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.bg.app,
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    padding: 14,
    paddingTop: 16,
    paddingBottom: 10,
  },
  endMark: {
    textAlign: 'center',
    paddingVertical: 16,
    paddingBottom: 20,
    fontFamily: 'monospace',
    fontSize: 9,
    letterSpacing: 4,
    color: COLORS.text.dead,
  },
});
