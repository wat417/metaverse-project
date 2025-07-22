// src/services/toastService.ts

import { onToast } from "@/utils/eventBus";
import { getNotificationText } from "@/utils/getNotificationText";
import { NotificationMessages } from "@/types/i18nTypes";

const DEFAULT_LANGUAGE: keyof NotificationMessages = "ja";

onToast(({ messageKey }) => {
  const message =
    getNotificationText(messageKey, DEFAULT_LANGUAGE) ?? "通知内容未定義";
  showToast(message);
});

export const showToast = (message: string): void => {
  console.log("[Toast]", message);
};