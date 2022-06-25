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
    //---------------------------------------------
    this.load.path = "assets/";
    // Carga los assets del juego
    this.load.image("logo1", "phaser3-logo.png");

    //Mapas
    this.load.tilemapTiledJSON(
      constants.MAPAS.NIVEL1.TILEMAPJSON,
      "level/nivel1.json"
    );
    this.load.image(constants.MAPAS.TILESET, "level/levelstyleset.png");

    //Fondo
    this.load.image(constants.FONDOS.NIVEL1, "imagenes/fondos/Brown.png");

    //Fuentes
    this.load.json(constants.FUENTES.JSON, "fuentes/fuente.json");
    this.load.image(constants.FUENTES.IMAGEN, "fuentes/imagenFuente.png");

    //Jugador
    this.load.atlas(
      constants.JUGADOR.ID,
      "imagenes/jugador/ninjafrog.png",
      "imagenes/jugador/ninjafrog.json"
    );
    this.load.atlas(
      constants.JUGADOR.IDBoxer,
      "imagenes/jugador/boxer.png",
      "imagenes/jugador/boxer.json"
    );

    // Objeto final
    this.load.image(constants.OBJETOS.FINAL, "imagenes/objetos/final.png");

    // Enemigos
    this.load.spritesheet(
      constants.ENEMIGOS.BUNNY.ID,
      "imagenes/enemigos/bunny.png",
      { frameWidth: 34, frameHeight: 44 }
    );
    this.load.spritesheet(
      constants.ENEMIGOS.CHICKEN.ID,
      "imagenes/enemigos/chicken.png",
      { frameWidth: 32, frameHeight: 34 }
    );
    this.load.spritesheet(
      constants.ENEMIGOS.MUSHROOM.ID,
      "imagenes/enemigos/mushroom.png",
      { frameWidth: 32, frameHeight: 32 }
    );
    this.load.spritesheet(
      constants.ENEMIGOS.RADISH.ID,
      "imagenes/enemigos/radish.png",
      { frameWidth: 30, frameHeight: 38 }
    );
    this.load.spritesheet(
      constants.ENEMIGOS.BAT.ID,
      "imagenes/enemigos/bat.png",
      { frameWidth: 46, frameHeight: 30 }
    );

    //Explosion
    this.load.spritesheet(
      constants.ENEMIGOS.EXPLOSION.ID,
      "imagenes/enemigos/explosion.png",
      { frameWidth: 38, frameHeight: 38 }
    );

     //Plataformas móviles
     this.load.image(constants.PLATAFORMAMOVIL.ID, 'imagenes/objetos/platformamovil.png');

     //Sonidos
     this.load.audio(constants.SONIDOS.EFECTOS.SALTAR, 'sonidos/efectos/saltar.ogg');
     this.load.audio(constants.SONIDOS.EFECTOS.CAERSOBREENEMIGO, 'sonidos/efectos/caersobre.ogg');
     this.load.audio(constants.SONIDOS.EFECTOS.QUITARVIDA, 'sonidos/efectos/vida.ogg');
     this.load.audio(constants.SONIDOS.EFECTOS.RECOLECTAR, 'sonidos/efectos/recolectar.ogg');         
     
     for (let i=0; i<=2; i++)
         this.load.audio(constants.SONIDOS.BANDASONORA + i, `sonidos/bandasonora/cartoongame${i}.ogg`);

     //Recolectables
     this.load.spritesheet(constants.RECOLECTABLES.PLATANO.ID, 'imagenes/objetos/platano.png', {frameWidth:32, frameHeight:32});
     this.load.spritesheet(constants.RECOLECTABLES.CEREZA.ID, 'imagenes/objetos/cereza.png', {frameWidth:32, frameHeight:32});
     this.load.spritesheet(constants.RECOLECTABLES.PINA.ID, 'imagenes/objetos/pina.png', {frameWidth:32, frameHeight:32});
                         

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
