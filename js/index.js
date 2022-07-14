const INTERVALO = 100;
var timer;
var documentoOriginal = [];

var documento = document.querySelectorAll(".efecto");
var checkBox = document.querySelector("#cbDislexia");

respaldarDocumento(documento);
iniciarTimer();

function respaldarDocumento(documento) {
    documento.forEach(parrafo =>{
        documentoOriginal.push(parrafo.innerHTML);
    });
}

function restaurarDocumento(documento) {
    var i = 0;
    documento.forEach(parrafo =>{
        parrafo.innerHTML = documentoOriginal[i];
        i++;
    });
}

function iniciarTimer() {
    timer = setInterval(procesarDocumento, INTERVALO);
    console.log("iniciarTimer")
}

function detenerTimer() {
    clearTimeout(timer);
    console.log("detenerTimer")
}

function procesarDocumento() {
    documento.forEach(parrafo => {
        parrafo.innerHTML = procesarParrafo(parrafo)
    });
}

function procesarParrafo(parrafo) {
    var palabras = obtenerPalabras(parrafo.innerHTML);
    parrafo.innerHTML = "";

    palabras.forEach(palabra => {
        palabra = procesarPalabra(palabra);
        parrafo.innerHTML += palabra;
    })

    return parrafo.innerHTML;
}

function obtenerPalabras(text){
    let x = text.replace(/[^A-Za-z0-9áéíóúñÁÉÍÓÚÑ()üδυσλεξία;,.:—-‘’]+/g, " ");
    let array = x.trim().split(" ");
    return array;
}

function procesarPalabra(palabra) {
    let letras = palabra.split("");
    ultimaLetra = letras.length-1;
    if (ultimaLetra == '.' || ultimaLetra == ',') ultimaLetra--;
    
    for (i = 1; i < ultimaLetra-2; i++) {
        var random = rnd(0, 100);
        if(random <= 10) {
            if(random > 5) {
                var x = letras[i];
                letras[i] = letras[i+1];
                letras[i+1] = x;
            } else {
                var x = letras[i+1];
                letras[i+1] = letras[i];
                letras[i] = x;
            }
        } else if(random < 15) {
            if (letras[i] == 'b') {letras[i] = 'p'; break;}
            if (letras[i] == 'p') {letras[i] = 'b'; break;}
        }
    }

    palabra = letras.join('');

    return palabra + " ";
}

function rnd(valMin, valMax) {
    return Math.round(Math.random()*(valMax-valMin)+valMin);
}

checkBox.addEventListener("click", function(){
    if(checkBox.checked) {
        iniciarTimer();
    } else {
        detenerTimer();
        restaurarDocumento(documento);
    }
});
