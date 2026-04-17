# Questipic

A dark-fantasy photo quest game built with React Native + Expo.  
Design: **Occult Console (V6)** — cinematic cards, rune corners, gold + ember accents.

## Quick Start

```bash
npm install
npx expo start
```

Then scan the QR code with Expo Go (phone), or press `w` (web), `i` (iOS sim), `a` (Android emu).

## Structure

```
src/
├── api/client.ts              # REST fetch wrapper
├── api/mockData.ts            # Offline quest & player data
├── components/
│   ├── ActiveQuestsPill.tsx    # Floating "jump to active" pill
│   ├── BottomNav.tsx           # 5-tab nav with glowing center button
│   ├── FilterStrip.tsx         # Horizontal chip filters
│   ├── Header.tsx              # Avatar, coins, bell
│   ├── Icons.tsx               # SVG stroke icons
│   ├── Lives.tsx               # Heart pips
│   ├── QuestCard.tsx           # Cinematic quest card
│   └── SectionHeader.tsx       # Section divider
├── constants/theme.ts          # Occult Console palette
├── constants/types.ts          # Quest, Player types
├── navigation/AppNavigator.tsx
└── screens/FeedScreen.tsx      # Main feed
```

## Backend

Edit `API_URL` in `src/constants/theme.ts`. The app uses mock data when the backend is unreachable.
