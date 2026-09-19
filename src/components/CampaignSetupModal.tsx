import React, { useState } from 'react';
import {
  X,
  Shield,
  Briefcase,
  Users,
  Award,
  Flame,
  Check,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { PresidentArchetypeId } from '../types';
import { PRESIDENT_ARCHETYPES } from '../data/archetypes';
import { playGavelKnock, playTriumphChime } from '../utils/audio';

interface CampaignSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: (params: {
    name: string;
    party: string;
    archetype: PresidentArchetypeId;
    difficulty: 'standard' | 'iron_statesman';
  }) => void;
  initialName?: string;
  initialParty?: string;
}

const NIGERIAN_PARTIES = [
  'Federal Unity Party (FUP)',
  'All Progressives Alliance (APA)',
  'Peoples Democratic Mandate (PDM)',
  'National Renaissance Congress (NRC)',
  'Social Democratic Movement (SDM)',
];

export const CampaignSetupModal: React.FC<CampaignSetupModalProps> = ({
  isOpen,
  onClose,
  onStartGame,
  initialName = 'President Oluwaseun Adewale',
  initialParty = 'Federal Unity Party (FUP)',
}) => {
  const [name, setName] = useState(initialName);
  const [party, setParty] = useState(initialParty);
  const [selectedArchetype, setSelectedArchetype] = useState<PresidentArchetypeId>('technocrat');
  const [difficulty, setDifficulty] = useState<'standard' | 'iron_statesman'>('standard');
  const [showOathStep, setShowOathStep] = useState(false);

  if (!isOpen) return null;

  const currentArchetypeData =
    PRESIDENT_ARCHETYPES.find((a) => a.id === selectedArchetype) || PRESIDENT_ARCHETYPES[0];

  const handleProceedToOath = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    playGavelKnock();
    setShowOathStep(true);
  };

  const handleTakeOathAndLaunch = () => {
    playTriumphChime();
    onStartGame({
      name: name.trim(),
      party: party.trim(),
      archetype: selectedArchetype,
      difficulty,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400 font-bold">
                Electoral Commission Certification
              </span>
              <h3 className="font-cinzel text-lg font-bold text-neutral-100">
                {showOathStep ? 'Presidential Swearing-In Oath' : 'Inaugurate New Mandate'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-neutral-200">
          {!showOathStep ? (
            <form onSubmit={handleProceedToOath} className="space-y-6">
              {/* Step 1: Choose Presidential Archetype */}
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-neutral-400 font-bold mb-2">
                  1. Select Commander-in-Chief Archetype
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRESIDENT_ARCHETYPES.map((arch) => {
                    const isSelected = arch.id === selectedArchetype;
                    return (
                      <div
                        key={arch.id}
                        onClick={() => {
                          playGavelKnock();
                          setSelectedArchetype(arch.id);
                        }}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-neutral-950 border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg'
                            : 'bg-neutral-950/50 hover:bg-neutral-950 border-neutral-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-sm text-neutral-100">{arch.name}</h4>
                          {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                        </div>
                        <p className="text-[11px] text-amber-400/90 font-medium mb-1.5">{arch.tagline}</p>
                        <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                          {arch.description}
                        </p>
                        <div className="mt-2.5 pt-2 border-t border-neutral-800 text-[10px] text-emerald-300 font-mono flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">{arch.specialPerk}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Presidential Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-neutral-400 font-bold mb-1.5">
                    2. President Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. President Oluwaseun Adewale"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-neutral-400 font-bold mb-1.5">
                    3. Ruling Political Party
                  </label>
                  <select
                    value={party}
                    onChange={(e) => setParty(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-neutral-100 focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    {NIGERIAN_PARTIES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 3: Difficulty Mode */}
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-neutral-400 font-bold mb-2">
                  4. Governance Mandate Stakes
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setDifficulty('standard')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      difficulty === 'standard'
                        ? 'bg-neutral-950 border-emerald-500 ring-1 ring-emerald-500/40'
                        : 'bg-neutral-950/50 border-neutral-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-neutral-200">Standard Mandate</span>
                      {difficulty === 'standard' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <p className="text-[11px] text-neutral-400">
                      Untimed crises with standard political consequences. Ideal for strategic deliberation.
                    </p>
                  </div>

                  <div
                    onClick={() => setDifficulty('iron_statesman')}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      difficulty === 'iron_statesman'
                        ? 'bg-neutral-950 border-amber-500 ring-1 ring-amber-500/40'
                        : 'bg-neutral-950/50 border-neutral-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-amber-300 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-red-400" /> Iron Statesman (Permadeath)
                      </span>
                      {difficulty === 'iron_statesman' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <p className="text-[11px] text-neutral-400">
                      Strict 30s crisis countdowns, high faction volatility, and mid-term coup/impeachment triggers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit to Oath button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Proceed to Presidential Swearing-In</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Swearing-in Oath View */
            <div className="space-y-6 py-2 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500/50 mx-auto flex items-center justify-center text-emerald-400 shadow-xl">
                <Shield className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-bold">
                  Eagle Square, Abuja • Oath of Office of the President
                </span>
                <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-neutral-100 mt-1">
                  Seventh Schedule to the 1999 Constitution
                </h4>
              </div>

              <blockquote className="max-w-xl mx-auto p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
                "I, <strong className="text-emerald-300 not-italic">{name}</strong>, do solemnly swear that I
                will be faithful and bear true allegiance to the Federal Republic of Nigeria; that as
                President, I will preserve, protect and defend the Constitution of the Federal Republic of
                Nigeria; and that I will devote myself to the service and well-being of the people of Nigeria.
                So help me God."
              </blockquote>

              <div className="p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl text-xs text-neutral-400 max-w-md mx-auto flex items-center justify-between">
                <span>Selected Archetype:</span>
                <span className="font-bold text-amber-300">{currentArchetypeData.name}</span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOathStep(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-xs text-neutral-300 font-medium"
                >
                  Edit Credentials
                </button>
                <button
                  type="button"
                  onClick={handleTakeOathAndLaunch}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/50"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Seal Mandate & Enter Oval Office</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
