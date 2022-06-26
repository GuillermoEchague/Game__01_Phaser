import constants from "../constants";
import ManejadorNivel from './manejadornivel';

export default class Nivel3 extends ManejadorNivel
{
    constructor () {
        super(constants.ESCENAS.NIVEL3);              
    }

    create (): void {               
        this.creaEscenarioNivel(constants.MAPAS.NIVEL3.TILEMAPJSON, constants.FONDOS.NIVEL3);

        this.creaEnemigos([constants.ENEMIGOS.RADISH, constants.ENEMIGOS.MUSHROOM]);

        this.creaRecolectables([constants.RECOLECTABLES.PLATANO, constants.RECOLECTABLES.PINA, constants.RECOLECTABLES.CEREZA]);

    }


}