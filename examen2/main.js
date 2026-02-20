//importar de cada clase
import { CookieUtils } from "./storage.js"
import {networks} from "./networks.js"
//import { crearDivArriba, crearDivClima,crearDivAstronomico,crearDivAlerta } from "./nodos.js";

//APARTADO 1 DE COOKIES
 const cookies = CookieUtils.existeCookie();

const login = document.getElementById("login");
 const email = document.getElementById("email");

 const HAY_LOGIN = CookieUtils.existeCookie("login")
const HAY_EMAIL = CookieUtils.existeCookie("email")

//esto escribe la cookie si la hay
 if (HAY_LOGIN && HAY_EMAIL) {
   const sesion = CookieUtils.obtenerCookie("login")
  login.value = sesion

   const sesion2 = CookieUtils.obtenerCookie("email")
   email.value = sesion2
 }

 if(login.value==="" || (email.value==="")){
    alert("INTRODUCE LOS CAMPOS");
 }

 document
  .getElementById("btn-login-user")
  .addEventListener("click", iniciarSesion);

async function iniciarSesion() {
  CookieUtils.crearCookie({
    nombre: "login",
    valor: login.value,
    dias: 7
  }),

  CookieUtils.crearCookie({
    nombre: "email",
    valor: email.value,
    dias: 7
  })

  
  
}

//APARTADO 2 COOKIES 



//APARTADO 3
const BotonBorrar = document.getElementById("btn-clear-storage")

BotonBorrar.onclick()=function(e){
    e.preventDefault();

    if(document.cookie!==""){
      CookieUtils.borrarCokie();
    }

    if(localStorage.length>0){
        localStorage.clear()
    }

     if(localStorage.length>0){
        sessionStorage.clear()
    }

}


//para que aprezca el Select Cargado
window.onload = () => {
  networks.leerTextoPlano();
  cargarSelect();
}



//CARGAR TEXTO PLANO 
const verCategoria = document.getElementById("load-terms");

verCategoria.onclick=function(){
  networks.leerTextoPlano();
};


//CARGAR XML
function cargarSelect(){
  networks.cargarXML();
}

//CARGAR JSON
// const ActualizarClima = document.getElementById("load-weather")
// ActualizarClima.onclick=function(){
 
//   //añadido al div
//   const divPrincipal = document.getElementById("info-display");

//   //para poder cargar
//   divPrincipal.appendChild(crearDivArriba);
//   divPrincipal.appendChild(crearDivClima);
//   divPrincipal.appendChild(crearDivAstronomico);
//   divPrincipal.appendChild(crearDivAlerta);

  
// }


//