import React, { useState, useRef, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';
import { Shield, Send, Plus, X, User, Sun, Moon } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'veer';
  text: string;
  time: string;
}

interface PDFVeerAIScreenProps {
  onClose: () => void;
  candidateName?: string;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const PDFVeerAIScreen: React.FC<PDFVeerAIScreenProps> = ({
  onClose,
  candidateName = 'Cadet',
  isDarkMode = false,
  onToggleTheme
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const suggestionPrompts = [
    'Create a study plan for NDA',
    'Explain trigonometry basics',
    'Tips for SSB interview',
    'Current defence news'
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim() || isLoading) return;

    sounds.playClick();
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/veer-ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            name: candidateName,
            exam: 'NDA & CDS 2026',
            role: 'Defence Aspirant'
          }
        })
      });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `v-${Date.now()}`,
          sender: 'veer',
          text: data.reply || 'Jai Hind, Cadet! Stand tall and stay prepared.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      sounds.playSuccess();
    } catch {
      // Fallback
      setMessages((prev) => [
        ...prev,
        {
          id: `v-${Date.now()}`,
          sender: 'veer',
          text: `**Jai Hind, Cadet!** 🫡\n\nI am with you on your operational path. For defence exams:\n- **NDA Paper 1 Math:** Focus on Trigonometry (15-20 questions), Matrices (10 questions), and Vector 3D.\n- **SSB Screening:** In OIR & PPDT, clarity of narration and cooperative group spirit are essential.\n\nKeep your discipline unwavering! What concept shall we conquer next?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    sounds.playClick();
    setMessages([]);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans animate-fadeIn pb-24 transition-colors duration-200">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-white" strokeWidth="2">
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              Veer AI
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Your Defence Mentor
            </p>
          </div>
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
            onClick={handleNewChat}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
            title="Start New Chat"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-5 py-6 overflow-y-auto space-y-6 touch-pan-y overscroll-y-contain">
        {messages.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center text-center pt-8 space-y-6 animate-fadeIn">
            {/* Center Avatar Square */}
            <div className="w-24 h-24 rounded-3xl bg-[#fffbeb] dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" className="w-12 h-12 fill-none stroke-amber-500" strokeWidth="1.8">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
              </svg>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-2 max-w-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-1.5">
                Jai Hind, Cadet! 🇮🇳
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                I'm Veer AI, your defence preparation guide. Ask me anything about NDA, CDS, AFCAT, or SSB!
              </p>
            </div>

            {/* 4 Suggestion Cards 2x2 Grid */}
            <div className="w-full max-w-md grid grid-cols-2 gap-3 pt-4 text-left">
              {suggestionPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50/40 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-semibold leading-snug transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Message Transcript */
          <div className="space-y-4">
            {messages.map((msg) => {
              const isVeer = msg.sender === 'veer';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isVeer ? 'justify-start' : 'justify-end'}`}
                >
                  {isVeer && (
                    <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0 mt-0.5 font-bold text-xs shadow-xs">
                      V
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed text-xs sm:text-sm shadow-xs ${
                      isVeer
                        ? 'bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                        : 'bg-amber-500 text-white font-medium'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <div
                      className={`text-[10px] font-mono mt-1.5 text-right ${
                        isVeer ? 'text-slate-400 dark:text-slate-500' : 'text-amber-100'
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0 mt-0.5 font-bold text-xs">
                  V
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  <span>Veer AI is analyzing...</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>
        )}
      </div>

      {/* Bottom Chat Input */}
      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 relative"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask Veer AI anything..."
            className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-4 pr-12 py-3 text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 shadow-xs"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isLoading}
            className={`w-10 h-10 rounded-xl flex items-center justify-center absolute right-1.5 top-1/2 -translate-y-1/2 transition-all ${
              inputVal.trim() && !isLoading
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 cursor-pointer active:scale-95'
                : 'bg-amber-200 dark:bg-slate-800 text-white dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
