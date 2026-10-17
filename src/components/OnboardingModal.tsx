import React, { useState } from 'react';
import { ExamTarget } from '../types';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Shield, User, Mail, Award, CheckCircle2, ChevronRight, Target, Clock, ArrowRight } from 'lucide-react';

export interface UserProfileData {
  name: string;
  email: string;
  targetExam: ExamTarget;
  educationStage: string;
  dailyGoalMins: number;
  initials: string;
  joinedDate: string;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: UserProfileData) => void;
  initialData?: UserProfileData;
  isEditing?: boolean;
  onClose?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  initialData,
  isEditing = false,
  onClose
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(initialData?.name || 'Kalpana Srivastava');
  const [email, setEmail] = useState(initialData?.email || 'kalpana914lko@gmail.com');
  const [targetExam, setTargetExam] = useState<ExamTarget>(initialData?.targetExam || 'NDA');
  const [educationStage, setEducationStage] = useState(initialData?.educationStage || 'Class 12th Aspirant');
  const [dailyGoalMins, setDailyGoalMins] = useState(initialData?.dailyGoalMins || 30);

  if (!isOpen) return null;

  const exams: { id: ExamTarget; title: string; subtitle: string; icon: string }[] = [
    { id: 'NDA', title: 'NDA & NA', subtitle: 'National Defence Academy (After 12th)', icon: '⚔️' },
    { id: 'CDS', title: 'CDS Exam', subtitle: 'Combined Defence Services (Graduates)', icon: '🎖️' },
    { id: 'AFCAT', title: 'AFCAT', subtitle: 'Air Force Common Admission Test', icon: '✈️' },
    { id: 'SSB', title: 'SSB Interview', subtitle: 'Stage 1 Screening & Stage 2 Psychology', icon: '🏅' }
  ];

  const educationOptions = [
    'Class 10th / 11th Foundation',
    'Class 12th Aspirant',
    'College / Graduate',
    'Repeat Defence Aspirant'
  ];

  const dailyGoals = [
    { mins: 15, label: 'Casual', desc: '15 mins / day (1-2 topics)' },
    { mins: 30, label: 'Regular', desc: '30 mins / day (Daily mission target)' },
    { mins: 45, label: 'Serious', desc: '45 mins / day (Exam mode)' },
    { mins: 60, label: 'Commando', desc: '60+ mins / day (Full sprint)' }
  ];

  const handleFinish = () => {
    sounds.playRankUp();
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {}

    const parts = name.trim().split(' ');
    const initials = parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : (name[0] || 'K').toUpperCase();

    onComplete({
      name: name.trim() || 'Kalpana Srivastava',
      email: email.trim() || 'kalpana914lko@gmail.com',
      targetExam,
      educationStage,
      dailyGoalMins,
      initials,
      joinedDate: initialData?.joinedDate || 'Oct 2026'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-100 transition-colors duration-200">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">
                {isEditing ? 'Edit Cadet Profile' : 'Cadet Enlistment Profile'}
              </h2>
              <p className="text-xs text-amber-100">Step {step} of 3 • VeerPath Defence Academy</p>
            </div>
          </div>
          {isEditing && onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm font-bold cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-amber-100 dark:bg-slate-800">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* STEP 1: Candidate Basic Details */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-1">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 font-extrabold text-2xl flex items-center justify-center mx-auto shadow-sm">
                  {name ? name.trim()[0]?.toUpperCase() : 'K'}
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Personal Information</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Enter your name as it appears on your Defence admit card</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kalpana Srivastava"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. kalpana914lko@gmail.com"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Current Academic Stage</label>
                  <div className="grid grid-cols-2 gap-2">
                    {educationOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          sounds.playClick();
                          setEducationStage(opt);
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                          educationStage === opt
                            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-300 font-bold shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Target Defence Exam */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-1">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Select Target Exam</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Veer AI customizes your daily mission and syllabus according to your exam</p>
              </div>

              <div className="space-y-2.5">
                {exams.map((exam) => {
                  const isSelected = targetExam === exam.id;
                  return (
                    <button
                      key={exam.id}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setTargetExam(exam.id);
                      }}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 text-slate-900 dark:text-white shadow-md ring-2 ring-amber-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{exam.icon}</span>
                        <div>
                          <div className="font-bold text-sm text-slate-900 dark:text-white">{exam.title}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{exam.subtitle}</div>
                        </div>
                      </div>
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Daily Learning Commitment */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-1">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Daily Training Target</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Consistent daily discipline builds officer-like tenacity</p>
              </div>

              <div className="space-y-2.5">
                {dailyGoals.map((g) => {
                  const isSelected = dailyGoalMins === g.mins;
                  return (
                    <button
                      key={g.mins}
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        setDailyGoalMins(g.mins);
                      }}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-slate-900 dark:text-white shadow-md ring-2 ring-amber-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 font-bold flex items-center justify-center font-mono text-xs">
                          {g.mins}m
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-900 dark:text-white">{g.label}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{g.desc}</div>
                        </div>
                      </div>
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Navigation */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setStep((s) => s - 1);
                }}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  setStep((s) => s + 1);
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/25 cursor-pointer"
              >
                <span>Complete Enlistment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
