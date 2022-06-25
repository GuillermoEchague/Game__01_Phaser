import constants from "../constants";

export default class HUD extends Phaser.Scene {
  private vidasTxt: Phaser.GameObjects.BitmapText;
  private puntuationTxt: Phaser.GameObjects.BitmapText;
  private relojTxt: Phaser.GameObjects.BitmapText;

  private width: number;
  private height: number;

  constructor() {
    super(constants.ESCENAS.HUD);
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
  }

  create(): void {
    const nivel1: Phaser.Scene = this.scene.get(constants.ESCENAS.NIVEL1);
    nivel1.events.on(constants.EVENTOS.LIFES, this.actualizaVidas, this);
    nivel1.events.on(
      constants.EVENTOS.PUNTUATION,
      this.actualizaPuntuation,
      this
    );
    nivel1.events.on(constants.EVENTOS.RELOJ, this.actualizaReloj, this);
    this.vidasTxt = this.add.bitmapText(
      20,
      20,
      constants.FUENTES.BITMAP,
      constants.HUD.LIFE + this.registry.get(constants.REGISTRO.LIFE),
      20
    );
    this.puntuationTxt = this.add.bitmapText(
      this.width - 70,
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
    this.vidasTxt.text = constants.HUD.LIFE + this.registry.get("vidas");
  }

  private actualizaPuntuation(): void {
    this.puntuationTxt.text = Phaser.Utils.String.Pad(
      this.registry.get(constants.REGISTRO.PUNTUATION),
      3,
      "0",
      1
    );
  }
  private actualizaReloj(): void {
    this.relojTxt.text = this.registry.get(constants.REGISTRO.RELOJ);
  }
}
