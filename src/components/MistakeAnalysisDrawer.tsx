import React from 'react';
import { OptionMistakeAnalysis } from '../types';
import { AlertOctagon, Brain, Calculator, Eye, Clock, HelpCircle, ArrowRight, BookOpen } from 'lucide-react';

interface MistakeAnalysisDrawerProps {
  analysis?: OptionMistakeAnalysis;
  selectedOptionText: string;
  correctOptionText: string;
  timeTakenSeconds: number;
  isOpen: boolean;
  onClose: () => void;
  onStartTargetedDrill: (topic: string) => void;
}

export const MistakeAnalysisDrawer: React.FC<MistakeAnalysisDrawerProps> = ({
  analysis,
  selectedOptionText,
  correctOptionText,
  timeTakenSeconds,
  isOpen,
  onClose,
  onStartTargetedDrill
}) => {
  if (!isOpen || !analysis) return null;

  const getMistakeIcon = (type: string) => {
    switch (type) {
      case 'Conceptual Mistake':
        return <Brain className="w-5 h-5 text-purple-400" />;
      case 'Calculation Mistake':
        return <Calculator className="w-5 h-5 text-amber-400" />;
      case 'Reading / Ambiguity Trap':
        return <Eye className="w-5 h-5 text-blue-400" />;
      case 'Time-Pressure Rush':
        return <Clock className="w-5 h-5 text-rose-400" />;
      default:
        return <HelpCircle className="w-5 h-5 text-stone-400" />;
    }
  };

  const getMistakeBadgeColor = (type: string) => {
    switch (type) {
      case 'Conceptual Mistake':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Calculation Mistake':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Reading / Ambiguity Trap':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Time-Pressure Rush':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-stone-500/20 text-stone-300 border-stone-500/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-t-3xl sm:rounded-2xl p-5 max-h-[85vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-100 flex items-center gap-2">
                VeerPath Mistake Diagnosis
              </h3>
              <p className="text-xs text-stone-400">Targeted psychometric error analysis & prescription</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 flex items-center justify-center text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Diagnosis Card */}
        <div className="my-4 p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getMistakeIcon(analysis.mistakeType)}
              <span className="text-xs font-bold text-stone-200">Identified Mistake Category</span>
            </div>
            <span
              className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${getMistakeBadgeColor(
                analysis.mistakeType
              )}`}
            >
              {analysis.mistakeType}
            </span>
          </div>

          <div className="text-xs text-stone-400">
            Response Time: <span className="text-stone-200 font-mono font-bold">{timeTakenSeconds}s</span>{' '}
            {timeTakenSeconds < 8 ? '(Rushed under 8 seconds!)' : ''}
          </div>

          {/* Trap breakdown */}
          <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-900/40 text-xs text-rose-200 space-y-1">
            <div className="font-bold text-rose-300 flex items-center gap-1.5">
              <span>Deceptive Distractor Anatomy:</span>
            </div>
            <p className="leading-relaxed text-stone-300">{analysis.trapExplanation}</p>
          </div>

          {/* Contrast */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800">
              <div className="text-[10px] text-stone-500 uppercase font-mono">Your Selection</div>
              <div className="font-semibold text-rose-400 truncate mt-0.5">{selectedOptionText}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-900 border border-emerald-900/50">
              <div className="text-[10px] text-stone-500 uppercase font-mono">Exam Verified Answer</div>
              <div className="font-semibold text-emerald-400 truncate mt-0.5">{correctOptionText}</div>
            </div>
          </div>
        </div>

        {/* Tactical Recommendation */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-stone-300 space-y-1.5">
          <div className="font-bold text-amber-300 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Targeted Revision Prescription</span>
          </div>
          <p className="leading-relaxed">{analysis.recommendedAction}</p>
          <div className="pt-1 text-[11px] font-mono text-amber-400/90 font-medium">
            Prescribed Drill Topic: <span className="underline">{analysis.targetedDrillTopic}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex gap-2">
          <button
            onClick={() => {
              onClose();
              onStartTargetedDrill(analysis.targetedDrillTopic);
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 font-bold text-xs sm:text-sm text-stone-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 active:scale-[0.98] transition-all"
          >
            <span>Launch Targeted Drill</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs sm:text-sm transition-colors"
          >
            Review Solution
          </button>
        </div>
      </div>
    </div>
  );
};
