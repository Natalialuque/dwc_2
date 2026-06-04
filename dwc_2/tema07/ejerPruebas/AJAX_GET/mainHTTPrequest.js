//PRIMER MAIN
document.getElementById("btnTexto").addEventListener("click", () => {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      document.getElementById("resultado").textContent = xhr.responseText;
    }
  };

  xhr.open("GET", "server/datos.txt", true);
  xhr.send(null);
});


//SEGUNDO MAIN
document.getElementById("btnJSON").addEventListener("click", () => {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);

      document.getElementById("resultado").textContent =
        "Nombre: " + data.nombre +
        "\nCurso: " + data.curso +
        "\nNivel: " + data.nivel;
    }
  };

  xhr.open("GET", "server/datos.json", true);
  xhr.send(null);
});



//TERCER MAIN 
document.getElementById("btnXML").addEventListener("click", cargarXML);

function cargarXML() {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {if (xhr.status === 200) {
        // Aquí procesamos el XML
        let xml = xhr.responseXML;

        let nombre = xml.querySelector("nombre").textContent;
        let nivel = xml.querySelector("nivel").textContent;
        let alumno = xml.querySelector("alumno").textContent;

        document.getElementById("resultado").textContent =
          "Curso: " + nombre + "\nNivel: " + nivel + "\nAlumno: " + alumno;
      }
    }
  };

  xhr.open("GET", "server/datos.xml", true);
  xhr.send();
}


//QUINTO MAIN
document.getElementById("btnPHP").addEventListener("click", () => {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);

      document.getElementById("resultado").textContent =
        data.mensaje + "\nFecha: " + data.fecha;
    }
  };

  xhr.open("GET", "server/datos.php", true);
  xhr.send(null);
});


//CUARTO MAIN 
document.getElementById("btnHTML").addEventListener("click", () => {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      document.getElementById("resultado").innerHTML = xhr.responseText;
    }
  };

  xhr.open("GET", "server/datos.html", true);
  xhr.send(null);
});


