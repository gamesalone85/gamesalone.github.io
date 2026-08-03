"use strict";

/* =========================================================
   GAMESALONE18 UNIVERSE
   MAIN JAVASCRIPT
========================================================= */

(function () {

    /* =====================================================
       DOM READY
    ====================================================== */

    document.addEventListener("DOMContentLoaded", function () {

        console.log(
            "GamesAlone18 Universe: scripts.js cargado correctamente."
        );


        /* =================================================
           SWIPER
        ================================================== */

        initSwiper();


        /* =================================================
           NAVEGACIÓN
        ================================================== */

        initNavigation();


        /* =================================================
           COOKIES
        ================================================== */

        initCookieConsent();


        /* =================================================
           CHATBOT
        ================================================== */

        initChatbot();

    });


    /* =====================================================
       SWIPER
    ====================================================== */

    function initSwiper() {

        const swiperElement =
            document.querySelector(".mySwiper");


        if (
            !swiperElement ||
            typeof Swiper === "undefined"
        ) {

            console.warn(
                "GamesAlone18: Swiper no disponible."
            );

            return;

        }


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


        console.log(
            "GamesAlone18: Swiper inicializado."
        );

    }


    /* =====================================================
       NAVEGACIÓN
    ====================================================== */

    function initNavigation() {

        window.go = function (link) {

            if (
                !link ||
                link === "#"
            ) {

                return;

            }

            window.location.href = link;

        };


        /*
         * Soporte para elementos con role="button"
         */

        document.addEventListener(
            "keydown",
            function (event) {

                const target =
                    event.target.closest(
                        ".swiper-slide[role='button']"
                    );


                if (!target) {

                    return;

                }


                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    target.click();

                }

            }
        );

    }


    /* =====================================================
       TRACKING WHATSAPP
    ====================================================== */

    window.trackClick = function (origen) {

        console.log(
            "GamesAlone18: click registrado:",
            origen
        );


        if (
            typeof window.gtag === "function"
        ) {

            window.gtag(
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


        /* =================================================
           DECISIÓN ANTERIOR
        ================================================== */

        if (
            consent === "accepted"
        ) {

            banner.classList.add(
                "cookie-hidden"
            );

            loadAnalytics();

            return;

        }


        if (
            consent === "rejected"
        ) {

            banner.classList.add(
                "cookie-hidden"
            );

            return;

        }


        /* =================================================
           MOSTRAR
        ================================================== */

        banner.classList.remove(
            "cookie-hidden"
        );


        /* =================================================
           ACEPTAR
        ================================================== */

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


                loadAnalytics();

            }
        );


        /* =================================================
           RECHAZAR
        ================================================== */

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

            }
        );

    }


    /* =====================================================
       GOOGLE ANALYTICS
    ====================================================== */

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


        document.head.appendChild(
            script
        );


        if (
            typeof window.gtag !== "function"
        ) {

            window.gtag = function () {

                window.dataLayer =
                    window.dataLayer || [];

                window.dataLayer.push(
                    arguments
                );

            };

        }


        window.gtag(
            "js",
            new Date()
        );


        window.gtag(
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


        window.gtag(
            "config",
            "G-EGZ2977YBH",
            {

                anonymize_ip:
                    true

            }
        );


        console.log(
            "GamesAlone18: Google Analytics activado."
        );

    }


    /* =====================================================
       HEADER
    ====================================================== */

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


        if (
            nav.dataset.ga18HeaderReady === "true"
        ) {

            return;

        }


        nav.dataset.ga18HeaderReady =
            "true";


        let lastScroll =
            window.scrollY;


        function updateHeader() {

            const currentScroll =
                window.scrollY;


            /* =============================================
               PARTE SUPERIOR
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
               SCROLLED
            ============================================== */

            nav.classList.add(
                "scrolled"
            );


            /* =============================================
               BAJANDO
            ============================================== */

            if (
                currentScroll >
                    lastScroll &&
                currentScroll >
                    80
            ) {

                nav.classList.add(
                    "header-hidden"
                );

            }


            /* =============================================
               SUBIENDO
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

        }


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );


        updateHeader();


        console.log(
            "GamesAlone18: header inicializado."
        );

    };


    /* =====================================================
       CHATBOT
       TODO EL CHATBOT VIVE EN ESTE ARCHIVO
    ====================================================== */

    function initChatbot() {

        /*
         * Protección absoluta contra duplicados.
         */

        if (
            window.__GA18_CHATBOT_INITIALIZED
        ) {

            return;

        }


        window.__GA18_CHATBOT_INITIALIZED =
            true;


        /*
         * Si por alguna razón ya existen elementos
         * de una versión anterior, eliminarlos.
         */

        const oldButton =
            document.getElementById(
                "ga18-chat-toggle"
            );


        const oldChat =
            document.getElementById(
                "ga18-chatbot"
            );


        if (oldButton) {

            oldButton.remove();

        }


        if (oldChat) {

            oldChat.remove();

        }


        /* =================================================
           DATA
        ================================================== */

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


        /* =================================================
           BOTÓN FLOTANTE
        ================================================== */

        const button =
            document.createElement("button");


        button.id =
            "ga18-chat-toggle";


        button.type =
            "button";


        button.setAttribute(
            "aria-label",
            "Abrir asistente GamesAlone18"
        );


        button.setAttribute(
            "aria-expanded",
            "false"
        );


        button.innerHTML =
            "🐿️";


        /* =================================================
           VENTANA
        ================================================== */

        const chatbot =
            document.createElement("section");


        chatbot.id =
            "ga18-chatbot";


        chatbot.setAttribute(
            "aria-label",
            "GA18 Assistant"
        );


        chatbot.setAttribute(
            "aria-hidden",
            "true"
        );


        chatbot.innerHTML = `

            <div class="ga18-chat-header">

                <div class="ga18-squirrel-container">

                    <div
                        class="ga18-squirrel idle"
                        aria-hidden="true"
                    >
                        🐿️
                    </div>

                </div>


                <div class="ga18-chat-title">

                    <h2>
                        GA18 Assistant
                    </h2>

                    <p id="ga18-chat-status">
                        Ardilla en espera...
                    </p>

                </div>


                <button
                    id="ga18-chat-close"
                    type="button"
                    aria-label="Cerrar asistente"
                >
                    ×
                </button>

            </div>


            <div
                class="ga18-chat-body"
                id="ga18-chat-body"
            ></div>


            <div class="ga18-chat-footer">

                <div
                    id="ga18-chat-options"
                ></div>

            </div>

        `;


        /*
         * IMPORTANTE:
         * append directo a BODY.
         * Nunca dentro de main-content.
         */

        document.body.appendChild(
            chatbot
        );

        document.body.appendChild(
            button
        );


        /* =================================================
           REFERENCIAS
        ================================================== */

        const body =
            document.getElementById(
                "ga18-chat-body"
            );


        const options =
            document.getElementById(
                "ga18-chat-options"
            );


        const status =
            document.getElementById(
                "ga18-chat-status"
            );


        const squirrel =
            chatbot.querySelector(
                ".ga18-squirrel"
            );


        const closeButton =
            document.getElementById(
                "ga18-chat-close"
            );


        let isOpen =
            false;


        /* =================================================
           ESTADO
        ================================================== */

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

                status.textContent =
                    "Ardilla en espera...";

            }


            if (
                state === "thinking"
            ) {

                status.textContent =
                    "Procesando...";

            }


            if (
                state === "happy"
            ) {

                status.textContent =
                    "Listo ✨";

            }

        }


        /* =================================================
           MENSAJE
        ================================================== */

        function addMessage(
            text,
            type
        ) {

            const message =
                document.createElement("div");


            message.className =
                type === "user"
                    ? "ga18-user-message"
                    : "ga18-bot-message";


            message.textContent =
                text;


            body.appendChild(
                message
            );


            body.scrollTop =
                body.scrollHeight;

        }


        /* =================================================
           MENÚ
        ================================================== */

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

                        const option =
                            document.createElement(
                                "button"
                            );


                        option.type =
                            "button";


                        option.className =
                            "ga18-option";


                        option.textContent =
                            labels[key];


                        option.addEventListener(
                            "click",
                            function () {

                                handleOption(
                                    key
                                );

                            }
                        );


                        options.appendChild(
                            option
                        );

                    }
                );

        }


        /* =================================================
           LÓGICA
        ================================================== */

        function handleOption(key) {

            const item =
                DATA[key];


            addMessage(
                item.title,
                "user"
            );


            setState(
                "thinking"
            );


            options.innerHTML =
                "";


            window.setTimeout(
                function () {

                    addMessage(
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


        /* =================================================
           ACCIÓN
        ================================================== */

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
                "ga18-chat-action";


            action.textContent =
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


            window.setTimeout(
                function () {

                    if (!isOpen) {

                        return;

                    }


                    renderMenu();


                    setState(
                        "idle"
                    );

                },
                3000
            );

        }


        /* =================================================
           ABRIR
        ================================================== */

        function openChat() {

            isOpen =
                true;


            chatbot.classList.add(
                "ga18-chatbot-open"
            );


            chatbot.setAttribute(
                "aria-hidden",
                "false"
            );


            button.setAttribute(
                "aria-expanded",
                "true"
            );


            if (
                body.childElementCount === 0
            ) {

                addMessage(
                    "👋 Bienvenido a GamesAlone18 Universe",
                    "bot"
                );


                renderMenu();


                setState(
                    "idle"
                );

            }

        }


        /* =================================================
           CERRAR
        ================================================== */

        function closeChat() {

            isOpen =
                false;


            chatbot.classList.remove(
                "ga18-chatbot-open"
            );


            chatbot.setAttribute(
                "aria-hidden",
                "true"
            );


            button.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /* =================================================
           TOGGLE
        ================================================== */

        button.addEventListener(
            "click",
            function () {

                if (isOpen) {

                    closeChat();

                }

                else {

                    openChat();

                }

            }
        );


        /* =================================================
           CERRAR
        ================================================== */

        closeButton.addEventListener(
            "click",
            function () {

                closeChat();

                button.focus();

            }
        );


        /* =================================================
           ESC
        ================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    isOpen
                ) {

                    closeChat();

                    button.focus();

                }

            }
        );


        /* =================================================
           READY
        ================================================== */

        console.log(
            "🐿️ GA18 CHATBOT READY - PRODUCCIÓN"
        );

    }

})();
