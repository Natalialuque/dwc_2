//PRIMER MAIN
document.getElementById("btnTexto").addEventListener("click", () => {
  fetch("server/datos.txt")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("resultado").textContent = data;
    })
    .catch((err) => console.error(err));
});

//SEGUND MAIN
document.getElementById("btnJSON").addEventListener("click", () => {
  fetch("server/datos.json")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("resultado").textContent =
        "Nombre: " +
        data.nombre +
        "\nCurso: " +
        data.curso +
        "\nNivel: " +
        data.nivel;
    })
    .catch((err) => console.error(err));
});

//TERCER MAIN 
 document.getElementById("btnXML").addEventListener("click", () => {
     fetch("server/datos.xml")
         .then(res => res.text())
         .then(xmlString => {
             const parser = new DOMParser();
             const xml = parser.parseFromString(xmlString, "text/xml");

             const nombre = xml.querySelector("nombre").textContent;
             const nivel = xml.querySelector("nivel").textContent;
             const alumno = xml.querySelector("alumno").textContent;

             document.getElementById("resultado").textContent =
                 "Curso: " + nombre +
                 "\nNivel: " + nivel +
                 "\nAlumno: " + alumno;
         })
         .catch(err => console.error(err));
});

//CUARTO MAIN
document.getElementById("btnHTML").addEventListener("click", () => {
  fetch("server/datos.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("resultado").innerHTML = html;
    })
    .catch((err) => console.error(err));
});

//QUINTO MAIN
document.getElementById("btnPHP").addEventListener("click", () => {
  fetch("server/datos.php")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("resultado").textContent =
        data.mensaje + "\nFecha: " + data.fecha;
    })
    .catch((err) => console.error(err));
});


