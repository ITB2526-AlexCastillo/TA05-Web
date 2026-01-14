/* ==========================================
   UBICACIÓN: feedback/js/script.js
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------------
       1. EFECTO MATRIX (FONDO)
       -------------------------------------- */
    const canvas = document.getElementById('ciber-fondo');

    if (canvas) {
        const ctx = canvas.getContext('2d');

        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charArray = characters.split('');
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let i = 0; i < columns; i++) drops[i] = 1;

        function draw() {
            ctx.fillStyle = 'rgba(13, 13, 13, 0.05)'; // Estela
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ff0000'; // COLOR ROJO
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(draw, 33);

        window.addEventListener('resize', () => {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
        });
    }

    /* --------------------------------------
       2. LÓGICA DEL BOTÓN (NO ENVIAR NADA)
       -------------------------------------- */
    const form = document.querySelector('.formulario-cuestionario');

    // Verificamos si existe el formulario para evitar errores
    if (form) {
        form.addEventListener('submit', (e) => {
            // ESTA LÍNEA ES LA IMPORTANTE:
            // Evita que la página recargue o envíe datos reales
            e.preventDefault();

            // Mostramos mensaje de simulación
            alert("Simulation: Data input accepted locally.");

            // Borramos los campos del formulario
            form.reset();
            console.log("Formulario limpiado. Envío simulado.");
        });
    }
});
