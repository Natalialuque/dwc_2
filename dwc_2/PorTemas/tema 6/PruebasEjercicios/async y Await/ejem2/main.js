import { UsuarioService } from "./UsuarioService.js";
import { PedidosService } from "./PedidosService.js";

const usuarioService = new UsuarioService();
const pedidosService = new PedidosService();

async function cargarDatos() {
  const div = document.getElementById("resultado");

  try {
    div.textContent = "Cargando datos...";

    const usuario = await usuarioService.obtenerUsuario();
    const pedidos = await pedidosService.obtenerPedidos(usuario.id);

    div.innerHTML = `
      <h3>Usuario:</h3>
      <p>ID: ${usuario.id}</p>
      <p>Nombre: ${usuario.nombre}</p>

      <h3>Pedidos:</h3>
      <ul>
        ${pedidos.map(p => `<li>${p.producto}</li>`).join("")}
      </ul>
    `;
  } catch (error) {
    div.textContent = "Error al cargar los datos: " + error;
  }
}

document.getElementById("btn").addEventListener("click", cargarDatos);
