const constants = {
  EVENTOS: {
    LIFES: "cambiarVidas",
    PUNTUATION: "cambiaPuntuacion",
    RELOJ: "reloj",
  },
  MENU: {
    PLAY: "JUGAR",
    TITULO: "SUPER RANINJA",
    AJUSTES: "AJUSTES",
    CREDITOS: "CREDITOS",
  },
  HUD: {
    LIFE: "VIDAS: ",
  },
  ESCENAS: {
    CARGA: "Load",
    MENU: "Menu",
    NIVEL1: "NIVEL 1",
    HUD: "HUD",
    NIVEL2: "NIVEL 2",
    NIVEL3: "NIVEL 3",
    AJUSTES: "Ajustes",
    CREDITOS: "Creditos",
    SELECCIONNIVEL: "SeleccionNivel",
    FINNIVEL: "FinNivel",
  },
  REGISTRO: {
    LIFE: "vidas",
    PUNTUATION: "puntuacion",
    RELOJ: "reloj",
    MUSICA: "musica",
    EFECTOS: "efectos",
  },
  MAPAS: {
    NIVEL1: {
      TILEMAPJSON: "mapaNivel1",
    },
    NIVEL2: {
      TILEMAPJSON: "mapaNivel2",
    },
    NIVEL3: {
      TILEMAPJSON: "mapaNivel3",
    },
    CAPAPLATAFORMAS: "Plataformas",
    TILESET: "nivelestileset",
    POSICIONFINAL: "posicionfinal",
    ENEMIGOS: "enemigos",
    PLATAFORMASMOVILES: "plataformasmoviles",
    PLATAFORMAVERTICAL: "vertical",
    PLATAFORMAHORIZONTAL: "horizontal",
    RECOLECTABLES: "recolectables",
  },
  FONDOS: {
    NIVEL1: "Brown",
    NIVEL2: "Pink",
    NIVEL3: "Blue",
    MENU: "Green",
  },
  FUENTES: {
    JSON: "fuenteJSON",
    IMAGEN: "imagenFuente",
    BITMAP: "fuentePixel",
  },
  JUGADOR: {
    ID: "jugador",

    ANIMATION: {
      ESPERA: "idle",
      CORRER: "run",
      SALTO: "jump-0",
    },
    IDBoxer: "JugadorAtlasBoxer",
    ANIMATIONBOXER: {
      ESPERA: "boxer_idle",
      CORRER: "boxer_run",
      CAMINAR: "boxer_walk",
      MORIR: "boxer_die",
      LADRAR: "boxer_bark",
      SENTAR: "boxer_sit",
    },
  },
  OBJETOS: {
    FINAL: "final",
  },
  ENEMIGOS: {
    BUNNY: {
      ID: "bunny",
      ANIM: "bunnyCorre",
      VELOCIDAD: 75,
    },
    CHICKEN: {
      ID: "chicken",
      ANIM: "chickenCorre",
      VELOCIDAD: 100,
    },
    MUSHROOM: {
      ID: "mushroom",
      ANIM: "mushroomCorre",
      VELOCIDAD: 100,
    },
    RADISH: {
      ID: "radish",
      ANIM: "radishCorre",
      VELOCIDAD: 100,
    },
    BAT: {
      ID: "bat",
      ANIM: "bathCorre",
      VELOCIDAD: 100,
    },
    EXPLOSION: {
      ID: "explosion",
      ANIM: "explota",
    },
  },
  PLATAFORMAMOVIL: {
    ID: "plataformamovil",
    VELOCIDAD: 60,
  },
  SONIDOS: {
    EFECTOS: {
      SALTAR: "saltar",
      CAERSOBREENEMIGO: "caersobre",
      QUITARVIDA: "vida",
      RECOLECTAR: "recolectar",
    },
    BANDASONORA: "bandasonora",
  },
  RECOLECTABLES: {
    PLATANO: {
      ID: "platano",
      ANIM: "platanoAnim",
    },
    PINA: {
      ID: "pina",
      ANIM: "pinaAnim",
    },
    CEREZA: {
      ID: "cereza",
      ANIM: "cerezaAnim",
    },
  },
  AJUSTES: {
    VOLVER: "VOLVER",
    MUSICA: "MUSICA",
    EFECTOS: "EFECTOS",
    SONIDOON: "sonidoon",
    SONIDOOFF: "sonidoff",
  },
  CREDITOS: {
    GAMEDEV: "GUILLERMO ECHAGUE",
    CREADOPOR: "GAMEDEV : GUILLERMO ECHAGUE\n\nWITH PHASER 3.50 AND TYPESCRIPT",
    ASSETS:
      "SPRITES : PIXEL ADVENTURE BY PIXELFROG\n\n\nMUSIC : FREESOUND CARTOON THEMES LOOP\n\nBY DANIEL NORONHA",
    VOLVER: "VOLVER",
  },
  FINNIVEL: {
    PUNTOS: "PUNTUACION : ",
    WIN: "YOU WIN!!",
    GAMEOVER: "GAME OVER!!",
  },
};

export default constants;
