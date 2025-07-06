/**
 * RTDB構造をラベル描画用途の Map に変換する関数
 * UID → 表示名＋絵文字 のマッピングを生成する
 */

export function nameEmojiMapper(
  raw: Record<string, { displayName: string; emoji?: string }>
): Map<string, string> {
  const result = new Map<string, string>();
  for (const [uid, { displayName, emoji }] of Object.entries(raw)) {
    result.set(uid, `${displayName}${emoji ?? ''}`);
  }
  return result;
}