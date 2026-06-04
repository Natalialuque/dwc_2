// carga los equipos del json y rellena el select con sus logos
async function cargarLogos() {
    try {
        const resp = await fetch("/server/equipos/equipos.json?t=" + Date.now());
        const datos = await resp.json();
        const equipos = datos.teams.filter(e => e.crest && e.shortName);

        const select = document.getElementById("selectLogo");
        equipos.forEach(equipo => {
            const option = document.createElement("option");
            option.value = equipo.crest;
            option.textContent = equipo.shortName;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error cargando logos:", error);
    }
}

cargarLogos();

// actualiza la imagen
document.getElementById("selectLogo").addEventListener("change", function () {
    const preview = document.getElementById("previewImg");
    if (this.value) {
        preview.src = this.value;
        preview.style.display = "block";
    } else {
        preview.style.display = "none";
    }
});

function validarFormulario() {
    let valido = true;

    const crest   = document.getElementById("selectLogo").value;
    const nombre  = document.getElementById("inputNombre").value.trim();
    const fundado = document.getElementById("inputFundado").value.trim();
    const estadio = document.getElementById("inputEstadio").value.trim();
    const web     = document.getElementById("inputWeb").value.trim();

    document.querySelectorAll(".form-error").forEach(e => e.textContent = "");
    document.getElementById("mensajeExito").style.display = "none";

    if (!crest) {
        document.getElementById("errorLogo").textContent = "Debes seleccionar un logo.";
        valido = false;
    }

    const regexpNombre = /^[a-zA-ZÀ-ÿ\s'\-]{2,50}$/;
    if (!regexpNombre.test(nombre)) {
        document.getElementById("errorNombre").textContent = "Nombre inválido. Solo letras y espacios, entre 2 y 50 caracteres.";
        valido = false;
    }

    const regexpAño = /^\d{4}$/;
    const añoActual = new Date().getFullYear();
    if (!regexpAño.test(fundado) || parseInt(fundado) < 1800 || parseInt(fundado) > añoActual) {
        document.getElementById("errorFundado").textContent = "Año inválido. Debe ser un año entre 1800 y " + añoActual + ".";
        valido = false;
    }

    if (estadio.length < 2) {
        document.getElementById("errorEstadio").textContent = "El nombre del estadio debe tener al menos 2 caracteres.";
        valido = false;
    }

    const regexpWeb = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+/;
    if (web && !regexpWeb.test(web)) {
        document.getElementById("errorWeb").textContent = "URL inválida. Ejemplo: www.miequipo.com";
        valido = false;
    }

    return valido;
}

document.getElementById("formCrearEquipo").addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!validarFormulario()) return;

    const crest   = document.getElementById("selectLogo").value;
    const nombre  = document.getElementById("inputNombre").value.trim();
    const fundado = document.getElementById("inputFundado").value.trim();
    const estadio = document.getElementById("inputEstadio").value.trim();
    const web     = document.getElementById("inputWeb").value.trim();

    const webFinal = web && !web.startsWith("http") ? "https://" + web : web;
    const nuevoEquipo = { shortName: nombre, founded: fundado, venue: estadio, website: webFinal, crest };

    try {
        const resp = await fetch("/server/equipos/guardar-equipo.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoEquipo)
        });
        const resultado = await resp.json();

        if (resultado.exito) {
            const favs = JSON.parse(localStorage.getItem("favoritos")) || {};
            favs[nombre] = { shortName: nombre, founded: fundado, venue: estadio, website: webFinal, crest };
            localStorage.setItem("favoritos", JSON.stringify(favs));

            document.getElementById("mensajeExito").style.display = "block";
            this.reset();
            document.getElementById("previewImg").style.display = "none";
        } else {
            alert("Error al guardar el equipo: " + (resultado.error || "Error desconocido"));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con el servidor.");
    }
});

document.getElementsByClassName("logo-container")[0].addEventListener("click", function (e) {
    e.preventDefault();
    location.reload();
});

document.getElementById("btnCerrar").addEventListener("click", function (e) {
    e.preventDefault();
    window.close();
});
