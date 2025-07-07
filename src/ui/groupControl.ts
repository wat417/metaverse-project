// ✅ 修正後：eventBus の import パスを構成に準拠
import { emitOperation } from "../utils/eventBus";

export function handleGroupJoin(groupId: string, userId: string): void {
  const joinElement = document.getElementById(`group-${groupId}`);
  if (joinElement) {
    joinElement.classList.add("joined");
  }

  // グループ参加通知ログ出力
  emitOperation("groupJoin", { groupId }, userId);
}