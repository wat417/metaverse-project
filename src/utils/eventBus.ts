// src/utils/eventBus.ts

type EventCallback = (payload: any) => void;

const listeners: Record<string, EventCallback[]> = {};

// イベント登録：任意のイベント名とコールバックを紐づけ
export function on(eventName: string, callback: EventCallback) {
  if (!listeners[eventName]) {
    listeners[eventName] = [];
  }
  listeners[eventName].push(callback);
}

// イベント発火：対象イベント名で全コールバックに通知
export function emit(eventName: string, payload: any) {
  const callbacks = listeners[eventName];
  if (callbacks) {
    callbacks.forEach((cb) => cb(payload));
  }
}