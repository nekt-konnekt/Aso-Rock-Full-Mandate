import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Sparkles,
  Check,
  Shield,
  Zap,
  Flame,
  Award,
  CreditCard,
  Lock,
} from 'lucide-react';
import { MonetizationItem, StoreItemCategory } from '../types';
import { STORE_ITEMS } from '../data/monetization';
import { playTriumphChime, playGavelKnock } from '../utils/audio';

interface VIPStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedItemIds: string[];
  onPurchaseItem: (item: MonetizationItem) => void;
}

export const VIPStoreModal: React.FC<VIPStoreModalProps> = ({
  isOpen,
  onClose,
  unlockedItemIds,
  onPurchaseItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<StoreItemCategory | 'all'>('all');
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [purchasingItemId, setPurchasingItemId] = useState<string | null>(null);
  const [purchaseSuccessMessage, setPurchaseSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredItems =
    selectedCategory === 'all'
      ? STORE_ITEMS
      : STORE_ITEMS.filter((item) => item.category === selectedCategory);

  const handleBuy = (item: MonetizationItem) => {
    setPurchasingItemId(item.id);
    // Simulate instantaneous authorization
    setTimeout(() => {
      onPurchaseItem(item);
      setPurchasingItemId(null);
      playTriumphChime();
      setPurchaseSuccessMessage(`Authorization Approved! "${item.name}" is now active in your Mandate.`);
      setTimeout(() => setPurchaseSuccessMessage(null), 4000);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-gradient-to-r from-neutral-950 via-neutral-900 to-amber-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest font-mono text-amber-400 font-bold">
                  Presidential Sovereign Exchange
                </span>
                <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40 font-bold">
                  Game Pass & DLCs
                </span>
              </div>
              <h3 className="font-cinzel text-lg font-bold text-neutral-100">
                VIP Executive Store & Expansions
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Currency Switcher */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-0.5 flex text-xs font-mono">
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-2 py-1 rounded-md transition-colors font-bold ${
                  currency === 'NGN' ? 'bg-amber-600 text-neutral-950' : 'text-neutral-400 hover:text-white'
                }`}
              >
                ₦ NGN
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded-md transition-colors font-bold ${
                  currency === 'USD' ? 'bg-amber-600 text-neutral-950' : 'text-neutral-400 hover:text-white'
                }`}
              >
                $ USD
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="px-5 py-2.5 bg-neutral-950/50 border-b border-neutral-800 flex items-center gap-2 text-xs overflow-x-auto">
          {(
            [
              { id: 'all', label: 'All Items' },
              { id: 'privilege', label: 'Oval Office VIP' },
              { id: 'expansion', label: 'Scenario DLCs' },
              { id: 'booster', label: 'Emergency Boosters' },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playGavelKnock();
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-neutral-800 text-white font-bold border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Success Alert Banner */}
        {purchaseSuccessMessage && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{purchaseSuccessMessage}</span>
          </div>
        )}

        {/* Store Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const isUnlocked = unlockedItemIds.includes(item.id);
              const isPurchasing = purchasingItemId === item.id;
              const formattedPrice =
                currency === 'NGN' ? `₦${item.priceNaira.toLocaleString()}` : `$${item.priceUSD.toFixed(2)}`;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                    isUnlocked
                      ? 'bg-neutral-950/80 border-emerald-500/40 shadow-sm'
                      : 'bg-neutral-950/50 hover:bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {item.badge}
                        </span>
                        <h4 className="font-bold text-sm text-neutral-100 mt-1.5 font-cinzel">
                          {item.name}
                        </h4>
                      </div>
                      <span className="text-sm font-mono font-bold text-emerald-400">
                        {formattedPrice}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                      {item.description}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      {item.perks.map((perk, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-800/80">
                    {isUnlocked ? (
                      <div className="w-full py-2 px-3 rounded-lg bg-emerald-950/60 border border-emerald-700/50 text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>Active in Mandate</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleBuy(item)}
                        disabled={isPurchasing}
                        className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{isPurchasing ? 'Authorizing...' : `Authorize ${formattedPrice}`}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 text-[11px] text-neutral-400 flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Monetization & Sandbox Pass Simulation • Instant In-Game Activation</span>
          </span>
          <span className="text-neutral-400 font-mono">
            {unlockedItemIds.length} Unlocked Upgrades
          </span>
        </div>
      </div>
    </div>
  );
};
