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

## Building for Production

### Prerequisites

- [EAS CLI](https://docs.expo.dev/eas-update/getting-started/): `npm install -g eas-cli`
- Expo account: `eas login`
- For iOS: Apple Developer account
- For Android: Google Play Developer account (for Play Store) or just a keystore for APK

### First-time setup

```bash
eas build:configure
```

This creates `eas.json` with build profiles.

### Android

**Build APK (sideload / testing):**
```bash
npm run start:prod   # verify production API works first
eas build --platform android --profile preview
```

**Build AAB (Google Play Store):**
```bash
eas build --platform android --profile production
```

### iOS

**Build for TestFlight / App Store:**
```bash
eas build --platform ios --profile production
```

EAS will handle signing and provisioning profiles automatically if you have an Apple Developer account linked.

### Submit to stores

```bash
eas submit --platform android   # uploads AAB to Google Play
eas submit --platform ios       # uploads IPA to App Store Connect
```

### Notes

- Production builds use `.env.production` — `API_URL` points to the live backend.
- EAS builds run in the cloud; no local Android SDK or Xcode required.
- To build locally instead: `eas build --platform android --local` (requires Android SDK).

## Backend

Edit `API_URL` in `src/constants/theme.ts`. The app uses mock data when the backend is unreachable.
