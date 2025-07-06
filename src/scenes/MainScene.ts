import Phaser from 'phaser';
import { syncPlayerPosition } from '../firebase/sync';
import { PlayerData } from '../types/player';
import { listenToPlayerRemovals } from '../firebase/remove';
import { onChildAdded, ref, getDatabase } from 'firebase/database';
import { PlayerVisualSet } from '../utils/playerMap';
import { createTeamSelector } from "../ui/teamSelector";
import  { createGroupControl } from "../ui/groupControl";
import { saveSession, loadSession } from "../state/sessionStore";

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

    // ✅ 状態ラベル生成処理は statusDisplay.ts 側に完全移譲済
    // ※ DOM追加や createStatusLabel() 呼び出しは不要

    // Firebase上の他プレイヤー参加監視
    const playersRef = ref(getDatabase(), 'players');
    onChildAdded(playersRef, (snapshot) => this.handleNewPlayer(snapshot));

    // ✅ チーム選択 UI の生成
    createTeamSelector(["Alpha", "Bravo", "Charlie"]);

    // ✅ グループ操作UIの生成
    createGroupControl();

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

    // ❌ 表示更新はイベント駆動に移行済 → ラベル手動位置更新を除外可能
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

    // ✅ 表示ラベルは statusDisplay.ts による動的DOM反映へ移行
    //  ここでは生成・更新不要（責務分離済）

    // VisualSet作成・登録
    const dummyLabel = this.add.text(x, y - 24, '', LABEL_STYLE).setOrigin(0.5);
    const visuals = new PlayerVisualSet(uid, sprite, dummyLabel);
    this.playerVisuals.set(uid, visuals);
  }
}