var textos = document.querySelectorAll("p");

textos.forEach(element => {
    procesarParrafo(element)
});

function procesarParrafo(element) {
    element.innerHTML = obtenerPalabras(element.innerHTML);
}

function obtenerPalabras(text){
    let x = text.replace(/[^A-Za-z0-9áíóúñÁÉÍÓÚÑ]+/g, " ");
    let array = x.trim().split(" ");
    return array;
}
