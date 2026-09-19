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
  onOpenStore: () => void;
  onReturnToTitle: () => void;
  unreadHeadlinesCount?: number;
}

const FACTION_ICONS: Record<FactionId, React.ReactNode> = {
  public: <Users className="w-4 h-4 text-emerald-400" />,
  party: <Flag className="w-4 h-4 text-amber-400" />,
  governors: <Landmark className="w-4 h-4 text-sky-400" />,
  assembly: <FileSpreadsheet className="w-4 h-4 text-purple-400" />,
  media: <Newspaper className="w-4 h-4 text-rose-400" />,
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
  onOpenStore,
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
      <div className="bg-neutral-950 px-4 py-2 border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToTitle}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800 transition-colors"
            title="Return to Main Title Screen"
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-[11px]">Menu</span>
          </button>

          <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-[10px] tracking-wider shadow-inner">
            🇳🇬
          </div>
          <div>
            <span className="font-cinzel tracking-wider text-neutral-300 font-semibold uppercase">
              Federal Republic of Nigeria
            </span>
            <span className="hidden sm:inline text-neutral-600 mx-2">•</span>
            <span className="hidden sm:inline text-neutral-400">The Presidency, Aso Rock Villa</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {archetypeName && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-700/50 text-emerald-300 font-mono hidden md:inline">
              {archetypeName}
            </span>
          )}

          {vipUnlocked && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> VIP Pass
            </span>
          )}

          <div className="text-right hidden md:block">
            <span className="text-neutral-400 font-medium">{presidentName}</span>
            <span className="text-neutral-600 mx-1.5">•</span>
            <span className="text-emerald-500 font-semibold">{partyName}</span>
          </div>

          <button
            onClick={handleToggleMute}
            aria-label={muted ? 'Unmute procedural audio' : 'Mute audio'}
            className="p-1.5 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Main Command Status Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* Calendar & Vital Resources */}
          <div className="lg:col-span-4 flex flex-wrap items-center justify-between sm:justify-start gap-4">
            {/* Month indicator */}
            <div className="bg-neutral-950/80 px-3.5 py-2 rounded-lg border border-neutral-800 flex items-center gap-3">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Mandate Calendar</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-cinzel text-xl font-bold text-emerald-400">Month {currentMonth}</span>
                  <span className="text-xs text-neutral-400 font-mono">/ {maxMonths}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-emerald-500/30 flex items-center justify-center font-mono text-xs text-neutral-300 font-bold bg-neutral-900">
                {Math.round((currentMonth / maxMonths) * 100)}%
              </div>
            </div>

            {/* Political Capital */}
            <button
              onClick={onOpenExecutiveActions}
              className="group text-left bg-gradient-to-r from-amber-950/40 to-neutral-950 px-3.5 py-2 rounded-lg border border-amber-500/30 hover:border-amber-400/70 transition-all shadow-sm"
              title="Click to exercise presidential executive actions"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400 fill-amber-400/40 animate-pulse" />
                  Political Capital
                </span>
                <span className="text-[9px] bg-amber-950/80 border border-amber-500/40 text-amber-300 px-1.5 py-0.5 rounded font-mono group-hover:bg-amber-900/60">
                  Act
                </span>
              </div>
              <p className="text-xl font-bold font-mono text-amber-200">{politicalCapital} <span className="text-xs font-sans text-neutral-400">PC</span></p>
            </button>

            {/* National Treasury */}
            <div className="bg-neutral-950/80 px-3.5 py-2 rounded-lg border border-neutral-800">
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1">
                <Coins className="w-3 h-3 text-emerald-400" />
                Treasury Reserve
              </span>
              <p className="text-sm font-bold font-mono text-emerald-300 mt-0.5">{treasuryFormatted}</p>
            </div>
          </div>

          {/* The 5 Factions Real-Time Gauges */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-5 gap-2">
            {(Object.keys(factions) as FactionId[]).map((fKey) => {
              const fac = factions[fKey];
              const isUnderPressure = fac.value < 25;
              const isStrong = fac.value >= 60;

              return (
                <div
                  key={fac.id}
                  className={`px-2.5 py-2 rounded-lg border transition-all ${
                    isUnderPressure
                      ? 'bg-rose-950/40 border-rose-600/70 shadow-rose-950/40 shadow-md'
                      : 'bg-neutral-950/60 border-neutral-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="flex items-center gap-1 font-semibold text-neutral-300 truncate" title={fac.name}>
                      {FACTION_ICONS[fac.id]}
                      <span className="uppercase text-[11px] font-sans tracking-wide">{fac.name}</span>
                    </span>
                    <span
                      className={`font-mono text-xs font-bold ${
                        isUnderPressure ? 'text-rose-400' : isStrong ? 'text-emerald-400' : 'text-neutral-200'
                      }`}
                    >
                      {fac.value}
                    </span>
                  </div>

                  {/* Meter bar */}
                  <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden border border-neutral-800">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isUnderPressure
                          ? 'bg-rose-500'
                          : isStrong
                          ? 'bg-emerald-500'
                          : 'bg-amber-400'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(2, fac.value))}%` }}
                    />
                  </div>

                  {/* Mini status hint */}
                  <div className="mt-1 flex items-center justify-between text-[9px] text-neutral-400 font-medium">
                    <span>
                      {isUnderPressure ? (
                        <span className="text-rose-400 font-bold animate-pulse">HOSTILE</span>
                      ) : fac.value >= 70 ? (
                        <span className="text-emerald-400">Allied</span>
                      ) : (
                        'Neutral'
                      )}
                    </span>
                    <span className="text-neutral-400">
                      {fac.trend === 'up' ? '▲' : fac.trend === 'down' ? '▼' : '―'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Warning notification banner if any faction is Hostile */}
        {hostileFactions.length > 0 && (
          <div className="mt-2.5 bg-rose-950/70 border border-rose-600/70 text-rose-200 px-3 py-1.5 rounded-lg flex items-center justify-between text-xs animate-pulse">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong className="font-bold text-rose-300">Systemic Hostility Alert:</strong>{' '}
                {hostileFactions.map((f) => f.name).join(', ')}{' '}
                {hostileFactions.length === 1 ? 'has' : 'have'} broken into revolt!{' '}
                {hostileFactions[0]?.hostileConsequence}
              </span>
            </div>
            <button
              onClick={onOpenExecutiveActions}
              className="shrink-0 ml-2 px-2 py-0.5 bg-rose-900 hover:bg-rose-800 text-rose-100 font-semibold rounded text-[10px] uppercase tracking-wider"
            >
              Deploy Capital
            </button>
          </div>
        )}

        {/* Navigation Quick Dossier Strip */}
        <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={onOpenCabinetDossier}
              className="px-3 py-1.5 rounded-md bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/70 hover:border-neutral-600 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Briefcase className="w-3.5 h-3.5 text-sky-400" />
              <span>Cabinet Dossier (10)</span>
            </button>

            <button
              onClick={onOpenPromises}
              className="px-3 py-1.5 rounded-md bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/70 hover:border-neutral-600 flex items-center gap-1.5 transition-colors font-medium"
            >
              <ScrollText className="w-3.5 h-3.5 text-amber-400" />
              <span>Promise Ledger</span>
            </button>

            <button
              onClick={onOpenNewspaper}
              className="relative px-3 py-1.5 rounded-md bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/70 hover:border-neutral-600 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Newspaper className="w-3.5 h-3.5 text-rose-400" />
              <span>Daily Mandate</span>
              {unreadHeadlinesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute -top-0.5 -right-0.5" />
              )}
            </button>

            <button
              onClick={onOpenGeopoliticalMap}
              className="px-3 py-1.5 rounded-md bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/70 hover:border-neutral-600 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Geopolitical Radar</span>
            </button>

            <button
              onClick={onOpenArchive}
              className="px-3 py-1.5 rounded-md bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/70 hover:border-neutral-600 flex items-center gap-1.5 transition-colors font-medium"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Archive</span>
            </button>

            <button
              onClick={onOpenStore}
              className="px-3 py-1.5 rounded-md bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-700/50 flex items-center gap-1.5 transition-colors font-semibold"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>VIP Store</span>
            </button>
          </div>

          <button
            onClick={onOpenExecutiveActions}
            className="px-3.5 py-1.5 rounded-md bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold flex items-center gap-1.5 shadow-md transition-all text-xs"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Executive Action (-PC)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
