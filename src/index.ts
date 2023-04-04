import Phaser from 'phaser'
import BootScene from './Scenes/BootScene';
import PreloadScene from './Scenes/PreloadScene';
import MainMenuScene from './Scenes/MainMenuScene';
import GameScene from './Scenes/GameScene';
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: [BootScene, PreloadScene, MainMenuScene, GameScene],
};

const game = new Phaser.Game(config);
