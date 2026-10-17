import React, { useState, useEffect } from 'react';
import { QUESTION_BANK } from '../data/questionBank';
import { QuestionItem } from '../types';
import { SubjectEngineViewer } from './SubjectEngineViewer';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  BarChart3,
  Bookmark,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface MockTestSimulatorProps {
  onExit: () => void;
  onTestComplete?: (score: number, accuracy: number) => void;
}

export const MockTestSimulator: React.FC<MockTestSimulatorProps> = ({
  onExit,
  onTestComplete
}) => {
  const [questions] = useState<QuestionItem[]>(QUESTION_BANK);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minute speed simulation
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSolutionQuestion, setSelectedSolutionQuestion] = useState<QuestionItem | null>(null);

  // Timer
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    sounds.playClick();
    setUserAnswers(prev => ({
      ...prev,
      [currentIdx]: optIdx
    }));
  };

  const toggleMarkForReview = () => {
    sounds.playClick();
    setMarkedForReview(prev => ({
      ...prev,
      [currentIdx]: !prev[currentIdx]
    }));
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    sounds.playRankUp();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  // Calculate scores (NDA marking: +2.5 for correct, -0.83 for incorrect)
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  questions.forEach((q, idx) => {
    const ans = userAnswers[idx];
    if (ans === undefined) {
      unattemptedCount++;
    } else if (ans === q.correctOptionIndex) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const totalScore = Math.max(0, Number((correctCount * 2.5 - wrongCount * 0.83).toFixed(2)));
  const accuracy = correctCount + wrongCount > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0;
  const cutoffPassed = totalScore >= 7.5; // Benchmark cutoff

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIdx];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 pb-20 p-3 sm:p-5">
      {/* Top Test Header Bar */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold"
          >
            ← Leave Exam
          </button>
          <div>
            <h2 className="font-bold text-sm sm:text-base text-stone-100 font-mono">
              NDA & CDS COMBAT SIMULATION
            </h2>
            <p className="text-[11px] text-stone-400 font-mono">Marking Scheme: +2.5 Marks • -0.83 Negative Penalty</p>
          </div>
        </div>

        {/* Live Timer */}
        {!isSubmitted ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-sm sm:text-base">
            <Clock className="w-4 h-4 animate-spin" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        ) : (
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            TEST DEBRIEF READY
          </span>
        )}
      </div>

      {!isSubmitted ? (
        /* Active Test Question Canvas */
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Main Question Area */}
          <div className="md:col-span-3 space-y-4">
            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-amber-400">
                  Question {currentIdx + 1} of {questions.length} • {currentQ.subject.toUpperCase()}
                </span>
                <button
                  onClick={toggleMarkForReview}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 transition-colors ${
                    markedForReview[currentIdx]
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      : 'bg-stone-800 text-stone-400 border-stone-700'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{markedForReview[currentIdx] ? 'Marked for Review' : 'Mark Review'}</span>
                </button>
              </div>

              <p className="text-sm sm:text-base text-stone-100 font-semibold leading-relaxed whitespace-pre-wrap font-sans">
                {currentQ.questionText}
              </p>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, oIdx) => {
                  const letter = String.fromCharCode(65 + oIdx);
                  const isSelected = userAnswers[currentIdx] === oIdx;

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-amber-200'
                          : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-md border flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 border-amber-400'
                            : 'bg-stone-800 text-stone-400 border-stone-700'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-relaxed pt-0.5">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Nav inside Test */}
            <div className="flex items-center justify-between">
              <button
                disabled={currentIdx === 0}
                onClick={() => {
                  sounds.playClick();
                  setCurrentIdx(i => Math.max(0, i - 1));
                }}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-300 text-xs font-semibold"
              >
                Previous
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  if (currentIdx + 1 < questions.length) {
                    setCurrentIdx(i => i + 1);
                  } else {
                    handleSubmitTest();
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md"
              >
                {currentIdx + 1 < questions.length ? 'Save & Next' : 'Final Submit'}
              </button>
            </div>
          </div>

          {/* Question Grid Palette Sidebar */}
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
            <h3 className="font-mono text-xs font-bold text-stone-300 uppercase tracking-wider">
              Question Palette
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((_, idx) => {
                const isCurrent = idx === currentIdx;
                const isAnswered = userAnswers[idx] !== undefined;
                const isMarked = markedForReview[idx];

                let cellBg = 'bg-stone-950 border-stone-800 text-stone-500';
                if (isCurrent) cellBg = 'border-amber-500 text-amber-300 font-bold';
                else if (isMarked) cellBg = 'bg-purple-900/40 border-purple-500 text-purple-300';
                else if (isAnswered) cellBg = 'bg-emerald-900/40 border-emerald-500 text-emerald-300';

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      sounds.playClick();
                      setCurrentIdx(idx);
                    }}
                    className={`h-9 rounded-lg border flex items-center justify-center font-mono text-xs font-semibold transition-all ${cellBg}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-stone-800 space-y-1.5 text-[10px] text-stone-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-500"></span>
                <span>Answered ({Object.keys(userAnswers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-purple-500/40 border border-purple-500"></span>
                <span>Marked Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-stone-950 border border-stone-800"></span>
                <span>Unattempted ({questions.length - Object.keys(userAnswers).length})</span>
              </div>
            </div>

            <button
              onClick={handleSubmitTest}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-wider font-mono shadow-md"
            >
              Submit Exam Now
            </button>
          </div>
        </div>
      ) : (
        /* Comprehensive Post-Exam Debrief Report */
        <div className="space-y-5 animate-fadeIn">
          {/* Score & All-India Rank Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border border-stone-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  OFFICIAL PERFORMANCE REPORT
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-100 mt-1">
                  {cutoffPassed ? 'Operational Cut-Off Cleared! 🎖️' : 'Cut-Off Missed — Remedial Required'}
                </h2>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-stone-400">Total NDA Marks</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                  {totalScore}
                </div>
              </div>
            </div>

            {/* 4 Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
                <div className="text-[10px] text-stone-400 font-mono">Accuracy</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">{accuracy}%</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
                <div className="text-[10px] text-stone-400 font-mono">Correct (+2.5)</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">{correctCount}</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
                <div className="text-[10px] text-stone-400 font-mono">Wrong (-0.83)</div>
                <div className="text-lg font-bold text-rose-400 font-mono">{wrongCount}</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
                <div className="text-[10px] text-stone-400 font-mono">Unattempted</div>
                <div className="text-lg font-bold text-stone-400 font-mono">{unattemptedCount}</div>
              </div>
            </div>
          </div>

          {/* Question-by-Question Solution Inspector */}
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-stone-100 flex items-center justify-between">
              <span>Detailed Question Solutions & Methodology</span>
              <span className="text-xs text-stone-400 font-normal">Click any question to view its Subject Engine</span>
            </h3>

            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userAns = userAnswers[idx];
                const isCorrect = userAns === q.correctOptionIndex;
                const isUnattempted = userAns === undefined;

                return (
                  <div
                    key={q.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedSolutionQuestion(q);
                    }}
                    className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                          isCorrect
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : isUnattempted
                            ? 'bg-stone-800 text-stone-400 border border-stone-700'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-stone-200 line-clamp-1">{q.questionText}</div>
                        <div className="text-[10px] font-mono text-stone-500 flex items-center gap-2 mt-0.5">
                          <span>{q.subject.toUpperCase()}</span>
                          <span>• Level {q.difficultyLevel}</span>
                          <span>• {isCorrect ? '+2.5 Marks' : isUnattempted ? '0 Marks' : '-0.83 Penalty'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> Inspect
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onExit}
              className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md"
            >
              Return to Command HQ
            </button>
          </div>
        </div>
      )}

      {/* Modal for Solution Engine Breakdown */}
      {selectedSolutionQuestion && (
        <SubjectEngineViewer
          question={selectedSolutionQuestion}
          isOpen={true}
          onClose={() => setSelectedSolutionQuestion(null)}
        />
      )}
    </div>
  );
};
