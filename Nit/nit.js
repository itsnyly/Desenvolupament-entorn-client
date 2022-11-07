let estrelles = [];
window.onload = function start() {

  mostarEstrelles();
  canviarValorInicialSlider();
  Slider();

}
function generarColor(){
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  if(randomColor == "000000"){
    randomColor = "FFFFFF";
    return "#"+randomColor;
  }
  else{
    return "#"+randomColor;
  }
}

function canviarValorInicialSlider(){

  document.getElementsByTagName("output")[0].value = localStorage.getItem("estrelles");
  document.getElementById("quantitat").setAttribute("value",localStorage.getItem("estrelles"));
}

function Slider(){
  document.getElementById("quantitat").addEventListener("change",canviarValorSlider);
}

function canviarValorSlider(){
  this.nextElementSibling.value = this.value;
  localStorage.setItem("estrelles",this.value);
  estrelles.splice(localStorage.getItem("estrelles"), estrelles.length);
  mostarEstrelles();
}

function mostarEstrelles() {
  let ctx = cnv.getContext("2d");
  let W = window.innerWidth -15;
  let H = window.innerHeight -42;
  let NouLlenç = new Llenç(H,W,"#181818");
  NouLlenç.crearLlenç(cnv,ctx);
  
  let NovaEstrella = new Estrella(generarRandom(1, W), generarRandom(1, H), generarRandom(1, localStorage.getItem("radi")),generarColor(), generarColor(),generarRandom(1,10));

  estrelles.push(NovaEstrella);
  let comptadorVoltes = 0;
  while (estrelles.length < localStorage.getItem("estrelles") && comptadorVoltes < 19000) {
    let comptador = 0;
    let estrellaComparar = new Estrella(generarRandom(7, window.innerWidth -22), generarRandom(7, innerHeight -50), generarRandom(1, localStorage.getItem("radi")), generarColor(),generarColor(),generarRandom(1,10));
    console.log(estrellaComparar.fillStyle);
    estrelles.forEach(estrella => {

      if (CalcularDistanciaEntreEstrelles(estrella, estrellaComparar)) {
        comptador++;
      }

    });

    if (comptador == estrelles.length) {
      estrelles.push(estrellaComparar);
    }
    comptadorVoltes++;

  }
  if(comptadorVoltes == 19000 ){
    alert("No es possible continuar creant estrelles, intenta canviar la mida de la pantalla o canviar els paràmetres donats");
  }

  pintar(estrelles,ctx);

}

function pintar(estrelles,ctx){
  for (let i = 0; i < estrelles.length; i++) {
    estrelles[i].mostrar(ctx);    
  }
}

function CalcularDistanciaEntreEstrelles(estrella1, estrella2) {

  if (Math.sqrt((estrella2.x - estrella1.x) **2 + (estrella2.y - estrella1.y)  **2) - (estrella2.radi + estrella1.radi) > localStorage.getItem("distancia")) {
    return true;
  }
  else {
    return false;
  }

}

function generarRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Estrella {
  constructor(x, y, radi, color,fillStyle,shadowBlur) {
    this.x = x;
    this.y = y;
    this.radi = radi;
    this.color = color;
    this.fillStyle = fillStyle;
    this.shadowBlur = shadowBlur;
  }

  mostrar(ctx) {
    ctx.beginPath();
    ctx.shadowColor = this.shadowColor;
    ctx.shadowBlur = this.shadowBlur;
    ctx.fillStyle = this.fillStyle;
    ctx.arc(this.x, this.y, this.radi, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

}

class Llenç{
  constructor(h,w,fillStyle){
    this.h = h;
    this.w = w;
    this.fillStyle = fillStyle;
  }
  crearLlenç(cnv,ctx){
    cnv.width = this.w;
    cnv.height = this.h;
    ctx.fillStyle = this.fillStyle;
    ctx.fillRect(0, 0, this.w, this.h);
  }
}


