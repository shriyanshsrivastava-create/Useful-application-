import React, { useState } from 'react';
import { SmartHints } from '../types';
import { Lightbulb, ChevronRight, Lock, Unlock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface SmartHintDrawerProps {
  hints: SmartHints;
  onHintUnlocked?: (level: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const SmartHintDrawer: React.FC<SmartHintDrawerProps> = ({
  hints,
  onHintUnlocked,
  isOpen,
  onClose
}) => {
  const [unlockedTier, setUnlockedTier] = useState<number>(1); // Tier 1 unlocked by default

  if (!isOpen) return null;

  const handleUnlockNext = () => {
    if (unlockedTier < 4) {
      const nextTier = unlockedTier + 1;
      setUnlockedTier(nextTier);
      sounds.playHint();
      onHintUnlocked?.(nextTier);
    }
  };

  const hintTiers = [
    {
      level: 1,
      title: 'Tier 1: Concept Hint',
      desc: 'Foundational concept & trigger identification',
      content: hints.hint1Concept,
      badge: 'CONCEPT',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
    },
    {
      level: 2,
      title: 'Tier 2: Method Hint',
      desc: 'Recommended solving pathway & elimination tactic',
      content: hints.hint2Method,
      badge: 'METHOD',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40'
    },
    {
      level: 3,
      title: 'Tier 3: Near-Solution Hint',
      desc: 'Critical intermediate simplification step',
      content: hints.hint3NearSolution,
      badge: 'SIMPLIFIED',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40'
    },
    {
      level: 4,
      title: 'Tier 4: Full Step-by-Step Walkthrough',
      desc: 'Complete mathematical & logical breakdown',
      content: hints.hint4FullExplanation,
      badge: 'FULL SOLUTION',
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-t-3xl sm:rounded-2xl p-5 max-h-[85vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lightbulb className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-100 flex items-center gap-2">
                Smart 4-Tier Hint System
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Pedagogy First
                </span>
              </h3>
              <p className="text-xs text-stone-400">Struggle conceptually before revealing the final answer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 flex items-center justify-center text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Warning Badge */}
        <div className="my-3 p-2.5 rounded-xl bg-stone-950/70 border border-amber-500/20 flex items-center gap-2 text-xs text-amber-300/90">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Cadet discipline rule: Each unlocked tier reduces XP reward by 10% to encourage self-reliance!</span>
        </div>

        {/* Hint Tiers List */}
        <div className="space-y-3 mt-4">
          {hintTiers.map((tier) => {
            const isUnlocked = unlockedTier >= tier.level;
            return (
              <div
                key={tier.level}
                className={`p-3.5 rounded-xl border transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-stone-950/80 border-stone-700 shadow-md'
                    : 'bg-stone-950/30 border-stone-800/60 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md border ${tier.badgeColor}`}
                    >
                      {tier.badge}
                    </span>
                    <span className="text-xs font-semibold text-stone-200">{tier.title}</span>
                  </div>
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                      <Unlock className="w-3.5 h-3.5" /> Unlocked
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-stone-500">
                      <Lock className="w-3.5 h-3.5" /> Locked
                    </span>
                  )}
                </div>

                {isUnlocked ? (
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pl-1 pt-1 font-sans">
                    {tier.content}
                  </p>
                ) : (
                  <p className="text-xs text-stone-500 italic pl-1 pt-1">
                    {tier.desc} — Unlock Tier {tier.level} to inspect.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-2">
          {unlockedTier < 4 ? (
            <button
              onClick={handleUnlockNext}
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 font-bold text-xs sm:text-sm text-stone-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 active:scale-[0.98] transition-all"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Unlock Tier {unlockedTier + 1} Hint</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex-1 py-2 px-3 rounded-xl bg-stone-800/80 text-stone-400 text-xs text-center flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              All 4 Pedagogy Tiers Unlocked
            </div>
          )}
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs sm:text-sm transition-colors"
          >
            Back to Drill
          </button>
        </div>
      </div>
    </div>
  );
};
