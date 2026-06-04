document.getElementById("btnLogin").addEventListener("click", validarLogin);

function validarLogin() {
  let login = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;

  let xml = `
    <credenciales>
        <login>${login}</login>
        <password>${password}</password>
    </credenciales>
  `;

  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {

      let respuesta = xhr.responseXML;

      let status = respuesta.querySelector("status").textContent;

      if (status === "success") {
        let rol = respuesta.querySelector("rol").textContent;
        let fecha = respuesta.querySelector("fecha_registro").textContent;

        document.getElementById("resultado").textContent =
          "Login correcto\nRol: " + rol + "\nFecha registro: " + fecha;

      } else {
        let msg = respuesta.querySelector("message").textContent;
        document.getElementById("resultado").textContent = "Error: " + msg;
      }
    }
  };

  xhr.open("POST", "server/loginXML.php", true);
  xhr.setRequestHeader("Content-Type", "application/xml");
  xhr.send(xml);
}
