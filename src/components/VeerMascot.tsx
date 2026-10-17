import React from 'react';

export type MascotMood = 'salute' | 'motivate' | 'analyzing' | 'debrief' | 'idle' | 'warning';

interface VeerMascotProps {
  mood?: MascotMood;
  speechText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  className?: string;
}

export const VeerMascot: React.FC<VeerMascotProps> = ({
  mood = 'idle',
  speechText,
  size = 'md',
  onClick,
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-14 h-14',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44'
  };

  return (
    <div className={`relative flex items-center select-none ${className}`}>
      {/* Speech Bubble if present */}
      {speechText && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 animate-bounce duration-1000">
          <div className="bg-stone-900/95 border border-amber-500/50 shadow-lg shadow-amber-500/10 text-amber-200 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{speechText}</span>
          </div>
          <div className="w-2 h-2 bg-stone-900 border-r border-b border-amber-500/50 rotate-45 mx-auto -mt-1"></div>
        </div>
      )}

      {/* Mascot Graphic */}
      <div
        onClick={onClick}
        className={`${sizeMap[size]} relative cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95`}
        title="Major Veer Singh (Veer AI - Defence Mentor)"
      >
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tactical Aura Glow */}
          <circle
            cx="80"
            cy="80"
            r="72"
            fill="url(#tacticalGlow)"
            className="opacity-70 group-hover:opacity-100 transition-opacity"
          />

          {/* Torso - Military Olive Drab Uniform */}
          <path
            d="M36 148 C36 120, 52 108, 80 108 C108 108, 124 120, 124 148 L36 148 Z"
            fill="#3a4b35"
          />
          {/* Uniform Collar */}
          <path d="M60 108 L80 126 L100 108" fill="#2d3b29" stroke="#4c6246" strokeWidth="2" />
          {/* Tie / Inner Camo */}
          <path d="M76 122 L84 122 L82 142 L78 142 Z" fill="#1c2519" />

          {/* Gallantry Ribbon Bar on Chest */}
          <g transform="translate(48, 128)">
            <rect x="0" y="0" width="8" height="4" fill="#f59e0b" rx="1" />
            <rect x="9" y="0" width="8" height="4" fill="#ef4444" rx="1" />
            <rect x="18" y="0" width="8" height="4" fill="#3b82f6" rx="1" />
          </g>

          {/* Indian Tiranga Shoulder Patch */}
          <g transform="translate(112, 124)">
            <rect x="0" y="0" width="8" height="2" fill="#ff9933" />
            <rect x="0" y="2" width="8" height="2" fill="#ffffff" />
            <rect x="0" y="4" width="8" height="2" fill="#138808" />
          </g>

          {/* Neck */}
          <path d="M70 94 L90 94 L88 112 L72 112 Z" fill="#e2b08a" />

          {/* Head */}
          <ellipse cx="80" cy="74" rx="26" ry="28" fill="#e8b993" />

          {/* Ears */}
          <circle cx="53" cy="74" r="6" fill="#dfaa83" />
          <circle cx="107" cy="74" r="6" fill="#dfaa83" />

          {/* Military Maroon/Olive Beret */}
          <path
            d="M50 56 C50 40, 70 28, 98 32 C116 35, 120 48, 114 58 C110 65, 96 66, 50 56 Z"
            fill={mood === 'warning' ? '#b91c1c' : '#881337'}
          />
          {/* Beret Band */}
          <path
            d="M52 56 C62 58, 98 62, 114 58"
            stroke="#1c1917"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Golden Army Crest on Beret */}
          <g transform="translate(68, 40)">
            <circle cx="6" cy="6" r="5" fill="#f59e0b" />
            <path d="M6 3 L7 5 L9 6 L7 7 L6 9 L5 7 L3 6 L5 5 Z" fill="#78350f" />
          </g>

          {/* Tactical Aviator Visor / Sunglasses */}
          <g className="cursor-pointer">
            <path
              d="M58 66 C58 62, 74 62, 77 66 L77 75 C77 79, 60 79, 58 75 Z"
              fill="#111827"
              stroke="#475569"
              strokeWidth="1.5"
            />
            <path
              d="M83 66 C86 62, 102 62, 102 66 L102 75 C102 79, 85 79, 83 75 Z"
              fill="#111827"
              stroke="#475569"
              strokeWidth="1.5"
            />
            <line x1="77" y1="67" x2="83" y2="67" stroke="#475569" strokeWidth="2" />
            {/* Blue Radar Scanning Reflection */}
            <line
              x1="62"
              y1="68"
              x2="73"
              y2="73"
              stroke={mood === 'analyzing' ? '#38bdf8' : '#64748b'}
              strokeWidth="1.5"
              strokeLinecap="round"
              className={mood === 'analyzing' ? 'animate-pulse' : ''}
            />
            <line
              x1="87"
              y1="68"
              x2="98"
              y2="73"
              stroke={mood === 'analyzing' ? '#38bdf8' : '#64748b'}
              strokeWidth="1.5"
              strokeLinecap="round"
              className={mood === 'analyzing' ? 'animate-pulse' : ''}
            />
          </g>

          {/* Confident Cadet Moustache */}
          <path
            d="M68 83 C74 81, 78 83, 80 84 C82 83, 86 81, 92 83 C88 86, 72 86, 68 83 Z"
            fill="#292524"
          />

          {/* Mouth */}
          {mood === 'motivate' || mood === 'salute' ? (
            <path d="M73 88 C76 92, 84 92, 87 88" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          ) : mood === 'warning' ? (
            <path d="M74 90 L86 90" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M74 88 C77 90, 83 90, 86 88" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
          )}

          {/* Arms / Hand Pose depending on Mood */}
          {mood === 'salute' ? (
            /* Smart Right Hand Salute to Beret */
            <g transform="translate(100, 48)">
              <path
                d="M12 70 L26 44 L20 18 L12 12"
                stroke="#e8b993"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 70 L26 44 L20 18"
                stroke="#3a4b35"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* White ceremonial glove or saluting hand */}
              <circle cx="12" cy="12" r="6" fill="#e8b993" />
            </g>
          ) : mood === 'motivate' ? (
            /* Thumbs Up Hand */
            <g transform="translate(118, 98)">
              <rect x="0" y="8" width="14" height="12" rx="4" fill="#e8b993" />
              {/* Thumb pointing up */}
              <rect x="2" y="0" width="5" height="10" rx="2.5" fill="#e8b993" />
            </g>
          ) : mood === 'analyzing' ? (
            /* Radar Hologram Disc hovering */
            <g transform="translate(20, 80)">
              <circle cx="12" cy="12" r="10" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" className="animate-spin" />
              <circle cx="12" cy="12" r="4" fill="#38bdf8" className="animate-ping" />
            </g>
          ) : null}

          {/* Gradients */}
          <defs>
            <radialGradient id="tacticalGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.18" />
              <stop offset="70%" stopColor="#15803d" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Live Status indicator dot */}
        <span className="absolute bottom-1 right-2 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-stone-900"></span>
        </span>
      </div>
    </div>
  );
};
