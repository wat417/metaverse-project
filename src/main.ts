const launchGame = (userId: string) => {
  (window as any).userId = userId;

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#202020',
    scene: {
      preload() {
        this.load.image('avatar', 'https://cdn.example.com/avatar.png');
      },
      create() {
        this.add.image(400, 300, 'avatar').setScale(0.5);
      },
      update() {
        // 今後：動的な位置同期処理などを追加予定
      }
    }
  };

  new Phaser.Game(config);
};

initAuth(launchGame);