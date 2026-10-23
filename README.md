# Blackjack — juego de cartas en JavaScript

Juego de **Blackjack contra la banca** que se juega en el navegador, hecho solo con HTML, CSS y JavaScript (sin
frameworks). Es un **proyecto académico** de mis estudios de programación (módulo de desarrollo web en entorno cliente):
el objetivo era practicar la lógica de programación y la manipulación del DOM.

## Cómo se juega

1. Al abrir la página aparece una ventana que pide tu **nombre**.
2. La **banca** reparte sus cartas automáticamente: pide hasta llegar a **17 o más**. Si se pasa de 21, **ganas**.
3. Tú pulsas **Pedir carta** las veces que quieras. Si te pasas de 21, **pierdes**.
4. Pulsa **Plantarte** para comparar tu puntuación con la de la banca: gana la más alta sin pasarse de 21; si hay igualdad, **empate**.

Valor de las cartas: del 2 al 10 valen su número, **J, Q y K valen 10** y el **As vale 1**.

## Tecnologías

- HTML5 y CSS3
- JavaScript (ES6, sin librerías): arrays, objetos, funciones, eventos y manipulación del DOM
- [SweetAlert2](https://sweetalert2.github.io/) (por CDN) para las ventanas de nombre y de resultado
- Baraja de 52 cartas en imágenes PNG

## Cómo ejecutarlo

Las rutas de las imágenes de la cabecera son absolutas (`/logica/img/...`), así que hay que servir la **carpeta raíz del proyecto**
desde un servidor local; abrir el HTML con doble clic no carga esas imágenes.

**Con Visual Studio Code:**
1. Instala la extensión *Live Server*.
2. Abre la carpeta del proyecto en VS Code.
3. Clic derecho en `logica/utils/js/blackjack.html` → *Open with Live Server*.

**Con Python (sin instalar nada más):**
```bash
python -m http.server 8000
# y abre http://localhost:8000/logica/utils/js/blackjack.html
```

Necesita conexión a internet para cargar SweetAlert2.

## Estructura

```
logica/
├── img/                    Imágenes: cabecera, título, ficha de casino y baraja (cartas/)
│   └── cartas/             52 cartas con el nombre <valor><palo>.png  (1C, 10P, JD, KT...)
└── utils/js/
    ├── blackjack.html      Página del juego
    ├── styles.css          Estilos
    └── archivo.js          Lógica: baraja, turnos y resultado
```

Palos: `C` corazones, `P` picas, `T` tréboles, `D` diamantes.

## Cómo está hecho (resumen del código)

| Función en `archivo.js` | Qué hace |
|---|---|
| `crearMazo()` | Construye las 52 cartas (valor, palo y ruta de su imagen) |
| `elegirCarta()` | Saca una carta al azar y la **quita del mazo**, para que no se repita |
| `getCartaValor()` | Valor en puntos de una carta (figuras = 10, As = 1) |
| `veoCarta()` | Dibuja la imagen de la carta en la mesa |
| `empezarJuego()` | Prepara la mesa y juega el turno de la banca |
| `juegoJugador()` | Reparte una carta al jugador y comprueba si se pasa |
| `finPartida()` | Compara puntuaciones y muestra el resultado |

## Limitaciones conocidas

Es un ejercicio de lógica y está sin pulir. Cosas que mejoraría:

- El **As siempre vale 1** (en el Blackjack real puede valer 1 u 11).
- No hay botón de **nueva partida**: hay que recargar la página. Tras terminar, los botones siguen activos.
- La banca juega **antes** que el jugador y sus cartas se ven desde el principio (no hay carta oculta).
- No se detecta el Blackjack natural (21 con dos cartas) ni hay apuestas.
- La ruta de las imágenes de cabecera es absoluta, por lo que necesita un servidor local en la raíz del proyecto.

## Autor

[github.com/Ivanko1938](https://github.com/Ivanko1938)
