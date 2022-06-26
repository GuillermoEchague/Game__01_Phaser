import constants from "../constants";

export default class HUD extends Phaser.Scene {
  private vidasTxt: Phaser.GameObjects.BitmapText;
  private puntuacionTxt: Phaser.GameObjects.BitmapText;
  private relojTxt: Phaser.GameObjects.BitmapText;

  private width: number;
  private height: number;

  private nombreNivel: string;

  constructor() {
    super("HUD");
  }

  init(data) {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.nombreNivel = data.nombreNivel;
  }

  create(): void {
    const nivel: Phaser.Scene = this.scene.get(this.nombreNivel);
    nivel.events.on(constants.EVENTOS.LIFES, this.actualizaVidas, this);
    nivel.events.on(
      constants.EVENTOS.PUNTUATION,
      this.actualizaPuntuacion,
      this
    );
    nivel.events.on(constants.EVENTOS.RELOJ, this.actualizaReloj, this);

    this.vidasTxt = this.add.bitmapText(
      20,
      20,
      constants.FUENTES.BITMAP,
      constants.HUD.LIFE + this.registry.get(constants.REGISTRO.LIFE),
      20
    );

    this.puntuacionTxt = this.add.bitmapText(
      this.width - 50,
      20,
      constants.FUENTES.BITMAP,
      "000",
      20
    );

    this.relojTxt = this.add.bitmapText(
      this.width / 2,
      20,
      constants.FUENTES.BITMAP,
      "05:00",
      20
    );
  }

  private actualizaVidas(): void {
    this.vidasTxt.text =
    constants.HUD.LIFE + this.registry.get(constants.REGISTRO.LIFE);
  }

  private actualizaPuntuacion(): void {
    this.puntuacionTxt.text = Phaser.Utils.String.Pad(
      this.registry.get("puntuacion"),
      3,
      "0",
      1
    );
  }

  private actualizaReloj(): void {
    this.relojTxt.text = this.registry.get(constants.REGISTRO.RELOJ);
  }
}
