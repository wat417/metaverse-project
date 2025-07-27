// reportBuilder.ts
import { groupByType } from './eventClassifier'
import type { ChatEvent, MessageType } from '../types/message'

export function filterEvents(events: ChatEvent[], types?: MessageType[]): ChatEvent[] {
  if (!types || types.length === 0) return events
  return events.filter(e => types.includes(e.type))
}

export function generateReport(
  events: ChatEvent[],
  format: 'markdown' | 'json',
  filter?: MessageType[]
): string {
  const filtered = filterEvents(events, filter)
  const grouped = groupByType(filtered)

  if (format === 'markdown') {
    return Object.entries(grouped)
      .map(([type, list]) => {
        return `## ${type}\n件数: ${list.length}\n` +
               list.map(e => `- ${e.timestamp} ${e.text}`).join('\n')
      }).join('\n\n')
  }

  return JSON.stringify(
    Object.entries(grouped).reduce((acc, [type, list]) => {
      acc[type] = list.map(e => ({
        timestamp: e.timestamp,
        text: e.text,
        type: e.type
      }))
      return acc
    }, {} as Record<string, any>),
    null,
    2
  )
}