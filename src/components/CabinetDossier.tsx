import React from 'react';
import { Character } from '../types';
import { X, Shield, Star, Heart, AlertCircle, History, Briefcase } from 'lucide-react';

interface CabinetDossierProps {
  isOpen: boolean;
  onClose: () => void;
  characters: Record<string, Character>;
}

export const CabinetDossier: React.FC<CabinetDossierProps> = ({
  isOpen,
  onClose,
  characters,
}) => {
  if (!isOpen) return null;

  const characterList = Object.values(characters);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-4xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-neutral-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-cinzel font-bold text-neutral-100">
              Cabinet & Stakeholder Intelligence Dossier
            </h2>
            <p className="text-xs text-neutral-400">
              10 Key Figures in Your Political Network • Monitored by the State House Secretariat
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
          {characterList.map((char) => {
            const isFired = char.status === 'fired';
            const isResigned = char.status === 'resigned';
            const isDisloyal = char.loyalty < 40;

            return (
              <div
                key={char.id}
                className={`p-4 rounded-xl border transition-all ${
                  isFired || isResigned
                    ? 'bg-neutral-950/40 border-neutral-800/60 opacity-60'
                    : isDisloyal
                    ? 'bg-rose-950/20 border-rose-800/60 shadow-inner'
                    : 'bg-neutral-950/70 border-neutral-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 shrink-0 ${
                      isDisloyal
                        ? 'bg-rose-950 border-rose-500/60 text-rose-300'
                        : 'bg-emerald-950 border-emerald-500/50 text-emerald-300'
                    }`}
                  >
                    {char.avatarInitials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-sm text-neutral-100 truncate">{char.name}</h4>
                      {isFired && (
                        <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950/80 px-1.5 py-0.5 rounded border border-rose-700">
                          Dismissed
                        </span>
                      )}
                      {isResigned && (
                        <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-700">
                          Resigned
                        </span>
                      )}
                      {!isFired && !isResigned && isDisloyal && (
                        <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950/80 px-1.5 py-0.5 rounded border border-rose-700 animate-pulse">
                          Disloyal
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-sky-400 font-medium truncate">{char.role}</p>

                    {/* Stats strip */}
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <div className="flex items-center gap-1" title="Loyalty to the President">
                        <Heart className="w-3.5 h-3.5 text-rose-400" />
                        <span className="text-neutral-400">Loyalty:</span>
                        <strong
                          className={`font-mono ${
                            char.loyalty < 40
                              ? 'text-rose-400'
                              : char.loyalty > 65
                              ? 'text-emerald-400'
                              : 'text-amber-300'
                          }`}
                        >
                          {char.loyalty}%
                        </strong>
                      </div>

                      <div className="flex items-center gap-1" title="Political Influence / Clout">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-neutral-400">Influence:</span>
                        <strong className="font-mono text-neutral-200">{char.influence}%</strong>
                      </div>

                      <div className="flex items-center gap-1" title="Trust Level">
                        <Shield className="w-3.5 h-3.5 text-sky-400" />
                        <span className="text-neutral-400">Trust:</span>
                        <strong className="font-mono text-neutral-200">{char.trust}%</strong>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-400 mt-2 leading-snug">{char.bio}</p>

                    {/* Agenda */}
                    <div className="mt-2 text-[11px] text-neutral-300 bg-neutral-900/90 px-2.5 py-1.5 rounded border border-neutral-800">
                      <span className="text-amber-400 font-semibold">Private Agenda:</span> {char.agenda}
                    </div>

                    {/* Memories & Past Interactions */}
                    {char.memories && char.memories.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-neutral-900">
                        <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider flex items-center gap-1 mb-1">
                          <History className="w-3 h-3 text-neutral-400" />
                          Character Memories (They Remember Everything):
                        </span>
                        <ul className="space-y-1">
                          {char.memories.map((mem, idx) => (
                            <li
                              key={idx}
                              className="text-[11px] text-neutral-400 flex items-start gap-1.5 italic"
                            >
                              <span className="text-emerald-500 mt-0.5">•</span>
                              <span>"{mem}"</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
