import Nivel1 from "../scenes/nivel1";


export default class Enemigos extends Phaser.Physics.Arcade.Group {
    private escena: Nivel1 ;
    private velocidad: number;

    constructor(escena: Nivel1, nombreObjeto:string, idObjeto:string, animObjeto: string, velocidad: number,rect: any){
        super(escena.physics.world, escena);  
        
        this.escena = escena;
        this.velocidad=velocidad;

                        
        // añade los objetos de los enemigos desde el array de sprites obtenidos del mapa al grupo        
        this.addMultiple(this.escena.mapaNivel.createFromObjects(nombreObjeto, {name: idObjeto}));

        //añade física a todos los objetos del grupo
        this.escena.physics.world.enable(this.children.entries);

        //Crea animaciones Enemigos
        this.escena.anims.create({
            key: animObjeto,
            frames: idObjeto,
            frameRate: 20,
            repeat: -1
        });

        this.children.entries.map((enemigo: any) => {
            enemigo.body.setCollideWorldBounds(true);  
            enemigo.body.setSize(rect.size.x, rect.size.x,);
            enemigo.body.setOffset(rect.offset.x, rect.offset.y);            
            enemigo.play(animObjeto);
            this.mueveEnemigo((Phaser.Math.Between(0, 1) ? 'izda' : 'dcha'), enemigo);
        });

    }


    mueveEnemigo(direccion: string, enemigo: any) {        
        if (direccion === 'izda') {
            enemigo.body.setVelocityX(this.velocidad*-1);
            enemigo.flipX=false; 
        } else if (direccion === 'dcha') {
            enemigo.body.setVelocityX(this.velocidad);
            enemigo.flipX=true;
        }
    }

    public update(): void {
        this.children.entries.map((enemigo: any) => {
            if(enemigo.body.velocity.x === 0) {
                this.mueveEnemigo((Phaser.Math.Between(0, 1) ? 'izda' : 'dcha'), enemigo);
            }
            if (enemigo.body.blocked.right) {
                this.mueveEnemigo('izda', enemigo);                              
            } else if (enemigo.body.blocked.left) {
                this.mueveEnemigo('dcha', enemigo);                
            }
        });
        
    }


}