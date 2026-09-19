import React from 'react';
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowRight,
  Shield,
  FileText,
  Sparkles,
} from 'lucide-react';
import { MonthEndFinancialReport, FactionState, FactionId } from '../types';
import { playTriumphChime } from '../utils/audio';

interface MonthEndReportModalProps {
  isOpen: boolean;
  onProceedToNextMonth: () => void;
  report: MonthEndFinancialReport;
  factions: Record<FactionId, FactionState>;
  nextMonthNumber: number;
}

export const MonthEndReportModal: React.FC<MonthEndReportModalProps> = ({
  isOpen,
  onProceedToNextMonth,
  report,
  factions,
  nextMonthNumber,
}) => {
  if (!isOpen) return null;

  const handleProceed = () => {
    playTriumphChime();
    onProceedToNextMonth();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Ribbon */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-gradient-to-r from-emerald-950 via-neutral-900 to-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400 font-bold">
                State of the Nation Broadcast • Month {report.month} Adjournment
              </span>
              <h3 className="font-cinzel text-lg font-bold text-neutral-100">
                Federation Account & Monthly Review
              </h3>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Breaking Headline Banner */}
          <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-start gap-3">
            <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] uppercase font-mono text-amber-400 font-bold block">
                NTA News Presidential Bulletin
              </span>
              <p className="text-xs sm:text-sm font-cinzel font-bold text-neutral-200 mt-0.5">
                "{report.headline}"
              </p>
            </div>
          </div>

          {/* FAAC Treasury Balance Sheet */}
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-bold block mb-2">
              Federation Account Allocation Committee (FAAC) Cash Flows
            </span>
            <div className="bg-neutral-950 rounded-xl border border-neutral-800 p-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Gross Crude Oil & Gas Export Earnings:</span>
                <span className="font-mono font-bold text-emerald-400">
                  +₦{report.grossOilRevenueBillion.toLocaleString()} Billion
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>36 State FAAC Statutory Revenue Shares:</span>
                <span className="font-mono text-amber-400">
                  -₦{report.faacStateDeductionBillion.toLocaleString()} Billion
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>External & Domestic Debt Service Deduction:</span>
                <span className="font-mono text-amber-400">
                  -₦{report.debtServicingBillion.toLocaleString()} Billion
                </span>
              </div>
              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between font-bold text-sm">
                <span className="text-neutral-200">Net Federal Treasury Monthly Movement:</span>
                <span
                  className={`font-mono ${
                    report.netFederationTreasuryDelta >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {report.netFederationTreasuryDelta >= 0 ? '+' : ''}₦
                  {report.netFederationTreasuryDelta.toLocaleString()} Billion
                </span>
              </div>
            </div>
          </div>

          {/* Macro-Economic Radar */}
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-bold block mb-2">
              National Macroeconomic Indicators
            </span>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block">Brent Crude</span>
                <span className="font-mono text-sm font-bold text-emerald-400">
                  ${report.crudeOilPriceUSD}/bbl
                </span>
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block">Headline Inflation</span>
                <span className="font-mono text-sm font-bold text-amber-400">
                  {report.inflationRate.toFixed(1)}%
                </span>
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block">Official FX Rate</span>
                <span className="font-mono text-sm font-bold text-neutral-200">
                  ₦{report.nairaExchangeRate}/$
                </span>
              </div>
            </div>
          </div>

          {/* Current Faction Standings */}
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-bold block mb-2">
              Executive Coalition Standings
            </span>
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              {Object.values(factions).map((f) => (
                <div key={f.id} className="p-2 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block truncate">{f.name}</span>
                  <span
                    className={`font-mono font-bold text-xs ${
                      f.value < 40 ? 'text-red-400' : f.value > 65 ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {f.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-t border-neutral-800 flex justify-end">
          <button
            onClick={handleProceed}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 cursor-pointer transition-all"
          >
            <span>Address the Nation & Convene Month {nextMonthNumber}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
