import { filterText } from "../../functions/filterText";
import notificationMessage from "../../config/notificationMessage.json";
import { displayNotice } from "@/services/toastService";

type LocaleKeys = keyof typeof notificationMessage;

export async function processChat(text: string, locale: LocaleKeys): Promise<{ result: string }> {
  const filteredText = await filterText(text);
  const notice = filteredText !== text
    ? notificationMessage[locale]?.notice ?? null
    : null;

  displayNotice(notice);

  return {
    result: filteredText
  };
}