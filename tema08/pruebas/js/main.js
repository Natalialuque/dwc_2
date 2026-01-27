let info = document.getElementById("info");

let boton = document.getElementById("boton");

let login = document.getElementById("login");
let pass = document.getElementById("pass");
let color = document.getElementById("color");

boton.onclick=function(){

console.log("Login: "+login.value+" Pass: "+pass.value);

//los campos de una cockie van con ; para separarlo
document.cookie="Login="+login.value 
document.cookie="Pass="+pass.value;

//creamos una cockie de color 
document.cookie = "Color="+color.value;


}

function getCookie(nombre) {
    const partes = document.cookie.split("; ");
    for (let parte of partes) {
        const [key, value] = parte.split("=");
        if (key === nombre) return value;
    }
    return null;
}

window.onload = function() {
    const color = getCookie("Color");
    if (color) {
        document.body.style.backgroundColor = color;
    }
};
