document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const introScene = document.getElementById('intro-scene');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const envelope = document.getElementById('envelope');
    const letterModal = document.getElementById('letter-modal');
    const enterBtn = document.getElementById('enter-calendar-btn');

    const params = new URLSearchParams(window.location.search);
    const quiereReleer = params.get('releer') === '1';
    const yaVioCarta = localStorage.getItem('carta_adviento_vista') === 'true';

    setTimeout(() => {
        loader.classList.add('fade-out');

        setTimeout(() => {
            loader.classList.add('hidden');
            if (yaVioCarta && !quiereReleer) {
                window.location.href = 'calendario.html';
            } else {
                introScene.classList.remove('hidden');
            }
        }, 800);
    }, 1800);

    const openEnvelope = () => {
        envelope.classList.add('open');
        setTimeout(() => {
            envelopeWrapper.classList.add('hidden');
            letterModal.classList.remove('hidden');
        }, 650);
    };

    envelope.addEventListener('click', openEnvelope);
    envelope.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') openEnvelope();
    });

    enterBtn.addEventListener('click', () => {
        localStorage.setItem('carta_adviento_vista', 'true');
        window.location.href = 'calendario.html';
    });
    
    if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}
});
