import React from 'react';
import { CurriculumSector, CurriculumNode, DailyMission } from '../types';
import { Star, Lock, Play, ShieldAlert, Award, Compass, Radio, Target, MessageSquareCode, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface MissionMapProps {
  sectors: CurriculumSector[];
  missions: DailyMission[];
  onSelectNode: (node: CurriculumNode) => void;
  onOpenVeerAI: () => void;
}

export const MissionMap: React.FC<MissionMapProps> = ({
  sectors,
  missions,
  onSelectNode,
  onOpenVeerAI
}) => {
  const getMissionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-4 h-4 text-amber-400" />;
      case 'Radio':
        return <Radio className="w-4 h-4 text-blue-400" />;
      case 'Target':
        return <Target className="w-4 h-4 text-rose-400" />;
      case 'MessageSquareCode':
        return <MessageSquareCode className="w-4 h-4 text-purple-400" />;
      default:
        return <Target className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 pb-20 p-3 sm:p-5">
      {/* Daily Military Missions (Operations) */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <h3 className="font-bold text-sm text-stone-100 uppercase tracking-wider font-mono">
              Daily Military Missions
            </h3>
          </div>
          <span className="text-[11px] font-mono text-amber-400 font-semibold">Resets 05:30 HRS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {missions.map((mission) => (
            <div
              key={mission.id}
              onClick={() => {
                if (mission.iconName === 'MessageSquareCode') {
                  onOpenVeerAI();
                }
              }}
              className={`p-3 rounded-xl border transition-all ${
                mission.completed
                  ? 'bg-emerald-950/20 border-emerald-800/40'
                  : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700 cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center">
                    {getMissionIcon(mission.iconName)}
                  </div>
                  <span className="text-xs font-bold text-stone-200">{mission.title}</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  +{mission.xpReward} XP
                </span>
              </div>
              <p className="text-[11px] text-stone-400 line-clamp-1 mb-2 pl-9">{mission.description}</p>
              {/* Progress Bar */}
              <div className="pl-9 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      mission.completed ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, (mission.progress / mission.target) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-stone-400">
                  {mission.progress}/{mission.target}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum Sectors Map */}
      <div className="space-y-8">
        {sectors.map((sector, sIdx) => (
          <div key={sector.id} className="relative">
            {/* Sector Header Banner */}
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-md mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                    Tactical Sector {sIdx + 1}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-stone-100">{sector.title}</h2>
                  <p className="text-xs text-stone-400 mt-0.5">{sector.subtitle}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-stone-800 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono">
                  S{sIdx + 1}
                </div>
              </div>
            </div>

            {/* Stepping Path Nodes */}
            <div className="relative flex flex-col items-center gap-6">
              {/* Vertical connector line */}
              <div className="absolute top-4 bottom-4 w-1 bg-stone-800 rounded-full -z-0"></div>

              {sector.nodes.map((node, nIdx) => {
                const isLeft = nIdx % 2 === 0;
                const offsetClass = isLeft ? 'sm:-translate-x-12' : 'sm:translate-x-12';

                return (
                  <div
                    key={node.id}
                    className={`relative z-10 flex flex-col items-center ${offsetClass}`}
                  >
                    {/* Node Button */}
                    <button
                      disabled={!node.isUnlocked}
                      onClick={() => {
                        sounds.playClick();
                        onSelectNode(node);
                      }}
                      className={`relative w-20 h-20 rounded-3xl border-2 flex flex-col items-center justify-center transition-all duration-300 shadow-xl group ${
                        node.isBoss
                          ? 'border-rose-500 bg-stone-900 hover:bg-rose-950/40 text-rose-300 shadow-rose-950/40'
                          : node.isCompleted
                          ? 'border-emerald-500 bg-stone-900 hover:bg-emerald-950/40 text-emerald-300 shadow-emerald-950/40'
                          : node.isUnlocked
                          ? 'border-amber-500 bg-stone-900 hover:bg-amber-950/40 text-amber-300 shadow-amber-950/40 animate-pulse'
                          : 'border-stone-800 bg-stone-950 text-stone-600 cursor-not-allowed'
                      } active:scale-95`}
                    >
                      {/* Node Icon */}
                      {node.isBoss ? (
                        <ShieldAlert className="w-8 h-8 group-hover:scale-110 transition-transform" />
                      ) : node.isCompleted ? (
                        <Award className="w-8 h-8 group-hover:scale-110 transition-transform text-emerald-400" />
                      ) : node.isUnlocked ? (
                        <Play className="w-7 h-7 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
                      ) : (
                        <Lock className="w-6 h-6 text-stone-600" />
                      )}

                      {/* Stars count */}
                      {node.isUnlocked && !node.isBoss && (
                        <div className="flex gap-0.5 mt-1">
                          {[1, 2, 3].map((star) => (
                            <Star
                              key={star}
                              className={`w-2.5 h-2.5 ${
                                star <= node.starsEarned
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-stone-700'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>

                    {/* Node Label Capsule */}
                    <div className="mt-2 text-center max-w-[180px]">
                      <div className="text-xs font-bold text-stone-200 line-clamp-1">{node.title}</div>
                      <div className="text-[10px] font-mono text-stone-400 flex items-center justify-center gap-1.5 mt-0.5">
                        <span className="px-1.5 py-0.2 rounded bg-stone-800 text-amber-300">
                          +{node.xpReward} XP
                        </span>
                        <span>Level {node.level}</span>
                      </div>
                    </div>
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
