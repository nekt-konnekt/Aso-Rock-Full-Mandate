import React from 'react';
import { Crisis, CrisisChoice, Character } from '../types';
import {
  AlertOctagon,
  Clock,
  Briefcase,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Coins,
  Zap,
  Quote,
  Flame,
} from 'lucide-react';
import { playDecisionStamp, playAlertTone } from '../utils/audio';

interface CrisisCardProps {
  crisis: Crisis;
  reporter?: Character;
  politicalCapital: number;
  onSelectChoice: (choice: CrisisChoice) => void;
  timerEnabled?: boolean;
  intelligenceRadarActive?: boolean;
}

export const CrisisCard: React.FC<CrisisCardProps> = ({
  crisis,
  reporter,
  politicalCapital,
  onSelectChoice,
  timerEnabled = false,
  intelligenceRadarActive = false,
}) => {
  const [secondsLeft, setSecondsLeft] = React.useState(30);
  const [isTimerPaused, setIsTimerPaused] = React.useState(!timerEnabled);
  const hasAutoSelectedRef = React.useRef(false);

  // Reset timer whenever crisis changes
  React.useEffect(() => {
    setSecondsLeft(30);
    hasAutoSelectedRef.current = false;
    playAlertTone();
  }, [crisis.id]);

  React.useEffect(() => {
    if (isTimerPaused) return;

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
  }, [crisis.id, isTimerPaused]);

  // When timer hits 0, safely auto-select the default choice in a dedicated effect
  React.useEffect(() => {
    if (secondsLeft === 0 && !hasAutoSelectedRef.current && !isTimerPaused) {
      hasAutoSelectedRef.current = true;
      const defaultChoice = crisis.choices[crisis.choices.length - 1];
      if (defaultChoice) {
        playDecisionStamp();
        onSelectChoice(defaultChoice);
      }
    }
  }, [secondsLeft, isTimerPaused, crisis.choices, onSelectChoice]);

  const handleChoiceClick = (choice: CrisisChoice) => {
    playDecisionStamp();
    onSelectChoice(choice);
  };

  const urgencyColor =
    crisis.urgency === 'critical'
      ? 'bg-rose-950/80 text-rose-300 border-rose-600/60'
      : crisis.urgency === 'urgent'
      ? 'bg-amber-950/80 text-amber-300 border-amber-600/60'
      : 'bg-sky-950/80 text-sky-300 border-sky-600/60';

  return (
    <div className="bg-neutral-900/90 rounded-2xl border border-neutral-700/80 shadow-2xl overflow-hidden backdrop-blur-sm max-w-4xl mx-auto">
      {/* Top Dossier Header */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 px-6 py-4 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-sm shadow-inner">
            #{crisis.number.toString().padStart(2, '0')}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${urgencyColor}`}>
                {crisis.urgency} Crisis
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                {crisis.category}
              </span>
              {crisis.isDelayedSpinoff && (
                <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 border border-amber-600/50 px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
                  <Flame className="w-3 h-3 text-amber-400" />
                  Past Decision Fallout
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-neutral-100 mt-1">
              {crisis.title}
            </h2>
          </div>
        </div>

        {/* 30-Second Pressure Gauge & Pause */}
        <div className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800">
          <Clock className={`w-4 h-4 ${secondsLeft < 10 ? 'text-rose-400 animate-spin' : 'text-neutral-400'}`} />
          <span
            className={`font-mono text-sm font-bold ${
              secondsLeft < 10 ? 'text-rose-400 animate-pulse' : 'text-neutral-300'
            }`}
          >
            {secondsLeft}s
          </span>
          <button
            onClick={() => setIsTimerPaused(!isTimerPaused)}
            className="text-[10px] font-mono text-neutral-400 hover:text-neutral-200 ml-1 px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-700/50"
          >
            {isTimerPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Context Description */}
        <p className="text-neutral-300 text-base leading-relaxed font-sans">
          {crisis.contextDescription}
        </p>

        {/* Character Reporter & Direct Quote */}
        {reporter && (
          <div className="bg-neutral-950/80 rounded-xl p-4 border border-neutral-800/90 flex flex-col sm:flex-row gap-4 items-start shadow-inner">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-12 h-12 rounded-full bg-emerald-950 border-2 border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center text-sm shadow">
                {reporter.avatarInitials}
              </div>
              <div>
                <h4 className="font-bold text-sm text-neutral-200">{reporter.name}</h4>
                <p className="text-xs text-neutral-400 flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-sky-400" />
                  {reporter.role}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-400">
                  <span>Loyalty: <strong className="text-neutral-200">{reporter.loyalty}%</strong></span>
                  <span>•</span>
                  <span>Influence: <strong className="text-neutral-200">{reporter.influence}%</strong></span>
                </div>
              </div>
            </div>

            <div className="sm:border-l sm:border-neutral-800 sm:pl-4 flex-1">
              <Quote className="w-4 h-4 text-emerald-500/40 mb-1" />
              <p className="font-editorial italic text-neutral-300 text-base sm:text-lg leading-snug">
                {crisis.characterQuote}
              </p>
            </div>
          </div>
        )}

        {/* Decision Section Header */}
        <div>
          <h3 className="text-xs uppercase font-bold tracking-widest text-neutral-400 mb-3 flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            Presidential Determination — Select Response
          </h3>

          {/* 3 or 4 Response Choices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {crisis.choices.map((choice) => {
              const capitalCost = choice.capitalCost || 0;
              const hasEnoughCapital = politicalCapital >= capitalCost;

              return (
                <button
                  key={choice.id}
                  disabled={!hasEnoughCapital}
                  onClick={() => handleChoiceClick(choice)}
                  className={`group text-left p-4 rounded-xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                    hasEnoughCapital
                      ? 'bg-neutral-950/70 hover:bg-neutral-800/90 border-neutral-700/80 hover:border-emerald-500/60 shadow-md hover:shadow-emerald-950/30'
                      : 'bg-neutral-950/30 border-neutral-800/40 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-bold text-sm text-neutral-100 group-hover:text-emerald-300 transition-colors">
                        {choice.label}
                      </span>
                      {capitalCost > 0 && (
                        <span
                          className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 ${
                            hasEnoughCapital
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-600/40'
                              : 'bg-rose-950/80 text-rose-300 border border-rose-600/40'
                          }`}
                        >
                          <Zap className="w-3 h-3 fill-current" />
                          -{capitalCost} PC
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors mb-3">
                      {choice.description}
                    </p>
                  </div>

                  {/* Impact preview hints */}
                  <div className="pt-2 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Faction preview badges */}
                      {Object.entries(choice.impact.factions).map(([facKey, delta]) => {
                        if (!delta) return null;
                        const isPositive = delta > 0;
                        return (
                          <span
                            key={facKey}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono flex items-center gap-0.5 ${
                              isPositive ? 'text-emerald-300 bg-emerald-950/50' : 'text-rose-300 bg-rose-950/50'
                            }`}
                          >
                            {isPositive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                            <span className="capitalize">{facKey}:</span> {isPositive ? `+${delta}` : delta}
                          </span>
                        );
                      })}

                      {/* Treasury impact preview */}
                      {choice.impact.treasuryBillion !== undefined && choice.impact.treasuryBillion !== 0 && (
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono flex items-center gap-0.5 ${
                            choice.impact.treasuryBillion > 0
                              ? 'text-emerald-300 bg-emerald-950/50'
                              : 'text-amber-300 bg-amber-950/50'
                          }`}
                        >
                          <Coins className="w-2.5 h-2.5" />
                          {choice.impact.treasuryBillion > 0
                            ? `+₦${choice.impact.treasuryBillion}B`
                            : `-₦${Math.abs(choice.impact.treasuryBillion)}B`}
                        </span>
                      )}
                      {/* VIP Intelligence Radar Reveal */}
                      {intelligenceRadarActive && choice.impact.characterLoyalty && (
                        <div className="w-full mt-1.5 pt-1.5 border-t border-amber-900/40 text-[10px] text-amber-300/90 font-mono flex flex-wrap gap-2">
                          <span className="font-bold text-amber-400">⚡ VIP Intel:</span>
                          {Object.entries(choice.impact.characterLoyalty).map(([cId, delta]) => (
                            <span key={cId} className={delta >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                              {cId.replace('_', ' ')}: {delta >= 0 ? `+${delta}` : delta}
                            </span>
                          ))}
                          {choice.impact.delayedTrigger && (
                            <span className="text-amber-400 font-bold">
                              ↳ Seeds crisis in {choice.impact.delayedTrigger.inMonths}mo: "{choice.impact.delayedTrigger.reason}"
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <span className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-semibold text-xs shrink-0">
                      Sign Order <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
