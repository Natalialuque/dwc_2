let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");

boton.onclick = function () {

    //Crear el XML con los datos del formulario
    let xml = 
        "<empleado>" +
            "<nombre>" + nombre.value.trim() + "</nombre>" +
            "<apellido>" + apellido.value.trim() + "</apellido>" +
        "</empleado>";

    // Enviar al servidor con fetch (POST)
    fetch("server/nuevoUser.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "datos=" + encodeURIComponent(xml)
    })
    .then(res => res.text()) // el PHP devuelve texto
    .then(dato => {
        // Mostrar la respuesta del servidor
        respuesta.textContent = "Servidor: " + dato;
    })
    .catch(err => {
        respuesta.textContent = "Error al enviar XML: " + err;
    });
};
