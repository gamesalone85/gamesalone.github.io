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
//////////////////////////////////////////////////
// 🤖 GAMESALONE18 CHATBOT - MOTOR BASE
//////////////////////////////////////////////////

const BOT_INTENTS = [
    {
        name: "merch",
        keywords: ["tienda", "comprar", "merch", "productos", "ropa", "accesorios"],
        route: "/merch/",
        responses: [
            "🛒 Tenemos merch oficial de GamesAlone18 Universe.",
            "🔥 Colecciones exclusivas y limitadas disponibles ahora."
        ]
    },
    {
        name: "zona",
        keywords: ["zona", "vip", "exclusivo", "registro", "premium", "miembros"],
        route: "/zona/",
        responses: [
            "⭐ La Zona Exclusiva es para miembros.",
            "👾 Acceso premium con beneficios especiales."
        ]
    },
    {
        name: "contacto",
        keywords: ["contacto", "correo", "hablar", "equipo", "soporte"],
        route: "/contactanos/",
        responses: [
            "💬 Puedes contactar al equipo desde aquí.",
            "📩 Atención para colaboraciones y eventos."
        ]
    },
    {
        name: "eventos",
        keywords: ["eventos", "torneos", "agenda", "event", "actividades"],
        route: "/eventos/",
        responses: [
            "🎟️ Aquí puedes ver eventos activos."
        ]
    }
];
function detectBotIntent(text){

    const input = text.toLowerCase();

    for(const intent of BOT_INTENTS){
        if(intent.keywords.some(k => input.includes(k))){
            return intent;
        }
    }

    return null;
}
function handleBotMessage(text){

    const intent = detectBotIntent(text);

    if(!intent){
        return {
            type: "unknown",
            message: "🤖 No entendí eso aún. Prueba: tienda, zona exclusiva o contacto.",
            route: null
        };
    }

    const response =
        intent.responses[Math.floor(Math.random() * intent.responses.length)];

    return {
        type: intent.name,
        message: response,
        route: intent.route
    };
}
console.log("🔥 BOT SYSTEM TEST ACTIVE");

console.log(
    handleBotMessage("quiero comprar merch")
);
