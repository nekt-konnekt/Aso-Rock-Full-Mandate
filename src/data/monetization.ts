import { MonetizationItem } from '../types';

export const STORE_ITEMS: MonetizationItem[] = [
  // 1. VIP Executive Permanent Pass
  {
    id: 'pass_vip_executive',
    name: 'Presidential Oval Office VIP Pass',
    category: 'privilege',
    priceNaira: 4500,
    priceUSD: 4.99,
    badge: 'Best Value',
    description:
      'The ultimate mandate unlock. Permanently enables State Intelligence Radar (reveals hidden minister loyalty scores, secret faction consequences, and true impact previews), unlocks golden executive stamp, and grants 3 Presidential Pardon Undo Tokens per game.',
    perks: [
      'State Intelligence Radar: View hidden character loyalty & true impact numbers',
      'Golden Presidential Coat-of-Arms Seal',
      'Start every game with 3 Presidential Pardon Undo Tokens',
      'Removes all cooldowns on Presidential Executive Orders',
    ],
  },

  // 2. Expansion DLC Scenarios
  {
    id: 'scenario_1999_democracy',
    name: '1999: Return to Democracy (Scenario DLC)',
    category: 'expansion',
    priceNaira: 3200,
    priceUSD: 3.49,
    badge: 'Historic Scenario',
    description:
      'Step into the shoes of the newly sworn-in 1999 civilian President. Inherit a broke treasury, a nervous military high command, ethnic militias, and 15 years of deferred infrastructure decay. Can you shepherd the Republic into a constitutional dawn?',
    perks: [
      '12 Exclusive Historic 1999 Crises (Odi crisis, Sharia declaration, Paris Club debt negotiation)',
      'Historic 1999 Cabinet ministers and military generals',
      'Special "Constitution Restorer" Legacy Ending',
    ],
  },
  {
    id: 'scenario_2027_third_term',
    name: 'The Third Term Ambition (Scenario DLC)',
    category: 'expansion',
    priceNaira: 3200,
    priceUSD: 3.49,
    badge: 'Political Thriller',
    description:
      'Your 2nd term is expiring, but party loyalists and state governors urge you to amend Section 137 of the 1999 Constitution to seek a third term. Navigate intense legislative bribery scandals, diplomatic fury from Washington & London, and nationwide riots.',
    perks: [
      'National Assembly Constitutional Amendment vote engine',
      'Secret bribery & party whip mechanics',
      '3 Alternate endings: "The Immortal Mandate", "Impeachment", or "Exile"',
    ],
  },
  {
    id: 'scenario_war_cabinet',
    name: 'State of Emergency: War Cabinet (Scenario DLC)',
    category: 'expansion',
    priceNaira: 3200,
    priceUSD: 3.49,
    badge: 'Hardcore Survival',
    description:
      'A catastrophic simultaneous security breach across 3 geopolitical zones triggers martial law. Govern with an emergency War Council, ration fuel and foreign exchange, and balance civil liberties against national survival.',
    perks: [
      'Full martial decree system (Curfews, Border Seals, Emergency Procurement)',
      'Joint Operations War Room mini-game',
      'Permadeath mode with Military Tribunal failure conditions',
    ],
  },

  // 3. Sovereign Emergency Boosters (Consumables)
  {
    id: 'booster_imf_facility',
    name: 'IMF Sovereign Emergency Credit Tranche',
    category: 'booster',
    priceNaira: 1500,
    priceUSD: 1.49,
    badge: 'Instant Rescue',
    description:
      'Execute an emergency agreement with the Bretton Woods institutions. Instantly injects ₦1,500 Billion into the federal reserves to avert bankruptcy or fund urgent public infrastructure.',
    perks: [
      'Instant +₦1,500 Billion Federal Treasury injection',
      'Relieves treasury deficit insolvency warnings immediately',
    ],
  },
  {
    id: 'booster_godfather_capital',
    name: 'The Godfather’s Political War Chest',
    category: 'booster',
    priceNaira: 1200,
    priceUSD: 1.19,
    badge: 'Political Leverage',
    description:
      'Call in political favors, boardroom pledges, and party machinery to quash legislative rebellion and silence critics.',
    perks: [
      'Instant +35 Political Capital',
      'Whips dissenting Senators and party caucuses into line',
    ],
  },
  {
    id: 'booster_pardon_tokens_pack',
    name: '3x Presidential Prerogative Undo Tokens',
    category: 'booster',
    priceNaira: 1800,
    priceUSD: 1.99,
    badge: 'Rewind Fate',
    description:
      'Made a catastrophic cabinet decree that tanked public approval or provoked a general strike? Use an Undo Token to rewind time and choose a different path.',
    perks: [
      'Grants 3x Undo Decision Tokens to use in any active crisis',
      'Preserves your high-score run from accidental collapse',
    ],
  },
];
