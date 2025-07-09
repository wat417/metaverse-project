// updateStatusText.ts
import { FILTER_LABELS } from '../config/config';

export function generateFilterText(filterKey: string): string {
  const label = FILTER_LABELS.includes(filterKey) ? filterKey : 'Uncategorized';
  return `Filter applied: ${label}`;
}