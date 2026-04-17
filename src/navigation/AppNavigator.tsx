import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../constants/theme';
import FeedScreen from '../screens/FeedScreen';

export type RootStackParamList = {
  Feed: undefined;
  // Future screens:
  // QuestDetail: { questId: string };
  // Chapter: { questId: string; chapter: number };
  // Shop: undefined;
  // Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.bg.app },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Feed" component={FeedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
