/**
 * EJERCICIO 1
 */
//variables 
let botonEstudiantes = document.getElementById("verEstudiante");
let botonProfesor = document.getElementById("verProfesor");
let resultadoEstudiante = document.getElementById("resultadoEstudiante");
let resultadoProfesor = document.getElementById("resultadoProfesor");

//HOLA
//ejercicio 
// Clase base Persona
class Persona {
  constructor(nombre, edad, genero) {
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero;
  }

  obtDetalles() {
    return "nombre:"+this.nombre+"<br>Edad:"+this.edad+"<br>Género:"+this.genero;
  }
}

// Clase Estudiante
class Estudiante extends Persona {
  constructor(nombre, edad, genero, curso, grupo) {
    super(nombre, edad, genero);
    this.curso = curso;
    this.grupo = grupo;
  }

  registrar() {
    return this.obtDetalles()+"<br>Curso:" +this.curso+"<br>Grupo:"+this.grupo;
  }
}

// Clase Profesor
class Profesor extends Persona {
  constructor(nombre, edad, genero, asignatura, nivel) {
    super(nombre, edad, genero);
    this.asignatura = asignatura;
    this.nivel = nivel;
  }

  asignar() {
    return this.obtDetalles()+"<br>Asignatura:"+this.asignatura+"<br>Nivel:"+ this.nivel;
  }
}

// Crear instancias
const persona = new Persona("Natalia",21,"Femenino");
const persona2= new Persona ("Joselu",45,"Masculino");
const estudiante = new Estudiante(persona.nombre, persona.edad, persona.genero, "2º Bachillerato", "B");
const profesor = new Profesor(persona2.nombre, persona2.edad, persona2.genero, "Matemáticas", "Secundaria");

// Eventos de los botones
botonEstudiantes.onclick= function(){
    resultadoEstudiante.innerHTML=estudiante.registrar();

}

botonProfesor.onclick= function(){
    resultadoProfesor.innerHTML=profesor.asignar();

}



/**
 * EJERCICIO 2
 */
//variables 
let longitud = document.getElementById("longitud");
let altura = document.getElementById("altura");
let calcLongitud = document.getElementById("calcLongitud");
let resul1 = document.getElementById("resul1");

//ejercicio 
calcLongitud.onclick=function(){
  resul1.innerHTML=Math.sqrt((longitud.value **2 )+(altura.value**2));
}

//variables 
let x1=document.getElementById("x1");
let y1=document.getElementById("y1"); 
let x2=document.getElementById("x2");
let y2=document.getElementById("y2");
let calcpendiente= document.getElementById("calcpendiente");
let resul2=document.getElementById("resul2"); 



//ejercicio 
calcpendiente.onclick=function(){
  // Calcular la pendiente (tangente del ángulo)
  let pendiente = (y2.value - y1.value) / (x2.value- x1.value);

  // Calcular el ángulo en radianes y luego convertirlo a grados
  let anguloRad = Math.atan(pendiente);
  let anguloGrados = anguloRad * (180 / Math.PI);

  resul2.innerHTML=anguloGrados;
}


//variables 
let ascendidos = document.getElementById("ascendidos");
let recorridos = document.getElementById("recorridos");
let calcPendiente2 = document.getElementById("calcPendiente2");
let resul13 = document.getElementById("resul13");

//ejercicio 
calcPendiente2.onclick=function(){

  resul13.innerHTML=(ascendidos.value/recorridos.value)*100;
}


/**
 * EJERCICIO 4
 */
//variables 
let fechaNaciiento = document.getElementById("fechaNacimiento");
let calculaDias=document.getElementById("calculaDias");
let resultadoDias=document.getElementById("resultadoDias");

//funcion 
calculaDias.onclick=function(){
    let hoy = new Date();
    const fechaNaci = new Date(fechaNaciiento.value);


      // Calcular diferencia en milisegundos
      const diferenciaMs = hoy - nacimiento;

      // Convertir a días
      resultadoDias.innerHTML ="Llevas vivo:"+ Math.floor(diferenciaMs / (1000 * 60 * 60 * 24))+" dias";
}

/**
 * ejercicio 9
 */
respuesta = document.getElementById("resRes");
respuesta.innerText = "Ancho: "+window.innerWidth+", Alto:"+window.innerHeight;
//ejercicio 
window.addEventListener("resize",()=>{
  respuesta.innerText = "Ancho: "+window.innerWidth+", Alto:"+window.innerHeight;

  if(parseInt(window.innerWidth)<768)
    respuesta.innerText+=" Movil";
  else if(parseInt(window.innerWidth)<1024)
    respuesta.innerText+=", tablet";
  else
    respuesta.innerText+=", Desktop";
});


/**
 * EJERCICIO 10
 */
let ancho = (window.innerWidth-40);
let alto = (window.innerHeight-20);
let aux= undefined;
document.getElementById("abrirVentana").onclick = function() {
    aux = window.open(
      "../Pruebas/src/usuers.html",
     "NuevaVenta",
     "Width="+ancho+",height="+alto);
}



/**
 * EJERCICIO 12
 */
document.getElementById("atras").onclick = () => {
    history.back();
}

document.getElementById("adelante").onclick = () => {
    history.forward();
}




/**
 * EJERCICIO 16
 */
let email = document.getElementById("email");
let resultadoemail = document.getElementById("resultadoemail");
let validaemail = document.getElementById("validaemail");
//ejercicio 
validaemail.onclick=function(){
    const expre = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/; 

    if(email.value.match (expre)){
        resultadoemail.innerHTML="El email es correcto";
    }else{
        resultadoemail.innerHTML="El email no es correcto";
    }

}


