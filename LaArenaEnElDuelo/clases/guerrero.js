//las clases deben ser exportadas para importarse en un modulo general donde probaremos todo

//para que se permita la herecia de la clase padre que es la personaje 
import { personaje } from "./personaje.js";

export class guerrero extends personaje{

    //constructor con una propiedad extra
    constructor(nombre,fuerza,armadura=3){
        super(nombre,fuerza); //llama al constructor padre
        this.armadura=armadura; //nueva propiedad 
    }

    //sobreescribir el metodo de recibir daño
     recibirDano(cantidad){
        // Reducimos el daño por la armadura
         let danoFinal = cantidad - this.armadura; 
         // Si el daño queda negativo, lo dejamos en 0 
         if (danoFinal < 0) danoFinal = 0; 
         
    
         console.log(this.nombre +"bloquea"+this.armadura+" de daño y recibe"+danoFinal+"de daño real." ); 
         
         // Llamamos al método original del padre para aplicar el daño 
         super.recibirDano(danoFinal); 

     }
}