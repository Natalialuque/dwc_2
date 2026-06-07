export class PedidosService {
  obtenerPedidos(idUsuario) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: 1, producto: "Libro" },
          { id: 2, producto: "Auriculares" }
        ]);
      }, 1500);
    });
  }
}
