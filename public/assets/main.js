window.addEventListener("DOMContentLoaded", () => {
  const photos = gsap.utils.toArray(".photo");
  let current = 0;
  const fadeDuration = 1;
  const visibleDuration = 2;

  function fadeNextPhoto() {
    const prev = current === 0 ? photos.length - 1 : current - 1;

    // Zet alle z-indexen standaard laag
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

  // Init: alle opacity op 0 behalve de eerste foto
  photos.forEach((p) => (p.style.opacity = 0));
  photos[0].style.opacity = 1;
  photos[0].style.zIndex = 3;

  fadeNextPhoto();
});
