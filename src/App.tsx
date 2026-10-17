/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { OnboardingModal, UserProfileData } from './components/OnboardingModal';
import { PDFHomeScreen } from './components/PDFHomeScreen';
import { PDFLearnScreen } from './components/PDFLearnScreen';
import { PDFVeerAIScreen } from './components/PDFVeerAIScreen';
import { PDFUpdatesScreen } from './components/PDFUpdatesScreen';
import { PDFProfileScreen } from './components/PDFProfileScreen';
import { PDFLessonScreen } from './components/PDFLessonScreen';
import { PDFBottomNav, PDFNavTab } from './components/PDFBottomNav';
import { MockTestSimulator } from './components/MockTestSimulator';
import { QUESTION_BANK } from './data/questionBank';
import { UserStats, QuestionItem } from './types';
import { sounds } from './utils/soundEffects';

export default function App() {
  // Dark Mode / Light Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('veerpath_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('veerpath_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('veerpath_theme', 'light');
      }
    } catch {}
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Onboarding Profile State
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    try {
      return localStorage.getItem('veerpath_onboarded') === 'true';
    } catch {
      return false;
    }
  });

  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);

  const [profile, setProfile] = useState<UserProfileData>(() => {
    try {
      const saved = localStorage.getItem('veerpath_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: 'Kalpana Srivastava',
      email: 'kalpana914lko@gmail.com',
      targetExam: 'NDA',
      educationStage: 'Class 12th Aspirant',
      dailyGoalMins: 30,
      initials: 'KS',
      joinedDate: 'Oct 2026'
    };
  });

  // Active Tab: 'home' | 'learn' | 'veer_ai' | 'updates' | 'profile'
  const [activeTab, setActiveTab] = useState<PDFNavTab>('home');

  // Active Lesson Practice Session matching Default UI
  const [activeLessonSession, setActiveLessonSession] = useState<{
    topicTitle: string;
    subjectId: string;
    questions: QuestionItem[];
  } | null>(null);

  const [isMockActive, setIsMockActive] = useState<boolean>(false);

  // User Stats
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem('veerpath_stats');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: 'Kalpana Srivastava',
      xp: 0,
      streakDays: 0,
      streakActiveToday: false,
      streakShields: 2,
      rankLevel: 1,
      hearts: 5,
      maxHearts: 5,
      tokens: 100,
      selectedExam: 'NDA',
      accuracy: 0,
      speedAvgSec: 0,
      questionsAttempted: 0,
      questionsCorrect: 0,
      topicMastery: {
        Algebra: 0,
        Grammar: 0,
        'Indian History': 0,
        'Verbal Reasoning': 0,
        'National Affairs': 0
      },
      mistakeDistribution: {
        'Conceptual Mistake': 0,
        'Calculation Mistake': 0,
        'Reading / Ambiguity Trap': 0,
        'Time-Pressure Rush': 0,
        'Guessing Behavior': 0
      },
      unlockedNodeIds: ['math-001', 'eng-001', 'gk-001']
    };
  });

  // Handle Onboarding Completion
  const handleOnboardingComplete = (newProfile: UserProfileData) => {
    setProfile(newProfile);
    setHasCompletedOnboarding(true);
    setIsEditingProfile(false);
    try {
      localStorage.setItem('veerpath_onboarded', 'true');
      localStorage.setItem('veerpath_profile', JSON.stringify(newProfile));
    } catch {}
  };

  // Launch Lesson / Quiz matching Default UI
  const handleStartQuickQuiz = () => {
    sounds.playClick();
    setActiveLessonSession({
      topicTitle: 'Quick Combat Quiz',
      subjectId: 'mathematics',
      questions: QUESTION_BANK
    });
  };

  const handleSelectSubject = (subjectKey: string) => {
    sounds.playClick();
    const matching = QUESTION_BANK.filter((q) => q.subject === subjectKey);
    const prettySubjectName = subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1);
    setActiveLessonSession({
      topicTitle: `${prettySubjectName} Foundation`,
      subjectId: subjectKey,
      questions: matching.length > 0 ? matching : QUESTION_BANK
    });
  };

  const handleSelectTopic = (subjectId: string, topicName: string) => {
    sounds.playClick();
    const matching = QUESTION_BANK.filter(
      (q) => q.subject === subjectId || q.topic.toLowerCase().includes(topicName.toLowerCase())
    );
    setActiveLessonSession({
      topicTitle: topicName,
      subjectId: subjectId,
      questions: matching.length > 0 ? matching : QUESTION_BANK
    });
  };

  // Finish a quiz / lesson session
  const handleFinishLesson = (results: { correct: number; total: number; xpEarned: number }) => {
    setStats((prev) => {
      const newAttempted = prev.questionsAttempted + results.total;
      const newCorrect = prev.questionsCorrect + results.correct;
      const newAccuracy = newAttempted > 0 ? Math.round((newCorrect / newAttempted) * 100) : 0;
      const newXp = prev.xp + results.xpEarned;
      const newLevel = Math.max(1, Math.floor(newXp / 100) + 1);

      const updated = {
        ...prev,
        xp: newXp,
        rankLevel: newLevel,
        questionsAttempted: newAttempted,
        questionsCorrect: newCorrect,
        accuracy: newAccuracy,
        streakDays: prev.streakDays === 0 ? 1 : prev.streakDays,
        streakActiveToday: true
      };

      try {
        localStorage.setItem('veerpath_stats', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setActiveLessonSession(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex justify-center text-slate-900 dark:text-slate-100 antialiased selection:bg-amber-500/20 transition-colors duration-200">
      {/* Mobile-First Screen Frame Container */}
      <div className="w-full max-w-md bg-white dark:bg-slate-950 min-h-dvh shadow-2xl relative flex flex-col border-x border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
        {/* Onboarding Profile Modal (First time before using app) */}
        {(!hasCompletedOnboarding || isEditingProfile) && (
          <OnboardingModal
            isOpen={true}
            onComplete={handleOnboardingComplete}
            initialData={profile}
            isEditing={isEditingProfile}
            onClose={() => setIsEditingProfile(false)}
          />
        )}

        {/* Main Content Area with natural smooth touch scrolling */}
        <main className="flex-1 w-full touch-pan-y">
          {activeLessonSession ? (
            /* Unified Lesson UI matching the default light/dark theme */
            <PDFLessonScreen
              topicTitle={activeLessonSession.topicTitle}
              subjectId={activeLessonSession.subjectId}
              questions={activeLessonSession.questions}
              onFinishLesson={handleFinishLesson}
              onExit={() => setActiveLessonSession(null)}
              userLives={stats.hearts}
              userStreak={stats.streakDays}
              isDarkMode={isDarkMode}
              onToggleTheme={handleToggleTheme}
            />
          ) : isMockActive ? (
            /* Full Mock Exam Simulator */
            <MockTestSimulator
              onExit={() => setIsMockActive(false)}
              onTestComplete={(_score, _acc) => {
                setIsMockActive(false);
              }}
            />
          ) : (
            <>
              {/* PAGE 1 & 2: HOME SCREEN */}
              {activeTab === 'home' && (
                <PDFHomeScreen
                  profile={profile}
                  stats={stats}
                  isDarkMode={isDarkMode}
                  onToggleTheme={handleToggleTheme}
                  onNavigateTab={setActiveTab}
                  onSelectSubject={handleSelectSubject}
                  onStartQuiz={handleStartQuickQuiz}
                  onStartMock={() => setIsMockActive(true)}
                />
              )}

              {/* PAGE 3, 4, 5, 6: LEARN SCREEN */}
              {activeTab === 'learn' && (
                <PDFLearnScreen
                  onClose={() => setActiveTab('home')}
                  onSelectTopic={handleSelectTopic}
                  isDarkMode={isDarkMode}
                  onToggleTheme={handleToggleTheme}
                />
              )}

              {/* PAGE 7: VEER AI MENTOR SCREEN */}
              {activeTab === 'veer_ai' && (
                <PDFVeerAIScreen
                  onClose={() => setActiveTab('home')}
                  candidateName={profile.name}
                  isDarkMode={isDarkMode}
                  onToggleTheme={handleToggleTheme}
                />
              )}

              {/* PAGE 8 & 9: DEFENCE UPDATES SCREEN (REAL-TIME FLOW) */}
              {activeTab === 'updates' && (
                <PDFUpdatesScreen
                  onClose={() => setActiveTab('home')}
                  isDarkMode={isDarkMode}
                  onToggleTheme={handleToggleTheme}
                />
              )}

              {/* PAGE 10 & 11: PROFILE DOSSIER SCREEN */}
              {activeTab === 'profile' && (
                <PDFProfileScreen
                  profile={profile}
                  stats={stats}
                  isDarkMode={isDarkMode}
                  onToggleTheme={handleToggleTheme}
                  onClose={() => setActiveTab('home')}
                  onEditProfile={() => setIsEditingProfile(true)}
                />
              )}
            </>
          )}
        </main>

        {/* Bottom Navigation matching all PDF pages */}
        {!activeLessonSession && !isMockActive && (
          <PDFBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        )}
      </div>
    </div>
  );
}
