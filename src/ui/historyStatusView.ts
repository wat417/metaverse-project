// historyStatsView.ts
import { CANVAS_DIMENSIONS } from '../config/config';

export function createStatsCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_DIMENSIONS.width;
  canvas.height = CANVAS_DIMENSIONS.height;
  canvas.classList.add('stats-view-canvas');
  return canvas;
}
