import Nivel1 from "./scenes/nivel1";
import Nivel2 from "./scenes/nivel2";
import Nivel3 from "./scenes/nivel3";
import Load from "./scenes/load";
import Menu from "./scenes/menu";
import HUD from "./scenes/hud";
import Ajustes from './scenes/ajustes';
import Creditos from './scenes/creditos';
import SeleccionNivel from './scenes/seleccionnivel';
import FinNivel from './scenes/finnivel';

export const Configuration = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 800,
  height: 600,
  scene: [Load, Menu, Nivel1, Nivel2, Nivel3, HUD, Ajustes, Creditos, SeleccionNivel, FinNivel],
  pixelArt: true,
  audio:{
    disableWebAudio: true
}, 
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: true,
    },
  },
};
