import constants from "../constants";

export default class Nivel1 extends Phaser.Scene {
  private width: number;
  private height: number;
  private life: number;
  private puntuation: number;

  private mapaNivel: Phaser.Tilemaps.Tilemap;
  private conjuntoPatrones: Phaser.Tilemaps.Tileset;
  private capaMapNivel: Phaser.Tilemaps.TilemapLayer;
  private imagenFondo: Phaser.GameObjects.TileSprite;

  constructor() {
    super(constants.ESCENAS.NIVEL1);
  }

  preload() {}
  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.life = 3;
    this.puntuation = 0;
    //Con el sistema de registro global de variables
    //inicializamos las del juego
    this.registry.set(constants.REGISTRO.LIFE, this.life);
    this.registry.set(constants.REGISTRO.PUNTUATION, this.puntuation);
  }

  create() {
    const logo = this.add.image(400, 70, "logo1");
    const playTxt: Phaser.GameObjects.Text = this.add
      .text(50, this.height / 2, constants.ESCENAS.NIVEL1, {
        fontSize: "32px",
        color: "#FFFFFF",
      })
      .setInteractive();

    const vidasTxt: Phaser.GameObjects.Text = this.add
      .text(this.width / 2, this.height / 2, "VIDAS -", {
        fontSize: "32px",
        color: "#FFFFFF",
      })
      .setInteractive();

    vidasTxt.on("pointerdown", () => {
      this.life--;
      this.registry.set(constants.REGISTRO.LIFE, this.life);
      this.events.emit(constants.EVENTOS.LIFES);
    });

    const puntuationTxt: Phaser.GameObjects.Text = this.add
      .text(
        this.width / 2,
        this.height / 2 + 100,
        constants.REGISTRO.PUNTUATION,
        { fontSize: "32px", color: "#FFFFFF" }
      )
      .setInteractive();

    puntuationTxt.on("pointerdown", () => {
      this.puntuation++;
      this.registry.set(constants.REGISTRO.PUNTUATION, this.puntuation);
      this.events.emit(constants.EVENTOS.PUNTUATION);
    });

    /* Cargar Tilemap */
    this.mapaNivel = this.make.tilemap({
      key: constants.MAPAS.NIVEL1.TILEMAPJSON,
      tileWidth: 16,
      tileHeight: 16,
    });

    this.conjuntoPatrones = this.mapaNivel.addTilesetImage(
      constants.MAPAS.TILESET
    );

    this.capaMapNivel = this.mapaNivel.createLayer(
      constants.MAPAS.NIVEL1.CAPAPLATAFORMAS,
      this.conjuntoPatrones
    );

    //Fondo
    this.imagenFondo = this.add
      .tileSprite(
        0,
        0,
        this.mapaNivel.widthInPixels,
        this.mapaNivel.heightInPixels,
        constants.FONDOS.NIVEL1
      )
      .setOrigin(0, 0)
      .setDepth(-1);
  }

  /**
   *  Cuando se pulse sobre el texto nos va a llevar a la escena indicada
   * @param playTxt
   * @param scene
   */
  changeScene(playTxt: Phaser.GameObjects.Text, scene: string) {
    playTxt.on("pointerdown", () => {
      this.scene.start(scene);
    });
  }

  update(): void {
    //mover el fondo
    this.imagenFondo.tilePositionY -= 0.2;

    if (parseInt(this.registry.get(constants.REGISTRO.LIFE)) === 0) {
      this.scene.stop(constants.ESCENAS.NIVEL1);
      this.scene.stop(constants.ESCENAS.HUD);
      this.scene.start(constants.ESCENAS.MENU);
    }
  }
}
