//serie de funciones para controlar todo el tema de las cookies 

//crear cookie 
function setCookie(nombre, valor, dias = null, fecha = null, path = "/", secure = false, samesite = "Lax") {
  let extras = "";

  if (fecha) {
    extras += "; expires=" + new Date(fecha).toUTCString();
  } else if (dias) {
    const d = new Date();
    d.setTime(d.getTime() + dias * 24 * 60 * 60 * 1000);
    extras += "; expires=" + d.toUTCString();
  }

  extras += "; path=" + path;
  extras += "; samesite=" + samesite;
  if (secure) extras += "; secure";

  document.cookie = `${nombre}=${encodeURIComponent(valor)}${extras}`;
}


//obtener cookie 
function getCookie(nombre) {
  const name = nombre + "=";
  const partes = document.cookie.split(";");

  for (let c of partes) {
    c = c.trim();
    if (c.indexOf(name) === 0) {
      return decodeURIComponent(c.substring(name.length));
    }
  }
  return "";
}


//comprobar si existe 
function existeCookie(nombre) {
  return getCookie(nombre) !== "";
}


//borrar cookie 
function borrarCookie(nombre) {
  if (existeCookie(nombre)) {
    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  } else {
    alert("La cookie no existe");
  }
}


//exportamos a mi main 
export const CookieUtils = { getCookie, existeCookie, setCookie ,borrarCookie}
