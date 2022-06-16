import constants from "../constants";

export default class Load extends Phaser.Scene {
  // Barra de carga
  private loadBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;
  constructor() {
    super(constants.ESCENAS.CARGA);
  }

  preload(): void {
    this.cameras.main.setBackgroundColor(0x000000);
    this.createBars();

    // Listener mientras se cargan los assets
    this.load.on(
      "progress",
      function (value: number) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0x88e453, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16
        );
      },
      this
    );

    // Listener cuando se hagan todos los assets
    this.load.on(
      "complete",
      () => {
        const fuenteJSON = this.cache.json.get(constants.FUENTES.JSON);
        this.cache.bitmapFont.add(
          constants.FUENTES.BITMAP,
          Phaser.GameObjects.RetroFont.Parse(this, fuenteJSON)
        );

        //carga MENU
        this.scene.start(constants.ESCENAS.MENU);
      },
      this
    );
    // Carga los assets del juego
    this.load.image("logo1", "assets/phaser3-logo.png");

    //Mapas
    this.load.tilemapTiledJSON(
      constants.MAPAS.NIVEL1.TILEMAPJSON,
      "assets/level/nivel1.json"
    );
    this.load.image(constants.MAPAS.TILESET, "assets/level/levelstyleset.png");

    //Fondo
    this.load.image(
      constants.FONDOS.NIVEL1,
      "assets/imagenes/fondos/Brown.png"
    );

    //Fuentes                
    this.load.json(constants.FUENTES.JSON, 'assets/fuentes/fuente.json');
    this.load.image(constants.FUENTES.IMAGEN, 'assets/fuentes/imagenFuente.png');

  }

  /**
   * Metodo que crea la barra d eProgreso
   */

  private createBars(): void {
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(0xffffff, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
}
