import React from 'react';
import { FactionState, FactionId } from '../types';
import {
  Users,
  Flag,
  Landmark,
  FileSpreadsheet,
  Newspaper,
  Zap,
  Coins,
  AlertTriangle,
  Volume2,
  VolumeX,
  ScrollText,
  BookOpen,
  Briefcase,
  Compass,
  ShoppingBag,
  Home,
  Sparkles,
  Award,
} from 'lucide-react';
import { isMuted, toggleAudioMute } from '../utils/audio';

interface PresidentialBriefingProps {
  currentMonth: number;
  maxMonths: number;
  politicalCapital: number;
  treasuryBillionNaira: number;
  factions: Record<FactionId, FactionState>;
  presidentName: string;
  partyName: string;
  archetypeName?: string;
  vipUnlocked?: boolean;
  onOpenExecutiveActions: () => void;
  onOpenCabinetDossier: () => void;
  onOpenPromises: () => void;
  onOpenNewspaper: () => void;
  onOpenArchive: () => void;
  onOpenGeopoliticalMap: () => void;
  onReturnToTitle: () => void;
  unreadHeadlinesCount?: number;
}

const FACTION_ICONS: Record<FactionId, React.ReactNode> = {
  public: <Users className="w-5 h-5 text-emerald-400" />,
  party: <Flag className="w-5 h-5 text-amber-400" />,
  governors: <Landmark className="w-5 h-5 text-sky-400" />,
  assembly: <FileSpreadsheet className="w-5 h-5 text-purple-400" />,
  media: <Newspaper className="w-5 h-5 text-rose-400" />,
};

export const PresidentialBriefing: React.FC<PresidentialBriefingProps> = ({
  currentMonth,
  maxMonths,
  politicalCapital,
  treasuryBillionNaira,
  factions,
  presidentName,
  partyName,
  archetypeName,
  vipUnlocked = false,
  onOpenExecutiveActions,
  onOpenCabinetDossier,
  onOpenPromises,
  onOpenNewspaper,
  onOpenArchive,
  onOpenGeopoliticalMap,
  onReturnToTitle,
  unreadHeadlinesCount = 0,
}) => {
  const [muted, setMuted] = React.useState(isMuted());

  const handleToggleMute = () => {
    const next = toggleAudioMute();
    setMuted(next);
  };

  const treasuryFormatted =
    treasuryBillionNaira >= 1000
      ? `₦${(treasuryBillionNaira / 1000).toFixed(2)} Trillion`
      : `₦${treasuryBillionNaira.toLocaleString()} Billion`;

  // Check for any active systemic hostility
  const hostileFactions = Object.values(factions).filter((f) => f.isHostile || f.value < 22);

  return (
    <header className="bg-neutral-900 border-b border-neutral-800 shadow-2xl sticky top-0 z-30">
      {/* Top Crest Bar */}
      <div className="bg-neutral-950 px-4 sm:px-6 py-2.5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToTitle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 transition-colors font-semibold text-xs sm:text-sm active:scale-95"
            title="Return to Main Title Screen"
          >
            <Home className="w-4 h-4 text-emerald-400" />
            <span>Title Menu</span>
          </button>

          <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center font-bold text-emerald-400 text-sm shadow-inner">
            🇳🇬
          </div>
          <div>
            <span className="font-cinzel tracking-wider text-neutral-200 font-bold uppercase text-xs sm:text-sm">
              Federal Republic of Nigeria
            </span>
            <span className="hidden sm:inline text-neutral-600 mx-2">•</span>
            <span className="hidden sm:inline text-neutral-300 font-medium text-xs sm:text-sm">Aso Rock Villa Command</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {archetypeName && (
            <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 font-mono font-bold hidden md:inline">
              {archetypeName}
            </span>
          )}

          {vipUnlocked && (
            <span className="text-xs px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> VIP Pass Active
            </span>
          )}

          <div className="text-right hidden md:block">
            <span className="text-neutral-200 font-bold text-sm">{presidentName}</span>
            <span className="text-neutral-500 mx-2">•</span>
            <span className="text-emerald-400 font-bold text-sm">{partyName}</span>
          </div>

          <button
            onClick={handleToggleMute}
            aria-label={muted ? 'Unmute procedural audio' : 'Mute audio'}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-neutral-600 text-neutral-300 hover:text-white transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Main Command Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center">
          {/* Calendar & Vital Resources */}
          <div className="lg:col-span-4 flex flex-wrap items-center justify-between sm:justify-start gap-3">
            {/* Month indicator */}
            <div className="bg-neutral-950 px-4 py-2.5 rounded-xl border border-neutral-800 flex items-center gap-3.5 shadow-inner">
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-neutral-400">Term Calendar</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-cinzel text-2xl font-black text-emerald-400">Month {currentMonth}</span>
                  <span className="text-sm text-neutral-400 font-mono font-bold">/ {maxMonths}</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-full border-2 border-emerald-500/40 flex items-center justify-center font-mono text-sm text-neutral-200 font-black bg-neutral-900 shadow">
                {Math.round((currentMonth / maxMonths) * 100)}%
              </div>
            </div>

            {/* Political Capital */}
            <button
              onClick={onOpenExecutiveActions}
              className="group text-left bg-gradient-to-r from-amber-950/60 to-neutral-950 px-4 py-2.5 rounded-xl border-2 border-amber-500/40 hover:border-amber-400 transition-all shadow-md active:scale-95"
              title="Click to exercise presidential executive decrees and powers"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400/40 animate-pulse" />
                  Political Capital
                </span>
                <span className="text-xs bg-amber-950 border border-amber-500/50 text-amber-300 px-2 py-0.5 rounded font-mono font-bold group-hover:bg-amber-900/80">
                  DECREE
                </span>
              </div>
              <p className="text-2xl font-black font-mono text-amber-300">{politicalCapital} <span className="text-sm font-sans font-semibold text-neutral-400">PC</span></p>
            </button>

            {/* National Treasury */}
            <div className="bg-neutral-950 px-4 py-2.5 rounded-xl border border-neutral-800 shadow-inner">
              <span className="text-xs uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-emerald-400" />
                Treasury Reserve
              </span>
              <p className="text-base font-bold font-mono text-emerald-300 mt-0.5">{treasuryFormatted}</p>
            </div>
          </div>

          {/* The 5 Factions Real-Time Gauges */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {(Object.keys(factions) as FactionId[]).map((fKey) => {
              const fac = factions[fKey];
              const isUnderPressure = fac.value < 25;
              const isStrong = fac.value >= 60;

              return (
                <div
                  key={fac.id}
                  className={`px-3 py-2.5 rounded-xl border-2 transition-all shadow-md ${
                    isUnderPressure
                      ? 'bg-rose-950/60 border-rose-600 shadow-rose-950/60'
                      : 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-1.5 font-bold text-neutral-200 truncate" title={fac.name}>
                      {FACTION_ICONS[fac.id]}
                      <span className="uppercase text-xs tracking-wider">{fac.name}</span>
                    </span>
                    <span
                      className={`font-mono text-base font-black ${
                        isUnderPressure ? 'text-rose-400 animate-pulse' : isStrong ? 'text-emerald-400' : 'text-neutral-100'
                      }`}
                    >
                      {fac.value}%
                    </span>
                  </div>

                  {/* Meter bar */}
                  <div className="w-full bg-neutral-900 rounded-full h-2.5 overflow-hidden border border-neutral-800">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isUnderPressure
                          ? 'bg-rose-500'
                          : isStrong
                          ? 'bg-emerald-500'
                          : 'bg-amber-400'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(4, fac.value))}%` }}
                    />
                  </div>

                  {/* Status Indicator */}
                  <div className="mt-1.5 flex items-center justify-between text-xs font-bold">
                    <span>
                      {isUnderPressure ? (
                        <span className="text-rose-400 uppercase">REVOLT!</span>
                      ) : fac.value >= 70 ? (
                        <span className="text-emerald-400">Allied</span>
                      ) : (
                        <span className="text-neutral-400 font-medium">Stable</span>
                      )}
                    </span>
                    <span className={fac.trend === 'up' ? 'text-emerald-400' : fac.trend === 'down' ? 'text-rose-400' : 'text-neutral-500'}>
                      {fac.trend === 'up' ? '▲ Up' : fac.trend === 'down' ? '▼ Down' : '― Steady'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Warning notification banner if any faction is Hostile */}
        {hostileFactions.length > 0 && (
          <div className="mt-3 bg-rose-950/80 border-2 border-rose-600 text-rose-100 px-4 py-2.5 rounded-xl flex items-center justify-between text-sm shadow-xl animate-pulse">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>
                <strong className="font-bold text-rose-200 uppercase tracking-wide">Emergency Warning:</strong>{' '}
                {hostileFactions.map((f) => f.name).join(', ')}{' '}
                {hostileFactions.length === 1 ? 'is' : 'are'} in open revolt!{' '}
                {hostileFactions[0]?.hostileConsequence}
              </span>
            </div>
            <button
              onClick={onOpenExecutiveActions}
              className="shrink-0 ml-3 px-3 py-1 bg-rose-700 hover:bg-rose-600 text-white font-bold rounded-lg text-xs uppercase tracking-wider shadow"
            >
              Quash Revolt
            </button>
          </div>
        )}

        {/* Tactical Navigation Strip (Clean & Focused) */}
        <div className="mt-3.5 pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenCabinetDossier}
              className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700 hover:border-neutral-600 flex items-center gap-2 transition-all font-semibold text-xs sm:text-sm active:scale-95 shadow-sm"
            >
              <Briefcase className="w-4 h-4 text-sky-400" />
              <span>Cabinet Dossier (10)</span>
            </button>

            <button
              onClick={onOpenPromises}
              className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700 hover:border-neutral-600 flex items-center gap-2 transition-all font-semibold text-xs sm:text-sm active:scale-95 shadow-sm"
            >
              <ScrollText className="w-4 h-4 text-amber-400" />
              <span>Promise Ledger</span>
            </button>

            <button
              onClick={onOpenNewspaper}
              className="relative px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700 hover:border-neutral-600 flex items-center gap-2 transition-all font-semibold text-xs sm:text-sm active:scale-95 shadow-sm"
            >
              <Newspaper className="w-4 h-4 text-rose-400" />
              <span>Daily Mandate</span>
              {unreadHeadlinesCount > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping absolute -top-1 -right-1" />
              )}
            </button>

            <button
              onClick={onOpenGeopoliticalMap}
              className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700 hover:border-neutral-600 flex items-center gap-2 transition-all font-semibold text-xs sm:text-sm active:scale-95 shadow-sm"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Geopolitical Radar</span>
            </button>

            <button
              onClick={onOpenArchive}
              className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700 hover:border-neutral-600 flex items-center gap-2 transition-all font-semibold text-xs sm:text-sm active:scale-95 shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-neutral-300" />
              <span>Archives</span>
            </button>
          </div>

          <button
            onClick={onOpenExecutiveActions}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black flex items-center gap-2 shadow-lg transition-all text-xs sm:text-sm active:scale-95"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Executive Decrees</span>
          </button>
        </div>
      </div>
    </header>
  );
};
