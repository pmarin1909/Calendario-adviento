document.addEventListener('DOMContentLoaded', () => {
    // Ponlo en false cuando vayas a publicarlo para ella
    const MODO_PRUEBA = true;

    // Truco para resetear todo entrando a calendario.html?reset=1
    const params = new URLSearchParams(window.location.search);
    if (params.get('reset') === '1') {
        localStorage.removeItem('dias_adviento_abiertos');
        localStorage.removeItem('carta_adviento_vista');
        window.location.href = 'index.html';
        return;
    }

    const grid = document.getElementById('calendar-grid');
    const dayModal = document.getElementById('day-modal');
    const lockedModal = document.getElementById('locked-modal');
    
    const rereadBtn = document.getElementById('reread-btn');
    const letterRereadModal = document.getElementById('letter-reread-modal');

    const modalDayLabel = document.getElementById('modal-day-label');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalMedia = document.getElementById('modal-media');
    const modalLink = document.getElementById('modal-link');
    const lockedText = document.getElementById('locked-text');

    const hoy = new Date();
    const esDiciembre = hoy.getMonth() === 11; // 0 = enero, 11 = diciembre
    const diaHoy = hoy.getDate();

    const diasAbiertos = new Set(
        JSON.parse(localStorage.getItem('dias_adviento_abiertos') || '[]')
    );

    const guardarAbiertos = () => {
        localStorage.setItem(
            'dias_adviento_abiertos',
            JSON.stringify([...diasAbiertos])
        );
    };

    const estaDesbloqueado = (dia) => {
        if (MODO_PRUEBA) return true;
        return esDiciembre && dia <= diaHoy;
    };

    const abrirModalDia = (dia, slot) => {
        const datos = CONTENIDO_DIAS[dia];

        modalDayLabel.textContent = `Día ${dia} de diciembre`;
        modalTitle.textContent = datos.titulo;
        modalBody.innerHTML = datos.mensaje
            .split('\n')
            .map((p) => `<p>${p}</p>`)
            .join('');

        if (datos.imagen) {
            modalMedia.innerHTML = `<img src="${datos.imagen}" alt="Recuerdo día ${dia}">`;
            modalMedia.classList.remove('hidden');
        } else {
            modalMedia.innerHTML = '';
            modalMedia.classList.add('hidden');
        }

        if (datos.enlaceUrl && datos.enlaceTexto) {
            modalLink.href = datos.enlaceUrl;
            modalLink.textContent = datos.enlaceTexto;
            modalLink.classList.remove('hidden');
        } else {
            modalLink.classList.add('hidden');
        }

        const eraNuevo = !diasAbiertos.has(dia);
        if (eraNuevo) {
            diasAbiertos.add(dia);
            guardarAbiertos();
            slot.classList.add('is-opened');
            setTimeout(() => {
                dayModal.classList.remove('hidden');
            }, 520);
        } else {
            dayModal.classList.remove('hidden');
        }
    };

    const abrirModalBloqueado = (dia) => {
        if (!esDiciembre) {
            lockedText.textContent = `¡Impaciente! El calendario todavía no ha empezado. Podrás abrir el día ${dia} cuando llegue diciembre.`;
        } else {
            const faltan = dia - diaHoy;
            const textoDias = faltan === 1 ? '1 día' : `${faltan} días`;
            lockedText.textContent = `Todavía faltan ${textoDias} para poder abrir esta ventanita.`;
        }
        lockedModal.classList.remove('hidden');
    };

    // Generar las 24 puertas 3D
    for (let dia = 1; dia <= 24; dia++) {
        const datos = CONTENIDO_DIAS[dia];
        const slot = document.createElement('button');
        const tema = datos.tema || (dia % 2 === 0 ? 'green' : 'red');

        slot.className = `door-slot theme-${tema}`;

        const desbloqueado = estaDesbloqueado(dia);
        const abierto = diasAbiertos.has(dia);

        if (dia === 24) slot.classList.add('is-special');
        if (abierto) slot.classList.add('is-opened');
        if (!desbloqueado) slot.classList.add('is-locked');
        if (esDiciembre && dia === diaHoy && !abierto) {
            slot.classList.add('is-today');
        }

        const estado = desbloqueado ? 'Abrir' : 'Bloqueado';
        const estiloFondo = datos.fondoCasilla
            ? `style="background-image: url('${datos.fondoCasilla}')"`
            : '';

        slot.innerHTML = `
            <div class="door-interior">
                <span class="interior-icon">✦</span>
                <span class="interior-day">${dia}</span>
                <span class="interior-label">Ver de nuevo</span>
            </div>
            <div class="door-front" ${estiloFondo}>
                <span class="door-number">${dia}</span>
                <span class="door-status">${estado}</span>
            </div>
        `;

        slot.addEventListener('click', () => {
            if (desbloqueado) {
                abrirModalDia(dia, slot);
            } else {
                abrirModalBloqueado(dia);
            }
        });

        grid.appendChild(slot);
    }
    
    // Abrir carta inicial en modal
    rereadBtn.addEventListener('click', () => {
        letterRereadModal.classList.remove('hidden');
    });

    // Cerrar modales
    const cerrarModales = () => {
        dayModal.classList.add('hidden');
        lockedModal.classList.add('hidden');
        letterRereadModal.classList.add('hidden');
    };

    document.querySelectorAll('.modal-close, .modal-ok-btn').forEach((btn) => {
        btn.addEventListener('click', cerrarModales);
    });

    [dayModal, lockedModal, letterRereadModal].forEach((backdrop) => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) cerrarModales();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarModales();
    });
});
