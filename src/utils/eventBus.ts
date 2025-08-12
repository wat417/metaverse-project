// src/utils/eventBus.ts

import { i18n } from "../i18n";

type ToastPayload = {
  messageKey: string;
  lang?: string;
};

export function emitToast(messageKey: string, lang?: string): void {
  const resolvedLang =
    typeof i18n.global.locale === "string"
      ? i18n.global.locale
      : i18n.global.locale?.value || "ja";

  const payload: ToastPayload = {
    messageKey,
    lang: lang || resolvedLang
  };

  window.dispatchEvent(new CustomEvent("toast", { detail: payload }));
}

export function emitOperation(
  event: string,
  payload: any,
  sender?: string
): void {
  const detail = { payload, sender };
  window.dispatchEvent(new CustomEvent(event, { detail }));
}

export function emit(event: string, payload?: any): void {
  window.dispatchEvent(new CustomEvent(event, { detail: payload }));
}

export function onToast(handler: (payload: ToastPayload) => void): void {
  window.addEventListener("toast", (event: Event) => {
    const toastEvent = event as CustomEvent;
    handler(toastEvent.detail);
  });
}

export function removeToastListener(): void {
  window.removeEventListener("toast", () => {});
}