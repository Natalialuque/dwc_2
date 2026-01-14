// let info = document.getElementById("info");

// info.innerHTML="Hola mundo";
// //al enlace le damos evento para que cuando lo pulsemos redirija
// document.getElementById("leer").addEventListener("click",()=>{
//     let xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = function(){
//         console.log("estado"+xhr.readyState+" .Nivel: "+xhr.status);
//         if((xhr.readyState == 4) && (xhr.status==200)){
//             //respuesta del server 
//             document.getElementById("textoArea").value = xhr.responseText;
//         }
//     }

//     //esto establece la conexion con lo que queremos mostrar
//     xhr.open("GET","http://localhost/DWC/tema07/Pruebas/server/hello.txt");
//     xhr.send();
// });


/////////////////////////////////////////////////////////////
let info = document.getElementById("info");

info.innerHTML="Hola mundo";
//al enlace le damos evento para que cuando lo pulsemos redirija
document.getElementById("leer").addEventListener("click",()=>{
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if((xhr.readyState == 4) && (xhr.status==200)){
            info.innerHTML=xhr.response;
        }
    }

    //esto establece la conexion con lo que queremos mostrar
    xhr.open("GET","http://localhost/DWC/tema07/Pruebas/server/hello.php");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send("login=pepe&pass=1234");
});