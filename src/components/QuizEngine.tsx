import React, { useState, useEffect } from 'react';
import { QuestionItem } from '../types';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { SmartHintDrawer } from './SmartHintDrawer';
import { ValidationReportModal } from './ValidationReportModal';
import { MistakeAnalysisDrawer } from './MistakeAnalysisDrawer';
import { SubjectEngineViewer } from './SubjectEngineViewer';
import {
  Lightbulb,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  Flame,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookOpen
} from 'lucide-react';

interface QuizEngineProps {
  questions: QuestionItem[];
  onFinishQuiz: (results: { correct: number; total: number; xpEarned: number }) => void;
  onExit: () => void;
  onLaunchTargetedDrill?: (topic: string) => void;
  userStreak: number;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  questions,
  onFinishQuiz,
  onExit,
  onLaunchTargetedDrill,
  userStreak
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [hintsUnlockedCount, setHintsUnlockedCount] = useState(0);

  // Modals state
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [isValidationOpen, setIsValidationOpen] = useState(false);
  const [isMistakeOpen, setIsMistakeOpen] = useState(false);
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);

  const currentQuestion = questions[currentIndex] || questions[0];

  // Timer per question
  useEffect(() => {
    if (isAnswerSubmitted) return;
    const interval = setInterval(() => {
      setTimeElapsed(t => t + 1);
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

    const isCorrect = selectedOption === currentQuestion.correctOptionIndex;

    if (isCorrect) {
      sounds.playSuccess();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}

      // Calculate XP based on level and hints penalty
      const baseXP = currentQuestion.difficultyLevel * 25;
      const penalty = Math.max(0, hintsUnlockedCount - 1) * 5;
      const earned = Math.max(10, baseXP - penalty);

      setCorrectCount(c => c + 1);
      setTotalXpEarned(x => x + earned);
    } else {
      sounds.playError();
      // Auto open mistake diagnosis drawer if mistake mapping exists
      if (currentQuestion.mistakeMapping && currentQuestion.mistakeMapping[selectedOption]) {
        setTimeout(() => {
          setIsMistakeOpen(true);
        }, 300);
      }
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setTimeElapsed(0);
      setHintsUnlockedCount(0);
    } else {
      // Quiz finished
      onFinishQuiz({
        correct: correctCount + (selectedOption === currentQuestion.correctOptionIndex ? 1 : 0),
        total: questions.length,
        xpEarned: totalXpEarned
      });
    }
  };

  const getDifficultyBadge = (level: number) => {
    switch (level) {
      case 1:
        return { label: 'Level 1: Basic Concept', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 2:
        return { label: 'Level 2: Standard Exam', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      case 3:
        return { label: 'Level 3: Advanced Decider', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 4:
        return { label: 'Level 4: Challenge Mode', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' };
      default:
        return { label: `Level ${level}`, color: 'bg-stone-500/20 text-stone-300 border-stone-500/30' };
    }
  };

  const difficultyBadge = getDifficultyBadge(currentQuestion.difficultyLevel);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col min-h-[640px] p-3 sm:p-5">
      {/* Top Drill Navigation & Tactical HUD */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <button
            onClick={onExit}
            className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 text-xs font-semibold"
          >
            ← Exit Drill
          </button>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400">
            <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse fill-orange-500" />
            <span>{userStreak} Day Streak</span>
          </div>
        </div>

        {/* Progress Bar & Counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-stone-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{timeElapsed}s</span>
          </div>
          <div className="text-xs font-mono font-bold text-stone-300">
            {currentIndex + 1} / {questions.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-stone-900 rounded-full mt-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300"
          style={{ width: `${((currentIndex + (isAnswerSubmitted ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Header Badge & Validation Inspector */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${difficultyBadge.color}`}>
            {difficultyBadge.label}
          </span>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
            {currentQuestion.subject.toUpperCase()} • {currentQuestion.examTarget}
          </span>
        </div>

        {/* Validation Certificate Button */}
        <button
          onClick={() => setIsValidationOpen(true)}
          className="group flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/80 text-emerald-300 text-[11px] font-mono font-semibold transition-all shadow-sm"
          title="Inspect Layer 1-4 Verification Audit"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Layer 1-4 Audit</span>
          <span className="text-[10px] text-emerald-400 font-bold">99.9%</span>
        </button>
      </div>

      {/* Question Text Box */}
      <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-xl">
        <div className="text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-2">
          {currentQuestion.topic} • {currentQuestion.subtopic}
        </div>
        <h2 className="text-sm sm:text-base md:text-lg font-semibold text-stone-100 leading-relaxed whitespace-pre-wrap font-sans">
          {currentQuestion.questionText}
        </h2>
      </div>

      {/* 4-Tier Smart Hint Trigger Button */}
      {!isAnswerSubmitted && (
        <div className="flex justify-end mt-2">
          <button
            onClick={() => {
              setIsHintOpen(true);
              sounds.playClick();
            }}
            className="flex items-center gap-1.5 text-xs text-amber-400/90 hover:text-amber-300 font-semibold py-1 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all shadow-sm"
          >
            <Lightbulb className="w-3.5 h-3.5 animate-pulse" />
            <span>Need a Hint? (Smart 4-Tier System)</span>
          </button>
        </div>
      )}

      {/* Options Grid */}
      <div className="mt-4 space-y-2.5 flex-1">
        {currentQuestion.options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQuestion.correctOptionIndex;

          let btnStyle = 'bg-stone-900/70 border-stone-800 text-stone-200 hover:border-amber-500/50 hover:bg-stone-800/80';
          let letterStyle = 'bg-stone-800 text-stone-400 border-stone-700';

          if (isSelected && !isAnswerSubmitted) {
            btnStyle = 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-md shadow-amber-500/10';
            letterStyle = 'bg-amber-500 text-stone-950 font-bold border-amber-400';
          } else if (isAnswerSubmitted) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/10';
              letterStyle = 'bg-emerald-500 text-stone-950 font-bold border-emerald-400';
            } else if (isSelected && !isCorrect) {
              btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 shadow-lg shadow-rose-500/10';
              letterStyle = 'bg-rose-500 text-stone-950 font-bold border-rose-400';
            } else {
              btnStyle = 'bg-stone-950/40 border-stone-800/40 text-stone-500 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswerSubmitted}
              onClick={() => handleSelectOption(idx)}
              className={`w-full p-3 sm:p-4 rounded-xl border text-left flex items-start gap-3 transition-all duration-200 active:scale-[0.99] ${btnStyle}`}
            >
              <span
                className={`w-7 h-7 rounded-lg border flex items-center justify-center font-mono text-xs shrink-0 transition-colors ${letterStyle}`}
              >
                {letter}
              </span>
              <span className="text-xs sm:text-sm font-medium leading-relaxed pt-0.5 flex-1">
                {opt}
              </span>
              {isAnswerSubmitted && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
              )}
              {isAnswerSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Post-Answer Result & Action Drawer */}
      {isAnswerSubmitted ? (
        <div className="mt-5 p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedOption === currentQuestion.correctOptionIndex ? (
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Cadet Bravo! Bullseye Hit!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <XCircle className="w-5 h-5" />
                  <span>Tactical Error Identified</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* If wrong, allow re-inspecting mistake */}
              {selectedOption !== currentQuestion.correctOptionIndex && (
                <button
                  onClick={() => setIsMistakeOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-semibold transition-colors"
                >
                  Diagnose Mistake
                </button>
              )}
              <button
                onClick={() => setIsSolutionOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Full Solving Engine</span>
              </button>
            </div>
          </div>

          {/* Quick summary takeaway */}
          <div className="text-xs text-stone-300 leading-relaxed bg-stone-950/70 p-3 rounded-xl border border-stone-800/80">
            <span className="font-bold text-amber-400">Officer Takeaway: </span>
            {currentQuestion.engineBreakdown.examTip ||
              currentQuestion.engineBreakdown.shortcutMethod ||
              currentQuestion.engineBreakdown.explanation ||
              currentQuestion.engineBreakdown.examNote ||
              'Review the step-by-step logic to ensure absolute conceptual lock!'}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextQuestion}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 active:scale-[0.99] transition-all"
          >
            <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'Complete Drill & Debrief'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Submit Answer Button */
        <div className="mt-5">
          <button
            disabled={selectedOption === null}
            onClick={handleSubmitAnswer}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              selectedOption !== null
                ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-lg shadow-amber-500/20 cursor-pointer active:scale-[0.99]'
                : 'bg-stone-800 text-stone-500 cursor-not-allowed'
            }`}
          >
            <span>Lock In Selection</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <SmartHintDrawer
        hints={currentQuestion.smartHints}
        isOpen={isHintOpen}
        onClose={() => setIsHintOpen(false)}
        onHintUnlocked={(lvl) => setHintsUnlockedCount(lvl)}
      />

      <ValidationReportModal
        report={currentQuestion.validationReport}
        questionId={currentQuestion.id}
        isOpen={isValidationOpen}
        onClose={() => setIsValidationOpen(false)}
      />

      {selectedOption !== null && currentQuestion.mistakeMapping && (
        <MistakeAnalysisDrawer
          analysis={currentQuestion.mistakeMapping[selectedOption]}
          selectedOptionText={currentQuestion.options[selectedOption]}
          correctOptionText={currentQuestion.options[currentQuestion.correctOptionIndex]}
          timeTakenSeconds={timeElapsed}
          isOpen={isMistakeOpen}
          onClose={() => setIsMistakeOpen(false)}
          onStartTargetedDrill={(topic) => {
            setIsMistakeOpen(false);
            onLaunchTargetedDrill?.(topic);
          }}
        />
      )}

      <SubjectEngineViewer
        question={currentQuestion}
        isOpen={isSolutionOpen}
        onClose={() => setIsSolutionOpen(false)}
      />
    </div>
  );
};
