// chartIcons.ts
export const chartIcons: Record<string, string> = {
  bar: `<svg width="24" height="24"><rect x="4" y="8" width="4" height="12" fill="#4b9fff"/><rect x="10" y="4" width="4" height="16" fill="#4b9fff"/><rect x="16" y="12" width="4" height="8" fill="#4b9fff"/></svg>`,
  line: `<svg width="24" height="24"><polyline points="4,16 10,10 16,14 20,6" fill="none" stroke="#ff9f4b" stroke-width="2"/></svg>`,
  pie: `<svg width="24" height="24"><circle cx="12" cy="12" r="10" fill="#ccc"/><path d="M12,2 A10,10 0 1,1 2,12 L12,12 Z" fill="#4b9fff"/></svg>`,
  scatter: `<svg width="24" height="24"><circle cx="6" cy="18" r="2" fill="#7cb342"/><circle cx="12" cy="10" r="2" fill="#7cb342"/><circle cx="18" cy="14" r="2" fill="#7cb342"/></svg>`,
  area: `<svg width="24" height="24"><path d="M4,16 L10,10 L16,14 L20,6 L20,20 L4,20 Z" fill="#ff4b9f" opacity="0.6"/><polyline points="4,16 10,10 16,14 20,6" fill="none" stroke="#ff4b9f" stroke-width="2"/></svg>`
};

export function getChartIcon(chartType: string): string {
  return chartIcons[chartType] || '';
}