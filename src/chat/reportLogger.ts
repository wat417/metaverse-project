import type { ChatEvent } from '../types/message'
import { formatMessage } from '../utils/formatMessage'
import { writeLog } from '../log/genericEventLogger'

export function buildReport(events: ChatEvent[]): string {
  const formatted = events.map(e => formatMessage(e.text)).join('\n')
  writeLog('chat_report', formatted)
  return formatted
}