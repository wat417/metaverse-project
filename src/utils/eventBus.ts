import { logEvent } from "../log/eventLogger"

export function emitOperation(eventType: string, payload: Record<string, any>, userId: string) {
  const timestamp = Date.now()
  const event = {
    eventId: `${eventType}_${timestamp}`,
    userId,
    type: eventType,
    payload,
    timestamp
  }
  logEvent(event)
}