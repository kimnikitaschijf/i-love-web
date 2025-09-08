// Website enter animatie
// Kleuren van letters (roze, blauw en paars)
const colors = [
    '#6B4D38'
];

const textEl = document.getElementById('hero-text');
const text = textEl.textContent;
textEl.textContent = '';

// Splits tekst in letters met span per letter
text.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    textEl.appendChild(span);
});

const spans = textEl.querySelectorAll('span');

// Animate letters 1 voor 1 binnenkomend
spans.forEach((span, i) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    gsap.set(span, { color: color });

    gsap.fromTo(span,
        {
            opacity: 0,
            y: 30,
            scale: 0.6,
            rotation: -15 + Math.random() * 30
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
            delay: i * 0.07 + Math.random() * 0.2
        }
    );
});

// Photo-stack animatie
const photos = gsap.utils.toArray(".photo");
if (photos.length > 0) {
    let current = 0;
    const fadeDuration = 1;
    const visibleDuration = 2;

    function fadeNextPhoto() {
        const prev = current === 0 ? photos.length - 1 : current - 1;

        // Zet alle z-index standaard laag
        photos.forEach((p) => (p.style.zIndex = 1));

        // Vorige foto iets hoger en deels zichtbaar
        photos[prev].style.zIndex = 2;
        gsap.to(photos[prev], {
            opacity: 0.4,
            duration: fadeDuration,
            ease: "power1.inOut",
        });

        // Nieuwe foto bovenop en volledig zichtbaar
        photos[current].style.zIndex = 3;
        gsap.to(photos[current], {
            opacity: 1,
            duration: fadeDuration,
            ease: "power1.inOut",
            onComplete: () => {
                setTimeout(() => {
                    current = (current + 1) % photos.length;
                    fadeNextPhoto();
                }, visibleDuration * 1000);
            },
        });
    }

    // Alle opacity op 0 behalve de eerste foto
    photos.forEach((p) => (p.style.opacity = 0));
    photos[0].style.opacity = 1;
    photos[0].style.zIndex = 3;

    fadeNextPhoto();
}