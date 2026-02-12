fetch("server/vehiculos.json")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("contenedor");

    // OJO: tu JSON tiene vehiculos[0][0]
    const vehiculos = data.vehiculos[0];

    vehiculos.forEach(v => {
      const div = document.createElement("div");
      div.style.border = "1px solid #ccc";
      div.style.padding = "10px";
      div.style.margin = "10px 0";

      div.innerHTML = `
        <h2>${v.tipo} - ${v.modelo}</h2>
        <p><strong>Año:</strong> ${v.año}</p>
        <p><strong>Plazas dormir:</strong> ${v.plazas.para_dormir}</p>
        <p><strong>Plazas viajar:</strong> ${v.plazas.para_viajar}</p>
        <p><strong>Consumo medio:</strong> ${v.consumo_medio} L/100km</p>
        <h3>Imágenes:</h3>
      `;

      // Añadir imágenes
      v.imagenes.forEach(img => {
        const imagen = document.createElement("img");
        imagen.src = img;
        imagen.style.width = "200px";
        imagen.style.marginRight = "10px";
        div.appendChild(imagen);
      });

      contenedor.appendChild(div);
    });
  })
  .catch(err => console.error("Error cargando JSON:", err));
