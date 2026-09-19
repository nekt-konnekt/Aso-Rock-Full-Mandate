import React from 'react';
import {
  X,
  Compass,
  MapPin,
  Shield,
  AlertTriangle,
  CheckCircle,
  Zap,
  TrendingUp,
  Flame,
} from 'lucide-react';
import { GeopoliticalZone, GeopoliticalZoneId } from '../types';
import { playGavelKnock } from '../utils/audio';

interface GeopoliticalMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  zones: Record<GeopoliticalZoneId, GeopoliticalZone>;
  politicalCapital: number;
  onInterveneInZone?: (zoneId: GeopoliticalZoneId) => void;
}

export const GeopoliticalMapModal: React.FC<GeopoliticalMapModalProps> = ({
  isOpen,
  onClose,
  zones,
  politicalCapital,
  onInterveneInZone,
}) => {
  const [selectedZoneId, setSelectedZoneId] = React.useState<GeopoliticalZoneId>('south_south');

  if (!isOpen) return null;

  const zoneList = Object.values(zones);
  const selectedZone = zones[selectedZoneId] || zoneList[0];

  const averageStability = Math.round(
    zoneList.reduce((acc, z) => acc + z.stability, 0) / zoneList.length
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400 font-bold">
                  National Security Council Radar
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">
                  6 Geopolitical Zones
                </span>
              </div>
              <h3 className="font-cinzel text-lg font-bold text-neutral-100">
                Federation Geopolitical Radar & Zone Stability
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

        {/* Top Metric Bar */}
        <div className="px-5 py-3 bg-neutral-950 border-b border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-neutral-400 block text-[10px] uppercase font-mono">National Stability</span>
            <span className="text-base font-bold font-mono text-emerald-400">{averageStability}%</span>
          </div>
          <div>
            <span className="text-neutral-400 block text-[10px] uppercase font-mono">Oil Corridor Security</span>
            <span className="text-base font-bold font-mono text-neutral-100">
              {zones.south_south?.stability > 60 ? 'Operational' : 'Compromised'}
            </span>
          </div>
          <div>
            <span className="text-neutral-400 block text-[10px] uppercase font-mono">Agro-Belt Food Transit</span>
            <span className="text-base font-bold font-mono text-neutral-100">
              {zones.north_central?.stability > 55 ? 'Fluid' : 'Bottlenecked'}
            </span>
          </div>
          <div>
            <span className="text-neutral-400 block text-[10px] uppercase font-mono">Executive Capital</span>
            <span className="text-base font-bold font-mono text-amber-300">{politicalCapital} / 100</span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Left 6 Zones Selector List */}
          <div className="md:col-span-5 space-y-2.5">
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-bold block mb-1">
              Select Geopolitical Zone
            </span>
            {zoneList.map((z) => {
              const isSelected = z.id === selectedZoneId;
              const isLow = z.stability < 55;

              return (
                <div
                  key={z.id}
                  onClick={() => {
                    playGavelKnock();
                    setSelectedZoneId(z.id);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-neutral-950 border-emerald-500 ring-1 ring-emerald-500/40'
                      : 'bg-neutral-950/40 hover:bg-neutral-950/80 border-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-xs text-neutral-200">{z.name}</h4>
                    <span
                      className={`text-[11px] font-mono font-bold ${
                        isLow ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {z.stability}% Stability
                    </span>
                  </div>
                  {/* Mini Stability Bar */}
                  <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden mb-1.5">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isLow ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${z.stability}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-neutral-400 truncate">{z.primaryEconomicEngine}</p>
                </div>
              );
            })}
          </div>

          {/* Right Zone Deep-Dive Inspection Card */}
          <div className="md:col-span-7 bg-neutral-950 rounded-2xl border border-neutral-800 p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold">
                    Zone Intelligence File
                  </span>
                  <h3 className="font-cinzel text-lg font-bold text-neutral-100">
                    {selectedZone.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">{selectedZone.shortName}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                    Stability Score
                  </span>
                  <span
                    className={`text-xl font-bold font-mono ${
                      selectedZone.stability < 55 ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    {selectedZone.stability}/100
                  </span>
                </div>
              </div>

              {/* Economic Engine */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Primary Economic Engine
                </span>
                <p className="text-xs text-neutral-200 bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                  {selectedZone.primaryEconomicEngine}
                </p>
              </div>

              {/* Vulnerability */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Strategic Vulnerability
                </span>
                <p className="text-xs text-amber-200/90 bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/30">
                  {selectedZone.primaryVulnerability}
                </p>
              </div>

              {/* Active Alert */}
              {selectedZone.activeAlert && (
                <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-700/60 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                      Active Field Intelligence
                    </span>
                    <p className="text-xs text-neutral-300 mt-0.5">{selectedZone.activeAlert}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Governor Forum Note */}
            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span>State Governors' Alignment:</span>
              <span className="font-mono font-bold text-emerald-400">
                {selectedZone.governorSupport}% Loyal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
