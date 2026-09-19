import React from 'react';
import {
  Play,
  RotateCcw,
  ShoppingBag,
  Award,
  Compass,
  Volume2,
  VolumeX,
  Briefcase,
  Flame,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { GameState, PresidentialRecord } from '../types';
import { isMuted, toggleAudioMute, playGavelKnock, playTriumphChime } from '../utils/audio';

interface TitleScreenProps {
  gameState: GameState;
  archive: PresidentialRecord[];
  onStartNewCampaign: () => void;
  onResumeMandate: () => void;
  onOpenStore: () => void;
  onOpenArchive: () => void;
  onOpenGeopoliticalMap: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  gameState,
  archive,
  onStartNewCampaign,
  onResumeMandate,
  onOpenStore,
  onOpenArchive,
  onOpenGeopoliticalMap,
}) => {
  const [muted, setMuted] = React.useState(isMuted());
  const hasActiveGame = gameState.currentMonth > 1 || gameState.pastDecisions.length > 0;

  const handleToggleSound = () => {
    const next = toggleAudioMute();
    setMuted(next);
    if (!next) {
      playGavelKnock();
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100 flex flex-col justify-between overflow-hidden">
      {/* Subtle Background Pattern & Presidential Crest glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-transparent to-black pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Navigation Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-900 border border-emerald-400/40 flex items-center justify-center shadow-lg shadow-emerald-950/50">
            <span className="font-cinzel font-black text-amber-300 text-lg tracking-wider">NG</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400 font-semibold">
                Federal Republic of Nigeria
              </span>
            </div>
            <h1 className="font-cinzel text-lg sm:text-xl font-bold tracking-tight text-neutral-100">
              Aso Rock: Full Mandate
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSound}
            className="p-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 transition-colors flex items-center gap-1.5 text-xs"
            title={muted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span className="hidden sm:inline font-mono">{muted ? 'Muted' : 'Audio On'}</span>
          </button>

          <button
            onClick={onOpenStore}
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-950/30 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>VIP Store & DLCs</span>
          </button>
        </div>
      </header>

      {/* Main Center Hero Section */}
      <main className="relative z-10 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col items-center text-center">
        <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-neutral-100 tracking-tight max-w-3xl leading-tight">
          Assume the Commander-in-Chief's Desk
        </h2>
        <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
          Balance oil revenues, regional factions, national assembly power brokers, and emergency crises.
          Every decree reverberates across 36 states and 220 million citizens.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          {hasActiveGame ? (
            <button
              onClick={onResumeMandate}
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all group"
            >
              <Play className="w-4 h-4 fill-white transition-transform group-hover:scale-110" />
              <span>Resume Active Mandate (Month {gameState.currentMonth})</span>
            </button>
          ) : (
            <button
              onClick={onStartNewCampaign}
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all group"
            >
              <Play className="w-4 h-4 fill-white transition-transform group-hover:scale-110" />
              <span>Inaugurate New Presidency</span>
            </button>
          )}

          <button
            onClick={onStartNewCampaign}
            className={`w-full sm:w-auto py-3.5 px-5 rounded-xl border border-neutral-700 hover:border-neutral-500 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              !hasActiveGame ? 'hidden' : ''
            }`}
          >
            <RotateCcw className="w-4 h-4 text-neutral-400" />
            <span>New Mandate</span>
          </button>
        </div>

        {/* Quick Menu Grid Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
          {/* Card 1: Geopolitical Radar */}
          <button
            onClick={onOpenGeopoliticalMap}
            className="p-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-neutral-700 text-left transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400 mb-2.5 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-neutral-200 group-hover:text-white flex items-center justify-between">
              Geopolitical Radar
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
            </h4>
            <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
              Inspect stability, trade corridors, and security alerts across Nigeria’s 6 zones.
            </p>
          </button>

          {/* Card 2: Presidential VIP Store */}
          <button
            onClick={onOpenStore}
            className="p-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-amber-900/30 hover:border-amber-700/50 text-left transition-all group relative overflow-hidden"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 mb-2.5 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-amber-300 group-hover:text-amber-200 flex items-center justify-between">
              VIP Store & DLCs
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5" />
            </h4>
            <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
              Unlock 1999 Historic Scenario, Third Term expansion, and Intelligence Radar.
            </p>
          </button>

          {/* Card 3: Hall of Presidents */}
          <button
            onClick={onOpenArchive}
            className="p-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 hover:border-neutral-700 text-left transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-950 border border-neutral-700 flex items-center justify-center text-neutral-300 mb-2.5 group-hover:scale-105 transition-transform">
              <Award className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-neutral-200 group-hover:text-white flex items-center justify-between">
              Hall of Presidents
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 font-mono">
                {archive.length} Runs
              </span>
            </h4>
            <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
              Review all past administrations, export/import career records, and legacy rankings.
            </p>
          </button>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 border-t border-neutral-900 bg-neutral-950/80 px-4 py-3 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>Aso Rock: Full Mandate • v2.0 Complete Strategy Game</span>
          <span className="font-mono text-[11px] text-neutral-400">
            Active President: {gameState.presidentName} ({gameState.partyName})
          </span>
        </div>
      </footer>
    </div>
  );
};
