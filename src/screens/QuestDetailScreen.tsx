import React, { useCallback, useEffect, useState } from 'react';
import {
  View, ScrollView, ActivityIndicator, Text, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/theme';
import api from '../api/client';
import QUEST_DETAIL_MOCK from '../api/questDetailMock';
import {
  QuestDetail, DiaryEntry,
  ActivePhotoChallenge as ActivePhotoChallengeType,
} from '../constants/types';

import QuestHeader from '../components/quest/QuestHeader';
import ActivePhotoChallenge from '../components/quest/ActivePhotoChallenge';
import ActiveStoryChallenge from '../components/quest/ActiveStoryChallenge';
import EliminationCard from '../components/quest/EliminationCard';
import NarrationEntry from '../components/quest/NarrationEntry';
import ResolvedDecisionEntry from '../components/quest/ResolvedDecisionEntry';
import ResolvedPhotoEntry from '../components/quest/ResolvedPhotoEntry';
import LifeLostEntry from '../components/quest/LifeLostEntry';
import QuestStartAnchor from '../components/quest/QuestStartAnchor';

type Props = NativeStackScreenProps<RootStackParamList, 'QuestDetail'>;

const ACCENT = COLORS.accent;

function DiaryEntryRow({ entry, accent }: { entry: DiaryEntry; accent: string }) {
  switch (entry.type) {
    case 'narration':
      return <NarrationEntry entry={entry} />;
    case 'resolved-decision':
      return <ResolvedDecisionEntry entry={entry} accent={accent} />;
    case 'resolved-photo':
      return <ResolvedPhotoEntry entry={entry} />;
    case 'life-lost':
      return <LifeLostEntry entry={entry} />;
    case 'quest-start':
      return <QuestStartAnchor entry={entry} />;
  }
}

export default function QuestDetailScreen({ route, navigation }: Props) {
  const { questId } = route.params;
  const [detail, setDetail] = useState<QuestDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Photo challenge state (local optimistic updates after submission)
  const [photoState, setPhotoState] = useState<ActivePhotoChallengeType['state']>('awaiting');

  useEffect(() => {
    api.getQuestDetail(questId)
      .then((data) => {
        console.log('[getQuestDetail] response:', JSON.stringify(data));
        setDetail(data);
        if (data.active?.kind === 'photo') {
          setPhotoState(data.active.state);
        }
      })
      .catch(() => {
        // Fall back to mock when server unavailable
        setDetail(QUEST_DETAIL_MOCK);
        if (QUEST_DETAIL_MOCK.active?.kind === 'photo') {
          setPhotoState(QUEST_DETAIL_MOCK.active.state);
        }
      })
      .finally(() => setLoading(false));
  }, [questId]);

  const handleTakePhoto = useCallback(() => {
    if (!detail || detail.active?.kind !== 'photo') return;
    setPhotoState('judging');
    // Simulate AI judging delay
    setTimeout(() => setPhotoState('passed'), 3000);
  }, [detail]);

  const handleVote = useCallback((_letter: string) => {
    // TODO: wire up real vote submission
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <ActivityIndicator color={COLORS.accent} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (!detail) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Quest not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { quest, active, diary, elimination } = detail;
  const failed = quest.status === 'failed';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        {/* Sticky header — index 0 */}
        <QuestHeader quest={quest} onBack={() => navigation.goBack()} />

        {/* Diary column — everything below scrolls */}
        <View style={styles.diary}>
          {/* Active challenge or elimination */}
          {failed && elimination ? (
            <EliminationCard elim={elimination} quest={quest} accent={ACCENT} />
          ) : active?.kind === 'photo' ? (
            <ActivePhotoChallenge
              challenge={{ ...active, state: photoState }}
              accent={ACCENT}
              onTakePhoto={handleTakePhoto}
            />
          ) : active?.kind === 'story' ? (
            <ActiveStoryChallenge
              challenge={active}
              accent={ACCENT}
              onVote={handleVote}
            />
          ) : null}

          {/* Past diary entries */}
          {diary.map((entry, i) => (
            <DiaryEntryRow key={i} entry={entry} accent={ACCENT} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg.app,
  },
  scroll: {
    flex: 1,
    backgroundColor: COLORS.bg.app,
  },
  content: {
    flexGrow: 1,
  },
  diary: {
    padding: 14,
    paddingTop: 14,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bg.app,
  },
  errorText: {
    color: COLORS.text.secondary,
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 1.4,
  },
});
