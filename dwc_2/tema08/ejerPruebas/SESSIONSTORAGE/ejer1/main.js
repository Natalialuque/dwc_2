// Mostrar el nombre si ya existe en sessionStorage
if (sessionStorage.getItem("nombre")) {
    document.getElementById("mensaje").textContent =
        "Bienvenida, " + sessionStorage.getItem("nombre");
}

// Guardar nombre
document.getElementById("guardar").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value;
    sessionStorage.setItem("nombre", nombre);
    document.getElementById("mensaje").textContent = "Bienvenida, " + nombre;
});

// Borrar nombre
document.getElementById("borrar").addEventListener("click", () => {
    sessionStorage.removeItem("nombre");
    document.getElementById("mensaje").textContent = "";
});
