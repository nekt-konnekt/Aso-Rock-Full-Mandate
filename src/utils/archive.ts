import { PresidentialRecord } from '../types';

const STORAGE_KEY = 'aso_rock_presidential_archive_v1';

const DEFAULT_ARCHIVE: PresidentialRecord[] = [
  {
    id: 'rec_predecessor',
    presidentName: 'President Babatunde Balogun',
    partyName: 'Federal Unity Party (FUP)',
    completedAt: '2023-05-29',
    totalMonths: 12,
    ending: 'second_term',
    legacyTitle: 'The Infrastructure Builder Who Lost The Currency',
    finalApproval: 52,
    decisionsMade: 18,
    ministersDismissed: 2,
    investigationsLaunched: 3,
    protestsQuelled: 1,
    promisesFulfilled: 3,
    promisesBroken: 2,
    finalTreasuryTrillion: 3.2,
    finalCapital: 28,
    keyEventsSummary: [
      'Completed the Second Niger Bridge amidst contractor protests.',
      'Abolished official foreign exchange windows, causing short-term inflation.',
      'Secured re-election through northern governor alliances.',
    ],
  },
];

export function getPresidentialArchive(): PresidentialRecord[] {
  if (typeof window === 'undefined') return DEFAULT_ARCHIVE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ARCHIVE));
      return DEFAULT_ARCHIVE;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ARCHIVE;
  } catch {
    return DEFAULT_ARCHIVE;
  }
}

export function savePresidentialRecord(record: PresidentialRecord): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getPresidentialArchive();
    const updated = [record, ...current.filter((r) => r.id !== record.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save presidential record', err);
  }
}

export function deletePresidentialRecord(id: string): PresidentialRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getPresidentialArchive();
    const updated = current.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getPresidentialArchive();
  }
}

export function exportPresidentialArchiveJSON(): void {
  if (typeof window === 'undefined') return;
  try {
    const records = getPresidentialArchive();
    const blob = new Blob([JSON.stringify(records, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aso_rock_presidents_archive_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to export presidential archive', err);
  }
}

export function importPresidentialArchiveJSON(jsonString: string): {
  success: boolean;
  records: PresidentialRecord[];
  message: string;
} {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { success: false, records: getPresidentialArchive(), message: 'Invalid JSON format: Expected an array of presidential records.' };
    }
    const current = getPresidentialArchive();
    const currentIds = new Set(current.map((r) => r.id));
    const merged = [...parsed.filter((r) => !currentIds.has(r.id)), ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return { success: true, records: merged, message: `Successfully imported ${parsed.length} presidential record(s).` };
  } catch (err) {
    return { success: false, records: getPresidentialArchive(), message: `Import error: ${err instanceof Error ? err.message : 'Unknown error'}` };
  }
}

export function generateLegacyTitle(
  ending: string,
  approval: number,
  treasuryTrillion: number,
  promisesFulfilled: number,
  ministersDismissed: number
): string {
  if (ending === 'collapse') {
    return 'The President Whose Administration Broke Under The Storm';
  }
  if (ending === 'opposition') {
    return 'The Statesman Who Handed Over Power In Peace';
  }
  if (ending === 'successor') {
    return 'The Party Godfather Who Anointed The Next Generation';
  }
  if (treasuryTrillion > 5.0 && approval > 65) {
    return 'The Mastermind of The Grand Nigerian Turnaround';
  }
  if (approval >= 70) {
    return 'The People’s Mandate: Hero of The Common Nigerian';
  }
  if (treasuryTrillion > 4.5 && approval < 50) {
    return 'The Iron Technocrat: Stabilized The Balance Sheet, Lost The Streets';
  }
  if (ministersDismissed >= 2) {
    return 'The Villa Purger: Feared by Ministers, Respected by Historians';
  }
  if (promisesFulfilled >= 4) {
    return 'The Builder: Delighted The Nation With Concrete Results';
  }
  return 'The Survivor: Held The Giant of Africa Together Against All Odds';
}
