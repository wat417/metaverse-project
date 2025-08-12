// src/services/toastService.ts

import { onToast } from "@/utils/eventBus";
import { getNotificationText } from "@/utils/getNotificationText";
import { NotificationMessages } from "@/types/i18nTypes";

const DEFAULT_LANGUAGE: keyof NotificationMessages = "ja";

export const toastService = {
  show(message: string, options?: { type?: string }): void {
    const prefix = options?.type === "success" ? "[✅]" :
                   options?.type === "error"   ? "[❌]" :
                   "[ℹ️]";
    console.log(`${prefix} ${message}`);
  }
};

export const showToast = toastService.show;

onToast(({ messageKey }) => {
  const message =
    getNotificationText(messageKey, DEFAULT_LANGUAGE) ?? "通知内容未定義";
  toastService.show(message);
});