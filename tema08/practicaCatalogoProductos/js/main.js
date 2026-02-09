// URL BASE
const BASE = "/DWC/dwc_2/tema08/practicaCatalogoProductos/server/PRODUCTS.JSON";

// INICIALIZACIÓN
window.onload = () => {
    document.getElementById("mostrar").addEventListener("click", mostrarProductos);
    document.getElementById("buscarP").addEventListener("click", buscarPorPrecio);
    document.getElementById("buscarT").addEventListener("click", buscarPorTitulo);
    document.getElementById("mostrarC").addEventListener("click", obtenerCategorias);
    document.getElementById("añadir").addEventListener("click",formularioNuevoProducto);
    document.getElementById("borrar").addEventListener("click", borrarProducto);
};


function limpiar() { document.getElementById("tarjetas").innerHTML = ""; }

//CREAR TARJETA
function crearTarjeta(prod, incluirBotonBorrar = false) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    const titulo = document.createElement("h3");
    titulo.textContent = prod.title;

    const img = document.createElement("img");
    img.src = prod.thumbnail;
    img.alt = prod.title;

    const desc = document.createElement("p");
    desc.textContent = prod.description;

    const precio = document.createElement("p");
    precio.textContent = "Precio: " + prod.price + " €";

    const descuento = document.createElement("p");
    descuento.textContent = "Descuento: " + prod.discountPercentage + " %";

    const rating = document.createElement("p");
    rating.textContent = "Puntuación: " + prod.rating;

    const stock = document.createElement("p");
    stock.textContent = "Unidades: " + prod.stock;

    const marca = document.createElement("p");
    marca.textContent = "Fabricante: " + prod.brand;

    const categoria = document.createElement("p");
    categoria.textContent = "Categoría: " + prod.category;

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(img);
    tarjeta.appendChild(desc);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(descuento);
    tarjeta.appendChild(rating);
    tarjeta.appendChild(stock);
    tarjeta.appendChild(marca);
    tarjeta.appendChild(categoria);

    if (incluirBotonBorrar) {
        const btn = document.createElement("button");
        btn.textContent = "Borrar";
        btn.onclick = () => eliminarProducto(prod.id);
        tarjeta.appendChild(btn);
    }

    return tarjeta;
}

// MOSTRAR TODOS LOS PRODUCTOS (FETCH)
function mostrarProductos(e) {
    e.preventDefault();
    fetch(BASE)
        .then(respuesta => respuesta.json())
        .then(datos => {
            document.getElementById("total").textContent =
                "Número de productos totales: " + datos.products.length;

            const cont = document.getElementById("tarjetas");

            datos.products.forEach(p => {
                cont.appendChild(crearTarjeta(p));
            });
        })
        .catch(error => {
            document.getElementById("total").textContent =
                "Error al cargar los productos";
        });
}




// 2. BUSCAR POR PRECIO (FETCH)
function buscarPorPrecio(e) {
    e.preventDefault();
    limpiar();

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
            })
            .catch(() => {
                document.getElementById("total").textContent =
                    "Error al cargar los productos";
            });
    };

    cont.appendChild(label);
    cont.appendChild(input);
    cont.appendChild(btn);
}


// ------------------------------------------------------
// 3. BUSCAR POR TÍTULO (FETCH)
// ------------------------------------------------------
function buscarPorTitulo(e) {
    e.preventDefault();
    limpiar();

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
            })
            .catch(() => {
                document.getElementById("total").textContent =
                    "Error al cargar los productos";
            });
    };

    cont.appendChild(label);
    cont.appendChild(input);
    cont.appendChild(btn);
}


// ------------------------------------------------------
// 4. OBTENER CATEGORÍAS (XMLHttpRequest)
// ------------------------------------------------------
function obtenerCategorias(e) {
    e.preventDefault();
    limpiar();

    const xhr = new XMLHttpRequest();
    xhr.open("GET", BASE + "/categories", true);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const categorias = JSON.parse(xhr.responseText);

            const select = document.createElement("select");

            categorias.forEach(cat => {
                const op = document.createElement("option");
                op.value = cat;
                op.textContent = cat;
                select.appendChild(op);
            });

            select.onchange = () => mostrarCategoria(select.value);

            document.getElementById("tarjetas").appendChild(select);
        }
    };

    xhr.send();
}

async function mostrarCategoria(cat) {
    limpiar();

    const res = await fetch(`${BASE}/category/${cat}`);
    const datos = await res.json();

    const cont = document.getElementById("tarjetas");

    datos.products.forEach(p => cont.appendChild(crearTarjeta(p)));

    document.getElementById("total").textContent =
        "Productos en categoría: " + datos.products.length;
}

// ------------------------------------------------------
// 5. AÑADIR PRODUCTO (FETCH)
// ------------------------------------------------------
function formularioNuevoProducto(e) {
    e.preventDefault();
    limpiar();

    const cont = document.getElementById("tarjetas");

    const form = document.createElement("form");

    const campos = [
        "title", "description", "price", "discountPercentage",
        "rating", "stock", "brand", "category", "thumbnail"
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

    btn.onclick = async (ev) => {
        ev.preventDefault();

        const nuevo = {};
        campos.forEach(c => nuevo[c] = inputs[c].value);

        await fetch(BASE + "/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevo)
        });

        mostrarProductos(ev);
    };

    form.appendChild(btn);
    cont.appendChild(form);
}

// ------------------------------------------------------
// 6. BORRAR PRODUCTO (FETCH)
// ------------------------------------------------------
async function borrarProducto(e) {
    e.preventDefault();
    limpiar();

    const res = await fetch(BASE);
    const datos = await res.json();

    const cont = document.getElementById("tarjetas");

    datos.products.forEach(p =>
        cont.appendChild(crearTarjeta(p, true))
    );
}

async function eliminarProducto(id) {
    await fetch(`${BASE}/${id}`, { method: "DELETE" });
    mostrarProductos(new Event("click"));
}
