import Phaser from 'phaser'
import MainScene from './scenes/MainScene'
import { initAuth } from './auth'

const launchGame = (userId: string) => {
  (window as any).userId = userId

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#202020',
    scene: [MainScene]
  }

  new Phaser.Game(config)
}

initAuth(launchGame)