import React from 'react';
import {
  Play,
  RotateCcw,
} from 'lucide-react';
import { GameState, PresidentialRecord } from '../types';

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
  const hasActiveGame = gameState.currentMonth > 1 || gameState.pastDecisions.length > 0;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100 flex flex-col justify-between overflow-hidden">
      {/* Subtle Background Pattern & Presidential Crest glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-transparent to-black pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Navigation Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-900 border border-emerald-400/40 flex items-center justify-center shadow-lg shadow-emerald-950/50">
            <span className="font-cinzel font-black text-amber-300 text-xl tracking-wider">NG</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 font-bold">
                Federal Republic of Nigeria
              </span>
            </div>
            <h1 className="font-cinzel text-xl sm:text-2xl font-bold tracking-tight text-neutral-100">
              Aso Rock: Full Mandate
            </h1>
          </div>
        </div>
      </header>

      {/* Main Center Hero Section */}
      <main className="relative z-10 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col items-center text-center">
        <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-100 tracking-tight max-w-4xl leading-tight">
          Assume the Commander-in-Chief's Desk
        </h2>
        <p className="mt-4 text-neutral-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
          Balance oil revenues, regional factions, national assembly power brokers, and emergency crises.
          Every decree reverberates across 36 states and 220 million citizens.
        </p>

        {/* Primary Action Buttons - Unity Controller Style */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg">
          {hasActiveGame ? (
            <button
              onClick={onResumeMandate}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-emerald-950/60 border-2 border-emerald-400/40 transition-all hover:scale-[1.02] active:scale-95 group"
            >
              <Play className="w-5 h-5 fill-white transition-transform group-hover:scale-110" />
              <span>Resume Mandate (Month {gameState.currentMonth})</span>
            </button>
          ) : (
            <button
              onClick={onStartNewCampaign}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-emerald-950/60 border-2 border-emerald-400/40 transition-all hover:scale-[1.02] active:scale-95 group"
            >
              <Play className="w-5 h-5 fill-white transition-transform group-hover:scale-110" />
              <span>Inaugurate New Presidency</span>
            </button>
          )}

          {hasActiveGame && (
            <button
              onClick={onStartNewCampaign}
              className="w-full sm:w-auto py-4 px-6 rounded-2xl border-2 border-neutral-700 hover:border-neutral-500 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <RotateCcw className="w-5 h-5 text-neutral-400" />
              <span>Restart</span>
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
