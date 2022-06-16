import 'phaser';
import { Configuration } from './configuration';

export class Game extends Phaser.Game{
    constructor(configuration: Phaser.Types.Core.GameConfig){
        super(configuration);
    }
}

window.addEventListener('load', ()=>{
    const game = new Game(Configuration);

});
