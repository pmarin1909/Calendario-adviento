const CONTENIDO_DIAS = {
    1: {
        titulo: "Empieza nuestro diciembre",
        mensaje: "Hoy se abre la primera ventanita. Quería empezar recordándote lo mucho que me gusta compartir contigo cada día.",
        fondoCasilla: "img/casillas/1.jpeg",
        tema: "",
        imagen: "",
        enlaceTexto: "",
        enlaceUrl: ""
    },
    2: {
        titulo: "Nuestra canción",
        mensaje: "Cada vez que suena esta canción me acuerdo de ti al instante.",
        fondoCasilla: "img/casillas/2.jpeg",
        tema: "",
        enlaceTexto: "Escuchar en Spotify",
        enlaceUrl: "https://open.spotify.com/"
    },
    24: {
        titulo: "Feliz Nochebuena",
        mensaje: "Llegamos al último día del calendario. Gracias por hacer de este año algo tan especial.",
        fondoCasilla: "img/casillas/24.jpeg",
        tema: "red"
    }
};

// Relleno automático para el resto de días
for (let i = 1; i <= 24; i++) {
    if (!CONTENIDO_DIAS[i]) {
        CONTENIDO_DIAS[i] = {
            titulo: `Sorpresa del día ${i}`,
            mensaje: "Aquí irá tu mensaje, recuerdo o vale especial para este día.",
            fondoCasilla: `img/casillas/${i}.jpeg`,
            tema: i % 2 === 0 ? "green" : "red"
        };
    }
}
