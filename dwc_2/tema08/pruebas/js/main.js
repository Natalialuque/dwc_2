let info = document.getElementById("info");

let boton = document.getElementById("boton");

let login = document.getElementById("login");
let pass = document.getElementById("pass");
let color = document.getElementById("color");




if (checkCookie("login")) 
    login.value = checkCookie("login");
if (checkCookie("pass")) 
    pass.value = checkCookie("pass");
if (checkCookie("color"))
    document.body.style.backgroundColor = checkCookie("color"); 


// Pulsamos botÃ³n de Login
document.getElementById("boton").addEventListener("click", () => {
    const login = document.getElementById("login");
    const pass = document.getElementById("pass");
    const color = document.getElementById("color");

    console.log("Login: " + login.value + ", Password: " + pass.value);

    document.cookie = "login=" + login.value + ";max-age=" + (24*60*60);
    document.cookie = "pass=" + pass.value;
    document.cookie = "color=" + color.value;

    let colores = checkCookie("color");
    if (colores)
        document.body.style.backgroundColor = colores;    
});


function checkCookie(c) {
    let result = false;
    if (document.cookie.match(c)) {
        let myCookies = document.cookie.split(";");
        for (let i = 0; i < myCookies.length; i++)
            if (myCookies[i].match(c)) {
                let color = myCookies[i].split("=");
                result = color[1];
                break;
            } 
    }
    else {
        result = false;
    }

    return result;
}
///////////////////////////////////////////////////////////////////////////////
// Pulsamos botÃ³n de Login

// Pulsamos botÃ³n de Login
document.getElementById("boton").addEventListener("click", () => {
    const login = document.getElementById("login");
    const pass = document.getElementById("pass");
    const prefColor = document.getElementById("color");

    sessionStorage.setItem("login", login.value);
    sessionStorage.setItem("pass", pass.value);
    sessionStorage.setItem("prefColor", prefColor.value);
});

document.getElementById("bErase").onclick = function() {
    sessionStorage.clear();

    document.getElementById("login").value = "";
    document.getElementById("pass").value = "";
    document.getElementById("color").value = "";

}

/************************************ */


if (localStorage.length) {

    if (localStorage.login)
        login.value = localStorage.login;
    else
        login.placeholder = "Introduzca login";

    if (localStorage.pass)
        pass.value = localStorage.pass;

    if (localStorage.prefColor)
        document.body.style.backgroundColor =  localStorage.prefColor;

}
else{
    console.info("No existen variables en localStorage");
}

/************************************ */
// Pulsamos botÃ³n de Login
document.getElementById("boton").addEventListener("click", () => {
    localStorage.setItem("login",login.value);
    localStorage.pass = pass.value;
    localStorage.prefColor = prefColor.value;
});
burta.txt
