let info = document.getElementById("info");
let texto = document.getElementById("num");
let boton = document.getElementById("boton");

/**PRIMERA PROMESA */
//resolve--> cuando la promesa termina bien mete los datos ahi 
//reject --> cuando la promesa termina mal mete los errrores ahi 

            // let myPromise = new Promise(function(resolve,reject) {

            //     //ejecuto codigo asíncrono....

            // });

            // myPromise.then(function(){
            //     //se ejecuta  cuando la promesa ha termiando sin errores...
            // },function () {
            //     //se ejecuta cuando la promesa ha termiando con errores
            // });

/**
 * tener en encuenta que hay diferentes sintaxis, la que mas le gusta a joseluis es la siguiente -->
*/
            // console.log("iniciando"); //para ver funcionamiento del codigo

            //  let myPromise2 = new Promise(function(resolve,reject) {

            //      //ejecuto codigo asíncrono....
            //     setTimeout(function(){
                    
            //       console.log("Ejecutando Promesa");
            //      // resolve();//si creemos que va a terminar bien  
            //       reject(5);//si creemos que va a terminar mal, solo permite pasarle un dato

            //     },2000);

            //  }).then(function(){

            //      //se ejecuta  cuando la promesa ha termiando sin errores...
            //      console.log("Promesa ha terminado bien");


            //  }).catch(function (error) {

            //      //se ejecuta cuando la promesa ha termiando con errores
            //      console.log("Proemsa ha terminado mal con valor:"+error);

            //  });


/**EJEMPLO DOS */

//Si el dato metido es mayor de 100--> fallo // si el dato es menor 100--> devolver bien 
//Podria haber metido el onclick dentro como tenia hecho, porque el onclick es Asíncrono 
        // let input = document.getElementById("num");
        // let boton = document.getElementById("boton");

        //  boton.onclick=function(){
        //  let myPromise3 = new Promise(function(resolve,reject) {

        //         console.log("inicia  promesa")

        //          if(texto.value>100){
        //              throw Error("Cantidad mayor de 100");
        //             // reject(Error("cantidad mayor que 100 "));   PUEDES PONER ESTO QUE FUFA IGUAL               

        //          }else{
        //          resolve(texto.value)
        //          }
            

        //  }).then(function(resultado){

        //          info.innerText="Cantidad"+resultado;

        //  }).catch(function (error) {

        //      info.innerHTML="<span style='color:red;'>"+error+"</span>";

        //  }).finally(function(){
        //                 console.log("Promesa terminada");
        //  });

        //  }




/**VAMOS A PROBAR VARIOS TIPOS DE PROMESAS  */
        // let myPromise4 = new Array();

        // myPromise4.push(Promise.resolve(true));
        // myPromise4.push(Promise.resolve(5));
        // myPromise4.push(Promise.resolve("pepe"));
        // myPromise4.push(Promise.resolve(45));
        // myPromise4.push(Promise.reject(-1));
        // myPromise4.push(Promise.reject(false));

        // //podemos ponerle a Promise.all(myPromise4) el .then y conectarlo directamente

        // //el punto all funciona si todas las promesas del array son correctas
        // let resultados = Promise.all(myPromise4);  

        // resultados.then(function(okvalue){
        //     info.innerHTML=okvalue;

        // }).catch(function(err){
        //         info.innerHTML=err;
        // })


//ANY-->la primera promesa que se resuelva correctamente.
        // let myPromise5 = new Array();

        // myPromise5.push(Promise.reject(true));
        // myPromise5.push(Promise.reject(5));
        // myPromise5.push(Promise.reject("pepe"));
        // myPromise5.push(Promise.reject(45));
        // myPromise5.push(Promise.reject(-1));
        // myPromise5.push(Promise.reject(false));


        // let resultados2 = Promise.any(myPromise5);  

        // resultados2.then(function(okvalue){
        //     info.innerHTML=okvalue;

        // }).catch(function(err){
        //         info.innerHTML=err;
        // })

//RACE -->devolver el resultado de la primera promesa que termine, sea éxito o error.
    // let myPromise5 = new Array();

    // myPromise5.push(Promise.reject(true));
    // myPromise5.push(Promise.resolve(5));
    // myPromise5.push(Promise.reject("pepe"));
    // myPromise5.push(Promise.resolve(45));
    // myPromise5.push(Promise.reject(-1));
    // myPromise5.push(Promise.resolve(false));


    // let resultados2 = Promise.race(myPromise5);  

    // resultados2.then(function(okvalue){
    //     info.innerHTML=okvalue;

    // }).catch(function(err){
    //         info.innerHTML=err;
    // })

//ALLSETTLED -->esperar a que todas las promesas terminen, sin importar si se cumplen o fallan.
    // let myPromise5 = new Array();

    // myPromise5.push(Promise.reject(true));
    // myPromise5.push(Promise.resolve(5));
    // myPromise5.push(Promise.reject("pepe"));
    // myPromise5.push(Promise.resolve(45));
    // myPromise5.push(Promise.reject(-1));
    // myPromise5.push(Promise.resolve(false));


    // let resultados2 = Promise.allSettled(myPromise5);  

    // resultados2.then(function(okvalue){
    //     info.innerHTML=okvalue;

    // }).catch(function(err){
    //         info.innerHTML=err;
    // })


/*EJEMPLO 3*/
/*Async y await*/ 

/**Async--> Convierte la funcion en asincrona, devolviendo siempre una promesa aunque veamos un valor normal, 
 * permite dentro el await y nos facilita la escritura de codigo  */

        // let result = helloWord();
        // console.log(result);

        // result
        // .then(function (val) {
        //     info.innerText = "Valor obtenido de la promesa: " + val;
        // }).catch(function (err) {
        //     info.innerText = "Error: " + err;
        // })


        // async function helloWord(){
        //     return "hello!!";
        // }

/**
 * Await --> Va dentro de la funcion async, detiene la ejecución de la funcion hasta que esta se resuelva o falle,
 */
        // function resolverDespuesDe2Segundos() {
        //     return new Promise(resolve => {
        //         setTimeout(() => {
        //             resolve("resuelta!");
        //         }, 2000);
        //     });
        // }
        // async function asyncCall() {
        //     console.log("Llamando…");
        //     var result = await resolverDespuesDe2Segundos();
        //     console.log(result); // Salida esperada: “resuelta!”
        // }
        // asyncCall();
        // console.log("El código sigue ejecutándose...");



        // const count = 100;
        // function promiseSqrt(value) {
        //     return new Promise(function (resolve, reject) {
        //         console.log('START execution with value = ' + value);
        //         setTimeout(function () {
        //             resolve({ value: value, result: value * value });
        //         }, 1500);
        //     });
        // }
        // //si quitamos el await se ejecutara antes que la promise porque no tendra valores validos
        // async function run() {
        //     for (let n = 0; n <= 9; n++) {
        //         var obj = await promiseSqrt(n);
        //         console.log('END execution with value = ' + obj.value + ' and result = ' +
        //             obj.result);
        //     }
        // }
        // let myPromise = run();
        // console.log(myPromise);
        // // Probamos que el código sigue ejecutándose mientras la promesa está pendiente:
        // for (let i = 0; i < count; i++) {
        //     console.log("Value of i = " + i);
        // }
///////////////////////////////////////////////////////////////////////////

//cogemos los datos del campo de texto al clclar el boton, ejecutando una promesa 
// donde saca un resolve si encuentra "daw" o reject si no encuentra daw " "

            // boton.onclick=function(){
            //     let myPromise = new Promise(function(resolve,reject){
            //         if(texto.value != "daw"){
            //             throw Error("no es daw");
            //         }else{
            //             resolve(texto.value)
            //         }
            //     }).then(function(resultado){
            //         info.innerHTML="Palabra correcta :"+resultado;
            //     }).catch(function(error){
            //         info.innerHTML="<span style='color:red;'>"+error+"</span>";
            //     });
            // }


// let textToFind = "daw";

// document.getElementById("boton").addEventListener("click", function () {
//         info.innerHTML += "Empezando la búsqueda...<br>";
//         let result = findText();

//         info.innerHTML += result;
// })

// async function findText() {
//     let found = findInText();
//     info.innerHTML += "La búsqueda ha terminado ...<br>";
//     return found;
// }

// function findInText() {
//     info.innerHTML += "Buscando " + textToFind + " en el texto....<br>";
//     let texto = document.getElementById("num").value;

//     if (texto === "") return false;

//     return texto.match(textToFind);
// }



// if (typeof Worker) {
//     let myWorker = new Worker("webWorker.js");

//     myWorker.addEventListener("message",function(event){
//         info.innerHTML = event.data;
//          myWorker.terminate();
//         myWorker = undefined;
//     })
// }
// else {
//     console.error("No Worker!")
// } 

// console.log("sigue ejecutando...")