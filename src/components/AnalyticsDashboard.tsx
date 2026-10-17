import React from 'react';
import { UserStats, MistakeCategory } from '../types';
import { MILITARY_RANKS, getRankByXp, getNextRank } from '../data/ranksData';
import {
  Award,
  Zap,
  Target,
  Brain,
  Calculator,
  Eye,
  Clock,
  HelpCircle,
  ShieldCheck,
  TrendingUp,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface AnalyticsDashboardProps {
  stats: UserStats;
  onLaunchTopicDrill?: (topic: string) => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  stats,
  onLaunchTopicDrill
}) => {
  const currentRank = getRankByXp(stats.xp);
  const nextRankInfo = getNextRank(stats.xp);

  const mistakeIcons: Record<MistakeCategory, React.ReactNode> = {
    'Conceptual Mistake': <Brain className="w-4 h-4 text-purple-400" />,
    'Calculation Mistake': <Calculator className="w-4 h-4 text-amber-400" />,
    'Reading / Ambiguity Trap': <Eye className="w-4 h-4 text-blue-400" />,
    'Time-Pressure Rush': <Clock className="w-4 h-4 text-rose-400" />,
    'Guessing Behavior': <HelpCircle className="w-4 h-4 text-stone-400" />
  };

  const badges = [
    { name: 'Trig Commando', desc: 'Solved 10 Trigonometry identities with shortcut validation', icon: '📐', earned: true },
    { name: 'OIR-1 Radar', desc: 'Cleared Stage-1 screening series without error', icon: '🎯', earned: true },
    { name: 'Grammar Sniper', desc: 'Identified 15 Subject-Verb agreement traps', icon: '🛡️', earned: true },
    { name: 'Param Vir Mind', desc: 'Conquered a Level 4 Timed Challenge Drill', icon: '🎖️', earned: false },
    { name: 'Siachen Vigil', desc: 'Maintained 7-day unbroken study streak', icon: '🔥', earned: false }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 pb-20 p-3 sm:p-5">
      {/* Cadet Rank Promotion Dossier */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border border-stone-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl shadow-inner">
              {currentRank.insignia}
            </div>
            <div>
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                MILITARY CORPS COMMISSION
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-100 flex items-center gap-2">
                {currentRank.title}
                <span className="text-xs font-mono font-normal text-stone-400">Level {currentRank.rankLevel}</span>
              </h2>
              <p className="text-xs text-stone-400 italic">"{currentRank.motto}"</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-mono text-stone-500 uppercase">Combat Experience</div>
            <div className="text-lg sm:text-xl font-bold text-amber-400 font-mono">{stats.xp} XP</div>
          </div>
        </div>

        {/* Promotion Progress Bar */}
        {nextRankInfo.nextRank && (
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-xs font-mono text-stone-400">
              <span>Next Commission: {nextRankInfo.nextRank.title}</span>
              <span className="text-amber-400 font-bold">{nextRankInfo.xpNeeded} XP Needed</span>
            </div>
            <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
                style={{ width: `${nextRankInfo.progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Target Goals Benchmark Radar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-center">
          <div className="text-[10px] text-stone-400 uppercase font-mono">Accuracy Target</div>
          <div className="text-lg sm:text-xl font-bold text-emerald-400 font-mono mt-1">
            {stats.accuracy}%
          </div>
          <div className="text-[9px] text-stone-500 mt-0.5">Veer Standard: 99%+</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-center">
          <div className="text-[10px] text-stone-400 uppercase font-mono">Avg Tactical Speed</div>
          <div className="text-lg sm:text-xl font-bold text-blue-400 font-mono mt-1">
            {stats.speedAvgSec}s
          </div>
          <div className="text-[9px] text-stone-500 mt-0.5">UPSC Window: 45s</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-center">
          <div className="text-[10px] text-stone-400 uppercase font-mono">Questions Cleared</div>
          <div className="text-lg sm:text-xl font-bold text-amber-400 font-mono mt-1">
            {stats.questionsCorrect}/{stats.questionsAttempted}
          </div>
          <div className="text-[9px] text-stone-500 mt-0.5">100% Verified</div>
        </div>
      </div>

      {/* Mistake Pattern Diagnostics (The requested mistake system) */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-rose-400" />
            <h3 className="font-bold text-sm text-stone-100 font-mono uppercase tracking-wider">
              Mistake Pattern Diagnostic
            </h3>
          </div>
          <span className="text-[10px] font-mono text-stone-400">Psychometric Categorization</span>
        </div>

        <div className="space-y-2">
          {Object.entries(stats.mistakeDistribution).map(([cat, count]) => {
            const percentage = stats.questionsAttempted > 0 ? Math.round((count / Math.max(1, stats.questionsAttempted - stats.questionsCorrect)) * 100) : 0;
            return (
              <div key={cat} className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {mistakeIcons[cat as MistakeCategory]}
                  <span className="text-stone-300 font-medium">{cat}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-stone-400">{count} occurrences</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-amber-300 font-bold">
                    {percentage || 0}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topic Mastery Heatmap */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-stone-100 font-mono uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Subject Mastery Levels
          </h3>
          <span className="text-[10px] font-mono text-emerald-400">Adaptive Engine</span>
        </div>

        <div className="space-y-2.5">
          {Object.entries(stats.topicMastery).map(([topic, mastery]) => (
            <div
              key={topic}
              onClick={() => onLaunchTopicDrill?.(topic)}
              className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all space-y-1.5"
            >
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-200">{topic}</span>
                <span className="font-mono font-bold text-emerald-400">{mastery}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    mastery >= 80 ? 'bg-emerald-500' : mastery >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${mastery}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorations & Gallantry Badges */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
        <h3 className="font-bold text-sm text-stone-100 font-mono uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          Medals & Tactical Decorations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-center gap-3 ${
                b.earned
                  ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                  : 'bg-stone-950/40 border-stone-800 text-stone-600 opacity-60'
              }`}
            >
              <span className="text-2xl shrink-0">{b.icon}</span>
              <div>
                <div className="text-xs font-bold text-stone-200">{b.name}</div>
                <div className="text-[10px] text-stone-400 line-clamp-1">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
