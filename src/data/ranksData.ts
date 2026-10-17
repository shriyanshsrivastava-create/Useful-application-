import { MilitaryRank } from '../types';

export const MILITARY_RANKS: MilitaryRank[] = [
  {
    rankLevel: 1,
    title: 'Cadet Recruit',
    minXp: 0,
    insignia: '⭐',
    motto: 'Valour Begins with Discipline'
  },
  {
    rankLevel: 2,
    title: 'Lance Naik',
    minXp: 150,
    insignia: '🎖️',
    motto: 'Always Forward'
  },
  {
    rankLevel: 3,
    title: 'Naik',
    minXp: 400,
    insignia: '⚔️',
    motto: 'Steadfast & Resolute'
  },
  {
    rankLevel: 4,
    title: 'Havildar',
    minXp: 800,
    insignia: '🛡️',
    motto: 'Duty Before Everything'
  },
  {
    rankLevel: 5,
    title: 'Subedar',
    minXp: 1400,
    insignia: '🏅',
    motto: 'Leadership Through Example'
  },
  {
    rankLevel: 6,
    title: 'Lieutenant',
    minXp: 2200,
    insignia: '🌟',
    motto: 'Courage Under Fire'
  },
  {
    rankLevel: 7,
    title: 'Captain',
    minXp: 3400,
    insignia: '🌟🌟',
    motto: 'Tactical Supremacy'
  },
  {
    rankLevel: 8,
    title: 'Major',
    minXp: 5000,
    insignia: '🦁',
    motto: 'Veer Bhogya Vasundhara'
  },
  {
    rankLevel: 9,
    title: 'Lieutenant Colonel',
    minXp: 7200,
    insignia: '🦁🌟',
    motto: 'Command With Honor'
  },
  {
    rankLevel: 10,
    title: 'Colonel',
    minXp: 10000,
    insignia: '🦁🌟🌟',
    motto: 'Architect of Victory'
  },
  {
    rankLevel: 11,
    title: 'Brigadier',
    minXp: 14000,
    insignia: '👑',
    motto: 'Strategic Dominance'
  },
  {
    rankLevel: 12,
    title: 'Field Marshal',
    minXp: 20000,
    insignia: '🔱',
    motto: 'Immortal Glory'
  }
];

export function getRankByXp(xp: number): MilitaryRank {
  for (let i = MILITARY_RANKS.length - 1; i >= 0; i--) {
    if (xp >= MILITARY_RANKS[i].minXp) {
      return MILITARY_RANKS[i];
    }
  }
  return MILITARY_RANKS[0];
}

export function getNextRank(xp: number): { nextRank: MilitaryRank | null; xpNeeded: number; progressPercent: number } {
  const current = getRankByXp(xp);
  const currentIndex = MILITARY_RANKS.findIndex(r => r.rankLevel === current.rankLevel);
  if (currentIndex === MILITARY_RANKS.length - 1) {
    return { nextRank: null, xpNeeded: 0, progressPercent: 100 };
  }
  const next = MILITARY_RANKS[currentIndex + 1];
  const rankSpan = next.minXp - current.minXp;
  const currentSpanXp = xp - current.minXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentSpanXp / rankSpan) * 100)));
  return {
    nextRank: next,
    xpNeeded: Math.max(0, next.minXp - xp),
    progressPercent
  };
}
