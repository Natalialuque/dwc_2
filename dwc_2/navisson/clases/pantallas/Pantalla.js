/**
 * Clase de las pantallas 
 *  
 * */ 
export class Pantalla {
    // Constructor, recibe los datos y los guarda en propiedades del objeto
    constructor(datos) {
        // Referencia unica de la pantalla, siempre en mayusculas
        this.referencia = String(datos.referencia || datos.id).trim().toUpperCase();
        // Nombre o modelo de la pantalla
        this.nombre = String(datos.nombre).trim();
        // Tamaño convertido a numero, lo mismo con n porque ñ da error
        this.tamano = Number(datos.tamano);
        // Tipo de pantalla
        this.tipo = String(datos.tipo).trim();
        // Estado actual de la pantalla
        this.estado = String(datos.estado).trim();
        // Precio convertido a numero
        this.precio = Number(datos.precio);
        // Fecha de fabricacion
        this.fechaFabricacion = datos.fechaFabricacion || datos.FechaFabricacion;
        // Imagen de la pantalla o la de por defecto del logo en caso de no subir 
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
        // Intl.NumberFormat formatea el numero segun Espana y moneda EUR
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR"
        }).format(this.precio);
    }

    // Calcula cuantos dias han pasado desde la fabricacion
    obtenerDiasDesdeFabricacion() {
        // Convertimos la fecha de fabricacion a Date
        const fecha = new Date(this.fechaFabricacion);
        // Fecha actual
        const hoy = new Date();
        // Cantidad de milisegundos que tiene un dia
        const milisegundosDia = 1000 * 60 * 60 * 24;

        // Restamos fechas, dividimos entre dias y evitamos numeros negativos
        return Math.max(0, Math.floor((hoy - fecha) / milisegundosDia));
    }

    // mtodo estatico para crear pantallas desde objetos normales
    static crear(datos) {
        // Devuelve una nueva instancia de Pantalla
        return new Pantalla(datos);
    }
}




