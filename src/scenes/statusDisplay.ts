// src/scenes/statusDisplay.ts

import { on, emit } from "../utils/eventBus";
import { hasStatusChanged } from "../utils/statusMap";
import { hasNameOrEmojiChanged } from "../utils/nameEmojiMap";
import { saveSession, loadSession } from "../state/sessionStore";

/**
 * 色・階層定義
 */
const STATUS_COLORS: Record<string, string> = {
  idle: "#888888",
  active: "#00cc66",
  busy: "#ff9900",
  offline: "#333333"
};

const STATUS_Z_INDEX: Record<string, number> = {
  offline: 10,
  idle: 20,
  busy: 30,
  active: 40
};

/**
 * チーム表示フィルタ（null = 全表示）
 */
let activeTeamFilter: string | null = null;

/**
 * 整列用ラベルリスト
 */
const groupedLabels: Record<string, HTMLElement[]> = {
  idle: [],
  active: [],
  busy: [],
  offline: []
};

/**
 * 最終クリック履歴（uid記録）
 */
let lastClickedUid: string | null = null;

/**
 * 詳細パネルコンテナ（クリック時に表示）
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
 * ラベル一覧コンテナ
 */
const labelContainer = document.createElement("div");
labelContainer.id = "status-label-container";
labelContainer.style.position = "relative";
document.body.appendChild(labelContainer);

/**
 * スタイル適用処理
 */
function applyStatusStyle(label: HTMLElement, status: string): void {
  const bgColor = STATUS_COLORS[status] ?? "#444444";
  label.style.backgroundColor = bgColor;
  const zIndex = STATUS_Z_INDEX[status] ?? 0;
  label.style.zIndex = zIndex.toString();
}

/**
 * hoverスタイル
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
 * clickイベント（詳細表示＋履歴更新＋通知発火）
 */
function attachClickEvent(
  label: HTMLElement,
  uid: string,
  name: string,
  emoji: string,
  status: string
): void {
  label.addEventListener("click", () => {
    lastClickedUid = uid;

    detailPanel.innerText =
      `🧑 ${name} ${emoji ?? ""}\n📛 Status: ${status}\n🔑 UID: ${uid}`;
    detailPanel.style.display = "block";

    const rect = label.getBoundingClientRect();
    detailPanel.style.left = `${rect.right + 12}px`;
    detailPanel.style.top = `${rect.top}px`;

    emit("statusLabelClicked", { uid, name, emoji, status });
  });
}

/**
 * ラベル整列配置
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
 * 初期ラベル生成（未使用）
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
 * 更新＋生成時処理統合
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
 * 差分通知イベント受信
 */
on("playerBatchUpdate", (diffs: Record<string, any>) => {
  Object.entries(diffs).forEach(([uid, data]) => {
    const { name, emoji, status, team } = data;
    if (hasStatusChanged(uid, status) || hasNameOrEmojiChanged(uid, name, emoji)) {
      updateStatusLabel(uid, name, emoji, status, team);
    }
  });
});

// ✅ 表示対象チームの変更通知 → フィルタ更新
on("teamFilterChanged", (team: string | null) => {
  setTeamFilter(team);
});

// ✅ 指定ステータスのプレイヤーを強調表示
on("groupSelectStatus", (targetStatus: string) => {
  Object.entries(groupedLabels).forEach(([status, labels]) => {
    labels.forEach((label) => {
      label.style.outline =
        status === targetStatus ? "2px solid #00ffff" : "none";
    });
  });
});

// ✅ 初期復元処理
const session = loadSession();
if (session.teamFilter !== null) {
  setTeamFilter(session.teamFilter);
}
const lastUid = session.lastClickedUid;
if (lastUid) {
  const node = document.getElementById(`status-label-${lastUid}`);
  if (node) node.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ✅ 状態保存（クリック時に記録）
on("statusLabelClicked", ({ uid }) => {
  saveSession({ teamFilter: activeTeamFilter, lastClickedUid: uid });
});
