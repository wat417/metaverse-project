import Phaser from 'phaser';
import { syncPlayerPosition } from '../firebase/sync';
import { PlayerData } from '../types/player';
import { listenToPlayerRemovals } from '../firebase/remove';
import { getDatabase, ref, onChildAdded } from '@firebase/database';
import { initializeApp } from '@firebase/app';
import { PlayerVisualSet } from '../utils/playerMap';
import { selectTeam } from "../ui/teamSelector";
import { createGroupControl } from "../ui/groupControl";
import { saveSession, loadSession } from "../state/sessionStore";

const LABEL_STYLE = {
  fontSize: '14px',
  color: '#ffffff',
  backgroundColor: '#000000'
};

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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
    this.avatar = this.add.image(400, 300, 'avatar').setScale(0.5);
    this.uid = (window as any).userId;

    const playersRef = ref(database, 'players');
    onChildAdded(playersRef, (snapshot) => this.handleNewPlayer(snapshot));

    selectTeam("Alpha");
    createGroupControl({ mode: "default" });

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
    const { x, y } = this.avatar;
    syncPlayerPosition(this.uid, x, y);
    this.playerVisuals.forEach((v) => v.updatePosition(v.sprite.x, v.sprite.y));
  }

  private handleNewPlayer(snapshot: any) {
    const playerData = snapshot.val() as PlayerData;
    const uid = snapshot.key!;
    if (uid === this.uid || this.otherPlayers.has(uid)) return;

    const { x, y, name, emoji } = playerData;
    const sprite = this.add.sprite(x, y, 'avatar').setScale(0.5);
    this.otherPlayers.set(uid, sprite);
    const dummyLabel = this.add.text(x, y - 24, '', LABEL_STYLE).setOrigin(0.5);
    const visuals = new PlayerVisualSet(uid, sprite, dummyLabel);
    this.playerVisuals.set(uid, visuals);
  }
}