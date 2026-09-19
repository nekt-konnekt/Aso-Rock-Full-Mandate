import { PresidentArchetype } from '../types';

export const PRESIDENT_ARCHETYPES: PresidentArchetype[] = [
  {
    id: 'technocrat',
    name: 'The Technocrat',
    tagline: 'Former World Bank Director & Central Banker',
    description:
      'Governs by spreadsheet, balance sheets, and structural reforms. Commands instant credibility with international lenders and investors, but struggles with raw street populism and party godfathers.',
    startingCapitalBonus: 10,
    startingTreasuryBonusBillion: 750,
    factionAffinities: {
      public: -6,
      governors: 8,
      assembly: 4,
      media: 10,
    },
    specialPerk: 'Sovereign Solvency: Treasury gains +15% more from oil revenue each quarter.',
    quote: '"Sentimentality does not service national debt. We must restructure or perish."',
  },
  {
    id: 'general',
    name: 'The Retired General',
    tagline: 'Decorated Division Commander & Former Military Governor',
    description:
      'Commands immense discipline, military loyalty, and fear across state governors. Uncompromising on national territorial security, but viewed with suspicion by the human rights press and civil society.',
    startingCapitalBonus: 15,
    startingTreasuryBonusBillion: 200,
    factionAffinities: {
      public: 4,
      governors: 14,
      assembly: -6,
      media: -12,
    },
    specialPerk: 'Command & Control: Security crises and border disputes cost 50% less political capital.',
    quote: '"The sovereignty and territorial integrity of the Federal Republic is non-negotiable."',
  },
  {
    id: 'populist',
    name: 'The Grassroots Populist',
    tagline: 'Fiery Labor Organizer & Champion of the Streets',
    description:
      'Carried to Aso Rock on a wave of worker optimism, market women rallies, and student movements. Has direct street credibility, but party barons and legislative leaders plot constantly to frustrate your bills.',
    startingCapitalBonus: 5,
    startingTreasuryBonusBillion: -250,
    factionAffinities: {
      public: 18,
      party: -12,
      governors: -10,
      assembly: -10,
      media: 12,
    },
    specialPerk: 'Voice of the Streets: Public approval decreases 25% slower from economic price hikes.',
    quote: '"Aso Rock belongs to the market seller and the artisan, not the political cartels."',
  },
  {
    id: 'oil_magnate',
    name: 'The Oil Tycoon Kingmaker',
    tagline: 'Extractive Energy Titan & Party Financier',
    description:
      'Understands how power is bought and traded in Abuja hotel backrooms. Has a deep network among party delegates and assembly committee chairs, but the press watches your family businesses like hawks.',
    startingCapitalBonus: 25,
    startingTreasuryBonusBillion: 500,
    factionAffinities: {
      public: -8,
      party: 16,
      governors: 12,
      assembly: 14,
      media: -14,
    },
    specialPerk: 'Patronage Machine: Regains +4 extra Political Capital every month.',
    quote: '"Every man has his price, Mr. Speaker. Let us discuss budgetary appropriations."',
  },
];
