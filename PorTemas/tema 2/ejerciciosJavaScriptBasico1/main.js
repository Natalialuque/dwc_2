/**
 * EJERCICIO 1
 */

//variables 
let nombre = document.getElementById("nombre");
let apellidos = document.getElementById("ape");
let curso = document.getElementById("cur");
let nota1 = document.getElementById("nota1");
let nota2 = document.getElementById("nota2");
let notaFinal = document.getElementById("nota3");
let botonAñadir = document.getElementById("añadir");
let divAlumnos = document.getElementById("alum");

botonAñadir.onclick = function(){

    //creamos array de notas y el del alumno
    let notas = [nota1.value,nota2.value,notaFinal.value];
    let alumno = [nombre.value, apellidos.value, curso.value, notas];

    //bucle for.. para recorrer
    let salida =" "; 
    for(let i = 0; i < alumno.length; i++){
        salida+=alumno[i]+"-";
    }
    
    //mostramos final
    divAlumnos.textContent=salida;
}

/**
 * EJERCICIO 6
 */
//variables
let numero1 = document.getElementById("nume1");
let numero2 = document.getElementById("nume2");
let calculos = document.getElementById("calculos");
let suma = document.getElementById("suma");
let resta = document.getElementById("resta");
let multiplicacion = document.getElementById("multiplicacion");
let division = document.getElementById("division");
let resto = document.getElementById("resto");


//funcion
calculos.onclick=function(){
   
    //si no es numero
    if(isNaN(numero1.value || isNaN(nume2.value))){
        console.log("deben ser numero")
    }

    //suma resta multi
    suma.textContent= Number(numero1.value)+Number(numero2.value);
    resta.textContent = numero1.value-numero2.value;
    multiplicacion.textContent = numero1.value*numero2.value;

    //verificación de los ceros
    if(numero1.value==0 || numero2.value==0){
        console.log("no puede ser 0")
    }else{
        division.textContent= numero1.value/numero2.value;
        resto.textContent = numero1.value % numero2.value;
    }
}


/**
 * EJERCICIO 5
 */

//variables 
let nume1 = document.getElementById("num1");
let nume2 = document.getElementById("num2");
let mostrar = document.getElementById("mostrar");
let pares = document.getElementById("pares");

//funcion 
mostrar.onclick=function(){

    let num = [];

    if(nume1.value<-100 || nume1.value>100 || nume2.value<-100 || nume2>100){
        pares.textContent="error los numeros deben tener rando de -100 a 100";
    }else{
        for(let i = nume1.value; i<nume2.value; i++){
            if(i%2==0){
                num.push(i);
                i++;
            }else{
                i++;
            }
        }
        pares.textContent=num;
    }
}

/**
 * EJERCICIO 7
 */
//variables 
let not1 = document.getElementById("not1");
let not2 = document.getElementById("not2");
let not3 = document.getElementById("not3");
let calcula = document.getElementById("cal");
let calificacion = document.getElementById("calificacion");

//funcion
calcula.onclick = function(){
    let media=0

    if(isNaN(not1.value)||isNaN(not2.value)||isNaN(not3.value)){
        alert("deben ser numeros")
    }else{
        media= (Number(not1.value)+Number(not2.value)+Number(not3.value))/3;
    }

    switch(true){
        case media < 5:
            calificacion.textContent ="suspensa"
            break;
        
        case media <= 7:
            calificacion.textContent ="bien"
            break;

        
        case media <= 8.5:
            calificacion.textContent ="notable"
            break;

        
        case media <= 10:
            calificacion.textContent ="sobresaliente"
            break;

    }
}

/**
 * EJERCICIO 8
 */
//variables 
let piramidee = document.getElementById("piramidee");
let piramide1 = document.getElementById("piramide1");

piramidee.onclick=function(){
    for ( let i = 1; i<=50; i++){
        for (let o = 0; o<i;o++){
            piramide1.textContent+=i;
        }
        piramide1.textContent+="\n";
    }
}

/**
 * EJERCICIO 10
 */
//variables 
let arrow = document.getElementById("arrow");
let arrowresul = document.getElementById("arrowresul");
let arrowResultado = document.getElementById("arrowResultado");

//funcion 

arrowresul.onclick=()=>{
    if (!isNaN(arrow.value)) {
    arrowResultado.innerHTML = arrow.value % 2 === 0 ? "El número es par" : "El número es impar";
  } else {
    arrowResultado.innerHTML = "Por favor, introduce un número válido.";
  }
}


/**
 * EJERCICIO 11
 */

let pum = document.getElementById("pum");
let divPum = document.getElementById("Pum");

pum.onclick=function(){
    for(let i=1; i<=100;i++){
    if (i % 7 === 0 || i % 10 === 7) {
      divPum.innerHTML+= "PUM\n"; 
    } else {
      divPum.innerHTML += i + ", ";
    }
  }
}

/**
 * let pum = document.getElementById("pum");
let divPum = document.getElementById("Pum");

// Generador del juego del PUM
function* generadorPum() {
    for (let i = 1; i <= 100; i++) {
        if (i % 7 === 0 || i.toString().endsWith("7")) {
            yield "PUM";
        } else {
            yield i;
        }
    }
}

pum.onclick = function () {
    divPum.innerHTML = ""; // limpiar antes

    const gen = generadorPum(); // crear generador

    for (let valor of gen) {
        divPum.innerHTML += valor + "<br>";
    }
};

 */

/**
 * EJERCICIO 12
 */
let conteo = document.getElementById("conteo");
let divConteo = document.getElementById("Conteo");

conteo.onclick = function () {

    divConteo.innerHTML = ""; // limpiar antes

    for (let i = 1; i <= 300; i++) {

        // Crear un span para cada número
        let span = document.createElement("span");
        span.textContent = i + " ";

        // Múltiplos de 4 → verde + tamaño +4px
        if (i % 4 === 0) {
            span.style.color = "green";
            span.style.fontSize = "20px"; // tamaño +4px
        }

        // Múltiplos de 9 → rojo + tamaño +2px
        if (i % 9 === 0) {
            span.style.color = "red";
            span.style.fontSize = "18px"; // tamaño +2px
        }

        // Añadir el span al div
        divConteo.appendChild(span);

        // Cada 10 números → salto de línea
        if (i % 10 === 0) {
            let br = document.createElement("br");
            divConteo.appendChild(br);
        }
    }
};

/**
 * EJERCICIO 13
 */
let botonDados = document.getElementById("lanzar");
let resulDados = document.getElementById("resultadoLanzar");

botonDados.onclick = function () {
  let array = Array(13).fill(0); // índices del 2 al 12

  for (let i = 1; i <= 36000; i++) {
    let dado1 = Math.floor(Math.random() * 6) + 1;
    let dado2 = Math.floor(Math.random() * 6) + 1;
    let suma = dado1 + dado2;
    array[suma]++;
  }

  resulDados.innerHTML = ""; // limpiar antes de mostrar

  for (let i = 2; i <= 12; i++) {
    resulDados.innerHTML += "Suma " + i + ": " + array[i] + " veces<br>";
  }
};


/**
 * EJERCICIO 17
 */

//variables
let n1 = document.getElementById("number1");
let n2 = document.getElementById("number2");
let bot = document.getElementById("comparar");
let re = document.getElementById("resultado5");

let menor = 0;
let mayor = 0;

// función para calcular el menor
function calcularMenor() {
    let num1 = Number(n1.value);
    let num2 = Number(n2.value);

    if (num1 < num2) {
        menor = num1;
        mayor = num2;
    } else {
        menor = num2;
        mayor = num1;
    }
}

bot.onclick = function () {

    // Calcular menor y mayor
    calcularMenor();

    // Crear lista de números entre ellos
    let lista = [];
    for (let i = menor; i <= mayor; i++) {
        lista.push(i);
    }

    //Mostrar resultado SOLO con textContent
    re.textContent = 
        "Números entre " + menor + " y " + mayor + ":\n" +
        lista.join(", ") + 
        "\n\nTotal: " + lista.length;
};
