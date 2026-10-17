import { CurriculumSector, DailyMission } from '../types';

export const CURRICULUM_SECTORS: CurriculumSector[] = [
  {
    id: 'sector-math',
    title: 'Sector 1: Frontline Mathematics',
    subtitle: 'Paper 1 Mastery (300 Marks in NDA)',
    subject: 'mathematics',
    color: 'from-amber-600 to-amber-700',
    nodes: [
      {
        id: 'math-node-1',
        sectorId: 'sector-math',
        title: 'Trigonometric Values & Reciprocal Extremes',
        subject: 'mathematics',
        topic: 'Trigonometry',
        level: 1,
        questionCount: 5,
        xpReward: 60,
        starsEarned: 3,
        isCompleted: true,
        isUnlocked: true,
        isBoss: false
      },
      {
        id: 'math-node-2',
        sectorId: 'sector-math',
        title: 'Determinants & Singular Matrices',
        subject: 'mathematics',
        topic: 'Matrices & Determinants',
        level: 2,
        questionCount: 6,
        xpReward: 80,
        starsEarned: 2,
        isCompleted: true,
        isUnlocked: true,
        isBoss: false
      },
      {
        id: 'math-node-3',
        sectorId: 'sector-math',
        title: 'Definite Integrals & King Parity Property',
        subject: 'mathematics',
        topic: 'Calculus',
        level: 3,
        questionCount: 8,
        xpReward: 100,
        starsEarned: 1,
        isCompleted: false,
        isUnlocked: true,
        isBoss: false
      },
      {
        id: 'math-node-boss',
        sectorId: 'sector-math',
        title: 'Boss Trial: NDA Mathematics Sprint 60',
        subject: 'mathematics',
        topic: 'Full Math Trial',
        level: 4,
        questionCount: 10,
        xpReward: 200,
        starsEarned: 0,
        isCompleted: false,
        isUnlocked: false,
        isBoss: true,
        bossTitle: 'Cadet Mathematics Gunnery Trial'
      }
    ]
  },
  {
    id: 'sector-reasoning',
    title: 'Sector 2: Officer Intelligence Rating (OIR)',
    subtitle: 'Stage 1 Screening Decider at SSB',
    subject: 'reasoning',
    color: 'from-blue-600 to-indigo-700',
    nodes: [
      {
        id: 'reas-node-1',
        sectorId: 'sector-reasoning',
        title: 'Number Series & Quadratic Jumps',
        subject: 'reasoning',
        topic: 'Series & Patterns',
        level: 2,
        questionCount: 5,
        xpReward: 70,
        starsEarned: 3,
        isCompleted: true,
        isUnlocked: true,
        isBoss: false
      },
      {
        id: 'reas-node-2',
        sectorId: 'sector-reasoning',
        title: 'Formal Syllogisms & Venn Traps',
        subject: 'reasoning',
        topic: 'Deductive Logic',
        level: 3,
        questionCount: 6,
        xpReward: 90,
        starsEarned: 0,
        isCompleted: false,
        isUnlocked: true,
        isBoss: false
      },
      {
        id: 'reas-node-boss',
        sectorId: 'sector-reasoning',
        title: 'Boss Trial: OIR-1 Speed Rating Test',
        subject: 'reasoning',
        topic: 'OIR Simulation',
        level: 4,
        questionCount: 12,
        xpReward: 220,
        starsEarned: 0,
        isCompleted: false,
        isUnlocked: false,
        isBoss: true,
        bossTitle: 'SSB Board OIR Grade 1 Challenge'
      }
    ]
  },
  {
    id: 'sector-english',
    title: 'Sector 3: The English Bastion',
    subtitle: 'Spotting Errors & Military Vocabulary (200 Marks)',
    subject: 'english',
    color: 'from-emerald-600 to-teal-700',
    nodes: [
      {
        id: 'eng-node-1',
        sectorId: 'sector-english',
        title: 'Subject-Verb Agreement & Correlatives',
        subject: 'english',
        topic: 'Spotting Errors',
        level: 2,
        questionCount: 5,
        xpReward: 65,
        starsEarned: 2,
        isCompleted: true,
        isUnlocked: true,
        isBoss: false
      },
      {
        id: 'eng-node-2',
        sectorId: 'sector-english',
        title: 'High-Yield Idioms & Phrasal Traps',
        subject: 'english',
        topic: 'Idioms & Phrases',
        level: 1,
        questionCount: 6,
        xpReward: 60,
        starsEarned: 0,
        isCompleted: false,
        isUnlocked: true,
        isBoss: false
      },
      {
        id: 'eng-node-boss',
        sectorId: 'sector-english',
        title: 'Boss Trial: CDS 50-Grammar Gauntlet',
        subject: 'english',
        topic: 'Verbal Comprehensive',
        level: 4,
        questionCount: 15,
        xpReward: 250,
        starsEarned: 0,
        isCompleted: false,
        isUnlocked: false,
        isBoss: true,
        bossTitle: 'Grammar Commando Trial'
      }
    ]
  },
  {
    id: 'sector-gk',
    title: 'Sector 4: Armed Forces & Strategic Studies',
    subtitle: 'Tri-Services Structure & Indian Polity',
    subject: 'gk',
    color: 'from-rose-600 to-red-700',
    nodes: [
      {
        id: 'gk-node-1',
        sectorId: 'sector-gk',
        title: 'Tri-Services Commands & Island Outposts',
        subject: 'gk',
        topic: 'Armed Forces GK',
        level: 2,
        questionCount: 5,
        xpReward: 70,
        starsEarned: 2,
        isCompleted: true,
        isUnlocked: true,
        isBoss: false
      },
      {
        id: 'gk-node-2',
        sectorId: 'sector-gk',
        title: 'Constitution & Commander-in-Chief Powers',
        subject: 'gk',
        topic: 'Indian Polity',
        level: 2,
        questionCount: 6,
        xpReward: 75,
        starsEarned: 0,
        isCompleted: false,
        isUnlocked: true,
        isBoss: false
      }
    ]
  },
  {
    id: 'sector-science',
    title: 'Sector 5: Combat Science & Ballistics',
    subtitle: 'Applied Physics, Chemistry & Defence Tech',
    subject: 'science',
    color: 'from-cyan-600 to-blue-700',
    nodes: [
      {
        id: 'sci-node-1',
        sectorId: 'sector-science',
        title: 'Ballistics & Projectile Trajectory',
        subject: 'science',
        topic: 'Physics - Mechanics',
        level: 2,
        questionCount: 5,
        xpReward: 70,
        starsEarned: 3,
        isCompleted: true,
        isUnlocked: true,
        isBoss: false
      }
    ]
  },
  {
    id: 'sector-ca',
    title: 'Sector 6: Defence Radar & Current Affairs',
    subtitle: 'Validated 2025-2026 Non-Expired Intel',
    subject: 'current_affairs',
    color: 'from-purple-600 to-indigo-800',
    nodes: [
      {
        id: 'ca-node-1',
        sectorId: 'sector-ca',
        title: 'Quad Maritimes & Exercise Malabar',
        subject: 'current_affairs',
        topic: 'Joint Military Exercises',
        level: 2,
        questionCount: 5,
        xpReward: 75,
        starsEarned: 1,
        isCompleted: true,
        isUnlocked: true,
        isBoss: false
      }
    ]
  }
];

export const INITIAL_DAILY_MISSIONS: DailyMission[] = [
  {
    id: 'mission-1',
    title: 'Operation Dawn Patrol',
    description: 'Solve 3 questions in Frontline Mathematics with step validation',
    xpReward: 80,
    progress: 2,
    target: 3,
    completed: false,
    iconName: 'Compass'
  },
  {
    id: 'mission-2',
    title: 'Intel Recon',
    description: 'Inspect 2 Defence Current Affairs briefs on the Radar',
    xpReward: 50,
    progress: 1,
    target: 2,
    completed: false,
    iconName: 'Radio'
  },
  {
    id: 'mission-3',
    title: 'Bullseye Accuracy',
    description: 'Achieve 100% accuracy in any tactical practice session',
    xpReward: 100,
    progress: 1,
    target: 1,
    completed: true,
    iconName: 'Target'
  },
  {
    id: 'mission-4',
    title: 'Veer AI Tactical Debrief',
    description: 'Ask Major Veer Singh for an exam tip or doubt solution',
    xpReward: 60,
    progress: 0,
    target: 1,
    completed: false,
    iconName: 'MessageSquareCode'
  }
];
