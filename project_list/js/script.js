/* ============================================================
   ARCHIVO: script.js
   DESCRIPCIÓN: Lógica principal y efecto de fondo Matrix
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // 1. OBTENER EL LIENZO (CANVAS)
    const canvas = document.getElementById('ciber-fondo');

    // Verificación de seguridad:
    // Si esta página no tiene el canvas (ej. una página simple), el script se detiene aquí y no da error.
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // 2. CONFIGURACIÓN
    const fontSize = 16;       // Tamaño de la letra
    const colorMatrix = '#ff0000'; // COLOR ROJO (Cámbialo a '#0F0' para verde clásico)
    const speed = 33;          // Velocidad en milisegundos (aprox 30 FPS)

    // 3. CARACTERES (Katakana + Latino + Números)
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    // Variables de estado
    let columns;
    let rainDrops = [];

    // 4. FUNCIÓN: AJUSTAR TAMAÑO DE PANTALLA
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Calculamos cuántas columnas caben en el nuevo ancho
        const newColumns = Math.floor(canvas.width / fontSize);

        // Si hay más columnas que antes (pantalla más ancha), llenamos el array
        // (Si no hacemos esto, la parte derecha de la pantalla se quedaría vacía al estirar)
        for (let x = rainDrops.length; x < newColumns; x++) {
            rainDrops[x] = 1;
        }

        columns = newColumns;
    };

    // 5. FUNCIÓN: DIBUJAR (El bucle de animación)
    const draw = () => {
        // a) Pintar fondo negro con mucha transparencia (0.05) para crear el efecto "estela"
        ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // b) Configurar el texto
        ctx.fillStyle = colorMatrix;
        ctx.font = fontSize + 'px monospace';

        // c) Iterar sobre cada columna (gota)
        for (let i = 0; i < rainDrops.length; i++) {
            // Elegir un carácter al azar
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

            // Dibujar el carácter
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            // Condición para reiniciar la gota arriba:
            // 1. Ha pasado el final de la pantalla
            // 2. Un factor aleatorio (para que no caigan todas a la vez como una cortina)
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }

            // Mover la gota hacia abajo
            rainDrops[i]++;
        }
    };

    // --- INICIALIZACIÓN ---

    // 1. Inicializar el array de gotas la primera vez
    // (Llenamos rainDrops temporalmente para que resizeCanvas funcione bien)
    columns = Math.floor(window.innerWidth / fontSize);
    for( let x = 0; x < columns; x++ ) {
        rainDrops[x] = 1;
    }

    // 2. Ajustar tamaño real
    resizeCanvas();

    // 3. Arrancar el bucle de animación
    setInterval(draw, speed);

    // 4. Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', resizeCanvas);

});