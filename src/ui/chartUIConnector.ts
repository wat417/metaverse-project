// chartUIConnector.ts
import { getChartIcon } from '../assets/chartIcons';

export function bindChartIconToUI(chartType: string, elementId: string): void {
  const icon = getChartIcon(chartType);
  const el = document.getElementById(elementId);
  if (el) {
    el.innerHTML = icon;
  }
}

// setupChartIconSelection は ChartDisplay.tsx に移管済（責務分離）