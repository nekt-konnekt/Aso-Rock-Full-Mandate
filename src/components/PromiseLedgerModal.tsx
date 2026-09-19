import React from 'react';
import { CampaignPromise } from '../types';
import { X, ScrollText, CheckCircle2, AlertCircle, Clock, XCircle } from 'lucide-react';

interface PromiseLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  promises: CampaignPromise[];
}

export const PromiseLedgerModal: React.FC<PromiseLedgerModalProps> = ({
  isOpen,
  onClose,
  promises,
}) => {
  if (!isOpen) return null;

  const completedCount = promises.filter((p) => p.status === 'Fulfilled' || p.progress >= 90).length;
  const inProgressCount = promises.filter((p) => p.status === 'In Progress' && p.progress < 90).length;
  const brokenCount = promises.filter((p) => p.status === 'Broken').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-neutral-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <ScrollText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-cinzel font-bold text-neutral-100">
              The Presidential Campaign Promise Ledger
            </h2>
            <p className="text-xs text-neutral-400">
              Inauguration Pledges Tracked by Civil Society & Election Observers
            </p>
          </div>
        </div>

        {/* Quick summary stats */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-400">Delivered / Near Target</span>
            <p className="text-xl font-bold font-mono text-emerald-200 mt-0.5">{completedCount}</p>
          </div>
          <div className="bg-amber-950/40 border border-amber-500/30 p-3 rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold text-amber-400">Under Execution</span>
            <p className="text-xl font-bold font-mono text-amber-200 mt-0.5">{inProgressCount}</p>
          </div>
          <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold text-rose-400">Broken / Stalled</span>
            <p className="text-xl font-bold font-mono text-rose-200 mt-0.5">{brokenCount}</p>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {promises.map((promise) => {
            const isDone = promise.status === 'Fulfilled' || promise.progress >= 90;
            const isBroken = promise.status === 'Broken';

            return (
              <div
                key={promise.id}
                className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isBroken ? (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <h4 className="font-bold text-sm text-neutral-200">{promise.title}</h4>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-400">
                      {promise.category}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      isDone
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-600/50'
                        : isBroken
                        ? 'bg-rose-950 text-rose-300 border-rose-600/50'
                        : 'bg-amber-950 text-amber-300 border-amber-600/50'
                    }`}
                  >
                    {isDone ? 'Delivered' : isBroken ? 'Broken' : `${promise.progress}% Complete`}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                  {promise.targetDescription}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-neutral-900 rounded-full h-2.5 overflow-hidden border border-neutral-800">
                  <div
                    className={`h-full transition-all duration-700 rounded-full ${
                      isDone
                        ? 'bg-emerald-500'
                        : isBroken
                        ? 'bg-rose-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(3, promise.progress))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
