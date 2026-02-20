
//esta funcion creacookies
function setCookie(nombre, valor, dias,fecha) {
  let expires = "";
  if (fechaExpiracion) {
    // Adaptar formato a formato compatible con Date
    const fechaFormateada = fechaExpiracion.replace(' ', 'T');
    expires = "; expires=" + new Date(fechaFormateada).toUTCString();
  } else if (dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
    expires = "; expires=" + fecha.toUTCString();
  }

  document.cookie = `${nombre}=${encodeURIComponent(valor)}${expires}; path=/`;
}

//esta funcion saca cookies
function getCookie(nombre) {
  const name = nombre + "=";
  const partes = document.cookie.split(";");
  for (let c of partes) {
    c = c.trim();
    if (c.indexOf(name) === 0) return c.substring(name.length);
  }
  return "";
}

//funcion para ver si la cookie existe 
function existeCookie(nombre) { 
  return getCookie(nombre) !== null
}


//funcion para borrar cookies 
function borrarCokie(nombre){
    if(existeCookie(nombre)){
      document.cookie = "nombre=";
      document.cookie = "email=";
    }else{
      alert("no existen cookies");
    }
}


//exportamos a la clase main para poder usarlas 
export const CookieUtils = { getCookie, existeCookie, setCookie ,borrarCokie}





//parte dos 
if (!localStorage.cuenta) {
    localStorage.cuenta = 0;
}

// Si ya existe, la incrementamos
localStorage.cuenta = parseInt(localStorage.cuenta) + 1;

// Mostramos el valor en pantalla
document.getElementById("cuenta").textContent = localStorage.cuenta;