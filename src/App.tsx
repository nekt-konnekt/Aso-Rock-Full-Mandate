import React, { useState, useEffect } from 'react';
import {
  GameState,
  FactionId,
  FactionState,
  Crisis,
  CrisisChoice,
  NewspaperIssue,
  GameEndingType,
  PresidentialRecord,
  PresidentArchetypeId,
  GeopoliticalZoneId,
  MonetizationItem,
  MonthEndFinancialReport,
} from './types';
import { INITIAL_CHARACTERS } from './data/characters';
import { INITIAL_PROMISES } from './data/promises';
import { CRISES_DATABASE } from './data/crises';
import { PRESIDENT_ARCHETYPES } from './data/archetypes';
import { INITIAL_GEOPOLITICAL_ZONES } from './data/geopoliticalZones';
import { STORE_ITEMS } from './data/monetization';
import { PresidentialBriefing } from './components/PresidentialBriefing';
import { CrisisCard } from './components/CrisisCard';
import { ExecutiveActionsModal } from './components/ExecutiveActionsModal';
import { CabinetDossier } from './components/CabinetDossier';
import { PromiseLedgerModal } from './components/PromiseLedgerModal';
import { NewspaperModal } from './components/NewspaperModal';
import { PresidentialArchiveModal } from './components/PresidentialArchiveModal';
import { ElectionEndingScreen } from './components/ElectionEndingScreen';
import { TitleScreen } from './components/TitleScreen';
import { CampaignSetupModal } from './components/CampaignSetupModal';
import { VIPStoreModal } from './components/VIPStoreModal';
import { GeopoliticalMapModal } from './components/GeopoliticalMapModal';
import { MonthEndReportModal } from './components/MonthEndReportModal';
import { PresidentialScorecardModal } from './components/PresidentialScorecardModal';
import {
  getPresidentialArchive,
  savePresidentialRecord,
  generateLegacyTitle,
} from './utils/archive';
import {
  playDecisionStamp,
  playAlertTone,
  playGavelKnock,
  playPhoneTone,
  playTriumphChime,
} from './utils/audio';
import {
  AlertCircle,
  ArrowRight,
  Flame,
  CheckCircle,
  FileText,
  Calendar,
  Zap,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ChevronRight,
  Users,
  Award,
  Compass,
} from 'lucide-react';

const INITIAL_FACTIONS: Record<FactionId, FactionState> = {
  public: {
    id: 'public',
    name: 'Public',
    value: 62,
    trend: 'steady',
    description: 'Measures broad public sentiment, living costs, jobs, and social peace.',
    isHostile: false,
    hostileConsequence: 'Mass transport strikes and nationwide cost-of-living demonstrations.',
  },
  party: {
    id: 'party',
    name: 'Party',
    value: 58,
    trend: 'steady',
    description: 'Your political machine, party delegates, state caucuses, and kingmakers.',
    isHostile: false,
    hostileConsequence: 'Caucus rebellions, mass floor-crossings, and defection threats.',
  },
  governors: {
    id: 'governors',
    name: 'Governors',
    value: 71,
    trend: 'steady',
    description: 'The 36 state chief executives commanding grassroots and FAAC revenue shares.',
    isHostile: false,
    hostileConsequence: 'Governors boycott National Economic Council and withhold revenue.',
  },
  assembly: {
    id: 'assembly',
    name: 'Assembly',
    value: 52,
    trend: 'steady',
    description: 'The bicameral National Assembly (Senate & House) passing budgets and screening appointees.',
    isHostile: false,
    hostileConsequence: 'Bills gridlocked in committee; threats of investigative summons.',
  },
  media: {
    id: 'media',
    name: 'Media',
    value: 46,
    trend: 'steady',
    description: 'National press corps, broadcast stations, digital publishers, and social channels.',
    isHostile: false,
    hostileConsequence: 'Tabloid exposés, leaked State House memos, and hostile investigative headlines.',
  },
};

const PARTIES = [
  'Federal Unity Party (FUP)',
  'People’s Reform Party (PRP)',
  'National Progressive Alliance (NPA)',
  'Democratic Peoples Congress (DPC)',
];

function getMonthPriorities(
  month: number,
  delayedList: GameState['delayedEvents'] = [],
  pastDecisions: GameState['pastDecisions'] = []
): Crisis[] {
  // 1. Check if any delayed spinoff events mature this month
  const maturedEvents = delayedList.filter((d) => d.triggerMonth === month);
  const maturedCrises: Crisis[] = [];

  maturedEvents.forEach((m) => {
    const match = CRISES_DATABASE.find((c) => c.id === m.crisisId);
    if (match) {
      maturedCrises.push(match);
    }
  });

  // 2. Select 2 or 3 standard crises matching this month or pool
  const pool = CRISES_DATABASE.filter(
    (c) =>
      !c.isDelayedSpinoff &&
      !pastDecisions.some((pd) => pd.crisisTitle === c.title)
  );

  // Pick top candidates
  const primaryCandidate = pool[(month - 1) % pool.length] || pool[0];
  const secondaryCandidate = pool[(month + 2) % pool.length] || pool[1];
  const tertiaryCandidate = pool[(month + 5) % pool.length] || pool[2];

  const candidates: Crisis[] = [...maturedCrises];
  if (primaryCandidate && !candidates.some((c) => c.id === primaryCandidate.id)) {
    candidates.push(primaryCandidate);
  }
  if (secondaryCandidate && !candidates.some((c) => c.id === secondaryCandidate.id)) {
    candidates.push(secondaryCandidate);
  }
  if (tertiaryCandidate && candidates.length < 3 && !candidates.some((c) => c.id === tertiaryCandidate.id)) {
    candidates.push(tertiaryCandidate);
  }

  return candidates.slice(0, 3);
}

export default function App() {
  // Game Setup & Core State with synchronous initial priorities
  const [gameState, setGameState] = useState<GameState>(() => {
    const initialPriorities = getMonthPriorities(1, [], []);
    return {
      gameStage: 'title_screen',
      archetype: 'technocrat',
      difficulty: 'standard',
      difficultyMode: 'standard',
      presidentName: 'President Oluwaseun Adewale',
      partyName: 'Federal Unity Party (FUP)',
      currentMonth: 1,
      maxMonths: 12,
      politicalCapital: 60,
      treasuryBillionNaira: 5600,
      factions: JSON.parse(JSON.stringify(INITIAL_FACTIONS)),
      characters: JSON.parse(JSON.stringify(INITIAL_CHARACTERS)),
      promises: JSON.parse(JSON.stringify(INITIAL_PROMISES)),
      geopoliticalZones: JSON.parse(JSON.stringify(INITIAL_GEOPOLITICAL_ZONES)),
      monetizationInventory: ['pass_vip_executive'],
      unlockedStoreItems: ['pass_vip_executive'],
      vipUnlocked: true,
      intelligenceRadarActive: true,
      undoTokens: 3,
      economicIndicators: {
        crudeOilPriceUSD: 78.5,
        inflationPercent: 28.4,
        nairaToUSD: 1480,
      },
      lastMonthFinancials: null,
      monthEndReport: null,
      activeCrisis: initialPriorities[0] || null,
      priorityCrises: initialPriorities,
      delayedEvents: [],
      recentHeadlines: [],
      pastDecisions: [],
      isGameOver: false,
      ending: null,
      endingNarrative: null,
    };
  });

  // Modals & Panels
  const [isExecutiveModalOpen, setIsExecutiveModalOpen] = useState(false);
  const [isCabinetModalOpen, setIsCabinetModalOpen] = useState(false);
  const [isPromisesModalOpen, setIsPromisesModalOpen] = useState(false);
  const [isNewspaperModalOpen, setIsNewspaperModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isCampaignSetupOpen, setIsCampaignSetupOpen] = useState(false);
  const [isVIPStoreOpen, setIsVIPStoreOpen] = useState(false);
  const [isGeopoliticalMapOpen, setIsGeopoliticalMapOpen] = useState(false);
  const [isScorecardOpen, setIsScorecardOpen] = useState(false);

  // Last decision feedback toast
  const [decisionFeedback, setDecisionFeedback] = useState<{
    headline: string;
    text: string;
    factions: Partial<Record<FactionId, number>>;
    characterQuotes?: string;
  } | null>(null);

  // Archive records
  const [archive, setArchive] = useState<PresidentialRecord[]>(getPresidentialArchive());

  // Handle Crisis Choice Selection
  const handleSelectChoice = (choice: CrisisChoice) => {
    if (!gameState.activeCrisis) return;

    playGavelKnock();

    const crisis = gameState.activeCrisis;
    const impact = choice.impact;

    // Calculate new factions
    const nextFactions = { ...gameState.factions };
    Object.entries(impact.factions).forEach(([fKey, delta]) => {
      if (delta) {
        const id = fKey as FactionId;
        const currentVal = nextFactions[id].value;
        const newVal = Math.min(100, Math.max(0, currentVal + delta));
        nextFactions[id] = {
          ...nextFactions[id],
          value: newVal,
          trend: delta > 0 ? 'up' : delta < 0 ? 'down' : 'steady',
          isHostile: newVal < 22,
        };
      }
    });

    // Capital & Treasury
    const capitalCost = choice.capitalCost || 0;
    const nextCapital = Math.max(0, gameState.politicalCapital - capitalCost);
    const treasuryDelta = impact.treasuryBillion || 0;
    const nextTreasury = Math.max(0, gameState.treasuryBillionNaira + treasuryDelta);

    // Characters Loyalty & Memories
    const nextCharacters = { ...gameState.characters };
    if (impact.characterLoyalty) {
      Object.entries(impact.characterLoyalty).forEach(([charId, delta]) => {
        if (nextCharacters[charId]) {
          const currentLoyalty = nextCharacters[charId].loyalty;
          const newLoyalty = Math.min(100, Math.max(0, currentLoyalty + delta));
          nextCharacters[charId] = {
            ...nextCharacters[charId],
            loyalty: newLoyalty,
            memories: [
              `Month ${gameState.currentMonth}: ${choice.label} on "${crisis.title}"`,
              ...nextCharacters[charId].memories.slice(0, 5),
            ],
            status: newLoyalty < 15 ? 'resigned' : nextCharacters[charId].status,
          };
        }
      });
    }

    // Promise progress
    const nextPromises = [...gameState.promises];
    if (impact.promiseEffect) {
      const { promiseId, progressDelta, statusUpdate } = impact.promiseEffect;
      const pIdx = nextPromises.findIndex((p) => p.id === promiseId);
      if (pIdx >= 0) {
        const p = nextPromises[pIdx];
        const newProg = Math.min(100, Math.max(0, p.progress + progressDelta));
        nextPromises[pIdx] = {
          ...p,
          progress: newProg,
          status: statusUpdate || (newProg >= 90 ? 'Fulfilled' : newProg <= 15 ? 'Broken' : 'In Progress'),
        };
      }
    }

    // Delayed consequences
    const nextDelayed = [...gameState.delayedEvents];
    if (impact.delayedTrigger) {
      nextDelayed.push({
        id: `delay_${Date.now()}`,
        triggerMonth: gameState.currentMonth + impact.delayedTrigger.inMonths,
        crisisId: impact.delayedTrigger.crisisId,
        reason: impact.delayedTrigger.reason,
      });
    }

    // Create newspaper issue
    const newIssue: NewspaperIssue = {
      month: gameState.currentMonth,
      publicationName: 'The Daily Mandate',
      headline: choice.newspaperHeadline,
      subhead: `Aso Rock addresses ${crisis.title} with historic executive action.`,
      editorialSnippet: choice.feedbackText,
      cartoonCaption: `Presidential signature seals verdict on ${crisis.title.toLowerCase()}.`,
      publicReaction: `Citizens and market operators react to the ${choice.label.toLowerCase()} decision.`,
      sourceDecision: choice.label,
    };

    const nextHeadlines = [newIssue, ...gameState.recentHeadlines];

    // Past decisions audit
    const newPastDecision = {
      month: gameState.currentMonth,
      crisisTitle: crisis.title,
      choiceLabel: choice.label,
      impactSummary: choice.feedbackText,
    };
    const nextPastDecisions = [newPastDecision, ...gameState.pastDecisions];

    // Show feedback banner
    setDecisionFeedback({
      headline: choice.newspaperHeadline,
      text: choice.feedbackText,
      factions: impact.factions,
    });

    // Check game over / systemic collapse condition
    // Collapse occurs if 3 or more factions are simultaneously in hostile breakdown (< 20)
    const hostileCount = Object.values(nextFactions).filter((f) => f.value < 20).length;
    const isTermFinished = gameState.currentMonth >= gameState.maxMonths;

    if (hostileCount >= 3) {
      // Constitutional collapse!
      triggerGameEnd('collapse', nextFactions, nextTreasury, nextPromises, nextPastDecisions);
      return;
    }

    if (isTermFinished) {
      // Calculate election outcome
      const avgApproval =
        (nextFactions.public.value * 2 +
          nextFactions.party.value +
          nextFactions.governors.value +
          nextFactions.assembly.value) /
        5;

      let finalEnding: GameEndingType = 'second_term';
      if (avgApproval >= 58) {
        finalEnding = 'second_term';
      } else if (avgApproval >= 48) {
        finalEnding = 'successor';
      } else {
        finalEnding = 'opposition';
      }

      triggerGameEnd(finalEnding, nextFactions, nextTreasury, nextPromises, nextPastDecisions);
      return;
    }

    // Advance to next month with State of the Nation FAAC financial report
    const nextMonth = gameState.currentMonth + 1;
    // Monthly political capital regeneration: +6 base, + bonuses for healthy factions
    const capitalRegen = 6 + (nextFactions.party.value > 60 ? 2 : 0) + (nextFactions.assembly.value > 60 ? 2 : 0);
    const refreshedCapital = Math.min(100, nextCapital + capitalRegen);

    const nextPriorities = getMonthPriorities(nextMonth, nextDelayed, nextPastDecisions);

    // Generate monthly macro financial report
    const grossOil = 1150 + Math.floor(Math.random() * 180);
    const faacDeduction = 640 + Math.floor(Math.random() * 60);
    const debtService = 260;
    const netTreasuryMonthly = grossOil - faacDeduction - debtService;

    const monthlyReport: MonthEndFinancialReport = {
      month: gameState.currentMonth,
      grossOilRevenueBillion: grossOil,
      faacStateDeductionBillion: faacDeduction,
      debtServicingBillion: debtService,
      netFederationTreasuryDelta: netTreasuryMonthly,
      crudeOilPriceUSD: 78.5,
      inflationRate: 28.2,
      nairaExchangeRate: 1490,
      headline: nextHeadlines[0]?.headline || `Presidential Order Gazetted at Aso Rock Villa`,
    };

    setGameState((prev) => ({
      ...prev,
      currentMonth: nextMonth,
      politicalCapital: refreshedCapital,
      treasuryBillionNaira: nextTreasury + netTreasuryMonthly,
      factions: nextFactions,
      characters: nextCharacters,
      promises: nextPromises,
      delayedEvents: nextDelayed,
      recentHeadlines: nextHeadlines,
      pastDecisions: nextPastDecisions,
      priorityCrises: nextPriorities,
      activeCrisis: nextPriorities[0] || null,
      monthEndReport: monthlyReport,
    }));
  };

  // Purchase In-Game Item (VIP Pass, Scenarios, Boosters)
  const handlePurchaseItem = (item: MonetizationItem) => {
    setGameState((prev) => {
      const nextInventory = prev.unlockedStoreItems.includes(item.id)
        ? prev.unlockedStoreItems
        : [...prev.unlockedStoreItems, item.id];

      let bonusCapital = 0;
      let bonusTreasury = 0;
      let bonusUndo = 0;
      let vipNow = prev.vipUnlocked;
      let radarNow = prev.intelligenceRadarActive;

      if (item.id === 'pass_vip_executive') {
        vipNow = true;
        radarNow = true;
        bonusUndo += 3;
      } else if (item.id === 'booster_imf_facility') {
        bonusTreasury += 1500;
      } else if (item.id === 'booster_godfather_capital') {
        bonusCapital += 35;
      } else if (item.id === 'booster_pardon_tokens_pack') {
        bonusUndo += 3;
      }

      return {
        ...prev,
        unlockedStoreItems: nextInventory,
        monetizationInventory: nextInventory,
        vipUnlocked: vipNow,
        intelligenceRadarActive: radarNow,
        politicalCapital: Math.min(100, prev.politicalCapital + bonusCapital),
        treasuryBillionNaira: prev.treasuryBillionNaira + bonusTreasury,
        undoTokens: prev.undoTokens + bonusUndo,
      };
    });
  };

  // Start a fresh presidential campaign with archetype bonuses
  const handleStartNewCampaign = (params: {
    name: string;
    party: string;
    archetype: PresidentArchetypeId;
    difficulty: 'standard' | 'iron_statesman';
  }) => {
    const archetypeData =
      PRESIDENT_ARCHETYPES.find((a) => a.id === params.archetype) || PRESIDENT_ARCHETYPES[0];
    const resetFactions = JSON.parse(JSON.stringify(INITIAL_FACTIONS));

    // Apply archetype faction affinities
    if (archetypeData.factionAffinities) {
      Object.entries(archetypeData.factionAffinities).forEach(([k, v]) => {
        const fId = k as FactionId;
        if (resetFactions[fId]) {
          resetFactions[fId].value = Math.max(15, Math.min(95, resetFactions[fId].value + (v || 0)));
        }
      });
    }

    const resetCharacters = JSON.parse(JSON.stringify(INITIAL_CHARACTERS));
    const resetPromises = JSON.parse(JSON.stringify(INITIAL_PROMISES));
    const initialPriorities = getMonthPriorities(1, [], []);

    setGameState((prev) => ({
      ...prev,
      gameStage: 'playing',
      archetype: params.archetype,
      difficulty: params.difficulty,
      difficultyMode: params.difficulty,
      presidentName: params.name,
      partyName: params.party,
      currentMonth: 1,
      maxMonths: 12,
      politicalCapital: 50 + archetypeData.startingCapitalBonus,
      treasuryBillionNaira: 4850 + archetypeData.startingTreasuryBonusBillion,
      factions: resetFactions,
      characters: resetCharacters,
      promises: resetPromises,
      geopoliticalZones: JSON.parse(JSON.stringify(INITIAL_GEOPOLITICAL_ZONES)),
      activeCrisis: initialPriorities[0] || null,
      priorityCrises: initialPriorities,
      delayedEvents: [],
      recentHeadlines: [],
      pastDecisions: [],
      isGameOver: false,
      ending: null,
      endingNarrative: null,
      monthEndReport: null,
    }));

    setDecisionFeedback(null);
    setIsCampaignSetupOpen(false);
  };

  // Trigger Election / Ending Screen
  const triggerGameEnd = (
    ending: GameEndingType,
    factions: Record<FactionId, FactionState>,
    finalTreasury: number,
    promises: GameState['promises'],
    pastDecisions: GameState['pastDecisions']
  ) => {
    const approval = factions.public.value;
    const treasuryTrillion = finalTreasury / 1000;
    const fulfilled = promises.filter((p) => p.status === 'Fulfilled' || p.progress >= 85).length;
    const broken = promises.filter((p) => p.status === 'Broken' || p.progress < 30).length;
    const ministersFired = Object.values(gameState.characters).filter((c) => c.status === 'fired').length;

    const legacy = generateLegacyTitle(ending, approval, treasuryTrillion, fulfilled, ministersFired);

    const record: PresidentialRecord = {
      id: `record_${Date.now()}`,
      presidentName: gameState.presidentName,
      partyName: gameState.partyName,
      completedAt: new Date().toISOString().split('T')[0],
      totalMonths: gameState.currentMonth,
      ending,
      legacyTitle: legacy,
      finalApproval: approval,
      decisionsMade: pastDecisions.length,
      ministersDismissed: ministersFired,
      investigationsLaunched: 1,
      protestsQuelled: 1,
      promisesFulfilled: fulfilled,
      promisesBroken: broken,
      finalTreasuryTrillion: treasuryTrillion,
      finalCapital: gameState.politicalCapital,
      keyEventsSummary: pastDecisions.slice(0, 4).map((d) => `Month ${d.month}: ${d.crisisTitle} — ${d.choiceLabel}`),
    };

    savePresidentialRecord(record);
    setArchive(getPresidentialArchive());

    setGameState((prev) => ({
      ...prev,
      isGameOver: true,
      ending,
    }));
  };

  // Execute an Executive Action (-PC)
  const handleExecuteAction = (actionId: string, cost: number, targetId?: string) => {
    setGameState((prev) => {
      const nextCapital = Math.max(0, prev.politicalCapital - cost);
      const nextFactions = { ...prev.factions };
      const nextCharacters = { ...prev.characters };
      let treasuryDelta = 0;

      switch (actionId) {
        case 'call_governor':
          nextFactions.governors.value = Math.min(100, nextFactions.governors.value + 8);
          if (targetId && nextCharacters[targetId]) {
            nextCharacters[targetId].loyalty = Math.min(100, nextCharacters[targetId].loyalty + 10);
            nextCharacters[targetId].memories.unshift(
              `Month ${prev.currentMonth}: Received presidential private hotline consultation.`
            );
          }
          break;

        case 'meet_party_leaders':
          nextFactions.party.value = Math.min(100, nextFactions.party.value + 12);
          nextCharacters.party_chairman.loyalty = Math.min(100, nextCharacters.party_chairman.loyalty + 10);
          nextCharacters.party_chairman.memories.unshift(
            `Month ${prev.currentMonth}: Attended exclusive Villa caucus banquet.`
          );
          break;

        case 'address_nation':
          nextFactions.public.value = Math.min(100, nextFactions.public.value + 10);
          nextFactions.media.value = Math.min(100, nextFactions.media.value + 8);
          treasuryDelta = -20;
          break;

        case 'fire_minister':
          if (targetId && nextCharacters[targetId]) {
            nextCharacters[targetId].status = 'fired';
            nextCharacters[targetId].loyalty = 5;
            nextCharacters[targetId].memories.unshift(
              `Month ${prev.currentMonth}: Relieved of ministerial portfolio by presidential directive.`
            );
          }
          nextFactions.public.value = Math.min(100, nextFactions.public.value + 12);
          nextFactions.media.value = Math.min(100, nextFactions.media.value + 8);
          break;

        case 'launch_investigation':
          nextFactions.public.value = Math.min(100, nextFactions.public.value + 14);
          nextFactions.governors.value = Math.max(0, nextFactions.governors.value - 10);
          treasuryDelta = 45; // Recovered assets
          break;

        case 'push_legislation':
          nextFactions.assembly.value = Math.min(100, nextFactions.assembly.value + 16);
          nextCharacters.senate_leader.loyalty = Math.min(100, nextCharacters.senate_leader.loyalty + 8);
          break;

        case 'cabinet_reshuffle':
          nextFactions.public.value = Math.min(100, nextFactions.public.value + 10);
          nextFactions.party.value = Math.min(100, nextFactions.party.value + 6);
          break;

        case 'emergency_intervention':
          // Quells all hostiles instantly
          Object.keys(nextFactions).forEach((k) => {
            const f = k as FactionId;
            nextFactions[f].value = Math.min(100, nextFactions[f].value + 16);
            nextFactions[f].isHostile = false;
          });
          treasuryDelta = -150;
          break;
      }

      // Re-evaluate hostility
      Object.keys(nextFactions).forEach((k) => {
        const f = k as FactionId;
        nextFactions[f].isHostile = nextFactions[f].value < 22;
      });

      return {
        ...prev,
        politicalCapital: nextCapital,
        treasuryBillionNaira: Math.max(0, prev.treasuryBillionNaira + treasuryDelta),
        factions: nextFactions,
        characters: nextCharacters,
      };
    });
  };

  // If on Title Screen, render full Game Title Screen experience
  if (gameState.gameStage === 'title_screen') {
    return (
      <>
        <TitleScreen
          gameState={gameState}
          archive={archive}
          onStartNewCampaign={() => setIsCampaignSetupOpen(true)}
          onResumeMandate={() => setGameState((p) => ({ ...p, gameStage: 'playing' }))}
          onOpenStore={() => setIsVIPStoreOpen(true)}
          onOpenArchive={() => setIsArchiveModalOpen(true)}
          onOpenGeopoliticalMap={() => setIsGeopoliticalMapOpen(true)}
        />
        <CampaignSetupModal
          isOpen={isCampaignSetupOpen}
          onClose={() => setIsCampaignSetupOpen(false)}
          onStartGame={handleStartNewCampaign}
          initialName={gameState.presidentName}
          initialParty={gameState.partyName}
        />
        <VIPStoreModal
          isOpen={isVIPStoreOpen}
          onClose={() => setIsVIPStoreOpen(false)}
          unlockedItemIds={gameState.unlockedStoreItems}
          onPurchaseItem={handlePurchaseItem}
        />
        <PresidentialArchiveModal
          isOpen={isArchiveModalOpen}
          onClose={() => setIsArchiveModalOpen(false)}
          archive={archive}
          onStartNewPresidency={() => {
            setIsArchiveModalOpen(false);
            setIsCampaignSetupOpen(true);
          }}
          onUpdateArchive={setArchive}
        />
        <GeopoliticalMapModal
          isOpen={isGeopoliticalMapOpen}
          onClose={() => setIsGeopoliticalMapOpen(false)}
          zones={gameState.geopoliticalZones}
          politicalCapital={gameState.politicalCapital}
        />
      </>
    );
  }

  // If Game Over, render Grand Election & Mandate screen
  if (gameState.isGameOver && gameState.ending) {
    const latestRecord = archive[0] || {
      id: 'rec_latest',
      presidentName: gameState.presidentName,
      partyName: gameState.partyName,
      completedAt: new Date().toISOString().split('T')[0],
      totalMonths: gameState.currentMonth,
      ending: gameState.ending,
      legacyTitle: 'The Mandate Holder',
      finalApproval: gameState.factions.public.value,
      decisionsMade: gameState.pastDecisions.length,
      ministersDismissed: 0,
      investigationsLaunched: 1,
      protestsQuelled: 1,
      promisesFulfilled: 3,
      promisesBroken: 2,
      finalTreasuryTrillion: gameState.treasuryBillionNaira / 1000,
      finalCapital: gameState.politicalCapital,
      keyEventsSummary: [],
    };

    return (
      <>
        <ElectionEndingScreen
          ending={gameState.ending}
          record={latestRecord}
          factions={gameState.factions}
          promises={gameState.promises}
          onPlayAgain={() => setIsCampaignSetupOpen(true)}
          onViewArchive={() => setIsArchiveModalOpen(true)}
          onOpenScorecard={() => setIsScorecardOpen(true)}
        />
        <PresidentialArchiveModal
          isOpen={isArchiveModalOpen}
          onClose={() => setIsArchiveModalOpen(false)}
          archive={archive}
          onStartNewPresidency={() => {
            setIsArchiveModalOpen(false);
            setIsCampaignSetupOpen(true);
          }}
          onUpdateArchive={setArchive}
        />
        <PresidentialScorecardModal
          isOpen={isScorecardOpen}
          onClose={() => setIsScorecardOpen(false)}
          presidentName={gameState.presidentName}
          partyName={gameState.partyName}
          archetype={gameState.archetype}
          currentMonth={gameState.currentMonth}
          maxMonths={gameState.maxMonths}
          factions={gameState.factions}
          treasuryBillionNaira={gameState.treasuryBillionNaira}
          politicalCapital={gameState.politicalCapital}
          promises={gameState.promises}
          geopoliticalZones={Object.values(gameState.geopoliticalZones)}
          legacyTitle={latestRecord.legacyTitle}
        />
      </>
    );
  }

  const currentReporter =
    gameState.activeCrisis
      ? gameState.characters[gameState.activeCrisis.reportedByCharacterId]
      : undefined;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-800 selection:text-white">
      {/* Top Presidential Briefing Ribbon */}
      <PresidentialBriefing
        currentMonth={gameState.currentMonth}
        maxMonths={gameState.maxMonths}
        politicalCapital={gameState.politicalCapital}
        treasuryBillionNaira={gameState.treasuryBillionNaira}
        factions={gameState.factions}
        presidentName={gameState.presidentName}
        partyName={gameState.partyName}
        archetypeName={PRESIDENT_ARCHETYPES.find((a) => a.id === gameState.archetype)?.name}
        vipUnlocked={gameState.vipUnlocked}
        onOpenExecutiveActions={() => setIsExecutiveModalOpen(true)}
        onOpenCabinetDossier={() => setIsCabinetModalOpen(true)}
        onOpenPromises={() => setIsPromisesModalOpen(true)}
        onOpenNewspaper={() => setIsNewspaperModalOpen(true)}
        onOpenArchive={() => setIsArchiveModalOpen(true)}
        onOpenGeopoliticalMap={() => setIsGeopoliticalMapOpen(true)}
        onReturnToTitle={() => setGameState((p) => ({ ...p, gameStage: 'title_screen' }))}
        unreadHeadlinesCount={gameState.recentHeadlines.length}
      />

      {/* Main Command Room Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-6">
        {/* Month Priority Triage Deck */}
        {gameState.priorityCrises.length > 1 && (
          <section className="bg-neutral-900 border-2 border-neutral-800 rounded-3xl p-5 sm:p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-neutral-400">
                  Daily Presidential Briefing • Month {gameState.currentMonth} Priorities
                </span>
                <h3 className="text-lg sm:text-xl font-cinzel font-black text-neutral-100">
                  Competing Agendas — Choose Where to Intervene
                </h3>
              </div>
              <span className="text-xs sm:text-sm text-neutral-300 italic font-medium">
                "Choosing what to ignore is itself an executive decision."
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {gameState.priorityCrises.map((pCrisis, idx) => {
                const isSelected = gameState.activeCrisis?.id === pCrisis.id;
                const isDelayed = pCrisis.isDelayedSpinoff;

                return (
                  <button
                    key={pCrisis.id}
                    onClick={() => {
                      playAlertTone();
                      setGameState((prev) => ({ ...prev, activeCrisis: pCrisis }));
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between active:scale-98 ${
                      isSelected
                        ? 'bg-neutral-950 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg'
                        : 'bg-neutral-950/80 hover:bg-neutral-800 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-mono font-bold text-neutral-400">Priority #{idx + 1}</span>
                        {isDelayed && (
                          <span className="text-amber-400 font-bold text-xs flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5" /> Past Fallout
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-neutral-100 line-clamp-1">{pCrisis.title}</h4>
                      <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 mt-1.5 leading-relaxed font-normal">
                        {pCrisis.contextDescription}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-xs">
                      <span className="capitalize text-neutral-300 font-semibold">{pCrisis.category}</span>
                      <span
                        className={`font-bold flex items-center gap-1 ${
                          isSelected ? 'text-emerald-400' : 'text-neutral-400'
                        }`}
                      >
                        {isSelected ? 'Active File' : 'Open File'} <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Feedback Alert from Previous Decision */}
        {decisionFeedback && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-neutral-900 to-neutral-950 border-2 border-emerald-500/50 shadow-lg flex items-start gap-3.5 animate-in fade-in duration-300">
            <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Presidential Order Dispatched & Gazetted
              </span>
              <h4 className="font-black text-base sm:text-lg text-neutral-100 font-cinzel mt-0.5">{decisionFeedback.headline}</h4>
              <p className="text-sm text-neutral-200 mt-1 font-normal leading-relaxed">{decisionFeedback.text}</p>
            </div>
            <button
              onClick={() => setDecisionFeedback(null)}
              className="text-neutral-400 hover:text-neutral-200 text-xs font-bold px-2.5 py-1 rounded-lg bg-neutral-800/80 border border-neutral-700"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Executive Desk Controls Deck */}
        <div className="bg-neutral-900 border-2 border-neutral-800 rounded-2xl px-5 py-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-mono uppercase font-bold tracking-wider text-neutral-200">
              Aso Rock Villa Command Deck
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsVIPStoreOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-500/60 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
              title="Access presidential perks, emergency war chest, and wiretaps"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Game Perks & Boosters</span>
            </button>
            <button
              onClick={() => setIsExecutiveModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-neutral-950 text-xs sm:text-sm font-black flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Executive Decree ({gameState.politicalCapital} PC)</span>
            </button>
            <button
              onClick={() => setIsGeopoliticalMapOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Geopolitical Map</span>
            </button>
          </div>
        </div>

        {/* Active Crisis File Card */}
        {gameState.activeCrisis ? (
          <CrisisCard
            crisis={gameState.activeCrisis}
            reporter={currentReporter}
            politicalCapital={gameState.politicalCapital}
            onSelectChoice={handleSelectChoice}
            timerEnabled={gameState.difficulty === 'iron_statesman'}
            intelligenceRadarActive={gameState.intelligenceRadarActive}
            onOpenPerkStore={() => setIsVIPStoreOpen(true)}
          />
        ) : (
          <div className="text-center py-16 bg-neutral-900/50 rounded-2xl border border-neutral-800">
            <Calendar className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="font-cinzel text-xl font-bold">Cabinet Session Adjourned</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Preparing national briefing dossiers for Month {gameState.currentMonth + 1}...
            </p>
          </div>
        )}
      </main>

      {/* Footer Systemic Status & Nigerian Context */}
      <footer className="bg-neutral-950 border-t border-neutral-800/80 px-4 py-3 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold text-neutral-300">Aso Rock: Full Mandate</span>
            <span className="text-neutral-600">•</span>
            <span>A Nigerian Political Survival Strategy Game</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Systemic Factions</span>
            <span className="text-neutral-600">•</span>
            <span>6 Geopolitical Zones</span>
            <span className="text-neutral-600">•</span>
            <button
              onClick={() => setIsCampaignSetupOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Inaugurate New Mandate
            </button>
          </div>
        </div>
      </footer>

      {/* All Sub-Modals */}
      <ExecutiveActionsModal
        isOpen={isExecutiveModalOpen}
        onClose={() => setIsExecutiveModalOpen(false)}
        politicalCapital={gameState.politicalCapital}
        characters={gameState.characters}
        onExecuteAction={handleExecuteAction}
      />

      <CabinetDossier
        isOpen={isCabinetModalOpen}
        onClose={() => setIsCabinetModalOpen(false)}
        characters={gameState.characters}
      />

      <PromiseLedgerModal
        isOpen={isPromisesModalOpen}
        onClose={() => setIsPromisesModalOpen(false)}
        promises={gameState.promises}
      />

      <NewspaperModal
        isOpen={isNewspaperModalOpen}
        onClose={() => setIsNewspaperModalOpen(false)}
        issues={gameState.recentHeadlines}
        currentMonth={gameState.currentMonth}
      />

      <PresidentialArchiveModal
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        archive={archive}
        onStartNewPresidency={() => {
          setIsArchiveModalOpen(false);
          setIsCampaignSetupOpen(true);
        }}
        onUpdateArchive={setArchive}
      />

      <VIPStoreModal
        isOpen={isVIPStoreOpen}
        onClose={() => setIsVIPStoreOpen(false)}
        unlockedItemIds={gameState.unlockedStoreItems}
        onPurchaseItem={handlePurchaseItem}
      />

      <GeopoliticalMapModal
        isOpen={isGeopoliticalMapOpen}
        onClose={() => setIsGeopoliticalMapOpen(false)}
        zones={gameState.geopoliticalZones}
        politicalCapital={gameState.politicalCapital}
      />

      <CampaignSetupModal
        isOpen={isCampaignSetupOpen}
        onClose={() => setIsCampaignSetupOpen(false)}
        onStartGame={handleStartNewCampaign}
        initialName={gameState.presidentName}
        initialParty={gameState.partyName}
      />

      <PresidentialScorecardModal
        isOpen={isScorecardOpen}
        onClose={() => setIsScorecardOpen(false)}
        presidentName={gameState.presidentName}
        partyName={gameState.partyName}
        archetype={gameState.archetype}
        currentMonth={gameState.currentMonth}
        maxMonths={gameState.maxMonths}
        factions={gameState.factions}
        treasuryBillionNaira={gameState.treasuryBillionNaira}
        politicalCapital={gameState.politicalCapital}
        promises={gameState.promises}
        geopoliticalZones={Object.values(gameState.geopoliticalZones)}
        legacyTitle={gameState.endingNarrative?.split('.')[0]}
      />

      {/* Month End State of the Nation Report */}
      {gameState.monthEndReport && (
        <MonthEndReportModal
          isOpen={true}
          onProceedToNextMonth={() => setGameState((p) => ({ ...p, monthEndReport: null }))}
          report={gameState.monthEndReport}
          factions={gameState.factions}
          nextMonthNumber={gameState.currentMonth}
        />
      )}
    </div>
  );
}
