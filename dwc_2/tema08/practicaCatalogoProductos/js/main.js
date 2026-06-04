// URL BASE
const BASE = "/DWC/tema08/practicaCatalogoProductos/server/PRODUCTS.JSON";

// array para poder meter los datos del json, ya que al añadir y modificar no tocamos el json
let productosCache = [];

// para poder ir cambiandonos de funcion 
window.onload = () => {
    document.getElementById("mostrar").addEventListener("click", mostrarProductos);
    document.getElementById("buscarP").addEventListener("click", buscarPorPrecio);
    document.getElementById("buscarT").addEventListener("click", buscarPorTitulo);
    document.getElementById("mostrarC").addEventListener("click", obtenerCategorias);
    document.getElementById("añadir").addEventListener("click", formularioNuevoProducto);
    document.getElementById("borrar").addEventListener("click", borrarProducto);

    //sacamos los productos en la carga incial
    mostrarProductos();
};

/**
 * Dos funciones para poder limpiar las tarjetas y las categorias para cuando añadimos o borramos 
 */
function limpiar() {
    document.getElementById("tarjetas").innerHTML = "";
}

function limpiarCategorias() {
    document.getElementById("categorias").innerHTML = "";
}

/**
 * 
 *Funcion para hacer la creacion de nodos
  Tengo que tener en cuenta que los datos del json estan en ingles y que necesito pasarselo asi en textContent para que no me de error 

 */
function crearTarjeta(prod, incluirBotonBorrar = false) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.id = "prod-" + prod.id;

    const titulo = document.createElement("h3");
    titulo.textContent = prod.title || prod.titulo;

    const img = document.createElement("img");
    img.src = prod.thumbnail;
    img.alt = prod.title || prod.titulo;

    const desc = document.createElement("p");
    desc.textContent = prod.description || prod.descripcion;

    const precio = document.createElement("p");
    precio.textContent = "Precio: " + (prod.price || prod.precio) + " €";

    const descuento = document.createElement("p");
    descuento.textContent = "Descuento: " + (prod.discountPercentage || prod.porcentajeDescuento) + " %";

    const rating = document.createElement("p");
    rating.textContent = "Puntuación: " + (prod.rating || prod.puntuación);

    const stock = document.createElement("p");
    stock.textContent = "Unidades: " + prod.stock;

    const marca = document.createElement("p");
    marca.textContent = "Fabricante: " + (prod.brand || prod.marca);

    const categoria = document.createElement("p");
    categoria.textContent = "Categoría: " + (prod.category || prod.categoria);

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(img);
    tarjeta.appendChild(desc);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(descuento);
    tarjeta.appendChild(rating);
    tarjeta.appendChild(stock);
    tarjeta.appendChild(marca);
    tarjeta.appendChild(categoria);

    //boton para el tema de borrar
    if (incluirBotonBorrar) {
        const btn = document.createElement("button");
        btn.textContent = "Borrar";
        btn.onclick = () => eliminarProducto(prod.id);
        tarjeta.appendChild(btn);
    }

    return tarjeta;
}

/* 
 *  MOSTRAR TODOS LOS PRODUCTOS (FETCH)
 */
function mostrarProductos() {
    limpiar();
    limpiarCategorias();

    fetch(BASE)
        .then(res => res.json())
        .then(datos => {
            productosCache = datos.products;

            //para obtener el numero total de productos
            document.getElementById("total").textContent =
                "Número de productos totales: " + productosCache.length;

            const cont = document.getElementById("tarjetas");

            productosCache.forEach(p => cont.appendChild(crearTarjeta(p)));
        })
        .catch(() => {
            document.getElementById("total").textContent =
                "Error al cargar los productos";
        });
}

/* 
*   BUSCAR POR PRECIO
 */
function buscarPorPrecio() {
    limpiar();
    limpiarCategorias();

    const cont = document.getElementById("tarjetas");

    const label = document.createElement("label");
    label.textContent = "Precio máximo: ";

    const input = document.createElement("input");
    input.type = "number";

    const btn = document.createElement("button");
    btn.textContent = "Buscar";

    btn.onclick = () => {
        limpiar();

        fetch(BASE)
            .then(res => res.json())
            .then(datos => {
                const filtrados = datos.products.filter(p => p.price <= input.value);

                filtrados.forEach(p => cont.appendChild(crearTarjeta(p)));

                document.getElementById("total").textContent =
                    "Resultados: " + filtrados.length;
            });
    };

    cont.appendChild(label);
    cont.appendChild(input);
    cont.appendChild(btn);
}

/* 
*   BUSCAR POR TÍTULO
 */
function buscarPorTitulo() {
    limpiar();
    limpiarCategorias();

    const cont = document.getElementById("tarjetas");

    const label = document.createElement("label");
    label.textContent = "Título contiene: ";

    const input = document.createElement("input");

    const btn = document.createElement("button");
    btn.textContent = "Buscar";

    btn.onclick = () => {
        limpiar();

        fetch(BASE)
            .then(res => res.json())
            .then(datos => {
                const filtrados = datos.products.filter(p =>
                    p.title.toLowerCase().includes(input.value.toLowerCase())
                );

                filtrados.forEach(p => cont.appendChild(crearTarjeta(p)));

                document.getElementById("total").textContent =
                    "Resultados: " + filtrados.length;
            });
    };

    cont.appendChild(label);
    cont.appendChild(input);
    cont.appendChild(btn);
}

/* 
*   OBTENER CATEGORÍAS (XHR)
 */
//la primera funcion es a la que llamos para que nos saque el como con las opciones 
function obtenerCategorias() {
    limpiar();
    limpiarCategorias();

    const xhr = new XMLHttpRequest();
    xhr.open("GET", BASE, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {

            const data = JSON.parse(xhr.responseText);
            const categorias = [...new Set(data.products.map(p => p.category))];

            //se queda mas limpio con lo de arriba, esto de abajo hace lo mismo
        // let categorias = data.products.map(p => p.category); // todas
        // categorias = categorias.filter((cat, i) => categorias.indexOf(cat) === i); // quitar duplicados

            const cont = document.getElementById("categorias");

            const select = document.createElement("select");

            categorias.forEach(cat => {
                const op = document.createElement("option");
                op.value = cat;
                op.textContent = cat;
                select.appendChild(op);
            });

            select.onchange = () => mostrarCategoria(select.value);

            cont.appendChild(select);
        }
    };

    xhr.send();
}

//y el segundo nos permite que al clicar una de ellas nos muestre las tarjetas con las categorias 
function mostrarCategoria(cat) {
    limpiar();

    const xhr = new XMLHttpRequest();
    xhr.open("GET", BASE, true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {

            const data = JSON.parse(xhr.responseText);
            const productos = data.products.filter(p => p.category === cat);

            const cont = document.getElementById("tarjetas");

            productos.forEach(p => cont.appendChild(crearTarjeta(p)));

            document.getElementById("total").textContent =
                "Productos en categoría: " + productos.length;
        }
    };

    xhr.send();
}

/* 
 *  MOSTRAR DESDE CACHE
 */
function mostrarProductosDesdeCache() {
    limpiar();
    limpiarCategorias();

    const cont = document.getElementById("tarjetas");

    productosCache.forEach(p => cont.appendChild(crearTarjeta(p)));

    document.getElementById("total").textContent =
        "Número de productos totales: " + productosCache.length;
}

/* 
*   FORMULARIO AÑADIR
 */
function formularioNuevoProducto() {
    limpiar();
    limpiarCategorias();

    const cont = document.getElementById("tarjetas");

    const form = document.createElement("form");

    const campos = [
        "titulo", "descripcion", "precio", "porcentajeDescuento",
        "puntuación", "stock", "marca", "categoria", "thumbnail"
    ];

    const inputs = {};

    campos.forEach(c => {
        const label = document.createElement("label");
        label.textContent = c + ": ";

        const input = document.createElement("input");
        input.name = c;

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement("br"));

        inputs[c] = input;
    });

    const btn = document.createElement("button");
    btn.textContent = "Añadir";

    btn.onclick = (ev) => {
        ev.preventDefault();

        const nuevo = {};
        campos.forEach(c => nuevo[c] = inputs[c].value);

        nuevo.id = Date.now(); // generar id único

        productosCache.push(nuevo);

        mostrarProductosDesdeCache();
    };

    form.appendChild(btn);
    cont.appendChild(form);
}

/* 
 *  BORRAR PRODUCTO (
 */
function borrarProducto() {
    limpiar();
    limpiarCategorias();

    fetch(BASE)
        .then(res => res.json())
        .then(datos => {
            productosCache = datos.products;

            const cont = document.getElementById("tarjetas");

            productosCache.forEach(p =>
                cont.appendChild(crearTarjeta(p, true))
            );

            document.getElementById("total").textContent =
                "Número de productos totales: " + productosCache.length;
        });
}

/* 
   ELIMINAR PRODUCTO 
 */
function eliminarProducto(id) {
    productosCache = productosCache.filter(p => p.id !== id);

    const tarjeta = document.getElementById("prod-" + id);
    if (tarjeta) tarjeta.remove();

    document.getElementById("total").textContent =
        "Número de productos totales: " + productosCache.length;
}
