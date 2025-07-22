// src/utils/getNotificationText.ts

import notificationMessages from "@/assets/i18n/notificationMessage.json";
import { NotificationMessages } from "@/types/i18nTypes";

/**
 * カテゴリ別メッセージ構成に対応した取得関数
 * @param messageKey メッセージキー（例: "error.invalidToken"）
 * @param lang 言語コード（例: "ja", "en", "zh"）
 * @returns 該当メッセージまたは undefined
 */
export function getNotificationText(
  messageKey: string,
  lang: keyof NotificationMessages
): string | undefined {
  const messages = notificationMessages as NotificationMessages;
  const [category, key] = messageKey.split(".");

  if (
    category &&
    key &&
    messages[lang] &&
    messages[lang][category] &&
    messages[lang][category][key]
  ) {
    return messages[lang][category][key];
  }

  return undefined;
}