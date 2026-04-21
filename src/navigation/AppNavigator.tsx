import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../constants/theme';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';
import FeedScreen from '../screens/FeedScreen';
import LoginScreen from '../screens/LoginScreen';

export type RootStackParamList = {
  Feed: undefined;
  // Future screens:
  // QuestDetail: { questId: string };
  // Chapter: { questId: string; chapter: number };
  // Shop: undefined;
  // Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigator() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg.app, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={COLORS.accent} size="large" />
      </View>
    );
  }

  if (!token) {
    return <LoginScreen />;
  }

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

export default function AppNavigator() {
  return (
    <AuthProvider>
      <UserProvider>
        <Navigator />
      </UserProvider>
    </AuthProvider>
  );
}
