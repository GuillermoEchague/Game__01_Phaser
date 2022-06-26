import constants from "../constants";
import ManejadorNivel from "./manejadornivel";

export default class Nivel1 extends ManejadorNivel {
  constructor() {
    super(constants.ESCENAS.NIVEL1);
  }

  create(): void {
    this.creaEscenarioNivel(
      constants.MAPAS.NIVEL1.TILEMAPJSON,
      constants.FONDOS.NIVEL1
    );

    this.creaEnemigos([constants.ENEMIGOS.BUNNY, constants.ENEMIGOS.CHICKEN]);

    this.creaRecolectables([
      constants.RECOLECTABLES.PLATANO,
      constants.RECOLECTABLES.PINA,
      constants.RECOLECTABLES.CEREZA,
    ]);
  }
}
