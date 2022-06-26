import constants from "../constants";

export default class Ajustes extends Phaser.Scene {
  private imagenFondo: Phaser.GameObjects.TileSprite;
  private width: number;
  private height: number;

  constructor() {
    super(constants.ESCENAS.AJUSTES);
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
        constants.AJUSTES.VOLVER,
        16
      )
      .setInteractive();

    volverTxt.on("pointerdown", () => {
      this.scene.start(constants.ESCENAS.MENU);
    });

    //Sonidos y Efectos
    const musicatxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        80,
        80,
        constants.FUENTES.BITMAP,
        constants.AJUSTES.MUSICA,
        16
      )
      .setInteractive();
    const efectostxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        200,
        80,
        constants.FUENTES.BITMAP,
        constants.AJUSTES.EFECTOS,
        16
      )
      .setInteractive();

    let musicaImagen: string =
      this.registry.get(constants.REGISTRO.MUSICA) == constants.AJUSTES.SONIDOON
        ? constants.AJUSTES.SONIDOON
        : constants.AJUSTES.SONIDOOFF;

    let efectosImagen: string =
      this.registry.get(constants.REGISTRO.EFECTOS) ==
      constants.AJUSTES.SONIDOON
        ? constants.AJUSTES.SONIDOON
        : constants.AJUSTES.SONIDOOFF;

    let musicaOnOff: Phaser.GameObjects.Image = this.add
      .image(130, 120, musicaImagen)
      .setScale(0.5)
      .setInteractive();

    let efectosOnOff: Phaser.GameObjects.Image = this.add
      .image(250, 120, efectosImagen)
      .setScale(0.5)
      .setInteractive();

    musicaOnOff.on("pointerdown", () => {
      let valor =
        this.registry.get(constants.REGISTRO.MUSICA) ==
        constants.AJUSTES.SONIDOON
          ? constants.AJUSTES.SONIDOOFF
          : constants.AJUSTES.SONIDOON;
      this.registry.set(constants.REGISTRO.MUSICA, valor);
      musicaOnOff.setTexture(valor);
    });

    efectosOnOff.on("pointerdown", () => {
      let valor =
        this.registry.get(constants.REGISTRO.EFECTOS) ==
        constants.AJUSTES.SONIDOON
          ? constants.AJUSTES.SONIDOOFF
          : constants.AJUSTES.SONIDOON;
      this.registry.set(constants.REGISTRO.EFECTOS, valor);
      efectosOnOff.setTexture(valor);
    });
  }

  update(): void {
    //movimiento scroll del fondo
    this.imagenFondo.tilePositionY -= 0.4;
  }
}
