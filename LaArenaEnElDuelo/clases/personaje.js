//las clases deben ser exportadas para importarse en un modulo general donde probaremos todo
import { dados } from "./dados.js";


export class personaje {

    //variable privada 
    #vida = 100;

    //constructor 
     constructor (nombre,fuerza){
        this.nombre=nombre;//variable publica
        this.fuerza=fuerza;//variable publica 
    }
    
    //atacar 
    atacar(objetivo){

        //comprovamos que esta vivo con el metodo de estaVIVO
        if(!this.estaVivo()){
            console.log(this.nombre+"no puede atacar porque esta muerto");
            return;
        }

        //llamamos a la clase estatica de dado donde tenemos un metodo de generar el numero aleatorio
        const dano = dados.generarNumeroAleatorio(1,this.fuerza);

        //mostramos el daño 
        console.log(this.nombre+" ataca a "+objetivo.nombre+" y causa "+dano+" de daño."); 
        
        //aplicamos dicho daño
        objetivo.recibirDano(dano);

    }


    //recibir Daño 
    recibirDano(cantidad) { 
        this.#vida = this.#vida-cantidad; 
  
        //si esta a cero o menos muere
        if (this.#vida <= 0) {
             console.log(this.nombre+" ha muerto."); 
        } 
            
    }

    //estar Vivo 
    estaVivo(){
        //si es mayor devuelve verdadero, esto lo hace asi porque en js las comparaciones devuelven booleanos
        return this.#vida > 0;    
    }

    //getter
    get vida(){ 
        return this.#vida
    }


}