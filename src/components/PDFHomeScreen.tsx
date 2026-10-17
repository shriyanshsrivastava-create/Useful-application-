import React from 'react';
import { UserProfileData } from './OnboardingModal';
import { UserStats } from '../types';
import { sounds } from '../utils/soundEffects';
import {
  Flame,
  Zap,
  Heart,
  Trophy,
  Target,
  BookOpen,
  Brain,
  FileText,
  ChevronRight,
  Globe,
  Newspaper,
  Sun,
  Moon
} from 'lucide-react';

interface PDFHomeScreenProps {
  profile: UserProfileData;
  stats: UserStats;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavigateTab: (tab: 'home' | 'learn' | 'veer_ai' | 'updates' | 'profile') => void;
  onSelectSubject: (subjectKey: string) => void;
  onStartQuiz: () => void;
  onStartMock: () => void;
}

export const PDFHomeScreen: React.FC<PDFHomeScreenProps> = ({
  profile,
  stats,
  isDarkMode,
  onToggleTheme,
  onNavigateTab,
  onSelectSubject,
  onStartQuiz,
  onStartMock
}) => {
  const firstName = profile.name.trim().split(' ')[0] || 'Kalpana';

  const subjects = [
    {
      id: 'mathematics',
      title: 'Mathematics',
      topicsText: '6 topics · 62 lessons',
      colorClass: 'bg-blue-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M3 21l7-14M3 21l14-7" />
          <path d="M10 7l4 7" />
        </svg>
      ),
      progress: 0
    },
    {
      id: 'english',
      title: 'English',
      topicsText: '5 topics · 53 lessons',
      colorClass: 'bg-emerald-500',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      ),
      progress: 0
    },
    {
      id: 'gk',
      title: 'General Knowledge',
      topicsText: '6 topics · 62 lessons',
      colorClass: 'bg-amber-500',
      icon: <Globe className="w-6 h-6 text-white" />,
      progress: 0
    },
    {
      id: 'reasoning',
      title: 'Reasoning & Aptitude',
      topicsText: '4 topics · 40 lessons',
      colorClass: 'bg-purple-600',
      icon: <Brain className="w-6 h-6 text-white" />,
      progress: 0
    },
    {
      id: 'current_affairs',
      title: 'Current Affairs',
      topicsText: '4 topics · 30 lessons',
      colorClass: 'bg-rose-500',
      icon: <Newspaper className="w-6 h-6 text-white" />,
      progress: 0
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pb-28 font-sans touch-pan-y animate-fadeIn transition-colors duration-200">
      {/* Top Header with Prominent Theme Switcher */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
        {/* Left Logo */}
        <div className="flex items-center gap-2.5">
          {/* Golden Shield Hexagon */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 p-0.5 shadow-md shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-500 rounded-[14px] flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white" strokeWidth="2">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              VeerPath
            </h1>
            <p className="text-[11px] text-slate-400 font-medium leading-none">
              Defence Prep Platform
            </p>
          </div>
        </div>

        {/* Right: Unmistakable Theme Toggle Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onToggleTheme();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer shadow-xs active:scale-95 ${
            isDarkMode
              ? 'bg-slate-900 border-amber-500/40 text-amber-400 hover:bg-slate-800'
              : 'bg-amber-50/80 border-amber-200 text-amber-800 hover:bg-amber-100'
          }`}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle Dark / Light Mode"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-xs font-bold font-mono tracking-tight">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-slate-700" />
              <span className="text-xs font-bold font-mono tracking-tight">Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Cadet Greeting Row */}
      <div className="px-5 pt-3 pb-1 flex items-center justify-between">
        <div>
          <div className="text-base font-bold text-slate-800 dark:text-slate-100 leading-tight">
            Welcome, <span className="text-amber-500">{firstName}</span> 🫡
          </div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">
            Let's train today for your defence mission!
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 font-bold">
            {profile.targetExam}
          </span>
        </div>
      </div>

      {/* Stats Row matching Page 1 */}
      <div className="px-5 py-3 grid grid-cols-4 gap-2">
        {/* Streak */}
        <div className="flex items-center gap-2">
          <div className="text-orange-500">
            <Flame className="w-5 h-5 fill-orange-500" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
              {stats.streakDays}
            </div>
            <div className="text-[11px] text-slate-400 font-medium leading-tight">
              Streak
            </div>
          </div>
        </div>

        {/* XP */}
        <div className="flex items-center gap-2">
          <div className="text-amber-500">
            <Zap className="w-5 h-5 fill-amber-500" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
              {stats.xp}
            </div>
            <div className="text-[11px] text-slate-400 font-medium leading-tight">
              XP
            </div>
          </div>
        </div>

        {/* Lives */}
        <div className="flex items-center gap-2">
          <div className="text-rose-500">
            <Heart className="w-5 h-5 text-rose-500 fill-none stroke-[2]" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
              {stats.hearts}
            </div>
            <div className="text-[11px] text-slate-400 font-medium leading-tight">
              Lives
            </div>
          </div>
        </div>

        {/* Level */}
        <div className="flex items-center gap-2">
          <div className="text-amber-500">
            <Trophy className="w-5 h-5 text-amber-500 fill-none stroke-[2]" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
              {stats.rankLevel}
            </div>
            <div className="text-[11px] text-slate-400 font-medium leading-tight">
              Level
            </div>
          </div>
        </div>
      </div>

      {/* Daily Mission Card matching Page 1 */}
      <div className="px-5 my-3">
        <div className="w-full bg-gradient-to-r from-[#172036] via-[#1a233d] to-[#12192b] text-white rounded-3xl p-5 shadow-xl shadow-slate-900/10 border border-slate-800/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-400">
                <Target className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Daily Mission</div>
                <div className="text-sm font-bold text-white tracking-tight">Earn 100 XP Today</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-base font-bold text-amber-400">
                {stats.xp}
              </div>
              <div className="text-[11px] text-slate-400">/ 100 XP</div>
            </div>
          </div>

          {/* Glowing Progress Track */}
          <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${Math.min(100, (stats.xp / 100) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS matching Page 1 */}
      <div className="px-5 mt-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          QUICK ACTIONS
        </div>
        <div className="grid grid-cols-4 gap-3 text-center">
          {/* 1. Continue Learning */}
          <button
            onClick={() => {
              sounds.playClick();
              onNavigateTab('learn');
            }}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 group-active:scale-95 transition-all">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 mt-2 leading-tight">
              Continue<br />Learning
            </span>
          </button>

          {/* 2. Quick Quiz */}
          <button
            onClick={() => {
              sounds.playClick();
              onStartQuiz();
            }}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 group-active:scale-95 transition-all">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 mt-2 leading-tight">
              Quick<br />Quiz
            </span>
          </button>

          {/* 3. Mock Test */}
          <button
            onClick={() => {
              sounds.playClick();
              onStartMock();
            }}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 group-active:scale-95 transition-all">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 mt-2 leading-tight">
              Mock<br />Test
            </span>
          </button>

          {/* 4. Ask Veer AI */}
          <button
            onClick={() => {
              sounds.playClick();
              onNavigateTab('veer_ai');
            }}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-105 group-active:scale-95 transition-all">
              <Zap className="w-7 h-7 text-white fill-white" />
            </div>
            <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 mt-2 leading-tight">
              Ask<br />Veer AI
            </span>
          </button>
        </div>
      </div>

      {/* SUBJECTS matching Page 1 & 2 */}
      <div className="px-5 mt-7 space-y-3">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          SUBJECTS
        </div>

        <div className="space-y-3">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              onClick={() => {
                sounds.playClick();
                onSelectSubject(sub.id);
              }}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-md cursor-pointer transition-all duration-200 active:scale-[0.99]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl ${sub.colorClass} flex items-center justify-center shadow-sm shrink-0`}>
                    {sub.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {sub.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {sub.topicsText}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>

              {/* Progress Line */}
              <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-300 dark:bg-slate-700 rounded-full"
                  style={{ width: `${sub.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
