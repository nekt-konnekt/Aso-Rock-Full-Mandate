import { Crisis } from '../types';

export const CRISES_DATABASE: Crisis[] = [
  // 01. Fuel Price Shock
  {
    id: 'crisis_01_fuel',
    number: 1,
    title: 'The Fuel Price Shock',
    category: 'economy',
    reportedByCharacterId: 'finance_minister',
    urgency: 'critical',
    contextDescription:
      'Global landing costs have surged and the national petrol subsidy is bleeding ₦400 Billion from the federation account every thirty days. Marketers have started shutting fuel stations in Lagos, Abuja, and Port Harcourt, creating 5-kilometre queues. The Nigerian Labour Congress has issued a 48-hour ultimatum.',
    characterQuote:
      '"Mr. President, if we do not cut this subsidy hemorrhage today, your treasury cannot pay next month’s federal civil service wages. Let the market breathe!"',
    choices: [
      {
        id: 'c1_cut_subsidy',
        label: 'Abolish Subsidy Immediately',
        description: 'Deregulate pump price completely. Save ₦500B in treasury funds, but pump prices will jump 60%.',
        capitalCost: 4,
        impact: {
          factions: { public: -16, party: -8, governors: +12, assembly: -4, media: -6 },
          treasuryBillion: 550,
          characterLoyalty: { finance_minister: 18, party_chairman: -10, governor_south: 8 },
          promiseEffect: { promiseId: 'promise_fx_inflation', progressDelta: -10 },
          delayedTrigger: {
            inMonths: 2,
            crisisId: 'spinoff_fuel_compensation',
            reason: 'Governors demand their share of freed subsidy savings.',
          },
        },
        feedbackText:
          'Subsidy is eliminated. Pump prices jump sharply. Transporters double fares, but state governors celebrate the increased FAAC revenue allocation.',
        newspaperHeadline: 'BLACK GOLD SHOCK: FUEL PRICE SOARS AS ASO ROCK ENDS SUBSIDY',
      },
      {
        id: 'c1_maintain_subsidy',
        label: 'Maintain Full Subsidy',
        description: 'Subsidize the difference with emergency loans to keep pump price low and protect citizens.',
        capitalCost: 2,
        impact: {
          factions: { public: +12, party: +8, governors: -14, assembly: +2, media: +5 },
          treasuryBillion: -420,
          characterLoyalty: { finance_minister: -20, party_chairman: 10, chief_adviser: -8 },
          promiseEffect: { promiseId: 'promise_fx_inflation', progressDelta: 8 },
          delayedTrigger: {
            inMonths: 3,
            crisisId: 'spinoff_fuel_insolvency',
            reason: 'The treasury runs critically low due to mounting fuel import debts.',
          },
        },
        feedbackText:
          'Commuters breathe a sigh of relief as queues dissolve, but Finance Minister Okonkwo is seen leaving the Oval Office shaking her head in despair.',
        newspaperHeadline: 'RELIEF AT THE PUMPS: PRESIDENT SHIELDS CONSUMERS WITH BILLION-NAIRA BAILOUT',
      },
      {
        id: 'c1_negotiate_palliatives',
        label: 'Partial Deregulation & Transport Palliatives',
        description: 'Authorize a modest price increase paired with compressed natural gas (CNG) transit buses.',
        capitalCost: 6,
        impact: {
          factions: { public: -4, party: +2, governors: +4, assembly: +4, media: +6 },
          treasuryBillion: 180,
          characterLoyalty: { finance_minister: 6, interior_minister: 4, chief_of_staff: 8 },
          promiseEffect: { promiseId: 'promise_jobs', progressDelta: 5 },
        },
        feedbackText:
          'A delicate compromise reached at 2:00 AM with organized labour in the State House Banquet Hall. Both sides claim modest victory.',
        newspaperHeadline: 'MIDNIGHT PACT: ASO ROCK STRIKES PALLIATIVE DEAL WITH LABOUR',
      },
      {
        id: 'c1_delay_decision',
        label: 'Order 30-Day Tripartite Review',
        description: 'Set up an emergency presidential committee to study pricing and report back next month.',
        capitalCost: 1,
        impact: {
          factions: { public: -8, party: -6, governors: -6, assembly: -6, media: -12 },
          treasuryBillion: -150,
          characterLoyalty: { chief_adviser: -12, opposition_leader: 14 },
          delayedTrigger: {
            inMonths: 1,
            crisisId: 'spinoff_fuel_black_market',
            reason: 'Black market petrol thrives amidst presidential indecision.',
          },
        },
        feedbackText:
          'Queues stretch across metropolitan cities. The press mocks the formation of another presidential committee while pump attendants sell jerrycans.',
        newspaperHeadline: 'COMMITTEE OF CONFUSION: QUEUES INTENSIFY AS GOVERNMENT DELAYS VERDICT',
      },
    ],
  },

  // 02. Currency Pressure
  {
    id: 'crisis_02_currency',
    number: 2,
    title: 'Currency Freefall at Wuse Market',
    category: 'economy',
    reportedByCharacterId: 'finance_minister',
    urgency: 'critical',
    contextDescription:
      'Speculators have pushed the parallel market rate for the US Dollar to unprecedented heights. Importers of raw materials cannot access foreign exchange, and manufacturers are threatening mass shutdowns. The Central Bank Governor is awaiting presidential directives.',
    characterQuote:
      '"Your Excellency, the parallel gap between official rate and street rate is creating overnight billionaires among corrupt middlemen. We must unify the windows or watch industry die."',
    choices: [
      {
        id: 'c2_float_naira',
        label: 'Float the Currency & Unify Windows',
        description: 'Allow market forces to determine exchange rate. Painful initial depreciation, but restores investor inflows.',
        capitalCost: 6,
        impact: {
          factions: { public: -12, party: -6, governors: +10, assembly: -4, media: -4 },
          treasuryBillion: 300,
          characterLoyalty: { finance_minister: 16, party_chairman: -8 },
          promiseEffect: { promiseId: 'promise_fx_inflation', progressDelta: 12 },
        },
        feedbackText:
          'The Naira takes a sharp hit on opening markets, but international development banks laud the transparency and foreign portfolio funds return.',
        newspaperHeadline: 'NAIRA SET FREE: CENTRAL BANK UNIFIES WINDOWS IN HISTORIC MOVE',
      },
      {
        id: 'c2_defend_peg',
        label: 'Defend the Peg with Foreign Reserves',
        description: 'Inject $1.2 Billion of external reserves into the interbank market to forcibly hold the value.',
        capitalCost: 4,
        impact: {
          factions: { public: +8, party: +6, governors: -8, assembly: +4, media: +6 },
          treasuryBillion: -650,
          characterLoyalty: { finance_minister: -18, party_chairman: 8 },
          promiseEffect: { promiseId: 'promise_fx_inflation', progressDelta: -6 },
        },
        feedbackText:
          'The street rate temporarily stabilizes. Traders cheer, but sovereign credit rating agencies issue negative outlook warnings over drained reserves.',
        newspaperHeadline: 'DEFENDING THE NAIRA: CENTRAL BANK PUMPS LIQUIDITY TO CRUSH SPECULATORS',
      },
      {
        id: 'c2_clampdown_bdcs',
        label: 'Security Clampdown on Illegal Traders',
        description: 'Deploy joint DSS and police enforcement teams against unlicensed Bureau De Change operators.',
        capitalCost: 5,
        impact: {
          factions: { public: -2, party: +4, governors: +2, assembly: -2, media: -10 },
          treasuryBillion: -50,
          characterLoyalty: { interior_minister: 14, finance_minister: -10, opposition_leader: 10 },
        },
        feedbackText:
          'Security operatives raid currency hubs in Abuja and Lagos. Street dealers go underground, creating extreme volatility and viral outrage videos.',
        newspaperHeadline: 'RAIDS ON WUSE ZONE 4: SECURITY OPERATIVES SWEEP CURRENCY TRADERS',
      },
    ],
  },

  // 03. Electricity Tariff Crisis
  {
    id: 'crisis_03_power',
    number: 3,
    title: 'The National Grid Collapse & Tariff Ultimatum',
    category: 'infrastructure',
    reportedByCharacterId: 'chief_of_staff',
    urgency: 'urgent',
    contextDescription:
      'The national transmission grid collapsed for the third time this quarter at Osogbo. Electricity Distribution Companies (DisCos) demand an immediate 40% cost-reflective tariff hike, threatening total system blackout if the federal subsidy is not released.',
    characterQuote:
      '"Sir, manufacturers in Ikeja and Kano are burning diesel night and day. The DisCos claim gas suppliers are cutting pipelines for non-payment."',
    choices: [
      {
        id: 'c3_tariff_hike',
        label: 'Approve Band-A Tariff Increase',
        description: 'Raise tariffs on commercial consumers while guaranteeing minimum 20 hours daily power for industrial zones.',
        capitalCost: 4,
        impact: {
          factions: { public: -10, party: -4, governors: +6, assembly: -6, media: -8 },
          treasuryBillion: 220,
          promiseEffect: { promiseId: 'promise_power', progressDelta: 16 },
        },
        feedbackText:
          'Industrial manufacturing clusters celebrate stable generation, but residential consumers stage noisy protests outside DisCo headquarters.',
        newspaperHeadline: 'BAND A CONTROVERSY: POWER CONSUMERS DECIDE TO MARCH ON REGULATOR',
      },
      {
        id: 'c3_treasury_bailout',
        label: 'Federal Treasury Subvention',
        description: 'Disburse ₦180 Billion federal emergency intervention to gas suppliers to keep turbines spinning without tariff hikes.',
        capitalCost: 3,
        impact: {
          factions: { public: +8, party: +6, governors: -6, assembly: +4, media: +6 },
          treasuryBillion: -190,
          promiseEffect: { promiseId: 'promise_power', progressDelta: 8 },
        },
        feedbackText:
          'Turbines roar back to life across the Niger Delta. The public is spared tariff pain, though fiscal hawks lament unending public subventions.',
        newspaperHeadline: 'GRID RESTORED: PRESIDENT INJECTS BILLIONS TO KEEP LIGHTS ON',
      },
      {
        id: 'c3_decentralize_states',
        label: 'Fast-Track State Power Licences',
        description: 'Hand constitutional power generation licences directly to willing State Governors to build regional off-grid systems.',
        capitalCost: 7,
        impact: {
          factions: { public: +4, party: -2, governors: +20, assembly: +2, media: +8 },
          treasuryBillion: -60,
          characterLoyalty: { governor_south: 16, governor_north: 14, senate_leader: -4 },
          promiseEffect: { promiseId: 'promise_power', progressDelta: 12 },
        },
        feedbackText:
          'Governors hail the historic devolution of power. Forward-thinking state capitals sign independent solar and gas IPP development pacts.',
        newspaperHeadline: 'POWER TO THE STATES: GOVERNORS UNLEASHED IN DECENTRALIZATION VICTORY',
      },
    ],
  },

  // 04. Tax Reform Bill
  {
    id: 'crisis_04_tax',
    number: 4,
    title: 'The Heated Tax Harmonization Bill',
    category: 'governance',
    reportedByCharacterId: 'finance_minister',
    urgency: 'routine',
    contextDescription:
      'The Presidential Fiscal Policy & Tax Committee has submitted an ambitious bill to consolidate 60 nuisance taxes into 4 single levies, shift VAT derivation to consumption origin, and raise tax-to-GDP from 10% to 18%. Northern and Southern regional leaders are split.',
    characterQuote:
      '"Mr. President, 95% of small traders are harassed by touts on state roads. Harmonizing our tax code is the only way to fund real development."',
    choices: [
      {
        id: 'c4_push_full_bill',
        label: 'Transmit Full Bill to Assembly Without Dilution',
        description: 'Stand firm with technocratic recommendations and lobby legislative leadership.',
        capitalCost: 8,
        impact: {
          factions: { public: +4, party: -8, governors: -8, assembly: +10, media: +10 },
          treasuryBillion: 350,
          characterLoyalty: { finance_minister: 15, governor_north: -14, senate_leader: 6 },
          promiseEffect: { promiseId: 'promise_anti_corruption', progressDelta: 15 },
        },
        feedbackText:
          'The bill arrives at the Senate with immense fanfare. Progressive economists praise the vision while traditional political bosses grumble.',
        newspaperHeadline: 'REFORM REVOLUTION: PRESIDENT SENDS LANDMARK TAX BILL TO SENATE',
      },
      {
        id: 'c4_concede_to_governors',
        label: 'Grant Concessions to the Governors’ Forum',
        description: 'Revise VAT derivation formulas to guarantee no state loses monthly revenue allocations.',
        capitalCost: 4,
        impact: {
          factions: { public: -2, party: +6, governors: +16, assembly: -2, media: -4 },
          treasuryBillion: 100,
          characterLoyalty: { governor_north: 12, governor_south: 10, finance_minister: -12 },
        },
        feedbackText:
          'State Governors express wholehearted solidarity with the modified legislation, though tax experts mourn the diluted efficiency gains.',
        newspaperHeadline: 'CONSENSUS POLITICS: STATE CAUCUS ENDORSES MODIFIED REVENUE CODE',
      },
      {
        id: 'c4_shelve_bill',
        label: 'Shelve the Bill for Further Stakeholder Consultations',
        description: 'Postpone legislative submission until party unity is guaranteed before next budget cycle.',
        capitalCost: 1,
        impact: {
          factions: { public: -6, party: +8, governors: +4, assembly: -6, media: -10 },
          treasuryBillion: -50,
          characterLoyalty: { finance_minister: -22, party_chairman: 12 },
        },
        feedbackText:
          'Finance Minister Okonkwo refuses to speak to journalists as she departs the Villa. Editorial boards label the retreat a win for entrenched barons.',
        newspaperHeadline: 'COLD FEET: PRESIDENCY RETREATS ON CONTROVERSIAL TAX OVERHAUL',
      },
    ],
  },

  // 05. Food Price Crisis
  {
    id: 'crisis_05_food',
    number: 5,
    title: 'Food Inflation & The Grain Reserves',
    category: 'social',
    reportedByCharacterId: 'governor_north',
    urgency: 'urgent',
    contextDescription:
      'Prices of staple grains, rice, and yams have doubled across urban markets following dry spells and supply-chain logistics extortion. Civil society coalitions are threatening "We Dey Hungry" nationwide market boycotts.',
    characterQuote:
      '"Your Excellency, farmers in the north have harvest, but multiple transit levies along the highway are choking supplies. We must feed the cities."',
    choices: [
      {
        id: 'c5_release_reserves',
        label: 'Open National Strategic Grain Reserves',
        description: 'Release 150,000 metric tonnes of maize, sorghum, and garri directly to retail markets at subsidized rates.',
        capitalCost: 4,
        impact: {
          factions: { public: +16, party: +6, governors: +4, assembly: +2, media: +10 },
          treasuryBillion: -140,
          promiseEffect: { promiseId: 'promise_fx_inflation', progressDelta: 14 },
        },
        feedbackText:
          'Federal food trucks arrive in municipal markets. Grain prices drop 18% in forty-eight hours, bringing spontaneous cheers for the Presidency.',
        newspaperHeadline: 'BARNS OPENED: FEDERAL GRAIN INFLOW COOLS DOWN MARKET PANIC',
      },
      {
        id: 'c5_import_duty_free',
        label: 'Temporarily Suspend Food Import Tariffs',
        description: 'Open borders to duty-free grain imports for 90 days. Lowers prices immediately but angers domestic farming lobbies.',
        capitalCost: 5,
        impact: {
          factions: { public: +10, party: -6, governors: -10, assembly: -4, media: +4 },
          treasuryBillion: -80,
          characterLoyalty: { governor_north: -18, finance_minister: 8 },
          promiseEffect: { promiseId: 'promise_fx_inflation', progressDelta: 8 },
        },
        feedbackText:
          'Imported staples flood ports, rapidly stabilizing food prices. However, Northern farmers unions condemn the influx as destructive to local harvests.',
        newspaperHeadline: 'TARIFF HOLIDAY: FOOD IMPORTS SURGE AS LOCAL FARMERS SOUND ALARM',
      },
      {
        id: 'c5_cash_transfers',
        label: 'Targeted Direct Cash Transfers',
        description: 'Transfer ₦25,000 monthly conditional stipends to 5 million vulnerable households via verified National Identification numbers.',
        capitalCost: 6,
        impact: {
          factions: { public: +14, party: +8, governors: +2, assembly: -2, media: +6 },
          treasuryBillion: -210,
          characterLoyalty: { party_chairman: 10, chief_of_staff: 6 },
          promiseEffect: { promiseId: 'promise_jobs', progressDelta: 6 },
        },
        feedbackText:
          'Direct bank credit alerts bring widespread jubilation among low-income households, despite opposition claims of selective disbursement lists.',
        newspaperHeadline: 'ALERTS IN THE AIR: MILLIONS RECEIVE FEDERAL SOCIAL STIPEND',
      },
    ],
  },

  // 06. Security Intelligence
  {
    id: 'crisis_06_security',
    number: 6,
    title: 'The Intercepted Forest Intelligence',
    category: 'security',
    reportedByCharacterId: 'interior_minister',
    urgency: 'critical',
    contextDescription:
      'National Intelligence has intercepted encrypted radio traffic indicating an armed syndicate is preparing a coordinated highway raid. However, the exact transit corridor remains ambiguous between two interstate forest zones.',
    characterQuote:
      '"Mr. President, waiting for 100% certainty means reacting after victims are taken. If you authorize an aggressive multi-sector sweep now, we strike first."',
    choices: [
      {
        id: 'c6_preemptive_sweep',
        label: 'Authorize Preemptive Tactical Airstrike',
        description: 'Order military air combat wings and mobile police squadrons to clear both suspected forest coordinates immediately.',
        capitalCost: 7,
        impact: {
          factions: { public: +12, party: +4, governors: +8, assembly: +4, media: +6 },
          treasuryBillion: -90,
          characterLoyalty: { interior_minister: 18, chief_adviser: 4 },
          promiseEffect: { promiseId: 'promise_security', progressDelta: 18 },
        },
        feedbackText:
          'Security forces neutralize camp hideouts and recover stolen munitions. Highways remain safe throughout the holiday travel window.',
        newspaperHeadline: 'CRACKDOWN IN THE WOODS: ARMED GANG SCATTERED IN DAWN OPERATION',
      },
      {
        id: 'c6_coordinate_with_states',
        label: 'Mobilize State Security Amotekun/Civil Volunteers',
        description: 'Share coordinates with localized state vigilante networks and police commandants for ground encirclement.',
        capitalCost: 4,
        impact: {
          factions: { public: +8, party: +2, governors: +18, assembly: +2, media: +4 },
          treasuryBillion: -40,
          characterLoyalty: { governor_south: 12, governor_north: 12, interior_minister: -6 },
          promiseEffect: { promiseId: 'promise_security', progressDelta: 10 },
        },
        feedbackText:
          'Local intelligence proves pinpoint accurate. Forest scouts apprehend syndicate scouts before attacks can launch.',
        newspaperHeadline: 'JOINT VIGILANCE: STATE PATROLS FOIL HIGHWAY INCURSION',
      },
      {
        id: 'c6_wait_confirmation',
        label: 'Delay Until Drone Reconnaissance Confirms Coordinates',
        description: 'Avoid risks of collateral civilian damage by awaiting high-altitude optical confirmation.',
        capitalCost: 2,
        impact: {
          factions: { public: -10, party: -4, governors: -8, assembly: -6, media: -14 },
          treasuryBillion: 0,
          characterLoyalty: { interior_minister: -16, opposition_leader: 12 },
          promiseEffect: { promiseId: 'promise_security', progressDelta: -12 },
        },
        feedbackText:
          'The syndicate strikes a peripheral transit checkpoint during the intelligence review delay. Public outcry mounts over federal sluggishness.',
        newspaperHeadline: 'MISSED WARNING? QUESTIONS MOUNT OVER ASO ROCK HESITATION',
      },
    ],
  },

  // 07. State Security Crisis
  {
    id: 'crisis_07_state_security',
    number: 7,
    title: 'The Governor’s State of Emergency Demand',
    category: 'security',
    reportedByCharacterId: 'governor_north',
    urgency: 'urgent',
    contextDescription:
      'Following border clashes between pastoralist herders and agrarian communities, the state governor has issued an emotional press conference demanding the President declare a State of Emergency and deploy full federal battalions.',
    characterQuote:
      '"Mr. President, my people are burying their dead! If Aso Rock does not send the army by Friday, I will personally invite private security contractors!"',
    choices: [
      {
        id: 'c7_deploy_peacekeeping',
        label: 'Deploy Joint Peacekeeping Buffer & Mediate',
        description: 'Send a balanced battalion strictly for buffer zones and host emergency peace talks between pastoralist and farmer unions.',
        capitalCost: 5,
        impact: {
          factions: { public: +8, party: +4, governors: +8, assembly: +6, media: +8 },
          treasuryBillion: -75,
          characterLoyalty: { interior_minister: 8, governor_north: 10, chief_adviser: 8 },
          promiseEffect: { promiseId: 'promise_security', progressDelta: 10 },
        },
        feedbackText:
          'Buffer garrisons de-escalate flashpoints without suspending democratic state institutions. Elders sign a 12-point seasonal coexistence pact.',
        newspaperHeadline: 'PEACE GARRISON ARRIVES: TRUCE SIGNED IN AGRI-PASTORAL DISPUTE',
      },
      {
        id: 'c7_declare_emergency',
        label: 'Declare Formal State of Emergency',
        description: 'Temporarily suspend the elected state governor and appoint a retired military sole administrator.',
        capitalCost: 12,
        impact: {
          factions: { public: +2, party: -12, governors: -22, assembly: -14, media: -6 },
          treasuryBillion: -120,
          characterLoyalty: { governor_north: -35, governor_south: -20, senate_leader: -15 },
        },
        feedbackText:
          'Violence halts abruptly under strict martial curfews, but the Governors’ Forum holds an emergency summit condemning presidential authoritarianism.',
        newspaperHeadline: 'MARTIAL LAW IN STATE: GOVERNORS FORUM SLAMS DEMOCRATIC OVERREACH',
      },
      {
        id: 'c7_insist_state_responsibility',
        label: 'Remind Governor of State Chief Security Mandate',
        description: 'Direct state police command to assist while declining federal emergency troop takeover.',
        capitalCost: 2,
        impact: {
          factions: { public: -8, party: -4, governors: -12, assembly: -4, media: -10 },
          treasuryBillion: 0,
          characterLoyalty: { governor_north: -22, opposition_leader: 14 },
        },
        feedbackText:
          'The Governor boycotts the National Economic Council meeting in protest, addressing hostile cable news shows accusing Aso Rock of abandonment.',
        newspaperHeadline: 'ABANDONED BY ABUJA? GOVERNOR BOASTS OF STATE RESISTANCE',
      },
    ],
  },

  // 08. Protest
  {
    id: 'crisis_08_protest',
    number: 8,
    title: 'The "Fix Our Country" Youth Expressway March',
    category: 'social',
    reportedByCharacterId: 'information_minister',
    urgency: 'critical',
    contextDescription:
      'Youth advocacy networks, fueled by viral social media livestreams, have peacefully occupied the Lekki Tollgate in Lagos, the Abuja City Gate, and the Kano Trade Center demanding police reform, faster university upgrades, and inflation control.',
    characterQuote:
      '"Sir, millions of people are watching Instagram and TikTok feeds. If the police use tear gas, international embassies will publish condemnations. If we do nothing, the ports and airports stay blocked."',
    choices: [
      {
        id: 'c8_town_hall_dialogue',
        label: 'Invite Protest Organizers to Presidential Town Hall',
        description: 'Broadcast live dialogue from Aso Rock banquet hall and announce transparent student credit and tech innovation grants.',
        capitalCost: 6,
        impact: {
          factions: { public: +18, party: -4, governors: +6, assembly: +4, media: +16 },
          treasuryBillion: -110,
          characterLoyalty: { chief_adviser: 14, information_minister: 10, party_chairman: -6 },
          promiseEffect: { promiseId: 'promise_education', progressDelta: 16 },
        },
        feedbackText:
          'The televised town hall is electrifying. The President answers unscripted questions with empathy. Protesters clear expressways amidst celebrations.',
        newspaperHeadline: 'DEMOCRACY IN ACTION: PRESIDENT MEETS PROTEST LEADERS LIVE ON TV',
      },
      {
        id: 'c8_curfew_security',
        label: 'Impose Dusk-to-Dawn Curfew via State Governors',
        description: 'Coordinate with Governors to declare curfews and clear transit routes through anti-riot police presence.',
        capitalCost: 4,
        impact: {
          factions: { public: -16, party: +4, governors: +8, assembly: -6, media: -18 },
          treasuryBillion: -30,
          characterLoyalty: { interior_minister: 10, opposition_leader: 18, chief_adviser: -12 },
        },
        feedbackText:
          'Streets are cleared by evening, but international human rights observers condemn the high-handed dispersal. Viral clips dominate the diaspora press.',
        newspaperHeadline: 'TEAR GAS AT DUSK: EXPRESSWAYS REOPENED UNDER HEAVY POLICE WATCH',
      },
      {
        id: 'c8_party_counter_rally',
        label: 'Mobilize Party Supporters for Solidarity Marches',
        description: 'Authorize the Party Chairman to gather party youth to stage counter-demonstrations praising government infrastructure.',
        capitalCost: 3,
        impact: {
          factions: { public: -12, party: +14, governors: -6, assembly: -8, media: -14 },
          treasuryBillion: -50,
          characterLoyalty: { party_chairman: 16, chief_of_staff: -8 },
        },
        feedbackText:
          'Tensions flare as rival demonstration groups clash in downtown corridors before police intervene. Editorial columnists lament cheap partisan gamesmanship.',
        newspaperHeadline: 'STREET PARTISANSHIP: RIVAL RALLIES CLASH AS TENSIONS BOIL OVER',
      },
    ],
  },

  // 09. Governor Defects
  {
    id: 'crisis_09_governor_defect',
    number: 9,
    title: 'The Governor’s Midnight Defection Drama',
    category: 'governance',
    reportedByCharacterId: 'party_chairman',
    urgency: 'urgent',
    contextDescription:
      'Governor Usman Bello has summoned a secret caucus meeting and is threatening to cross the carpet with 18 federal House lawmakers to the rival People’s Reform Party (PRP), claiming his geopolitical zone has been marginalized in federal capital project appointments.',
    characterQuote:
      '"Mr. President! If this man defects, your party loses the legislative majority in the House! You must call him immediately and give him whatever road contracts he wants!"',
    choices: [
      {
        id: 'c9_grant_road_patronage',
        label: 'Pledge Regional Dual-Carriageway Highway Concession',
        description: 'Direct the Ministry of Works to prioritize the agro-industrial highway in his state and retain his loyalists in federal boards.',
        capitalCost: 5,
        impact: {
          factions: { public: +2, party: +14, governors: +10, assembly: +6, media: -4 },
          treasuryBillion: -160,
          characterLoyalty: { governor_north: 22, party_chairman: 14, finance_minister: -10 },
          promiseEffect: { promiseId: 'promise_roads_rail', progressDelta: 8 },
        },
        feedbackText:
          'Governor Bello addresses a joint press conference wearing the party colours, declaring unbroken loyalty to "our visionary President".',
        newspaperHeadline: 'DEFECTION ABORTED: GOVERNOR REAFFIRMS UNDYING LOYALTY TO ASO ROCK',
      },
      {
        id: 'c9_efcc_investigation',
        label: 'Authorize Anti-Corruption Scrutiny on State Accounts',
        description: 'Signal the Economic and Financial Crimes Commission (EFCC) to review questionable state security vote expenditures.',
        capitalCost: 7,
        impact: {
          factions: { public: +10, party: -6, governors: -18, assembly: -8, media: +6 },
          treasuryBillion: 40,
          characterLoyalty: { governor_north: -30, governor_south: -12, opposition_leader: -10 },
          promiseEffect: { promiseId: 'promise_anti_corruption', progressDelta: 12 },
        },
        feedbackText:
          'EFCC operatives freeze several shell company bank accounts. The Governor hastily cancels defection rallies while alleging political witch-hunts.',
        newspaperHeadline: 'GRAFT SLEUTHS MOVE IN: STATE FINANCES UNDER FORENSIC MICROSCOPE',
      },
      {
        id: 'c9_dare_to_leave',
        label: 'Publicly Welcome Free Political Association',
        description: 'Announce that the administration relies on genuine popular performance rather than backroom coercion.',
        capitalCost: 2,
        impact: {
          factions: { public: +8, party: -16, governors: -4, assembly: -10, media: +8 },
          treasuryBillion: 0,
          characterLoyalty: { party_chairman: -24, opposition_leader: 18, chief_adviser: 12 },
        },
        feedbackText:
          'The Governor formally joins the opposition with 14 lawmakers. While high-minded voters respect your posture, party bosses are furious.',
        newspaperHeadline: 'POLITICAL EARTHQUAKE: KEY GOVERNOR DEFECTS TO OPPOSITION ALLIANCE',
      },
    ],
  },

  // 10. Party Convention
  {
    id: 'crisis_10_party_convention',
    number: 10,
    title: 'The Party Convention Showdown',
    category: 'governance',
    reportedByCharacterId: 'party_chairman',
    urgency: 'critical',
    contextDescription:
      'The National Convention of your party has collapsed into shouting matches at the Eagle Square in Abuja. The entrenched Old Guard caucus wants to retain unconditional candidate imposition, while younger Reform Technocrats demand transparent digital primaries.',
    characterQuote:
      '"Your Excellency, you sit in Aso Rock because of the party structure. If you back these young university upstarts, the state godfathers will starve your re-election of delegates!"',
    choices: [
      {
        id: 'c10_back_reformers',
        label: 'Back the Reform Technocrat Slate',
        description: 'Endorse open, merit-based democratic primaries and modern transparent candidate screening.',
        capitalCost: 8,
        impact: {
          factions: { public: +16, party: -14, governors: -6, assembly: +4, media: +14 },
          treasuryBillion: 0,
          characterLoyalty: { party_chairman: -28, chief_adviser: 18, finance_minister: 8 },
          promiseEffect: { promiseId: 'promise_anti_corruption', progressDelta: 10 },
        },
        feedbackText:
          'A vibrant, young party executive emerges victorious. Grassroots supporters celebrate nationwide, though disgruntled barons plot payback.',
        newspaperHeadline: 'OLD ORDER TOPPLED: NEW GENERATION TAKES COMMAND OF RULING PARTY',
      },
      {
        id: 'c10_back_old_guard',
        label: 'Back the Seasoned Party Machine',
        description: 'Protect the traditional regional zoning arrangements and reward veteran party organizers.',
        capitalCost: 4,
        impact: {
          factions: { public: -10, party: +18, governors: +12, assembly: +8, media: -12 },
          treasuryBillion: -60,
          characterLoyalty: { party_chairman: 25, senate_leader: 10, chief_adviser: -12 },
        },
        feedbackText:
          'The veteran kingmakers cement absolute dominance over the party hierarchy. Your party machinery is rock solid, but public cynicism deepens.',
        newspaperHeadline: 'GODFATHERS REIGN: EAGLE SQUARE VOTES REAFFIRM VETERAN MACHINE',
      },
      {
        id: 'c10_broker_consensus',
        label: 'Enforce a Balanced 50-50 Power-Sharing Accord',
        description: 'Summon both factions to the Presidential Banquet Hall and lock the doors until a compromise unity list is signed.',
        capitalCost: 6,
        impact: {
          factions: { public: +4, party: +8, governors: +6, assembly: +6, media: +4 },
          treasuryBillion: -20,
          characterLoyalty: { chief_of_staff: 14, party_chairman: 4 },
        },
        feedbackText:
          'After 14 hours of bitter haggling, both camps emerge with a unified executive list. Party unity is preserved with zero public walkouts.',
        newspaperHeadline: 'UNITY IN ASO ROCK: PRESIDENT BROKERS DRAMATIC PARTY COMPROMISE',
      },
    ],
  },

  // 11. Senate Resistance
  {
    id: 'crisis_11_senate',
    number: 11,
    title: 'Senate Gridlock on the Annual Appropriation Bill',
    category: 'governance',
    reportedByCharacterId: 'senate_leader',
    urgency: 'urgent',
    contextDescription:
      'The National Assembly has paused debate on your flagship capital development budget. Lawmakers are demanding an increase in legislative constituency intervention funds and questioning the oversight powers of federal ministries.',
    characterQuote:
      '"Mr. President, members have constituencies to answer to. If there is no constituency provision for water boreholes and community clinics, this budget will spend Easter on our committee desks."',
    choices: [
      {
        id: 'c11_negotiate_pork',
        label: 'Approve Negotiated Constituency Projects',
        description: 'Incorporate verified social projects into the budget to secure rapid third-reading passage within one week.',
        capitalCost: 4,
        impact: {
          factions: { public: -4, party: +8, governors: +4, assembly: +20, media: -6 },
          treasuryBillion: -150,
          characterLoyalty: { senate_leader: 24, finance_minister: -12 },
          promiseEffect: { promiseId: 'promise_roads_rail', progressDelta: 8 },
        },
        feedbackText:
          'Gavel strikes sound across the Senate chambers as lawmakers cheer. The budget is passed in record time without acrimony.',
        newspaperHeadline: 'BUDGET UNLOCKED: SENATE PASSES FEDERAL SPENDING BILL IN RECORD SITTING',
      },
      {
        id: 'c11_appeal_to_citizens',
        label: 'Take the Fight to Public Broadcasts',
        description: 'Deliver a nationwide address detailing line-by-line how the delayed budget harms hospitals and roads.',
        capitalCost: 8,
        impact: {
          factions: { public: +16, party: -8, governors: -6, assembly: -18, media: +14 },
          treasuryBillion: 50,
          characterLoyalty: { senate_leader: -26, chief_adviser: 12, opposition_leader: -8 },
        },
        feedbackText:
          'Outraged citizens flood lawmakers’ constituency offices with phone calls and placards. The Senate yields to intense civic heat.',
        newspaperHeadline: 'CITIZEN SQUEEZE: ASO ROCK SPEECH FORCES SENATE TO BACK DOWN',
      },
      {
        id: 'c11_line_item_veto',
        label: 'Withhold Assent & Demand Joint Conference Harmonization',
        description: 'Exercise constitutional veto on bloated overhead clauses while signing undisputed capital provisions.',
        capitalCost: 6,
        impact: {
          factions: { public: +8, party: -2, governors: +2, assembly: -8, media: +8 },
          treasuryBillion: 100,
          characterLoyalty: { finance_minister: 14, senate_leader: -10 },
          promiseEffect: { promiseId: 'promise_anti_corruption', progressDelta: 10 },
        },
        feedbackText:
          'A tense standoff concludes with lawmakers trimming ₦80 Billion in inflated agency overheads. Constitutional clarity prevails.',
        newspaperHeadline: 'VETO SHOWDOWN: HARMONIZATION COMMITTEE TRIMS AGENCY OVERHEADS',
      },
    ],
  },

  // 12. Minister Nomination
  {
    id: 'crisis_12_minister_nomination',
    number: 12,
    title: 'The Senate Screening Deadlock',
    category: 'governance',
    reportedByCharacterId: 'senate_leader',
    urgency: 'urgent',
    contextDescription:
      'Your premier ministerial nominee for Digital Innovation & Power Reform has faced fierce questioning during Senate screening. Petitions alleging past offshore asset declarations have been leaked to the press by hostile rival senators.',
    characterQuote:
      '"Sir, three ranking senators from her home state did not endorse her nomination. Tradition demands unanimous home state clearance. Will you replace her or spend the capital to fight?"',
    choices: [
      {
        id: 'c12_fight_for_nominee',
        label: 'Whip Party Senators & Defend Integrity',
        description: 'Call an emergency caucus dinner in the Presidential Villa to whip votes and demand she "take a bow and go".',
        capitalCost: 8,
        impact: {
          factions: { public: +10, party: +6, governors: -4, assembly: +6, media: +8 },
          treasuryBillion: -30,
          characterLoyalty: { senate_leader: 8, chief_adviser: 12 },
          promiseEffect: { promiseId: 'promise_power', progressDelta: 10 },
        },
        feedbackText:
          'After rigorous late-night debate, the Senate confirms her with a resounding majority voice vote. Technocrats cheer the resolute defense.',
        newspaperHeadline: 'CONFIRMED: SENATE CLEARS STAR NOMINEE AFTER HEATED CAUCUS VOTE',
      },
      {
        id: 'c12_withdraw_substitute',
        label: 'Withdraw and Nominate a Respected Party Stalwart',
        description: 'Yield to party elders and nominate a loyal former state governor who clears screening in 15 minutes.',
        capitalCost: 2,
        impact: {
          factions: { public: -12, party: +14, governors: +12, assembly: +10, media: -10 },
          treasuryBillion: 0,
          characterLoyalty: { party_chairman: 18, senate_leader: 12, chief_adviser: -14 },
        },
        feedbackText:
          'The replacement nominee steps up, bows reverently to the Senate President, and is confirmed in minutes without a single tough question asked.',
        newspaperHeadline: 'BOW AND GO: PARTY LOYALIST CONFIRMED WITHOUT SCRUTINY',
      },
      {
        id: 'c12_order_efcc_clearance',
        label: 'Subject Nominee to Public Code of Conduct Clearance',
        description: 'Demand the Code of Conduct Bureau publish full asset certification before final voting.',
        capitalCost: 5,
        impact: {
          factions: { public: +14, party: -4, governors: 0, assembly: -2, media: +12 },
          treasuryBillion: 0,
          characterLoyalty: { chief_adviser: 10, opposition_leader: -10 },
          promiseEffect: { promiseId: 'promise_anti_corruption', progressDelta: 12 },
        },
        feedbackText:
          'The Bureau issues an unblemished public clearance certificate. The smear campaign collapses under the weight of audited documents.',
        newspaperHeadline: 'VINDICATED: CODE OF CONDUCT CERTIFIES MINISTERIAL NOMINEE',
      },
    ],
  },

  // 13. The Leaked Memo
  {
    id: 'crisis_13_leaked_memo',
    number: 13,
    title: 'The Leaked Villa Procurement Memo',
    category: 'governance',
    reportedByCharacterId: 'information_minister',
    urgency: 'critical',
    contextDescription:
      'A classified State House memo authorizing the purchase of luxury armored SUV convoys and residential renovations during harsh economic times has been posted online by a prominent whistleblower platform. It is trending number one across social media.',
    characterQuote:
      '"Your Excellency, the memo has your Chief of Staff’s signature stamp. Denying it outright will look ridiculous because the letterhead serial number is authentic. We must act."',
    choices: [
      {
        id: 'c13_cancel_procurement',
        label: 'Cancel Procurement & Direct Savings to Rural Clinics',
        description: 'Own the oversight, immediately cancel luxury fleet contracts, and reassign the funds to primary health centers.',
        capitalCost: 6,
        impact: {
          factions: { public: +18, party: -6, governors: 0, assembly: -4, media: +16 },
          treasuryBillion: 25,
          characterLoyalty: { chief_of_staff: -10, chief_adviser: 16 },
          promiseEffect: { promiseId: 'promise_anti_corruption', progressDelta: 15 },
        },
        feedbackText:
          'A masterclass in crisis leadership. The public applauds the swift cancellation, turning a potential scandal into a victory for fiscal sanity.',
        newspaperHeadline: 'PRESIDENT CANCELS FLEET: BILLIONS DIVERTED TO MATERNAL CLINICS',
      },
      {
        id: 'c13_explain_security_need',
        label: 'Issue Rigorous Security Justification',
        description: 'Explain that the vehicles replace bullet-riddled 12-year-old escorts required for interstate security convoys.',
        capitalCost: 3,
        impact: {
          factions: { public: -8, party: +4, governors: +2, assembly: +2, media: -6 },
          treasuryBillion: -25,
          characterLoyalty: { interior_minister: 10, information_minister: 6 },
        },
        feedbackText:
          'The explanation satisfies security analysts, but satirical memes comparing the convoys to space rockets circulate relentlessly online.',
        newspaperHeadline: 'STATE HOUSE DEFENDS VEHICLES AS VITAL HOMELAND SECURITY ASSET',
      },
      {
        id: 'c13_hunt_leakers',
        label: 'Order DSS Investigation into the Whistleblower',
        description: 'Condemn official secrets violations and order polygraph screening of administrative staff.',
        capitalCost: 5,
        impact: {
          factions: { public: -14, party: -2, governors: -2, assembly: -6, media: -20 },
          treasuryBillion: -10,
          characterLoyalty: { interior_minister: 8, opposition_leader: 18, chief_adviser: -12 },
        },
        feedbackText:
          'Press freedom unions stage pickets outside the Villa gates. Leaks accelerate as disgruntled civil servants share more internal documents.',
        newspaperHeadline: 'WITCH-HUNT IN ASO ROCK? CIVIL SERVICE JITTERY OVER POLYGRAPH PROBE',
      },
    ],
  },

  // 14. Presidential Interview
  {
    id: 'crisis_14_media_interview',
    number: 14,
    title: 'The Live Presidential Media Chat',
    category: 'governance',
    reportedByCharacterId: 'information_minister',
    urgency: 'urgent',
    contextDescription:
      'Four of Nigeria’s most respected, fearless investigative journalists have taken seats across the round table in the Council Chambers for a live, unedited two-hour presidential media chat broadcast to 45 million viewers.',
    characterQuote:
      '"Sir, you cannot hide behind teleprompters tonight. Kadaria and Rufai will grill you on the Naira, insecurity, and campaign promises. Project strength and empathy!"',
    choices: [
      {
        id: 'c14_candor_facts',
        label: 'Unfiltered Candor & Concrete Economic Milestones',
        description: 'Present verifiable numbers, admit temporary pain, and explain the long-term structural turnaround plan.',
        capitalCost: 5,
        impact: {
          factions: { public: +14, party: +4, governors: +4, assembly: +6, media: +18 },
          treasuryBillion: 0,
          characterLoyalty: { information_minister: 14, chief_adviser: 12 },
          promiseEffect: { promiseId: 'promise_jobs', progressDelta: 6 },
        },
        feedbackText:
          'Viewers are captivated by your mastery of data and calm demeanor. Viewership ratings shatter records as social media tone flips positive.',
        newspaperHeadline: 'MASTERFUL CHAT: PRESIDENT WINS HEARTS WITH HONEST PERFORMANCE',
      },
      {
        id: 'c14_blame_predecessors',
        label: 'Remind Viewers of the Rot Inherited from Past Regimes',
        description: 'Vigorously detail the sixteen years of previous squander-mania that created current bottlenecks.',
        capitalCost: 2,
        impact: {
          factions: { public: -8, party: +10, governors: -2, assembly: -4, media: -12 },
          treasuryBillion: 0,
          characterLoyalty: { party_chairman: 12, opposition_leader: 14 },
        },
        feedbackText:
          'While staunch party partisans nod in agreement, undecided voters express fatigue: "We elected you to fix it, not to recite history!"',
        newspaperHeadline: 'BLAME GAME FATIGUE: CITIZENS DEMAND SOLUTIONS NOT EXCUSES',
      },
      {
        id: 'c14_populist_announcements',
        label: 'Announce Surprise Minimum Wage Boost on Live Air',
        description: 'Shock the panel and national audience by declaring an immediate upward review of federal civil service minimum pay.',
        capitalCost: 8,
        impact: {
          factions: { public: +22, party: +4, governors: -16, assembly: -8, media: +14 },
          treasuryBillion: -280,
          characterLoyalty: { finance_minister: -24, governor_south: -16, governor_north: -14 },
          promiseEffect: { promiseId: 'promise_jobs', progressDelta: 12 },
        },
        feedbackText:
          'Civil servants explode into jubilation across the federation. But state governors hold midnight panic calls asking how they can possibly fund it.',
        newspaperHeadline: 'PAYDAY SHOCK: PRESIDENT ANNOUNCES BOLD MINIMUM WAGE BOOST LIVE',
      },
    ],
  },

  // 15. The Viral Clip
  {
    id: 'crisis_15_viral_clip',
    number: 15,
    title: 'The 12-Second Gaffe at the State Banquet',
    category: 'governance',
    reportedByCharacterId: 'information_minister',
    urgency: 'routine',
    contextDescription:
      'During an informal toast at a state banquet, an overheard whisper of yours joking about "letting the poor breathe before taxing their phone calls" was recorded by an ambassador’s aide and leaked onto X (Twitter) with hilarious remix beats.',
    characterQuote:
      '"Your Excellency, the soundbite is already remixed with Amapiano beats on TikTok! It has 14 million views. We can either laugh with them or pretend it never happened."',
    choices: [
      {
        id: 'c15_self_deprecating',
        label: 'Embrace the Humor & Host the Content Creators',
        description: 'Share the funniest meme video yourself, inviting youth skitmakers to Aso Rock to discuss creative sector grants.',
        capitalCost: 3,
        impact: {
          factions: { public: +14, party: -2, governors: +2, assembly: +2, media: +18 },
          treasuryBillion: -15,
          characterLoyalty: { information_minister: 14, chief_adviser: 8 },
        },
        feedbackText:
          'The internet is disarmed by your warmth and humor. Skitmakers and musicians hail the "Coolest President" in modern history.',
        newspaperHeadline: 'MEME IN CHIEF: HOW THE PRESIDENT WON OVER TIKTOK WITH SELF-AWARE WIT',
      },
      {
        id: 'c15_threaten_ban',
        label: 'Threaten Regulatory Clampdown on Social Media Platforms',
        description: 'Direct the broadcasting regulator to issue warnings regarding audio tampering and unauthorized State House recordings.',
        capitalCost: 5,
        impact: {
          factions: { public: -16, party: +6, governors: 0, assembly: -6, media: -22 },
          treasuryBillion: 0,
          characterLoyalty: { party_chairman: 8, opposition_leader: 20 },
        },
        feedbackText:
          'Youth activists organize cyber-boycotts and digital petitions. The gaffe becomes ten times more famous because of the Streisand effect.',
        newspaperHeadline: 'CYBER-STORM: SOCIAL MEDIA ROW BOILS AS REGULATOR ISSUES THREATS',
      },
      {
        id: 'c15_ignore_work',
        label: 'Ignore the Distraction & Inspect a Bridge Construction',
        description: 'Keep completely silent on the clip while showing up in hard hat and work boots at the River Niger bridge project.',
        capitalCost: 2,
        impact: {
          factions: { public: +6, party: +4, governors: +4, assembly: +2, media: +2 },
          treasuryBillion: 0,
          promiseEffect: { promiseId: 'promise_roads_rail', progressDelta: 6 },
        },
        feedbackText:
          'The viral clip fades within 72 hours as photos of you inspecting heavy steel girders dominate the Sunday newspapers.',
        newspaperHeadline: 'BACK TO WORK: PRESIDENT FOCUSES ON CONCRETE GAINS OVER DIGITAL CHATTER',
      },
    ],
  },

  // 16. Infrastructure Contract
  {
    id: 'crisis_16_infrastructure_leak',
    number: 16,
    title: 'The Coastal Rail Cost Overrun Scandal',
    category: 'infrastructure',
    reportedByCharacterId: 'chief_of_staff',
    urgency: 'critical',
    contextDescription:
      'The contractor handling the vital East-West standard gauge rail line has stalled works, demanding an additional ₦240 Billion due to foreign currency variations. Meanwhile, documents leaked to investigative reporters show sub-contractors linked to party chieftains.',
    characterQuote:
      '"Sir, the original budget was signed under the previous government. If you cancel it, litigation will freeze construction for four years. If you pay, the opposition will cry corruption."',
    choices: [
      {
        id: 'c16_forensic_audit',
        label: 'Order Forensic Engineering Audit & Renegotiate',
        description: 'Bring in independent international quantity surveyors to strip out kickbacks and fix realistic milestone delivery dates.',
        capitalCost: 7,
        impact: {
          factions: { public: +16, party: -12, governors: +8, assembly: +6, media: +14 },
          treasuryBillion: -90,
          characterLoyalty: { party_chairman: -18, finance_minister: 14, chief_adviser: 10 },
          promiseEffect: { promiseId: 'promise_roads_rail', progressDelta: 16 },
        },
        feedbackText:
          'The forensic audit saves ₦110 Billion in inflated variations. Sub-contracts are re-awarded transparently, and track-laying resumes at double speed.',
        newspaperHeadline: 'CLEAN TRACKS: FORENSIC AUDIT CUTS BILLIONS IN RAILWAY SCAM',
      },
      {
        id: 'c16_pay_quietly',
        label: 'Pay Variation Quietly to Guarantee Fast Completion',
        description: 'Settle the contractor’s claims from emergency capital reserves so the train can be commissioned before the election.',
        capitalCost: 3,
        impact: {
          factions: { public: +4, party: +12, governors: +6, assembly: +4, media: -14 },
          treasuryBillion: -240,
          characterLoyalty: { party_chairman: 16, finance_minister: -16 },
          promiseEffect: { promiseId: 'promise_roads_rail', progressDelta: 22 },
        },
        feedbackText:
          'Trains begin test runs to public delight, but investigative newspapers publish devastating exposés on the inflated contractor payouts.',
        newspaperHeadline: 'FAST TRAINS, FAT CHEQUES: CONTROVERSY SURROUNDS EXPENSIVE RAIL LAUNCH',
      },
      {
        id: 'c16_revoke_contract',
        label: 'Revoke Contract & Blacklist Defaulting Firms',
        description: 'Terminate the agreement with immediate effect and hand project over to the Military Corps of Engineers.',
        capitalCost: 8,
        impact: {
          factions: { public: +10, party: -14, governors: -6, assembly: -8, media: +6 },
          treasuryBillion: -30,
          characterLoyalty: { interior_minister: 16, party_chairman: -20, governor_south: -10 },
          promiseEffect: { promiseId: 'promise_roads_rail', progressDelta: -10 },
        },
        feedbackText:
          'Military bulldozers take over the right-of-way. The bold stand is praised, although legal injunctions cloud the timeline.',
        newspaperHeadline: 'SOLDIERS ON THE TRACKS: CONTRACTOR EVICTED IN DRAMATIC TAKEOVER',
      },
    ],
  },

  // 17. Civil Service Revolt
  {
    id: 'crisis_17_ghost_workers',
    number: 17,
    title: 'The Biometric Ghost-Worker Strike Threat',
    category: 'governance',
    reportedByCharacterId: 'finance_minister',
    urgency: 'urgent',
    contextDescription:
      'The Ministry of Finance’s automated biometric payroll verification has detected 42,000 ghost workers, saving ₦85 Billion annually. However, civil service union executives claim legitimate junior officers were mistakenly delisted and have declared an indefinite strike.',
    characterQuote:
      '"Mr. President, these union leaders are protecting syndicates that draw 50 salaries per month into dormant bank accounts! If we back down now, reforms are dead."',
    choices: [
      {
        id: 'c17_stand_ground',
        label: 'Stand Firm on Biometric Cleanse with Rapid Helpdesk',
        description: 'Insist on digital payroll integrity while setting up 48-hour ombudsman centers to re-verify any wrongfully affected junior staff.',
        capitalCost: 6,
        impact: {
          factions: { public: +14, party: -4, governors: +8, assembly: +4, media: +12 },
          treasuryBillion: 120,
          characterLoyalty: { finance_minister: 20, chief_adviser: 10 },
          promiseEffect: { promiseId: 'promise_anti_corruption', progressDelta: 20 },
        },
        feedbackText:
          'Verification centers swiftly clear genuine workers while ghost identities evaporate forever. ₦85 Billion is saved for real public works.',
        newspaperHeadline: 'GHOSTS PURGED: PAYROLL AUDIT RECOVERS ₦85 BILLION FOR TREASURY',
      },
      {
        id: 'c17_compromise_union',
        label: 'Suspend Sanctions and Create Joint Verification Board',
        description: 'Postpone terminations for six months and allow union delegates to co-manage the verification panels.',
        capitalCost: 3,
        impact: {
          factions: { public: -6, party: +6, governors: -4, assembly: +2, media: -8 },
          treasuryBillion: -45,
          characterLoyalty: { finance_minister: -16, party_chairman: 8 },
        },
        feedbackText:
          'The strike is averted. Bureaucrats return to work with relief, though independent economists shake their heads at another reform stalled.',
        newspaperHeadline: 'STRIKE SHELVED: GOVERNMENT STRIKES VERIFICATION TRUCE WITH WORKERS',
      },
    ],
  },

  // 18. National Disaster
  {
    id: 'crisis_18_national_disaster',
    number: 18,
    title: 'The Great Niger-Benue Floods',
    category: 'social',
    reportedByCharacterId: 'interior_minister',
    urgency: 'critical',
    contextDescription:
      'Seasonal release of water from the Lagdo Dam upstream, combined with torrential rainfall, has submerged 14 states along the Niger and Benue river basins. Over 300,000 citizens are displaced, farmlands are under water, and disease threatens camps.',
    characterQuote:
      '"Your Excellency, this is a national humanitarian emergency. NEMA warehouses are running out of blankets and anti-malaria medicines. Governors across party lines are crying for immediate ecological fund release."',
    choices: [
      {
        id: 'c18_immediate_relief',
        label: 'Deploy Military Transport & ₦150B Ecological Emergency Fund',
        description: 'Air-drop supplies, convert federal auditoriums to shelters, and disburse direct rehabilitation grants to flooded states.',
        capitalCost: 6,
        impact: {
          factions: { public: +20, party: +6, governors: +22, assembly: +8, media: +16 },
          treasuryBillion: -150,
          characterLoyalty: { interior_minister: 12, governor_north: 16, governor_south: 16 },
          promiseEffect: { promiseId: 'promise_jobs', progressDelta: 4 },
        },
        feedbackText:
          'The President arrives by amphibious patrol boat to comfort displaced families. Relief arrives swiftly, uniting the federation in empathy.',
        newspaperHeadline: 'COMMANDER IN CHIEF ON THE WATERS: MASSIVE FLOOD AID REACHES VICTIMS',
      },
      {
        id: 'c18_seek_international_donor',
        label: 'Launch International UN & Diaspora Relief Appeal',
        description: 'Rally foreign bilateral donors, World Bank climate credits, and private philanthropic foundations to foot the reconstruction bill.',
        capitalCost: 4,
        impact: {
          factions: { public: +8, party: +2, governors: +6, assembly: +4, media: +8 },
          treasuryBillion: 60,
          characterLoyalty: { finance_minister: 10, chief_adviser: 8 },
        },
        feedbackText:
          'International humanitarian airlifts land in Abuja and Port Harcourt. Substantial foreign grant funding relieves pressure on the domestic budget.',
        newspaperHeadline: 'GLOBAL SOLIDARITY: INTERNATIONAL CLIMATE FUNDS ARRIVE FOR FLOOD EFFORTS',
      },
    ],
  },

  // 19. Cabinet Crisis: Finance vs Interior
  {
    id: 'crisis_19_cabinet_clash',
    number: 19,
    title: 'Cabinet Civil War: Okonkwo vs. Danjuma',
    category: 'survival',
    reportedByCharacterId: 'chief_of_staff',
    urgency: 'critical',
    contextDescription:
      'A ferocious shouting match in the Federal Executive Council meeting has leaked. Finance Minister Ngozi Okonkwo refused to clear ₦180 Billion in un-tendered Homeland Security hardware purchases, accusing Interior Minister Danjuma of violating procurement laws. Danjuma threatened to resign on the spot and take the security apparatus with him.',
    characterQuote:
      '"Mr. President, this cabinet cannot survive with both of them in the room. Danjuma controls the Generals; Okonkwo controls the foreign investors and the IMF. You must choose or tame them."',
    choices: [
      {
        id: 'c19_back_finance',
        label: 'Uphold Procurement Law & Back Finance Minister',
        description: 'Support strict fiscal oversight. Strip the questionable purchases and demand competitive international bidding.',
        capitalCost: 8,
        impact: {
          factions: { public: +12, party: -8, governors: +4, assembly: +8, media: +14 },
          treasuryBillion: 140,
          characterLoyalty: { finance_minister: 25, interior_minister: -30, chief_adviser: 12 },
          promiseEffect: { promiseId: 'promise_anti_corruption', progressDelta: 16 },
        },
        feedbackText:
          'Dr. Okonkwo stays on with fortified authority. General Danjuma tenders his resignation with a stinging press statement, but investors rejoice.',
        newspaperHeadline: 'RULE OF LAW IN THE CABINET: PRESIDENT BACKS OKONKWO OVER BUDGET DISPUTE',
      },
      {
        id: 'c19_back_interior',
        label: 'Classify Procurement as National Security Exception',
        description: 'Sign an emergency executive clearance for Danjuma’s hardware to ensure troops have tactical supremacy.',
        capitalCost: 6,
        impact: {
          factions: { public: +4, party: +8, governors: +6, assembly: -6, media: -10 },
          treasuryBillion: -180,
          characterLoyalty: { interior_minister: 25, finance_minister: -28, party_chairman: 10 },
          promiseEffect: { promiseId: 'promise_security', progressDelta: 16 },
        },
        feedbackText:
          'General Danjuma salutes the President and secures the weapons shipment. Dr. Okonkwo stays only after solemn presidential promises of fiscal caps.',
        newspaperHeadline: 'SECURITY FIRST: PRESIDENT CLEARS EMERGENCY ACQUISITION FOR TROOPS',
      },
      {
        id: 'c19_force_compromise',
        label: 'Lock Them in Presidential Study for Independent Peer Review',
        description: 'Cut the contract to ₦90 Billion, overseen by a bipartisan National Security Council committee.',
        capitalCost: 10,
        impact: {
          factions: { public: +10, party: +6, governors: +6, assembly: +8, media: +10 },
          treasuryBillion: -90,
          characterLoyalty: { finance_minister: 8, interior_minister: 8, chief_of_staff: 14 },
        },
        feedbackText:
          'At 3:00 AM, both ministers emerge together and shake hands before cameras. You kept your entire inner team intact through pure executive diplomacy.',
        newspaperHeadline: 'PEACE IN THE CABINET: ASO ROCK RESOLVES HIGH-STAKES MINISTERIAL ROW',
      },
    ],
  },

  // 20. The Promise Anniversary
  {
    id: 'crisis_20_promise_anniversary',
    number: 20,
    title: 'The Mandate Scorecard Anniversary',
    category: 'survival',
    reportedByCharacterId: 'chief_adviser',
    urgency: 'critical',
    contextDescription:
      'It is the eve of the national election season. Think tanks, newspapers, and the opposition have published a line-by-line audit of your campaign promises: Jobs, Grid Power, Highway Rails, Healthcare, and Currency Stability. You must frame your legacy before the country votes.',
    characterQuote:
      '"Mr. President, 200 million Nigerians are looking at the promise ledger. You have laid deep foundations, but citizens feel the daily pinch. How you address this milestone will define the election."',
    choices: [
      {
        id: 'c20_bold_achievements',
        label: 'Highlight Enduring Structural Turnaround',
        description: 'Present the concrete long-term infrastructure, recovered revenues, and stabilized macroeconomic pillars.',
        capitalCost: 6,
        impact: {
          factions: { public: +14, party: +10, governors: +10, assembly: +8, media: +12 },
          treasuryBillion: 50,
          characterLoyalty: { chief_adviser: 16, party_chairman: 12 },
        },
        feedbackText:
          'Your address resonates with discerning citizens. The nation reflects on the turbulent storms weathered under your steady hand.',
        newspaperHeadline: 'FOUR YEARS ON: PRESIDENT PRESENTS COMPELLING RECORD OF TRANSFORMATION',
      },
      {
        id: 'c20_humble_service',
        label: 'Deliver an Empathic, Humble Call for Continuity',
        description: 'Acknowledge the sacrifices made by ordinary citizens, explain unfinished business, and ask for mandate renewal.',
        capitalCost: 8,
        impact: {
          factions: { public: +20, party: +6, governors: +12, assembly: +6, media: +18 },
          treasuryBillion: 0,
          characterLoyalty: { chief_of_staff: 12, information_minister: 16 },
        },
        feedbackText:
          'A deeply emotional speech that disarms cynics. Editorial boards call it the most statesmanlike presidential address in a generation.',
        newspaperHeadline: 'THE HUMAN PRESIDENT: ASO ROCK WINS PRAISE FOR HUMILITY AND VISION',
      },
    ],
  },

  // --- DELAYED SPINOFF CRISES (Triggered by past decisions) ---
  {
    id: 'spinoff_fuel_compensation',
    number: 101,
    isDelayedSpinoff: true,
    spinoffOrigin: 'crisis_01_fuel',
    title: 'Governors’ Federation Account Rebellion',
    category: 'governance',
    reportedByCharacterId: 'governor_south',
    urgency: 'critical',
    contextDescription:
      'Remember the fuel subsidy abolition you enacted months ago? The State Governors remember. They have gathered in Abuja insisting that all ₦500 Billion in monthly federal fuel savings must be shared directly into state treasuries through FAAC without federal holdbacks.',
    characterQuote:
      '"Your Excellency, you promised us compensation when we supported your fuel deregulation. If you hoard the savings in Abuja, we will reject the federal minimum wage pact!"',
    choices: [
      {
        id: 'sc_share_equally',
        label: 'Release State Infrastructure Palliatives (₦120B)',
        description: 'Disburse dedicated capital development grants to states for agricultural logistics and electric transit.',
        capitalCost: 4,
        impact: {
          factions: { public: +6, party: +8, governors: +20, assembly: +4, media: +6 },
          treasuryBillion: -120,
          characterLoyalty: { governor_south: 18, governor_north: 16, finance_minister: -8 },
        },
        feedbackText:
          'Governors leave the Villa in high spirits, praising the administration’s true fiscal federalism.',
        newspaperHeadline: 'FAAC WINDFALL: STATES RECEIVE BILLIONS FOR ROADS AND GRAINS',
      },
      {
        id: 'sc_keep_federal_reserves',
        label: 'Retain Savings in National Stabilization Fund',
        description: 'Insist savings belong to sovereign debt reduction and national grid infrastructure.',
        capitalCost: 7,
        impact: {
          factions: { public: +8, party: -6, governors: -20, assembly: -6, media: +8 },
          treasuryBillion: 250,
          characterLoyalty: { finance_minister: 18, governor_south: -18, governor_north: -18 },
        },
        feedbackText:
          'The national sovereign reserve swells, though state governors stage a boycott of the national economic council meeting.',
        newspaperHeadline: 'SOVEREIGN STAND: PRESIDENT REJECTS GOVERNORS DEMAND FOR CASH BONANZA',
      },
    ],
  },

  {
    id: 'spinoff_fuel_insolvency',
    number: 102,
    isDelayedSpinoff: true,
    spinoffOrigin: 'crisis_01_fuel',
    title: 'The National Fuel Import Insolvency Alert',
    category: 'economy',
    reportedByCharacterId: 'finance_minister',
    urgency: 'critical',
    contextDescription:
      'Because you maintained the full subsidy earlier, outstanding debt to international oil traders has ballooned to $1.8 Billion. Vessels are anchored offshore refusing to discharge cargo without letters of credit. Fuel stations are running dry across the country.',
    characterQuote:
      '"Mr. President, the chickens have come home to roost. The commercial banks can no longer issue credit lines. We have zero days of fuel cover remaining."',
    choices: [
      {
        id: 'sc_emergency_phased_exit',
        label: 'Announce Immediate Emergency Phased Deregulation',
        description: 'Face the music: raise the pump price now to allow private marketers to import competitively.',
        capitalCost: 6,
        impact: {
          factions: { public: -18, party: -10, governors: +10, assembly: -8, media: -14 },
          treasuryBillion: 300,
          characterLoyalty: { finance_minister: 14, party_chairman: -14 },
        },
        feedbackText:
          'Vessels discharge cargo within 24 hours. The price hike is painful, but queues vanish as fuel flows again.',
        newspaperHeadline: 'SHOCK MEASURE: IMMINENT FUEL COLLAPSE FORCES EMERGENCY DEREGULATION',
      },
      {
        id: 'sc_crude_for_fuel_swap',
        label: 'Direct State Oil Company to Execute Direct Crude Swap',
        description: 'Barter crude barrels directly for refined petrol to bypass cash insolvency.',
        capitalCost: 5,
        impact: {
          factions: { public: +4, party: +2, governors: -10, assembly: +2, media: -6 },
          treasuryBillion: -150,
          characterLoyalty: { finance_minister: -10, chief_adviser: -8 },
        },
        feedbackText:
          'Refined fuel arrives, but economists warn that trading future crude production reduces future federal allocations.',
        newspaperHeadline: 'CRUDE FOR PETROL: ASO ROCK EXECUTES EMERGENCY BARTER DEAL',
      },
    ],
  },
];
