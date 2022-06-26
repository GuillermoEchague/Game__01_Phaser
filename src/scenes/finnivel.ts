import constants from "../constants";

export default class FinNivel extends Phaser.Scene {
  private imagenFondo: Phaser.GameObjects.TileSprite;
  private nombreFondoNivel: string;
  private nombreNivel: string;
  private esWin: boolean;
  private puntuacion: number;

  constructor() {
    super(constants.ESCENAS.FINNIVEL);
  }

  init(data: any): void {
    this.esWin = data.esWin;
    this.nombreNivel = data.nombreNivel;
    this.nombreFondoNivel = data.nombreFondoNivel;
    this.puntuacion = data.puntuacion;
  }

  create(): void {
    this.imagenFondo = this.add
      .tileSprite(
        0,
        0,
        this.cameras.main.width,
        this.cameras.main.height,
        this.nombreFondoNivel
      )
      .setOrigin(0, 0)
      .setDepth(-1);

    //Si el nivel es WIN
    if (this.esWin) {
      let puntosPad: string = Phaser.Utils.String.Pad(
        this.puntuacion,
        4,
        "0",
        1
      );
      const winTxt: Phaser.GameObjects.BitmapText = this.add
        .bitmapText(
          100,
          100,
          constants.FUENTES.BITMAP,
          constants.FINNIVEL.WIN,
          40
        )
        .setTint(0x8338ec);
      const puntosTxt: Phaser.GameObjects.BitmapText = this.add
        .bitmapText(
          100,
          200,
          constants.FUENTES.BITMAP,
          constants.FINNIVEL.PUNTOS + puntosPad,
          20
        )
        .setTint(0x8338ec);
    } else {
      const gameOverTxt: Phaser.GameObjects.BitmapText = this.add
        .bitmapText(
          100,
          100,
          constants.FUENTES.BITMAP,
          constants.FINNIVEL.GAMEOVER,
          40
        )
        .setTint(0xfb5607);
    }

    const volverTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        80,
        450,
        constants.FUENTES.BITMAP,
        constants.CREDITOS.VOLVER,
        20
      )
      .setInteractive();

    volverTxt.on("pointerdown", () => {
      this.cameras.main.fade(700, 0, 0, 0);
      this.cameras.main.on("camerafadeoutcomplete", () => {
        this.scene.start(constants.ESCENAS.MENU);
      });
    });
  }

  update(): void {
    //movimiento scroll del fondo
    this.imagenFondo.tilePositionY -= 0.4;
  }
}
