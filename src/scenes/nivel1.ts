import constants from "../constants";
import Jugador from "../gameobjects/jugador";
import Enemigos from "../gameobjects/enemigos";

export default class Nivel1 extends Phaser.Scene {
  private width: number;
  private height: number;
  public life: number;
  public puntuation: number;
  public mapaNivel: Phaser.Tilemaps.Tilemap;
  private conjuntoPatrones: Phaser.Tilemaps.Tileset;
  private capaMapNivel: Phaser.Tilemaps.TilemapLayer;
  private imagenFondo: Phaser.GameObjects.TileSprite;
  private jugador: Jugador;
  // private jugadorBoxer: Phaser.Physics.Arcade.Sprite;

  // Tiempo Nivel
  private segundos: number;
  private tiempoRestante: number;
  private tiempoAgotado: boolean;

  //enemigos
  private bunnyGroup: Enemigos;
  private chickenGroup: Enemigos;

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
    // const logo = this.add.image(400, 70, "logo1");
    // const playTxt: Phaser.GameObjects.Text = this.add
    //   .text(50, this.height / 2, constants.ESCENAS.NIVEL1, {
    //     fontSize: "32px",
    //     color: "#FFFFFF",
    //   })
    //   .setInteractive();

    // const vidasTxt: Phaser.GameObjects.Text = this.add
    //   .text(this.width / 2, this.height / 2, "VIDAS -", {
    //     fontSize: "32px",
    //     color: "#FFFFFF",
    //   })
    //   .setInteractive();

    // vidasTxt.on("pointerdown", () => {
    //   this.life--;
    //   this.registry.set(constants.REGISTRO.LIFE, this.life);
    //   this.events.emit(constants.EVENTOS.LIFES);
    // });

    // const puntuationTxt: Phaser.GameObjects.Text = this.add
    //   .text(
    //     this.width / 2,
    //     this.height / 2 + 100,
    //     constants.REGISTRO.PUNTUATION,
    //     { fontSize: "32px", color: "#FFFFFF" }
    //   )
    //   .setInteractive();

    // puntuationTxt.on("pointerdown", () => {
    //   this.puntuation++;
    //   this.registry.set(constants.REGISTRO.PUNTUATION, this.puntuation);
    //   this.events.emit(constants.EVENTOS.PUNTUATION);
    // });

    this.segundos = 1;
    this.tiempoRestante = 70;
    this.tiempoAgotado = false;

    /* Cargar Tilemap */
    this.mapaNivel = this.make.tilemap({
      key: constants.MAPAS.NIVEL1.TILEMAPJSON,
      tileWidth: 16,
      tileHeight: 16,
    });
    this.physics.world.bounds.setTo(
      0,
      0,
      this.mapaNivel.widthInPixels,
      this.mapaNivel.heightInPixels
    );

    //Crear Jugador
    this.mapaNivel.findObject(constants.JUGADOR.ID, (d: any) => {
      this.jugador = new Jugador({
        escena: this,
        x: 80,
        y: 80,
        texture: constants.JUGADOR.ID,
      });
    });

    /* Las camaras siguen al jugador*/
    this.cameras.main.setBounds(
      0,
      0,
      this.mapaNivel.widthInPixels,
      this.mapaNivel.heightInPixels
    );

    this.cameras.main.startFollow(this.jugador);

    this.conjuntoPatrones = this.mapaNivel.addTilesetImage(
      constants.MAPAS.TILESET
    );

    this.capaMapNivel = this.mapaNivel.createLayer(
      constants.MAPAS.NIVEL1.CAPAPLATAFORMAS,
      this.conjuntoPatrones
    );
    this.capaMapNivel.setCollisionByExclusion([-1]);

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

    //Animaciones
    this.anims.create({
      key: constants.JUGADOR.ANIMATION.ESPERA,
      frames: this.anims.generateFrameNames(constants.JUGADOR.ID, {
        prefix: constants.JUGADOR.ANIMATION.ESPERA + "-",
        end: 11,
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
    repeat: 0
});

    this.physics.add.collider(this.jugador, this.capaMapNivel);

    //Crea sprite con posición final
    let objetofinal: any = this.mapaNivel.createFromObjects(
      constants.MAPAS.POSICIONFINAL,
      { name: constants.MAPAS.POSICIONFINAL }
    )[0];
    this.physics.world.enable(objetofinal);
    objetofinal.body.setAllowGravity(false);
    objetofinal.setTexture(constants.OBJETOS.FINAL);
    objetofinal.body.setSize(40, 50);
    objetofinal.body.setOffset(10, 15);

    //collisión para final del nivel
    this.physics.add.collider(this.jugador, objetofinal, () => {
      this.scene.stop(constants.ESCENAS.NIVEL1);
      this.scene.stop(constants.ESCENAS.HUD);
      this.scene.start(constants.ESCENAS.MENU);
    });

    //Añade los enemigos obteniendolos de la capa de objetos del mapa
    this.bunnyGroup = new Enemigos(
      this,
      constants.MAPAS.ENEMIGOS,
      constants.ENEMIGOS.BUNNY.ID,
      constants.ENEMIGOS.BUNNY.ANIM,
      constants.ENEMIGOS.BUNNY.VELOCIDAD,
      { size: { x: 30, y: 30 }, offset: { x: 0, y: 10 } }
    );

    this.physics.add.collider(this.bunnyGroup, this.capaMapNivel);

    this.physics.add.overlap(
      this.jugador,
      this.bunnyGroup,
      this.jugador.enemigoToca,
      null,
      this
    );

    //Chicken Group
    this.chickenGroup = new Enemigos(
      this,
      constants.MAPAS.ENEMIGOS,
      constants.ENEMIGOS.CHICKEN.ID,
      constants.ENEMIGOS.CHICKEN.ANIM,
      constants.ENEMIGOS.CHICKEN.VELOCIDAD,
      { size: { x: 30, y: 30 }, offset: { x: 0, y: 0 } }
    );

    this.physics.add.collider(this.chickenGroup, this.capaMapNivel);
    this.physics.add.overlap(
      this.jugador,
      this.chickenGroup,
      this.jugador.enemigoToca,
      null,
      this
    );

    // //Animaciones
    // this.anims.create({
    //   key: constants.JUGADOR.ANIMATIONBOXER.ESPERA,
    //   frames: this.anims.generateFrameNames(constants.JUGADOR.IDBoxer, {
    //     prefix: constants.JUGADOR.ANIMATIONBOXER.ESPERA + "-",
    //     end: 20,
    //   }),
    //   frameRate: 20,
    //   repeat: -1,
    // });

    // //Crear Jugador
    // this.jugador = this.physics.add
    //   .sprite(80, 80, constants.JUGADOR.IDBoxer)
    //   .play(constants.JUGADOR.ANIMATIONBOXER.ESPERA);

    // this.physics.add.collider(this.jugadorBoxer, this.capaMapNivel);
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

  update(time): void {
    //mover el fondo
    this.imagenFondo.tilePositionY -= 0.2;

    if (parseInt(this.registry.get(constants.REGISTRO.LIFE)) === 0) {
      this.scene.stop(constants.ESCENAS.NIVEL1);
      this.scene.stop(constants.ESCENAS.HUD);
      this.scene.start(constants.ESCENAS.MENU);
    }
    this.jugador.update();
    this.bunnyGroup.update();
    this.chickenGroup.update();

    // Gestion del tiempo
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
      //Registro
      this.registry.set(constants.REGISTRO.RELOJ, textoReloj);
      //envío al HUD
      this.events.emit(constants.EVENTOS.RELOJ);

      //Cuando el tiempo termine GAME OVER
      if (this.tiempoRestante == 0) {
        this.tiempoAgotado = true;
        this.scene.stop(constants.ESCENAS.NIVEL1);
        this.scene.stop(constants.ESCENAS.HUD);
        this.scene.start(constants.ESCENAS.MENU);
      }
    }
  }
}
