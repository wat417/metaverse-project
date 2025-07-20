import { i18n } from "../i18n";

type ToastPayload = {
  messageKey: string;
  lang: string;
};

export const emitToast = (messageKey: string, lang?: string) => {
  const resolvedLang =
    typeof i18n.global.locale === "string"
      ? i18n.global.locale
      : i18n.global.locale?.value || "ja";

  const payload: ToastPayload = {
    messageKey,
    lang: lang || resolvedLang
  };

  window.dispatchEvent(new CustomEvent("toast", { detail: payload }));
};

export const onToast = (handler: (payload: ToastPayload) => void) => {
  window.addEventListener("toast", (event: Event) => {
    const toastEvent = event as CustomEvent;
    handler(toastEvent.detail);
  });
};

export const removeToastListener = () => {
  // 既存リスナーを外す際に使用（ハンドラ指定は実装者判断）
  window.removeEventListener("toast", () => {});
};