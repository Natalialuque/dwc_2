export {matriculas};

var matriculas = new Array();
var curses = new Array();

curses.push(new Object({
    name: "DWEC",
    description: "Desarrollo web de aplicaciones en entorno cliente con JS",
    curseImg: "/images/dwec.png"
}));

curses.push(new Object({
    name: "DWES",
    description: "Desarrollo web de aplicaciones en entorno servidor con PHP",
    curseImg: "/images/dwes.png"
}));

curses.push(new Object({
    name: "DIW",
    description: "Desarrollo de Interfaces Web",
    curseImg: "/images/diw.png"
}));

curses.push(new Object({
    name: "DAW",
    description: "Despliegue de aplicaciones web",
    curseImg: "/images/daw.jfif"
}));

curses.push(new Object({
    name: "CS",
    description: "CiberSeguridad",
    curseImg: "/images/ciberseguridad.jfif"
}));

curses.push(new Object({
    name: "DIA",
    description: "Desarrollo de inteligencias artificiales",
    curseImg: "/images/ia.jfif"
}));

/*************Matriculaciones de alumnos ***************************/

matriculas.push(new Object({
    name: "Pepe",
    surname: "Pérez",
    curses: {c1:curses[0],c2:curses[1],c3:curses[3]}
}))

matriculas.push(new Object({
    name: "Ana",
    surname: "Exeberría",
    curses: {c1:curses[1],c2:curses[2],c3:curses[4]}
}))

matriculas.push(new Object({
    name: "María",
    surname: "García",
    curses: {c1:curses[2],c2:curses[3],c3:curses[5]}
}))

matriculas.push(new Object({
    name: "Jhon",
    surname: "McGuiver",
    curses: {c1:curses[3],c2:curses[4],c3:curses[5]}
}))