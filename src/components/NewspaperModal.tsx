import React from 'react';
import { NewspaperIssue } from '../types';
import { X, Newspaper, Calendar, MessageSquare, AlertCircle } from 'lucide-react';

interface NewspaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  issues: NewspaperIssue[];
  currentMonth: number;
}

export const NewspaperModal: React.FC<NewspaperModalProps> = ({
  isOpen,
  onClose,
  issues,
  currentMonth,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-4xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto font-serif text-stone-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-stone-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Traditional Nigerian Newspaper Masthead */}
        <div className="text-center border-b-4 border-stone-600 pb-4 mb-6">
          <div className="flex items-center justify-between text-[11px] font-sans text-stone-400 uppercase tracking-widest border-b border-stone-700 pb-1 mb-2">
            <span>Vol. XLIV No. 12,840</span>
            <span>Abuja • Lagos • Port Harcourt • Kano</span>
            <span>Price: ₦400</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-cinzel font-black tracking-tight text-stone-100 uppercase">
            The Daily Mandate
          </h1>
          <p className="text-xs font-editorial italic text-stone-400 mt-1">
            "Truth, Sovereignty, and the People’s Will Without Fear or Favor"
          </p>
        </div>

        {issues.length === 0 ? (
          <div className="text-center py-12 text-stone-400 font-sans">
            <Newspaper className="w-12 h-12 mx-auto text-stone-600 mb-3" />
            <p className="text-base font-semibold">No Front Pages Published Yet</p>
            <p className="text-xs text-stone-500 mt-1">
              Newspaper print editions will roll off the press as you make pivotal presidential decisions each month.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {issues.map((issue, idx) => (
              <article
                key={idx}
                className={`p-6 rounded-xl border ${
                  idx === 0
                    ? 'bg-stone-950 border-stone-600 shadow-xl'
                    : 'bg-stone-950/60 border-stone-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-sans text-stone-400 mb-2 border-b border-stone-800 pb-2">
                  <span className="flex items-center gap-1 font-bold text-amber-500">
                    <Calendar className="w-3.5 h-3.5" />
                    Month {issue.month} Edition
                  </span>
                  <span className="italic text-stone-400">Pivotal Decision: {issue.sourceDecision}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-cinzel font-extrabold text-stone-100 uppercase leading-tight mt-2">
                  {issue.headline}
                </h2>

                <h3 className="text-sm sm:text-base font-editorial text-amber-300 font-medium mt-1">
                  {issue.subhead}
                </h3>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-8 font-editorial text-stone-300 text-sm sm:text-base leading-relaxed space-y-2">
                    <p>{issue.editorialSnippet}</p>
                    <div className="bg-stone-900/90 border-l-2 border-amber-500 p-3 mt-3 text-xs font-sans text-stone-300 italic">
                      <strong className="text-amber-400 font-semibold not-italic block mb-0.5">
                        Pulse of The Streets:
                      </strong>
                      "{issue.publicReaction}"
                    </div>
                  </div>

                  <div className="md:col-span-4 bg-stone-900 p-3 rounded-lg border border-stone-800 text-center">
                    <div className="w-full aspect-[4/3] bg-stone-950 rounded border border-stone-800 flex items-center justify-center p-3 text-center text-xs text-stone-400 font-sans italic">
                      [Editorial Cartoon: Satirical caricature of Aso Rock Villa gates]
                    </div>
                    <p className="text-[11px] font-sans text-stone-400 mt-2 italic">
                      "{issue.cartoonCaption}"
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
