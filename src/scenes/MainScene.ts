import Phaser from 'phaser';
import { syncPlayerPosition } from '../firebase/sync';
import { PlayerData } from '../types/player';
import { listenToPlayerRemovals } from '../firebase/remove';
import { onChildAdded, ref, getDatabase } from 'firebase/database';
import { PlayerVisualSet } from '../utils/playerMap';

const LABEL_STYLE = {
  fontSize: '14px',
  color: '#ffffff',
  backgroundColor: '#000000'
};

export default class MainScene extends Phaser.Scene {
  private avatar!: Phaser.GameObjects.Image;
  private uid!: string;
  private otherPlayers: Map<string, Phaser.GameObjects.Sprite> = new Map();
  private playerLabels: Map<string, Phaser.GameObjects.Text> = new Map();
  private playerVisuals: Map<string, PlayerVisualSet> = new Map();

  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.image(
      'avatar',
      'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png'
    );
  }

  create() {
    // 自プレイヤー描画
    this.avatar = this.add.image(400, 300, 'avatar').setScale(0.5);
    this.uid = (window as any).userId;

    // Firebase上の他プレイヤー参加監視
    const playersRef = ref(getDatabase(), 'players');
    onChildAdded(playersRef, (snapshot) => this.handleNewPlayer(snapshot));

    // 他プレイヤー退出監視
    listenToPlayerRemovals((uid) => {
      this.otherPlayers.get(uid)?.destroy();
      this.otherPlayers.delete(uid);

      this.playerLabels.get(uid)?.destroy();
      this.playerLabels.delete(uid);

      this.playerVisuals.get(uid)?.destroy();
      this.playerVisuals.delete(uid);
    });
  }

  update() {
    // 自プレイヤーの位置を同期
    const { x, y } = this.avatar;
    syncPlayerPosition(this.uid, x, y);

    // 他プレイヤーのラベル位置を更新
    this.otherPlayers.forEach((sprite, uid) => {
      const label = this.playerLabels.get(uid);
      if (label) {
        label.setPosition(sprite.x, sprite.y - 24);
      }
    });

    // VisualSet による補完更新
    this.playerVisuals.forEach((v) => v.updatePosition(v.sprite.x, v.sprite.y));
  }

  private handleNewPlayer(snapshot: any) {
    const playerData = snapshot.val() as PlayerData;
    const uid = snapshot.key!;
    if (uid === this.uid || this.otherPlayers.has(uid)) return;

    const { x, y, name, emoji } = playerData;

    // Sprite描画
    const sprite = this.add.sprite(x, y, 'avatar').setScale(0.5);
    this.otherPlayers.set(uid, sprite);

    // ラベル描画
    const labelText = `${name ?? 'Unknown'} ${emoji ?? ''}`;
    const nameLabel = this.add.text(x, y - 24, labelText, LABEL_STYLE).setOrigin(0.5);
    this.playerLabels.set(uid, nameLabel);

    // VisualSet作成・登録
    const visuals = new PlayerVisualSet(uid, sprite, nameLabel);
    this.playerVisuals.set(uid, visuals);
  }
}