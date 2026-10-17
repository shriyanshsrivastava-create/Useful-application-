import React from 'react';
import { UserStats, ExamTarget } from '../types';
import { getRankByXp } from '../data/ranksData';
import { Flame, Shield, Volume2, VolumeX, Smartphone, Monitor, FileText } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface TopBarProps {
  stats: UserStats;
  isSoundMuted: boolean;
  onToggleSound: () => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  onSelectExam: (exam: ExamTarget) => void;
  onLaunchMockExam: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  stats,
  isSoundMuted,
  onToggleSound,
  isMobileFrame,
  onToggleMobileFrame,
  onSelectExam,
  onLaunchMockExam
}) => {
  const currentRank = getRankByXp(stats.xp);

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-950/95 backdrop-blur-md border-b border-stone-800/90 px-3 sm:px-6 py-2.5 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Callout with Modern Military Heritage Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-extrabold text-sm shadow-md shadow-amber-600/30 font-mono">
            VP
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-wider text-stone-100 font-mono">
                VEERPATH
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase">
                {stats.selectedExam}
              </span>
            </div>
            <div className="text-[10px] text-stone-400 font-mono hidden sm:block">
              Valour & Wisdom • Modern Military Heritage
            </div>
          </div>
        </div>

        {/* Center / Right Tactical Gamification Stats */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Full Mock Test Quick Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onLaunchMockExam();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold shadow-sm transition-all"
            title="Launch Full NDA / CDS Timed Mock Simulation"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Mock Exam</span>
          </button>

          {/* Daily Streak */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs font-bold shadow-sm"
            title="Daily Active Study Streak"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span className="font-mono text-orange-400">{stats.streakDays}</span>
          </div>

          {/* XP & Current Rank */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs font-bold shadow-sm"
            title={`Combat Experience: ${stats.xp} XP • Rank: ${currentRank.title}`}
          >
            <span className="text-sm">{currentRank.insignia}</span>
            <span className="font-mono text-amber-400">{stats.xp}</span>
            <span className="text-[10px] text-stone-400 hidden md:inline font-mono">XP</span>
          </div>

          {/* Armour Shields (Lives) */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-stone-900 border border-stone-800 text-xs font-bold shadow-sm"
            title="Armour Shields (Drill Lives)"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/30" />
            <span className="font-mono text-emerald-400">{stats.hearts}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleSound();
            }}
            className="w-8 h-8 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 flex items-center justify-center transition-colors"
            title={isSoundMuted ? 'Unmute Tactical Audio' : 'Mute Tactical Audio'}
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Smartphone Frame Toggle (Desktop utility) */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleMobileFrame();
            }}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-200 text-xs transition-colors"
            title="Toggle Smartphone / Tablet Frame"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-mono">Expanded</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-mono">Cadet Mobile</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
