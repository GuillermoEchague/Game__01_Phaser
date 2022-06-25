import constants from "../constants";

export default class Menu extends Phaser.Scene {
  private width: number;
  private height: number;
  private bandasonoraMenu: Phaser.Sound.BaseSound;

  constructor() {
    super(constants.ESCENAS.MENU);
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.sound.stopAll();
  }

  preload(): void {
    //Carga sonidos
    this.bandasonoraMenu = this.sound.add(constants.SONIDOS.BANDASONORA + 0, {
      loop: true,
    });
    this.bandasonoraMenu.play();
  }
  create() {
    const logo = this.add.image(this.width / 2, 70, "logo1");
    const playTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        50,
        this.height / 2,
        constants.FUENTES.BITMAP,
        constants.MENU.PLAY,
        25
      )
      .setInteractive();

    this.changeScene(playTxt, constants.ESCENAS.NIVEL1);
  }

  /**
   *  Cuando se pulse sobre el texto nos va a llevar a la escena indicada
   * @param playTxt
   * @param scene
   */
  changeScene(playTxt: Phaser.GameObjects.BitmapText, scene: string) {
    playTxt.on("pointerdown", () => {
      this.cameras.main.fade(700, 0, 0, 0);
      this.cameras.main.on("camerafadeoutcomplete", () => {
        this.sound.stopAll();
        this.scene.start(scene);
        this.scene.start(constants.ESCENAS.HUD);
        this.scene.bringToTop(constants.ESCENAS.HUD);
      });
    });
  }
}
