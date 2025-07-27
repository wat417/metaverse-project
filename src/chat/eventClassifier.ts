// eventClassifier.ts
import type { ChatEvent } from '../types/message'

export type EventType = 'INFO' | 'ACTION' | 'SYSTEM'

export function classifyEvent(event: ChatEvent): EventType {
  if (event.system) return 'SYSTEM'
  if (event.type === 'chat.messageSent' || event.type === 'chat.messageReceived') return 'ACTION'
  return 'INFO'
}

export function groupByType(events: ChatEvent[]): Record<EventType, ChatEvent[]> {
  const initial: Record<EventType, ChatEvent[]> = {
    INFO: [],
    ACTION: [],
    SYSTEM: []
  }
  return events.reduce((acc, e) => {
    const type = classifyEvent(e)
    acc[type].push(e)
    return acc
  }, initial)
}