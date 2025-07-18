// src/utils/eventBus.ts

export function emit(event: string, payload?: any): void {
  // 汎用イベント発火処理
  console.log(`[emit] ${event}`, payload);
}

export function emitOperation(operation: string, context?: any): void {
  // 操作イベント発火処理
  console.log(`[emitOperation] ${operation}`, context);
}

export function emitToast(message: string): void {
  // 通知イベント専用発火処理
  emit("toast", {
    type: "info",
    message,
    timestamp: Date.now()
  });
}