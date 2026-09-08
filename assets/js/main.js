// ========== Initialisation de AOS ==========
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
});

// ========== Changement de fond de la navbar au scroll ==========
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

    // On vide le texte existant pour le reconstruire
    textElement.innerHTML = '';

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

    // Fermer l'overlay après l'animation
    setTimeout(() => {
        closeOverlay();
    }, totalTime);

    // Fallback de sécurité : fermer après 8 secondes
    setTimeout(closeOverlay, 8000);

    function closeOverlay() {
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
        // Forcer un rafraîchissement de AOS après la fermeture
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }
});

// ========== Fonction utilitaire pour copier un texte ==========
function copyText(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Numéro copié !');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        alert('Numéro copié !');
    } catch (err) {
        alert('Impossible de copier le numéro.');
    }
    document.body.removeChild(textarea);
}