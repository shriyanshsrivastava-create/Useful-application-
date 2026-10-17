import React, { useState } from 'react';
import { DEFENCE_UPDATES } from '../data/defenceRadarData';
import { DefenceUpdate } from '../types';
import { Radio, Bell, ExternalLink, Calendar, ShieldCheck, AlertCircle, Search, Filter } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const DefenceRadar: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlertToast, setShowAlertToast] = useState(false);

  const categories = [
    { id: 'all', label: 'All Intel' },
    { id: 'notification', label: 'Exam Notifications' },
    { id: 'admit_card', label: 'Admit Cards' },
    { id: 'ssb', label: 'SSB Calls' },
    { id: 'current_affairs', label: 'Current Affairs' }
  ];

  const filteredUpdates = DEFENCE_UPDATES.filter((item) => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSimulateAlert = () => {
    sounds.playHint();
    setShowAlertToast(true);
    setTimeout(() => setShowAlertToast(false), 4000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 pb-20 p-3 sm:p-5">
      {/* Toast Notification Simulation */}
      {showAlertToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md p-3.5 rounded-2xl bg-stone-900 border border-amber-500/80 shadow-2xl shadow-amber-500/20 flex items-start gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4 animate-ring" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-amber-300 font-mono">TACTICAL FLASH ALERT</div>
            <p className="text-xs text-stone-200 mt-0.5">
              NDA & NA (I) 2026 Online Portal active. Ensure application is submitted before deadline!
            </p>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border border-stone-800 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-stone-100 font-mono">DEFENCE INTEL RADAR</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <p className="text-xs text-stone-400">Real-time notifications, deadlines & non-expired current affairs</p>
          </div>
        </div>

        <button
          onClick={handleSimulateAlert}
          className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          title="Simulate priority push notification"
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Test Alert</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exam notifications, DRDO tests, SSB boards..."
            className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                sounds.playClick();
                setFilter(c.id);
              }}
              className={`text-xs whitespace-nowrap px-3 py-1.5 rounded-xl border font-medium transition-all shrink-0 ${
                filter === c.id
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-stone-900/80 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Cards */}
      <div className="space-y-3">
        {filteredUpdates.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all ${
              item.isUrgent
                ? 'bg-gradient-to-r from-stone-900 to-stone-950 border-amber-500/40 shadow-lg shadow-amber-950/20'
                : 'bg-stone-900/80 border-stone-800'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                {item.isUrgent && (
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> URGENT
                  </span>
                )}
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                  {item.category.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {item.date}
                </span>
              </div>

              {/* Relevance Score Badge */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold shrink-0">
                <ShieldCheck className="w-3 h-3" />
                <span>{item.relevanceScore}% Yield</span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-stone-100 leading-snug">{item.title}</h3>
            <p className="text-xs text-stone-300 leading-relaxed mt-1.5">{item.summary}</p>

            {/* Source & Actions */}
            <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <span className="font-mono text-[11px] text-stone-400 truncate max-w-[200px]">
                Source: {item.source}
              </span>
              {item.deadline && (
                <span className="font-mono text-[11px] text-amber-400 font-semibold">
                  Deadline: {item.deadline}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
