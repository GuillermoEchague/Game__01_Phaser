import constants from "../constants";

export default class Creditos extends Phaser.Scene {
  private imagenFondo: Phaser.GameObjects.TileSprite;
  private width: number;
  private height: number;

  constructor() {
    super(constants.ESCENAS.CREDITOS);
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

    const volverTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        80,
        this.height - 100,
        constants.FUENTES.BITMAP,
        constants.CREDITOS.VOLVER,
        16
      )
      .setInteractive();

    volverTxt.on("pointerdown", () => {
      this.scene.start(constants.ESCENAS.MENU);
    });

    const realizadoTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        70,
        250,
        constants.FUENTES.BITMAP,
        constants.CREDITOS.CREADOPOR,
        16
      )
      .setInteractive();

    const assetsTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        70,
        350,
        constants.FUENTES.BITMAP,
        constants.CREDITOS.ASSETS,
        16
      )
      .setInteractive();

    const logo: Phaser.GameObjects.Image = this.add.image(
      350,
      100,
      constants.CREDITOS.GAMEDEV
    );
  }

  update(): void {
    //movimiento scroll del fondo
    this.imagenFondo.tilePositionY -= 0.4;
  }
}
