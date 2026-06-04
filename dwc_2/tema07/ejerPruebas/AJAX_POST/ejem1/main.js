document.getElementById("btnLogin").addEventListener("click", validarLogin);

function validarLogin() {
  let usuario = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;

  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);

      document.getElementById("resultado").textContent =
        data.mensaje + "\nFecha: " + data.fecha;
    }
  };

  xhr.open("POST", "server/login.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  let datos =
    "usuario=" + encodeURIComponent(usuario) +
    "&password=" + encodeURIComponent(password);

  xhr.send(datos);
}
