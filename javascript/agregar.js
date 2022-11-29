//crear palabras secretas
const arrayPalabras = ["JAVASCRIPT", "ANGULAR", "BOOTSTRAP"];

function palabraSecreta() {
    const posicion = Math.floor(Math.random() * arrayPalabras.length);
    return arrayPalabras[posicion];
}
function aggPalabra(palabra) {
    arrayPalabras.push(palabra.toUpperCase())
    mensaje("Palabra guardada con éxito", "success")
}
function mensaje(mensaje, tipo) {
    const juego = document.querySelector(".juego");
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="alert alert-${tipo} men" role="alert">
    ${mensaje}
  </div>`
    juego.appendChild(div)
    setTimeout(function () {
        div.remove();
    }, 1000)
}
document.querySelector("[data-add]").addEventListener("click", function () {
    const palabra = document.querySelector("[data-text]");
    if (palabra.value == "" || palabra.value == " ") {
        mensaje("Ingrese una palabra", "danger");
    } else {
        aggPalabra(palabra.value);
        palabra.value = "";
    }

});


//capturar eventos de teclado
const content_guiones = document.querySelector("[data-guiones]");
const div_tecla = document.createElement("div");
div_tecla.className = "palabras";
content_guiones.appendChild(div_tecla);

//crear div con guiones
const div_Guiones = document.createElement("div");
div_Guiones.className = "palabras"
content_guiones.appendChild(div_Guiones);

let palabra_Adivinar = [];
let palabra_Mostrar = [];
let num_Intentos = 5;
var letra = "";
var palabra = palabraSecreta();
//busco pocision de la palabra en el array
function iniciar_Juego() {
    var pos = 0;
    for (let i = 0; i < arrayPalabras.length; i++) {
        if (arrayPalabras[i] == palabra) {
            pos = i;
        }
    }
    //converti palabra en un arreglo
    palabra_Adivinar = palabra.split('');

    for (let i = 0; i < palabra.length; i++) {
        palabra_Mostrar.push(" _ ")
    }
    console.log(palabra_Mostrar)
    div_Guiones.innerText = palabra_Mostrar.join(" ")
}
iniciar_Juego();

function acabarJuego () {
    console.log(palabra_Mostrar);
    for (let i = 0; i < palabra_Mostrar.length; i++) {
        if (palabra_Mostrar[i]!="_") {
           
        }else{
            alert('Has ganado!!!');
        }   
    }
    if (num_Intentos == 0) {
        alert('Has Perdido!!! Era: ' + palabra_Adivinar.join(''));
    }
}

document.addEventListener('keydown', function (e) {
    letra = e.key;
    div_tecla.innerText = letra
    letra = letra.toUpperCase();

    for (let i = 0; i < palabra_Adivinar.length; i++) {
        if (palabra_Adivinar[i] == letra) {
            palabra_Mostrar[i] = letra;
            div_Guiones.innerText = palabra_Mostrar.join(" ")
        }
    }
    if (!palabra_Adivinar.includes(letra)) {
        num_Intentos -= 1;
        //historial_Letras_Usuario.push(letra);
    }
    acabarJuego();
});








