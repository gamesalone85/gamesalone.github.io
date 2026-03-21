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
breakpoints: {
    768: {
        slidesPerView: 1
    },
    1024: {
        slidesPerView: 1
    }
}
});

// Navegación
function go(link) {
    if (link !== "#") window.location.href = link;
}

console.log("Home cargado correctamente");
