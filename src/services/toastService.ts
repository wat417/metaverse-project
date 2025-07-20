import { onToast } from "../utils/eventBus";
import messages from "../assets/i18n/notificationMessage.json";

// 型定義（messages 構造に応じて key の階層を補完）
type MessageMap = {
  [lang: string]: {
    [category: string]: {
      [key: string]: string;
    };
  };
};

const typedMessages: MessageMap = messages as MessageMap;

onToast(({ messageKey, lang }) => {
  // カテゴリを含む messageKey を `error.invalidToken` のように扱う想定
  const [category, key] = messageKey.split(".");
  const localizedMessage =
    typedMessages[lang]?.[category]?.[key] ||
    typedMessages["ja"]?.[category]?.[key] ||
    "メッセージ未定義";

  showToast(localizedMessage);
});

const showToast = (message: string) => {
  console.log("[Toast]", message);
};