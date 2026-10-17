import React from 'react';
import { Map, BookOpen, RotateCcw, Bot, Radio, BarChart2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export type NavTab = 'map' | 'academy' | 'revision' | 'veer_ai' | 'radar' | 'analytics';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'map' as NavTab, label: 'Sectors', icon: Map },
    { id: 'academy' as NavTab, label: 'Academy', icon: BookOpen },
    { id: 'revision' as NavTab, label: 'Revisions', icon: RotateCcw, hasBadge: true },
    { id: 'veer_ai' as NavTab, label: 'Veer AI', icon: Bot, isSpecial: true },
    { id: 'radar' as NavTab, label: 'Radar', icon: Radio },
    { id: 'analytics' as NavTab, label: 'Dossier', icon: BarChart2 }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-t border-stone-800/90 px-2 py-1.5 max-w-4xl mx-auto shadow-2xl">
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
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
                isActive
                  ? 'text-amber-400 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {tab.isSpecial ? (
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center -mt-3.5 shadow-lg transition-transform ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 shadow-amber-500/30 scale-110'
                      : 'bg-stone-800 text-amber-400 border border-amber-500/40'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              ) : (
                <div className="relative">
                  <Icon className={`w-5 h-5 mb-0.5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  {tab.hasBadge && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  )}
                </div>
              )}
              <span className="text-[10px] tracking-tight font-medium font-sans">
                {tab.label}
              </span>
              {isActive && !tab.isSpecial && (
                <span className="w-1 h-1 rounded-full bg-amber-400 mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
