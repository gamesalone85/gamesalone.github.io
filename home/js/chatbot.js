//////////////////////////////////////////////////
// 🐿️ GAMESALONE18 CHATBOT NPC v2 (CLEAN FINAL)
//////////////////////////////////////////////////

const BOT_STATES = {

    start: {
        message: "👋 Bienvenido a GamesAlone18 Universe. Soy tu guía ardilla.",
        options: [
            { label: "🚀 Entrar al menú", next: "menu" }
        ]
    },

    menu: {
        message: "🎮 Elige una ruta del universo:",
        options: [
            { label: "🛒 Tienda", next: "shop" },
            { label: "⭐ Zona Exclusiva", next: "zone" },
            { label: "📰 Sala de Prensa", next: "prensa" },
            { label: "💬 Contacto", next: "contact" }
        ]
    },

    shop: {
        message: "🛒 Redirigiendo a la tienda oficial...",
        route: "/merch/"
    },

    zone: {
        message: "⭐ Accediendo a Zona Exclusiva...",
        route: "/zona/"
    },

    prensa: {
        message: "📰 Abriendo Sala de Prensa...",
        route: "/prensa/"
    },

    contact: {
        message: "💬 Conectando con el equipo...",
        route: "/contactanos/"
    }
};

//////////////////////////////////////////////////
// 🧠 STATE ENGINE
//////////////////////////////////////////////////

let currentState = "start";

//////////////////////////////////////////////////
// 🚀 INIT CHATBOT
//////////////////////////////////////////////////

function initChatbot() {

    const btn = document.createElement("button");
    btn.className = "chat-toggle";
    btn.innerHTML = "🐿️";

    const box = document.createElement("div");
    box.className = "chatbot";

    box.innerHTML = `
        <div class="chat-header">
            <div class="squirrel-wrapper">
                <div id="squirrel" class="squirrel state-idle">🐿️</div>
            </div>

            <div>
                <h2>GamesAlone18 NPC</h2>
                <p id="botStatus">Ardilla en espera...</p>
            </div>
        </div>

        <div class="chat-body" id="chatBody"></div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(box);

    const squirrel = box.querySelector("#squirrel");
    const botStatus = box.querySelector("#botStatus");
    const chatBody = box.querySelector("#chatBody");

    //////////////////////////////////////////////////
    // 🐿️ VISUAL STATE
    //////////////////////////////////////////////////

    function setState(state) {

        squirrel.classList.remove("state-idle", "state-thinking", "state-happy");
        squirrel.classList.add(state);

        if (state === "state-thinking") botStatus.innerText = "Procesando...";
        if (state === "state-happy") botStatus.innerText = "Listo ✨";
        if (state === "state-idle") botStatus.innerText = "Ardilla en espera...";
    }

    //////////////////////////////////////////////////
    // 💬 MENSAJES
    //////////////////////////////////////////////////

    function addMessage(text, type = "bot") {

        const div = document.createElement("div");

        div.className =
            type === "user" ? "user-message" : "bot-message";

        div.innerHTML = text;

        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    //////////////////////////////////////////////////
    // 🎮 OPCIONES
    //////////////////////////////////////////////////

    function renderOptions(options) {

        const container = document.createElement("div");
        container.className = "chat-options";

        options.forEach(opt => {

            const btn = document.createElement("button");
            btn.innerText = opt.label;

            btn.onclick = () => {
                addMessage(opt.label, "user");
                goState(opt.next);
            };

            container.appendChild(btn);
        });

        chatBody.appendChild(container);
    }

    //////////////////////////////////////////////////
    // 🧭 ENGINE
    //////////////////////////////////////////////////

    function goState(state) {

        const data = BOT_STATES[state];
        if (!data) return;

        setState("state-thinking");

        setTimeout(() => {

            addMessage(data.message, "bot");

            setState("state-happy");

            if (data.options) {
                renderOptions(data.options);
            }

            if (data.route) {
                setTimeout(() => {
                    window.location.href = data.route;
                }, 900);
            }

            setTimeout(() => {
                setState("state-idle");
            }, 2000);

        }, 400);
    }

    //////////////////////////////////////////////////
    // TOGGLE BOT
    //////////////////////////////////////////////////

    btn.onclick = () => {
        box.style.display =
            box.style.display === "flex" ? "none" : "flex";
    };

    //////////////////////////////////////////////////
    // START
    //////////////////////////////////////////////////

    goState("start");

    console.log("🐿️ CHATBOT NPC v2 READY");
}

document.addEventListener("DOMContentLoaded", initChatbot);
