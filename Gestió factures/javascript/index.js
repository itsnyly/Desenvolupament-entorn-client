import { carregarDesplegable, carregarArray } from "../moduls/carregarInfo.mjs";
import Article from "../moduls/article.mjs";
import FilaFactura from "../moduls/filaFactura.mjs";


window.onload = function start(){
    carregarDesplegable();
    clickAfegirArticle();
    codiFactura();
    
}

class Factura{
    constructor(codiFactura,articles, base, iva){
        this.codiFactura = codiFactura;
        this.articles = articles;
        this.base = base;
        this.iva = iva;
    }

    afegirFactura(){
        this.codiFactura = localStorage.getItem("numFactura"); 
        let numeroFactura = document.getElementById("numeroFactura");
        let ultimValor = factures[factures.length -1];
        if (this.codiFactura == null) {
            localStorage.setItem("numFactura","2022/1");
            this.codiFactura = localStorage.getItem("numFactura");   
        }
        else{
            let separarAny = this.codiFactura.split("/");
            if(ultimValor.articles.length != 0){
                separarAny[1]++;
                localStorage.setItem("numFactura",separarAny.join("/"));
            }
            this.codiFactura = localStorage.getItem("numFactura");

        }
        if(numeroFactura){
            numeroFactura.innerHTML = this.codiFactura;
        }
        factura.mostrarFactura();
    }

    mostrarFactura(){
        document.getElementById("files").innerHTML = "";
        this.articles.forEach(element => {
            let fila = document.createElement("tr");
            fila.innerHTML="<tr><td>"+element["article"].codiArticle+"</td><td>"+element["article"].nomArticle+"</td><td><input class='inputArticle' type=number name="+element["article"].codiArticle+" value ="+element["quantitatArticle"]+"></input></td><td id= preuArticle>"+element["article"].preuArticle+"</td><td id= preuTotalArticle>"+element["quantitatArticle"] * element["article"].preuArticle+"</td></tr>";
            document.getElementById("files").appendChild(fila);
        });
        document.querySelectorAll(".inputArticle").forEach(element => element.addEventListener("change",this.canviarQuantitat));
        factura.calcularTotal();
        factura.guardarFactura();
    }

    canviarQuantitat(){
        let index = factura.articles.findIndex(element => element["article"].codiArticle == this.getAttribute("name"));
        let trobat = factura.articles[index];
        trobat["quantitatArticle"] = this.value;
        if(this.value <=0){
            factura.articles.splice(index,1);
        }
        factura.mostrarFactura();
        factura.calcularTotal();
    }

    guardarFactura(){
        if(factures.length > 0){
            let trobat = factures.find(element => element["codiFactura"] == factura.codiFactura);
            if(trobat == undefined){
                factures.push(factura);
            }
            else{
                let index = factures.findIndex(element => element["codiFactura"] == factura.codiFactura);
                factures[index].articles = factura.articles;
            }
        }
        else{
            factures.push(factura);
            console.log(factures);
        }
        localStorage.setItem("factures",JSON.stringify(factures));
    }
    calcularTotal(){
        let base = 0;
        let iva = 21;
        let total = 0;
        let files = document.getElementById("files");
        files.childNodes.forEach(element => {
            base = base + parseInt(element.lastChild.innerHTML);
        });
        iva = (base * 21) / 100;
        total = base + iva;
        document.getElementById("baseImposable").innerHTML = base +" €";
        document.getElementById("21Iva").innerHTML = iva + " €";
        document.getElementById("importTotal").innerHTML = total.toFixed(2) + " €";
    }
    crearArticle(){
        let articles = carregarArray();
        let desplegable = document.getElementsByName("Articles")[0].value;
        let article = new Article();
        articles.forEach(value => {
            if(value.nomArticle == desplegable){
                article.nomArticle = value.nomArticle;
                article.codiArticle = value.codiArticle;
                article.preuArticle = value.preuArticle;
            }
        });
        
        let filaFactura = new FilaFactura(article,1);
        if(factura.articles.length >0){
                let trobat = factura.articles.find(element => element["article"].nomArticle == filaFactura["article"].nomArticle);
                if(trobat != undefined){
                    trobat["quantitatArticle"] = parseInt(trobat["quantitatArticle"]) +1;
                }
                else{
                    factura.articles.push(filaFactura);
                }
            }
        else{
            factura.articles.push(filaFactura);
        }
        factura.mostrarFactura();
    }
    recuperarFactura(){
        let codiFactura = document.getElementsByName("inputFactura")[0].value;
        let trobat = factures.find(element => element["codiFactura"] == codiFactura);
        if(trobat != undefined){
            factura.articles = trobat["articles"];
            factura.codiFactura = codiFactura;
            factura.mostrarFactura();
        }
        numeroFactura.innerHTML = codiFactura;
    }
}


let factures = JSON.parse(localStorage.getItem("factures")); 
if(factures == null){
    factures = [];
}
let factura = new Factura(localStorage.getItem("numFactura"),[]);
factura.afegirFactura();



function clickAfegirArticle(){
    document.getElementById("botoArticle").addEventListener("click",factura.crearArticle);
}

function codiFactura(){
    document.getElementsByName("botoFactura")[0].addEventListener("click",factura.recuperarFactura);
}




