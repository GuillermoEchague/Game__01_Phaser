import constants from "../constants";
import ManejadorNivel from './manejadornivel';

export default class Nivel2 extends ManejadorNivel
{
    constructor () {
        super(constants.ESCENAS.NIVEL2);              
    }

    create (): void {               
        this.creaEscenarioNivel(constants.MAPAS.NIVEL2.TILEMAPJSON, constants.FONDOS.NIVEL2);

        this.creaEnemigos([constants.ENEMIGOS.RADISH, constants.ENEMIGOS.MUSHROOM]);

        this.creaRecolectables([constants.RECOLECTABLES.PLATANO, constants.RECOLECTABLES.PINA, constants.RECOLECTABLES.CEREZA]);

    }


}