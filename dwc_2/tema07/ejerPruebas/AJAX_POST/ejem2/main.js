document.getElementById("btnLogin").addEventListener("click", validarLogin);

function validarLogin() {
  let login = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;

  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);

        if (data.status === "success") {
          document.getElementById("resultado").textContent =
            "Login correcto\nRol: " + data.rol +
            "\nFecha registro: " + data.fecha_registro;
        } else {
          document.getElementById("resultado").textContent =
            "Error: " + data.message;
        }
      } else {
        document.getElementById("resultado").textContent =
          "Error en la petición: " + xhr.status;
      }
    }
  };

  xhr.open("POST", "server/login.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  // Enviar JSON
  let datos = JSON.stringify({
    login: login,
    password: password
  });

  xhr.send(datos);
}
