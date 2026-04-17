// Questipic Design Tokens — Occult Console (V6)
// Extracted from Claude Design handoff

export const COLORS = {
  bg: {
    app: '#0A080C',
    header: '#121014',
    card: '#14121A',
    footer: '#0E0C10',
  },
  accent: '#FFC93C',
  gold: '#E0C97A',
  text: {
    primary: '#EBE6D7',
    secondary: '#8A8396',
    muted: '#6B6577',
    dimmed: '#5A5467',
    dead: '#3D3A48',
    dark: '#0E0C10',
  },
  border: {
    subtle: 'rgba(235,230,215,0.08)',
    light: 'rgba(235,230,215,0.1)',
    medium: 'rgba(235,230,215,0.12)',
    goldSubtle: 'rgba(224,201,122,0.25)',
    goldMedium: 'rgba(224,201,122,0.4)',
  },
  tag: {
    new: '#FFC93C',
    hot: '#E86A3A',
    ending: '#FF4D4D',
    life: '#FF3B5C',
  },
} as const;

export const SPACING = {
  xs: 3,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 16,
  xxl: 18,
} as const;

// API configuration
export const API_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://your-production-url.com/api';
