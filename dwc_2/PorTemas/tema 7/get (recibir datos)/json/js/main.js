let boton = document.getElementById("boton");
let respuesta = document.getElementById("respuesta");

boton.onclick = function () {

    fetch("server/clima.json")
        .then(res => res.json())
        .then(dato => {

            let texto = "";

            // 1. Campos simples
            texto += "Estación: " + dato.estacion_meteorologica + "\n";
            texto += "Última actualización: " + dato.fecha_actualizacion + "\n\n";

            // 2. Objeto: ubicacion
            texto += "UBICACIÓN\n";
            texto += "Ciudad: " + dato.ubicacion.ciudad + "\n";
            texto += "Provincia: " + dato.ubicacion.provincia + "\n";
            texto += "País: " + dato.ubicacion.pais + "\n";
            texto += "Latitud: " + dato.ubicacion.coordenadas.latitud + "\n";
            texto += "Longitud: " + dato.ubicacion.coordenadas.longitud + "\n\n";

            // 3. Climatología
            texto += "CLIMATOLOGÍA ACTUAL\n";
            texto += "Temperatura: " + dato.climatologia_actual.temperatura_c + "°C\n";
            texto += "Sensación térmica: " + dato.climatologia_actual.sensacion_termica_c + "°C\n";
            texto += "Humedad: " + dato.climatologia_actual.humedad_relativa + "%\n";
            texto += "Presión: " + dato.climatologia_actual.presion_atmosferica_hpa + " hPa\n";
            texto += "Estado del cielo: " + dato.climatologia_actual.estado_cielo + "\n";
            texto += "Punto de rocío: " + dato.climatologia_actual.punto_rocio_c + "°C\n";
            texto += "Visibilidad: " + dato.climatologia_actual.visibilidad_m + " m\n\n";

            // 4. Viento
            texto += "VIENTO\n";
            texto += "Velocidad: " + dato.climatologia_actual.viento.velocidad_kmh + " km/h\n";
            texto += "Dirección: " + dato.climatologia_actual.viento.direccion + "\n";
            texto += "Descripción: " + dato.climatologia_actual.viento.descripcion + "\n\n";

            // 5. Astronomía
            texto += "ASTRONOMÍA\n";
            texto += "Amanecer: " + dato.astronomia.amanecer + "\n";
            texto += "Atardecer: " + dato.astronomia.atardecer + "\n";
            texto += "Fase lunar: " + dato.astronomia.fase_lunar + "\n\n";

            // 6. Alertas (array)
            texto += "ALERTAS\n";

            for (let alerta of dato.alertas) {
                texto += "-------------------------\n";
                texto += "Nivel: " + alerta.nivel + "\n";
                texto += "Tipo: " + alerta.tipo + "\n";
                texto += "Descripción: " + alerta.descripcion + "\n";
                texto += "Inicio: " + alerta.inicio + "\n";
                texto += "Fin: " + alerta.fin + "\n\n";
            }

            // Mostrar todo como texto plano
            respuesta.textContent = texto;
        });
};
