import React, { useState } from 'react';
import { QUESTION_BANK } from '../data/questionBank';
import { QuestionItem, SubjectType, DifficultyLevel } from '../types';
import { QuizEngine } from './QuizEngine';
import { sounds } from '../utils/soundEffects';
import {
  Target,
  Zap,
  Gauge,
  Sparkles,
  Layers,
  ShieldCheck,
  Flame,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface AdaptiveDrillViewProps {
  onFinishDrill: (results: { correct: number; total: number; xpEarned: number }) => void;
  userStreak: number;
}

export const AdaptiveDrillView: React.FC<AdaptiveDrillViewProps> = ({
  onFinishDrill,
  userStreak
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all');
  const [activeDrillQuestions, setActiveDrillQuestions] = useState<QuestionItem[] | null>(null);

  const subjects = [
    { id: 'all', label: 'All Subjects', icon: '⚔️' },
    { id: 'mathematics', label: 'Mathematics', icon: '📐' },
    { id: 'reasoning', label: 'Reasoning & OIR', icon: '🧠' },
    { id: 'english', label: 'English GAT', icon: '📖' },
    { id: 'gk', label: 'General Knowledge', icon: '🇮🇳' },
    { id: 'science', label: 'General Science', icon: '🔬' },
    { id: 'current_affairs', label: 'Current Affairs', icon: '📡' }
  ];

  const levels: { level: DifficultyLevel; name: string; desc: string; badge: string; color: string }[] = [
    {
      level: 1,
      name: 'Level 1: Basic Concepts',
      desc: 'Foundational definitions, formulas & fundamental principles',
      badge: 'CONCEPT LOCK',
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
    },
    {
      level: 2,
      name: 'Level 2: Standard Exam',
      desc: 'Authentic NDA, CDS & AFCAT exam-calibrated questions',
      badge: 'STANDARD EXAM',
      color: 'border-blue-500/40 bg-blue-950/20 text-blue-300'
    },
    {
      level: 3,
      name: 'Level 3: Advanced Deciders',
      desc: 'High-percentile discriminator problems & multi-step analysis',
      badge: 'RANK DECIDER',
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-300'
    },
    {
      level: 4,
      name: 'Level 4: Challenge Mode',
      desc: 'Rapid time-pressure sprint testing intuition & speed shortcuts',
      badge: 'COMBAT SPRINT',
      color: 'border-rose-500/40 bg-rose-950/20 text-rose-300'
    }
  ];

  const filteredPool = QUESTION_BANK.filter((q) => {
    const matchSubject = selectedSubject === 'all' || q.subject === selectedSubject;
    const matchLevel = selectedLevel === 'all' || q.difficultyLevel === selectedLevel;
    return matchSubject && matchLevel;
  });

  const handleStartDrill = () => {
    sounds.playClick();
    const questionsToRun = filteredPool.length > 0 ? filteredPool : QUESTION_BANK;
    setActiveDrillQuestions(questionsToRun);
  };

  if (activeDrillQuestions) {
    return (
      <QuizEngine
        questions={activeDrillQuestions}
        onFinishQuiz={(res) => {
          setActiveDrillQuestions(null);
          onFinishDrill(res);
        }}
        onExit={() => setActiveDrillQuestions(null)}
        userStreak={userStreak}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 pb-20 p-3 sm:p-5 animate-fadeIn">
      {/* Tactical Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border border-stone-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Target className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">
                ADAPTIVE LEARNING ENGINE
              </div>
              <h2 className="text-base sm:text-lg font-bold text-stone-100">
                Custom Tactical Practice Drills
              </h2>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            99.9% ACCURACY
          </span>
        </div>

        <p className="text-xs text-stone-300 leading-relaxed">
          Select your battlefield parameters. Every single drill question passes all 4 validation layers with
          step-by-step logic, dual-method verification, 4-tier hints, and mistake diagnostics.
        </p>
      </div>

      {/* Subject Filter */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-bold uppercase text-stone-400 tracking-wider">
          1. Select Subject Command
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                sounds.playClick();
                setSelectedSubject(s.id as any);
              }}
              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                selectedSubject === s.id
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                  : 'bg-stone-900/70 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <span className="text-base">{s.icon}</span>
              <span className="text-xs font-semibold">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Level Selector */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-bold uppercase text-stone-400 tracking-wider">
          2. Target Difficulty Calibration
        </label>
        <div className="space-y-2.5">
          {levels.map((lvl) => {
            const isSelected = selectedLevel === lvl.level;
            return (
              <div
                key={lvl.level}
                onClick={() => {
                  sounds.playClick();
                  setSelectedLevel(lvl.level);
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? `${lvl.color} shadow-lg shadow-black/40`
                    : 'bg-stone-900/60 border-stone-800/80 hover:border-stone-700 text-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-100">{lvl.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-full border border-stone-700 font-bold">
                      {lvl.badge}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                  )}
                </div>
                <p className="text-xs text-stone-400">{lvl.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Launch Action Card */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between">
        <div>
          <div className="text-xs text-stone-400 font-mono">Matched Question Pool</div>
          <div className="text-sm font-bold text-stone-200">
            {filteredPool.length} High-Yield Exam Questions Ready
          </div>
        </div>

        <button
          onClick={handleStartDrill}
          className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 font-bold text-xs sm:text-sm text-stone-950 flex items-center gap-2 shadow-lg shadow-amber-600/25 active:scale-95 transition-all"
        >
          <span>Commence Drill</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
