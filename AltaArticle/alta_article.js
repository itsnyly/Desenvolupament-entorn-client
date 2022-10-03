
window.onload = function start() {
    carregarDesplegable();
    codi();
    canviFamilia();
    calcularMides();
    comprovarMides()
    Passadis();
    Estanteria();
    Forat();
    botoAlta();
} 

function afegirValorFamilia(valor){
 let desplegable = document.getElementsByName("Familia");
 let option = new Option(valor,valor);
 desplegable[0].append(option);

}

function carregarDesplegable(){
    let arrayDesplegable = ["Metàlics", "Fluorescents", "Cromats", "Mates"];
    let arrayOrdenada = arrayDesplegable.sort();
    for (let i = 0; i < arrayDesplegable.length; i++ ){
        afegirValorFamilia(arrayOrdenada[i]);
    }
}
function canviFamilia(){
    let familia = document.getElementsByTagName("select")[0];
    familia.addEventListener("change", comprovarCodi);
}
function codi(){
    let codi = document.getElementById("Codi");
    codi.addEventListener("change", comprovarCodi);
}

function inicialsFamilia(){
    let valorFamilia = document.getElementsByTagName("select")[0].value;
    let inicials =  valorFamilia.slice(0,3);
    return inicials;
}

function sumaNumeros(numero){
    let arraySeparat = numero[1].split("");
    let TotalSuma = 0
    let resultat = 0
    for(let i =0; i< arraySeparat.length; i++){
        if( Number.isInteger(parseInt(arraySeparat[i]))){
            TotalSuma = TotalSuma + parseInt(arraySeparat[i]);
        }
        else{
            alert(arraySeparat[i] + " no és un valor vàlid");
        }
    }
    resultat = TotalSuma % 10;
    return resultat;
}

function digitControl(numero){
        
    let digitControl = numero;
 
    let lletraControl = "";
 
    switch (digitControl) {
        case 0:
            lletraControl = "A";
            break;
        case 1:
            lletraControl = "X";
            break;
        case 2:
            lletraControl = "M";
            break;
        case 3:
            lletraControl = "T";
            break;
        case 4:
            lletraControl = "B";
            break;
        case 5:
            lletraControl = "C";
            break;
        case 6:
            lletraControl = "S";
            break;
        case 7:
            lletraControl = "O";
            break;
        case 8:
            lletraControl = "P";
            break;
        case 9:
            lletraControl = "Z";
            break;
        default:
            lletraControl = "Sense Valor";
    }
 
    return lletraControl;
}

function comprovarCodi(){
    let valor = document.getElementById("Codi").value;
    let inicials = inicialsFamilia();
    let arrayNumeros = valor.split("-");
    let digit = sumaNumeros(arrayNumeros);
    let dc = digitControl(digit);
    let arrayInicials = inicials.split("");
    let regEx = new RegExp("^["+arrayInicials[0].toUpperCase()+arrayInicials[0].toLowerCase()+"]["+arrayInicials[1].toUpperCase()+arrayInicials[1].toLowerCase()+"]["+arrayInicials[2].toUpperCase()+arrayInicials[2].toLowerCase() + "]" +"\-[0-9]{7}\-" + dc +"$");
    let resultatCodi = regEx.test(valor);
    canviarImg(0,resultatCodi);
    return resultatCodi;
}

function calcularMides(){
    let textAmplada = document.getElementsByName("Amplada")[0];
    let textLlargada = document.getElementsByName("Llargada")[0];
    let textAltura = document.getElementsByName("Altura")[0];
    textAmplada.addEventListener("change",comprovarMides);
    textLlargada.addEventListener("change",comprovarMides);
    textAltura.addEventListener("change", comprovarMides);
}

function comprovarMides(){
    let valorAmplada = elementByName("Amplada");
    let valorLlargada = elementByName("Llargada");
    let valorAltura = elementByName("Altura");
    let regEx = /^\d+?$/;
    let resultatAmplada = regEx.test(valorAmplada);
    let resultatLlargada = regEx.test(valorLlargada);
    let resultatAltura = regEx.test(valorAltura);
    if(resultatAltura == true && resultatAmplada == true && resultatLlargada == true)
    {
        document.getElementsByName("Mides")[0].innerHTML = valorAmplada + " x " + valorLlargada + " x " + valorAltura;
        return true;

    }
    else{
        document.getElementsByName("Mides")[0].innerHTML = " ";
        return false;

    }
}

function elementByName(text){
    return  document.getElementsByName(text)[0].value;
}

function Passadis(){
    let textPassadis = document.getElementById("Passadis");
    textPassadis.addEventListener("change", comprovarPassadis);
}

function comprovarPassadis(){
    let valorPassadis = document.getElementById("Passadis").value;
    let regEx = /^P\-\d{2}\-(E|D)$/;
    let resultatPassadis = regEx.test(valorPassadis);
    canviarImg(1,resultatPassadis);
    return resultatPassadis;
}

function Estanteria(){
    let textEstanteria = document.getElementById("Estanteria");
    textEstanteria.addEventListener("change", comprovarEstanteria);
}

function comprovarEstanteria(){
    let valorEstanteria = document.getElementById("Estanteria").value;
    let regEx = /^EST\+\d{2}\.\d{2}$/;
    let resultatEstanteria = regEx.test(valorEstanteria);
    canviarImg(2,resultatEstanteria)
    return resultatEstanteria;
}

function Forat(){
    let textForat = document.getElementById("Forat");
    textForat.addEventListener("change", comprovarForat);
}

function comprovarForat(){
    let valorForat = document.getElementById("Forat").value;
    let regEx = /^\d{2}\*[A-z]{3}\*\d{2}\\\d{2}$/;
    let resultatForat = regEx.test(valorForat);
    canviarImg(3,resultatForat);
    return resultatForat;
}

function botoAlta(){
    let boto = document.getElementsByName("btnAlta")[0];
    boto.addEventListener("click",mostrarAlta);
}

function mostrarAlta(){
    let valorCodi = document.getElementById("Codi").value;
    let valorFamilia = document.getElementsByTagName("select")[0].value;
    let valorNom = document.getElementsByName("Nom")[0].value;
    let valorAmplada = elementByName("Amplada");
    let valorLlargada = elementByName("Llargada");
    let valorAltura = elementByName("Altura");
    let valorPassadis = document.getElementById("Passadis").value;
    let valorEstanteria = document.getElementById("Estanteria").value;
    let valorForat = document.getElementById("Forat").value;
    let dades = document.getElementById("resultatAlta");
    let resultatEstanteria = comprovarEstanteria();
    let resultatCodi = comprovarCodi();
    let resultatMides = comprovarMides();
    let resultatPassadis = comprovarPassadis();
    let resultatForat = comprovarForat();

    if(resultatEstanteria == true && resultatCodi == true && resultatMides == true && resultatPassadis == true && resultatForat == true){
        dades.innerHTML = "<h3>Familia:</h3>"+valorFamilia+"<br/><h3>Codi:</h3>"+valorCodi+"<br/><h3>Nom:</h3>"+valorNom+"<br/><h3>Característiques:</h3>"+valorAmplada+ "x" + valorLlargada+ "x" + valorAltura + "<br/><h3>Ubicació:</h3>"+valorPassadis+"<br/>"+valorEstanteria+"<br/>"+valorForat;
    }
    else{
        dades.innerHTML = ""
    }
}

function canviarImg(index,boolea){
    let imatge = document.getElementsByTagName("img")[index];
    if(boolea == true){
        imatge.src = "correcte.png";
    }
    else{
        imatge.src = "error.png";
    }
}




