import React from 'react';
import { sounds } from '../utils/soundEffects';
import {
  Lock,
  ChevronRight,
  Globe,
  Brain,
  Newspaper,
  X,
  Sun,
  Moon
} from 'lucide-react';

interface PDFLearnScreenProps {
  onClose: () => void;
  onSelectTopic: (subjectId: string, topicName: string) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const PDFLearnScreen: React.FC<PDFLearnScreenProps> = ({
  onClose,
  onSelectTopic,
  isDarkMode = false,
  onToggleTheme
}) => {
  const subjectGroups = [
    {
      id: 'mathematics',
      title: 'Mathematics',
      topicsCount: '6 topics',
      colorClass: 'bg-blue-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M3 21l7-14M3 21l14-7" />
          <path d="M10 7l4 7" />
        </svg>
      ),
      topics: [
        { id: 'math-algebra', name: 'Algebra', meta: '12 lessons · beginner', isUnlocked: true, number: '1' },
        { id: 'math-trig', name: 'Trigonometry', meta: '10 lessons · beginner', isUnlocked: false },
        { id: 'math-calc', name: 'Calculus', meta: '14 lessons · intermediate', isUnlocked: false },
        { id: 'math-stats', name: 'Statistics & Probability', meta: '8 lessons · intermediate', isUnlocked: false },
        { id: 'math-geo', name: 'Geometry', meta: '10 lessons · beginner', isUnlocked: false },
        { id: 'math-matrices', name: 'Matrices & Determinants', meta: '8 lessons · advanced', isUnlocked: false }
      ]
    },
    {
      id: 'english',
      title: 'English',
      topicsCount: '5 topics',
      colorClass: 'bg-emerald-500',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      ),
      topics: [
        { id: 'eng-grammar', name: 'Grammar', meta: '15 lessons · beginner', isUnlocked: true, number: '1' },
        { id: 'eng-vocab', name: 'Vocabulary', meta: '12 lessons · beginner', isUnlocked: false },
        { id: 'eng-comp', name: 'Comprehension', meta: '10 lessons · intermediate', isUnlocked: false },
        { id: 'eng-errors', name: 'Spotting Errors', meta: '8 lessons · intermediate', isUnlocked: false },
        { id: 'eng-sentence', name: 'Sentence Improvement', meta: '8 lessons · advanced', isUnlocked: false }
      ]
    },
    {
      id: 'gk',
      title: 'General Knowledge',
      topicsCount: '6 topics',
      colorClass: 'bg-amber-500',
      icon: <Globe className="w-6 h-6 text-white" />,
      topics: [
        { id: 'gk-history', name: 'Indian History', meta: '14 lessons · beginner', isUnlocked: true, number: '1' },
        { id: 'gk-geo', name: 'Geography', meta: '12 lessons · beginner', isUnlocked: false },
        { id: 'gk-polity', name: 'Indian Polity', meta: '10 lessons · intermediate', isUnlocked: false },
        { id: 'gk-science', name: 'General Science', meta: '12 lessons · intermediate', isUnlocked: false },
        { id: 'gk-econ', name: 'Economics', meta: '8 lessons · advanced', isUnlocked: false },
        { id: 'gk-defence', name: 'Defence & Security', meta: '6 lessons · intermediate', isUnlocked: false }
      ]
    },
    {
      id: 'reasoning',
      title: 'Reasoning & Aptitude',
      topicsCount: '4 topics',
      colorClass: 'bg-purple-600',
      icon: <Brain className="w-6 h-6 text-white" />,
      topics: [
        { id: 'reas-verbal', name: 'Verbal Reasoning', meta: '10 lessons · beginner', isUnlocked: true, number: '1' },
        { id: 'reas-nonverbal', name: 'Non-Verbal Reasoning', meta: '10 lessons · intermediate', isUnlocked: false },
        { id: 'reas-logical', name: 'Logical Reasoning', meta: '12 lessons · intermediate', isUnlocked: false },
        { id: 'reas-di', name: 'Data Interpretation', meta: '8 lessons · advanced', isUnlocked: false }
      ]
    },
    {
      id: 'current_affairs',
      title: 'Current Affairs',
      topicsCount: '4 topics',
      colorClass: 'bg-rose-500',
      icon: <Newspaper className="w-6 h-6 text-white" />,
      topics: [
        { id: 'ca-national', name: 'National Affairs', meta: '10 lessons · beginner', isUnlocked: true, number: '1' }
      ]
    }
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pb-28 font-sans touch-pan-y animate-fadeIn transition-colors duration-200">
      {/* Top Header matching Page 3 */}
      <div className="px-5 pt-5 pb-4 flex items-start justify-between border-b border-slate-100 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Learn
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Choose a subject to begin your training
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onToggleTheme && (
            <button
              onClick={() => {
                sounds.playClick();
                onToggleTheme();
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                isDarkMode
                  ? 'bg-slate-850 border-amber-500/40 text-amber-400 hover:bg-slate-800'
                  : 'bg-amber-50/80 border-amber-200 text-amber-800 hover:bg-amber-100'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="text-[11px] font-mono">{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
            title="Back to Home"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Subject Groups List matching Page 3, 4, 5, 6 */}
      <div className="px-5 py-5 space-y-7">
        {subjectGroups.map((group) => (
          <div key={group.id} className="space-y-3">
            {/* Subject Section Header */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl ${group.colorClass} flex items-center justify-center shadow-sm shrink-0`}>
                {group.icon}
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {group.title}
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  {group.topicsCount}
                </p>
              </div>
            </div>

            {/* Topic Cards List */}
            <div className="space-y-2.5">
              {group.topics.map((topic) => {
                return (
                  <div
                    key={topic.id}
                    onClick={() => {
                      sounds.playClick();
                      onSelectTopic(group.id, topic.name);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                      topic.isUnlocked
                        ? 'bg-slate-50/70 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-800 text-slate-900 dark:text-white shadow-xs active:scale-[0.99]'
                        : 'bg-white dark:bg-slate-950/60 border-slate-100 dark:border-slate-800/60 text-slate-400 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {topic.isUnlocked ? (
                        <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs text-slate-800 dark:text-amber-400 shadow-xs">
                          {topic.number}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400">
                          <Lock className="w-4 h-4 text-slate-400" />
                        </div>
                      )}
                      <div>
                        <div className={`text-sm font-bold leading-tight ${topic.isUnlocked ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                          {topic.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                          {topic.meta}
                        </div>
                      </div>
                    </div>

                    {topic.isUnlocked && (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
