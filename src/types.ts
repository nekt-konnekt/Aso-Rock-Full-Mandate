export type FactionId = 'public' | 'party' | 'governors' | 'assembly' | 'media';

export interface FactionState {
  id: FactionId;
  name: string;
  value: number; // 0 - 100
  trend: 'up' | 'down' | 'steady';
  description: string;
  isHostile: boolean;
  hostileConsequence: string;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  category: 'cabinet' | 'party' | 'legislature' | 'governors' | 'opposition' | 'adviser';
  avatarInitials: string;
  loyalty: number; // 0 - 100
  influence: number; // 0 - 100
  trust: number; // 0 - 100
  bio: string;
  agenda: string;
  memories: string[]; // List of historical things they remember
  status: 'active' | 'resigned' | 'fired' | 'investigated';
}

export type PolicyArea = 'economy' | 'security' | 'infrastructure' | 'social' | 'governance' | 'survival';

export interface ChoiceImpact {
  factions: Partial<Record<FactionId, number>>;
  politicalCapital?: number;
  treasuryBillion?: number;
  characterLoyalty?: Record<string, number>; // characterId -> delta
  promiseEffect?: {
    promiseId: string;
    progressDelta: number; // positive or negative
    statusUpdate?: PromiseStatus;
  };
  delayedTrigger?: {
    inMonths: number;
    crisisId: string;
    reason: string;
  };
}

export interface CrisisChoice {
  id: string;
  label: string;
  description: string;
  capitalCost?: number;
  impact: ChoiceImpact;
  feedbackText: string;
  newspaperHeadline: string;
}

export interface Crisis {
  id: string;
  number: number;
  title: string;
  category: PolicyArea;
  reportedByCharacterId: string;
  urgency: 'routine' | 'urgent' | 'critical';
  contextDescription: string;
  characterQuote: string;
  choices: CrisisChoice[];
  isDelayedSpinoff?: boolean;
  spinoffOrigin?: string;
}

export type PromiseStatus = 'Pending' | 'In Progress' | 'Fulfilled' | 'Broken' | 'Compromised';

export interface CampaignPromise {
  id: string;
  title: string;
  category: PolicyArea;
  targetDescription: string;
  progress: number; // 0 - 100%
  status: PromiseStatus;
  voterRelevance: number; // weight
}

export interface NewspaperIssue {
  month: number;
  publicationName: string;
  headline: string;
  subhead: string;
  editorialSnippet: string;
  cartoonCaption: string;
  publicReaction: string;
  sourceDecision: string;
}

export interface DelayedEvent {
  id: string;
  triggerMonth: number;
  crisisId: string;
  reason: string;
}

export type GameEndingType = 'second_term' | 'successor' | 'opposition' | 'collapse';

export interface PresidentialRecord {
  id: string;
  presidentName: string;
  partyName: string;
  completedAt: string;
  totalMonths: number;
  ending: GameEndingType;
  legacyTitle: string;
  finalApproval: number;
  decisionsMade: number;
  ministersDismissed: number;
  investigationsLaunched: number;
  protestsQuelled: number;
  promisesFulfilled: number;
  promisesBroken: number;
  finalTreasuryTrillion: number;
  finalCapital: number;
  keyEventsSummary: string[];
}

export interface GameState {
  presidentName: string;
  partyName: string;
  currentMonth: number;
  maxMonths: number;
  politicalCapital: number;
  treasuryBillionNaira: number; // e.g. 4850 = ₦4.85 Trillion
  factions: Record<FactionId, FactionState>;
  characters: Record<string, Character>;
  promises: CampaignPromise[];
  activeCrisis: Crisis | null;
  priorityCrises: Crisis[]; // The 2 or 3 crises competing for attention this month
  delayedEvents: DelayedEvent[];
  recentHeadlines: NewspaperIssue[];
  pastDecisions: {
    month: number;
    crisisTitle: string;
    choiceLabel: string;
    impactSummary: string;
  }[];
  isGameOver: boolean;
  ending: GameEndingType | null;
  endingNarrative: string | null;
}
