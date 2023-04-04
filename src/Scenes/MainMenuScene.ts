import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
  private startButton!: Phaser.GameObjects.Text;

  constructor() {
    super('mainMenu');
  }

  create(): void {
    // Add background and logo
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    const logo = this.add.image(this.scale.width / 2, this.scale.height / 2 - 100, 'logo').setScale(0.5);

    // Create a start button
    this.startButton = this.add
      .text(this.scale.width / 2, this.scale.height / 2, 'Start', {
        fontSize: '32px',
        color: '#FFF',
      })
      .setOrigin(0.5)
      .setInteractive();

    // Add a pointer down event listener to start the game
    this.startButton.on('pointerdown', () => {
      this.scene.start('game');
    });
  }
}
