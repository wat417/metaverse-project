// src/utils/nameEmojiMap.ts

export const nameEmojiCache: Record<string, { name: string; emoji: string }> = {};

export function hasNameOrEmojiChanged(uid: string, name: string, emoji: string): boolean {
  const prev = nameEmojiCache[uid];
  if (!prev || prev.name !== name || prev.emoji !== emoji) {
    nameEmojiCache[uid] = { name, emoji };
    return true;
  }
  return false;
}