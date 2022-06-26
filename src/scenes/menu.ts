import constants from "../constants";

export default class Menu extends Phaser.Scene {
  private width: number;
  private height: number;
  private bandasonoraMenu: Phaser.Sound.BaseSound;
  private imagenFondo: Phaser.GameObjects.TileSprite;

  constructor() {
    super(constants.ESCENAS.MENU);
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    this.sound.stopAll();
  }

  preload(): void {
    if (
      this.registry.get(constants.REGISTRO.MUSICA) == constants.AJUSTES.SONIDOON
    ) {
      //Carga sonidos
      this.bandasonoraMenu = this.sound.add(constants.SONIDOS.BANDASONORA + 0, {
        loop: true,
      });
      this.bandasonoraMenu.play();
    }
  }

  create() {
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

    const logo = this.add
      .image(
        this.width / 2,
        this.height / 2,
        constants.JUGADOR.ID,
        constants.JUGADOR.ANIMATION.SALTO
      )
      .setScale(10);

    const tituloTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(
      250,
      50,
      constants.FUENTES.BITMAP,
      constants.MENU.TITULO,
      20
    );

    const jugarTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        50,
        this.height - 100,
        constants.FUENTES.BITMAP,
        constants.MENU.PLAY,
        20
      )
      .setInteractive();
    this.cambiarEscena(jugarTxt, constants.ESCENAS.SELECCIONNIVEL);

    const ajustesTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        300,
        500,
        constants.FUENTES.BITMAP,
        constants.MENU.AJUSTES,
        20
      )
      .setInteractive();
    this.cambiarEscena(ajustesTxt, constants.ESCENAS.AJUSTES, false);

    const creditosTxt: Phaser.GameObjects.BitmapText = this.add
      .bitmapText(
        this.width - 200,
        500,
        constants.FUENTES.BITMAP,
        constants.MENU.CREDITOS,
        20
      )
      .setInteractive();
    this.cambiarEscena(creditosTxt, constants.ESCENAS.CREDITOS, false);
  }

  /**
   * Cuando se pulse sobre el texto nos va a lleva a la escena indicada
   * @param jugarTxt
   * @param escena
   */
  cambiarEscena(
    texto: Phaser.GameObjects.BitmapText,
    escena: string,
    hud: boolean = true
  ) {
    texto.on("pointerdown", () => {
      this.scene.start(escena);
    });
  }

  update(): void {
    //movimiento scroll del fondo
    this.imagenFondo.tilePositionY -= 0.4;
  }
}
