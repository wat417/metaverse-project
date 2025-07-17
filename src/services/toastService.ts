import { emitToast } from "@/utils/eventBus";

export function displayNotice(notice: string | null): void {
  if (!notice) return;
  emitToast(notice);
}