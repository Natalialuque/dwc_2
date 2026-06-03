/**APUNTES TEMA 3 */
let info = document.getElementById("info");
/**
 * PUNTOO 1 
 * */

/**
 * Js esta basado en objetos, pero NO orientados en ellos
 * 
 * /para crear un objeto --> 
 */

       
    // let miAuto = {
        //     marca: "Toyota",
        //     modelo: "Corolla",
        //     año:1969
        // }

        // info.innerHTML +="marca:"+miAuto.marca+",modelo:"+miAuto.modelo+",año:"+miAuto.año;

/**Podemos incluir cualquier tipo de valor en una propiedad de un objeto:arrays,cadenas,booleanos... */
       
        // let obj = {
        // cursos: [1, 2, 3],
        // iniciado: false,
        // alumnos: [
        //     {nombre: "Pepe", apellidos: "Pérez"},
        //     {nombre: "Ana", apellidos: "Ruíz"}
        // ],
        // bio: function () {
        //     if (this.iniciado)
        //     alert("Hola, el curso actual ha empezado!");
        //     else
        //     alert("Hola, el curso actual aún no ha empezado!");
        // }
        // };

        // info.innerHTML=obj.alumnos[0].nombre;
        // info.innerHTML=obj.bio();

/**Sabemos que existen metodos y propiedades que podemos añadir a cad campo de un objeto */
   //enumerable : indica si la propiedad aparece en bucles como for..in
            // var obj = {};
            // Object.defineProperty(obj, 'oculta', { value: 10, enumerable: false });
            // console.log(Object.keys(obj)); // []

    //configurable: permite borrar o modificar la propiedad
        // var obj = {};
        // Object.defineProperty(obj, 'dato', { value: 5, configurable: true });
        // delete obj.dato; // propiedad eliminada

    //writable: Permite cambiar el valor de la propiedad
        // var obj = {};
        // Object.defineProperty(obj, 'edad', { value: 30, writable: true });
        // obj.edad = 35;
        // console.log(obj.edad); // 35

    //value: nos saca el valor de la propiedad 
        //Object.defineProperty(obj, 'nombre', { value: 'Ana' });
        //console.log(obj.nombre); // Ana


    //Object.key() --> devuelve las propiedades enumerables 
        // var persona = { nombre: "Luis", edad: 25 };
        // console.log(Object.keys(persona)); // ["nombre", "edad"]

    //Object.getOwnPropertyNames():Devuelve todas las propiedades (enumerables y no).
        // var a = {};
        // Object.defineProperty(a, 'oculta', { value: 1, enumerable: false });
        // console.log(Object.getOwnPropertyNames(a)); // ["oculta"]

    //Object.getPrototypeOf():Devuelve el prototipo del objeto.
        // var obj = {};
        // console.log(Object.getPrototypeOf(obj)); // [Object: null prototype]

    //Object.preventExtensions():Impide añadir nuevas propiedades.
        // var obj = {};
        // Object.preventExtensions(obj);
        // obj.nueva = 123; // No se añade
        // console.log(obj.nueva); // undefined

    //Object.isExtensible():Verifica si se pueden añadir propiedades.
        //console.log(Object.isExtensible(obj)); // false

    //Object.seal():Impide añadir o borrar propiedades.
        // var obj = { nombre: "Ana" };
        // Object.seal(obj);
        // delete obj.nombre; // No se elimina

    //Object.isSealed():verifica si el objeto esta sellado 
        //console.log(Object.isSealed(obj)); // true

    //Object.is(valor1, valor2):Compara dos valores con precisión.
        // console.log(Object.is(NaN, NaN)); // true
        // console.log(Object.is(+0, -0));   // false

    //Object.freeze():Congela el objeto: no se puede modificar ni borrar nada.
        //var obj = { edad: 20 };
        //Object.freeze(obj);
        //obj.edad = 30; // No cambia

    //Object.isFrozen():Verifica si el objeto está congelado.
        //console.log(Object.isFrozen(obj)); // true

    //Object.hasOwn():Comprueba si una propiedad existe en el objeto.
        // var curso = { titulo: "JS avanzado" };
        // console.log(Object.hasOwn(curso, "titulo")); // true
        // console.log(Object.hasOwn(curso, "autor"));  // false

   
/**
 * PUNTO 2
 *  */
/**
 * Los objetos en JS se dividen en 3 categorias 
 * 
 * Nativos --> Proporcionados por el lenguaje, independientes al entorno : Array, Numbre,String,Date,RegExp...
 * 
 * Incorporados --> Yambien nativos pero disponibles desde el inicio de la ejecución : Global y Math
 * 
 * Anfitriones --> Definidos por el entorno donde se ejecuta JS(como el navegador): Window, document y Navigator 
 */



//GLOBAL (incorporado)--> Es un objeto abstracto que contine funciones que no pertenencen a ningun objeto en especifico
/**
 * No nos rallamos mucho porque solo nos interesan algunos metodos --> 
 * 
 * 
    decodeURI():Decodifica una URL completa.
    decodeURIComponent():Decodifica una parte de la URL.
    encodeURI():Codifica una URL completa.
    encodeURIComponent():Codifica una parte de la URL.
    eval():Ejecuta código JavaScript desde una cadena (⚠️ peligroso).
    parseFloat():Convierte una cadena en número decimal.
    parseInt():Convierte una cadena en número entero.
 * 
 */

        //const url = 'https://www.twitter.com';
        //console.log(encodeURIComponent(url)); // https%3A%2F%2Fwww.twitter.com



//MATH (incorporado)--> No necesita instanciarse. Proporciona constantes matemáticas y funciones.
/**
 * PROPIEDADES --> 
 * 
    Math.E:	Constante de Euler.
    Math.PI:Valor de π.
    Math.SQRT2:Raíz cuadrada de 2.
 * 
 */

/**
 * METODOS UTILES --> pongo algunos
 * 
 * 
        abs(x):Valor absoluto.
        ceil(x)	:Redondea hacia arriba.
        floor(x):	Redondea hacia abajo.
        round(x):	Redondea al entero más cercano.
        max(a,b):	Mayor de dos valores.
        min(a,b):	Menor de dos valores.
        pow(a,b):	Potencia.
        sqrt(x)	:Raíz cuadrada.
        random():	Número aleatorio entre 0 y 1.
 * 
 */


        //info.innerHTML=Math.floor(4.1);
        // info.innerHTML=Math.E;
        // info.innerHTML=Math.random;


//NUMBER (nativos)-->Permite trabajar con números. Se puede instanciar con new Number(valor).
/**
 * PROPIEDADES -->
 * 
    Number.MAX_VALUE:	Mayor número representable.
    Number.MIN_VALUE:	Menor número representable.
    Number.NaN:	"Not a Number".
    Number.POSITIVE_INFINITY;	Infinito positivo.
    Number.NEGATIVE_INFINITY:	Infinito negativo.
 */

        // console.log("MAX_VALUE:", Number.MAX_VALUE);
        // console.log("NEGATIVE_INFINITY:", Number.NEGATIVE_INFINITY);
        // console.log("NaN:", Number.NaN);

/**
 * METODOS-->
 * 
        toFixed(n)	Redondea con n decimales.
        toExponential()	Notación científica.
        toPrecision(n)	Precisión total (enteros + decimales).
        toString()	Convierte a cadena.
        valueOf()	Valor primitivo.
        isNaN()	Verifica si no es número.
        isFinite()	Verifica si es finito.
 */
        // let num = 123456.45678;
        // console.log(num.toFixed(2)); // "12345.68"
        // console.log(num.toPrecision(6)); // "12345.7"
        // console.log(num.toString()); // "12345.6789"
        // console.log(isNaN("hola")); // true

//DATOOOO -->Para conocer el tipo concreto de cada objeto en JavaScript usaremos ‘typeof <variable>’. 
 

//STRING(nativos) --> Representa cadenas de texto. Tiene muchas funciones útiles.Su propiedad mas importante es lenght con la que vemos el numero de caracteres
/**
 * METODOS --> 
 * 
        charAt(i)	Carácter en índice i.
        indexOf()	Índice de primera coincidencia.
        lastIndexOf()	Índice de última coincidencia.
        slice()	Extrae parte de la cadena.
        split()	Divide en array por separador.
        toLowerCase()	Convierte a minúsculas.
        toUpperCase()	Convierte a mayúsculas.
        trim()	Elimina espacios al inicio/fin.
        replace()	Sustituye texto.
        match()	Busca con expresión regular.
 */
        // let texto = "  Hola Mundo, hola JavaScript!  ";
        // console.log(texto.charAt(2)); // "l"
        // console.log(texto.lastIndexOf("hola")); // 14
        // console.log(texto.trim()); // "Hola Mundo, hola JavaScript!"
        // console.log(texto.toLowerCase()); // "  hola mundo, hola javascript!  "
        // console.log(texto.split(",")); // ["  Hola Mundo", " hola JavaScript!  "]
        // console.log(texto.replace("hola", "saludos")); // "  Hola Mundo, saludos JavaScript!  "


//ARRAYS (nativos)-->Permite almacenar listas de elementos. Se puede declarar con [] o new Array().
//Su propiedad mas importante al igual que string es Lenght, que permite ver el numero de elementos 
/**
 * METODOS --> 
 * 
 * los tick o cruces es por si modifica el array
 * 
        push()	Añade al final.	✅
        pop()	Elimina último.	✅
        shift()	Elimina primero.	✅
        unshift()	Añade al inicio.	✅
        splice()	Añade/elimina en posición.	✅
        slice()	Extrae parte.	❌
        concat()	Une arrays.	❌
        map()	Transforma elementos.	❌
        filter()	Filtra elementos.	❌
        find()	Encuentra el primero que cumple condición.	❌
        includes()	Verifica si contiene valor.	❌
        sort()	Ordena elementos.	✅
        reverse()	Invierte orden.	✅
 */

            // let frutas = ["manzana", "banana", "cereza"];

            // frutas.pop(); // ["manzana", "banana"]
            // frutas.shift(); // ["banana", "cereza"]
            // frutas.sort(); // ["cereza", "kiwi", "mango"]
            // frutas.reverse(); // ["mango", "kiwi", "cereza"]

            // let otros = [60, 70];
            // let unidos = numeros.concat(otros); // [10, 20, 30, 40, 50, 60, 70]

            // let dobles = numeros.map(n => n * 2); // [20, 40, 60, 80, 100]

            // let mayores = numeros.filter(n => n > 25); // [30, 40, 50]

//MAP(nativo)--> es una colección de pares clave-valor donde las claves pueden ser de cualquier tipo (no solo strings como en los objetos normales).
//Mantiene el orden de inserción.
//Las claves pueden ser objetos, funciones, etc.

//Para recorrer los mapas la mejor estructura es un for of usado de la siguiente forma: 
        // let phones = new Map ([ 
        //     [678234876, "Elena"], 
        //     [623498734, "Jhon"], 
        //     [693939339, "Ana"], 
        //     [678901233, "Fran"] 
        //     ]); 
 
        //     for ([tlf, name] of phones) 
        //         console.log("Teléfono de ${name} es ${tlf}");

/**
 * METODOS --> 
 */
    // let mapa = new Map();
    // mapa.set("nombre", "Pepe");        // Añade un par clave-valor
    // console.log(mapa.get("nombre"));   // "Pepe"
    // console.log(mapa.has("nombre"));   // true
    // mapa.delete("nombre");             // Elimina la clave
    // mapa.clear();                      // Vacía el mapa


//DATE(nativo)-->Sirve para trabajar con fechas y horas.
    // let hoy = new Date(); // Fecha actual
    // let cumple = new Date("2000-05-15"); // Fecha específica
/**
 * METODOS -->
 */
    // hoy.getFullYear();    // Año actual
    // hoy.getMonth();       // Mes (0 = enero)
    // hoy.getDate();        // Día del mes
    // hoy.getHours();       // Hora
    // hoy.toLocaleDateString(); // Fecha en formato local
 
//NOTA: Para cada método que comienza con get– hay un equivalente con set–, que sirven para 
//establecer los valores de la fecha en lugar de obtenerlos. 


//Registros y Tuplas (Records and Tuples)-->No se permiten en todos los navegadores
/*
Record: como un objeto, pero no se puede modificar.
Tuple: como un array, pero inmutable.
*/

        // const persona = #{ nombre: "Ana", edad: 30 }; // Record
        // const numeros = #[1, 2, 3];                   // Tuple



/**
 * PUNTO 3
 */
//Se basa en la interaccion con objetos del navegador,estos objetos permiten acceder a informacion del entorno del usuario

//NAVIGATOR --> proporciona informacion sobre el navegador del usuario
    // console.log(navigator.userAgent); // Info del navegador
    // console.log(navigator.language);  // Idioma del navegador
    // console.log(navigator.onLine);    // true si está conectado

//SCREEN --> proporciona información sobre la pantalla del dispositivo 
    // console.log(screen.width);       // Ancho de la pantalla
    // console.log(screen.height);      // Alto de la pantalla
    // console.log(screen.availWidth);  // Ancho disponible
    // console.log(screen.availHeight); // Alto disponible

//WINDOW --> Es el objeto global del navegador. Representa la ventana del navegador.
    ///window.alert("Hola");           // Muestra una alerta
   // window.open("https://google.com"); // Abre una nueva pestaña
    //console.log(window.innerWidth); // Ancho de la ventana

//Cambia el color del main cuando hayan paado 3 segundos 
//         window.onload = function () {
//   const main = document.getElementById("main");
//   setTimeout(function () {
//     main.style.backgroundColor = "rgb(128, 13, 13)";
//   }, 3000);
// };


//OBJETO --> Representa el contenido HTML cargado en la ventana. Es parte del DOM
    // document.getElementById("titulo");     // Selecciona por ID
    // document.querySelector(".clase");      // Selecciona por clase
    // document.title = "Nuevo título";       // Cambia el título


//HISTORY --> permite intereactuar con el historial de navegacion 
    // history.back();    // Ir a la página anterior
    // history.forward(); // Ir a la siguiente página
    // history.go(-2);    // Ir dos páginas atrás

//LOCATION --> Representa la URL actual y permite redireccionar.
    // console.log(location.href);     // URL completa
    // console.log(location.hostname); // Dominio
    // console.log(location.pathname); // Ruta
    // location.reload();              // Recarga la página
    // location.assign("https://bing.com"); // Redirige



/**
 * PUNTO 4
 */
//EXPRESIONES REGALURES 
/**
 * Las expresiones regulares (regex) son patrones que se usan para 
 * buscar coincidencias dentro de cadenas de texto. Son útiles 
 * para validar formularios, buscar palabras, reemplazar texto, etc.
 */

//Existen dos formas para crear una expresion regular --> 
//usando una sitexis literal :
    //let patron = /hola/;

//usando el constructor REgExp
    //let patron2= new RegExp("hola");


/*Escribimos patrones de expresiones regulares usando tanto letras, numeros, caracteres...
*Para poder crearlas debemos usar caracteres especiales*/

/**
 *  ^ --> empiece por 
 *  $ --> termine por 
 *  * --> cero o mas repeticiones similar {0,}
 *  +--> una o mas veces similar {1,}
 *  ? --> cero o una repeticion
 *  {n}--> n repeticiones
 *  []--> grupo de caracteres
 *  [^]--> grupo de caracteres negativo
 *  \d --> digito numerico entre 0-9
 * \w --> caracteres alfanumericos 
 *  \s --> espacio en blanco 
 *  \ --> busca literalmente
 */
    //CORRERO
   // const regex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

   //CONTRASEÑA --> 8 numeros, mayuscula,minuscula,numero
   //const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    //(?=.*)--> DEBE CONTENER AL MENOS

   //NUMERO DE TELEFONO
   //const regex = /^\+?\d{7,15}$/;

    //CODIGO POSTAL 
    //const regex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;


    //FECHA EN FORMATO DD/DD/DDDD
    //const regex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;




/**
 * Las expresiones regulares pueden usarse  con metodos -->
 */
    //test() -->Verifica si hay coincidencia. Devuelve true o false.
        // let regex = /hola/;
        // regex.test("hola mundo"); // true
    
    //exec()--> Devuelve informacion detallada sobre la coincidencia 
        // let resultado = /mundo/.exec("hola mundo");
        // console.log(resultado[0]); // "mundo"
    
    //match()--> devuelve todas las coincidencias en un array
        // let texto = "uno dos tres";
        // let resultado = texto.match(/\w+/g); // ["uno", "dos", "tres"]

    //replace()--> reemplaza coincidencias por otro texto 
        // let frase = "Hola mundo";
        // let nueva = frase.replace(/mundo/, "Natalia"); // "Hola Natalia"

    //search()--> devuelve el indice de la primera coincidencia
        //"Hola mundo".search(/mundo/); // 5

    //split()-->Divide una cadena usando una expresión regular.
        //"uno,dos,tres".split(/,/); // ["uno", "dos", "tres"]




