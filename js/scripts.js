/* =========================================================
GAMESALONE18 UNIVERSE
JAVASCRIPT PRINCIPAL
========================================================= */

(function () {

```
"use strict";


/* =====================================================
   SWIPER
===================================================== */

function initSwiper() {

    if (
        typeof Swiper === "undefined" ||
        !document.querySelector(".mySwiper")
    ) {

        return;

    }


    new Swiper(".mySwiper", {

        loop: true,

        grabCursor: true,

        centeredSlides: true,

        slidesPerView: 1,

        spaceBetween: 0,

        speed: 700,

        autoplay: {

            delay: 4000,

            disableOnInteraction: false,

            pauseOnMouseEnter: true

        },

        pagination: {

            el: ".swiper-pagination",

            clickable: true

        },

        navigation: {

            nextEl: ".swiper-button-next",

            prevEl: ".swiper-button-prev"

        },

        keyboard: {

            enabled: true

        },

        observer: true,

        observeParents: true

    });

}


/* =====================================================
   HEADER SCROLL
===================================================== */

function initHeaderScroll() {

    function updateHeader() {

        const nav =
            document.querySelector(".custom-navbar");


        if (!nav) {

            return;

        }


        nav.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();

}


/* =====================================================
   CHATBOT
===================================================== */

function initChatbot() {

    if (
        window.__GA18_CHATBOT_INITIALIZED
    ) {

        return;

    }


    window.__GA18_CHATBOT_INITIALIZED =
        true;


    const DATA = {

        merch: {

            title: "🎮 Tienda",

            message:
                "🔥 Merch oficial y colecciones limitadas.",

            route: "/merch/"

        },

        zona: {

            title: "⭐ Zona Exclusiva",

            message:
                "👾 Acceso premium y comunidad privada.",

            route: "/zona/"

        },

        prensa: {

            title: "📰 Prensa",

            message:
                "🎤 Cobertura de eventos y medios oficiales.",

            route: "/prensa/"

        },

        contacto: {

            title: "💬 Contacto",

            message:
                "📩 Colaboraciones y soporte directo.",

            route: "/contactanos/"

        }

    };


    /* =================================================
       BOTÓN
    ================================================= */

    const btn =
        document.createElement("button");


    btn.type =
        "button";


    btn.className =
        "chat-toggle";


    btn.setAttribute(
        "aria-label",
        "Abrir asistente GamesAlone18"
    );


    btn.setAttribute(
        "aria-expanded",
        "false"
    );


    btn.innerHTML =
        "🐿️";


    /* =================================================
       CHAT
    ================================================= */

    const box =
        document.createElement("div");


    box.className =
        "chatbot";


    box.setAttribute(
        "role",
        "dialog"
    );


    box.setAttribute(
        "aria-label",
        "GA18 Assistant"
    );


    box.innerHTML = `

        <div class="chat-header">

            <div class="squirrel-container">

                <div
                    id="ga-squirrel"
                    class="squirrel idle">
                </div>

            </div>


            <div class="chat-title">

                <h2>
                    GA18 Assistant
                </h2>

                <p id="ga-status">
                    Ardilla en espera...
                </p>

            </div>


            <button
                type="button"
                class="ga18-chat-close"
                aria-label="Cerrar asistente">

                ×

            </button>

        </div>


        <div
            class="chat-body"
            id="ga-body">
        </div>


        <div class="chat-footer">

            <div
                id="ga-options">
            </div>

        </div>

    `;


    document.body.appendChild(btn);

    document.body.appendChild(box);


    const body =
        box.querySelector("#ga-body");


    const options =
        box.querySelector("#ga-options");


    const status =
        box.querySelector("#ga-status");


    const squirrel =
        box.querySelector("#ga-squirrel");


    const closeBtn =
        box.querySelector(".ga18-chat-close");


    let open =
        false;


    /* =================================================
       ESTADO
    ================================================= */

    function setState(state) {

        squirrel.classList.remove(
            "idle",
            "thinking",
            "happy"
        );


        squirrel.classList.add(
            state
        );


        if (state === "idle") {

            status.innerText =
                "Ardilla en espera...";

        }


        if (state === "thinking") {

            status.innerText =
                "Procesando...";

        }


        if (state === "happy") {

            status.innerText =
                "Listo ✨";

        }

    }


    /* =================================================
       MENSAJES
    ================================================= */

    function msg(
        text,
        type = "bot"
    ) {

        const div =
            document.createElement("div");


        div.className =
            type === "user"
                ? "user-message"
                : "bot-message";


        div.textContent =
            text;


        body.appendChild(div);


        body.scrollTop =
            body.scrollHeight;

    }


    /* =================================================
       MENÚ
    ================================================= */

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
            .forEach(function (key) {

                const button =
                    document.createElement("button");


                button.type =
                    "button";


                button.className =
                    "ga18-option";


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

            });

    }


    /* =================================================
       LÓGICA
    ================================================= */

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


    /* =================================================
       ACCIÓN
    ================================================= */

    function showAction(route) {

        options.innerHTML =
            "";


        const action =
            document.createElement("button");


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

                if (!open) {

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
       ABRIR / CERRAR
    ================================================= */

    function toggleChat() {

        open =
            !open;


        box.style.display =
            open
                ? "flex"
                : "none";


        btn.setAttribute(
            "aria-expanded",
            String(open)
        );


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

        } else {

            box.classList.remove(
                "chatbot-open"
            );

        }

    }


    btn.addEventListener(
        "click",
        toggleChat
    );


    closeBtn.addEventListener(
        "click",
        function () {

            if (open) {

                toggleChat();

            }

        }
    );


    /* =================================================
       ESC
    ================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                open
            ) {

                toggleChat();

            }

        }
    );


    console.log(
        "🐿️ GA18 Assistant iniciado correctamente."
    );

}


/* =====================================================
   WHATSAPP TRACKING
===================================================== */

window.trackClick =
    function (origen) {

        console.log(
            "Click en:",
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
   INICIALIZACIÓN
===================================================== */

function init() {

    initSwiper();

    initHeaderScroll();

    initChatbot();

    console.log(
        "🎮 GamesAlone18 Universe cargado correctamente."
    );

}


if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        init
    );

} else {

    init();

}
```

})();
