/**
 * envio de datos 
 */
export function envioDatos (datos,respuesta){
     // Enviar con fetch usando POST + JSON
    fetch("server/registro.php", {
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
}

/**
 * LECTURA
 */
export function reciboDatos(respuesta){
    fetch("server/posts.json")
        .then(res =>res.json())
        .then(dato => {
            let texto = "";

            // 1. Número total de usuarios
            texto += "Número total de usuarios registrados: " + dato.total + "\n\n";

            // 2. Recorrer cada post
            for (let p of dato.posts) {

                texto += "----------------------------------\n";
                texto += "Usuario: " + p.usuario.nombre + "\n";
                texto += "Imagen usuario: " + p.usuario.img + "\n\n";

                texto += "Fecha: " + p.post.fecha + "\n";
                texto += "Hora: " + p.post.hora + "\n";
                texto += "Texto del mensaje: " + p.post.texto + "\n";
                texto += "Imagen del mensaje: " + p.post.img + "\n";
                texto += "Likes: " + p.post.likes + "\n\n";

                texto += "Comentarios:\n";
                for (let c of p.post.comentarios) {
                    texto += " - " + c.usuario + ": " + c.texto + "\n";
                }

                texto += "\n";
            }

            respuesta.textContent = texto;


        }).catch(err=>{
             respuesta.textContent="error";
        });

}