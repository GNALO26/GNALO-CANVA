// Initialisation de AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Optionnel : changer le fond de la navbar au scroll
window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(26, 26, 46, 0.98)';
    } else {
        nav.style.background = 'rgba(26, 26, 46, 0.95)';
    }
});

// ========== Animation d'intro : dessin lettre par lettre ==========
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) return;

    const textElement = document.querySelector('.intro-text');
    const message = "GNALO CANVA PRO";
    const letters = message.split('');

    letters.forEach((letter) => {
        const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.textContent = letter === ' ' ? '\u00A0' : letter;
        textElement.appendChild(tspan);
    });

    const tspans = document.querySelectorAll('.intro-text tspan');
    const totalLetters = tspans.length;

    tspans.forEach((tspan, index) => {
        if (tspan.textContent.trim() !== '') {
            const delay = index * 0.4;
            tspan.style.animation = `drawLetter 1.2s ease ${delay}s forwards`;
        }
    });

    const lastLetterIndex = totalLetters - 1;
    const lastDelay = (lastLetterIndex * 0.4);
    const animationDuration = 1.2;
    const totalTime = (lastDelay + animationDuration + 0.5) * 1000;

    setTimeout(() => {
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
        AOS.refresh();
    }, totalTime);
});

// Copier les numéros (bouton optionnel)
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Numéro copié !');
    });
}