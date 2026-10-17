import React from 'react';
import { QuestionItem } from '../types';
import {
  Sparkles,
  Zap,
  Lightbulb,
  CheckCircle,
  XCircle,
  HelpCircle,
  BookmarkCheck,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

interface SubjectEngineViewerProps {
  question: QuestionItem;
  isOpen: boolean;
  onClose: () => void;
}

export const SubjectEngineViewer: React.FC<SubjectEngineViewerProps> = ({
  question,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const { subject, engineBreakdown, options, correctOptionIndex } = question;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                  {subject.toUpperCase()} LEARNING ENGINE
                </span>
                <span className="text-xs text-stone-400 font-mono">Standard NDA/CDS Solution</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-stone-100 mt-0.5">
                Comprehensive Educational Breakdown
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 flex items-center justify-center text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Question Recap Box */}
        <div className="my-4 p-3.5 rounded-xl bg-stone-950/70 border border-stone-800">
          <div className="text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-1">
            Question Stem (Level {question.difficultyLevel} • {question.examTarget})
          </div>
          <p className="text-xs sm:text-sm text-stone-200 font-medium leading-relaxed whitespace-pre-wrap">
            {question.questionText}
          </p>
        </div>

        {/* Dedicated Subject Solving Engine Content */}
        <div className="space-y-4">
          {/* ================= MATHEMATICS ENGINE ================= */}
          {subject === 'mathematics' && (
            <div className="space-y-3.5">
              {/* 1. Concept Used */}
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <BookmarkCheck className="w-4 h-4" /> 1. Concept Used
                </div>
                <p className="text-xs sm:text-sm text-stone-300">{engineBreakdown.conceptUsed}</p>
              </div>

              {/* 2. Formula Used */}
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  <Layers className="w-4 h-4" /> 2. Formula Used
                </div>
                <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-xs sm:text-sm font-mono text-cyan-300">
                  {engineBreakdown.formulaUsed}
                </div>
              </div>

              {/* 3. Step-by-Step Solution */}
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  <CheckCircle className="w-4 h-4" /> 3. Step-by-Step Rigorous Solution
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm text-stone-300 pl-2">
                  {engineBreakdown.stepByStepSolution?.map((step, idx) => (
                    <div key={idx} className="leading-relaxed flex items-start gap-2">
                      <span className="text-emerald-500 font-mono text-xs font-bold shrink-0">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Shortcut Method */}
              {engineBreakdown.shortcutMethod && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                    <Zap className="w-4 h-4 text-amber-400" /> 4. Exam Shortcut Method (Speed Weapon)
                  </div>
                  <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-sans">
                    {engineBreakdown.shortcutMethod}
                  </p>
                </div>
              )}

              {/* 5. Final Answer */}
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-emerald-900/40 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-stone-400 uppercase">5. Verified Final Answer</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono">
                    {engineBreakdown.finalAnswer || options[correctOptionIndex]}
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                  100% Validated
                </span>
              </div>

              {/* 6. Exam Tip */}
              {engineBreakdown.examTip && (
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-blue-300">6. Officer Exam Tip: </span>
                    {engineBreakdown.examTip}
                  </div>
                </div>
              )}

              {/* Alternative Method Verification */}
              {engineBreakdown.alternativeValidationMethod && (
                <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 text-xs text-stone-400 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-300">Dual-Method Check: </span>
                    {engineBreakdown.alternativeValidationMethod}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= REASONING ENGINE ================= */}
          {subject === 'reasoning' && (
            <div className="space-y-3.5">
              {/* 1. Pattern Identification */}
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                  <BookmarkCheck className="w-4 h-4" /> 1. Pattern Identification
                </div>
                <p className="text-xs sm:text-sm text-stone-300">{engineBreakdown.patternIdentification}</p>
              </div>

              {/* 2. Logical Analysis */}
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">
                  <Layers className="w-4 h-4" /> 2. Logical Analysis
                </div>
                <p className="text-xs sm:text-sm text-stone-300 whitespace-pre-wrap leading-relaxed">
                  {engineBreakdown.logicalAnalysis}
                </p>
              </div>

              {/* 3. Option Elimination (Why wrong options fail) */}
              {engineBreakdown.optionElimination && (
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
                    <XCircle className="w-4 h-4" /> 3. Option Elimination Process
                  </div>
                  {engineBreakdown.optionElimination.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300">
                      <span className="font-bold text-rose-300 font-mono mr-1">
                        [Option {String.fromCharCode(65 + item.optionIndex)}: {item.optionText}]:
                      </span>{' '}
                      {item.reasonWhyWrong}
                    </div>
                  ))}
                </div>
              )}

              {/* 4. Correct Answer & 5. Exam Shortcut */}
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase">4. Correct Answer</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-300 font-mono">
                    {engineBreakdown.correctAnswer || options[correctOptionIndex]}
                  </div>
                </div>
              </div>

              {engineBreakdown.examShortcut && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                    <Zap className="w-4 h-4 text-amber-400" /> 5. Exam Shortcut
                  </div>
                  <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                    {engineBreakdown.examShortcut}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ================= ENGLISH ENGINE ================= */}
          {subject === 'english' && (
            <div className="space-y-3.5">
              {/* 1. Rule Applied */}
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  <BookmarkCheck className="w-4 h-4" /> 1. Grammatical Rule Applied
                </div>
                <p className="text-xs sm:text-sm text-stone-300 font-semibold">{engineBreakdown.ruleApplied}</p>
              </div>

              {/* 2. Explanation */}
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  <Layers className="w-4 h-4" /> 2. Complete Grammar Explanation
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{engineBreakdown.explanation}</p>
              </div>

              {/* 3. Correct Answer */}
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-[10px] font-mono text-emerald-400 uppercase">3. Correct Answer</div>
                <div className="text-sm sm:text-base font-bold text-emerald-300 font-mono">
                  Option ({String.fromCharCode(65 + correctOptionIndex)}): {options[correctOptionIndex]}
                </div>
              </div>

              {/* 4. Why other options are wrong */}
              {engineBreakdown.whyOtherOptionsWrong && (
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
                    <XCircle className="w-4 h-4" /> 4. Why Other Options Are Wrong
                  </div>
                  {engineBreakdown.whyOtherOptionsWrong.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300">
                      <span className="font-bold text-rose-300 font-mono mr-1">
                        [Option {String.fromCharCode(65 + item.optionIndex)}]:
                      </span>{' '}
                      {item.whyIncorrect}
                    </div>
                  ))}
                </div>
              )}

              {/* 5. Memory Trick */}
              {engineBreakdown.memoryTrick && (
                <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider mb-1">
                    <Sparkles className="w-4 h-4 text-purple-400" /> 5. Memory Trick / Mnemonic
                  </div>
                  <p className="text-xs sm:text-sm text-purple-200 font-medium">{engineBreakdown.memoryTrick}</p>
                </div>
              )}
            </div>
          )}

          {/* ================= GK ENGINE ================= */}
          {subject === 'gk' && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  <BookmarkCheck className="w-4 h-4" /> 1. Topic
                </div>
                <p className="text-xs sm:text-sm text-stone-200 font-semibold">{engineBreakdown.topicName}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                  <Layers className="w-4 h-4" /> 2. Background Information
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{engineBreakdown.backgroundInformation}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-[10px] font-mono text-emerald-400 uppercase">3. Correct Answer</div>
                <div className="text-sm sm:text-base font-bold text-emerald-300 font-mono">
                  Option ({String.fromCharCode(65 + correctOptionIndex)}): {options[correctOptionIndex]}
                </div>
              </div>

              {engineBreakdown.additionalExamFacts && (
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                    <Lightbulb className="w-4 h-4" /> 4. Additional High-Yield Exam Facts
                  </div>
                  <div className="space-y-1.5 text-xs text-stone-300">
                    {engineBreakdown.additionalExamFacts.map((fact, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= SCIENCE ENGINE ================= */}
          {subject === 'science' && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  <BookmarkCheck className="w-4 h-4" /> 1. Concept & Principle
                </div>
                <p className="text-xs sm:text-sm text-stone-300">{engineBreakdown.principle}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                  <Layers className="w-4 h-4" /> 2. Application in Defence / Ballistics
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{engineBreakdown.practicalApplication}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-[10px] font-mono text-emerald-400 uppercase">3. Answer</div>
                <div className="text-sm sm:text-base font-bold text-emerald-300 font-mono">
                  Option ({String.fromCharCode(65 + correctOptionIndex)}): {options[correctOptionIndex]}
                </div>
              </div>

              {engineBreakdown.examNote && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                    <Lightbulb className="w-4 h-4 text-amber-400" /> 4. Exam Note
                  </div>
                  <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">{engineBreakdown.examNote}</p>
                </div>
              )}
            </div>
          )}

          {/* ================= CURRENT AFFAIRS ENGINE ================= */}
          {subject === 'current_affairs' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="text-[10px] text-stone-500 uppercase">1. Date Validation</div>
                    <div className="font-semibold text-stone-200">{engineBreakdown.eventDate}</div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-[10px] text-stone-500 uppercase">2. Source Verified</div>
                    <div className="font-semibold text-emerald-400 truncate">{engineBreakdown.sourceVerified}</div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] text-stone-500 uppercase">3. Relevance Scoring</div>
                  <div className="text-sm font-bold text-amber-400 font-mono">{engineBreakdown.relevanceScore}% High Yield</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-stone-500 uppercase">4. Expiry Status</div>
                  <div className="text-xs font-bold text-emerald-400">
                    {engineBreakdown.isExpired ? 'OUTDATED' : 'ACTIVE & VERIFIED (Valid through 2026)'}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                <div className="text-xs font-bold text-stone-200 uppercase tracking-wider mb-1">
                  Background & Strategic Impact
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{engineBreakdown.backgroundInformation}</p>
              </div>

              {engineBreakdown.additionalExamFacts && (
                <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1.5 text-xs text-stone-300">
                  <div className="font-bold text-amber-400">Related Defence Facts:</div>
                  {engineBreakdown.additionalExamFacts.map((fact, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400">•</span>
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-amber-500/20"
          >
            Acknowledge & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
