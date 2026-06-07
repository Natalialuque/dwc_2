const circulo = document.getElementById("circulo");

let x = 200;
let y = 200;
let vx = 4;
let vy = 4;
let detenido = false;

circulo.addEventListener("mouseenter", () => {
  detenido = true;
});

const promesa = new Promise(function(resolve, reject){

  const intervalo = setInterval(() => {

    if (detenido) {
      clearInterval(intervalo);
      resolve("El círculo se ha detenido al tocarlo con el ratón");
      return;
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    const r = circulo.offsetWidth;

    x += vx;
    y += vy;

    if (x <= 0) {
      x = 0;
      vx *= -1;
    } else if (x + r >= w) {
      x = w - r;
      vx *= -1;
    }

    if (y <= 0) {
      y = 0;
      vy *= -1;
    } else if (y + r >= h) {
      y = h - r;
      vy *= -1;
    }

    circulo.style.left = x + "px";
    circulo.style.top = y + "px";

  }, 16);

}).then(function(msg){
  console.log(msg);
}).catch(function(err){
  console.error(err);
});

