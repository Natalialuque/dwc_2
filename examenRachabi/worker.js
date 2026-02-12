import { DOMINIO } from "./global.js"

const mainCache = await caches.open("main")

const promesas = Promise.allSettled([
  mainCache.add(`${DOMINIO}/index.html`),
  mainCache.add(`${DOMINIO}/css/style.css`),
  mainCache.add(`${DOMINIO}/dom.js`),
  mainCache.add(`${DOMINIO}/global.js`),
  mainCache.add(`${DOMINIO}/server/datos.xml`)
])

promesas.then(() => postMessage({ finalizado: true }))
promesas.catch(err => postMessage({ finalizado: false, mensaje: err }))

addEventListener("message", async e => {
  if (e.data.imagen) {
    mainCache.add(e.data.imagen)
  }
})
