// src/utils/playerStateTracker.ts

export const playerStateCache: Record<string, { name: string; emoji: string; status: string }> = {};

export function getDiffs(newStateMap: Record<string, any>) {
  const diffs: Record<string, any> = {};

  for (const uid in newStateMap) {
    const newData = newStateMap[uid];
    const prevData = playerStateCache[uid];

    if (
      !prevData ||
      prevData.name !== newData.name ||
      prevData.emoji !== newData.emoji ||
      prevData.status !== newData.status
    ) {
      diffs[uid] = newData;
      playerStateCache[uid] = newData;
    }
  }

  return diffs;
}