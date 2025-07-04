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