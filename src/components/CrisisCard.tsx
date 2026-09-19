import React, { useState, useEffect, useRef } from 'react';
import { Crisis, CrisisChoice, Character } from '../types';
import {
  AlertOctagon,
  Clock,
  Briefcase,
  TrendingUp,
  TrendingDown,
  Coins,
  Zap,
  Flame,
  PhoneCall,
  CheckCircle2,
  FileCheck,
  ShieldAlert,
  Sparkles,
  Award,
} from 'lucide-react';
import { playDecisionStamp, playSealStampThud, playAlertTone, playPhoneTone } from '../utils/audio';

interface CrisisCardProps {
  crisis: Crisis;
  reporter?: Character;
  politicalCapital: number;
  onSelectChoice: (choice: CrisisChoice) => void;
  timerEnabled?: boolean;
  intelligenceRadarActive?: boolean;
  onOpenPerkStore?: (perkType?: 'capital' | 'radar' | 'treasury') => void;
}

export const CrisisCard: React.FC<CrisisCardProps> = ({
  crisis,
  reporter,
  politicalCapital,
  onSelectChoice,
  timerEnabled = false,
  intelligenceRadarActive = false,
  onOpenPerkStore,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [isTimerPaused, setIsTimerPaused] = useState(!timerEnabled);
  const [hoveredChoice, setHoveredChoice] = useState<CrisisChoice | null>(null);
  const [stampedChoice, setStampedChoice] = useState<CrisisChoice | null>(null);
  const [showChiefHint, setShowChiefHint] = useState(false);
  const hasAutoSelectedRef = useRef(false);

  // Reset timer & state whenever crisis changes
  useEffect(() => {
    setSecondsLeft(30);
    setStampedChoice(null);
    setHoveredChoice(null);
    setShowChiefHint(false);
    hasAutoSelectedRef.current = false;
    playAlertTone();
  }, [crisis.id]);

  useEffect(() => {
    if (isTimerPaused || stampedChoice) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [crisis.id, isTimerPaused, stampedChoice]);

  // When timer hits 0, auto-select default choice
  useEffect(() => {
    if (secondsLeft === 0 && !hasAutoSelectedRef.current && !isTimerPaused && !stampedChoice) {
      hasAutoSelectedRef.current = true;
      const defaultChoice = crisis.choices[crisis.choices.length - 1];
      if (defaultChoice) {
        handleChoiceClick(defaultChoice);
      }
    }
  }, [secondsLeft, isTimerPaused, crisis.choices, stampedChoice]);

  // Physical Stamp Execution
  const handleChoiceClick = (choice: CrisisChoice) => {
    if (stampedChoice) return; // Prevent double stamp
    setStampedChoice(choice);
    playSealStampThud();

    // After satisfying stamp animation and sound, execute choice
    setTimeout(() => {
      onSelectChoice(choice);
    }, 420);
  };

  // Keyboard Hotkeys: [1], [2], [3], [4], [H] for Hotline, [P] for Perks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        handlePhoneHotline();
        return;
      }

      if ((e.key === 'p' || e.key === 'P') && onOpenPerkStore) {
        e.preventDefault();
        onOpenPerkStore();
        return;
      }

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= crisis.choices.length) {
        const targetChoice = crisis.choices[num - 1];
        if (targetChoice && politicalCapital >= (targetChoice.capitalCost || 0)) {
          e.preventDefault();
          handleChoiceClick(targetChoice);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [crisis.choices, politicalCapital, stampedChoice, onOpenPerkStore]);

  const handlePhoneHotline = () => {
    playPhoneTone();
    setShowChiefHint((prev) => !prev);
  };

  const urgencyColor =
    crisis.urgency === 'critical'
      ? 'bg-rose-950 text-rose-200 border-rose-500'
      : crisis.urgency === 'urgent'
      ? 'bg-amber-950 text-amber-200 border-amber-500'
      : 'bg-sky-950 text-sky-200 border-sky-500';

  // Dynamic reaction of advisor when hovering a choice
  const getAdvisorReaction = (choice: CrisisChoice) => {
    if (!reporter) return null;
    const impacts = choice.impact.factions;
    if ((impacts.public || 0) <= -15) {
      return { text: '“Mr. President, the civil backlash will be brutal.”', mood: 'panic' };
    }
    if ((impacts.governors || 0) <= -12) {
      return { text: '“The Governors Forum will unite against Aso Rock on this.”', mood: 'warning' };
    }
    if ((impacts.assembly || 0) <= -15) {
      return { text: '“The Senate and House leaders will stall our entire legislative agenda.”', mood: 'warning' };
    }
    if ((impacts.public || 0) >= 10) {
      return { text: '“The populace will celebrate your boldness on the airwaves.”', mood: 'triumph' };
    }
    if ((choice.impact.treasuryBillion || 0) < -200) {
      return { text: '“Our fiscal deficit will surge—Finance warns of bond rating pressure.”', mood: 'caution' };
    }
    return { text: '“A calculated compromise, Commander-in-Chief.”', mood: 'neutral' };
  };

  const activeReaction = hoveredChoice ? getAdvisorReaction(hoveredChoice) : null;

  return (
    <div className="bg-neutral-900 rounded-3xl border-2 border-neutral-700/80 shadow-2xl overflow-hidden backdrop-blur-md max-w-4xl mx-auto relative transition-all">
      {/* Visual Seal Stamp Overlay when signing */}
      {stampedChoice && (
        <div className="absolute inset-0 z-40 bg-neutral-950/80 backdrop-blur-xs flex items-center justify-center pointer-events-none animate-in zoom-in-150 duration-200">
          <div className="transform -rotate-12 border-4 border-emerald-500 bg-neutral-950/95 text-emerald-400 px-10 py-5 rounded-2xl shadow-2xl flex flex-col items-center justify-center ring-8 ring-emerald-500/20">
            <Award className="w-14 h-14 text-emerald-400 mb-1 animate-bounce" />
            <span className="font-cinzel font-black text-3xl tracking-widest uppercase">
              ORDER GAZETTED
            </span>
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-300 uppercase mt-1">
              Federal Executive Council • Aso Rock Villa
            </span>
          </div>
        </div>
      )}

      {/* Top Dossier Bar - Game Controller HUD Style */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 px-5 sm:px-6 py-4 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-emerald-950 border-2 border-emerald-500/60 text-emerald-300 flex items-center justify-center font-black text-base shadow-inner font-mono">
            #{crisis.number.toString().padStart(2, '0')}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border ${urgencyColor}`}>
                {crisis.urgency}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 bg-neutral-800 px-2.5 py-0.5 rounded border border-neutral-700">
                {crisis.category}
              </span>
              {crisis.isDelayedSpinoff && (
                <span className="text-xs font-bold text-amber-300 bg-amber-950 border border-amber-500/60 px-2.5 py-0.5 rounded flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Consequence Fallout
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-cinzel font-black text-neutral-100 mt-1">
              {crisis.title}
            </h2>
          </div>
        </div>

        {/* Tactile Controls: Hotline & 30s Clock */}
        <div className="flex items-center gap-2.5">
          {/* Secret Phone Hotline */}
          <button
            onClick={handlePhoneHotline}
            className={`px-3 py-2 rounded-xl border-2 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 ${
              showChiefHint
                ? 'bg-rose-950 text-rose-200 border-rose-500 animate-pulse'
                : 'bg-neutral-950 hover:bg-neutral-800 text-neutral-200 border-neutral-700 hover:border-neutral-500'
            }`}
            title="Press [H] to consult Chief of Staff"
          >
            <PhoneCall className="w-4 h-4 text-rose-400" />
            <span>Chief Hotline <kbd className="font-mono text-xs opacity-70">[H]</kbd></span>
          </button>

          {/* 30s Pressure Gauge */}
          <div className="flex items-center gap-2 bg-neutral-950 px-3.5 py-2 rounded-xl border border-neutral-700">
            <Clock className={`w-4 h-4 ${secondsLeft < 10 ? 'text-rose-400 animate-spin' : 'text-neutral-400'}`} />
            <span
              className={`font-mono text-sm font-black ${
                secondsLeft < 10 ? 'text-rose-400 animate-pulse' : 'text-neutral-200'
              }`}
            >
              {secondsLeft}s
            </span>
            <button
              onClick={() => setIsTimerPaused(!isTimerPaused)}
              className="text-xs font-mono font-bold text-neutral-400 hover:text-neutral-200 ml-1 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700"
            >
              {isTimerPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-5">
        {/* Hotline Reveal Box */}
        {showChiefHint && (
          <div className="bg-rose-950/40 border-2 border-rose-500/60 rounded-2xl p-4 flex items-start gap-3.5 animate-in fade-in duration-200 shadow-inner">
            <PhoneCall className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-sm text-rose-100 leading-relaxed font-medium">
              <strong className="text-rose-300 uppercase tracking-wider block mb-1 font-bold text-xs">
                Chief of Staff Private Wire:
              </strong>
              "Weigh your Political Capital carefully, Sir. Spending capital preserves key alliances, but running on empty leaves you helpless when the National Assembly convenes."
            </div>
          </div>
        )}

        {/* Executive Situation Briefing (Clean, high-contrast, larger text) */}
        <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-5 space-y-3.5 shadow-inner">
          <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-2">
            <span className="font-mono text-xs tracking-wider text-emerald-400 uppercase font-bold flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4" />
              EXECUTIVE SITUATION REPORT
            </span>
            <span className="text-xs font-mono text-neutral-400">
              Immediate Presidential Decree Required
            </span>
          </div>

          <p className="text-neutral-100 text-base sm:text-lg leading-relaxed font-normal">
            {crisis.contextDescription}
          </p>

          {/* Reporting Minister Live Feedback */}
          {reporter && (
            <div className="bg-neutral-900 rounded-xl p-3.5 border border-neutral-800 flex items-start gap-3.5 shadow-inner">
              <div className="w-11 h-11 rounded-full bg-emerald-950 border-2 border-emerald-500/50 text-emerald-300 font-black flex items-center justify-center text-sm shrink-0 shadow">
                {reporter.avatarInitials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-neutral-100">{reporter.name}</h4>
                  <span className="text-xs text-neutral-400">• {reporter.role}</span>
                  <span className="text-xs text-neutral-300 font-mono font-semibold">
                    (Loyalty: <strong className="text-emerald-400">{reporter.loyalty}%</strong>)
                  </span>
                </div>

                {/* Character Quote or Live Reaction on Hover */}
                {activeReaction ? (
                  <p className="font-editorial italic text-amber-300 text-sm sm:text-base mt-1 animate-in fade-in duration-150 font-medium">
                    {activeReaction.text}
                  </p>
                ) : (
                  <p className="font-editorial italic text-neutral-200 text-sm sm:text-base mt-1">
                    “{crisis.characterQuote}”
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* State Intelligence Wiretap Perk Banner (Contextual perk access) */}
        {!intelligenceRadarActive && onOpenPerkStore && (
          <div className="bg-gradient-to-r from-amber-950/60 via-neutral-950 to-neutral-950 border border-amber-600/40 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <p className="text-xs sm:text-sm text-amber-200 font-medium">
                Want to foresee hidden minister backstabs and delayed crisis fallout?
              </p>
            </div>
            <button
              onClick={() => onOpenPerkStore('radar')}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Unlock Secret Intel Radar (Perk)</span>
            </button>
          </div>
        )}

        {/* Presidential Determination — Interactive Game Controller Action Cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm uppercase font-bold tracking-wider text-neutral-300 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              Gazette Executive Order — Select Response
            </h3>
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
              Press keys <strong className="text-amber-400 font-bold">[1]</strong>-
              <strong className="text-amber-400 font-bold">[{crisis.choices.length}]</strong> to execute
            </span>
          </div>

          {/* Interactive Response Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {crisis.choices.map((choice, index) => {
              const capitalCost = choice.capitalCost || 0;
              const hasEnoughCapital = politicalCapital >= capitalCost;
              const isHovered = hoveredChoice?.id === choice.id;
              const isSelected = stampedChoice?.id === choice.id;

              return (
                <div
                  key={choice.id}
                  onClick={() => {
                    if (hasEnoughCapital && !stampedChoice) {
                      handleChoiceClick(choice);
                    }
                  }}
                  onMouseEnter={() => setHoveredChoice(choice)}
                  onMouseLeave={() => setHoveredChoice(null)}
                  className={`group text-left p-5 rounded-2xl border-2 transition-all flex flex-col justify-between relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950 border-emerald-400 ring-4 ring-emerald-500/30 shadow-2xl scale-[1.01]'
                      : hasEnoughCapital
                      ? isHovered
                        ? 'bg-neutral-800 border-emerald-400/80 shadow-xl shadow-emerald-950/40 -translate-y-0.5'
                        : 'bg-neutral-950/90 hover:bg-neutral-800/90 border-neutral-700/80 hover:border-neutral-500 shadow'
                      : 'bg-neutral-950/60 border-neutral-800 opacity-80 cursor-default'
                  }`}
                >
                  <div>
                    {/* Header: Game Controller Hotkey badge, title, PC cost */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        {/* Unity Controller Button Glyph */}
                        <span className="w-8 h-8 rounded-xl bg-neutral-900 border-2 border-amber-500/80 font-mono text-sm text-amber-300 font-black flex items-center justify-center shrink-0 shadow-md">
                          {index + 1}
                        </span>
                        <h4 className="font-bold text-base sm:text-lg text-neutral-100 group-hover:text-emerald-300 transition-colors">
                          {choice.label}
                        </h4>
                      </div>

                      {capitalCost > 0 && (
                        <span
                          className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 shadow-sm ${
                            hasEnoughCapital
                              ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                              : 'bg-rose-950 text-rose-300 border border-rose-500/50'
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          -{capitalCost} PC
                        </span>
                      )}
                    </div>

                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal mb-3">
                      {choice.description}
                    </p>
                  </div>

                  {/* Contextual Perk Prompt if Insufficient Capital */}
                  {!hasEnoughCapital && onOpenPerkStore && (
                    <div className="my-2 bg-amber-950/50 border border-amber-500/50 rounded-xl p-2.5 flex items-center justify-between gap-2">
                      <span className="text-xs text-amber-200 font-medium">
                        Insufficient Political Capital (-{capitalCost - politicalCapital} PC needed)
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPerkStore('capital');
                        }}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-lg text-xs flex items-center gap-1 shadow active:scale-95 shrink-0"
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>Godfather Fund (+35 PC)</span>
                      </button>
                    </div>
                  )}

                  {/* Impact preview meters - High Contrast & Large Text */}
                  <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Faction preview badges */}
                      {Object.entries(choice.impact.factions).map(([facKey, delta]) => {
                        if (!delta) return null;
                        const isPositive = delta > 0;
                        return (
                          <span
                            key={facKey}
                            className={`px-2 py-0.5 rounded-md font-mono text-xs font-bold flex items-center gap-1 ${
                              isPositive ? 'text-emerald-300 bg-emerald-950/80 border border-emerald-600/40' : 'text-rose-300 bg-rose-950/80 border border-rose-600/40'
                            }`}
                          >
                            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            <span className="capitalize">{facKey}:</span> {isPositive ? `+${delta}%` : `${delta}%`}
                          </span>
                        );
                      })}

                      {/* Treasury impact preview */}
                      {choice.impact.treasuryBillion !== undefined && choice.impact.treasuryBillion !== 0 && (
                        <span
                          className={`px-2 py-0.5 rounded-md font-mono text-xs font-bold flex items-center gap-1 ${
                            choice.impact.treasuryBillion > 0
                              ? 'text-emerald-300 bg-emerald-950/80 border border-emerald-600/40'
                              : 'text-amber-300 bg-amber-950/80 border border-amber-600/40'
                          }`}
                        >
                          <Coins className="w-3 h-3" />
                          {choice.impact.treasuryBillion > 0
                            ? `+₦${choice.impact.treasuryBillion}B`
                            : `-₦${Math.abs(choice.impact.treasuryBillion)}B`}
                        </span>
                      )}

                      {/* VIP Intelligence Radar Reveal */}
                      {intelligenceRadarActive && choice.impact.characterLoyalty && (
                        <div className="w-full mt-1.5 pt-1.5 border-t border-amber-900/50 text-xs text-amber-200 font-mono flex flex-wrap gap-2.5">
                          <span className="font-bold text-amber-400">⚡ VIP Radar:</span>
                          {Object.entries(choice.impact.characterLoyalty).map(([cId, delta]) => (
                            <span key={cId} className={delta >= 0 ? 'text-emerald-300' : 'text-red-300'}>
                              {cId.replace('_', ' ')}: {delta >= 0 ? `+${delta}` : delta}
                            </span>
                          ))}
                          {choice.impact.delayedTrigger && (
                            <span className="text-amber-400 font-bold">
                              ↳ Seeds fallout in {choice.impact.delayedTrigger.inMonths}mo
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Stamp Action Button feedback */}
                    {hasEnoughCapital && (
                      <div className="shrink-0 flex items-center gap-1.5 font-bold text-xs sm:text-sm text-emerald-400 group-hover:underline">
                        <FileCheck className="w-4 h-4" />
                        <span>Sign Decree</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Game Controller Bottom Helper Bar */}
        <div className="bg-neutral-950 px-4 py-2.5 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-400 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span>🎮 <strong>Controls:</strong> Press <kbd className="text-amber-400 font-bold">[1]</kbd>-<kbd className="text-amber-400 font-bold">[{crisis.choices.length}]</kbd> to sign</span>
            <span>•</span>
            <span><kbd className="text-rose-400 font-bold">[H]</kbd> Secret Hotline</span>
            {onOpenPerkStore && (
              <>
                <span>•</span>
                <button
                  onClick={() => onOpenPerkStore()}
                  className="text-amber-300 hover:text-amber-200 underline font-bold"
                >
                  <kbd className="text-amber-400 font-bold">[P]</kbd> Access Perks
                </button>
              </>
            )}
          </div>
          <span className="text-neutral-300 font-sans font-medium">Federal Republic Strategy Engine</span>
        </div>
      </div>
    </div>
  );
};
