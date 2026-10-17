import React from 'react';
import { Home, BookOpen, Zap, Newspaper, User } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export type PDFNavTab = 'home' | 'learn' | 'veer_ai' | 'updates' | 'profile';

interface PDFBottomNavProps {
  activeTab: PDFNavTab;
  onTabChange: (tab: PDFNavTab) => void;
}

export const PDFBottomNav: React.FC<PDFBottomNavProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'home' as PDFNavTab, label: 'Home', icon: Home },
    { id: 'learn' as PDFNavTab, label: 'Learn', icon: BookOpen },
    { id: 'veer_ai' as PDFNavTab, label: 'Veer AI', icon: Zap },
    { id: 'updates' as PDFNavTab, label: 'Updates', icon: Newspaper },
    { id: 'profile' as PDFNavTab, label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 py-2 px-4 max-w-md mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_-4px_25px_rgba(0,0,0,0.4)] transition-colors duration-200">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                onTabChange(tab.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? 'text-amber-500 dark:text-amber-400 font-bold'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'
                  }`}
                />
              </div>
              <span className={`text-[11px] mt-1 tracking-tight font-medium ${isActive ? 'text-amber-500 dark:text-amber-400 font-bold' : 'text-slate-400 dark:text-slate-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
