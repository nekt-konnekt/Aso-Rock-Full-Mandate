import React from 'react';
import { GameEndingType, PresidentialRecord, FactionState, FactionId, CampaignPromise } from '../types';
import {
  Award,
  Vote,
  RotateCcw,
  Landmark,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ScrollText,
  BookOpen,
  Share2,
} from 'lucide-react';
import { playTriumphChime, playGavelKnock } from '../utils/audio';

interface ElectionEndingScreenProps {
  ending: GameEndingType;
  record: PresidentialRecord;
  factions: Record<FactionId, FactionState>;
  promises: CampaignPromise[];
  onPlayAgain: () => void;
  onViewArchive: () => void;
  onOpenScorecard?: () => void;
}

export const ElectionEndingScreen: React.FC<ElectionEndingScreenProps> = ({
  ending,
  record,
  factions,
  promises,
  onPlayAgain,
  onViewArchive,
  onOpenScorecard,
}) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (ending === 'second_term' || ending === 'successor') {
      playTriumphChime();
    } else {
      playGavelKnock();
    }
  }, [ending]);

  const handleShare = () => {
    const text = `🇳🇬 In "Aso Rock: Full Mandate", ${record.presidentName} concluded their term as "${record.legacyTitle}" with ${record.finalApproval}% approval and ₦${record.finalTreasuryTrillion.toFixed(2)}T in treasury! Can you survive Aso Rock?`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getEndingDetails = () => {
    switch (ending) {
      case 'second_term':
        return {
          title: 'MANDATE RENEWED: THE SECOND TERM',
          badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-500/70',
          narrative:
            'INEC declares you victorious in 24 of 36 states! Streets erupt in celebration from Kano to Lagos. Your coalition held firm through the storm, though the second term presents even steeper economic hurdles ahead.',
        };
      case 'successor':
        return {
          title: 'THE SUCCESSOR: PARTY POWER RETAINED',
          badgeColor: 'bg-sky-950 text-sky-300 border-sky-500/70',
          narrative:
            'Your party wins the presidential poll, but you stepped aside or party delegates anointed your preferred candidate. You enter the history books as the elder statesman kingmaker who kept the party machine unbroken.',
        };
      case 'opposition':
        return {
          title: 'THE OPPOSITION TRIUMPH: DEMOCRATIC TRANSITION',
          badgeColor: 'bg-amber-950 text-amber-300 border-amber-500/70',
          narrative:
            'The opposition People’s Reform Party (PRP) sweeps the swing states amidst cost-of-living discontent. You concede graciously in a landmark midnight phone call, earning global accolades for defending Nigeria’s constitutional democracy.',
        };
      case 'collapse':
      default:
        return {
          title: 'INSTITUTIONAL CRISIS: MANDATE FORECLOSED',
          badgeColor: 'bg-rose-950 text-rose-300 border-rose-500/70',
          narrative:
            'Multiple simultaneous revolts from the National Assembly, state governors, and public protests rendered executive governance paralyzed. An interim national stabilization council steps in to maintain the republic.',
        };
    }
  };

  const details = getEndingDetails();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-neutral-900 border border-neutral-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
        {/* Crest & Banner */}
        <div className="text-center space-y-3 border-b border-neutral-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-xs text-neutral-400">
            <span>INDEPENDENT NATIONAL ELECTORAL COMMISSION (INEC)</span>
            <span>•</span>
            <span className="font-mono">FINAL MANDATE GAZETTE</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-cinzel font-black tracking-tight text-neutral-100 uppercase">
            {details.title}
          </h1>

          <div className="inline-block px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-wider shadow">
            <span className={details.badgeColor}>{record.legacyTitle}</span>
          </div>

          <p className="text-sm sm:text-base font-editorial text-neutral-300 max-w-2xl mx-auto leading-relaxed mt-2">
            {details.narrative}
          </p>
        </div>

        {/* The 4-Year Scorecard Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-center">
          <div className="bg-neutral-950 p-4 rounded-2xl border-2 border-neutral-800 shadow">
            <span className="text-xs uppercase font-bold tracking-wider text-neutral-400 block mb-1">
              Final Public Approval
            </span>
            <span className="text-3xl sm:text-4xl font-cinzel font-black text-emerald-400">
              {record.finalApproval}%
            </span>
          </div>

          <div className="bg-neutral-950 p-4 rounded-2xl border-2 border-neutral-800 shadow">
            <span className="text-xs uppercase font-bold tracking-wider text-neutral-400 block mb-1">
              National Treasury
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-sky-400">
              ₦{record.finalTreasuryTrillion.toFixed(2)}T
            </span>
          </div>

          <div className="bg-neutral-950 p-4 rounded-2xl border-2 border-neutral-800 shadow">
            <span className="text-xs uppercase font-bold tracking-wider text-neutral-400 block mb-1">
              Promises Fulfilled
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-400">
              {record.promisesFulfilled} / {record.promisesFulfilled + record.promisesBroken}
            </span>
          </div>

          <div className="bg-neutral-950 p-4 rounded-2xl border-2 border-neutral-800 shadow">
            <span className="text-xs uppercase font-bold tracking-wider text-neutral-400 block mb-1">
              Decrees Signed
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-purple-400">
              {record.decisionsMade}
            </span>
          </div>
        </div>

        {/* Highlighted Presidential Scorecard Banner */}
        {onOpenScorecard && (
          <div className="bg-gradient-to-r from-emerald-950 via-neutral-950 to-emerald-950 border-2 border-emerald-500/80 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-900/80 border border-emerald-400 text-emerald-300 flex items-center justify-center shrink-0 shadow">
                <Award className="w-7 h-7 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-cinzel font-black text-emerald-300 uppercase tracking-wide">
                  Official Presidential Scorecard & Gazette
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 mt-0.5">
                  Generate your official high-resolution Presidential Gazette card ready for WhatsApp, X (Twitter), and Instagram sharing.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenScorecard}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95 shrink-0"
            >
              <Award className="w-5 h-5 text-neutral-950" />
              <span>Generate HD Scorecard</span>
            </button>
          </div>
        )}

        {/* Promises Audit Breakdown */}
        <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-5 space-y-3.5 shadow-inner">
          <h3 className="text-xs sm:text-sm uppercase font-bold tracking-wider text-neutral-300 flex items-center gap-2">
            <ScrollText className="w-4 h-4 text-amber-400" />
            Voter Scorecard: Campaign Pledges Audit
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {promises.map((p) => {
              const isDone = p.status === 'Fulfilled' || p.progress >= 85;
              const isBroken = p.status === 'Broken' || p.progress < 30;

              return (
                <div
                  key={p.id}
                  className="bg-neutral-900 border border-neutral-800 p-3.5 rounded-xl flex items-center justify-between text-xs sm:text-sm shadow-sm"
                >
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isBroken ? (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <span className="truncate text-neutral-200 font-medium">{p.title}</span>
                  </div>
                  <span
                    className={`font-mono text-xs sm:text-sm font-bold shrink-0 ${
                      isDone ? 'text-emerald-400' : isBroken ? 'text-rose-400' : 'text-amber-400'
                    }`}
                  >
                    {isDone ? 'Delivered' : isBroken ? 'Unmet' : `${p.progress}%`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Factions Final Standing */}
        <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-5 space-y-3.5 shadow-inner">
          <h3 className="text-xs sm:text-sm uppercase font-bold tracking-wider text-neutral-300 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-sky-400" />
            Final Institutional Alignments
          </h3>

          <div className="grid grid-cols-5 gap-2.5 text-center">
            {Object.values(factions).map((fac) => (
              <div key={fac.id} className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                <span className="text-xs uppercase font-bold text-neutral-400 block truncate">{fac.name}</span>
                <span
                  className={`font-mono font-black text-base sm:text-lg block mt-1 ${
                    fac.value < 30
                      ? 'text-rose-400'
                      : fac.value >= 60
                      ? 'text-emerald-400'
                      : 'text-neutral-100'
                  }`}
                >
                  {fac.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-800">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors active:scale-95"
            >
              <Share2 className="w-4 h-4 text-sky-400" />
              {copied ? 'Gazette Copied!' : 'Quick Share Text'}
            </button>
            <button
              onClick={onViewArchive}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              View Archives
            </button>
          </div>

          <button
            onClick={onPlayAgain}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-neutral-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-xl transition-all active:scale-95"
          >
            <RotateCcw className="w-5 h-5 stroke-[3]" />
            Swear In New Presidency
          </button>
        </div>
      </div>
    </div>
  );
};
