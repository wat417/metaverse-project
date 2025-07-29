// src/handlers/messageHandler.ts

import { emitToast } from "@/utils/eventBus";
import rawNotificationMessage from "@/assets/i18n/notificationMessage.json";
import { logEvent } from "@/log/genericEventLogger";

const notificationMessage = rawNotificationMessage as Record<string, any>;

export function handleDisconnectEvent(userId: string) {
  const message = notificationMessage["ja"]?.userDisconnected ?? "接続が切断されました";
  emitToast(message);
  logEvent({
    userId,
    eventId: "disconnect",
    type: "disconnect",
    payload: {},
    timestamp: Date.now()
  });
}

export function handleExitEvent(userId: string) {
  const message = notificationMessage["ja"]?.userExited ?? "ユーザーが退出しました";
  emitToast(message);
  logEvent({
    userId,
    eventId: "exit",
    type: "exit",
    payload: {},
    timestamp: Date.now()
  });
}