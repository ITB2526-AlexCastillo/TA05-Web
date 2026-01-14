/* === MATRIX RAIN EFFECT === */

const canvas = document.getElementById('ciber-fondo');
const ctx = canvas.getContext('2d');

// Hacemos que el canvas ocupe toda la pantalla
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Caracteres que caerán (Katakana + Números + Alfabeto)
const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charArray = characters.split('');

const fontSize = 16;
const columns = canvas.width / fontSize; // Número de columnas

// Array para guardar la posición Y de cada columna
const drops = [];

// Inicializamos todas las columnas en la posición 1 (arriba)
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function draw() {
    // Pintamos un fondo negro semitransparente para crear el efecto de "estela"
    // 0.05 es la opacidad (cuanto más bajo, más larga la estela)
    ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Color del texto (Verde Hacker)
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    // Bucle para pintar las gotas
    for (let i = 0; i < drops.length; i++) {
        // Elegimos un carácter aleatorio
        const text = charArray[Math.floor(Math.random() * charArray.length)];

        // Pintamos el carácter en la posición X, Y correspondiente
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reiniciamos la gota a la parte superior aleatoriamente
        // Esto hace que no caigan todas a la vez como una pared
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Incrementamos la posición Y
        drops[i]++;
    }
}

// Ejecutamos la función draw cada 33 milisegundos (aprox 30 FPS)
setInterval(draw, 33);

// Si el usuario cambia el tamaño de la ventana, ajustamos el canvas
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // Recalculamos columnas si cambia el ancho
    const newColumns = canvas.width / fontSize;
    drops.length = 0; // Limpiamos array
    for (let i = 0; i < newColumns; i++) {
        drops[i] = 1;
    }
});
