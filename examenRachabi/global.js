/**
 * @typedef {{
 *  id: string,
 *  imagenes: string[],
 *  tipo: string,
 *  modelo: string,
 *  plazas: { para_dormir: number, para_viajar: number },
 *  logitud: number,
 *  altura: number,
 *  equipamiento: string[],
 *  disponibilidad: boolean
 * }} Vehiculo
 */

export const DOMINIO = `${location.protocol}//${location.hostname}/examen`

/**
 * @param {string} nombre Nombre de la cookie
 * @returns {string | null} El valor de la cookie, si existe, nulo en caso contrario
 */
function obtenerCookie(nombre) { 
  const name = nombre + "="
  const ca = document.cookie.split(';')

  for(let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ')
      c = c.substring(1)

    if (c.indexOf(name) === 0)
      return decodeURIComponent(c.substring(name.length, c.length))
  } 

  return null
}

/**
 * @param {string} nombre Nombre de la cookie
 * @returns Comprueba si la cookie existe en el documento (`document.cookie`)
 */
function existeCookie(nombre) { 
  return obtenerCookie(nombre) !== null
}

/**
 * Crea una cookie con el nombre y valor expecificados
 * Si el campos días y el campo `fechaExpiracion` estan presentes a la vez. Se tomará el valor de días finalmente.
 * 
 * @nota El campo `fechaExpiracion` esta especificado en formato japones: "YYYY-mm-dd hh:minsmins:ss"
 * @example
 * "2025-06-02 15:00:00"
 * /**
 *  * Y: los años, ya que hay 4 "Y", se debe especificar el año con 4 cifras
 *  * m: los meses, ya que hay 2 "m", se debe especificar el mes con 2 cifras
 *  * d: los días, ya que hay 2 "d", se debe especificar el día con 2 cifras
 *
 *  * h: las horas, ya que hay 2 "h", se debe especificar la hora con 2 cifras
 *  * mins: los minutos, ya que hay 2 "mins", se deben especificar los minutos con 2 cifras
 *  * s: los segundos, ya que hay 2 "s", se deben especificar los segundos con 2 cifras
 *  *\/
 * 
 * @param {{ nombre: string, valor: string, dias?: number, fechaExpiracion?: string }} param0
 * @example
 * // Esto creará una cookie con el nombre y valor especificados, que expira en 7 días y el 2 de junio de 2025 a las 3 de la tarde
 * // como se han especificado los días y la fecha de expiración a la vez, se tomará finalmente el campo `dias`. Por lo que tan solo expirará en 7 días
 * crearCookie({ nombre: "nombre_de_la_cookie", valor: "valor_de_la_cookie", dias: 7, fechaExpiracion: "2025-06-02 15:00:00" })
 */
function crearCookie({ nombre, valor, dias, fechaExpiracion }) {
  let expires = "";
  if (fechaExpiracion) {
    // Adaptar formato "2025-06-02 15:00:00" a formato compatible con Date
    const fechaFormateada = fechaExpiracion.replace(' ', 'T');
    expires = "; expires=" + new Date(fechaFormateada).toUTCString();
  } else if (dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
    expires = "; expires=" + fecha.toUTCString();
  }

  document.cookie = `${nombre}=${encodeURIComponent(valor)}${expires}; path=/`;
}

export const CookieUtils = { obtenerCookie, existeCookie, crearCookie }