//esta clase debe ser exportada para poder ser importada en la padre y poder usarse su metodo de generarNumeroAleatorio
export class dados {

    //Nos pide un metodo estatocio 
    static generarNumeroAleatorio(min, max) {

        // Generamos un número entero aleatorio entre min y max 
        const numero = Math.floor(Math.random() * (max - min + 1)) + min;

        // Calculamos el umbral especial que define si el ataque acierta o falla
        const umbral = (min + max) / 2 + 1;

        // Si el número aleatorio es mayor o igual que el umbral devolvemos el numero para calcular el daño
        if (numero >= umbral) {
            return numero; 
        }

        // Si no supera el umbral el ataque fallido y devolvemos 0
        return 0;
    }
}
