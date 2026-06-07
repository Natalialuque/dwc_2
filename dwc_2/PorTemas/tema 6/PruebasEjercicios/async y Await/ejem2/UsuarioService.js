export class UsuarioService {
  
  obtenerUsuario() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id: 1, nombre: "Ana" });
      }, 1000);
    });
  }

}
