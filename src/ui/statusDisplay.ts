// statusDisplay.ts
import { STATUS_LABELS } from '../config/config';
import { renderStatusLabel } from './statusRenderer';

export function updateStatusDisplay(currentStatus: string): void {
  const labelIndex = STATUS_LABELS.indexOf(currentStatus);
  const label = STATUS_LABELS[labelIndex] || 'Unknown';
  renderStatusLabel(label);
}