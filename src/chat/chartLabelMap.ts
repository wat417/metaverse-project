export const chartLabelMap: Record<string, Record<string, { label: string; iconKey: string }>> = {
  ja: {
    bar: { label: '棒グラフ', iconKey: 'bar' },
    line: { label: '折れ線グラフ', iconKey: 'line' },
    pie: { label: '円グラフ', iconKey: 'pie' }
  },
  en: {
    bar: { label: 'Bar Chart', iconKey: 'bar' },
    line: { label: 'Line Chart', iconKey: 'line' },
    pie: { label: 'Pie Chart', iconKey: 'pie' }
  }
}