const constants = {
  EVENTOS: {
    LIFES: "cambiarVidas",
    PUNTUATION: "cambiaPuntuacion",
    RELOJ: "reloj",
  },
  MENU: {
    PLAY: "JUGAR",
  },
  HUD: {
    LIFE: "VIDAS: ",
  },
  ESCENAS: {
    CARGA: "Load",
    MENU: "Menu",
    NIVEL1: "Nivel1",
    HUD: "HUD",
  },
  REGISTRO: {
    LIFE: "vidas",
    PUNTUATION: "puntuacion",
    RELOJ: "reloj",
  },
  MAPAS: {
    NIVEL1: {
      TILEMAPJSON: "mapaNivel1",
      CAPAPLATAFORMAS: "Plataformas",
    },
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
};

export default constants;
