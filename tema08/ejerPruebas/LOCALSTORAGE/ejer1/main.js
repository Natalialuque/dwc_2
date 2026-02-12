// Si no existe la clave "cuenta", la creamos con valor 0
if (!localStorage.cuenta) {
    localStorage.cuenta = 0;
}

// Si ya existe, la incrementamos
localStorage.cuenta = parseInt(localStorage.cuenta) + 1;

// Mostramos el valor en pantalla
document.getElementById("cuenta").textContent = localStorage.cuenta;
