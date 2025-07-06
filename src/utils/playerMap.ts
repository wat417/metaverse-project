// src/utils/playerMap.ts

export class PlayerVisualSet {
  constructor(
    public uid: string,
    public sprite: Phaser.GameObjects.Sprite,
    public label: Phaser.GameObjects.Text
  ) {}

  updatePosition(x: number, y: number) {
    this.sprite.setPosition(x, y);
    this.label.setPosition(x, y - 24);
  }

  destroy() {
    this.sprite.destroy();
    this.label.destroy();
  }
}

// 🔧 状態記録領域：前回同期データ保持
export const localPlayerCache: Record<string, any> = {};

// 🔍 差分検知関数：更新通知判断に使用
export function hasDiff(uid: string, newData: any): boolean {
  const prev = localPlayerCache[uid];
  if (!prev) return true;

  return (
    prev.name !== newData.name ||
    prev.emoji !== newData.emoji ||
    prev.status !== newData.status
  );
}