export function writeLog(path: string, event: unknown): void {
  console.log(`[${path}]`, event)
}

// 以下は既存コードと変更なし
export interface GenericEvent {
  eventId: string;
  userId: string;
  type: string;
  payload: Record<string, any>;
  timestamp: number;
}

export function logEvent(event: GenericEvent): void {
  const dateStr = new Date(event.timestamp).toISOString().slice(0, 10).replace(/-/g, "");
  const path = `/logs/${dateStr}/${event.userId}/${event.eventId}`;
  writeLog(path, event);
}

export function logChatFilterViolation(userId: string, text: string, matchedTerms: string[], isAnonymous: boolean): void {
  const timestamp = Date.now();
  const { masked } = applyFilteredText(text, isAnonymous);
  const event: GenericEvent = {
    eventId: "chatFilterViolation",
    userId,
    type: "chatFilterViolation",
    payload: {
      originalText: text,
      matchedTerms,
      anonymousOnly: isAnonymous,
      filteredResult: masked
    },
    timestamp
  };
  logEvent(event);
}

export function logGenericUserAction(userId: string, action: string, source: string, detail: Record<string, any> = {}): void {
  const timestamp = Date.now();
  const event: GenericEvent = {
    eventId: `${action}_${source}`,
    userId,
    type: "userAction",
    payload: {
      source,
      ...detail
    },
    timestamp
  };
  logEvent(event);
}

import { applyFilteredText } from "../chat/filterContext";