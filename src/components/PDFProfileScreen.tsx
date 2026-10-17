import React from 'react';
import { UserProfileData } from './OnboardingModal';
import { UserStats } from '../types';
import { sounds } from '../utils/soundEffects';
import {
  Flame,
  Target,
  Zap,
  TrendingUp,
  LogOut,
  X,
  Shield,
  Trophy,
  Crown,
  Globe,
  Clock,
  Star,
  Award,
  Sun,
  Moon
} from 'lucide-react';

interface PDFProfileScreenProps {
  profile: UserProfileData;
  stats: UserStats;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onClose: () => void;
  onEditProfile: () => void;
}

export const PDFProfileScreen: React.FC<PDFProfileScreenProps> = ({
  profile,
  stats,
  isDarkMode,
  onToggleTheme,
  onClose,
  onEditProfile
}) => {
  const initial = profile.initials?.[0] || 'K';

  const badges = [
    { id: 'b1', name: 'First Steps', icon: <Target className="w-5 h-5 text-rose-500" />, earned: true },
    { id: 'b2', name: '3-Day Warrior', icon: <Flame className="w-5 h-5 text-orange-500" />, earned: true },
    { id: 'b3', name: 'Weekly Champion', icon: <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />, earned: false },
    { id: 'b4', name: 'Monthly Legend', icon: <Crown className="w-5 h-5 text-amber-500" />, earned: false },
    { id: 'b5', name: 'Quiz Master', icon: <Trophy className="w-5 h-5 text-amber-500" />, earned: false },
    { id: 'b6', name: 'Math Expert', icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-500 fill-none stroke-current" strokeWidth="2"><path d="M3 21h18M3 21l7-14M3 21l14-7"/><path d="M10 7l4 7"/></svg>, earned: false },
    { id: 'b7', name: 'GK Guru', icon: <Globe className="w-5 h-5 text-blue-400" />, earned: false },
    { id: 'b8', name: 'Speed Demon', icon: <Clock className="w-5 h-5 text-slate-400" />, earned: false },
    { id: 'b9', name: 'Rising Star', icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" />, earned: false },
    { id: 'b10', name: 'Elite Cadet', icon: <Award className="w-5 h-5 text-rose-400" />, earned: false }
  ];

  return (
    <div className="w-full bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pb-28 font-sans touch-pan-y animate-fadeIn transition-colors duration-200">
      {/* Top Dark Slate User Card */}
      <div className="p-5">
        <div className="w-full bg-gradient-to-br from-[#1d293d] via-[#1a2333] to-[#111827] text-white rounded-[32px] p-5 shadow-xl shadow-slate-900/10 space-y-5 border border-slate-800/60">
          {/* Top user row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Profile Avatar Box with Initial */}
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-extrabold text-xl flex items-center justify-center shadow-inner">
                {initial}
              </div>
              <div>
                <h2 className="text-base font-bold text-white leading-tight">
                  {profile.name}
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              <button
                onClick={onEditProfile}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                title="Edit Cadet Profile"
              >
                <LogOut className="w-4 h-4 rotate-180" />
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                title="Back to Home"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rank & XP Progress Row */}
          <div className="space-y-2 pt-1 border-t border-slate-700/60">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Level {stats.rankLevel} Cadet</span>
              </span>
              <span className="text-slate-400 font-mono">
                {stats.xp} / 200 XP
              </span>
            </div>

            {/* XP progress bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (stats.xp / 200) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* APPEARANCE / MODE TOGGLE CARD */}
      <div className="px-5 mb-5">
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                APPEARANCE MODE
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {isDarkMode ? '🌙 Dark Mode Active' : '☀️ Light Mode Active'}
              </div>
            </div>

            {/* Quick Segmented Switch */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
              <button
                onClick={() => {
                  if (isDarkMode) {
                    sounds.playClick();
                    onToggleTheme();
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  !isDarkMode
                    ? 'bg-white text-amber-600 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>

              <button
                onClick={() => {
                  if (!isDarkMode) {
                    sounds.playClick();
                    onToggleTheme();
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-900 text-amber-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="px-5 grid grid-cols-2 gap-3">
        {/* Streak */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-1">
          <div className="text-orange-500">
            <Flame className="w-5 h-5 fill-orange-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {stats.streakDays} days
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Streak
          </div>
        </div>

        {/* Accuracy */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-1">
          <div className="text-emerald-500">
            <Target className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {stats.accuracy}%
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Accuracy
          </div>
        </div>

        {/* Total XP */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-1">
          <div className="text-amber-500">
            <Zap className="w-5 h-5 fill-amber-500" />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {stats.xp}
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Total XP
          </div>
        </div>

        {/* Questions */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-1">
          <div className="text-blue-500">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            {stats.questionsAttempted}
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Questions
          </div>
        </div>
      </div>

      {/* RECENT PERFORMANCE */}
      <div className="px-5 mt-6 space-y-3">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          RECENT PERFORMANCE
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-3">
          {/* Simple Clean Bar Chart */}
          <div className="h-44 flex items-end justify-between px-4 pb-2 pt-2 border-b border-slate-100 dark:border-slate-800 relative">
            {/* Axis marks */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-slate-300 dark:text-slate-600 font-mono">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            {/* 3 Bars */}
            <div className="flex-1 flex items-end justify-around pl-6 h-full">
              {/* Q1 */}
              <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                <div
                  className="w-16 sm:w-20 rounded-xl bg-amber-500 transition-all duration-500 shadow-sm"
                  style={{ height: '40%' }}
                />
                <span className="text-xs text-slate-400 font-medium">Q1</span>
              </div>

              {/* Q2 */}
              <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                <div
                  className="w-16 sm:w-20 rounded-xl bg-amber-500 transition-all duration-500 shadow-sm"
                  style={{ height: '40%' }}
                />
                <span className="text-xs text-slate-400 font-medium">Q2</span>
              </div>

              {/* Q3 */}
              <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                <div
                  className="w-16 sm:w-20 rounded-xl bg-amber-500 transition-all duration-500 shadow-sm"
                  style={{ height: '40%' }}
                />
                <span className="text-xs text-slate-400 font-medium">Q3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BADGES */}
      <div className="px-5 mt-6 space-y-3">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          BADGES
        </div>

        <div className="grid grid-cols-5 gap-2 text-center">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-center space-y-1.5 border transition-all ${
                b.earned
                  ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-xs'
                  : 'bg-slate-50/60 dark:bg-slate-900/50 border-slate-100/60 dark:border-slate-800/50 opacity-40'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                {b.icon}
              </div>
              <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
