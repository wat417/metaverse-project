import { i18n } from "@/i18n";
import { emitToast } from "@/utils/eventBus";

export function displayNotice(key: string): void {
  const message = i18n.global.t(key);
  emitToast(message);
}