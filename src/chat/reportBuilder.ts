// reportBuilder.ts
import { groupByType } from './eventClassifier'
import type { ChatEvent, MessageType } from '../types/message'

export function filterEvents(events: ChatEvent[], types?: MessageType[]): ChatEvent[] {
  if (!types || types.length === 0) return events
  return events.filter(e => types.includes(e.type))
}

function generateStatistics(events: ChatEvent[]): string {
  const stats: Record<string, number> = {}
  for (const event of events) {
    stats[event.type] = (stats[event.type] || 0) + 1
  }
  return JSON.stringify(stats, null, 2)
}

function formatHistory(events: ChatEvent[]): string {
  return events.map(e => `${e.timestamp} [${e.type}] ${e.text}`).join('\n')
}

function formatMarkdown(grouped: Record<string, ChatEvent[]>): string {
  return Object.entries(grouped)
    .map(([type, list]) => {
      return `## ${type}\n件数: ${list.length}\n` +
             list.map(e => `- ${e.timestamp} ${e.text}`).join('\n')
    }).join('\n\n')
}

function formatJSON(grouped: Record<string, ChatEvent[]>): string {
  const obj = Object.entries(grouped).reduce((acc, [type, list]) => {
    acc[type] = list.map(e => ({
      timestamp: e.timestamp,
      text: e.text,
      type: e.type
    }))
    return acc
  }, {} as Record<string, any>)
  return JSON.stringify(obj, null, 2)
}

export async function generateReport(
  events: ChatEvent[],
  format: 'markdown' | 'json' | 'statistics' | 'history',
  filter?: MessageType[]
): Promise<string> {
  const filtered = filterEvents(events, filter)
  const grouped = groupByType(filtered)

  if (format === 'statistics') return generateStatistics(filtered)
  if (format === 'history') return formatHistory(filtered)
  if (format === 'markdown') return formatMarkdown(grouped)
  return formatJSON(grouped)
}