// Swiper Coverflow
const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,

    coverflowEffect: {
        rotate: 25,
        stretch: 0,
        depth: 180,
        modifier: 1,
        slideShadows: true,
    },
});

// Navegación
function go(link) {
    if (link !== "#") window.location.href = link;
}

console.log("Home cargado correctamente");
