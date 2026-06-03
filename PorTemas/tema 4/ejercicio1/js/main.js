// Referencias
const input = document.getElementById("textoTarea");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");


// -----------------------------
// FUNCIÓN 1: Crear un <li>
// -----------------------------
function crearTarea(texto) {
    let li = document.createElement("li");
    let contenido = document.createTextNode(texto);
    li.appendChild(contenido);

    // Evento para borrar al hacer clic
    li.onclick = function () {
        this.remove();
        actualizarContador();
    };

    return li;
}


// -----------------------------
// FUNCIÓN 2: Agregar al final
// -----------------------------
function agregarTarea() {
    if (input.value.trim() === "") return;

    let li = crearTarea(input.value);
    lista.appendChild(li);
    actualizarContador();
}


// -----------------------------
// FUNCIÓN 3: Insertar al principio
// -----------------------------
function insertarPrimero() {
    if (input.value.trim() === "") return;

    let li = crearTarea(input.value);

    if (lista.firstElementChild) {
        lista.insertBefore(li, lista.firstElementChild);
    } else {
        lista.appendChild(li);
    }

    actualizarContador();
}


// -----------------------------
// FUNCIÓN 4: Reemplazar el último
// -----------------------------
function reemplazarUltimo() {
    if (!lista.lastElementChild) return;

    let nuevo = crearTarea("Elemento reemplazado");
    lista.replaceChild(nuevo, lista.lastElementChild);

    actualizarContador();
}


// -----------------------------
// FUNCIÓN 5: Clonar el primero
// -----------------------------
function clonarPrimero() {
    if (!lista.firstElementChild) return;

    let clon = lista.firstElementChild.cloneNode(true);

    // Reasignar evento de borrado
    clon.onclick = function () {
        this.remove();
        actualizarContador();
    };

    lista.appendChild(clon);
    actualizarContador();
}


// -----------------------------
// FUNCIÓN 6: Actualizar contador
// -----------------------------
function actualizarContador() {
    contador.textContent = "Número de tareas: " + lista.childElementCount;
}


// -----------------------------
// ASIGNACIÓN DE EVENTOS A BOTONES
// -----------------------------
document.getElementById("btnAgregar").onclick = agregarTarea;
document.getElementById("btnInsertarPrimero").onclick = insertarPrimero;
document.getElementById("btnReemplazarUltimo").onclick = reemplazarUltimo;
document.getElementById("btnClonarPrimero").onclick = clonarPrimero;
