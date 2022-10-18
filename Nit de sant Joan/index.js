window.onload = function start(){
    comprovarValorsSlide();
    mostrarValorSlide("estrelles");
    mostrarValorSlide("radi");
    mostrarValorSlide("distancia");
    premerBoto();  
}

function comprovarValorsSlide(){
    let valorRadi = localStorage.getItem("radi");
    let valorEstrelles = localStorage.getItem("estrelles");
    let valorDistancia = localStorage.getItem("distancia");
    if(valorRadi != null){
        document.getElementsByTagName("output")[1].value = valorRadi;
        document.getElementsByName("radi")[0].setAttribute("value",valorRadi); 
    }
    if(valorEstrelles != null){
        document.getElementsByTagName("output")[0].value = valorEstrelles;
        document.getElementsByName("estrelles")[0].setAttribute("value",valorEstrelles);
    }
    if(valorDistancia != null){
        document.getElementsByTagName("output")[2].value = valorDistancia;
        document.getElementsByName("distancia")[0].setAttribute("value", valorDistancia);
    }
    
}
function mostrarValorSlide(nom){
  document.getElementsByName(nom)[0].addEventListener("input",calcularValorSlider);
}
function calcularValorSlider(){
   this.nextElementSibling.value = this.value;
}
function premerBoto(){
    document.getElementsByName("boto")[0].addEventListener("click",canviarPantalla);
}
function canviarPantalla(){
    let estrelles = document.getElementsByName("estrelles")[0].value;
    let radi = document.getElementsByName("radi")[0].value;
    let distancia = document.getElementsByName("distancia")[0].value;
    localStorage.setItem("estrelles",estrelles);
    localStorage.setItem("radi",radi);
    localStorage.setItem("distancia",distancia);
    location.href = "nit.html";
}

