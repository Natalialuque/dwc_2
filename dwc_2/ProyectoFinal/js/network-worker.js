// se conecta a los archivos php y json y devuelve el array con los partidos y con la clasificacion
self.onmessage = async () => {
    try {
        await fetch('/server/partidos/partidos.php');
        await fetch('/server/clasificacion/clasificacion.php');
        await fetch('/server/ligasClasificaciones/ligasClasificaciones.php');
        await fetch('/server/equipos/equipos.php');

        const respP = await fetch("/server/partidos/partidos.json");
        const dataP = await respP.json();

        const respC = await fetch("/server/clasificacion/clasificacion.json");
        const dataC = await respC.json();

        const respLC = await fetch("/server/ligasClasificaciones/ligasClasificaciones.json");
        const dataLC = await respLC.json();

        const respE = await fetch("/server/equipos/equipos.json");
        const dataE = await respE.json();

        self.postMessage({
            partidos: dataP.matches,
            clasificacion: dataC.standings[0].table,
            equipos: dataE.teams,
            todasClasificaciones: dataLC 
        });

    } catch (error) {
        console.error("Error en el worker:", error);
    }
};