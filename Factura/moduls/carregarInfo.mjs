import Article from "./article.mjs";

export function carregarDesplegable(){
    let arrayArticles = carregarArray();
    for (let i = 0; i < arrayArticles.length; i++ ){
        afegirValorArticle(arrayArticles[i].nomArticle);
    }
}

export function carregarArray(){
    let arrayArticles =[
        new Article("Teclat",10,"01"),
        new Article("Impressora",30,"02"),
        new Article("Monitor",20,"03"),
        new Article("Ratolí",5,"04"),
        new Article("Altaveu",7,"05"),
        new Article("Càmera",10,"06")
    ] 
    return arrayArticles;
}

export function afegirValorArticle(valor){
    let desplegable = document.getElementsByName("Articles");
    let option = new Option(valor,valor);
    desplegable[0].append(option);
}