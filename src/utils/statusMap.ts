// src/utils/statusMap.ts

// プレイヤーごとの最新ステータスを保持
export const statusCache: Record<string, string> = {};

// ステータスの変化検知：前回と異なる場合に true
export function hasStatusChanged(uid: string, newStatus: string): boolean {
  const prev = statusCache[uid];
  if (prev === undefined || prev !== newStatus) {
    statusCache[uid] = newStatus;
    return true;
  }
  return false;
}

// 状態分類ラベル定義
export const statusLabels: Record<string, string> = {
  active: "アクティブ",
  idle: "アイドル",
  disconnected: "切断",
  exited: "退出",
  reconnect: "再接続"
};