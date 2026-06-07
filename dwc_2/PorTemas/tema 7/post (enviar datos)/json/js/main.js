let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");

boton.onclick = function () {

    // Crear el objeto JSON
    let datos = {
        nombre: nombre.value.trim(),
        apellidos: apellido.value.trim()
    };

    // Enviar con fetch usando POST + JSON
    fetch("server/eliminaUsuarios.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"   // IMPORTANTE
        },
        body: JSON.stringify(datos)              // Convertimos a JSON
    })
    .then(res => res.text())                     // PHP devuelve texto
    .then(dato => {
        respuesta.textContent = dato;            // Mostrar respuesta
    })
    .catch(err => {
        respuesta.textContent = "Error: " + err;
    });
};
