import constants from "../constants";

export default class SeleccionNivel extends Phaser.Scene {
  private imagenFondo: Phaser.GameObjects.TileSprite;
  private width: number;
  private height: number;

  constructor() {
    super(constants.ESCENAS.SELECCIONNIVEL);
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
  }

  create(): void {
    this.imagenFondo = this.add
      .tileSprite(
        0,
        0,
        this.cameras.main.width,
        this.cameras.main.height,
        constants.FONDOS.MENU
      )
      .setOrigin(0, 0)
      .setDepth(-1);

    const nivel1Txt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        80,
        100,
        constants.FUENTES.BITMAP,
        constants.ESCENAS.NIVEL1,
        20
      )
      .setInteractive();
    this.cambiarEscena(nivel1Txt, constants.ESCENAS.NIVEL1);

    const nivel2Txt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        80,
        200,
        constants.FUENTES.BITMAP,
        constants.ESCENAS.NIVEL2,
        20
      )
      .setInteractive();
    this.cambiarEscena(nivel2Txt, constants.ESCENAS.NIVEL2);

    const nivel3Txt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        80,
        300,
        constants.FUENTES.BITMAP,
        constants.ESCENAS.NIVEL3,
        20
      )
      .setInteractive();
    this.cambiarEscena(nivel3Txt, constants.ESCENAS.NIVEL3);

    const volverTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        80,
        450,
        constants.FUENTES.BITMAP,
        constants.CREDITOS.VOLVER,
        20
      )
      .setInteractive();
    this.cambiarEscena(volverTxt, constants.ESCENAS.MENU, false);
  }

  update(): void {
    //movimiento scroll del fondo
    this.imagenFondo.tilePositionY -= 0.4;
  }

  /**
   * Cuando se pulsa sobre el texto enlace se va hacia la escena indicada
   * @param texto
   * @param nuevaEscena
   */
  cambiarEscena(
    texto: Phaser.GameObjects.BitmapText,
    nuevaEscena: string,
    hud: boolean = true
  ): void {
    texto.on("pointerdown", () => {
      if (!hud) {
        this.scene.start(nuevaEscena);
      } else {
        this.cameras.main.fade(700, 0, 0, 0);
        this.cameras.main.on("camerafadeoutcomplete", () => {
          this.scene.start(nuevaEscena);
          this.scene.start(constants.ESCENAS.HUD, { nombreNivel: nuevaEscena });
          this.scene.bringToTop(constants.ESCENAS.HUD);
        });
      }
    });
  }
}
