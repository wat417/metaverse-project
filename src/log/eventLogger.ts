import { writeLog } from "./rtdbAdapter";

export interface OperationEvent {
  eventId: string;
  userId: string;
  type: string;
  payload: Record<string, any>;
  timestamp: number;
}

export function logEvent(event: OperationEvent): void {
  const dateStr = new Date(event.timestamp).toISOString().slice(0, 10).replace(/-/g, "");
  const path = `/logs/${dateStr}/${event.userId}/${event.eventId}`;
  writeLog(path, event);
}

export function logChatFilterViolation(userId: string, text: string, matchedTerms: string[]): void {
  const timestamp = Date.now();
  const event: OperationEvent = {
    eventId: `chatFilterViolation`,
    userId,
    type: "chatFilterViolation",
    payload: {
      originalText: text,
      matchedTerms
    },
    timestamp
  };
  logEvent(event);
}