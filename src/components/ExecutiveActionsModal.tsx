import React, { useState } from 'react';
import { Character, FactionId } from '../types';
import {
  X,
  PhoneCall,
  Users,
  Radio,
  UserX,
  Search,
  FileSpreadsheet,
  RotateCcw,
  ShieldAlert,
  Zap,
  CheckCircle,
} from 'lucide-react';
import { playGavelKnock, playPhoneTone } from '../utils/audio';

export interface ExecutiveActionConfig {
  id: string;
  name: string;
  cost: number;
  icon: React.ReactNode;
  description: string;
  effectDescription: string;
  requiresTarget?: 'governor' | 'minister';
}

const EXECUTIVE_ACTIONS: ExecutiveActionConfig[] = [
  {
    id: 'call_governor',
    name: 'Call a Key Governor',
    cost: 2,
    icon: <PhoneCall className="w-4 h-4 text-sky-400" />,
    description: 'Private hot-line call to smooth over revenue friction or regional projects.',
    effectDescription: '+8 Governor Cooperation, +5 Target Governor Loyalty.',
    requiresTarget: 'governor',
  },
  {
    id: 'meet_party_leaders',
    name: 'Convene Party National Working Committee',
    cost: 3,
    icon: <Users className="w-4 h-4 text-amber-400" />,
    description: 'Hold an exclusive dinner at the Villa with party bosses and caucuses.',
    effectDescription: '+10 Party Support, quells internal rebellion whispers.',
  },
  {
    id: 'address_nation',
    name: 'Address the Nation (Live Broadcast)',
    cost: 5,
    icon: <Radio className="w-4 h-4 text-emerald-400" />,
    description: 'Prime-time presidential televised broadcast to calm anxiety and rally patriotism.',
    effectDescription: '+10 Public Approval, +8 Media Sentiment, -₦20B broadcast logistics.',
  },
  {
    id: 'fire_minister',
    name: 'Relieve a Minister of Duties',
    cost: 8,
    icon: <UserX className="w-4 h-4 text-rose-400" />,
    description: 'Sacrifice a controversial or disloyal cabinet member to appease public outcry.',
    effectDescription: '+12 Public Approval, +8 Media, -15 Fired Minister Loyalty/Allies.',
    requiresTarget: 'minister',
  },
  {
    id: 'launch_investigation',
    name: 'Order Special EFCC/ICPC Graft Probe',
    cost: 10,
    icon: <Search className="w-4 h-4 text-purple-400" />,
    description: 'Direct federal anti-corruption agencies to audit suspicious procurement files.',
    effectDescription: '+14 Public Integrity, -10 Governors, exposes graft syndicate.',
  },
  {
    id: 'push_legislation',
    name: 'Force Priority Bill in National Assembly',
    cost: 12,
    icon: <FileSpreadsheet className="w-4 h-4 text-blue-400" />,
    description: 'Mobilize legislative whips and lobby Senate caucus to unblock stalled reform bills.',
    effectDescription: '+16 Assembly Alignment, advances key campaign promise.',
  },
  {
    id: 'cabinet_reshuffle',
    name: 'Conduct Major Cabinet Reshuffle',
    cost: 15,
    icon: <RotateCcw className="w-4 h-4 text-teal-400" />,
    description: 'Redistribute ministerial portfolios to break entrenched fiefdoms and refresh mandate.',
    effectDescription: 'Rebalances cabinet dynamics, boosts public confidence +12.',
  },
  {
    id: 'emergency_intervention',
    name: 'Issue Federal Emergency Stabilization Order',
    cost: 20,
    icon: <ShieldAlert className="w-4 h-4 text-red-400" />,
    description: 'Deploy sweeping federal executive powers to halt an unfolding systemic collapse.',
    effectDescription: 'Instantly quells Hostile Factions (+18 across board, -₦150B).',
  },
];

interface ExecutiveActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  politicalCapital: number;
  characters: Record<string, Character>;
  onExecuteAction: (
    actionId: string,
    cost: number,
    targetCharacterId?: string
  ) => void;
}

export const ExecutiveActionsModal: React.FC<ExecutiveActionsModalProps> = ({
  isOpen,
  onClose,
  politicalCapital,
  characters,
  onExecuteAction,
}) => {
  const [selectedAction, setSelectedAction] = useState<ExecutiveActionConfig | null>(null);
  const [selectedTargetId, setSelectedTargetId] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleActionSelect = (act: ExecutiveActionConfig) => {
    setSelectedAction(act);
    setFeedback(null);
    if (act.requiresTarget === 'governor') {
      setSelectedTargetId('governor_south');
    } else if (act.requiresTarget === 'minister') {
      setSelectedTargetId('finance_minister');
    } else {
      setSelectedTargetId('');
    }
  };

  const handleConfirmExecute = () => {
    if (!selectedAction) return;
    if (politicalCapital < selectedAction.cost) return;

    playGavelKnock();
    onExecuteAction(selectedAction.id, selectedAction.cost, selectedTargetId || undefined);
    setFeedback(`Executive Action "${selectedAction.name}" ordered and executed by Presidential Decree.`);

    setTimeout(() => {
      setSelectedAction(null);
      setFeedback(null);
      onClose();
    }, 1200);
  };

  const governorList = Object.values(characters).filter(
    (c) => c.category === 'governors' && c.status === 'active'
  );
  const ministerList = Object.values(characters).filter(
    (c) => c.category === 'cabinet' && c.status === 'active'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-neutral-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-xl font-cinzel font-bold text-neutral-100">
              Presidential Executive Actions
            </h2>
            <p className="text-xs text-neutral-400">
              Available Political Capital:{' '}
              <strong className="font-mono text-amber-300 text-sm">{politicalCapital} PC</strong>
            </p>
          </div>
        </div>

        {feedback ? (
          <div className="p-6 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
            <p className="font-bold text-emerald-200">{feedback}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-neutral-300 leading-relaxed">
              Use your political capital strategically. Intervene to soothe revolting factions, dismiss ineffective ministers, or push vital legislation through the Assembly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EXECUTIVE_ACTIONS.map((act) => {
                const canAfford = politicalCapital >= act.cost;
                const isSelected = selectedAction?.id === act.id;

                return (
                  <button
                    key={act.id}
                    disabled={!canAfford}
                    onClick={() => handleActionSelect(act)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-amber-950/60 border-amber-400 shadow-lg'
                        : canAfford
                        ? 'bg-neutral-950/60 hover:bg-neutral-800 border-neutral-800 hover:border-neutral-700'
                        : 'bg-neutral-950/20 border-neutral-900 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 font-bold text-xs text-neutral-200">
                        {act.icon}
                        <span>{act.name}</span>
                      </div>
                      <span className="font-mono text-[11px] font-bold text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-600/30">
                        -{act.cost} PC
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 line-clamp-2">{act.description}</p>
                  </button>
                );
              })}
            </div>

            {selectedAction && (
              <div className="mt-4 p-4 rounded-xl bg-neutral-950 border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-neutral-200 flex items-center gap-2">
                    {selectedAction.icon}
                    Confirm: {selectedAction.name}
                  </h4>
                  <span className="font-mono text-xs font-bold text-amber-300">
                    Cost: {selectedAction.cost} PC
                  </span>
                </div>

                <p className="text-xs text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900">
                  <strong>Anticipated Outcome:</strong> {selectedAction.effectDescription}
                </p>

                {/* Target selector if needed */}
                {selectedAction.requiresTarget === 'governor' && (
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Select Governor to Call:</label>
                    <select
                      value={selectedTargetId}
                      onChange={(e) => setSelectedTargetId(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                    >
                      {governorList.map((gov) => (
                        <option key={gov.id} value={gov.id}>
                          {gov.name} ({gov.role}) — Loyalty: {gov.loyalty}%
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedAction.requiresTarget === 'minister' && (
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Select Minister to Dismiss:</label>
                    <select
                      value={selectedTargetId}
                      onChange={(e) => setSelectedTargetId(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                    >
                      {ministerList.map((min) => (
                        <option key={min.id} value={min.id}>
                          {min.name} ({min.role}) — Loyalty: {min.loyalty}%, Influence: {min.influence}%
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedAction(null)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmExecute}
                    className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    Sign & Execute Order
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
