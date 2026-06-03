/**APUNTES TEMA 2 */

//No tenemos que indicar el tipo de las variables
//No tenemos que temrinar cada sentencia con ;
//Los script de aqui no pueden comunicarse con nada de fuera
//Tenemos un html donde vamos a poder visualizar y un main.js donde vamos a crear los ejercicios esto lo conectamod mediante un <script></script> eb el html


/**VARIABLES*/
//tenemos 3 tipos diferentes de declaracion de variables 
//const = varaiables constantes 
  //const num =100;

//let = la que usamos siempre, no puede redeclararse ni tener el mismo nombre varias 
  //let edad = 25;

//var = muy antigua no se usa 
  //var xxx;

/*CONSOLA*/
//es muy util ya que podemos depurar codigo, visualizar valores,poner mensajes... y cuando 
// el visual no nos da un error en la consola si sale -> f12

/*let persona = {
  nombre: "Juan",
  edad: 30,
  direccion: {
  calle: "Calle Falsa",
  numero: 123
  }
};*/

//.log(persona); // muestra el objeto de forma normal
//console.dir(persona); // muestra el objeto como árbol de propiedades
//console.info(persona);




/**TIPOS DE DATOS BASICOS */
//las variables en javaScript pueden contener cualquier tipo de dato 

//let saludo = "Hola Mundo";
//console.log(saludo); // Hola Mundo

//let decimal = 9.45;
//let entero = 123_345.45; // usando _ para separar miles
//console.log(decimal, entero); // 9.45 123345.45


//const otraForma = BigInt("123456789012345678901234567890");
//console.log(otraForma);

//let verdadero = true;
//let falso = false;
//console.log(verdadero, falso); 

// let persona = {
//   nombre: "Pepe",
//   edad: 25,
//   superaCurso: true
// };
// console.log(persona);

// function suma(a, b) {
//   return a + b;
// }

// Usando la función
  //console.log("Resultado: " + suma(7, 8)); // Resultado: 15


/**DATOS ESPECIALES */
  //Undefined representar el valor de una variable/propiedad que ha sido declarada pero no inicializada
    // let x; 
    // console.log(x);

  //Null para asignar que algo este vacio o para avisar que no existe
    // let usuario = null;
    // console.log(usuario);

  //Infinity para representar el infinito matematico 
    // console.log(1/0);


/**CONVERSION ENTRE TIPOS DE DATOS */
  //Cuando realizamos operaciones podemos encontrarnos con que las variables no estan el mismo tipo, 
  //por lo que tenemos que convertirlas para que se puedan realizar bien las operaciones 
  //tenemos en cuenta que el operador + siver tanto para concanedar como para sumar 

    //tipo entero
      //let a = 5; 
    //tipo string
      //let b = "6";

    //va a mostrar 56 porque concatena
      //console.log(a+b); 
    // Tenemos parseInt, parseFloat o incluso number que lo veremos mas adelante 
      //console.log(a+parseInt(b));

    //para pasarlo a String en el caso contrario usamos toString


/**LITERALES */
  //son valores fijos que se escriben directamente en el código. Hay diferentes tipos

  //ARRAYS --> forma directa de crear un array con corchetes, pudiendo meter todo tipo de datos
    // let array = [1, true, "maria", {nombre:"Juan", apellido:"perez"}];
    // console.log(array);

  //BOLEANOS --> escriben directamente en el código sin comillas ni símbolos especiales.
      //tiene operadore importantes && || !
  
      // let info = document.getElementById("info");

      // let edad = 20;
      // let esMayorDeEdad = edad >= 18; // true

        //   if (esMayorDeEdad) {
        //     info.innerHTML=("Puede entrar");
        //   } else {
        //     info.innerHTML=("No puede entrar");
        //}

  //ENTEROS --> valores numéricos escritos directamente en el código, y 
  //             pueden expresarse en distintas bases: decimal, binaria, octal y hexadecimal.
        //let decimal = 42;       // base 10
        //let binario = 0b101010; // base 2 → 42
        //let octal = 0o52;       // base 8 → 42
        //let hexa = 0x2A;        // base 16 → 42

  //COMA FLOTANTE --> valore numericos con decimales 
        // let a = 3.4;
        // let b = -5.6;
        // let e = 1e3; //notacion esponencial 
        // console.log(e);

  //OBJETOS -->  son una forma concisa y poderosa de crear objetos directamente en el código. 
  //             Se definen usando llaves {} y contienen pares clave-valor.
          //  var car = {
          //     manyCars: {
          //           a: "Saab",
          //           b: "Jeep"}, 
          //     7: "Mazda"
          //   }; 
          //   console.log(car.manyCars.b); // Jeep 
          //   console.log(car[7]); // Mazda  
          //   console.log(car.manyCars["b"]);//otra forma de mostrarlo

   //CADENAS --> son secuencias de caracteres encerradas entre comillas, donde estas comillas siempre tienen que ser las mismas 
                //Pudiendo hacer uso siempre de las clases pertenecientes al String
          // let saludo = "hola buenos dias";
          // let despedida = 'Adios que \n tenga un buen dia';

          // console.log(saludo);
          // console.log(saludo.length);

      //CARACTERES ESPECIALES --> mirar pagina 18 hay muchos
          //console.log(despedida);// \n salto linea

/*OPERADORES*/ //vemos los mas raros
//símbolos y palabras que realizan operaciones sobre uno o 
//varios valores, para obtener un nuevo valor.
    
    //COMPARACION  
      //== != === !== < > >= ...
      //el == compara valores obviando el tipo , mientras === compara por valor y tipo
        //console.log(0=="0");
        //console.log(0==="0");

    //ARITMETICOS 
      //+ - / * %  ... 
        // console.log(4+5);
        // console.log(4%2);
        // console.log(7/4);

    //ASIGNACION 
      //operadores que asignan valores dependiendo de si valen null true o false 
        // let x = 1; //true
        // x &&= "ok"; //asigna ok porque es true

        // let y = 0;
        // y+=5;
        // console.log(y);
    
    //BOOLEANOS 
      //Nos sirven para evaluar expresiones de tipo logico, teniendo resultados de true o false
      //tenemos &&   ||   !
          // if(5>4 && 8>6){
          //   console.log("verdadero");
          // }else{
          //   console.log("falso");
          // }

    //BIT A BIT 
      //son operadores que nos permiten modificar un valor moviendonos hacia delante o hacia atras
      //  let a = 7;
      //  let b = a<<1;
      //     console.log(a);
      //     console.log(b);

    //PIPE |>



    //OBJETO 
      //funcionan directamente con objetos, permitiendonos añadir,borrar o ver dentro del mismo 
        // let a ={
        //     nombre : "PEPE",
        //     edad : 34,
        //     email: "pepe@hotmial.es"
        // }

        //console.log(a.nombre);//muestra
        //a.notas = [5,6,7,8];//añade
        //console.log(a);
        //delete a.email;
        //console.log(a);
        
        // a = new Array(1,2,3); 
        // a instanceof Array; // devolverá true. 


/*BLOQUES DE CODIGO */
  //Nos permite agrumar sentencias if  for  while 
      // while (x <10){
      //   x++;
      // }


/*DECISIONES */
  //permiten ejecutar diferentes bloques de código según ciertas condiciones.
    
      //IF
            // let edad = 20;

            //   if (edad >= 18) {
            //     console.log("Eres mayor de edad.");
            //   }
       
      //IF ... ELSE 
          //  let hora = 10;

          //     if (hora < 12) {
          //       console.log("Buenos días.");
          //     } else {
          //       console.log("Buenas tardes.");
          //     }   

      //SWITCH
        // let dia = "miércoles";

            // switch (dia) {
            //   case "lunes":
            //     console.log("Inicio de semana.");
            //     break;
            //   case "miércoles":
            //     console.log("Mitad de semana.");
            //     break;
            //   case "viernes":
            //     console.log("¡Por fin viernes!");
            //     break;
            //   default:
            //     console.log("Día normal.");
            // }

/*PARA MOSTRAR ALGO POR LA PANTALLA TENEMOS QUE TENER CREADO ALGUN TIPO DE ETIQUETA EN EL HTML*/
//claramente tendremos que llamar a esa etiqueta aqui para poder pasarle los valores que queremos 
let info = document.getElementById("info");
info.innerHTML; 



/*BUCLESS*/
    //Los bucles son estructuras repetitivas, que se ejecutarán un número de veces fijado expresamente, o 
    //que dependerá de si se cumple una determinada condición. 

      //FOR --> Te permite repetir un bloque de instrucciones un numero limitado de veces 
          // let myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

          // //se ejecuta hasta la cantidad que contiene el array
          // for (let i = 0; i<myArray.length;i++){
          //   info.innerHTML += myArray[i]+",";
          // }
      
      //FOR ... IN  --> sirve para recorrer las propiedades enumerables de un objeto 
          //no recomendable para arrays
          // let persona = {
          //   nombre: "Lucía",
          //   edad: 30,
          //   ciudad: "Málaga"
          // };
          //   //propiedad e suna variable cualquiera
          //   for (let propiedad in persona) {
          //     info.innerHTML+=("<br>"+propiedad + ": " + persona[propiedad]);
          //   }
      
      // FOR ...OF --> Recorrer elementos de objetos iterables como arrays,string,maps... 
            // let frutas = ["manzana", "plátano", "naranja"];

            //   for (let fruta of frutas) {
            //     info.innerHTML+=("<br>"+fruta);
            //   }

            // let saludo = "Hola";

            //   for (let letra of saludo) {
            //     info.innerHTML+=("<br>"+letra);
            //   }


      /*LA for...in   recorre las claves, for...of recorre los valores directamente.!!!!!!!!!*/

      
      //WHILE --> Lo usamos cuando queremos repetir la ejecucion un numero indefinido de veces 
        //Tambien tenemos el do...while()
            // let a =0;
            // while(a<=10){
            //   info.innerHTML+="<br>"+a;
            //   a++;
            // }


/*BREAK Y CONTINUE*/
//Se usan dentro de bucles para controlar el flujo de ejecuccion, pero lo hacen de formas diferentes.
        //BREAK  
        // for (let i = 1; i <= 10; i++) {
        //       if (i === 5) {
        //         break; // Se detiene el bucle cuando i es 5
        //       }
        //       console.log(i);
        // }
        
        //CONTINUE
        // for (let i = 1; i <= 5; i++) {
        //       if (i === 3) {
        //         continue; // Salta la impresión cuando i es 3
        //       }
        //       console.log(i);
        //  }


/*FUNCIONES*/
  //las funciones son bloques de código reutilizables que realizan
  //  una tarea específica. Son fundamentales para organizar, 
  // estructurar y reutilizar código. Tenemos varios tipos de funciones: 

      //FUNCIONES TRADICIONALES
     
            // let num1= 5;
            // let num2 = 7;
            // let resultado =0;

            // function suma (){
            //   return resultado = num1+num2;
            // }
            // info.innerHTML = suma();

      //FUNCIONES CON ARGUMENTO --> Necesitas los argumentos para que pueda funcionar, pero pueda hacerlo con diferentes valores 
            
              // let resultado =0;
              // function suma2 (num1,num2){
              //    return resultado = num1+num2;
              // }
              // info.innerHTML = suma2(2,5);
              // info.innerHTML = suma2(4,8);

        //Una curisodad es que siempre hemos podido declarar argumentos aunque no esten definidos, 
        //y ahora podemos dar valores por defecto a esos parametros en el caso que no tengan 

                // function nombres (nombre, apellidos = "García") { 
                //   //console.log("Hola " + nombre + " " + apellidos); 
                // } 
    
                // nombres("Manuel");                 //Hola Manuel García 
               // nombres("Pepito", "Grillo");      //Hola Pepito Grillo 
      

      //FUNCIONES ANONIMAS --> Son funciones que no necesitan tener un nombre para ser ejecutadas, ya que se ejecutaran directamente 

      //FUNCIONES ARROW --> Funcionan igual, se escriben asi por tener una sintaxis mas simple, realmente lo usamos
      //                     para funciones simples para ahorrarnos codigo 
         
          // function area1 (radio){
          //   return Math.PI *radio * radio;
          // }

          // let area2 = radio => Math.PI * radio * radio;

          // console.log(area1(4));
          // console.log(area2(4));



/*TRY CATCH, FINALLY, THROW*/
//crear código donde se capten los errores y nuestra aplicación pueda seguir 
//funcionando e informando de los errores que se van obteniendo

        // let login = document.getElementById("login");
        // let password = document.getElementById("password");
        // let password2 = document.getElementById("password2");
        // let error2 = document.getElementById("h11");
        // b1.onclick= function(){
        // try{

        //     if(login.value == "")throw "El campo login no puede estar vacio";
        //     else if(password.value == "")throw "El campo password no puede estar vacio";
        //     else if(password2.value == "")throw "Repite la contraseña ";
        //     else if(password.value != password2.value)throw "la contraseñas no coinciden";
        //     else alert("Usuario registrado correctamente");
            

        // }catch (err){
        //     let error = document.getElementById("error");
        //     error.innerHTML = "error: " + err;
        // }
        // finally{
        //     login.value = "";
        //     password.value = "";
        //     password2.value = "";
        //     error2.value = "register";
        // }

        // }
