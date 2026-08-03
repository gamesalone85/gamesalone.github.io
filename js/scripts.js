"use strict";

/* =========================================================
   GAMESALONE18 UNIVERSE
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "GamesAlone18 Universe: scripts.js cargado correctamente."
    );


    /* =====================================================
       SWIPER
    ====================================================== */

    const swiperElement =
        document.querySelector(".mySwiper");


    if (
        swiperElement &&
        typeof Swiper !== "undefined"
    ) {

        new Swiper(".mySwiper", {

            loop: true,

            centeredSlides: true,

            grabCursor: true,

            watchOverflow: true,

            speed: 700,

            spaceBetween: 16,

            autoplay: {

                delay: 4500,

                disableOnInteraction: false,

                pauseOnMouseEnter: true

            },

            keyboard: {

                enabled: true,

                onlyInViewport: true

            },

            pagination: {

                el: ".swiper-pagination",

                clickable: true

            },

            navigation: {

                nextEl: ".swiper-button-next",

                prevEl: ".swiper-button-prev"

            },

            breakpoints: {

                0: {

                    slidesPerView: 1,

                    spaceBetween: 10

                },

                576: {

                    slidesPerView: 1,

                    spaceBetween: 12

                },

                768: {

                    slidesPerView: 1,

                    spaceBetween: 16

                },

                992: {

                    slidesPerView: 1,

                    spaceBetween: 18

                },

                1200: {

                    slidesPerView: 1,

                    spaceBetween: 20

                }

            }

        });

    }


    /* =====================================================
       NAVEGACIÓN
    ====================================================== */

    window.go = function (link) {

        if (!link || link === "#") {

            return;

        }

        window.location.href = link;

    };


    /* =====================================================
       TRACKING WHATSAPP
    ====================================================== */

    window.trackClick = function (origen) {

        console.log(
            "GamesAlone18: click registrado:",
            origen
        );

        if (
            typeof gtag === "function"
        ) {

            gtag(
                "event",
                "click_whatsapp",
                {

                    event_category:
                        "conversion",

                    event_label:
                        origen

                }
            );

        }

    };


    /* =====================================================
       COOKIE CONSENT
    ====================================================== */

    initCookieConsent();


    /* =====================================================
       CHATBOT
    ====================================================== */

    initChatbot();


});


/* =========================================================
   COOKIE CONSENT
========================================================= */

function initCookieConsent() {

    const banner =
        document.getElementById(
            "cookie-consent"
        );

    const acceptBtn =
        document.getElementById(
            "accept-cookies"
        );

    const rejectBtn =
        document.getElementById(
            "reject-cookies"
        );


    if (
        !banner ||
        !acceptBtn ||
        !rejectBtn
    ) {

        console.warn(
            "GamesAlone18: elementos de cookies no encontrados."
        );

        return;

    }


    const consent =
        localStorage.getItem(
            "ga18_cookie_consent"
        );


    /* =====================================================
       SI YA EXISTE DECISIÓN
    ====================================================== */

    if (consent === "accepted") {

        banner.style.display = "none";

        loadAnalytics();

        return;

    }


    if (consent === "rejected") {

        banner.style.display = "none";

        return;

    }


    /* =====================================================
       MOSTRAR BANNER
    ====================================================== */

    banner.style.display = "block";


    /* =====================================================
       ACEPTAR
    ====================================================== */

    acceptBtn.addEventListener(
        "click",
        function () {

            localStorage.setItem(
                "ga18_cookie_consent",
                "accepted"
            );

            banner.classList.add(
                "cookie-hidden"
            );

            setTimeout(
                function () {

                    banner.style.display =
                        "none";

                },
                350
            );

            loadAnalytics();

        }
    );


    /* =====================================================
       RECHAZAR
    ====================================================== */

    rejectBtn.addEventListener(
        "click",
        function () {

            localStorage.setItem(
                "ga18_cookie_consent",
                "rejected"
            );

            banner.classList.add(
                "cookie-hidden"
            );

            setTimeout(
                function () {

                    banner.style.display =
                        "none";

                },
                350
            );

        }
    );

}


/* =========================================================
   GOOGLE ANALYTICS
========================================================= */

function loadAnalytics() {

    if (
        window.__GA18_ANALYTICS_LOADED
    ) {

        return;

    }


    window.__GA18_ANALYTICS_LOADED =
        true;


    const script =
        document.createElement("script");


    script.async = true;


    script.src =
        "https://www.googletagmanager.com/gtag/js?id=G-EGZ2977YBH";


    document.head.appendChild(script);


    gtag(
        "js",
        new Date()
    );


    gtag(
        "consent",
        "update",
        {

            analytics_storage:
                "granted",

            ad_storage:
                "denied",

            ad_user_data:
                "denied",

            ad_personalization:
                "denied"

        }
    );


    gtag(
        "config",
        "G-EGZ2977YBH",
        {

            anonymize_ip:
                true

        }
    );

}


/* =========================================================
   HEADER
========================================================= */

window.initHeader = function () {

    const nav =
        document.querySelector(
            ".custom-navbar"
        );


    if (!nav) {

        console.warn(
            "GamesAlone18: navbar no encontrada."
        );

        return;

    }


    let lastScroll =
        window.scrollY;


    window.addEventListener(
        "scroll",
        function () {

            const currentScroll =
                window.scrollY;


            /* =============================================
               ARRIBA DE LA PÁGINA
            ============================================== */

            if (
                currentScroll <= 20
            ) {

                nav.classList.remove(
                    "header-hidden"
                );

                nav.classList.remove(
                    "scrolled"
                );

                lastScroll =
                    currentScroll;

                return;

            }


            /* =============================================
               SCROLL HACIA ABAJO
            ============================================== */

            if (
                currentScroll >
                lastScroll &&
                currentScroll > 80
            ) {

                nav.classList.add(
                    "header-hidden"
                );

            }


            /* =============================================
               SCROLL HACIA ARRIBA
            ============================================== */

            else if (
                currentScroll <
                lastScroll
            ) {

                nav.classList.remove(
                    "header-hidden"
                );

            }


            lastScroll =
                currentScroll;

        },
        {
            passive: true
        }
    );

};


/* =========================================================
   CHATBOT
========================================================= */

function initChatbot() {

    if (
        window.__GA18_CHATBOT_V5
    ) {

        return;

    }


    window.__GA18_CHATBOT_V5 =
        true;


    const DATA = {

        merch: {

            title: "🎮 Tienda",

            message:
                "🔥 Merch oficial y colecciones limitadas.",

            route:
                "/merch/"

        },


        zona: {

            title: "⭐ Zona Exclusiva",

            message:
                "👾 Acceso premium y comunidad privada.",

            route:
                "/zona/"

        },


        prensa: {

            title: "📰 Prensa",

            message:
                "🎤 Cobertura de eventos y medios oficiales.",

            route:
                "/prensa/"

        },


        contacto: {

            title: "💬 Contacto",

            message:
                "📩 Colaboraciones y soporte directo.",

            route:
                "/contactanos/"

        }

    };


    /* =====================================================
       BOTÓN
    ====================================================== */

    const btn =
        document.createElement(
            "button"
        );


    btn.className =
        "chat-toggle";


    btn.type =
        "button";


    btn.setAttribute(
        "aria-label",
        "Abrir asistente GamesAlone18"
    );


    btn.innerHTML =
        "🐿️";


    /* =====================================================
       CAJA
    ====================================================== */

    const box =
        document.createElement(
            "div"
        );


    box.className =
        "chatbot";


    box.innerHTML = `

        <div class="chat-header">

            <div class="squirrel-container">

                <div
                    id="ga-squirrel"
                    class="squirrel idle"
                ></div>

            </div>

            <div>

                <h2>
                    GA18 Assistant
                </h2>

                <p id="ga-status">
                    Ardilla en espera...
                </p>

            </div>

        </div>


        <div
            class="chat-body"
            id="ga-body"
        ></div>


        <div class="chat-footer">

            <div
                id="ga-options"
            ></div>

        </div>

    `;


    document.body.appendChild(
        btn
    );

    document.body.appendChild(
        box
    );


    const body =
        box.querySelector(
            "#ga-body"
        );


    const options =
        box.querySelector(
            "#ga-options"
        );


    const status =
        box.querySelector(
            "#ga-status"
        );


    const squirrel =
        box.querySelector(
            "#ga-squirrel"
        );


    let open =
        false;


    /* =====================================================
       ESTADOS
    ====================================================== */

    function setState(state) {

        squirrel.classList.remove(
            "idle",
            "thinking",
            "happy"
        );


        squirrel.classList.add(
            state
        );


        if (
            state === "idle"
        ) {

            status.innerText =
                "Ardilla en espera...";

        }


        if (
            state === "thinking"
        ) {

            status.innerText =
                "Procesando...";

        }


        if (
            state === "happy"
        ) {

            status.innerText =
                "Listo ✨";

        }

    }


    /* =====================================================
       MENSAJES
    ====================================================== */

    function msg(
        text,
        type = "bot"
    ) {

        const div =
            document.createElement(
                "div"
            );


        div.className =
            type === "user"
                ? "user-message"
                : "bot-message";


        div.textContent =
            text;


        body.appendChild(
            div
        );


        body.scrollTop =
            body.scrollHeight;

    }


    /* =====================================================
       MENÚ
    ====================================================== */

    function renderMenu() {

        options.innerHTML =
            "";


        const labels = {

            merch:
                "🎮 Tienda",

            zona:
                "⭐ Zona",

            prensa:
                "📰 Prensa",

            contacto:
                "💬 Contacto"

        };


        Object.keys(DATA)
            .forEach(
                function (key) {

                    const button =
                        document.createElement(
                            "button"
                        );


                    button.type =
                        "button";


                    button.innerText =
                        labels[key];


                    button.addEventListener(
                        "click",
                        function () {

                            handle(key);

                        }
                    );


                    options.appendChild(
                        button
                    );

                }
            );

    }


    /* =====================================================
       LÓGICA
    ====================================================== */

    function handle(key) {

        const item =
            DATA[key];


        msg(
            item.title,
            "user"
        );


        setState(
            "thinking"
        );


        setTimeout(
            function () {

                msg(
                    item.message,
                    "bot"
                );


                setState(
                    "happy"
                );


                showAction(
                    item.route
                );

            },
            600
        );

    }


    /* =====================================================
       ACCIÓN
    ====================================================== */

    function showAction(route) {

        options.innerHTML =
            "";


        const action =
            document.createElement(
                "button"
            );


        action.type =
            "button";


        action.className =
            "chat-action";


        action.innerText =
            "👉 Ir ahora";


        action.addEventListener(
            "click",
            function () {

                window.location.href =
                    route;

            }
        );


        options.appendChild(
            action
        );


        setTimeout(
            function () {

                renderMenu();

                setState(
                    "idle"
                );

            },
            3000
        );

    }


    /* =====================================================
       ABRIR / CERRAR
    ====================================================== */

    btn.addEventListener(
        "click",
        function () {

            open =
                !open;


            if (open) {

                box.classList.add(
                    "chatbot-open"
                );


                if (
                    body.childElementCount === 0
                ) {

                    msg(
                        "👋 Bienvenido a GamesAlone18 Universe"
                    );


                    renderMenu();


                    setState(
                        "idle"
                    );

                }

            }

            else {

                box.classList.remove(
                    "chatbot-open"
                );

            }

        }
    );


    console.log(
        "🐿️ GA18 CHATBOT READY"
    );

}
