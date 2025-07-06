// src/state/sessionStore.ts

/**
 * セッション状態保存・復元構造（ローカルストレージ利用）
 */
const SESSION_KEY = "status-display-session";

interface SessionData {
  teamFilter: string | null;
  lastClickedUid: string | null;
}

/**
 * 保存
 */
export function saveSession(data: SessionData): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

/**
 * 復元
 */
export function loadSession(): SessionData {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return { teamFilter: null, lastClickedUid: null };

  try {
    const parsed = JSON.parse(raw);
    return {
      teamFilter: parsed.teamFilter ?? null,
      lastClickedUid: parsed.lastClickedUid ?? null
    };
  } catch {
    return { teamFilter: null, lastClickedUid: null };
  }
}