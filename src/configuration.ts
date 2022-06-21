import Nivel1 from "./scenes/nivel1";
import Load from "./scenes/load";
import Menu from "./scenes/menu";
import HUD from "./scenes/hud";

export const Configuration = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 800,
  height: 600,
  scene: [Load, Menu, Nivel1, HUD],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: true,
    },
  },
};
