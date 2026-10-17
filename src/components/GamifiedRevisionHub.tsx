import React, { useState, useEffect } from 'react';
import {
  WEAK_AREA_TARGETS,
  FLASHCARDS_DATA,
  FILL_BLANKS_DATA,
  SURVIVAL_ASCENT_QUESTIONS
} from '../data/revisionData';
import { FlashcardItem, FillBlankItem, WeakAreaTarget, DifficultyLevel } from '../types';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  Brain,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flame,
  Zap,
  ArrowRight,
  ShieldAlert,
  Layers,
  ChevronRight,
  Lightbulb,
  Award,
  BookOpen
} from 'lucide-react';

type RevisionMode = 'radar' | 'flashcards' | 'fill_blanks' | 'ascent';

interface GamifiedRevisionHubProps {
  onEarnXp?: (xp: number) => void;
}

export const GamifiedRevisionHub: React.FC<GamifiedRevisionHubProps> = ({
  onEarnXp
}) => {
  const [activeMode, setActiveMode] = useState<RevisionMode>('radar');
  const [selectedWeakTarget, setSelectedWeakTarget] = useState<WeakAreaTarget | null>(null);

  // 1. Flashcard State
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  // 2. Fill-in-the-Blanks State
  const [currentBlankIndex, setCurrentBlankIndex] = useState(0);
  const [userBlankInput, setUserBlankInput] = useState('');
  const [blankEvaluated, setBlankEvaluated] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showBlankHint, setShowBlankHint] = useState(false);

  // 3. Survival Ascent State
  const [ascentIndex, setAscentIndex] = useState(0);
  const [ascentTimer, setAscentTimer] = useState(25);
  const [ascentSelectedOption, setAscentSelectedOption] = useState<number | null>(null);
  const [ascentSubmitted, setAscentSubmitted] = useState(false);
  const [ascentScore, setAscentScore] = useState(0);
  const [ascentGameOver, setAscentGameOver] = useState(false);

  // Flashcards filtered by weak area target if selected
  const activeFlashcards = selectedWeakTarget
    ? FLASHCARDS_DATA.filter((fc) => fc.subject === selectedWeakTarget.subject)
    : FLASHCARDS_DATA;

  const currentFlashcard = activeFlashcards[currentCardIndex] || activeFlashcards[0];

  // Fill in blanks filtered
  const activeBlanks = selectedWeakTarget
    ? FILL_BLANKS_DATA.filter((fb) => fb.subject === selectedWeakTarget.subject)
    : FILL_BLANKS_DATA;

  const currentBlank = activeBlanks[currentBlankIndex] || activeBlanks[0];

  // Ascent Timer
  useEffect(() => {
    if (activeMode !== 'ascent' || ascentSubmitted || ascentGameOver) return;
    const interval = setInterval(() => {
      setAscentTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          handleAscentTimeUp();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeMode, ascentIndex, ascentSubmitted, ascentGameOver]);

  // Flashcard Handlers
  const handleFlipCard = () => {
    sounds.playClick();
    setIsCardFlipped((f) => !f);
  };

  const handleNextCard = (markMastered: boolean) => {
    if (markMastered) {
      sounds.playSuccess();
      try {
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
      } catch {}
      setMasteredCards((prev) => ({ ...prev, [currentFlashcard.id]: true }));
      onEarnXp?.(25);
    } else {
      sounds.playClick();
    }
    setIsCardFlipped(false);
    setCurrentCardIndex((i) => (i + 1) % activeFlashcards.length);
  };

  // Fill in Blanks Handlers
  const handleVerifyBlank = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userBlankInput.trim() || blankEvaluated) return;

    const normalizedUser = userBlankInput.trim().toLowerCase().replace(/[^\w\d]/g, '');
    const normalizedTarget = currentBlank.blankAnswer.trim().toLowerCase().replace(/[^\w\d]/g, '');
    const matchesTarget = normalizedUser === normalizedTarget;
    const matchesAlternative = currentBlank.acceptableAlternatives?.some(
      (alt) => alt.trim().toLowerCase().replace(/[^\w\d]/g, '') === normalizedUser
    );

    const correct = matchesTarget || Boolean(matchesAlternative);
    setBlankEvaluated(true);
    setIsAnswerCorrect(correct);

    if (correct) {
      sounds.playSuccess();
      try {
        confetti({ particleCount: 40, spread: 55, origin: { y: 0.7 } });
      } catch {}
      onEarnXp?.(35);
    } else {
      sounds.playError();
    }
  };

  const handleNextBlank = () => {
    sounds.playClick();
    setUserBlankInput('');
    setBlankEvaluated(false);
    setIsAnswerCorrect(false);
    setShowBlankHint(false);
    setCurrentBlankIndex((i) => (i + 1) % activeBlanks.length);
  };

  // Survival Ascent Handlers
  const currentAscentQ = SURVIVAL_ASCENT_QUESTIONS[ascentIndex];

  const handleAscentTimeUp = () => {
    sounds.playError();
    setAscentSubmitted(true);
    setAscentGameOver(true);
  };

  const handleSelectAscentOption = (idx: number) => {
    if (ascentSubmitted) return;
    sounds.playClick();
    setAscentSelectedOption(idx);
    setAscentSubmitted(true);

    const isCorrect = idx === currentAscentQ.correctOptionIndex;
    if (isCorrect) {
      sounds.playSuccess();
      try {
        confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });
      } catch {}
      const points = currentAscentQ.level * 40;
      setAscentScore((s) => s + points);
      onEarnXp?.(points);
    } else {
      sounds.playError();
      setAscentGameOver(true);
    }
  };

  const handleNextAscentQuestion = () => {
    if (ascentIndex + 1 < SURVIVAL_ASCENT_QUESTIONS.length) {
      setAscentIndex((i) => i + 1);
      setAscentSelectedOption(null);
      setAscentSubmitted(false);
      setAscentTimer(SURVIVAL_ASCENT_QUESTIONS[ascentIndex + 1].timeLimitSec);
    } else {
      sounds.playRankUp();
      setAscentGameOver(true);
    }
  };

  const handleRestartAscent = () => {
    sounds.playClick();
    setAscentIndex(0);
    setAscentSelectedOption(null);
    setAscentSubmitted(false);
    setAscentGameOver(false);
    setAscentScore(0);
    setAscentTimer(SURVIVAL_ASCENT_QUESTIONS[0].timeLimitSec);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 pb-24 p-3 sm:p-5 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border border-stone-800 shadow-2xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">
                VEER AI PERFORMANCE ANALYSIS
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-stone-100 font-mono">
                Gamified Weak-Area Revision Modules
              </h1>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
            TARGETED DRILLS
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          Reinforce critical concepts where you struggled in recent tests. Choose between spaced-repetition
          Kavach flashcards, active-recall fill-in-the-blanks, or the timed Survival Ascent challenge!
        </p>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-stone-950 rounded-2xl border border-stone-800 mt-4">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveMode('radar');
            }}
            className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeMode === 'radar'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Weak Radar
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveMode('flashcards');
            }}
            className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeMode === 'flashcards'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            🎴 Flashcards
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveMode('fill_blanks');
            }}
            className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeMode === 'fill_blanks'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            ✍️ Blanks
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveMode('ascent');
            }}
            className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all text-center ${
              activeMode === 'ascent'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            ⚡ Ascent
          </button>
        </div>
      </div>

      {/* ================= MODE 1: WEAK AREA RADAR SCANNER ================= */}
      {activeMode === 'radar' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
            <span>DIAGNOSED STRUGGLE ZONES</span>
            <span>CLICK TO LAUNCH TARGETED REINFORCEMENT</span>
          </div>

          <div className="space-y-3">
            {WEAK_AREA_TARGETS.map((target) => (
              <div
                key={target.id}
                className="p-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all shadow-md space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                        {target.subject.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30">
                        {target.mistakeType}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-stone-100 mt-1 font-mono">
                      {target.topic}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-stone-400 font-mono uppercase">Error Rate</div>
                    <div className="text-base font-bold text-rose-400 font-mono">{target.errorRate}%</div>
                  </div>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed font-sans bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
                  <span className="text-amber-400 font-bold font-mono">Prescription: </span>
                  {target.recommendedAction}
                </p>

                {/* Drill Launch Buttons */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setSelectedWeakTarget(target);
                      setCurrentCardIndex(0);
                      setActiveMode('flashcards');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Kavach Flashcards</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setSelectedWeakTarget(target);
                      setCurrentBlankIndex(0);
                      setActiveMode('fill_blanks');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Fill Blanks Drill</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= MODE 2: INTERACTIVE COMBAT FLASHCARDS ================= */}
      {activeMode === 'flashcards' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400">
            <span>
              FLASHCARD {currentCardIndex + 1} OF {activeFlashcards.length} • {currentFlashcard.subject.toUpperCase()}
            </span>
            <span className="text-amber-400 font-bold">
              {Object.keys(masteredCards).length} Mastered (+25 XP each)
            </span>
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={handleFlipCard}
            className="w-full min-h-[300px] p-6 rounded-3xl bg-stone-900 border-2 border-amber-500/40 hover:border-amber-400 cursor-pointer transition-all duration-300 shadow-2xl flex flex-col justify-between relative group select-none"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                {isCardFlipped ? 'REVERSE: SOLUTION & MNEMONIC' : 'FRONT: QUESTION & TRAP'}
              </span>
              <span className="text-[10px] font-mono text-stone-500 flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" /> Click anywhere to flip
              </span>
            </div>

            <div className="py-6 flex-1 flex flex-col justify-center">
              {!isCardFlipped ? (
                /* Front Side */
                <div className="space-y-3 text-center">
                  <div className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                    Topic: {currentFlashcard.topic}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-100 whitespace-pre-wrap leading-relaxed font-sans">
                    {currentFlashcard.frontConcept}
                  </h3>
                  <div className="text-xs text-amber-400/80 italic mt-2">
                    Struggle to recall the exact answer before flipping...
                  </div>
                </div>
              ) : (
                /* Back Side */
                <div className="space-y-3 animate-fadeIn text-left">
                  <div className="p-3 rounded-2xl bg-stone-950 border border-emerald-900/40 text-xs sm:text-sm font-semibold text-emerald-300 whitespace-pre-wrap leading-relaxed font-sans">
                    {currentFlashcard.backAnswer}
                  </div>

                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                    <span className="font-bold text-amber-300 font-mono">Memory Trick: </span>
                    {currentFlashcard.memoryMnemonic}
                  </div>

                  {currentFlashcard.historyContext && (
                    <div className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800 text-[11px] text-stone-400 font-sans">
                      <span className="text-amber-400 font-semibold font-mono">History Context: </span>
                      {currentFlashcard.historyContext}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="text-center text-[10px] font-mono text-stone-500">
              VEERPATH CAVALRY MEMORIZATION ENGINE
            </div>
          </div>

          {/* Action Decision Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => handleNextCard(false)}
              className="flex-1 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 font-mono text-xs font-bold transition-all active:scale-98"
            >
              Needs Reinforcement (Repeat)
            </button>
            <button
              onClick={() => handleNextCard(true)}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-mono text-xs font-bold shadow-lg shadow-amber-600/20 transition-all active:scale-98 flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Mastered (+25 XP)</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= MODE 3: FILL-IN-THE-BLANKS DRILL ================= */}
      {activeMode === 'fill_blanks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400">
            <span>
              BLANK DRILL {currentBlankIndex + 1} OF {activeBlanks.length} • {currentBlank.subject.toUpperCase()}
            </span>
            <span className="text-amber-400 font-bold">Active Recall (+35 XP)</span>
          </div>

          <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30 font-bold">
                TOPIC: {currentBlank.topic}
              </span>
              <button
                onClick={() => setShowBlankHint((h) => !h)}
                className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showBlankHint ? 'Hide Tactical Hint' : 'Tactical Hint'}</span>
              </button>
            </div>

            {/* The Sentence with Blank Highlight */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-sm sm:text-base text-stone-100 font-medium leading-relaxed font-sans">
              {currentBlank.sentenceWithBlank.split('[BLANK]').map((part, pIdx, arr) => (
                <React.Fragment key={pIdx}>
                  <span>{part}</span>
                  {pIdx < arr.length - 1 && (
                    <span className="inline-block px-3 py-0.5 mx-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/50 font-mono font-bold">
                      [ ? ]
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {showBlankHint && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                <span className="font-bold text-amber-300 font-mono">Clue: </span>
                {currentBlank.hint}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleVerifyBlank} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  disabled={blankEvaluated}
                  value={userBlankInput}
                  onChange={(e) => setUserBlankInput(e.target.value)}
                  placeholder="Type the exact missing word or number..."
                  className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors font-mono"
                />
                {!blankEvaluated ? (
                  <button
                    type="submit"
                    disabled={!userBlankInput.trim()}
                    className="py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs sm:text-sm font-mono transition-all"
                  >
                    Verify
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextBlank}
                    className="py-3 px-5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs sm:text-sm font-mono flex items-center gap-1 transition-all"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>

            {/* Feedback Box */}
            {blankEvaluated && (
              <div
                className={`p-3.5 rounded-2xl border text-xs animate-fadeIn ${
                  isAnswerCorrect
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {isAnswerCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Bullseye! Exactly right.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>Target missed. Expected: "{currentBlank.blankAnswer}"</span>
                    </>
                  )}
                </div>
                <p className="text-stone-300 leading-relaxed font-sans mt-1">
                  <span className="font-bold text-amber-400 font-mono">Concept Rule: </span>
                  {currentBlank.conceptRule}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODE 4: TIMED SURVIVAL ASCENT QUIZ ================= */}
      {activeMode === 'ascent' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400">
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span>
                ASCENT STAGE {ascentIndex + 1} OF {SURVIVAL_ASCENT_QUESTIONS.length}
              </span>
            </span>
            <span className="text-amber-400 font-bold">Total Score: {ascentScore} pts</span>
          </div>

          {!ascentGameOver ? (
            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  LEVEL {currentAscentQ.level} • {currentAscentQ.level * 40} XP COMBO
                </span>
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono font-bold text-xs sm:text-sm ${
                    ascentTimer <= 5
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 animate-ping'
                      : 'bg-stone-950 text-amber-400 border border-stone-800'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>{ascentTimer}s Remaining</span>
                </div>
              </div>

              <h3 className="text-sm sm:text-base font-semibold text-stone-100 leading-relaxed font-sans">
                {currentAscentQ.questionText}
              </h3>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentAscentQ.options.map((opt, oIdx) => {
                  const letter = String.fromCharCode(65 + oIdx);
                  const isSelected = ascentSelectedOption === oIdx;
                  const isCorrect = oIdx === currentAscentQ.correctOptionIndex;

                  let style = 'bg-stone-950 border-stone-800 text-stone-300 hover:bg-stone-800';
                  if (ascentSubmitted) {
                    if (isCorrect) style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                    else if (isSelected && !isCorrect) style = 'bg-rose-500/20 border-rose-500 text-rose-300';
                    else style = 'bg-stone-950/40 border-stone-800/40 text-stone-600 opacity-60';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={ascentSubmitted}
                      onClick={() => handleSelectAscentOption(oIdx)}
                      className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${style}`}
                    >
                      <span className="w-6 h-6 rounded-md bg-stone-900 border border-stone-800 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                        {letter}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-relaxed pt-0.5">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Post-submit Next */}
              {ascentSubmitted && !ascentGameOver && (
                <div className="pt-2">
                  <button
                    onClick={handleNextAscentQuestion}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm font-mono flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
                  >
                    <span>Ascend to Next Difficulty Level</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Ascent Debrief Card */
            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl mx-auto text-amber-400">
                🏆
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-100 font-mono">
                  Ascent Drill Terminated!
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  You reached Stage {ascentIndex + 1} with a combat yield of {ascentScore} points.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 max-w-sm mx-auto text-xs text-stone-300">
                <span className="font-bold text-amber-400">Veer AI Analysis: </span>
                {ascentScore >= 100
                  ? 'High operational readiness! You handled escalating pressure effectively.'
                  : 'Time pressure affected tactical accuracy. Review formulas with Kavach flashcards.'}
              </div>

              <div className="flex justify-center gap-2 pt-2">
                <button
                  onClick={handleRestartAscent}
                  className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm font-mono shadow-md"
                >
                  Attempt Survival Ascent Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
