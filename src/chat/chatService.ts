import { applyFilteredText } from "./filterContext";
import notificationMessageRaw from "../assets/i18n/notificationMessage.json";
import { showToast } from "../services/toastService";

const notificationMessage = notificationMessageRaw as Record<string, any>;

export async function processChat(text: string, locale: string, isAnonymous: boolean): Promise<{ result: string }> {
  const { flagged, masked } = applyFilteredText(text, isAnonymous);

  if (flagged) {
    const notice = isAnonymous
      ? notificationMessage?.[locale]?.chat?.filterBlocked
      : notificationMessage?.[locale]?.chat?.filterMasked;

    if (notice) {
      showToast(notice);
    }
  }

  return { result: flagged && isAnonymous ? "" : masked };
}