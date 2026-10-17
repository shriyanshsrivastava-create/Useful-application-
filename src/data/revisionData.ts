import { FlashcardItem, FillBlankItem, WeakAreaTarget, DifficultyLevel } from '../types';

export const WEAK_AREA_TARGETS: WeakAreaTarget[] = [
  {
    id: 'weak-1',
    topic: 'Trigonometric Reciprocal Sums & Extremes',
    subject: 'mathematics',
    errorRate: 68,
    mistakeType: 'Conceptual Mistake',
    recommendedAction: 'Drill on the quadratic nature of a + 1/a = 2 and extreme value bounds.',
    availableFlashcardsCount: 6,
    availableBlanksCount: 5
  },
  {
    id: 'weak-2',
    topic: 'Subject-Verb Proximity with Correlatives',
    subject: 'english',
    errorRate: 72,
    mistakeType: 'Reading / Ambiguity Trap',
    recommendedAction: 'Review the rule of proximity: Neither... nor takes the number of the NEARER subject.',
    availableFlashcardsCount: 6,
    availableBlanksCount: 5
  },
  {
    id: 'weak-3',
    topic: '1971 Liberation War & Naval Operations',
    subject: 'gk',
    errorRate: 64,
    mistakeType: 'Conceptual Mistake',
    recommendedAction: 'Lock in Operation Trident (4 Dec), Longewala defence, and instrument of surrender.',
    availableFlashcardsCount: 6,
    availableBlanksCount: 5
  },
  {
    id: 'weak-4',
    topic: 'Cubic & Tier-2 Number Series',
    subject: 'reasoning',
    errorRate: 58,
    mistakeType: 'Calculation Mistake',
    recommendedAction: 'Master rapid recognition of n³ - n² = n²(n - 1) and double difference progressions.',
    availableFlashcardsCount: 5,
    availableBlanksCount: 4
  },
  {
    id: 'weak-5',
    topic: 'Projectile Motion & Complementary Angles',
    subject: 'science',
    errorRate: 61,
    mistakeType: 'Conceptual Mistake',
    recommendedAction: 'Remember: 45° maximizes horizontal range; complementary angles θ and 90°-θ yield equal reach.',
    availableFlashcardsCount: 5,
    availableBlanksCount: 4
  }
];

export const FLASHCARDS_DATA: FlashcardItem[] = [
  // Math Flashcards
  {
    id: 'fc-m1',
    subject: 'mathematics',
    topic: 'Trigonometry',
    frontConcept: 'What is the universal algebraic deduction if:\nsin θ + cosec θ = 2 ?',
    backAnswer: 'sin θ = 1 identically (θ = 90°).\nTherefore, sinⁿ θ + cosecⁿ θ = 1ⁿ + 1ⁿ = 2 for ANY integer power n!',
    memoryMnemonic: 'Mnemonic: "Reciprocal Pair Rule" — If a + 1/a = 2, then a must equal 1.',
    historyContext: 'Tololing 1999: Gunners used reciprocal trigonometric lookup tables to calculate target elevations in sub-zero winds.'
  },
  {
    id: 'fc-m2',
    subject: 'mathematics',
    topic: 'Matrices & Determinants',
    frontConcept: 'What is the exact condition for a square matrix A to have NO INVERSE (be singular)?',
    backAnswer: 'det(A) = 0.\nA matrix is invertible if and only if its determinant is non-zero (det(A) ≠ 0).',
    memoryMnemonic: 'Mnemonic: "Zero Det = No Net" — A determinant of zero collapses the matrix dimension.',
    historyContext: 'Cryptographic encoders in the Corps of Signals rely on non-singular matrices for invertible cipher transmission.'
  },
  {
    id: 'fc-m3',
    subject: 'mathematics',
    topic: 'Calculus',
    frontConcept: 'What is the value of ∫_{-a}^a f(x) dx when f(-x) = -f(x) (an ODD function)?',
    backAnswer: '0 (ZERO) identically.\nThe symmetric areas on either side of the origin cancel out completely.',
    memoryMnemonic: 'Mnemonic: "Odd over Centered Limit = Obliterated to Zero".',
    historyContext: 'Artillery wave mechanics: symmetric shockwaves cancel at balanced defensive counter-trenches.'
  },

  // English Flashcards
  {
    id: 'fc-e1',
    subject: 'english',
    topic: 'Spotting Errors',
    frontConcept: 'In "Neither the Colonel nor his lieutenants [was/were] present", which verb is correct?',
    backAnswer: 'WERE present.\nWith "neither... nor", the verb agrees with the closer subject ("lieutenants" = plural).',
    memoryMnemonic: 'Mnemonic: "NEAR with NOR" — The noun physically nearest to the verb governs the sentence!',
    historyContext: 'Formal military dispatch syntax: clarity in casualty reporting avoids operational confusion.'
  },
  {
    id: 'fc-e2',
    subject: 'english',
    topic: 'Conjunctions',
    frontConcept: 'Which correlative conjunction MUST follow "Hardly" or "Scarcely" in an inverted clause?',
    backAnswer: 'WHEN (never "THAN" or "THEN").\nExample: Hardly had the siren sounded WHEN the pilots scrambled.',
    memoryMnemonic: 'Mnemonic: "Scarcely / Hardly WHEN, No sooner THAN".',
    historyContext: 'Air Force scramble orders: rapid alert dispatch drills.'
  },

  // Modern History Flashcards
  {
    id: 'fc-h1',
    subject: 'gk',
    topic: 'Modern Military History',
    frontConcept: 'Why is Indian Navy Day celebrated on DECEMBER 4TH every year?',
    backAnswer: 'Commemorating OPERATION TRIDENT (1971), when Indian Navy missile boats devastated Karachi harbour with Styx anti-ship missiles.',
    memoryMnemonic: 'Mnemonic: "Dec 4 = Trident Strike" — The night the missile boats roared.',
    historyContext: 'INS Nipat, Nirghat, and Veer executed the world\'s first successful anti-ship missile attack in the region.'
  },
  {
    id: 'fc-h2',
    subject: 'gk',
    topic: 'Modern Military History',
    frontConcept: 'Which Article of the Indian Constitution vests supreme command of the Defence Forces in the President?',
    backAnswer: 'ARTICLE 53(2).\nThe President is the Supreme Commander of the Armed Forces of the Union.',
    memoryMnemonic: 'Mnemonic: "Article 53(2) = President in Uniform".',
    historyContext: 'Ensures democratic civil oversight over the Armed Forces, as envisioned by India\'s founding fathers.'
  },
  {
    id: 'fc-h3',
    subject: 'gk',
    topic: 'Modern Military History',
    frontConcept: 'Who was India\'s first Param Vir Chakra recipient and at which battle did he sacrifice his life?',
    backAnswer: 'MAJOR SOMNATH SHARMA (4 Kumaon) at the BATTLE OF BADGAM (Kashmir, November 3, 1947).',
    memoryMnemonic: 'Mnemonic: "Somnath at Badgam = First PVC" — His last words: "I shall not withdraw an inch..."',
    historyContext: 'Major Sharma saved Srinagar airfield from falling to invaders, turning the tide of the 1947 war.'
  },

  // Science Flashcards
  {
    id: 'fc-s1',
    subject: 'science',
    topic: 'Ballistics Physics',
    frontConcept: 'Which projection angle θ gives the MAXIMUM horizontal range for artillery shells on flat ground?',
    backAnswer: '45 DEGREES (θ = 45°).\nBecause R = (u² sin 2θ)/g, and sin(2 × 45°) = sin 90° = 1 (maximum possible sine value).',
    memoryMnemonic: 'Mnemonic: "45 for the Farthest Flight".',
    historyContext: 'Bofors 155mm howitzer gunners calculate elevation relative to 45° for maximum territorial reach.'
  },
  {
    id: 'fc-s2',
    subject: 'science',
    topic: 'Ballistics Physics',
    frontConcept: 'If two shells are fired at identical speed at angles 30° and 60°, how do their horizontal ranges compare?',
    backAnswer: 'THEY ARE EQUAL.\nComplementary angles θ and (90° - θ) yield identical horizontal ranges: sin(2 × 30°) = sin(60°) = sin(2 × 60°) = sin(120°) = √3/2.',
    memoryMnemonic: 'Mnemonic: "Complementary Angles = Identical Landing Spots".',
    historyContext: 'High-angle mortar fire vs low-angle direct tank fire hitting the same forward outpost distance.'
  }
];

export const FILL_BLANKS_DATA: FillBlankItem[] = [
  {
    id: 'fb-1',
    subject: 'mathematics',
    topic: 'Trigonometry',
    sentenceWithBlank: 'If sin θ + cosec θ = 2, then the value of sin⁵⁰ θ + cosec⁵⁰ θ is equal to [BLANK].',
    blankAnswer: '2',
    acceptableAlternatives: ['two', '2.0'],
    hint: 'Substitute sin θ = 1 and cosec θ = 1.',
    conceptRule: 'a + 1/a = 2 implies a = 1. Therefore 1⁵⁰ + 1⁵⁰ = 2.'
  },
  {
    id: 'fb-2',
    subject: 'mathematics',
    topic: 'Matrices',
    sentenceWithBlank: 'A square matrix A is called singular and has NO inverse when its determinant equals [BLANK].',
    blankAnswer: '0',
    acceptableAlternatives: ['zero'],
    hint: 'Inverse requires division by det(A). What number cannot be in the denominator?',
    conceptRule: 'A⁻¹ = (adj A) / det(A). If det(A) = 0, division by zero is undefined.'
  },
  {
    id: 'fb-3',
    subject: 'english',
    topic: 'Error Spotting',
    sentenceWithBlank: 'Neither the commander nor the soldiers [BLANK] informed of the sudden dawn redeployment (was/were).',
    blankAnswer: 'were',
    acceptableAlternatives: ['were'],
    hint: 'Which subject is closer to the blank: commander or soldiers?',
    conceptRule: 'Rule of Proximity: "soldiers" is plural, so use "were".'
  },
  {
    id: 'fb-4',
    subject: 'gk',
    topic: 'Modern History',
    sentenceWithBlank: 'Indian Navy Day is celebrated every year on the [BLANK] of December to honor Operation Trident.',
    blankAnswer: '4th',
    acceptableAlternatives: ['4', 'fourth'],
    hint: 'Single digit date in the first week of December.',
    conceptRule: 'Operation Trident occurred on the night of 4-5 December 1971.'
  },
  {
    id: 'fb-5',
    subject: 'science',
    topic: 'Ballistics',
    sentenceWithBlank: 'To achieve maximum horizontal reach, an artillery piece must be elevated to an angle of [BLANK] degrees with the horizontal.',
    blankAnswer: '45',
    acceptableAlternatives: ['45°', 'forty five'],
    hint: 'Half of a right angle (90°).',
    conceptRule: 'R = (u² sin 2θ)/g. sin(2θ) reaches its maximum value of 1 when 2θ = 90°, so θ = 45°.'
  }
];

export const SURVIVAL_ASCENT_QUESTIONS = [
  {
    id: 'asc-1',
    level: 1 as DifficultyLevel,
    timeLimitSec: 25,
    questionText: 'What is the sum of eigenvalues of a square matrix always equal to?',
    options: ['Determinant', 'Trace (sum of diagonal elements)', 'Transpose', 'Inverse'],
    correctOptionIndex: 1,
    subject: 'mathematics' as const,
    topic: 'Matrices',
    explanation: 'Sum of eigenvalues = Trace(A). Product of eigenvalues = det(A).'
  },
  {
    id: 'asc-2',
    level: 2 as DifficultyLevel,
    timeLimitSec: 30,
    questionText: 'Which preposition correctly completes: "The General differed [BLANK] his deputy regarding the retreat order"?',
    options: ['with', 'from', 'to', 'against'],
    correctOptionIndex: 0,
    subject: 'english' as const,
    topic: 'Preposition Rules',
    explanation: 'Differ WITH a person in opinion; Differ FROM something in physical characteristics.'
  },
  {
    id: 'asc-3',
    level: 3 as DifficultyLevel,
    timeLimitSec: 35,
    questionText: 'In the 1971 Battle of Longewala, which famous infantry battalion defended the post against an entire tank brigade?',
    options: ['1 Para SF', '23 Punjab', '13 JAK Rifles', '4 Kumaon'],
    correctOptionIndex: 1,
    subject: 'gk' as const,
    topic: '1971 History',
    explanation: '23 Punjab under Major Kuldip Singh Chandpuri (MVC) held the post with just 120 men and no tank support.'
  },
  {
    id: 'asc-4',
    level: 4 as DifficultyLevel,
    timeLimitSec: 25,
    questionText: 'Find the unit digit of the 7th term in sequence: 4, 18, 48, 100, 180, 294, ?',
    options: ['8', '6', '4', '0'],
    correctOptionIndex: 0,
    subject: 'reasoning' as const,
    topic: 'Cubic Progression',
    explanation: 'Terms are n²(n - 1). For n = 8: 8²(8 - 1) = 64 × 7 = 448. Unit digit is 8!'
  }
];
