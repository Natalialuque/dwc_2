//crear los nodos para el apartado 3

export function crearDivArriba(estacion_meteorologica,ubicacion,ciudad,provincia,pais,coordenadas){

    const datosGenerales = document.createElement("div");
    //general
    const estacion_meteorologica = document.createElement("label")
    datosGenerales.appendChild(document.createTextNode(estacion_meteorologica))

    const ubicacion = document.createElement("div")
    

    const ciudad = document.createElement("label")
        ubicacion.appendChild(document.createTextNode(ciudad))
    const provincia = document.createElement("label")
         ubicacion.appendChild(document.createTextNode(provincia))
    const pais = document.createElement("label")
        ubicacion.appendChild(document.createTextNode(pais))
    const coordenadas = document.createElement("label")
        ubicacion.appendChild(document.createTextNode(coordenadas))
    
    datosGenerales.appendChild(document.createTextNode(ubicacion))

    const fecha_actualizacion = document.createElement("label")
    datosGenerales.appendChild(document.createTextNode(fecha_actualizacion))


}

export function crearDivClima(temperatura_c,sensacion_termica_c,humedad_relativa,presion_atmosferica_hpa,estado_cielo,punto_rocio_c,visibilidad_m){
 //para datos clima
    const datosClima = document.createElement("div");
    datosClima.style.backgroundColor("blue");

    const temperatura_c = document.createElement("label")
    datosClima.appendChild(document.createTextNode(temperatura_c))

     const sensacion_termica_c = document.createElement("label")
    datosClima.appendChild(document.createTextNode(sensacion_termica_c))

    const humedad_relativa = document.createElement("label")
    datosClima.appendChild(document.createTextNode(humedad_relativa))

    const presion_atmosferica_hpa = document.createElement("label")
    datosClima.appendChild(document.createTextNode(presion_atmosferica_hpa))

    const estado_cielo = document.createElement("label")
    datosClima.appendChild(document.createTextNode(estado_cielo))

    const punto_rocio_c = document.createElement("label")
    datosClima.appendChild(document.createTextNode(punto_rocio_c))

    const visibilidad_m = document.createElement("label")
    datosClima.appendChild(document.createTextNode(visibilidad_m))

    
}

export function crearDivAstronomico(amanecer,atardecer,fase_lunar){
    //para datos astronomicos
    const astronomicos = document.createElement("div");
    astronomicos.style.backgroundColor("gray");
    
   
    const amanecer = document.createElement("label")
    astronomicos.appendChild(document.createTextNode(amanecer))

       
    const atardecer = document.createElement("label")
    astronomicos.appendChild(document.createTextNode(atardecer))

       
    const fase_lunar = document.createElement("label")
    astronomicos.appendChild(document.createTextNode(fase_lunar))
}

export function crearDivAlerta(nivel,tipo,descripcion,inicio,fin){
    const alertas = document.createElement("div");
    alertas.style.backgroundColor("red");
    
     const nivel = document.createElement("label")
    alertas.appendChild(document.createTextNode(nivel))

       
    const tipo = document.createElement("label")
    alertas.appendChild(document.createTextNode(tipo))

       
    const descripcion = document.createElement("label")
    alertas.appendChild(document.createTextNode(descripcion))
   
    const inicio = document.createElement("label")
    alertas.appendChild(document.createTextNode(inicio))

    const fin = document.createElement("label")
    alertas.appendChild(document.createTextNode(fin))
}