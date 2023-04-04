import Phaser from 'phaser';
 
export default class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private ground!: Phaser.Physics.Arcade.StaticGroup;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('game');
  }

  create(): void {
    // Add background
    this.add.image(0, 0, 'background').setOrigin(0, 0);

    // Create ground
    this.ground = this.physics.add.staticGroup();
    this.ground.create(0, this.scale.height - 16, 'ground').setScale(2).refreshBody();
    
    // Create player
    this.player = this.physics.add.sprite(100, this.scale.height - 100, 'player-animation');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.ground);

    // Set up animations
    this.player.anims.play('player-idle', true);

    // Set up controls
    this.input.keyboard.on('keydown-SPACE', this.jump, this);
    this.cursors = this.input.keyboard.createCursorKeys();

  }

  private jump(): void {
    if (this.player.body.touching.down) {
      this.player.setVelocityY(-300);
      this.player.anims.play('player-jump', true);
    }
  }

  update(): void {
    if (this.player.body.touching.down) {
      this.player.anims.play('player-idle', true);
    }
    if (this.cursors.left?.isDown) {
        this.player.setVelocityX(-200);
      } else if (this.cursors.right?.isDown) {
        this.player.setVelocityX(200);
      } else {
        this.player.setVelocityX(0);
      }
      
      if (this.cursors.space?.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-300);
      }
  }
}
