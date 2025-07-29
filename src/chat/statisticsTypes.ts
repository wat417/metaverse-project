export interface AggregatedStatistics {
  totalSessions: number
  totalMessages: number
  activeUserCount: number
  chartLabel: string
  chartType: 'bar' | 'line' | 'pie'
  data: Record<string, number>
}