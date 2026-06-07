// Array donde se guardarán los usuarios
let usuarios = [];

// Botón: Cargar usuario (guardar en array)
document.getElementById("boton").onclick = function () {

    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const edad = document.getElementById("edad").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const trabajo = document.getElementById("trabajo").value;

    const usuario = { nombre, apellidos, edad, telefono, email, trabajo };
    usuarios.push(usuario);

    alert("Usuario guardado correctamente");
};


// Botón: Mostrar usuarios (crear tarjetas con promesas)
document.getElementById("boton2").onclick = function () {

    const contenedor = document.getElementById("contenedor");

    if (!contenedor) {
        const nuevo = document.createElement("div");
        nuevo.id = "contenedor";
        document.body.appendChild(nuevo);
    }

    document.getElementById("contenedor").innerHTML = "";

    usuarios.forEach(usuario => {

        const promesa = new Promise((resolve, reject) => {

            if (usuario.nombre === "" || usuario.email === "") {
                reject("Faltan datos obligatorios");
                return;
            }

            const tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta";

            const p1 = document.createElement("p");
            p1.textContent = "Name: " + usuario.nombre;

            const p2 = document.createElement("p");
            p2.textContent = "Surname: " + usuario.apellidos;

            const p3 = document.createElement("p");
            p3.textContent = "Age: " + usuario.edad;

            const p4 = document.createElement("p");
            p4.textContent = "Phone: " + usuario.telefono;

            const p5 = document.createElement("p");
            p5.textContent = "Email: " + usuario.email;

            const p6 = document.createElement("p");
            p6.textContent = "Job: " + usuario.trabajo;

            const btnDelete = document.createElement("button");
            btnDelete.textContent = "Delete";
            btnDelete.className = "delete";

            const btnUpload = document.createElement("button");
            btnUpload.textContent = "Upload";
            btnUpload.className = "upload";

            tarjeta.appendChild(p1);
            tarjeta.appendChild(p2);
            tarjeta.appendChild(p3);
            tarjeta.appendChild(p4);
            tarjeta.appendChild(p5);
            tarjeta.appendChild(p6);
            tarjeta.appendChild(btnDelete);
            tarjeta.appendChild(btnUpload);

            resolve(tarjeta);
        });

        promesa
            .then(tarjeta => {
                document.getElementById("contenedor").appendChild(tarjeta);
            })
            .catch(err => {
                alert("Error:", err);
            });
    });
};


