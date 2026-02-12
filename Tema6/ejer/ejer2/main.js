
        function cuadradoPromise(value) {
            if (typeof value !== "number" || Number.isNaN(value)) {
                return Promise.reject(
                    `Error, el valor "${value}" ingresado no es un número`
                );
            }

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        value,
                        result: value * value,
                    });
                }, 0 | (Math.random() * 1000));
            });
        }

        async function funcionAsincronaDeclarada(valor) {
            try {
                document.getElementById("info").innerHTML = "Procesando...";

                let obj = await cuadradoPromise(valor);

                document.getElementById("info").innerHTML =
                    `Valor: ${obj.value} <br> Cuadrado: ${obj.result}`;

            } catch (err) {
                document.getElementById("info").innerHTML =
                    `<span style="color:red;">${err}</span>`;
            }
        }

        document.getElementById("boton").onclick = function () {
            let valor = Number(document.getElementById("numero").value);
            funcionAsincronaDeclarada(valor);
        };
  
