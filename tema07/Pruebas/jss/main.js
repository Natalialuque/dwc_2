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


// //al enlace le damos evento para que cuando lo pulsemos redirija
// document.getElementById("leer").addEventListener("click",()=>{
//     let xhr = new XMLHttpRequest();

//     //xhr.responseType="text";
//     xhr.onreadystatechange = function(){
//         if((xhr.readyState == 4) && (xhr.status==200)){
//             //procesamos respuesta del server
//             var alumnos = xhr.responseXML;
//             alumnos = alumnos.getElementsByTagName("usuarios")[0].getElementsByTagName("usuario");
//             console.dir("nombre: "+alumnos[1].getElementsByTagName("nombre")[0].textContent);
//             info.innerHTML="Nombre :"+alumnos[1].getElementsByTagName("nombre")[0].textContent;
//         }
//     }

//     //esto establece la conexion con lo que queremos mostrar
//     //xhr.open("GET","http://localhost/DWC/tema07/Pruebas/server/hello.php?login=pepe&pass=1234");
//     xhr.open("GET","http://localhost/DWC/tema07/Pruebas/server/alumnos.xml");

//     //ESTABLECER CABECERA AL ENVIAR DATOS ALWAYS
//    // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
//     //xhr.send("login=pepe&pass=1234");
//     xhr.send();
//     //xhr.send(JSON.stringify(alumnos)); PARA PODER ENVIAR EL JSON COMO CADENA


// });


//vamos a hacer lo mismo con jSon


/////
/**
 * FECTH
 */
document.getElementById("leer").addEventListener("click",()=>{

    const resp=fetch("http://localhost/DWC/tema07/Pruebas/server/hello.php",{
        //para hacer get quitamos el method, dejamos headers y el body entra en el url de arriba con un ?

        method:"POST",
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        body:"usuario=Pepe&pass=1234"
    });

    resp.then(function(resp){
        if(resp.ok){
            info.innerHTML="Respuesta"+resp;
            console.log(resp);

            resp.text()
            .then(function(data){
                info.innerHTML=" valor:"+data;
            }).catch(function(err){
                info.innerHTML="ERROR"+err;

            });
        }
        
    })
    .catch(function(err){
        info.innerHTML="ERROR"+err;
    });


});