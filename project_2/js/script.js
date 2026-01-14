document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. EFECTO FONDO MATRIX (ROJO "RED ALERT")
       ========================================= */
    const canvas = document.getElementById('ciber-fondo');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        // Caracteres: Mezcla de números, letras y Katakana para efecto hacker
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZROJO@#$%&';
        const charArray = characters.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        // Inicializamos las gotas
        for (let i = 0; i < columns; i++) drops[i] = 1;

        function drawMatrix() {
            // Rastro oscuro para dejar estela
            ctx.fillStyle = 'rgba(13, 13, 13, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // CAMBIO CLAVE: COLOR ROJO
            ctx.fillStyle = '#ff0000';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Aleatoriedad para que las gotas vuelvan arriba
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        // Velocidad de la animación (33ms = ~30fps)
        setInterval(drawMatrix, 33);

        // Ajustar al redimensionar pantalla
        window.addEventListener('resize', () => {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
        });
    }

    /* =========================================
       2. EFECTO DESENCRIPTADO (HACKER DECODE)
       ========================================= */
    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&[]{}<>";
    const elements = document.querySelectorAll('.hack-decode');

    elements.forEach(element => {
        const originalText = element.innerText;
        const originalArray = originalText.split("");

        // Texto inicial basura
        element.innerText = originalArray.map(() =>
            symbols[Math.floor(Math.random() * symbols.length)]
        ).join("");

        let iteration = 0;
        let interval = setInterval(() => {
            element.innerText = element.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return symbols[Math.floor(Math.random() * symbols.length)];
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);
    });
});
