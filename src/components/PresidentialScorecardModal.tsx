import React, { useRef, useState, useEffect } from 'react';
import {
  X,
  Download,
  Share2,
  Copy,
  Check,
  Award,
  Sparkles,
  Shield,
  TrendingUp,
  Landmark,
  ScrollText,
  Users,
  Compass,
  MessageCircle,
} from 'lucide-react';
import {
  FactionState,
  FactionId,
  CampaignPromise,
  GeopoliticalZone,
  PresidentArchetypeId,
} from '../types';
import { PRESIDENT_ARCHETYPES } from '../data/archetypes';
import { playTriumphChime, playDecisionStamp } from '../utils/audio';

interface PresidentialScorecardModalProps {
  isOpen: boolean;
  onClose: () => void;
  presidentName: string;
  partyName: string;
  archetype: PresidentArchetypeId;
  currentMonth: number;
  maxMonths: number;
  factions: Record<FactionId, FactionState>;
  treasuryBillionNaira: number;
  politicalCapital: number;
  promises: CampaignPromise[];
  geopoliticalZones: GeopoliticalZone[];
  legacyTitle?: string;
}

export const PresidentialScorecardModal: React.FC<PresidentialScorecardModalProps> = ({
  isOpen,
  onClose,
  presidentName,
  partyName,
  archetype,
  currentMonth,
  maxMonths,
  factions,
  treasuryBillionNaira,
  politicalCapital,
  promises,
  geopoliticalZones,
  legacyTitle,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const archetypeName =
    PRESIDENT_ARCHETYPES.find((a) => a.id === archetype)?.name || 'Executive Statesman';

  // Compute Score Metrics
  const publicApproval = factions.public?.value || 50;
  const partyLoyalty = factions.party?.value || 50;
  const governorsSupport = factions.governors?.value || 50;
  const assemblySupport = factions.assembly?.value || 50;
  const mediaTone = factions.media?.value || 50;

  const keptPromises = promises.filter((p) => p.status === 'Fulfilled').length;
  const totalPromises = promises.length || 1;
  const promisePercent = Math.round((keptPromises / totalPromises) * 100);

  const avgZoneStability =
    geopoliticalZones.length > 0
      ? Math.round(
          geopoliticalZones.reduce((acc, z) => acc + z.stability, 0) / geopoliticalZones.length
        )
      : 60;

  const treasuryTrillions = (treasuryBillionNaira / 1000).toFixed(2);

  // Overall Score (0-100)
  const compositeScore = Math.min(
    100,
    Math.max(
      10,
      Math.round(
        publicApproval * 0.35 +
          Math.min(100, (treasuryBillionNaira / 6000) * 80) * 0.25 +
          politicalCapital * 0.15 +
          avgZoneStability * 0.15 +
          promisePercent * 0.1
      )
    )
  );

  // Calculate Grade
  let grade = 'B';
  let gradeColor = 'text-amber-400';
  let gradeBg = 'bg-amber-950/80 border-amber-500/50';
  let gradeTitle = legacyTitle || 'Pragmatic Sovereign';

  if (compositeScore >= 85) {
    grade = 'A+';
    gradeColor = 'text-emerald-300';
    gradeBg = 'bg-emerald-950/80 border-emerald-500/70';
    gradeTitle = legacyTitle || 'Grand Commander of the Federal Republic';
  } else if (compositeScore >= 75) {
    grade = 'A';
    gradeColor = 'text-emerald-400';
    gradeBg = 'bg-emerald-950/70 border-emerald-500/60';
    gradeTitle = legacyTitle || 'Distinguished Reformer';
  } else if (compositeScore >= 65) {
    grade = 'B+';
    gradeColor = 'text-lime-400';
    gradeBg = 'bg-lime-950/70 border-lime-500/50';
    gradeTitle = legacyTitle || 'Fiscal Architect';
  } else if (compositeScore >= 55) {
    grade = 'B';
    gradeColor = 'text-amber-400';
    gradeBg = 'bg-amber-950/70 border-amber-500/50';
    gradeTitle = legacyTitle || 'Resilient Statesman';
  } else if (compositeScore >= 45) {
    grade = 'C';
    gradeColor = 'text-orange-400';
    gradeBg = 'bg-orange-950/70 border-orange-500/50';
    gradeTitle = legacyTitle || 'Turbulent Mandate';
  } else if (compositeScore >= 35) {
    grade = 'D';
    gradeColor = 'text-rose-400';
    gradeBg = 'bg-rose-950/70 border-rose-500/50';
    gradeTitle = legacyTitle || 'Embattled Executive';
  } else {
    grade = 'F';
    gradeColor = 'text-red-500';
    gradeBg = 'bg-red-950/80 border-red-500/80';
    gradeTitle = legacyTitle || 'Constitutional Meltdown';
  }

  // Draw the high resolution canvas (1200 x 675 for crisp 16:9 social share)
  const drawScorecardToCanvas = (): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) return resolve('');

      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve('');

      const width = 1200;
      const height = 675;
      canvas.width = width;
      canvas.height = height;

      // 1. Background Gradient (Luxury deep obsidian to dark emerald)
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#040d08');
      bgGrad.addColorStop(0.5, '#0a1610');
      bgGrad.addColorStop(1, '#05070a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle geometric grid texture
      ctx.strokeStyle = 'rgba(0, 135, 81, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Outer gold border
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, width - 40, height - 40);

      // Inner thin gold frame
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(28, 28, width - 56, height - 56);

      // 2. Nigerian Green-White-Green Ribbon Bar at Top
      const ribbonHeight = 10;
      const segWidth = (width - 56) / 3;
      ctx.fillStyle = '#008751';
      ctx.fillRect(28, 28, segWidth, ribbonHeight);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(28 + segWidth, 28, segWidth, ribbonHeight);
      ctx.fillStyle = '#008751';
      ctx.fillRect(28 + segWidth * 2, 28, segWidth, ribbonHeight);

      // 3. Header Text & Seals
      ctx.fillStyle = '#a3e635';
      ctx.font = 'bold 13px "Courier New", monospace';
      ctx.letterSpacing = '3px';
      ctx.textAlign = 'center';
      ctx.fillText('FEDERAL REPUBLIC OF NIGERIA • ASO ROCK PRESIDENTIAL MANDATE', width / 2, 68);

      // Subheader rule
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.beginPath();
      ctx.moveTo(120, 80);
      ctx.lineTo(width - 120, 80);
      ctx.stroke();

      // Main President Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Cinzel", Georgia, serif';
      ctx.fillText(presidentName.toUpperCase(), width / 2, 124);

      // Party & Archetype Subtitle
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(
        `${partyName} • ${archetypeName} • Month ${currentMonth} of ${maxMonths}`,
        width / 2,
        152
      );

      // 4. Central Grade Badge & Legacy Wreath
      const gradeCenterY = 250;
      // Grade circular container
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, gradeCenterY, 60, 0, Math.PI * 2);
      ctx.fillStyle = '#0f291e';
      ctx.fill();
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Golden laurel ring
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(width / 2, gradeCenterY, 68, 0, Math.PI * 2);
      ctx.stroke();

      // Grade Letter
      ctx.fillStyle = compositeScore >= 70 ? '#4ade80' : compositeScore >= 50 ? '#facc15' : '#f87171';
      ctx.font = '900 52px "Cinzel", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(grade, width / 2, gradeCenterY - 2);
      ctx.restore();

      // Score / 100 below grade
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 15px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`MANDATE EFFICIENCY INDEX: ${compositeScore} / 100`, width / 2, 335);

      // Legacy Title Banner
      ctx.fillStyle = '#d4af37';
      ctx.font = 'italic bold 22px "Newsreader", Georgia, serif';
      ctx.fillText(`“${gradeTitle}”`, width / 2, 365);

      // 5. Stat Metric Cards (4 Columns)
      const metrics = [
        {
          label: 'PUBLIC TRUST',
          val: `${publicApproval}%`,
          sub: `${factions.public?.isHostile ? 'Civil Agitation' : 'Stability OK'}`,
          color: publicApproval >= 50 ? '#4ade80' : '#f87171',
        },
        {
          label: 'FEDERATION RESERVES',
          val: `₦${treasuryTrillions}T`,
          sub: 'Central Bank / FAAC',
          color: '#38bdf8',
        },
        {
          label: 'POLITICAL CAPITAL',
          val: `${politicalCapital} PC`,
          sub: 'Executive Leverage',
          color: '#fbbf24',
        },
        {
          label: 'PROMISES KEPT',
          val: `${keptPromises}/${totalPromises}`,
          sub: `${promisePercent}% Delivered`,
          color: promisePercent >= 50 ? '#4ade80' : '#f87171',
        },
      ];

      const cardY = 415;
      const cardHeight = 110;
      const totalWidth = width - 120;
      const cardWidth = totalWidth / 4 - 15;

      metrics.forEach((m, idx) => {
        const cardX = 60 + idx * (cardWidth + 20);

        // Box background
        ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
        ctx.strokeStyle = 'rgba(51, 65, 85, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 10);
        ctx.fill();
        ctx.stroke();

        // Accent top bar
        ctx.fillStyle = m.color;
        ctx.beginPath();
        ctx.roundRect(cardX, cardY, cardWidth, 4, [10, 10, 0, 0]);
        ctx.fill();

        // Metric label
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 11px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(m.label, cardX + cardWidth / 2, cardY + 28);

        // Metric main value
        ctx.fillStyle = m.color;
        ctx.font = 'bold 28px "Cinzel", Georgia, serif';
        ctx.fillText(m.val, cardX + cardWidth / 2, cardY + 68);

        // Metric subtext
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '12px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(m.sub, cardX + cardWidth / 2, cardY + 95);
      });

      // 6. Geopolitical Zone Footprint Summary Bar
      const footerY = 560;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(60, footerY, width - 120, 50, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 11px "Courier New", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('REGIONAL STABILITY INDEX:', 80, footerY + 30);

      // Zone stability items
      const zoneGap = 135;
      geopoliticalZones.forEach((z, idx) => {
        const zX = 270 + idx * zoneGap;
        ctx.fillStyle = z.stability >= 60 ? '#4ade80' : z.stability >= 40 ? '#facc15' : '#f87171';
        ctx.font = 'bold 12px "Courier New", monospace';
        ctx.fillText(`${z.shortName || z.name}: ${z.stability}%`, zX, footerY + 30);
      });

      // 7. Watermark & Branding
      ctx.fillStyle = '#64748b';
      ctx.font = '11px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        'ASO ROCK: FULL MANDATE • Nigerian Political Strategy Simulation • asorockmandate.ng',
        width / 2,
        642
      );

      const url = canvas.toDataURL('image/png');
      setPreviewUrl(url);
      resolve(url);
    });
  };

  useEffect(() => {
    if (isOpen) {
      playTriumphChime();
      const timer = setTimeout(() => {
        drawScorecardToCanvas();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, compositeScore]);

  if (!isOpen) return null;

  const handleDownloadImage = async () => {
    playDecisionStamp();
    setIsGenerating(true);
    const dataUrl = await drawScorecardToCanvas();
    const link = document.createElement('a');
    link.download = `Presidential_Scorecard_${presidentName.replace(/\s+/g, '_')}_Grade_${grade}.png`;
    link.href = dataUrl;
    link.click();
    setIsGenerating(false);
  };

  const handleCopyImageToClipboard = async () => {
    playDecisionStamp();
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ]);
          setCopiedImage(true);
          setTimeout(() => setCopiedImage(false), 2500);
        }
      });
    } catch {
      // Fallback
    }
  };

  const handleShareWhatsApp = () => {
    playDecisionStamp();
    const text = `🇳🇬 *PRESIDENTIAL SCORECARD: ASO ROCK FULL MANDATE*\n\n` +
      `🎖️ *President:* ${presidentName}\n` +
      `🏛️ *Party:* ${partyName} (${archetypeName})\n` +
      `⭐ *Grade:* ${grade} (${compositeScore}/100)\n` +
      `📜 *Legacy Title:* "${gradeTitle}"\n\n` +
      `📊 *Key National Metrics:*\n` +
      `• Public Trust: ${publicApproval}%\n` +
      `• Federation Reserves: ₦${treasuryTrillions} Trillion\n` +
      `• Political Capital: ${politicalCapital} PC\n` +
      `• Promises Kept: ${keptPromises}/${totalPromises}\n` +
      `• Regional Stability: ${avgZoneStability}%\n\n` +
      `Can you govern Nigeria better? Test your mandate at: https://asorockmandate.ng`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareTwitter = () => {
    playDecisionStamp();
    const text = `🇳🇬 In "Aso Rock: Full Mandate", ${presidentName} governed Nigeria with a Grade ${grade} ("${gradeTitle}")!\n\n` +
      `Public Trust: ${publicApproval}% | Reserves: ₦${treasuryTrillions}T | Kept: ${keptPromises}/${totalPromises} Promises\n\n` +
      `Can you survive the Commander-in-Chief's desk? #AsoRockMandate #NaijaGame`;

    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleNativeShare = async () => {
    playDecisionStamp();
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `Scorecard_${presidentName}.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: `Presidential Scorecard: ${presidentName}`,
            text: `🇳🇬 In Aso Rock: Full Mandate, ${presidentName} scored Grade ${grade} ("${gradeTitle}")!`,
            files: [file],
          });
        } catch {
          // User canceled or failed
        }
      } else {
        handleDownloadImage();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/85 backdrop-blur-md overflow-y-auto">
      {/* Offscreen / Hidden Canvas for Rendering */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel font-bold text-lg text-neutral-100 flex items-center gap-2">
                Presidential Scorecard & Social Gazette
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                Official Mandate Assessment • Ready for High-Res Social Export
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Card Live Graphic Preview */}
          <div className="relative rounded-xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-neutral-950">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Presidential Scorecard"
                className="w-full h-auto object-contain block"
              />
            ) : (
              <div className="p-12 text-center text-neutral-400">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-amber-400 animate-spin" />
                Generating Official Certificate...
              </div>
            )}

            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-neutral-950/80 border border-neutral-700 text-[10px] text-neutral-400 font-mono">
              1200 × 675 HD PNG
            </div>
          </div>

          {/* Key Breakdown Stats on Display */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">National Grade</div>
              <div className={`text-2xl font-bold font-cinzel ${gradeColor}`}>{grade}</div>
              <div className="text-[11px] text-neutral-300 truncate">{gradeTitle}</div>
            </div>

            <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Public Trust</div>
              <div className="text-2xl font-bold font-mono text-emerald-400">{publicApproval}%</div>
              <div className="text-[11px] text-neutral-400">Civil Sentiment</div>
            </div>

            <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Reserves</div>
              <div className="text-2xl font-bold font-mono text-sky-400">₦{treasuryTrillions}T</div>
              <div className="text-[11px] text-neutral-400">Federation Account</div>
            </div>

            <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Promises Kept</div>
              <div className="text-2xl font-bold font-mono text-amber-400">
                {keptPromises}/{totalPromises}
              </div>
              <div className="text-[11px] text-neutral-400">{promisePercent}% Delivered</div>
            </div>
          </div>

          {/* Social Media Sharing Actions Toolbar */}
          <div className="p-4 rounded-xl bg-neutral-950/90 border border-neutral-800 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" />
              Publish & Share Your Presidency
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              {/* 1. Download HD PNG */}
              <button
                onClick={handleDownloadImage}
                disabled={isGenerating}
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download HD Image</span>
              </button>

              {/* 2. Copy Image to Clipboard */}
              <button
                onClick={handleCopyImageToClipboard}
                className="w-full py-2.5 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                {copiedImage ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedImage ? 'Image Copied!' : 'Copy Image'}</span>
              </button>

              {/* 3. Share to WhatsApp */}
              <button
                onClick={handleShareWhatsApp}
                className="w-full py-2.5 px-3 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Status</span>
              </button>

              {/* 4. Share on X / Twitter */}
              <button
                onClick={handleShareTwitter}
                className="w-full py-2.5 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-sky-400 border border-sky-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span>Post to X</span>
              </button>
            </div>

            {/* Mobile native share fallback */}
            {typeof navigator !== 'undefined' && 'canShare' in navigator && (
              <button
                onClick={handleNativeShare}
                className="w-full mt-2 py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700/60 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Native Share Sheet (Instagram, Telegram, Direct Messages)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
