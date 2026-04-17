# Questipic FE

Dark-fantasy photo quest game — React Native / Expo mobile app. Players browse quests, submit photos per chapter, and earn rewards. Current state is a polished UI prototype with mock data.

## Commands

```bash
npm install          # install dependencies
npm start            # start Expo dev server
npm run android      # run on Android emulator
npm run ios          # run on iOS simulator
npm run web          # run in browser
```

## Architecture

```
src/
  api/
    client.ts         # generic fetch wrapper + API endpoints
    mockData.ts       # offline quest/player data + fmt() helper
  components/         # all reusable UI components
  constants/
    theme.ts          # COLORS, SPACING, API_URL
    types.ts          # Quest and Player TypeScript interfaces
  navigation/
    AppNavigator.tsx  # native stack navigator (Feed only; more screens planned)
  screens/
    FeedScreen.tsx    # main screen: header, filters, scrollable quest feed
```

## Key Conventions

- **TypeScript strict mode** — `tsconfig.json` has `"strict": true`; path alias `@/*` maps to `src/*`
- **Styling** — React Native `StyleSheet.create()` per file; inline styles only for dynamic values (HSL avatar color, gradients)
- **Theme** — import `COLORS` and `SPACING` from `src/constants/theme.ts`; never hardcode colors
- **Icons** — SVG components in `src/components/Icons.tsx`; add new icons there
- **Mock data** — `src/api/mockData.ts` is the offline fallback; `QUESTS` and `PLAYER` exports match the interfaces in `types.ts`
- **API URL** — configured in `theme.ts`; dev points to `localhost:3000/api`, prod URL is a placeholder

## Design System — "Occult Console V6"

Dark-fantasy aesthetic with gold/ember accents, cinematic cards, monospace labels.

Key color tokens:
- `COLORS.bg.app` — `#0A080C` base background
- `COLORS.accent` — `#FFC93C` gold, primary interactive color
- `COLORS.text.primary` — `#EBE6D7`
- `COLORS.border.subtle` / `.medium` / `.gold` — layered border hierarchy

Use `expo-linear-gradient` for button fills and hero overlays. Prefer letter-spacing and uppercase for stat labels.

## Planned Screens

`AppNavigator.tsx` has commented-out routes for future screens: `QuestDetail`, `Chapter`, `Shop`, `Profile`.

## Backend API Contract

Endpoints the client expects (all under `API_URL`):

| Method | Path | Response |
|--------|------|----------|
| GET | `/quests` | `Quest[]` |
| GET | `/player` | `Player` |
| POST | `/quests/join` | `{ success: boolean }` |
| POST | `/quests/submit` | `{ score: number, passed: boolean }` |

Response shapes must match interfaces in `src/constants/types.ts`.
