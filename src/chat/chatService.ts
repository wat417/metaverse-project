import { applyChatFilter } from "../../functions/chatFilter";
import notificationMessageRaw from "../assets/i18n/notificationMessage.json";
import { showToast } from "../services/toastService";

const notificationMessage = notificationMessageRaw as Record<string, any>;

export async function processChat(text: string, locale: string): Promise<{ result: string }> {
  const { flagged, masked } = applyChatFilter(text);
  const notice = flagged
    ? notificationMessage?.[locale]?.status?.userLeft ?? null
    : null;

  if (notice) {
    showToast(notice);
  }

  return { result: masked };
}