import React from 'react';
import Svg, { Path, Circle, Polyline, Line, Polygon, Defs, LinearGradient, Stop, Text as SvgText, Rect } from 'react-native-svg';

type P = { size?: number; color?: string };

export const BellIcon = ({ size = 18, color = 'currentColor' }: P) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <Path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </Svg>
);

export const CoinIcon = ({ size = 18 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="qg" x1="0" x2="1">
        <Stop offset="0" stopColor="#FFD86B" />
        <Stop offset="1" stopColor="#F59E0B" />
      </LinearGradient>
    </Defs>
    <Circle cx={12} cy={12} r={10} fill="url(#qg)" stroke="#B7791F" strokeWidth={1.5} />
    <SvgText x={12} y={16} textAnchor="middle" fontWeight="700" fontSize={11} fill="#7A4A0A">Q</SvgText>
  </Svg>
);

export const UsersIcon = ({ size = 14, color = 'currentColor' }: P) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <Circle cx={9} cy={7} r={4} />
    <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);

export const ClockIcon = ({ size = 14, color = 'currentColor' }: P) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx={12} cy={12} r={10} />
    <Polyline points="12 6 12 12 16 14" />
  </Svg>
);

export const HomeIcon = ({ size = 22, color = 'currentColor' }: P) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z" />
  </Svg>
);

export const BagIcon = ({ size = 22, color = 'currentColor' }: P) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M6 2l1 4h10l1-4" />
    <Path d="M3 6h18l-1.5 14a2 2 0 0 1-2 1.8H6.5a2 2 0 0 1-2-1.8z" />
  </Svg>
);

export const HammerIcon = ({ size = 22, color = 'currentColor' }: P) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M14 6l6 6-3 3-6-6" />
    <Path d="M11 9L3 17l4 4 8-8" />
  </Svg>
);

export const TrophyIcon = ({ size = 22, color = 'currentColor' }: P) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" />
    <Path d="M17 5h3v3a3 3 0 0 1-3 3M7 5H4v3a3 3 0 0 0 3 3" />
  </Svg>
);

export const UserIcon = ({ size = 22, color = 'currentColor' }: P) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <Circle cx={12} cy={7} r={4} />
  </Svg>
);

export const ChevronDownIcon = ({ size = 12, color = 'currentColor' }: P) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <Polyline points="6 9 12 15 18 9" />
  </Svg>
);

// Rune corner decorative element
export const RuneCorner = ({ size = 18, color = 'rgba(224,201,122,0.5)' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M2 10 L2 2 L10 2" stroke={color} strokeWidth={1.2} fill="none" />
    <Path d="M2 6 L6 6 L6 2" stroke={color} strokeWidth={0.8} fill="none" />
  </Svg>
);
