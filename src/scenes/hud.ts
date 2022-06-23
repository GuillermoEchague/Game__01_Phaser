import constants from "../constants";

export default class HUD extends Phaser.Scene {
  private vidasTxt: Phaser.GameObjects.Text;
  private puntuationTxt: Phaser.GameObjects.Text;
  private relojTxt: Phaser.GameObjects.Text;

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
    this.vidasTxt = this.add.text(
      20,
      20,
      constants.HUD.LIFE + this.registry.get(constants.REGISTRO.LIFE),
      { fontSize: "32px", color: "#FFFFFF" }
    );
    this.puntuationTxt = this.add.text(this.width - 50, 20, "000", {
      fontSize: "20px",
      color: "#FFFFFF",
    });
    this.relojTxt = this.add.text(this.width / 2, 20, "05:00", {
      fontSize: "20px",
      color: "#FFFFFF",
    });
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
