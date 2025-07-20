// src/services/toastService.ts

import { onToast } from "../utils/eventBus";
import messages from "../assets/i18n/notificationMessage.json";

type MessageMap = {
  [lang: string]: {
    [category: string]: {
      [key: string]: string;
    };
  };
};

const typedMessages: MessageMap = messages as MessageMap;

onToast(({ messageKey, lang }) => {
  const [category, key] = messageKey.split(".");
  const localizedMessage =
    typedMessages[lang]?.[category]?.[key] ||
    typedMessages["ja"]?.[category]?.[key] ||
    "メッセージ未定義";

  showToast(localizedMessage);
});

export const showToast = (message: string) => {
  console.log("[Toast]", message);
};