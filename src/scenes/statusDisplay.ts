import { emitOperation as emit } from "../utils/eventBus"

export function updateStatusDisplay(active: boolean): void {
  const statusElement = document.getElementById("status-indicator")
  if (statusElement) {
    statusElement.textContent = active ? "🟢 稼働中" : "🔴 停止中"
  }

  // 状態更新イベント通知
  emit("statusUpdate", { active }, "system")
}