/**
 * 差分検知ユーティリティ
 * 前回と今回の Map<string, T> を比較し、
 * 追加 / 削除 / 内容変更されたキーを抽出する
 */

export function generateDiff<T>(
  prev: Map<string, T>,
  current: Map<string, T>
): {
  added: string[];
  removed: string[];
  updated: string[];
} {
  const added: string[] = [];
  const removed: string[] = [];
  const updated: string[] = [];

  // 追加検出
  for (const key of current.keys()) {
    if (!prev.has(key)) {
      added.push(key);
    }
  }

  // 削除検出
  for (const key of prev.keys()) {
    if (!current.has(key)) {
      removed.push(key);
    }
  }

  // 内容変更検出（JSON比較）
  for (const key of current.keys()) {
    if (
      prev.has(key) &&
      JSON.stringify(current.get(key)) !== JSON.stringify(prev.get(key))
    ) {
      updated.push(key);
    }
  }

  return { added, removed, updated };
}