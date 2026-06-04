//las clases deben ser exportadas para importarse en un modulo general donde probaremos todo

//importamos la clase padre y la de dados
import { personaje } from "./personaje.js";
import { dados } from "./dados.js";

export class mago extends personaje {

    // Constructor con una propiedad extra 
    constructor(nombre, fuerza, mana = 3) {
        super(nombre, fuerza);//llama al constructor padre
        this.mana = mana; //nueva propiedad 

        // Recupera 1 de mana cada 20 segundos hasta un máximo de 5
        setInterval(() => this.recuperarMana(), 20000);
    }

    // Recuperación automática de mana
    recuperarMana() {
        // Solo recupera si tiene menos de 5
        if (this.mana < 5) {
            this.mana++;
            console.log(this.nombre+"recupera 1 de maná. Maná actual:"+this.mana);
        }
    }

    //sobreescribir el metodo de atacar
    atacar(objetivo) {

        // Si está muerto no puede atacar
        if (!this.estaVivo()) {
            console.log(this.nombre+" no puede atacar porque está muerto.");
            return;
        }

        // Si tiene mana hace un ataque mágico
        if (this.mana > 0) {

            // Gasta 1 de mana
            this.mana--;

            // llamamos a  generarNumeroAleatorio y le multiplicamos el mana
            const maxMagico = this.fuerza + 2 * this.mana;
            const dano = dados.generarNumeroAleatorio(1, maxMagico);

            // Mensaje de acierto o fallo
            if (dano > 0) {
                console.log(this.nombre+"lanza un hechizo a" +objetivo.nombre+" causando " +dano+" de daño.");
                objetivo.recibirDano(dano);
            } else {
                console.log(this.nombre+"lanza un hechizo a" +objetivo.nombre+"pero falla.");
            }

        } else {
            // Si no tiene mana, hace un ataque normal, por lo que llamamos a la padre
            console.log(this.nombre+" no tiene maná, hace un ataque normal.");
            super.atacar(objetivo);
        }
    }
}
