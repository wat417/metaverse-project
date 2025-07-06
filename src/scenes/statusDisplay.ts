// src/scenes/statusDisplay.ts

import { on } from "../utils/eventBus";
import { hasStatusChanged } from "../utils/statusMap";
import { hasNameOrEmojiChanged } from "../utils/nameEmojiMap";

/**
 * ステータス別の色定義（任意設定）
 */
const STATUS_COLORS: Record<string, string> = {
  idle: "#888888",
  active: "#00cc66",
  busy: "#ff9900",
  offline: "#333333"
};

/**
 * プレイヤーラベル一覧を管理するコンテナノード
 */
const labelContainer = document.createElement("div");
labelContainer.id = "status-label-container";
document.body.appendChild(labelContainer);

/**
 * ラベルの背景色をステータスに応じて更新
 */
function applyStatusStyle(label: HTMLElement, status: string): void {
  const color = STATUS_COLORS[status] ?? "#444444";
  label.style.backgroundColor = color;
}

/**
 * ステータスラベルの初期生成（未使用）
 */
export function createStatusLabel(
  uid: string,
  name: string,
  emoji: string,
  status: string
): HTMLElement {
  const label = document.createElement("div");
  label.id = `status-label-${uid}`;
  label.className = "status-label";
  label.innerText = `${name}${emoji ?? ""} : ${status}`;
  applyStatusStyle(label, status);
  return label;
}

/**
 * ステータスラベルの更新処理（存在しない場合は生成）
 */
export function updateStatusLabel(
  uid: string,
  name: string,
  emoji: string,
  status: string
): void {
  let label = document.getElementById(`status-label-${uid}`);
  if (!label) {
    label = document.createElement("div");
    label.id = `status-label-${uid}`;
    label.className = "status-label";
    labelContainer.appendChild(label);
  }
  label.innerText = `${name}${emoji ?? ""} : ${status}`;
  applyStatusStyle(label, status);
}

/**
 * ✅ 一括通知イベント受信：差分がある場合に表示更新
 */
on("playerBatchUpdate", (diffs: Record<string, any>) => {
  Object.entries(diffs).forEach(([uid, data]) => {
    const { name, emoji, status } = data;
    if (hasStatusChanged(uid, status) || hasNameOrEmojiChanged(uid, name, emoji)) {
      updateStatusLabel(uid, name, emoji, status);
    }
  });
});