const words = [
    { word: "javascript", hint: "Lenguaje de programación web" },
    { word: "programacion", hint: "Proceso de escribir código" },
    { word: "desarrollo", hint: "Creación de software" },
    { word: "ahorcado", hint: "Juego de adivinanza" },
    { word: "computadora", hint: "Máquina que procesa datos" }
];

let selectedWord = '';
let selectedHint = '';
let attemptsLeft = 6;
let guessedLetters = [];
let gameOver = false;

const wordDisplay = document.getElementById('wordDisplay');
const attemptsDisplay = document.getElementById('attempts');
const hintDisplay = document.getElementById('hint');
const messageDisplay = document.getElementById('message');
const letterInput = document.getElementById('letterInput');
const guessButton = document.getElementById('guessButton');
const resetButton = document.getElementById('resetButton');
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

function startGame() {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word;
    selectedHint = words[randomIndex].hint;
    attemptsLeft = 6;
    guessedLetters = [];
    gameOver = false;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    drawHang(); // Dibujar la estructura de la horca
    drawHangman(0); // Dibujar el ahorcado vacío
    updateDisplay();
}

function updateDisplay() {
    const displayWord = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    wordDisplay.textContent = displayWord;
    hintDisplay.textContent = selectedHint;
    attemptsDisplay.textContent = attemptsLeft;

    if (displayWord.replace(/ /g, '') === selectedWord) {
        messageDisplay.textContent = '¡Ganaste!';
        gameOver = true;
    } else if (attemptsLeft <= 0) {
        messageDisplay.textContent = `¡Perdiste! La palabra era "${selectedWord}".`;
        gameOver = true;
    } else {
        messageDisplay.textContent = '';
    }
}

function drawHang() {
    ctx.beginPath();
    ctx.moveTo(20, 180); // Base
    ctx.lineTo(180, 180); // Base
    ctx.moveTo(40, 180); // Post
    ctx.lineTo(40, 40); // Vertical
    ctx.lineTo(120, 40); // Horizontal
    ctx.lineTo(120, 60); // Horizontal
    ctx.stroke();
}

function drawHangman(step) {
    switch (step) {
        case 1: // Cabeza
            ctx.beginPath();
            ctx.arc(120, 75, 15, 0, Math.PI * 2, true); // Dibuja la cabeza
            ctx.stroke();
            break;
        case 2: // Cuerpo
            ctx.beginPath();
            ctx.moveTo(120, 90);
            ctx.lineTo(120, 135); // Dibuja el cuerpo
            ctx.stroke();
            break;
        case 3: // Brazo izquierdo
            ctx.beginPath();
            ctx.moveTo(120, 90);
            ctx.lineTo(100, 105); // Dibuja el brazo izquierdo
            ctx.stroke();
            break;
        case 4: // Brazo derecho
            ctx.beginPath();
            ctx.moveTo(120, 90);
            ctx.lineTo(140, 105); // Dibuja el brazo derecho
            ctx.stroke();
            break;
        case 5: // Pierna izquierda
            ctx.beginPath();
            ctx.moveTo(120, 135);
            ctx.lineTo(100, 160); // Dibuja la pierna izquierda
            ctx.stroke();
            break;
        case 6: // Pierna derecha
            ctx.beginPath();
            ctx.moveTo(120, 135);
            ctx.lineTo(140, 160); // Dibuja la pierna derecha
            ctx.stroke();
            break;
        default:
            break;
    }
}

guessButton.addEventListener('click', () => {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = '';

    if (!gameOver && letter && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!selectedWord.includes(letter)) {
            attemptsLeft--;
            drawHangman(6 - attemptsLeft); // Dibuja el siguiente paso
        }
        updateDisplay();
    }
});

resetButton.addEventListener('click', startGame);

startGame();
