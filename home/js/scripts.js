// =========================
// SWIPER CONFIG
// =========================
const swiper = new Swiper(".mySwiper", {
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 0,

    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// =========================
// NAVEGACIÓN
// =========================
function go(link) {
    if (link !== "#") {
        window.location.href = link;
    }
}

// =========================
// DEBUG
// =========================
console.log("Home cargado correctamente");

// =========================
// TRAKING WHATS
// =========================
function trackClick(origen) {
    console.log("Click en:", origen);

    if (typeof gtag === "function") {
        gtag('event', 'click_whatsapp', {
            'event_category': 'conversion',
            'event_label': origen
        });
    }
}

