import Phaser from 'phaser'
import { syncPlayerPosition } from '../firebase/sync'

export default class MainScene extends Phaser.Scene {
  private avatar!: Phaser.GameObjects.Image
  private uid!: string

  constructor() {
    super('MainScene')
  }

  preload() {
    this.load.image('avatar', 'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png')
  }

  create() {
    this.avatar = this.add.image(400, 300, 'avatar').setScale(0.5)
    this.uid = (window as any).userId
  }

  update() {
    const { x, y } = this.avatar
    syncPlayerPosition(this.uid, x, y)
  }
}