// Swiper Coverflow
const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    loop: true,

    coverflowEffect: {
    rotate: 35,
    stretch: 0,
    depth: 250,
    modifier: 1.2,
    slideShadows: true,
},
});

// Navegación
function go(link) {
    if (link !== "#") window.location.href = link;
}

console.log("Home cargado correctamente");
