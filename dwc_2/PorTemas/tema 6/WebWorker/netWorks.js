onmessage = async function (e) {

    if (e.data === "leer") {
        try {
            const res = await fetch("server/normativa.txt");
            const texto = await res.text();
            postMessage(texto);
        } catch (err) {
            postMessage("ERROR");
        }
    }
};
