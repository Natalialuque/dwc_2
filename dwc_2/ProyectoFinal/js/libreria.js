export class Partido {
    constructor(datos) {
        this.id = datos.id;
        this.local = datos.homeTeam.shortName;
        this.visitante = datos.awayTeam.shortName;
        this.escudoLocal = datos.homeTeam.crest;
        this.escudoVisitante = datos.awayTeam.crest;
        this.estado = datos.status;
        this.fecha = new Date(datos.utcDate);
        this.golesLocal = datos.score?.fullTime?.home ?? 0;
        this.golesVisitante = datos.score?.fullTime?.away ?? 0;
        this.nombreCompeticion = datos.competition.name;
        this.escudoCompeticion = datos.competition.emblem;
    }

    getHoraFormateada() {
        return this.fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }

    estaEnDirecto() {
        return this.estado === "IN_PLAY" || this.estado === "PAUSED";
    }

    estaFinalizado() {
        return this.estado === "FINISHED";
    }

    getTextoCentro() {
        if (this.estaEnDirecto() || this.estaFinalizado()) {
            return this.golesLocal + " - " + this.golesVisitante;
        }
        return this.getHoraFormateada();
    }

    getEtiquetaEstado() {
        if (this.estaEnDirecto()) return "En Directo";
        if (this.estaFinalizado()) return "Finalizado";
        return "Próximamente";
    }
}
