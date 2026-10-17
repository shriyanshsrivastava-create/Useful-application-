import React, { useState, useEffect } from 'react';
import { FileText, Globe, Calendar, AlertTriangle, X, RefreshCw, Radio, ShieldCheck, Sun, Moon } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface DefenceUpdateItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  isUrgent: boolean;
  iconType: string;
}

interface PDFUpdatesScreenProps {
  onClose: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const PDFUpdatesScreen: React.FC<PDFUpdatesScreenProps> = ({
  onClose,
  isDarkMode = false,
  onToggleTheme
}) => {
  const [updates, setUpdates] = useState<DefenceUpdateItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');
  const [sourceStatus, setSourceStatus] = useState<string>('LIVE RADAR ACTIVE');

  const fetchUpdates = async () => {
    try {
      const res = await fetch('/api/defence-updates');
      if (res.ok) {
        const data = await res.json();
        if (data.updates) {
          setUpdates(data.updates);
          if (data.lastRefreshed) setLastRefreshed(data.lastRefreshed);
          if (data.sourceStatus) setSourceStatus(data.sourceStatus);
        }
      }
    } catch {
      // Keep existing state
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleRefreshLive = async () => {
    sounds.playClick();
    setIsLoading(true);
    try {
      const res = await fetch('/api/defence-updates/refresh', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.updates) {
          setUpdates(data.updates);
          if (data.lastRefreshed) setLastRefreshed(data.lastRefreshed);
          sounds.playSuccess();
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'file':
        return { icon: <FileText className="w-5 h-5" />, bg: 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400' };
      case 'calendar':
        return { icon: <Calendar className="w-5 h-5" />, bg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' };
      case 'alert':
        return { icon: <AlertTriangle className="w-5 h-5" />, bg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400' };
      case 'globe':
      default:
        return { icon: <Globe className="w-5 h-5" />, bg: 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400' };
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pb-28 font-sans touch-pan-y animate-fadeIn transition-colors duration-200">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 flex items-start justify-between border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Defence Updates
            </h1>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Stay informed about exams & current affairs
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
                  ? 'bg-slate-800 border-amber-500/40 text-amber-400 hover:bg-slate-700'
                  : 'bg-amber-50/80 border-amber-200 text-amber-800 hover:bg-amber-100'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="text-[11px] font-mono">{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>
          )}
          <button
            onClick={handleRefreshLive}
            disabled={isLoading}
            className="w-9 h-9 rounded-full bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-all shadow-xs"
            title="Refresh Real-Time Defence Radar"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
            title="Back to Home"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Live Radar Feed Status Bar */}
      <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>{sourceStatus}</span>
        </div>
        <div className="text-slate-400 font-mono">
          Updated: {lastRefreshed}
        </div>
      </div>

      {/* Updates List */}
      <div className="px-5 py-5 space-y-4">
        {updates.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-amber-500" />
            <p className="text-xs">Connecting to Defence Headquarters Radar...</p>
          </div>
        ) : (
          updates.map((item) => {
            const { icon, bg } = getIcon(item.iconType);

            return (
              <div
                key={item.id}
                className={`p-4 rounded-3xl border transition-all duration-150 space-y-2.5 ${
                  item.isUrgent
                    ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]'
                }`}
              >
                {/* Top Row: Icon + Tag + Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-2xl ${bg} flex items-center justify-center shrink-0`}>
                      {icon}
                    </div>
                    <span
                      className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full ${
                        item.isUrgent
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400">
                    {item.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Footer status */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Official Gazette Verified</span>
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold hover:underline cursor-pointer">
                    Read Brief →
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
