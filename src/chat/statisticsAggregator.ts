import { AggregatedStatistics } from './statisticsTypes'
import { chartLabelMap } from './chartLabelMap'

export function aggregateStatistics(data: any[]): AggregatedStatistics {
  const aggregated: Record<string, number> = {}
  let totalSessions = 0
  let totalMessages = 0
  const activeUsers = new Set<string>()

  for (const item of data) {
    const key = item.type || 'unknown'
    aggregated[key] = (aggregated[key] || 0) + 1
    totalSessions += item.sessionCount || 0
    totalMessages += item.messageCount || 0
    if (item.userId) activeUsers.add(item.userId)
  }

  return {
    totalSessions,
    totalMessages,
    activeUserCount: activeUsers.size,
    chartLabel: chartLabelMap['ja'].summary.label,
    chartType: 'bar',
    data: aggregated
  }
}