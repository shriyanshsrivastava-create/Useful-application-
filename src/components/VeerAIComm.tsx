import React, { useState, useRef, useEffect } from 'react';
import { VeerMascot, MascotMood } from './VeerMascot';
import { Send, Sparkles, Shield, Compass, BookOpen, Bot, User, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Message {
  id: string;
  sender: 'veer' | 'user';
  text: string;
  timestamp: string;
  isSolutionBreakdown?: boolean;
}

export const VeerAIComm: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-0',
      sender: 'veer',
      text: `**Jai Hind, Cadet!** 🫡\n\nI am **Major Veer Singh** (Callsign: "Veer AI"), your digital soldier-guide and tactical instructor at the VeerPath Defence Academy.\n\nWhether you need mathematical shortcuts for NDA Paper 1, grammatical rules for CDS English, psychological insight for SSB (PPDT, TAT, WAT, SRT), or a disciplined 0530-hrs daily study schedule, I am on watch.\n\nState your operational objective, Cadet!`,
      timestamp: '05:30'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mascotMood, setMascotMood] = useState<MascotMood>('salute');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: '📐 Math Shortcuts', query: 'What are the top 3 high-yield time-saving shortcuts for NDA Trigonometry & Calculus?' },
    { label: '🎖️ SSB OIR & PPDT', query: 'How should I approach the Screening stage (OIR and PPDT picture story) at the SSB?' },
    { label: '⏰ 0530 hrs Routine', query: 'Give me a disciplined daily study timetable for NDA/CDS preparation alongside school/college.' },
    { label: '🔍 Grammar Traps', query: 'Explain the 3 most common Subject-Verb Agreement error spotting traps tested by UPSC.' }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    sounds.playClick();
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);
    setMascotMood('analyzing');

    try {
      const response = await fetch('/api/veer-ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            exam: 'NDA & CDS 2026',
            topic: 'Comprehensive Defence Preparation',
            rank: 'Cadet Recruit'
          }
        })
      });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();

      setMessages(prev => [
        ...prev,
        {
          id: `msg-bot-${Date.now()}`,
          sender: 'veer',
          text: data.reply || 'Cadet, stay steady. Mission accomplished.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setMascotMood('motivate');
      sounds.playSuccess();
    } catch {
      // Fallback
      setMessages(prev => [
        ...prev,
        {
          id: `msg-bot-${Date.now()}`,
          sender: 'veer',
          text: `**Jai Hind, Cadet!** 🫡\n\nAlways maintain steady discipline. For NDA and CDS:\n- Focus on **accuracy over blind attempts** (remember the -0.83 penalty in Math and -1.33 in GAT).\n- Consistently test your speed on **Level 3 & 4 Challenge Drills**.\n- Remember: *The sweat you shed in training saves blood in battle!*\n\nWhat topic should we drill next?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setMascotMood('motivate');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-[680px] bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl">
      {/* Mentor Briefing Header */}
      <div className="p-4 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <VeerMascot
            mood={mascotMood}
            size="sm"
            onClick={() => {
              setMascotMood(m => (m === 'salute' ? 'motivate' : 'salute'));
              sounds.playClick();
            }}
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-stone-100 flex items-center gap-1.5 font-mono">
                MAJOR VEER SINGH
              </h2>
              <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ACTIVE ON RADAR
              </span>
            </div>
            <p className="text-xs text-stone-400">Chief Defence Mentor • Veer AI Knowledge Core</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-amber-400/90 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>SSB/NDA Validated</span>
        </div>
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-stone-950/60 border-b border-stone-800/80 flex gap-2 overflow-x-auto no-scrollbar">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            disabled={isLoading}
            onClick={() => handleSendMessage(p.query)}
            className="text-xs whitespace-nowrap px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-amber-300 font-medium transition-all shadow-sm active:scale-95 shrink-0"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans">
        {messages.map((msg) => {
          const isVeer = msg.sender === 'veer';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isVeer ? 'justify-start' : 'justify-end'}`}
            >
              {isVeer && (
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-1 font-bold font-mono text-xs">
                  VS
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-4 shadow-md leading-relaxed ${
                  isVeer
                    ? 'bg-stone-950/90 border border-stone-800 text-stone-200'
                    : 'bg-amber-600 text-stone-950 font-medium'
                }`}
              >
                <div className="text-xs sm:text-sm whitespace-pre-wrap">
                  {msg.text.split('\n').map((line, lIdx) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <div key={lIdx} className="font-bold text-amber-400 text-sm my-1">
                          {line.replace(/\*\*/g, '')}
                        </div>
                      );
                    }
                    if (line.startsWith('• ') || line.startsWith('- ')) {
                      return (
                        <div key={lIdx} className="flex items-start gap-1.5 my-0.5 pl-1">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{line.replace(/^[•-]\s+/, '')}</span>
                        </div>
                      );
                    }
                    return <div key={lIdx}>{line}</div>;
                  })}
                </div>
                <div
                  className={`text-[10px] font-mono mt-2 text-right ${
                    isVeer ? 'text-stone-500' : 'text-stone-900/70 font-semibold'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
              {!isVeer && (
                <div className="w-8 h-8 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 font-bold font-mono text-xs">
              VS
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 text-stone-400 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>Major Veer is analyzing the tactical data...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Composer */}
      <div className="p-3.5 bg-stone-950 border-t border-stone-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask Major Veer Singh any doubt (Math, English, SSB, GK)..."
            className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
              inputMessage.trim() && !isLoading
                ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md shadow-amber-500/20 cursor-pointer active:scale-95'
                : 'bg-stone-800 text-stone-600 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Transmit</span>
          </button>
        </form>
      </div>
    </div>
  );
};
