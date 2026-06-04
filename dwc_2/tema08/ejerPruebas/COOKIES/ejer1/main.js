
function setCookie(nombre, valor, dias) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + dias*24*60*60*1000);
  document.cookie = nombre + "=" + valor + ";expires=" + fecha.toUTCString() + ";path=/";
}

function getCookie(nombre) {
  const name = nombre + "=";
  const partes = document.cookie.split(";");
  for (let c of partes) {
    c = c.trim();
    if (c.indexOf(name) === 0) return c.substring(name.length);
  }
  return "";
}

const select = document.getElementById("idioma");

// Cargar cookie
const idiomaGuardado = getCookie("idioma");
if (idiomaGuardado) select.value = idiomaGuardado;

// Guardar cookie al cambiar
select.addEventListener("change", () => {
  setCookie("idioma", select.value, 7);
});

