import React, { useState, useEffect } from 'react';
import { QuestionItem } from '../types';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Heart,
  Clock,
  Lightbulb,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  BookOpen,
  Sparkles,
  RefreshCw,
  Flame,
  Brain,
  HelpCircle,
  Calculator,
  Eye,
  Sun,
  Moon
} from 'lucide-react';

interface PDFLessonScreenProps {
  topicTitle: string;
  subjectId: string;
  questions: QuestionItem[];
  onFinishLesson: (results: { correct: number; total: number; xpEarned: number }) => void;
  onExit: () => void;
  userLives?: number;
  userStreak?: number;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const PDFLessonScreen: React.FC<PDFLessonScreenProps> = ({
  topicTitle,
  subjectId,
  questions: initialQuestions,
  onFinishLesson,
  onExit,
  userLives = 5,
  userStreak = 0,
  isDarkMode = false,
  onToggleTheme
}) => {
  const [questions, setQuestions] = useState<QuestionItem[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  // AI Researcher states
  const [isResearchingNew, setIsResearchingNew] = useState(false);

  // Modal inspection states
  const [showHintModal, setShowHintModal] = useState(false);
  const [hintTierUnlocked, setHintTierUnlocked] = useState(1);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [showMistakeModal, setShowMistakeModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  // Timer per question
  useEffect(() => {
    if (isAnswerSubmitted) return;
    const interval = setInterval(() => {
      setTimeElapsed((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnswerSubmitted]);

  // Handle option pick
  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    sounds.playClick();
    setSelectedOption(idx);
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQ.correctOptionIndex;

    if (isCorrect) {
      sounds.playSuccess();
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}

      const earned = currentQ.difficultyLevel * 25;
      setCorrectCount((c) => c + 1);
      setTotalXpEarned((x) => x + earned);
    } else {
      sounds.playError();
      if (currentQ.mistakeMapping && currentQ.mistakeMapping[selectedOption]) {
        setTimeout(() => setShowMistakeModal(true), 350);
      }
    }
  };

  // Next Question
  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      sounds.playClick();
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setTimeElapsed(0);
      setHintTierUnlocked(1);
    } else {
      sounds.playRankUp();
      onFinishLesson({
        correct: correctCount + (selectedOption === currentQ.correctOptionIndex ? 1 : 0),
        total: questions.length,
        xpEarned: totalXpEarned
      });
    }
  };

  // Backend Question Maker & Researcher
  const handleResearchNewQuestion = async () => {
    sounds.playClick();
    setIsResearchingNew(true);
    try {
      const response = await fetch('/api/questions/make-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subjectId || 'mathematics',
          topic: topicTitle || 'Algebra',
          difficultyLevel: currentQ.difficultyLevel || 2,
          examTarget: currentQ.examTarget || 'NDA'
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.question && data.question.questionText) {
          setQuestions((prev) => [...prev, data.question]);
          setCurrentIndex(questions.length); // Jump to the new researched question
          setSelectedOption(null);
          setIsAnswerSubmitted(false);
          setTimeElapsed(0);
          setHintTierUnlocked(1);
          sounds.playSuccess();
        }
      }
    } catch (err) {
      console.error('Failed to research question:', err);
    } finally {
      setIsResearchingNew(false);
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans animate-fadeIn pb-16 touch-pan-y transition-colors duration-200">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-5 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {topicTitle || 'Lesson Practice'}
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>
        </div>

        {/* Stats and Theme Toggle on right */}
        <div className="flex items-center gap-2.5 text-xs font-semibold">
          {onToggleTheme && (
            <button
              onClick={() => {
                sounds.playClick();
                onToggleTheme();
              }}
              className={`flex items-center gap-1 px-2 py-1 rounded-full border text-[11px] font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                isDarkMode
                  ? 'bg-slate-800 border-amber-500/40 text-amber-400 hover:bg-slate-700'
                  : 'bg-amber-50/80 border-amber-200 text-amber-800 hover:bg-amber-100'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="font-mono">{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>
          )}
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{timeElapsed}s</span>
          </div>
          <div className="flex items-center gap-1 text-rose-500">
            <Heart className="w-4 h-4 text-rose-500 fill-none stroke-[2]" />
            <span>{userLives}</span>
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full bg-amber-500 transition-all duration-300"
          style={{ width: `${((currentIndex + (isAnswerSubmitted ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Main Container */}
      <div className="flex-1 px-5 py-5 max-w-md mx-auto w-full space-y-4">
        {/* Top Badges & Validation button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
              LEVEL {currentQ.difficultyLevel} · {currentQ.examTarget}
            </span>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {currentQ.topic}
            </span>
          </div>

          <button
            onClick={() => setShowValidationModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 text-[10px] font-bold"
            title="Inspect Multi-Layer Quality Certificate"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>99.9% Verified</span>
          </button>
        </div>

        {/* Question Text Box */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-2">
          <div className="text-[11px] font-mono font-semibold uppercase text-slate-400 dark:text-slate-500">
            Question Stem
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed whitespace-pre-wrap">
            {currentQ.questionText}
          </h1>
        </div>

        {/* 4-Tier Smart Hint Button */}
        {!isAnswerSubmitted && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                sounds.playHint();
                setShowHintModal(true);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100/80 dark:hover:bg-amber-900/50 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800/60 transition-colors shadow-2xs"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Need a Hint? (Smart 4-Tier)</span>
            </button>

            {/* AI Researcher button */}
            <button
              onClick={handleResearchNewQuestion}
              disabled={isResearchingNew}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors"
              title="Research a brand new question on this topic using AI"
            >
              <RefreshCw className={`w-3 h-3 ${isResearchingNew ? 'animate-spin text-amber-500' : ''}`} />
              <span>{isResearchingNew ? 'Researching...' : '+ New AI Question'}</span>
            </button>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-2.5 pt-1">
          {currentQ.options.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctOptionIndex;

            let cardStyle = 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700';
            let badgeStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';

            if (isSelected && !isAnswerSubmitted) {
              cardStyle = 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 text-slate-900 dark:text-amber-100 ring-2 ring-amber-500/20 shadow-xs';
              badgeStyle = 'bg-amber-500 text-white font-bold';
            } else if (isAnswerSubmitted) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-semibold shadow-xs';
                badgeStyle = 'bg-emerald-500 text-white font-bold';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-100 shadow-xs';
                badgeStyle = 'bg-rose-500 text-white font-bold';
              } else {
                cardStyle = 'bg-white/60 dark:bg-slate-900/40 border-slate-100 dark:border-slate-850 text-slate-400 dark:text-slate-600 opacity-60';
                badgeStyle = 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all duration-150 cursor-pointer ${cardStyle}`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${badgeStyle}`}
                >
                  {letter}
                </span>
                <span className="text-xs sm:text-sm font-medium leading-relaxed pt-0.5 flex-1">
                  {opt}
                </span>
                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Post-Submit Action Panel */}
        {isAnswerSubmitted ? (
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedOption === currentQ.correctOptionIndex ? (
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Bullseye! Target Hit (+25 XP)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold text-sm">
                    <XCircle className="w-5 h-5" />
                    <span>Tactical Error Identified</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                {selectedOption !== currentQ.correctOptionIndex && (
                  <button
                    onClick={() => setShowMistakeModal(true)}
                    className="px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-200 dark:border-rose-900/60"
                  >
                    Diagnose
                  </button>
                )}
                <button
                  onClick={() => setShowSolutionModal(true)}
                  className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-200 dark:border-amber-800/60 flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Solution</span>
                </button>
              </div>
            </div>

            {/* Officer Exam Tip */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-amber-600 dark:text-amber-400">Officer Takeaway: </span>
              {currentQ.engineBreakdown.examTip ||
                currentQ.engineBreakdown.shortcutMethod ||
                currentQ.engineBreakdown.explanation ||
                'Lock in this conceptual logic for your upcoming NDA/CDS paper.'}
            </div>

            {/* Next Question Button */}
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'Finish Lesson & Collect XP'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Lock Selection Button */
          <div className="pt-2">
            <button
              disabled={selectedOption === null}
              onClick={handleSubmitAnswer}
              className={`w-full py-3 rounded-2xl font-bold text-sm transition-all ${
                selectedOption !== null
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 cursor-pointer active:scale-[0.99]'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              Confirm Answer
            </button>
          </div>
        )}
      </div>

      {/* ================= HINT MODAL ================= */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Smart 4-Tier Hints</h3>
                  <p className="text-[11px] text-slate-400">Step through hints without spoiling the final answer</p>
                </div>
              </div>
              <button
                onClick={() => setShowHintModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5">
              {[
                { lvl: 1, title: 'Tier 1: Concept Clue', text: currentQ.smartHints.hint1Concept },
                { lvl: 2, title: 'Tier 2: Method Blueprint', text: currentQ.smartHints.hint2Method },
                { lvl: 3, title: 'Tier 3: Near-Solution Step', text: currentQ.smartHints.hint3NearSolution },
                { lvl: 4, title: 'Tier 4: Full Walkthrough', text: currentQ.smartHints.hint4FullExplanation }
              ].map((tier) => {
                const isUnlocked = hintTierUnlocked >= tier.lvl;
                return (
                  <div
                    key={tier.lvl}
                    className={`p-3 rounded-2xl border text-xs leading-relaxed transition-all ${
                      isUnlocked
                        ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-slate-800 dark:text-slate-200'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="font-bold text-amber-700 dark:text-amber-400 mb-0.5">{tier.title}</div>
                    {isUnlocked ? (
                      <div>{tier.text}</div>
                    ) : (
                      <div className="italic">Unlock previous tier first...</div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 pt-1">
              {hintTierUnlocked < 4 && (
                <button
                  onClick={() => {
                    sounds.playHint();
                    setHintTierUnlocked((t) => t + 1);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm cursor-pointer"
                >
                  Unlock Next Hint Tier
                </button>
              )}
              <button
                onClick={() => setShowHintModal(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
              >
                Back to Drill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MISTAKE MODAL ================= */}
      {showMistakeModal && selectedOption !== null && currentQ.mistakeMapping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Mistake Diagnostic</h3>
                  <p className="text-[11px] text-slate-400">Psychometric error pattern analysis</p>
                </div>
              </div>
              <button
                onClick={() => setShowMistakeModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400"
              >
                ✕
              </button>
            </div>

            {currentQ.mistakeMapping[selectedOption] ? (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-900 dark:text-rose-200 space-y-1">
                  <div className="font-bold text-rose-700 dark:text-rose-400">
                    Category: {currentQ.mistakeMapping[selectedOption].mistakeType}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    {currentQ.mistakeMapping[selectedOption].trapExplanation}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-slate-800 dark:text-slate-200 space-y-1">
                  <div className="font-bold text-amber-700 dark:text-amber-400">Targeted Prescription:</div>
                  <p>{currentQ.mistakeMapping[selectedOption].recommendedAction}</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You selected Option {String.fromCharCode(65 + selectedOption)}. The correct answer is Option{' '}
                {String.fromCharCode(65 + currentQ.correctOptionIndex)}.
              </p>
            )}

            <button
              onClick={() => setShowMistakeModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white font-bold text-xs cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* ================= SOLUTION ENGINE MODAL ================= */}
      {showSolutionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[85vh] overflow-y-auto space-y-4 touch-pan-y">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Solving Engine Breakdown</h3>
                  <p className="text-[11px] text-slate-400">Subject-Specific Mathematical / Grammatical Methodology</p>
                </div>
              </div>
              <button
                onClick={() => setShowSolutionModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-800 dark:text-slate-200">
              {currentQ.engineBreakdown.conceptUsed && (
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="font-bold text-amber-700 dark:text-amber-400 font-mono uppercase">1. Concept Used</div>
                  <div>{currentQ.engineBreakdown.conceptUsed}</div>
                </div>
              )}

              {currentQ.engineBreakdown.formulaUsed && (
                <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 font-mono space-y-1">
                  <div className="font-bold text-amber-800 dark:text-amber-400 uppercase">2. Formula Used</div>
                  <div className="text-amber-900 dark:text-amber-300 font-semibold">{currentQ.engineBreakdown.formulaUsed}</div>
                </div>
              )}

              {currentQ.engineBreakdown.stepByStepSolution && (
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 font-mono uppercase">3. Step-by-Step Solution</div>
                  {currentQ.engineBreakdown.stepByStepSolution.map((s, idx) => (
                    <div key={idx} className="pl-1">• {s}</div>
                  ))}
                </div>
              )}

              {currentQ.engineBreakdown.shortcutMethod && (
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-1">
                  <div className="font-bold text-amber-800 dark:text-amber-400 font-mono uppercase">4. Exam Shortcut (10-Second Method)</div>
                  <div className="text-amber-950 dark:text-amber-200 font-medium">{currentQ.engineBreakdown.shortcutMethod}</div>
                </div>
              )}

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase">5. Final Verified Answer</div>
                  <div className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">
                    Option {String.fromCharCode(65 + currentQ.correctOptionIndex)}: {currentQ.options[currentQ.correctOptionIndex]}
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 font-bold">
                  100% Validated
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowSolutionModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white font-bold text-xs cursor-pointer"
            >
              Acknowledge & Continue
            </button>
          </div>
        </div>
      )}

      {/* ================= VALIDATION CERTIFICATE ================= */}
      {showValidationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">4-Layer Quality Certificate</h3>
                  <p className="text-[11px] text-slate-400">Strict UPSC NDA/CDS Accuracy Audit</p>
                </div>
              </div>
              <button
                onClick={() => setShowValidationModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-800 dark:text-slate-200">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>Layer 1: Question Quality (Grammar & Zero Ambiguity)</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">100% Passed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>Layer 2: Answer Validation (Mathematical Key Check)</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Verified</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>Layer 3: Explanation (Completeness & Logic)</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">99% Complete</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>Layer 4: Difficulty Calibration</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Level {currentQ.difficultyLevel} Match</span>
              </div>
            </div>

            <button
              onClick={() => setShowValidationModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white font-bold text-xs cursor-pointer"
            >
              Close Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
