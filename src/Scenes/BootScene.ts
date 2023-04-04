// src/scenes/BootScene.ts
import logoImg from "../assets/images/logo.png";

import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  preload(): void {
    // Load assets needed for the PreloadScene, like the loading bar or a logo
    this.load.image("logo", logoImg);
  }

  create(): void {
    // Set some game configuration settings
    this.configureGame();

    // Move on to the next scene, typically PreloadScene
    this.scene.start("preload");
  }

  private configureGame(): void {
    // Set game scale options for responsive behavior
    this.scale.scaleMode = Phaser.Scale.FIT;
    this.scale.setGameSize(800, 600);

    // Set a default background color
    this.cameras.main.setBackgroundColor(0x000000);
  }
}
