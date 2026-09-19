import React, { useState, useRef } from 'react';
import { PresidentialRecord } from '../types';
import {
  X,
  BookOpen,
  Award,
  CheckCircle,
  AlertTriangle,
  Calendar,
  RotateCcw,
  Download,
  Upload,
  Trash2,
  Database,
  FileJson,
} from 'lucide-react';
import {
  exportPresidentialArchiveJSON,
  importPresidentialArchiveJSON,
  deletePresidentialRecord,
} from '../utils/archive';
import { playGavelKnock, playTriumphChime } from '../utils/audio';

interface PresidentialArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  archive: PresidentialRecord[];
  onStartNewPresidency: () => void;
  onUpdateArchive: (updated: PresidentialRecord[]) => void;
}

export const PresidentialArchiveModal: React.FC<PresidentialArchiveModalProps> = ({
  isOpen,
  onClose,
  archive,
  onStartNewPresidency,
  onUpdateArchive,
}) => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    playGavelKnock();
    exportPresidentialArchiveJSON();
    setStatusMessage('Downloaded presidential career archive as JSON file.');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const res = importPresidentialArchiveJSON(text);
      if (res.success) {
        onUpdateArchive(res.records);
        playTriumphChime();
        setStatusMessage(res.message);
      } else {
        setStatusMessage(res.message);
      }
      setTimeout(() => setStatusMessage(null), 5000);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDelete = (id: string, name: string) => {
    playGavelKnock();
    const updated = deletePresidentialRecord(id);
    onUpdateArchive(updated);
    setStatusMessage(`Deleted record for ${name}.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-neutral-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-cinzel font-bold text-neutral-100">
                The National Presidential Archive
              </h2>
              <p className="text-xs text-neutral-400">
                Hall of Mandates • Persistent Records of All Administrations
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs flex items-center gap-1.5 border border-neutral-700 transition-colors"
              title="Download backup file of all presidential runs"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs flex items-center gap-1.5 border border-neutral-700 transition-colors"
              title="Restore presidents from a JSON backup file"
            >
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>Import JSON</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />

            <button
              onClick={() => {
                onClose();
                onStartNewPresidency();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Mandate</span>
            </button>
          </div>
        </div>

        {/* Storage Architecture Explainer Card */}
        <div className="mb-4 p-3 rounded-xl bg-neutral-950 border border-neutral-800/90 text-xs text-neutral-400 flex items-start gap-2.5">
          <Database className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold text-neutral-300">How Presidential Storage Works:</span> Each completed presidency is saved to your local browser storage key (<code className="text-emerald-400 font-mono">aso_rock_presidential_archive_v1</code>) capturing approval ratings, decisions, fulfilled promises, and legacy titles. You can click <strong>Export JSON</strong> anytime to download a permanent backup file.
          </div>
        </div>

        {/* Notification Alert */}
        {statusMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Presidential Records List */}
        <div className="space-y-4 flex-1">
          {archive.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <FileJson className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p>No presidential records found in archive. Complete a mandate to engrave your legacy!</p>
            </div>
          ) : (
            archive.map((record) => {
              const isSecondTerm = record.ending === 'second_term';
              const isCollapse = record.ending === 'collapse';
              const isOpposition = record.ending === 'opposition';

              return (
                <div
                  key={record.id}
                  className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-3.5 relative group"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-neutral-900 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-cinzel text-base sm:text-lg font-bold text-neutral-100">
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

                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <span
                          className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border ${
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
                            ? 'Mandate Renewed'
                            : isCollapse
                            ? 'Villa Collapse'
                            : isOpposition
                            ? 'Opposition Victory'
                            : 'Party Handover'}
                        </span>
                        <p className="text-[10px] text-neutral-500 mt-1 flex items-center justify-end gap-1">
                          <Calendar className="w-3 h-3" /> {record.completedAt}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDelete(record.id, record.presidentName)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-900 transition-colors opacity-70 group-hover:opacity-100"
                        title="Delete this record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Scorecard metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
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
                      <span className="text-[10px] uppercase text-neutral-400 block">Promises Kept</span>
                      <span className="font-mono text-base font-bold text-amber-400">
                        {record.promisesFulfilled} / {record.promisesFulfilled + record.promisesBroken}
                      </span>
                    </div>
                    <div className="bg-neutral-900/90 p-2 rounded-lg border border-neutral-800">
                      <span className="text-[10px] uppercase text-neutral-400 block">Final Reserves</span>
                      <span className="font-mono text-base font-bold text-sky-400">
                        ₦{record.finalTreasuryTrillion.toFixed(2)}T
                      </span>
                    </div>
                  </div>

                  {/* Historical Footprints */}
                  {record.keyEventsSummary && record.keyEventsSummary.length > 0 && (
                    <div className="text-xs text-neutral-400 space-y-1 bg-neutral-900/50 p-2.5 rounded-lg border border-neutral-850">
                      <strong className="text-neutral-300 font-semibold block mb-0.5">
                        Historical Footprints:
                      </strong>
                      {record.keyEventsSummary.map((item, i) => (
                        <p key={i} className="flex items-start gap-1.5 text-[11px]">
                          <span className="text-emerald-500">•</span>
                          <span>{item}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
