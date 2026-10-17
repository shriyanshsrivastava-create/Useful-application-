export type SubjectType = 'mathematics' | 'english' | 'reasoning' | 'gk' | 'science' | 'current_affairs';

export type DifficultyLevel = 1 | 2 | 3 | 4; // 1: Basic, 2: Standard, 3: Advanced, 4: Challenge Mode

export type ExamTarget = 'NDA' | 'CDS' | 'AFCAT' | 'SSB' | 'ALL';

export type MistakeCategory =
  | 'Conceptual Mistake'
  | 'Calculation Mistake'
  | 'Reading / Ambiguity Trap'
  | 'Time-Pressure Rush'
  | 'Guessing Behavior';

export interface SubjectEngineBreakdown {
  // Math Engine
  conceptUsed?: string;
  formulaUsed?: string;
  stepByStepSolution?: string[];
  shortcutMethod?: string;
  finalAnswer?: string;
  examTip?: string;
  alternativeValidationMethod?: string;

  // Reasoning Engine
  patternIdentification?: string;
  logicalAnalysis?: string;
  optionElimination?: { optionIndex: number; optionText: string; reasonWhyWrong: string }[];
  correctAnswer?: string;
  examShortcut?: string;

  // English Engine
  ruleApplied?: string;
  explanation?: string;
  whyOtherOptionsWrong?: { optionIndex: number; optionText: string; whyIncorrect: string }[];
  memoryTrick?: string;

  // GK Engine
  topicName?: string;
  backgroundInformation?: string;
  additionalExamFacts?: string[];

  // Science Engine
  principle?: string;
  practicalApplication?: string;
  examNote?: string;

  // Current Affairs Engine
  eventDate?: string;
  sourceVerified?: string;
  relevanceScore?: number; // e.g. 98%
  isExpired?: boolean;
  expiryDate?: string;
}

export interface ValidationReport {
  layer1Quality: {
    passed: boolean;
    grammarScore: number; // 0-100
    clarityScore: number;
    ambiguityFree: boolean;
  };
  layer2Answer: {
    verified: boolean;
    standardMethodMatch: boolean;
    alternativeVerificationPassed: boolean;
  };
  layer3Explanation: {
    passed: boolean;
    completenessScore: number; // e.g. 98%
    stepLogicVerified: boolean;
  };
  layer4Difficulty: {
    assignedLevel: DifficultyLevel;
    empiricalValidationScore: number;
    levelMatchConfirmed: boolean;
  };
  overallAccuracyRate: string; // "99.8%"
  verifierBadge: string; // "VeerPath NDA/CDS Board Standard"
}

export interface SmartHints {
  hint1Concept: string;
  hint2Method: string;
  hint3NearSolution: string;
  hint4FullExplanation: string;
}

export interface OptionMistakeAnalysis {
  mistakeType: MistakeCategory;
  trapExplanation: string;
  recommendedAction: string;
  targetedDrillTopic: string;
}

export interface QuestionItem {
  id: string;
  subject: SubjectType;
  topic: string;
  subtopic: string;
  difficultyLevel: DifficultyLevel;
  examTarget: ExamTarget;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  engineBreakdown: SubjectEngineBreakdown;
  validationReport: ValidationReport;
  smartHints: SmartHints;
  mistakeMapping: Record<number, OptionMistakeAnalysis>;
}

export interface MilitaryRank {
  rankLevel: number;
  title: string;
  minXp: number;
  insignia: string;
  motto: string;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  target: number;
  completed: boolean;
  iconName: string;
}

export interface DefenceUpdate {
  id: string;
  title: string;
  category: 'notification' | 'admit_card' | 'result' | 'current_affairs' | 'ssb';
  date: string;
  source: string;
  isUrgent: boolean;
  summary: string;
  relevanceScore: number;
  officialLink?: string;
  deadline?: string;
}

export interface UserStats {
  name: string;
  xp: number;
  streakDays: number;
  streakActiveToday: boolean;
  streakShields: number;
  rankLevel: number;
  hearts: number; // Max 5
  maxHearts: number;
  tokens: number;
  selectedExam: ExamTarget;
  accuracy: number; // e.g. 88%
  speedAvgSec: number; // e.g. 24s
  questionsAttempted: number;
  questionsCorrect: number;
  topicMastery: Record<string, number>; // topic -> %
  mistakeDistribution: Record<MistakeCategory, number>;
  unlockedNodeIds: string[];
}

export interface CurriculumNode {
  id: string;
  sectorId: string;
  title: string;
  subject: SubjectType;
  topic: string;
  level: DifficultyLevel;
  questionCount: number;
  xpReward: number;
  starsEarned: number; // 0 to 3
  isCompleted: boolean;
  isUnlocked: boolean;
  isBoss: boolean;
  bossTitle?: string;
}

export interface CurriculumSector {
  id: string;
  title: string;
  subtitle: string;
  subject: SubjectType;
  color: string;
  nodes: CurriculumNode[];
}

export interface SubjectLesson {
  id: string;
  title: string;
  durationMinutes: number;
  level: DifficultyLevel;
  summary: string;
  coreConcepts: string[];
  formulaOrRuleBox?: string;
  highYieldExamFact: string;
  isCompleted: boolean;
}

export interface StudyMaterialDoc {
  id: string;
  title: string;
  category: 'cheat_sheet' | 'formula_vault' | 'history_timeline' | 'grammar_codex' | 'defence_brief';
  readingTime: string;
  keyHighlights: string[];
  contentMarkdown: string;
}

export interface SubjectDetail {
  id: SubjectType;
  name: string;
  regimentalTitle: string; // e.g. "Regiment of Artillery & Ballistics"
  emblemIcon: string; // SVG icon identifier or symbol
  historicInsignia: string; // e.g. "Longewala 1971 / Tiger Hill"
  heritageStory: string; // Historic Indian military heritage touch
  themeColor: string; // Primary Tailwind color class
  accentBorder: string;
  badgeBg: string;
  lessons: SubjectLesson[];
  studyMaterials: StudyMaterialDoc[];
}

// Gamified Revision Module Types
export interface FlashcardItem {
  id: string;
  subject: SubjectType;
  topic: string;
  frontConcept: string;
  backAnswer: string;
  memoryMnemonic: string;
  historyContext?: string;
  isMastered?: boolean;
}

export interface FillBlankItem {
  id: string;
  subject: SubjectType;
  topic: string;
  sentenceWithBlank: string; // Uses [BLANK]
  blankAnswer: string;
  acceptableAlternatives?: string[];
  hint: string;
  conceptRule: string;
}

export interface WeakAreaTarget {
  id: string;
  topic: string;
  subject: SubjectType;
  errorRate: number; // e.g. 68%
  mistakeType: MistakeCategory;
  recommendedAction: string;
  availableFlashcardsCount: number;
  availableBlanksCount: number;
}
