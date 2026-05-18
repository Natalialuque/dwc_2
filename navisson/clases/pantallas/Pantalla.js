// Clase que representa una pantalla del inventario
export class Pantalla {
    // Constructor: recibe los datos y los guarda en propiedades del objeto
    constructor(datos) {
        // Referencia única de la pantalla, siempre en mayusculas
        this.referencia = String(datos.referencia || datos.id).trim().toUpperCase();
        // Nombre o modelo de la pantalla
        this.nombre = String(datos.nombre).trim();
        // tamaño convertido a número
        this.tamano = Number(datos.tamano);
        // Tipo de pantalla
        this.tipo = String(datos.tipo).trim();
        // Estado actual de la pantalla
        this.estado = String(datos.estado).trim();
        // Precio convertido a número
        this.precio = Number(datos.precio);
        // Fecha de fabricacion
        this.fechaFabricacion = datos.fechaFabricacion || datos.FechaFabricacion;
        // Imagen de la pantalla: puede ser una ruta en src o una imagen subida en base64
        this.imagen = datos.imagen || "src/navisson-logo.png";
    }

    // Convierte la instancia en un objeto normal para poder guardarlo en JSON
    convertirObjeto() {
        // Devolvemos solo datos simples
        return {
            referencia: this.referencia,
            nombre: this.nombre,
            tamano: this.tamano,
            tipo: this.tipo,
            estado: this.estado,
            precio: this.precio,
            fechaFabricacion: this.fechaFabricacion,
            imagen: this.imagen
        };
    }

    // Devuelve el precio con formato de euros
    obtenerPrecioFormateado() {
        // Intl.NumberFormat formatea el número según Espana y moneda EUR
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR"
        }).format(this.precio);
    }

    // Calcula cuantos dias han pasado desde la fabricacion
    obtenerDiasDesdeFabricacion() {
        // Conbertimos la fecha de fabricacion a Date
        const fecha = new Date(this.fechaFabricacion);
        // Fecha actual
        const hoy = new Date();
        // Cantidad de milisegundos que tiene un dia
        const milisegundosDia = 1000 * 60 * 60 * 24;

        // Restamos fechas, dividimos entre dias y evitamos números negativos
        return Math.max(0, Math.floor((hoy - fecha) / milisegundosDia));
    }

    // método estático para crear pantallas desde objetos normales
    static crear(datos) {
        // Devuelve una nueva instancia de Pantalla
        return new Pantalla(datos);
    }
}


