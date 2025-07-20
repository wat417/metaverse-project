// src/chat/chatService.ts

import { filterText } from "../../functions/filterText";
import notificationMessageRaw from "../assets/i18n/notificationMessage.json";
import { showToast } from "../services/toastService";

const notificationMessage = notificationMessageRaw as Record<string, any>;

export async function processChat(text: string, locale: string): Promise<{ result: string }> {
  const filteredText = await filterText(text);
  const notice = filteredText !== text
    ? notificationMessage?.[locale]?.status?.userLeft ?? null
    : null;

  if (notice) {
    showToast(notice);
  }

  return {
    result: filteredText
  };
}