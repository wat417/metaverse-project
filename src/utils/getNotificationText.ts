import { i18n } from "@/i18n";
import { MessageType } from "@/types/message";

export const getNotificationText = (key: MessageType): string => {
  const message = i18n.global.t(key);
  if (message === key) {
    console.warn(`[通知未定義] key="${key}"`);
    return "未定義メッセージ";
  }
  return message;
};