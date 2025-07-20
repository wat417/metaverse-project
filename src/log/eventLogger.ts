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

export function stepCompleted(stepNo: number): void {
  const timestamp = Date.now();
  const dateStr = new Date(timestamp).toISOString().slice(0, 10).replace(/-/g, "");
  const path = `/logs/${dateStr}/system/stepCompleted/Step${stepNo}`;
  const event: OperationEvent = {
    eventId: `Step${stepNo}`,
    userId: "system",
    type: "stepCompleted",
    payload: { status: "completed" },
    timestamp
  };
  writeLog(path, event);
}

export function logDisconnectEvent(userId: string, eventId: string): void {
  logEvent({ eventId, userId, type: "disconnect", payload: {}, timestamp: Date.now() });
}

export function logExitEvent(userId: string, eventId: string): void {
  logEvent({ eventId, userId, type: "exit", payload: {}, timestamp: Date.now() });
}

export function logReconnectEvent(userId: string, eventId: string): void {
  logEvent({ eventId, userId, type: "reconnect", payload: {}, timestamp: Date.now() });
}