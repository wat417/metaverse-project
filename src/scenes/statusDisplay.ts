// src/scenes/statusDisplay.ts

import { on } from "../utils/eventBus";
import { hasStatusChanged } from "../utils/statusMap";
import { hasNameOrEmojiChanged } from "../utils/nameEmojiMap";

/**
 * ステータス別の色定義
 */
const STATUS_COLORS: Record<string, string> = {
  idle: "#888888",
  active: "#00cc66",
  busy: "#ff9900",
  offline: "#333333"
};

/**
 * ステータス別のZ順定義
 */
const STATUS_Z_INDEX: Record<string, number> = {
  offline: 10,
  idle: 20,
  busy: 30,
  active: 40
};

/**
 * チーム別表示フィルタ
 */
let activeTeamFilter: string | null = null;

/**
 * ステータスごとのラベルリスト
 */
const groupedLabels: Record<string, HTMLElement[]> = {
  idle: [],
  active: [],
  busy: [],
  offline: []
};

/**
 * 詳細領域コンテナ
 */
const detailPanel = document.createElement("div");
detailPanel.id = "status-detail-panel";
detailPanel.className = "status-detail-panel";
detailPanel.style.display = "none";
detailPanel.style.position = "absolute";
detailPanel.style.zIndex = "100";
detailPanel.style.backgroundColor = "#222222";
detailPanel.style.color = "#ffffff";
detailPanel.style.padding = "12px";
detailPanel.style.border = "1px solid #ffffff";
document.body.appendChild(detailPanel);

/**
 * ラベル領域コンテナ
 */
const labelContainer = document.createElement("div");
labelContainer.id = "status-label-container";
labelContainer.style.position = "relative";
document.body.appendChild(labelContainer);

/**
 * スタイル適用（色 / Z順）
 */
function applyStatusStyle(label: HTMLElement, status: string): void {
  const bgColor = STATUS_COLORS[status] ?? "#444444";
  label.style.backgroundColor = bgColor;
  const zIndex = STATUS_Z_INDEX[status] ?? 0;
  label.style.zIndex = zIndex.toString();
}

/**
 * hoverイベント付与
 */
function attachHoverEvents(label: HTMLElement): void {
  label.addEventListener("mouseenter", () => {
    label.style.transform = "scale(1.05)";
    label.style.border = "1px solid #ffffff";
  });
  label.addEventListener("mouseleave", () => {
    label.style.transform = "scale(1)";
    label.style.border = "none";
  });
}

/**
 * clickイベント付与 → 詳細表示
 */
function attachClickEvent(
  label: HTMLElement,
  uid: string,
  name: string,
  emoji: string,
  status: string
): void {
  label.addEventListener("click", () => {
    detailPanel.innerText = `🧑 ${name} ${emoji ?? ""}\n📛 Status: ${status}\n🔑 UID: ${uid}`;
    detailPanel.style.display = "block";

    const rect = label.getBoundingClientRect();
    detailPanel.style.left = `${rect.right + 12}px`;
    detailPanel.style.top = `${rect.top}px`;
  });
}

/**
 * グループ化配置
 */
function insertGroupedLabel(label: HTMLElement, status: string): void {
  const group = groupedLabels[status];
  if (!group.includes(label)) group.push(label);

  labelContainer.innerHTML = "";
  const order = ["active", "busy", "idle", "offline"];
  for (const key of order) {
    groupedLabels[key].forEach((l) => labelContainer.appendChild(l));
  }
}

/**
 * 初期生成（未使用）
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
  attachHoverEvents(label);
  attachClickEvent(label, uid, name, emoji, status);
  return label;
}

/**
 * ラベル更新（生成時は全イベント追加）
 */
export function updateStatusLabel(
  uid: string,
  name: string,
  emoji: string,
  status: string,
  team?: string
): void {
  let labelNode = document.getElementById(`status-label-${uid}`);
  let label: HTMLElement;

  if (labelNode === null) {
    label = document.createElement("div");
    label.id = `status-label-${uid}`;
    label.className = "status-label";
    attachHoverEvents(label);
    attachClickEvent(label, uid, name, emoji, status);
    insertGroupedLabel(label, status);
  } else {
    label = labelNode as HTMLElement;
  }

  label.innerText = `${name}${emoji ?? ""} : ${status}`;
  applyStatusStyle(label, status);

  const visible = !activeTeamFilter || activeTeamFilter === team;
  label.style.display = visible ? "block" : "none";
}

/**
 * 表示フィルタ切替
 */
export function setTeamFilter(team: string | null): void {
  activeTeamFilter = team;
}

/**
 * 差分イベント受信 → 更新
 */
on("playerBatchUpdate", (diffs: Record<string, any>) => {
  Object.entries(diffs).forEach(([uid, data]) => {
    const { name, emoji, status, team } = data;
    if (hasStatusChanged(uid, status) || hasNameOrEmojiChanged(uid, name, emoji)) {
      updateStatusLabel(uid, name, emoji, status, team);
    }
  });
});