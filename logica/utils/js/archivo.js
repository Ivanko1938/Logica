//-------------------------------------------
// VARIABLES GLOBALES
//-------------------------------------------

let nombreJugador = "";
let mazo = [];
let manoBanca = [];
let manoJugador = [];
let puntosBanca = 0;
let puntosJugador = 0;

const tipos = ["C", "P", "T", "D"]; // Corazones, Picas, Tréboles, Diamantes

//-------------------------------------------
// PREGUNTAR NOMBRE
//-------------------------------------------
Swal.fire({
  title: "Bienvenido al Blackjack",
  text: "¿Cuál es tu nombre?",
  input: "text",
  inputPlaceholder: "Escribe tu nombre",
  allowOutsideClick: false,
}).then((result) => {
  nombreJugador = result.value || "Jugador";
  document.getElementById("nombreJugador").textContent = nombreJugador;
});

//-------------------------------------------
// CREAR MAZO
//-------------------------------------------
function crearMazo() {
  mazo = [];
  for (let palo of tipos) {
    for (let valor = 1; valor <= 13; valor++) {
      // Los archivos de las figuras se llaman JC.png, QC.png, KC.png (no 11C, 12C, 13C)
      let nombreArchivo = valor;
      if (valor === 11) nombreArchivo = "J";
      if (valor === 12) nombreArchivo = "Q";
      if (valor === 13) nombreArchivo = "K";

      mazo.push({
        value: valor,
        palo: palo,
        Img: `../../img/cartas/${nombreArchivo}${palo}.png`,
      });
    }
  }
}

//-------------------------------------------
// ELEGIR CARTA DEL MAZO
//-------------------------------------------
function elegirCarta() {
  const index = Math.floor(Math.random() * mazo.length);
  const carta = mazo[index];
  mazo.splice(index, 1); // quitar carta del mazo
  return carta;
}

//-------------------------------------------
// VALOR DE UNA CARTA
//-------------------------------------------
function getCartaValor(carta) {
  if (carta.value === 1) return 1; // AS vale 1
  if (carta.value >= 11) return 10; // J, Q, K valen 10
  return carta.value; // 2 a 10
}

//-------------------------------------------
// MOSTRAR CARTA EN PANTALLA
//-------------------------------------------
function veoCarta(contenedorId, cartaImg) {
  const contenedor = document.getElementById(contenedorId);
  const img = document.createElement("img");
  img.src = cartaImg;
  img.classList.add("carta");
  contenedor.appendChild(img);
}

//-------------------------------------------
// INICIAR PARTIDA
//-------------------------------------------
function empezarJuego() {
  crearMazo();

  // Reiniciar mesa
  document.getElementById("cartas-banca").innerHTML = "";
  document.getElementById("cartas-jugador").innerHTML = "";
  puntosBanca = puntosJugador = 0;
  manoBanca = [];
  manoJugador = [];

  //-------------------------------------------
  // TURNO BANCA
  //-------------------------------------------
  while (puntosBanca < 17) {
    const carta = elegirCarta();
    manoBanca.push(carta);

    puntosBanca += getCartaValor(carta);
    veoCarta("cartas-banca", carta.Img);

    document.getElementById("puntos-banca").textContent = puntosBanca;

    if (puntosBanca >= 22) {
      Swal.fire("La banca se ha pasado", "¡Ganaste!", "success");
      return;
    }
  }
}

//-------------------------------------------
// TURNO DEL JUGADOR
//-------------------------------------------
function juegoJugador() {
  const carta = elegirCarta();
  manoJugador.push(carta);

  puntosJugador += getCartaValor(carta);

  veoCarta("cartas-jugador", carta.Img);

  document.getElementById("puntos-jugador").textContent = puntosJugador;

  if (puntosJugador >= 22) {
    Swal.fire("Te pasaste 😵", "La banca gana", "error");
  }
}

//-------------------------------------------
// DECIDIR GANADOR
//-------------------------------------------
function finPartida() {
  if (puntosJugador > puntosBanca) {
    Swal.fire("¡Ganaste! 🎉", "", "success");
  } else if (puntosJugador === puntosBanca) {
    Swal.fire("Empate 🤝", "", "info");
  } else {
    Swal.fire("Has perdido 😢", "La banca gana", "error");
  }
}

//-------------------------------------------
// INICIAR AUTOMÁTICAMENTE AL CARGAR
//-------------------------------------------
window.onload = empezarJuego;
