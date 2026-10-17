import { SubjectDetail } from '../types';

export const SUBJECT_ACADEMY_DATA: SubjectDetail[] = [
  // ================= 1. MATHEMATICS =================
  {
    id: 'mathematics',
    name: 'Mathematics',
    regimentalTitle: 'Regiment of Artillery & Ballistics',
    emblemIcon: 'Compass',
    historicInsignia: 'Tololing 1999 & Battle of Asal Uttar',
    heritageStory:
      'Inspired by Indian artillery officers who calculated trajectory angles by hand under heavy fire to neutralize enemy bunkers atop Tiger Hill (1999) and the Patton tanks at Asal Uttar (1965). Mathematical speed and spatial precision save lives in combat.',
    themeColor: 'amber',
    accentBorder: 'border-amber-500/50',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    lessons: [
      {
        id: 'math-les-1',
        title: 'Trigonometric Extremes & Reciprocal Values',
        durationMinutes: 5,
        level: 1,
        summary: 'Mastering the reciprocal relation a + 1/a = 2 and extreme bound theorems for NDA Paper 1.',
        coreConcepts: [
          'If x + 1/x = 2, then x = 1 identically for all real values.',
          'sin² θ + cos² θ = 1, sec² θ - tan² θ = 1, cosec² θ - cot² θ = 1.',
          'Maximum and minimum values of a sin θ + b cos θ: [-√(a²+b²), +√(a²+b²)].'
        ],
        formulaOrRuleBox: 'sin θ + cosec θ = 2  ⟹  sin θ = 1 (θ = 90°)\na sin θ + b cos θ ∈ [-√(a²+b²), +√(a²+b²)]',
        highYieldExamFact: 'Tested in 14 out of the last 16 UPSC NDA examinations as a 5-second question!',
        isCompleted: true
      },
      {
        id: 'math-les-2',
        title: 'Determinants: Row Reductions & Zero Harvesting',
        durationMinutes: 6,
        level: 2,
        summary: 'Expanding 3×3 matrices rapidly by targeting rows with maximum zeros and identifying singular matrices.',
        coreConcepts: [
          'A matrix A has NO inverse (is singular) if and only if det(A) = 0.',
          'det(kA) = kⁿ det(A) for an n×n square matrix.',
          'Adding a scalar multiple of one row to another does NOT alter the determinant value.'
        ],
        formulaOrRuleBox: 'Singular Matrix Condition: det(A) = 0\ndet(A⁻¹) = 1 / det(A)\ndet(adj A) = (det A)ⁿ⁻¹',
        highYieldExamFact: 'Always expand along the row or column containing the most zeros to cut calculation time by 60%.',
        isCompleted: true
      },
      {
        id: 'math-les-3',
        title: 'Calculus: King Rule & Parity Elimination in Integrals',
        durationMinutes: 7,
        level: 3,
        summary: 'Using symmetric limits [-a, a] to instantly eliminate odd terms in high-powered integrals.',
        coreConcepts: [
          'King Property: ∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx.',
          'For symmetric limits [-a, a]: If f(-x) = -f(x) (odd), the integral vanishes to 0.',
          'If f(-x) = f(x) (even), ∫_{-a}^a f(x) dx = 2 ∫_0^a f(x) dx.'
        ],
        formulaOrRuleBox: '∫_{-a}^a [Odd(x) + Even(x)] dx = 2 ∫_0^a Even(x) dx',
        highYieldExamFact: 'When facing complex trigonometric integrands with [-π/2, π/2], 90% of terms are odd and cancel out.',
        isCompleted: false
      },
      {
        id: 'math-les-4',
        title: 'Vectors & 3D Lines: Shortest Distance & Coplanarity',
        durationMinutes: 6,
        level: 2,
        summary: 'Coordinate geometry and vector products for lines and planes in 3-dimensional combat space.',
        coreConcepts: [
          'Dot product evaluates perpendicularity: a · b = 0.',
          'Cross product evaluates parallelism: a × b = 0.',
          'Shortest distance between skew lines r = a₁ + λb₁ and r = a₂ + μb₂ is |(b₁ × b₂) · (a₂ - a₁)| / |b₁ × b₂|.'
        ],
        formulaOrRuleBox: 'd = |(a₂ - a₁) · (b₁ × b₂)| / |b₁ × b₂|',
        highYieldExamFact: 'Vector algebra and 3D geometry account for 12-15 questions in every NDA paper.',
        isCompleted: false
      }
    ],
    studyMaterials: [
      {
        id: 'math-doc-1',
        title: 'Artillery Formula Codex (NDA/CDS High-Yield Equations)',
        category: 'formula_vault',
        readingTime: '8 min read',
        keyHighlights: [
          'All 32 core Trigonometric identities with substitution values',
          'Determinant properties & Adjoint theorems',
          'Definite integral standard forms',
          'Probability: Bayes Theorem & Binomial Distribution'
        ],
        contentMarkdown: `# Artillery Formula Codex\n\n### 1. Trigonometry Fast Values\n- $\\sin 15^\\circ = \\frac{\\sqrt{6} - \\sqrt{2}}{4} = \\cos 75^\\circ$\n- $\\cos 15^\\circ = \\frac{\\sqrt{6} + \\sqrt{2}}{4} = \\sin 75^\\circ$\n- $\\tan 15^\\circ = 2 - \\sqrt{3} = \\cot 75^\\circ$\n- $\\tan 75^\\circ = 2 + \\sqrt{3} = \\cot 15^\\circ$\n\n### 2. Matrix Essentials\n- $\\det(AB) = \\det(A) \\cdot \\det(B)$\n- $A \\cdot \\text{adj}(A) = \\det(A) \\cdot I$\n- For $n \\times n$ matrix: $\\det(\\text{adj } A) = (\\det A)^{n-1}$`
      },
      {
        id: 'math-doc-2',
        title: 'Top 10 Speed Elimination Shortcuts for NDA Mathematics',
        category: 'cheat_sheet',
        readingTime: '5 min read',
        keyHighlights: [
          'Extreme angle substitution: θ = 0°, 45°, 90°',
          'Matrix eigenvalue trace property shortcut',
          'L\'Hôpital rule double differentiation tactics'
        ],
        contentMarkdown: `# 10 Tactical Math Shortcuts\n\n1. **Trig Variable Elimination:** If an equation must hold for all $\\theta$, substitute $\\theta = 0^\\circ$ or $45^\\circ$. Eliminate 2-3 options in 10 seconds.\n2. **Trace of Matrix:** The sum of eigenvalues always equals the trace (sum of diagonal elements).\n3. **Integral King Rule:** When limits sum to $\\pi/2$, $\\int_0^{\\pi/2} \\frac{\\sin^n x}{\\sin^n x + \\cos^n x} dx = \\frac{\\pi}{4}$.`
      }
    ]
  },

  // ================= 2. REASONING & OIR =================
  {
    id: 'reasoning',
    name: 'Reasoning & OIR',
    regimentalTitle: 'Corps of Military Intelligence (MI)',
    emblemIcon: 'Brain',
    historicInsignia: 'Operation Meghdoot & Kargil Reconnaissance',
    heritageStory:
      'Military intelligence operators analyze cryptic enemy radio patterns, interpret terrain photos, and deduce troop movements through deductive logic. In the SSB interview, Officer Intelligence Rating (OIR) determines whether you get recommended on Day 1.',
    themeColor: 'blue',
    accentBorder: 'border-blue-500/50',
    badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    lessons: [
      {
        id: 'reas-les-1',
        title: 'Number Series: Quadratic & Cubic Jumps',
        durationMinutes: 5,
        level: 2,
        summary: 'Identifying non-linear numerical sequences using multi-tier difference analysis and n³ ± n² formulas.',
        coreConcepts: [
          'If first difference increases by a common delta, sequence is quadratic (an² + bn + c).',
          'Standard cubic forms: n³ - n², n³ - n, and n³ + 1.',
          'Unit digit parity check for rapid elimination of choices.'
        ],
        formulaOrRuleBox: 'n³ - n² = n²(n - 1)  ⟹  4, 18, 48, 100, 180, 294...\nDouble Difference D2 = Constant (e.g. +6)',
        highYieldExamFact: 'OIR Series questions test speed: you have only 25-30 seconds per item on SSB Day 1.',
        isCompleted: true
      },
      {
        id: 'reas-les-2',
        title: 'Categorical Syllogisms & Venn Disproof',
        durationMinutes: 6,
        level: 3,
        summary: 'Disproving invalid deductions through minimum-overlap Euler circles without emotional bias.',
        coreConcepts: [
          'Universal Affirmative (A): All X are Y.',
          'Particular Negative (O): Some X are NOT Z.',
          'The Golden Rule: "Some A are B" + "No B is C" ALWAYS yields "Some A are NOT C".'
        ],
        formulaOrRuleBox: 'Premise: Some X are Y  +  No Y is Z\nConclusion: Some X are NOT Z (100% Definite)',
        highYieldExamFact: 'Never allow real-world military emotions to dictate formal syllogism validity.',
        isCompleted: false
      },
      {
        id: 'reas-les-3',
        title: 'OIR Spatial Matrix & Cube Unfolding',
        durationMinutes: 5,
        level: 2,
        summary: 'Mental 3D rotation of cubes, identifying opposite faces on unfolded cross diagrams.',
        coreConcepts: [
          'In an unfolded dice net, alternate faces (separated by 1 square) are ALWAYS opposite.',
          'Opposite faces can NEVER appear adjacent in a single perspective view.',
          'Clockwise face sequences must remain invariant under orthogonal rotation.'
        ],
        formulaOrRuleBox: 'Opposite Rule: Face 1 ↔ Face 3, Face 2 ↔ Face 4\nAdjacent Test: If A & B are opposite, they CANNOT touch.',
        highYieldExamFact: 'Cube unfolding is the highest-weightage non-verbal question in AFCAT and SSB OIR.',
        isCompleted: false
      }
    ],
    studyMaterials: [
      {
        id: 'reas-doc-1',
        title: 'SSB Stage-1 OIR Rating Blueprint (Grade 1 Standard)',
        category: 'cheat_sheet',
        readingTime: '6 min read',
        keyHighlights: [
          'Target score: 45+ out of 50 in 30 minutes for OIR 1',
          'Top 5 non-verbal figure matrix types',
          'Coding-decoding alphabetical positional numbers (EJOTY rule)'
        ],
        contentMarkdown: `# OIR Grade 1 Blueprint\n\n### The EJOTY Rule for Alphabet Positions\n- **E = 5**, **J = 10**, **O = 15**, **T = 20**, **Y = 25**\n- Reverse alphabet sum: Letter + Reverse Letter = 27 (e.g., A=1, Z=26; 1+26=27).\n\n### Time Allocation\n- Total Time: 30 minutes for 50 questions.\n- Target: Attempt all 50; there is NO negative marking in OIR at SSB!`
      }
    ]
  },

  // ================= 3. ENGLISH (GAT) =================
  {
    id: 'english',
    name: 'English (GAT)',
    regimentalTitle: 'Corps of Signals & Dispatch Intelligence',
    emblemIcon: 'BookOpen',
    historicInsignia: 'Wireless Operators of Kohima & Rezang La',
    heritageStory:
      'In military operations, clarity of communication is the difference between victory and catastrophe. A misplaced clause in tactical orders can alter troop positions. That is why UPSC tests grammatical precision so rigorously.',
    themeColor: 'emerald',
    accentBorder: 'border-emerald-500/50',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    lessons: [
      {
        id: 'eng-les-1',
        title: 'Subject-Verb Proximity with Correlative Conjunctions',
        durationMinutes: 4,
        level: 2,
        summary: 'Resolving neither... nor, either... or, and not only... but also using the Rule of Proximity.',
        coreConcepts: [
          'When two subjects are joined by "neither... nor" or "either... or", the verb agrees with the CLOSER subject.',
          'Standalone "Neither of the [plural noun]" is ALWAYS singular (Neither of the officers was present).',
          'Words joined by "as well as", "along with", "together with" agree with the FIRST subject.'
        ],
        formulaOrRuleBox: 'Neither S1 nor [S2 (Plural)] + [WERE (Plural)]\nS1 (Singular) + along with S2 + [WAS (Singular)]',
        highYieldExamFact: 'Appears in practically every NDA and CDS error-spotting section without exception.',
        isCompleted: true
      },
      {
        id: 'eng-les-2',
        title: 'Inverted Conditionals & Negative Adverbs',
        durationMinutes: 5,
        level: 3,
        summary: 'Subject-auxiliary inversion following hardly, scarcely, seldom, and conditional clauses.',
        coreConcepts: [
          'When a sentence begins with "Hardly", "Scarcely", or "No sooner", the auxiliary comes BEFORE the subject.',
          '"Hardly / Scarcely" must be followed by "WHEN", never "THAN".',
          '"No sooner" must be followed by "THAN", never "WHEN".'
        ],
        formulaOrRuleBox: 'Hardly + HAD + Subject + V3 ... WHEN ...\nNo sooner + DID/HAD + Subject ... THAN ...',
        highYieldExamFact: 'Classic UPSC trap: replacing WHEN with THEN or THAN in sentences starting with Scarcely.',
        isCompleted: false
      },
      {
        id: 'eng-les-3',
        title: 'Tactical Military Idioms & Phrasal Traps',
        durationMinutes: 5,
        level: 1,
        summary: 'Decoding military and naval idiomatic expressions commonly tested in AFCAT and CDS.',
        coreConcepts: [
          '"To burn one\'s boats" = To leave no means of retreat or option to turn back.',
          '"To show a clean pair of heels" = To outrun pursuers and escape rapidly.',
          '"To bite the bullet" = To face a grim situation with stoic courage.'
        ],
        formulaOrRuleBox: 'Bite the bullet ⟹ Endure unavoidable hardship\nThrow down the gauntlet ⟹ Issue a direct challenge',
        highYieldExamFact: 'AFCAT tests 5 direct idiom questions in every single verbal ability exam.',
        isCompleted: false
      }
    ],
    studyMaterials: [
      {
        id: 'eng-doc-1',
        title: 'The Signals Grammar Codex (50 Inviolable UPSC Rules)',
        category: 'grammar_codex',
        readingTime: '10 min read',
        keyHighlights: [
          'The 7 Subject-Verb Agreement traps',
          'Conditional Clauses (Type 0, 1, 2, 3)',
          'Hypothetical Wish clauses ("I wish I WERE...")',
          'Parallelism in coordinate structures'
        ],
        contentMarkdown: `# The Signals Grammar Codex\n\n### Rule 1: The Proximity Trap\nWhen subjects are connected by *or, nor, either...or, neither...nor*, the verb must agree with the nearer subject.\n\n### Rule 2: Intervening Prepositional Phrases\nWords like *with, together with, as well as, accompanied by* do NOT affect the number of the subject. The verb agrees with the primary subject.\n*Example:* The General, accompanied by his aides, **was** inspecting the frontline.`
      }
    ]
  },

  // ================= 4. MODERN HISTORY & WAR MEMORIALS =================
  {
    id: 'gk',
    name: 'Modern Military History',
    regimentalTitle: 'Infantry Standards & National War Memorial',
    emblemIcon: 'Shield',
    historicInsignia: '1971 Longewala, 1967 Nathu La, 1947 Shalateng',
    heritageStory:
      'From the 1857 First War of Independence to Netaji\'s Indian National Army (Azad Hind Fauj) and the immortal tank battle of Longewala (1971), modern Indian military history embodies supreme courage, sacrifice, and sovereign resolve. The eternal flame (Amar Jawan Jyoti) burns for those who gave their today for our tomorrow.',
    themeColor: 'rose',
    accentBorder: 'border-rose-500/50',
    badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    lessons: [
      {
        id: 'hist-les-1',
        title: 'The 1971 Indo-Pak War & Liberation of Bangladesh',
        durationMinutes: 6,
        level: 2,
        summary: 'Operation Trident (Karachi harbour strike), Battle of Longewala, and the historic surrender of 93,000 troops.',
        coreConcepts: [
          'Operation Trident: Indian Navy missile boats (INS Nipat, Nirghat, Veer) struck Karachi harbour on 4 Dec 1971 (celebrated as Navy Day).',
          'Battle of Longewala: Major Kuldip Singh Chandpuri (23 Punjab) and IAF Hunter jets held off 45+ Pakistani tanks.',
          'Historic Surrender: 16 December 1971 in Dhaka, signed by Lt Gen A.A.K. Niazi before Lt Gen J.S. Aurora.'
        ],
        formulaOrRuleBox: '4 Dec: Navy Day (Op Trident)\n16 Dec: Vijay Diwas (1971 Victory)\n15 Jan: Army Day (Gen Cariappa takes command 1949)',
        highYieldExamFact: 'Tested regularly in NDA GS Paper: Navy Day, Army Day, Air Force Day (8 Oct) and major operational code names.',
        isCompleted: true
      },
      {
        id: 'hist-les-2',
        title: 'Supreme Commander & Armed Forces in the Constitution',
        durationMinutes: 5,
        level: 2,
        summary: 'Article 53(2), emergency provisions, and military command integration under the Indian Constitution.',
        coreConcepts: [
          'Article 53(2): The supreme command of the Defence Forces of the Union is vested in the President of India.',
          'Chief of Defence Staff (CDS): Permanent Chairman of the Chiefs of Staff Committee and Principal Military Adviser to Raksha Mantri.',
          'The first Commander-in-Chief of independent India was Field Marshal K.M. Cariappa (15 Jan 1949).'
        ],
        formulaOrRuleBox: 'Article 53(2): President = Supreme Commander\nArticle 352: National Emergency on grounds of War, External Aggression, Armed Rebellion',
        highYieldExamFact: 'UPSC frequently asks which Article vests command in the President (Article 53(2)).',
        isCompleted: false
      },
      {
        id: 'hist-les-3',
        title: 'Netaji Subhash Chandra Bose & Azad Hind Fauj (INA)',
        durationMinutes: 6,
        level: 2,
        summary: 'Formation of the INA, the Rani of Jhansi Regiment, Battle of Kohima-Imphal, and the Red Fort Trials.',
        coreConcepts: [
          'Netaji took command of the INA in Singapore (1943) with the slogan "Chalo Dilli" and "Jai Hind".',
          'First all-female combat regiment: Rani of Jhansi Regiment commanded by Captain Lakshmi Sahgal.',
          'Red Fort Trials (1945-46): Defence of Prem Sahgal, Gurbaksh Dhillon, and Shah Nawaz Khan galvanized the independence movement.'
        ],
        formulaOrRuleBox: '23 Jan: Parakram Diwas (Netaji Jayanti)\nINA War Cry: "Jai Hind" & "Kadam Kadam Badhaye Ja"',
        highYieldExamFact: '23rd January is officially celebrated as Parakram Diwas by the Government of India.',
        isCompleted: false
      }
    ],
    studyMaterials: [
      {
        id: 'hist-doc-1',
        title: 'Timeline of Independent India\'s Wars & Operations',
        category: 'history_timeline',
        readingTime: '9 min read',
        keyHighlights: [
          '1947-48: Battle of Shalateng & Badgam (Major Somnath Sharma, first PVC)',
          '1962: Sino-Indian War (Battle of Rezang La, Major Shaitan Singh)',
          '1965: Battle of Asal Uttar (CQMH Abdul Hamid) & Phillora',
          '1971: Liberation War & Op Trident',
          '1984: Operation Meghdoot (Siachen Glacier)',
          '1999: Operation Vijay (Kargil War: Tiger Hill & Tololing)'
        ],
        contentMarkdown: `# Independent India\'s Military Milestones\n\n### 1947: First Indo-Pak War\nMajor Somnath Sharma (4 Kumaon) was posthumously awarded India's first Param Vir Chakra for defending Srinagar airfield at Badgam.\n\n### 1965: Battle of Asal Uttar\nOne of the largest tank battles in history. CQMH Abdul Hamid destroyed multiple Patton tanks with a recoilless gun (awarded PVC).\n\n### 1999: Operation Vijay\nIndian Army recaptured heights in Dras, Kargil, and Batalik sectors. Param Vir Chakra recipients: Captain Vikram Batra, Lt Manoj Kumar Pandey, Grenadier Yogender Singh Yadav, Rifleman Sanjay Kumar.`
      }
    ]
  },

  // ================= 5. GENERAL SCIENCE =================
  {
    id: 'science',
    name: 'Combat Science',
    regimentalTitle: 'Corps of Engineers & Defence Metallurgy',
    emblemIcon: 'Zap',
    historicInsignia: 'Pokhran Nuclear Tests & BrahMos Lineage',
    heritageStory:
      'Applied physics and chemistry power India\'s ballistic missile shields, tank armours (Kanchan composite), and high-altitude life support systems on the Siachen glacier. Science in uniform is the ultimate force multiplier.',
    themeColor: 'cyan',
    accentBorder: 'border-cyan-500/50',
    badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    lessons: [
      {
        id: 'sci-les-1',
        title: 'Ballistics & Projectile Trajectory Range',
        durationMinutes: 5,
        level: 2,
        summary: 'Horizontal range maximization, complementary angle equivalence, and projectile kinematics.',
        coreConcepts: [
          'Range formula: R = (u² sin 2θ) / g. Maximum range occurs at θ = 45° where sin 2θ = 1.',
          'Complementary angles θ and (90° - θ) yield identical horizontal ranges.',
          'Maximum height: H = (u² sin² θ) / (2g). Maximized at θ = 90° (vertical launch).'
        ],
        formulaOrRuleBox: 'R_max = u² / g (at θ = 45°)\nRange at 30° == Range at 60° (Equal reach!)',
        highYieldExamFact: 'Tested in 90% of NDA General Science physics papers.',
        isCompleted: true
      },
      {
        id: 'sci-les-2',
        title: 'Explosives Chemistry & Rocket Propellants',
        durationMinutes: 6,
        level: 2,
        summary: 'Chemical composition of military propellants, RDX, TNT, and solid vs liquid rocket fuels.',
        coreConcepts: [
          'RDX (Research Department Explosive): Cyclotrimethylenetrinitramine (Cyclonite), widely used in military warheads.',
          'Solid Rocket Propellants: Typically ammonium perchlorate (oxidizer) + aluminum powder (fuel) + HTPB binder.',
          'TNT (Trinitrotoluene): Benchmark standard for measuring explosive yield (tonnes of TNT equivalent).'
        ],
        formulaOrRuleBox: 'RDX = C₃H₆N₆O₆ (High explosive)\nSolid Propellant = HTPB + Ammonium Perchlorate',
        highYieldExamFact: 'UPSC frequently asks the chemical full form of RDX or composition of gun metal (Cu 88%, Sn 10%, Zn 2%).',
        isCompleted: false
      }
    ],
    studyMaterials: [
      {
        id: 'sci-doc-1',
        title: 'Applied Combat Physics & Metallurgy Cheat Sheet',
        category: 'cheat_sheet',
        readingTime: '7 min read',
        keyHighlights: [
          'Projectile motion complete reference',
          'Acoustics & Sonar velocity in sea water',
          'Radar electromagnetic spectrum frequencies',
          'Military alloys: Gun metal, Duralumin, Invar'
        ],
        contentMarkdown: `# Combat Physics & Metallurgy\n\n### 1. Sound Waves in Naval Warfare\n- Speed of sound in air: ~340 m/s\n- Speed of sound in sea water: ~1,500 m/s (4.5x faster, crucial for SONAR).\n\n### 2. High-Yield Alloys\n- **Gun Metal:** 88% Copper, 10% Tin, 2% Zinc.\n- **Duralumin:** Aluminum + Copper + Magnesium (lightweight aircraft fuselage).\n- **German Silver:** Copper + Zinc + Nickel (contains ZERO silver!).`
      }
    ]
  },

  // ================= 6. CURRENT AFFAIRS & DEFENCE TECH =================
  {
    id: 'current_affairs',
    name: 'Current Affairs & Tech',
    regimentalTitle: 'Strategic Forces Command & Naval Air Arm',
    emblemIcon: 'Radio',
    historicInsignia: 'INS Vikrant & Quad Indo-Pacific Architecture',
    heritageStory:
      'Continuous 24/7 intelligence recon across the Malacca Strait, northern borders, and aerospace corridors guarantees national deterrence. Validated non-expired intelligence is essential for modern defence officers.',
    themeColor: 'purple',
    accentBorder: 'border-purple-500/50',
    badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    lessons: [
      {
        id: 'ca-les-1',
        title: 'The Quad Framework & Exercise Malabar Architecture',
        durationMinutes: 5,
        level: 2,
        summary: 'Strategic maritime cooperation between India, USA, Japan, and Australia in the Indo-Pacific.',
        coreConcepts: [
          'Exercise Malabar originated in 1992 as an India-US bilateral drill; Japan joined 2015; Australia rejoined 2020.',
          'Focus areas: Anti-Submarine Warfare (ASW), air defence, and maritime interdiction.',
          'Quad diplomatic grouping: India, USA, Japan, Australia.'
        ],
        formulaOrRuleBox: 'Quad Members = India + USA + Japan + Australia\nKey Chokepoints = Malacca Strait, Sunda Strait, 10-Degree Channel',
        highYieldExamFact: 'Consistently featured in CDS and NDA GS paper for geopolitical security questions.',
        isCompleted: true
      },
      {
        id: 'ca-les-2',
        title: 'Indigenous Defence Platforms: Tejas, Prachand & Vikrant',
        durationMinutes: 6,
        level: 2,
        summary: 'Key milestones in Aatmanirbhar Bharat defence manufacturing and operational induction.',
        coreConcepts: [
          'INS Vikrant: First indigenously designed and built aircraft carrier (Cochin Shipyard Limited).',
          'LCH Prachand: Light Combat Helicopter capable of operating at 5,000m altitude (Siachen suitable).',
          'LCA Tejas Mk1A: 4.5 generation multi-role fighter manufactured by HAL.'
        ],
        formulaOrRuleBox: 'INS Vikrant: Indigenous Aircraft Carrier (IAC-1)\nLCH Prachand: High-altitude attack helicopter',
        highYieldExamFact: 'Direct questions on platform manufacturer (HAL, Mazagon Dock, CSL, BEL) are frequent in CDS/AFCAT.',
        isCompleted: false
      }
    ],
    studyMaterials: [
      {
        id: 'ca-doc-1',
        title: 'Joint Military Exercises High-Yield Dossier (2025-2026)',
        category: 'defence_brief',
        readingTime: '6 min read',
        keyHighlights: [
          'Army bilateral drills (Yudh Abhyas, Shakti, Dharma Guardian, Nomadic Elephant)',
          'Navy drills (Varuna, SIMBEX, SLINEX, Malabar)',
          'Air Force drills (Garuda, Pitch Black, Tarang Shakti)'
        ],
        contentMarkdown: `# Joint Military Exercises Matrix\n\n### Indian Army\n- **India-USA:** Yudh Abhyas, Vajra Prahar\n- **India-France:** Shakti\n- **India-Japan:** Dharma Guardian\n- **India-Mongolia:** Nomadic Elephant\n- **India-Kazakhstan:** KAZIND\n\n### Indian Navy\n- **India-France:** Varuna\n- **India-Singapore:** SIMBEX\n- **India-Sri Lanka:** SLINEX\n- **India-UK:** Konkan\n\n### Indian Air Force\n- **Tarang Shakti:** India's largest multilateral air exercise`
      }
    ]
  }
];

export function getSubjectById(subjectId: string): SubjectDetail | undefined {
  return SUBJECT_ACADEMY_DATA.find((s) => s.id === subjectId);
}
