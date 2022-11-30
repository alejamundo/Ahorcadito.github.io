//crear palabras secretas
const arrayPalabras = ["JAVASCRIPT", "ANGULAR", "BOOTSTRAP", "Python", "Java",
    "C", "C++", "C#", "PHP", "Swift", "Matlab", "Visual", "Ruby", "Laravel", "Django", "Net Framework",
    "Symfony", "React Native", "Flutter", "SQL", " Rust", "TypeScript", "Swift", "Perl", "Go", "Kotlin"
    , "Scheme", "Erlang", "Elixir", "Pascal", "Postscript", "Haskell", "Scala", "Lava"];

function palabraSecreta() {
    const posicion = Math.floor(Math.random() * arrayPalabras.length);
    return arrayPalabras[posicion];
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
    }, 3000)
}
function aggPalabra(palabra) {
    arrayPalabras.push(palabra.toUpperCase())
    mensaje("Palabra guardada con éxito", "success")

}
const btn = document.querySelector("[data-add]");
if (btn) {
    btn.addEventListener("click", function (e) {
        const palabra = document.querySelector("[data-text]");
        if (palabra.value == "" || palabra.value == " ") {
            mensaje("Ingrese una palabra", "danger");
        } else {
            aggPalabra(palabra.value);
            palabra.value = "";
        }

    });
}

//capturar eventos de teclado

const content_guiones = document.querySelector("[data-guiones]");
if (content_guiones) {
    const div_tecla = document.createElement("div");
    div_tecla.className = "palabras";
    content_guiones.appendChild(div_tecla);

    //dibujar ahorcadito
    const content_ahorcado = document.querySelector("[data-ahorcado]");
    const title = document.createElement("label");
    title.className = "label"
    title.innerText = "Inserte una Letra"
    content_ahorcado.appendChild(title);

    const div_muneco = document.createElement("div");
    div_muneco.className = "muneco";
    content_ahorcado.appendChild(div_muneco);
    //div_muneco.innerHTML = `<img src="../img/inicio.png" alt="Ahorcado1" width="100" height="100">`
    //crear div con guiones
    const div_Guiones = document.createElement("div");
    div_Guiones.className = "palabras"
    content_guiones.appendChild(div_Guiones);
    let palabra_Adivinar = [];
    let palabra_Mostrar = [];
    let num_Intentos = 5;
    var letra = "";

    //busco pocision de la palabra en el array
    function iniciar_Juego() {
        palabra_Adivinar = [];
        palabra_Mostrar = [];
        num_Intentos = 5;
        div_tecla.innerText = "";
        div_Guiones.innerText = ""
        var palabra = palabraSecreta();
        div_muneco.innerHTML = `<img src="../img/inicio.png" alt="Ahorcado1" class="imagen">`
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
        div_Guiones.innerText = palabra_Mostrar.join(" ")
    }
    iniciar_Juego();

    function acabarJuego() {
        var encontro = false;
        for (let i = 0; i < palabra_Mostrar.length; i++) {
            if (palabra_Mostrar[i] == " _ ") {
                encontro = true;
                break;
            }
        }
        if (!encontro) {
            mensaje('Has ganado!!! Era: ' + palabra_Adivinar.join(''), "success")
            iniciar_Juego()
        }
        if (num_Intentos == -1) {
            mensaje("Has Perdido!!! Era: " + palabra_Adivinar.join(''), "danger")
            iniciar_Juego();
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
            switch (num_Intentos) {
                case 4:
                    div_muneco.innerHTML = `<img src="../img/ahorcado1.png" alt="Ahorcado1" class="imagen">`
                    break;
                case 3:
                    div_muneco.innerHTML = `<img src="../img/ahorcado2.png" alt="Ahorcado1" class="imagen">`
                    break;
                case 2:
                    div_muneco.innerHTML = `<img src="../img/ahorcado3.png" alt="Ahorcado1" class="imagen">`
                    break;
                case 1:
                    div_muneco.innerHTML = `<img src="../img/ahorcado4.png" alt="Ahorcado1" class="imagen">`
                    break;
                case 0:
                    div_muneco.innerHTML = `<img src="../img/ahorcado5.png" alt="Ahorcado1" class="imagen">`
                    break;
                default:
                    div_muneco.innerHTML = `<img src="../img/inicio.png" alt="Ahorcado1" class="imagen">`
                    break;

            }
        }
        acabarJuego();
    });
}




//evento del boton 
const btn2 = document.querySelector("[data-nuevo]");
if (btn2) {
    btn2.addEventListener("click", function () {
        iniciar_Juego()
    });
}









