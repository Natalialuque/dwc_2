let info = document.getElementById("info");
let texto = document.getElementById("num");
let boton = document.getElementById("boton");



boton.onclick=function(){

 let myPromise1 = new Promise(function(resolve,reject){

    const array=[];

    let inicio = performance.now(); // tiempo inicial

    //crear array numeros aleatorios 
    for(let i=0;i<texto.value ; i++){
    array.push(Math.floor(Math.random() * 100000) + 1);  
    }
   
    let fin = performance.now(); // tiempo final

    const tiempo = fin - inicio;
    if(tiempo<2){
        resolve(array);
    }else{
        reject(tiempo);
    }


}).then(function(array){
     info.innerHTML=array.join(" ,");

}).catch(function(tiempo){
info.innerHTML = `<span style="color:red;"> Tarea demasiado larga (${tiempo.toFixed(4)} ms) </span>`;
 
});

}