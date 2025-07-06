import { getDatabase, ref, get, child, set } from "firebase/database";
import { emit } from "../utils/eventBus";
import { getDiffs } from "../utils/playerStateTracker";

/**
 * 全プレイヤー状態の同期（初期化・再取得用）
 */
export async function syncAllPlayerStates() {
  const snapshot = await get(child(ref(getDatabase()), "players"));
  const fullState: Record<string, any> = {};
  snapshot.forEach((snap) => {
    fullState[snap.key!] = snap.val();
  });

  const diffs = getDiffs(fullState);

  if (Object.keys(diffs).length > 0) {
    emit("playerBatchUpdate", diffs);
  }
}

/**
 * 指定UIDのプレイヤー位置同期（MainScene仕様準拠）
 * RTDBへ x, y 座標を書き込む処理
 */
export async function syncPlayerPosition(uid: string, x: number, y: number) {
  const db = getDatabase();
  const positionRef = ref(db, `players/${uid}/position`);
  await set(positionRef, { x, y });
}