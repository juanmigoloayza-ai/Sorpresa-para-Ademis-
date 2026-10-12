/* =====================================
   PERSONALIZA TU SORPRESA AQUÍ
   ===================================== */

// 1. Escribe aquí el texto que tendrá el botón.
const textoBoton = "Presione si estas lista 💕";

// 2. Escribe aquí tu mensaje largo.
// Puedes usar \n para comenzar un nuevo párrafo.
const mensajeLargo = `Muy bien, preciosa, sabía que responderías bien ❤️.

Esta sorpresa, hecha con mucho amor, es para ti. También quiero hacerte saber que me gustas muchísimo, que cada día contigo es lindo y que siempre sabes sacarme una sonrisa, jejejeje. Le das luz y color a mi vida.

Yo quiero ser mejor para ti, un buen hombre con el que puedas sentirte segura. Nunca estuve tan decidido en mi vida como lo estoy ahora: quiero estar contigo, quiero hacerte feliz y quiero ser ese compañero de vida que esté a tu lado en cada cosita que logres.

También quiero estar contigo cuando caigas y estés triste, para poder animarte y ayudarte a levantarte. Porque, mientras yo esté a tu lado, haré todo lo posible para verte sonreír y recordarte lo valiosa que eres. ❤️

Jejeje, hace poco soñé contigo. Soñé que nos casábamos, que éramos muy felices juntos y que me decías: «Mira, cariño, lo logramos. Nos casamos y cumplimos nuestro sueño de formar una familia y un hogar juntos».

Fue un sueño maravilloso. 🥹💗

Con esto quiero hacerte saber que no me rendiré fácilmente con nosotros. Lucharé con todo lo que tengo para que podamos estar juntos, porque te amo. Sí, te amo muchísimo, y quiero dar lo mejor de mí para que construyamos una vida llena de amor y felicidad.

Porque yo, como tu futuro esposo, quiero hacerte muy feliz y, como te dije, ¡te voy a consentir muchísimo! Jejeje. Quiero darte todo lo bonito que esté en mis manos, cuidarte y recordarte cada día lo especial que eres para mí.

Tienes mi corazón en tus manos, tienes todo mi amor y mi alma te ama más de lo que las palabras pueden explicar. ❤️

Por ti pondría el mundo a arder si eso fuera lo que deseas. Como dice esa frase: «Si el mundo está en tu contra, yo estaré en contra del mundo», porque mi único mundo eres tú, solo tú, Ademis.

Te amo. ❤️❤️ no se vaya aun falta algo mas jejeje ❤️ `;

// 3. Velocidad de escritura en milisegundos.
// Un número menor hace que escriba más rápido.
const velocidadEscritura = 70;

// 4. Tiempo de espera al terminar el mensaje.
const esperaAntesDeFoto = 2500;


/* =====================================
   FUNCIONAMIENTO DE LA PÁGINA
   ===================================== */

const welcomeScreen = document.getElementById("welcome-screen");
const messageScreen = document.getElementById("message-screen");
const photoScreen = document.getElementById("photo-screen");

const startButton = document.getElementById("start-btn");
const typedMessage = document.getElementById("typed-message");

const heartContainer = document.getElementById("heart-container");
const sparkleContainer = document.getElementById("sparkle-container");

// Coloca el texto que elegiste en el botón.
startButton.textContent = textoBoton;

// Evita que el botón se pulse varias veces.
let started = false;
let heartTimer = null;


// Al presionar el botón, comienza la sorpresa.
startButton.addEventListener("click", () => {
    if (started) return;

    started = true;
 // Iniciar la música al presionar el botón.
    const musica = document.getElementById("bg-music");
    musica.volume = 0.26;

    musica.play().catch(error => {
        console.log("No se pudo reproducir la música:", error);
    });
    // Ocultar bienvenida y mostrar la lluvia de corazones.
    welcomeScreen.classList.add("hidden");

    const heartIntro = document.getElementById("heart-intro");
    const introHearts = document.getElementById("intro-hearts");

    heartIntro.classList.remove("hidden");

    // Crear muchos corazones en distintas posiciones.
    const corazones = ["❤️", "💗", "💕", "💖", "💘", "💞"];

    for (let i = 0; i < 100; i++) {
        const corazon = document.createElement("span");

        corazon.className = "intro-heart";
        corazon.textContent =
            corazones[Math.floor(Math.random() * corazones.length)];

        corazon.style.left = Math.random() * 100 + "%";
        corazon.style.fontSize = (18 + Math.random() * 35) + "px";

        corazon.style.setProperty(
            "--fall-time",
            (2 + Math.random() * 2.5) + "s"
        );

        corazon.style.animationDelay = (Math.random() * 1.2) + "s";

        introHearts.appendChild(corazon);
    }

    // Después de los corazones, comenzar las preguntas.
    setTimeout(() => {
        heartIntro.classList.add("hidden");
        introHearts.replaceChildren();

        const questionsScreen =
            document.getElementById("questions-screen");

        questionsScreen.classList.remove("hidden");
        mostrarPregunta();
    }, 4000);
});

/* =====================================
   LAS CUATRO PREGUNTAS DE ADEMÍS
   ===================================== */

const preguntas = [
    {
        pregunta: "¿Cuál es la flor favorita de Juan?",
        correcta: "🌷 Tulipán",
        incorrecta: "🌻 Girasol"
    },
    {
        pregunta: "¿Cuándo fue la primera vez que le compuse una canción?",
        correcta: "💗 En nuestro aniversario de mes",
        incorrecta: "🎂 En tu cumpleaños"
    },
    {
        pregunta: "¿Cómo se llama la primera serie que vimos?",
        correcta: "💕 Veinticinco, veintiuno",
        incorrecta: "🎬 Alice in Borderland"
    },
    {
        pregunta: "¿Cuál es el color favorito de Juan?",
        correcta: "🖤🤍 Blanco y negro",
        incorrecta: "💚💛 Verde y amarillo"
    }
];

let preguntaActual = 0;
let respuestaBloqueada = false;

const questionText = document.getElementById("question-text");
const questionCounter = document.getElementById("question-counter");
const answerOne = document.getElementById("answer-one");
const answerTwo = document.getElementById("answer-two");
const answerFeedback = document.getElementById("answer-feedback");
const questionsScreen = document.getElementById("questions-screen");

function mostrarPregunta() {
    respuestaBloqueada = false;

    const pregunta = preguntas[preguntaActual];

    questionCounter.textContent =
        `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    questionText.textContent = pregunta.pregunta;

    // Mostrar primero la respuesta correcta.
    answerOne.textContent = pregunta.correcta;
    answerTwo.textContent = pregunta.incorrecta;

    answerFeedback.textContent = "";

    answerOne.disabled = false;
    answerTwo.disabled = false;
}

answerOne.addEventListener("click", () => {
    comprobarRespuesta(true);
});

answerTwo.addEventListener("click", () => {
    comprobarRespuesta(false);
});

function comprobarRespuesta(esCorrecta) {
    if (respuestaBloqueada) return;

    if (!esCorrecta) {
        answerFeedback.textContent =
            "¡Ups! 💗 Inténtalo otra vez, tú puedes.";

        return;
    }

    respuestaBloqueada = true;
    answerOne.disabled = true;
    answerTwo.disabled = true;

    answerFeedback.textContent = "¡Muy bien, cariño! 💗";

    setTimeout(() => {
        preguntaActual++;

        if (preguntaActual < preguntas.length) {
            mostrarPregunta();
        } else {
            // Las cuatro respuestas fueron correctas.
            questionsScreen.classList.add("hidden");
            messageScreen.classList.remove("hidden");
            escribirMensaje();
        }
    }, 900);
}
// Escribe el mensaje carácter por carácter.
function escribirMensaje() {
    let posicion = 0;
    const caracteres = Array.from(mensajeLargo);

    function escribirLetra() {
        if (posicion < caracteres.length) {
            typedMessage.textContent += caracteres[posicion];
            posicion++;

            setTimeout(escribirLetra, velocidadEscritura);
        } else {
            // El mensaje terminó.
            setTimeout(mostrarFoto, esperaAntesDeFoto);
        }
    }

    escribirLetra();
}


// Muestra la foto cuando termina el mensaje.
function mostrarFoto() {
    messageScreen.classList.add("hidden");
    photoScreen.classList.remove("hidden");

    crearDestellos();
    lanzarCorazones();
}


// Crea destellos en distintas posiciones.
function crearDestellos() {
    sparkleContainer.replaceChildren();

    for (let i = 0; i < 35; i++) {
        const destello = document.createElement("span");

        destello.className = "sparkle";
        destello.style.left = Math.random() * 100 + "%";
        destello.style.top = Math.random() * 100 + "%";
        destello.style.animationDelay =
            Math.random() * 2 + "s";

        sparkleContainer.appendChild(destello);
    }
}


// Hace que aparezcan corazones flotantes.
function lanzarCorazones() {
    const corazones = ["💗", "💕", "💖", "💘", "❤️"];

    // Lanza corazones continuamente mientras se vea la foto.
    heartTimer = setInterval(() => {
        if (photoScreen.classList.contains("hidden")) {
            clearInterval(heartTimer);
            return;
        }

        const corazon = document.createElement("span");

        corazon.className = "heart";
        corazon.textContent =
            corazones[Math.floor(Math.random() * corazones.length)];

        corazon.style.left = Math.random() * 95 + "%";
        corazon.style.setProperty(
            "--duration",
            (4 + Math.random() * 3) + "s"
        );

        corazon.style.fontSize =
            (18 + Math.random() * 22) + "px";

        heartContainer.appendChild(corazon);

        // Elimina el corazón cuando termina su animación.
        corazon.addEventListener("animationend", () => {
            corazon.remove();
        }, { once: true });

    }, 350);
}
