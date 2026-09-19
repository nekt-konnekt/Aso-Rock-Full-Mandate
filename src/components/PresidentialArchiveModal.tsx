import React from 'react';
import { PresidentialRecord } from '../types';
import { X, BookOpen, Award, CheckCircle, AlertTriangle, Calendar, Landmark, RotateCcw } from 'lucide-react';

interface PresidentialArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  archive: PresidentialRecord[];
  onStartNewPresidency: () => void;
}

export const PresidentialArchiveModal: React.FC<PresidentialArchiveModalProps> = ({
  isOpen,
  onClose,
  archive,
  onStartNewPresidency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-4xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-neutral-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-cinzel font-bold text-neutral-100">
                The National Presidential Archive
              </h2>
              <p className="text-xs text-neutral-400">
                Official Hall of Mandates • Records of Past Administrations
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onStartNewPresidency();
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            Launch New Presidency
          </button>
        </div>

        <div className="space-y-4">
          {archive.map((record) => {
            const isSecondTerm = record.ending === 'second_term';
            const isCollapse = record.ending === 'collapse';
            const isOpposition = record.ending === 'opposition';

            return (
              <div
                key={record.id}
                className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-5 shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-neutral-900 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-cinzel text-lg font-bold text-neutral-100">
                        {record.presidentName}
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                        {record.partyName}
                      </span>
                    </div>
                    <p className="text-xs font-editorial italic text-amber-300 mt-0.5">
                      "{record.legacyTitle}"
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full border ${
                        isSecondTerm
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-600/60'
                          : isCollapse
                          ? 'bg-rose-950 text-rose-300 border-rose-600/60'
                          : isOpposition
                          ? 'bg-amber-950 text-amber-300 border-amber-600/60'
                          : 'bg-sky-950 text-sky-300 border-sky-600/60'
                      }`}
                    >
                      {isSecondTerm
                        ? 'Mandate Renewed (Re-Elected)'
                        : isCollapse
                        ? 'Institutional Collapse'
                        : isOpposition
                        ? 'Opposition Succession'
                        : 'Party Handover'}
                    </span>
                    <p className="text-[10px] text-neutral-500 mt-1 flex items-center justify-end gap-1">
                      <Calendar className="w-3 h-3" /> Term Ended: {record.completedAt}
                    </p>
                  </div>
                </div>

                {/* Stat scorecard metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                  <div className="bg-neutral-900/90 p-2 rounded-lg border border-neutral-800">
                    <span className="text-[10px] uppercase text-neutral-400 block">Final Approval</span>
                    <span className="font-mono text-base font-bold text-emerald-400">
                      {record.finalApproval}%
                    </span>
                  </div>
                  <div className="bg-neutral-900/90 p-2 rounded-lg border border-neutral-800">
                    <span className="text-[10px] uppercase text-neutral-400 block">Decisions Made</span>
                    <span className="font-mono text-base font-bold text-neutral-200">
                      {record.decisionsMade}
                    </span>
                  </div>
                  <div className="bg-neutral-900/90 p-2 rounded-lg border border-neutral-800">
                    <span className="text-[10px] uppercase text-neutral-400 block">Promises Fulfilled</span>
                    <span className="font-mono text-base font-bold text-amber-400">
                      {record.promisesFulfilled} / {record.promisesFulfilled + record.promisesBroken}
                    </span>
                  </div>
                  <div className="bg-neutral-900/90 p-2 rounded-lg border border-neutral-800">
                    <span className="text-[10px] uppercase text-neutral-400 block">Final Treasury</span>
                    <span className="font-mono text-base font-bold text-sky-400">
                      ₦{record.finalTreasuryTrillion.toFixed(2)}T
                    </span>
                  </div>
                </div>

                {/* Key Events Summary */}
                {record.keyEventsSummary && record.keyEventsSummary.length > 0 && (
                  <div className="text-xs text-neutral-400 space-y-1 bg-neutral-900/50 p-3 rounded-lg border border-neutral-850">
                    <strong className="text-neutral-300 font-semibold block mb-1">Historical Footprints:</strong>
                    {record.keyEventsSummary.map((item, i) => (
                      <p key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-500">•</span>
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
