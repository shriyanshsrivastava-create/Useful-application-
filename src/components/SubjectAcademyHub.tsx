import React, { useState } from 'react';
import { SUBJECT_ACADEMY_DATA } from '../data/subjectMaterials';
import { SubjectDetail, SubjectLesson, StudyMaterialDoc, SubjectType } from '../types';
import { sounds } from '../utils/soundEffects';
import {
  Compass,
  Brain,
  BookOpen,
  Shield,
  Zap,
  Radio,
  Clock,
  Award,
  ChevronRight,
  FileText,
  Sparkles,
  Flame,
  CheckCircle2,
  Bookmark,
  Layers,
  ArrowLeft
} from 'lucide-react';

interface SubjectAcademyHubProps {
  onStartLessonPractice?: (subject: SubjectType, lesson: SubjectLesson) => void;
}

export const SubjectAcademyHub: React.FC<SubjectAcademyHubProps> = ({
  onStartLessonPractice
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectType>('mathematics');
  const [activeTab, setActiveTab] = useState<'lessons' | 'materials'>('lessons');
  const [activeMaterialDoc, setActiveMaterialDoc] = useState<StudyMaterialDoc | null>(null);
  const [activeLessonModal, setActiveLessonModal] = useState<SubjectLesson | null>(null);

  const selectedSubject =
    SUBJECT_ACADEMY_DATA.find((s) => s.id === selectedSubjectId) || SUBJECT_ACADEMY_DATA[0];

  const getSubjectIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Compass':
        return <Compass className={className} />;
      case 'Brain':
        return <Brain className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Shield':
        return <Shield className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Radio':
        return <Radio className={className} />;
      default:
        return <Shield className={className} />;
    }
  };

  const getSubjectColorClasses = (subjectId: SubjectType) => {
    switch (subjectId) {
      case 'mathematics':
        return {
          activeTab: 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-amber-500/10',
          badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          gradient: 'from-amber-950/40 via-stone-900 to-stone-950',
          accent: 'text-amber-400'
        };
      case 'reasoning':
        return {
          activeTab: 'bg-blue-500/20 text-blue-300 border-blue-500/60 shadow-blue-500/10',
          badge: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
          gradient: 'from-blue-950/40 via-stone-900 to-stone-950',
          accent: 'text-blue-400'
        };
      case 'english':
        return {
          activeTab: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-emerald-500/10',
          badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          gradient: 'from-emerald-950/40 via-stone-900 to-stone-950',
          accent: 'text-emerald-400'
        };
      case 'gk':
        return {
          activeTab: 'bg-rose-500/20 text-rose-300 border-rose-500/60 shadow-rose-500/10',
          badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
          gradient: 'from-rose-950/40 via-stone-900 to-stone-950',
          accent: 'text-rose-400'
        };
      case 'science':
        return {
          activeTab: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-cyan-500/10',
          badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
          gradient: 'from-cyan-950/40 via-stone-900 to-stone-950',
          accent: 'text-cyan-400'
        };
      case 'current_affairs':
        return {
          activeTab: 'bg-purple-500/20 text-purple-300 border-purple-500/60 shadow-purple-500/10',
          badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
          gradient: 'from-purple-950/40 via-stone-900 to-stone-950',
          accent: 'text-purple-400'
        };
    }
  };

  const colors = getSubjectColorClasses(selectedSubject.id);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 pb-24 p-3 sm:p-5 animate-fadeIn">
      {/* Academy Heritage Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 border border-stone-800 shadow-2xl relative overflow-hidden">
        {/* Subtle Watermark Texture */}
        <div className="absolute right-4 -bottom-6 opacity-5 pointer-events-none select-none text-9xl font-mono font-black text-amber-500">
          VP
        </div>

        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              VEERPATH ACADEMY CORPS
            </span>
          </div>
          <span className="text-[11px] font-mono text-stone-400 border border-stone-800 bg-stone-950/80 px-2.5 py-0.5 rounded-full">
            Modern Military History Touch
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-stone-100 font-mono tracking-wide">
          Subject Regiments & Study Material Codices
        </h1>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mt-1 max-w-xl">
          Each subject is structured under its distinct regimental heritage with individual syllabus lessons,
          exam-proven formula vaults, and military dispatch study materials.
        </p>
      </div>

      {/* Individual Subject Horizontal Selector Bar */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400 pl-1 font-semibold">
          Select Subject Command
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {SUBJECT_ACADEMY_DATA.map((subject) => {
            const isSelected = subject.id === selectedSubjectId;
            const subColor = getSubjectColorClasses(subject.id);

            return (
              <button
                key={subject.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedSubjectId(subject.id);
                  setActiveMaterialDoc(null);
                  setActiveLessonModal(null);
                }}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all duration-200 shadow-md ${
                  isSelected
                    ? `${subColor.activeTab} border-2 scale-[1.02]`
                    : 'bg-stone-900/90 border-stone-800/90 text-stone-400 hover:text-stone-200 hover:bg-stone-800/90 hover:border-stone-700'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    isSelected ? 'bg-stone-950/80 border-current shadow-inner' : 'bg-stone-950 border-stone-800 text-stone-400'
                  }`}
                >
                  {getSubjectIcon(subject.emblemIcon, 'w-5 h-5')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-stone-100 truncate">{subject.name}</div>
                  <div className="text-[10px] text-stone-400 font-mono truncate mt-0.5">
                    {subject.regimentalTitle.replace('Regiment of ', '')}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Subject Dossier Card with Heritage Story */}
      <div
        className={`p-5 rounded-3xl bg-gradient-to-br ${colors.gradient} border border-stone-800/90 shadow-xl space-y-4`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800/70">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-center shadow-lg">
              {getSubjectIcon(selectedSubject.emblemIcon, `w-7 h-7 ${colors.accent}`)}
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">
                {selectedSubject.historicInsignia}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-100 font-mono">
                {selectedSubject.name} — {selectedSubject.regimentalTitle}
              </h2>
            </div>
          </div>

          {/* Sub-Tabs: Lessons vs Study Materials */}
          <div className="flex p-1 bg-stone-950/80 border border-stone-800 rounded-2xl self-start sm:self-auto">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('lessons');
                setActiveMaterialDoc(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                activeTab === 'lessons'
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Lessons ({selectedSubject.lessons.length})
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('materials');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                activeTab === 'materials'
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Study Materials ({selectedSubject.studyMaterials.length})
            </button>
          </div>
        </div>

        {/* Heritage Story Quote Box (Modern History Touch) */}
        <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800/80 text-xs text-stone-300 leading-relaxed font-sans">
          <span className="font-bold text-amber-400 font-mono uppercase mr-1.5">Military Heritage:</span>
          {selectedSubject.heritageStory}
        </div>

        {/* TAB 1: INDIVIDUAL LESSONS CATALOG */}
        {activeTab === 'lessons' && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
              <span>TACTICAL MICRO-LESSONS</span>
              <span>ESTIMATED DURATION: 4-7 MINS EACH</span>
            </div>

            <div className="space-y-3">
              {selectedSubject.lessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveLessonModal(lesson);
                  }}
                  className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/60 cursor-pointer transition-all duration-200 shadow-md hover:shadow-xl group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center font-mono text-xs font-bold text-stone-300 shrink-0 mt-0.5 group-hover:border-amber-500/50 group-hover:text-amber-400 transition-colors">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                            {lesson.title}
                          </h3>
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-stone-900 border border-stone-800 text-stone-400">
                            Level {lesson.level}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 mt-1 leading-relaxed">{lesson.summary}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-stone-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {lesson.durationMinutes}m
                      </span>
                      <ChevronRight className="w-4 h-4 text-stone-600 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </div>

                  {/* Core Formula Box Snapshot */}
                  {lesson.formulaOrRuleBox && (
                    <div className="mt-3 p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-xs font-mono text-amber-300/90 leading-relaxed">
                      {lesson.formulaOrRuleBox}
                    </div>
                  )}

                  <div className="mt-2.5 text-[11px] text-stone-400 flex items-center gap-1.5 font-sans">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{lesson.highYieldExamFact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: INDIVIDUAL STUDY MATERIALS & CODICES */}
        {activeTab === 'materials' && (
          <div className="space-y-3 pt-1">
            {!activeMaterialDoc ? (
              <div className="space-y-3">
                <div className="text-xs text-stone-400 font-mono">
                  CURATED STUDY CODICES & HIGH-YIELD CHEAT SHEETS
                </div>

                <div className="space-y-3">
                  {selectedSubject.studyMaterials.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => {
                        sounds.playClick();
                        setActiveMaterialDoc(doc);
                      }}
                      className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/60 cursor-pointer transition-all duration-200 shadow-md group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                              {doc.title}
                            </h3>
                            <span className="text-[10px] font-mono text-stone-500 uppercase">
                              Category: {doc.category.replace('_', ' ')} • {doc.readingTime}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      {/* Key highlights bullet points */}
                      <div className="mt-2.5 space-y-1 pl-10 text-xs text-stone-300">
                        {doc.keyHighlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Markdown Document Reader View */
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 shadow-2xl space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <button
                    onClick={() => setActiveMaterialDoc(null)}
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Material Library
                  </button>
                  <span className="text-[10px] font-mono text-stone-400 px-2 py-0.5 rounded bg-stone-900 border border-stone-800">
                    {activeMaterialDoc.readingTime}
                  </span>
                </div>

                <div className="prose prose-invert max-w-none text-xs sm:text-sm text-stone-200 leading-relaxed font-sans space-y-3">
                  {activeMaterialDoc.contentMarkdown.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('# ')) {
                      return (
                        <h2 key={pIdx} className="text-base sm:text-lg font-bold text-amber-400 font-mono">
                          {paragraph.replace('# ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={pIdx} className="text-sm font-bold text-stone-100 font-mono mt-3 border-b border-stone-800 pb-1">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      return (
                        <ul key={pIdx} className="space-y-1 pl-2">
                          {paragraph.split('\n').map((item, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-2 text-stone-300">
                              <span className="text-amber-400">•</span>
                              <span>{item.replace(/^- /, '')}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={pIdx}>{paragraph}</p>;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lesson Detail Inspection Modal */}
      {activeLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-6 max-h-[85vh] overflow-y-auto shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold">
                  MICRO-LESSON DEEP DIVE
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-100 font-mono mt-1">
                  {activeLessonModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLessonModal(null)}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
              {activeLessonModal.summary}
            </p>

            {/* Core Concepts */}
            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
              <div className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider">
                Key Conceptual Pillars
              </div>
              <div className="space-y-1.5 text-xs text-stone-200">
                {activeLessonModal.coreConcepts.map((cc, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{cc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formula / Rule Box */}
            {activeLessonModal.formulaOrRuleBox && (
              <div className="p-3.5 rounded-2xl bg-stone-950/90 border border-amber-500/40 space-y-1">
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                  Tactical Rule / Equation Box
                </div>
                <div className="text-xs sm:text-sm font-mono text-amber-200 whitespace-pre-wrap leading-relaxed">
                  {activeLessonModal.formulaOrRuleBox}
                </div>
              </div>
            )}

            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-blue-300">UPSC Exam Fact: </span>
                {activeLessonModal.highYieldExamFact}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-800">
              <button
                onClick={() => setActiveLessonModal(null)}
                className="py-2.5 px-5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveLessonModal(null);
                  onStartLessonPractice?.(selectedSubject.id, activeLessonModal);
                }}
                className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5"
              >
                <span>Practice Topic Drill</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
