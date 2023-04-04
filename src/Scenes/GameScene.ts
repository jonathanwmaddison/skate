import Phaser from "phaser";

interface IPlayer {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  score: number;
}

interface IRail {
  sprite: Phaser.Physics.Arcade.Sprite;
}

export default class GameScene extends Phaser.Scene {
  private player!: IPlayer;
  private ground!: Phaser.Physics.Arcade.StaticGroup;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private obstacles!: Phaser.Physics.Arcade.Group;
  private rails!: Phaser.Physics.Arcade.StaticGroup;
  private scoreText!: Phaser.GameObjects.Text;

  constructor() {
    super("game");
  }

  create(): void {
    this.rails = this.physics.add.staticGroup(); // Initialize the rails group
    this.createPlayer();

    // Add the rails
    this.createRails(); // Call the createRails() method
    this.createScoreText();

    this.createBackground();

    this.createGround();

    this.createAnimations();

    this.createControls();

    this.createObstacles();

    this.setupPlayer();
  }
  private handlePlayerRailCollision(
    playerSprite: Phaser.GameObjects.GameObject,
    rail: Phaser.GameObjects.GameObject
  ): void {
    // Add score for grinding rails
    this.player.score += 100;
    this.scoreText.setText(`Score: ${this.player.score}`);

    // Optional: Add effects for grinding rails (e.g., particles, sound effects)
  }
  update(): void {
    this.updatePlayerMovement();
  }

  private createScoreText(): void {
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      backgroundColor: "#000",
    });
  }

  private createBackground(): void {
    this.add.image(0, 0, "background").setOrigin(0, 0);
  }

  private createGround(): void {
    this.ground = this.physics.add.staticGroup();
    this.ground
      .create(0, this.scale.height - 16, "ground")
      .setScale(2)
      .refreshBody();
  }

  private createPlayer(): void {
    this.player = {
      sprite: this.physics.add.sprite(
        100,
        this.scale.height - 100,
        "player-animation"
      ),
      score: 0,
    };
    this.player.sprite.setCollideWorldBounds(true);
    this.physics.add.collider(this.player.sprite, this.ground);
    this.physics.add.collider(
      this.player.sprite,
      this.rails,
      this.handlePlayerRailCollision,
      undefined,
      this
    );
  }

  private createAnimations(): void {
    this.player.sprite.anims.play("player-idle", true);
  }

  private createControls(): void {
    this.input.keyboard.on("keydown-SPACE", this.handleJump, this);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  private createObstacles(): void {
    this.obstacles = this.physics.add.group();
    this.time.addEvent({
      delay: 2000,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });
  }

  private spawnObstacle(): void {
    const x = this.scale.width;
    const y = this.scale.height - 48; // Adjust the Y position based on your ground height

    const obstacle = this.obstacles.create(x, y, "obstacle");
    obstacle.setVelocityX(-200); // Adjust the speed of the obstacle

    // Set up collision with the ground
    this.physics.add.collider(obstacle, this.ground);

    // Optional: Remove the obstacle from the scene when it's no longer visible
    obstacle.once("out", () => {
      this.obstacles.remove(obstacle, true, true);
    });
  }

  private setupPlayer(): void {
    // Create player sprite
    this.player.sprite = this.physics.add.sprite(
      100,
      this.scale.height - 100,
      "player-animation"
    );

    this.player.sprite.setCollideWorldBounds(true);

    // Set up player animations
    this.player.sprite.anims.play("player-idle", true);

    // Set up player controls
    this.input.keyboard.on("keydown-SPACE", this.handleJump, this);
    this.cursors = this.input.keyboard.createCursorKeys();

    // Set up player collisions
    this.physics.add.collider(this.player.sprite, this.ground);
    this.physics.add.collider(
      this.player.sprite,
      this.obstacles,
      this.handlePlayerObstacleCollision,
      undefined,
      this
    );
  }

  private handlePlayerObstacleCollision(
    player: Phaser.GameObjects.GameObject,
    obstacle: Phaser.GameObjects.GameObject
  ): void {
    if (this.obstacles?.contains(obstacle)) {
      // Handle collision with obstacles (e.g., end the game or reduce player health)
      console.log("Player hit an obstacle");

      // Disable player movement
      this.input.keyboard.enabled = false;
      this.player?.sprite.setVelocityX(0);
      // this.player?.sprite.anims.play("player-fall", true);

      // Wait for 1 second before restarting the game
      this.time.delayedCall(1000, () => {
        this.scene.restart();
      });
    }
  }

  private createRails(): void {
    // Create the rails
    const railsData = [
      { x: 200, y: 300 },
      { x: 500, y: 200 },
      // Add more rails as needed
    ];

    railsData.forEach((railData) => {
      const rail = this.rails.create(
        railData.x,
        railData.y,
        "rail"
      ) as Phaser.Physics.Arcade.Sprite;

      rail.setOrigin(0, 0.5);
      rail.body.setSize(rail.width, rail.height * 0.5);
      rail.body.setOffset(0, rail.height * 0.5);

      this.physics.add.overlap(
        this.player.sprite,
        rail,
        this.handlePlayerRailCollision,
        undefined,
        this
      );
    });
  }
  private handleJump(): void {
    if (this.player.sprite?.body.touching.down) {
      this.player.sprite.setVelocityY(-300);
      this.player.sprite.anims.play("player-jump", true);
    }
  }
  private updatePlayerMovement(): void {
    if (this.player.sprite?.body.touching.down) {
      this.player.sprite.anims.play("player-idle", true);
    }
    if (this.cursors.left?.isDown) {
      this.player.sprite?.setVelocityX(-200);
    } else if (this.cursors.right?.isDown) {
      this.player.sprite?.setVelocityX(200);
    } else {
      this.player.sprite?.setVelocityX(0);
    }
    if (this.cursors.space?.isDown && this.player.sprite?.body.touching.down) {
      this.handleJump();
    }
  }
}
