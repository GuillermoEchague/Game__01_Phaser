import constants from "../constants";
import Jugador from "../gameobjects/jugador";
import Enemigos from "../gameobjects/enemigos";
import PlataformasMoviles from "../gameobjects/plataformasmoviles";
import Recolectables from "../gameobjects/recolectables";

export default class ManejadorNivel extends Phaser.Scene {
  protected nombreNivel: string;
  protected nombreFondoNivel: string;

  //Vidas y Puntuación
  public life: number;
  public puntuation: number;

  //Mapa
  public mapaNivel: Phaser.Tilemaps.Tilemap;
  protected conjuntoPatrones: Phaser.Tilemaps.Tileset;
  protected capaPlataformasMapaNivel: Phaser.Tilemaps.TilemapLayer;
  protected imagenFondo: Phaser.GameObjects.TileSprite;

  //Jugador
  protected jugador: Jugador;

  //tiempo nivel
  protected segundos: number;
  protected tiempoRestante: number;
  protected tiempoAgotado: boolean;

  //enemigos
  protected grupoEnemigos: Enemigos[];

  //plataformas móviles
  protected plataformasMovilesH: PlataformasMoviles;
  protected plataformasMovilesV: PlataformasMoviles;

  //Sonido
  protected bandasonoraNivel: Phaser.Sound.BaseSound;

  //Recolectables
  protected platanosGroup: Recolectables;
  protected pinasGroup: Recolectables;
  protected cerezasGroup: Recolectables;

  constructor(nivel: string) {
    super(nivel);
    this.nombreNivel = nivel;
  }

  /**
   * Inicialización de la escena
   */
  init(): void {
    this.life = 3;
    this.puntuation = 0;

    this.segundos = 1;
    this.tiempoRestante = 300;
    this.tiempoAgotado = false;

    //Con el sistema de registro global de variables
    //inicializamos las del juego
    this.registry.set(constants.REGISTRO.LIFE, this.life);
    this.registry.set(constants.REGISTRO.PUNTUATION, this.puntuation);

    this.grupoEnemigos = [];
    this.sound.stopAll();
  }

  /**
   * Método que completa el escenario y jugador
   *
   * @param jsonMapa
   * @param imagenScrolable
   */
  creaEscenarioNivel(jsonMapa: string, imagenScrolable: string): void {
    this.creaBandasonora();

    this.creaMapaNivel(jsonMapa);

    this.crearFondoScrolable(imagenScrolable);

    this.creaAnimaciones();

    this.creaJugador();

    this.creaObjetoFinal();

    this.creaPlataformasMoviles();
  }

  creaBandasonora(): void {
    //Muestra sonido si la configuración es ON
    if (
      this.registry.get(constants.REGISTRO.MUSICA) ==
      constants.AJUSTES.SONIDOON
    ) {

      //carga sonido y lo ejecuta en loop
      this.bandasonoraNivel = this.sound.add(
        constants.SONIDOS.BANDASONORA + 1,
        { loop: true, volume: 0 }
      );
      this.bandasonoraNivel.play();

      //Fade IN Sonido
      this.tweens.add({
        targets: this.bandasonoraNivel,
        volume: 1,
        duration: 2000,
      });
    }
  }

  /**
   * Método que crea el mapa en la escena con una capa de plataformas por defecto colisionable
   * @param jsonMapa fichero json del tilemap
   * @param imagenMapa imagen tileset del mapa
   */
  creaMapaNivel(
    jsonMapa: string,
    imagenMapa: string = constants.MAPAS.TILESET
  ): void {
    //Crear Mapa Nivel
    this.mapaNivel = this.make.tilemap({ key: jsonMapa });
    //Los bordes del juego  las dimensiones del mapa creado
    this.physics.world.bounds.setTo(
      0,
      0,
      this.mapaNivel.widthInPixels,
      this.mapaNivel.heightInPixels
    );
    //imagen de conjunto de patrones asociada al mapa
    this.conjuntoPatrones = this.mapaNivel.addTilesetImage(imagenMapa);
    //capa de plataformas
    this.capaPlataformasMapaNivel = this.mapaNivel.createLayer(
        constants.MAPAS.CAPAPLATAFORMAS,
      this.conjuntoPatrones
    );
    //hacer que la capa que sea collisionable
    this.capaPlataformasMapaNivel.setCollisionByExclusion([-1]);
  }

  /**
   * Método que crea el fondo con una imagen de tipo scrolable vertical
   * @param imagenScrolable
   */
  crearFondoScrolable(imagenScrolable: string): void {
    //Crear Fondo
    this.imagenFondo = this.add
      .tileSprite(
        0,
        0,
        this.mapaNivel.widthInPixels,
        this.mapaNivel.heightInPixels,
        imagenScrolable
      )
      .setOrigin(0, 0)
      .setDepth(-1);
    this.nombreFondoNivel = imagenScrolable;
  }

  /**
   * Crea todas las posibles animaciones producidas en el nivel
   * Son globales al juego, una vez creadas no se vuelven a crear y se pueden usar en cualquier nivel
   */
  creaAnimaciones() {
    this.anims.create({
      key: constants.JUGADOR.ANIMATION.ESPERA,
      frames: this.anims.generateFrameNames(constants.JUGADOR.ID, {
        prefix: constants.JUGADOR.ANIMATION.ESPERA + "-",
        end: 10,
      }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: constants.JUGADOR.ANIMATION.CORRER,
      frames: this.anims.generateFrameNames(constants.JUGADOR.ID, {
        prefix: constants.JUGADOR.ANIMATION.CORRER + "-",
        end: 11,
      }),
      frameRate: 20,
      repeat: -1,
    });
    //crea la animacion de explosion
    this.anims.create({
      key: constants.ENEMIGOS.EXPLOSION.ANIM,
      frames: constants.ENEMIGOS.EXPLOSION.ID,
      frameRate: 15,
      repeat: 0,
    });
  }

  /**
   * Crea el objeto Jugador y lo posiciona en el mapa
   */
  creaJugador(): void {
    //Obtiene posición del jugador del mapa y crea jugador con esa posición
    this.mapaNivel.findObject(constants.JUGADOR.ID, (d: any) => {
      this.jugador = new Jugador({
        escena: this,
        x: d.x,
        y: d.y,
        textura: constants.JUGADOR.ID,
      });
    });

    //las cámaras siguen al jugador
    this.cameras.main.setBounds(
      0,
      0,
      this.mapaNivel.widthInPixels,
      this.mapaNivel.heightInPixels
    );
    this.cameras.main.startFollow(this.jugador);

    //Se crea colisión entre el jugador y la capa de plataformas
    this.physics.add.collider(this.jugador, this.capaPlataformasMapaNivel);
  }

  /**
   * Crea objeto para el final del mapa
   */
  creaObjetoFinal() {
    //Crea un sprite con posición final
    let objetofinal: any = this.mapaNivel.createFromObjects(
        constants.MAPAS.POSICIONFINAL,
      { name: constants.MAPAS.POSICIONFINAL }
    )[0];
    this.physics.world.enable(objetofinal);
    objetofinal.body.setAllowGravity(false);
    objetofinal.setTexture(constants.OBJETOS.FINAL);
    objetofinal.body.setImmovable(true);

    objetofinal.body.setSize(40, 50);
    objetofinal.body.setOffset(10, 15);

    //collisión para final del nivel
    this.physics.add.collider(this.jugador, objetofinal, () =>
      this.finalizaNivel()
    );
  }

  /**
   * Vuelve a Menu haciendo un fadeout de la cámara
   * parando música, y las dos escenas HUD y la del Nivel
   */
  volverAMenu(): void {
    this.cameras.main.fade(700, 0, 0, 0);
    this.cameras.main.on("camerafadeoutcomplete", () => {
      this.sound.stopAll();
      this.scene.stop(this.nombreNivel);
      this.scene.stop(constants.ESCENAS.HUD);
      this.scene.start(constants.ESCENAS.MENU);
    });
  }

  /**
   * Finaliza nivel haciendo un fadeout de la cámara
   * parando música, y las dos escenas HUD y la del Nivel
   * Se dirige al nivel de FIN y le manda información de si es gameover o no
   */
  finalizaNivel(esWin: boolean = true): void {
    this.sound.stopAll();
    this.scene.stop(this.nombreNivel);
    this.scene.stop(constants.ESCENAS.HUD);
    this.scene.start(constants.ESCENAS.FINNIVEL, {
      esWin: esWin,
      nombreNivel: this.nombreNivel,
      nombreFondoNivel: this.nombreFondoNivel,
      puntuacion: this.puntuation + this.tiempoRestante,
    });
  }

  /**
   * Crea grupos de enemigos y los configura para que colisionen con el mapa y con el jugador
   */
  creaEnemigos(enemigosConfig: any[]): void {
    enemigosConfig.forEach((enemigosConfig) => {
      let enemigos: Enemigos = new Enemigos(
        this,
        constants.MAPAS.ENEMIGOS,
        enemigosConfig.ID,
        enemigosConfig.ANIM,
        enemigosConfig.VELOCIDAD
      );

      this.physics.add.collider(enemigos, this.capaPlataformasMapaNivel);
      this.physics.add.overlap(
        this.jugador,
        enemigos,
        this.jugador.enemigoToca,
        null,
        this
      );

      //añade los enemigos al array
      this.grupoEnemigos.push(enemigos);
    });
  }

  /**
   * Crea plataformas móviles en movimiento vertiles y horizontales
   */
  creaPlataformasMoviles(): void {
    this.plataformasMovilesH = new PlataformasMoviles(
      this,
      constants.MAPAS.PLATAFORMASMOVILES,
      constants.PLATAFORMAMOVIL.ID,
      constants.PLATAFORMAMOVIL.VELOCIDAD,
      true
    );

    this.plataformasMovilesV = new PlataformasMoviles(
      this,
      constants.MAPAS.PLATAFORMASMOVILES,
      constants.PLATAFORMAMOVIL.ID,
      constants.PLATAFORMAMOVIL.VELOCIDAD,
      false
    );

    this.physics.add.collider(this.jugador, [
      this.plataformasMovilesH,
      this.plataformasMovilesV,
    ]);
    this.physics.add.collider(this.capaPlataformasMapaNivel, [
      this.plataformasMovilesH,
      this.plataformasMovilesV,
    ]);
  }

  /**
   * Crea grupos de recolectables y los configura para que colisionen con el jugador
   * el nombre de la capa del mapa se tiene que llamar 'recolectables'
   */
  creaRecolectables(recolectablesConfig: any[]): void {
    recolectablesConfig.forEach((enemigosConfig) => {
      let recolectables = new Recolectables(
        this,
        constants.MAPAS.RECOLECTABLES,
        enemigosConfig.ID,
        enemigosConfig.ANIM
      );
      this.physics.add.overlap(
        this.jugador,
        recolectables,
        this.jugador.recolecta,
        null,
        this
      );
    });
  }
  update(time: number, delta: number): void {
    //movimiento scroll del fondo
    this.imagenFondo.tilePositionY -= 0.4;

    //Actualiza Manejador del jugador
    this.jugador.update();
    this.grupoEnemigos.forEach((enemigos) => {
      enemigos.update();
    });
    this.plataformasMovilesH.update();
    this.plataformasMovilesV.update();

    //Gestión del tiempo
    //Resta segundos empleados por Player en cada Level
    if (
      this.segundos != Math.floor(Math.abs(time / 1000)) &&
      !this.tiempoAgotado
    ) {
      this.segundos = Math.floor(Math.abs(time / 1000));
      this.tiempoRestante--;

      let minutos: number = Math.floor(this.tiempoRestante / 60);
      let segundos: number = Math.floor(this.tiempoRestante - minutos * 60);

      let textoReloj: string =
        Phaser.Utils.String.Pad(minutos, 2, "0", 1) +
        ":" +
        Phaser.Utils.String.Pad(segundos, 2, "0", 1);
      this.registry.set(constants.REGISTRO.RELOJ, textoReloj);
      this.events.emit(constants.EVENTOS.RELOJ);

      if (this.tiempoRestante == 0) {
        //If times up gameover
        this.tiempoAgotado = true;
      }
    }

    //Volver a menu
    if (this.life === 0 || this.tiempoAgotado) this.finalizaNivel(false);
  }
}
