// src/scenes/PreloadScene.ts
import backgroundImg from '../assets/images/background.png';
import groundImg from '../assets/images/ground.png';
import playerAnimationImg from '../assets/images/player-animation.png';
import logoImg from '../assets/images/logo.png';
import obstacleImg from '../assets/images/obstacle.png';
import playerImg from '../assets/images/player.png'

import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('preload');
  }

  preload(): void {
    // Display the logo
    const logo = this.add.image(this.scale.width / 2, this.scale.height / 2 - 100, 'logo');
    logo.setScale(0.5);

    // Create a loading bar to visualize asset loading progress
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(this.scale.width / 2 - 160, this.scale.height / 2, 320, 50);

    // Update the loading bar as assets are loaded
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(this.scale.width / 2 - 150, this.scale.height / 2 + 10, 300 * value, 30);
    });

    // Remove the loading bar when all assets are loaded
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
    });

    // Load game assets here (images, audio, etc.)
    this.load.image('background', backgroundImg);
    this.load.image('player', playerImg);
    this.load.image('obstacle', obstacleImg);
    this.load.image('ground', groundImg);
    this.load.spritesheet('player-animation', playerAnimationImg, {
      frameWidth: 32,
      frameHeight: 48,
    });

    // Load audio files if needed
    this.load.audio('jump', 'assets/audio/jump.mp3');
    this.load.audio('score', 'assets/audio/score.mp3');
    this.load.audio('gameover', 'assets/audio/gameover.mp3');
  }

  create(): void {
    // Set up animations, if needed
    this.setupAnimations();

    // Move on to the next scene, typically MainMenuScene
    this.scene.start('mainMenu');
  }

  private setupAnimations(): void {
    this.anims.create({
      key: 'player-idle',
      frames: this.anims.generateFrameNumbers('player-animation', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1, // Loop the animation
    });

    this.anims.create({
      key: 'player-jump',
      frames: this.anims.generateFrameNumbers('player-animation', { start: 4, end: 6 }),
      frameRate: 10,
      repeat: 0, // Play the animation once
    });

    // Add more animations if needed
  }
}