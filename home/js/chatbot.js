//////////////////////////////////////////////////
// 🤖 GAMESALONE18 CHATBOT ENGINE (CLEAN + MENU)
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
            "⭐ Zona Exclusiva para miembros.",
            "👾 Acceso premium con beneficios únicos."
        ]
    },
    {
        name: "contacto",
        keywords: ["contacto", "correo", "hablar", "equipo", "soporte"],
        route: "/contactanos/",
        responses: [
            "💬 Contacta al equipo aquí.",
            "📩 Soporte y colaboraciones disponibles."
        ]
    },
    {
        name: "eventos",
        keywords: ["eventos", "torneos", "agenda", "event", "actividades"],
        route: "/eventos/",
        responses: [
            "🎟️ Eventos disponibles en el universo GA18."
        ]
    }
];

//////////////////////////////////////////////////
// 🧠 MOTOR
//////////////////////////////////////////////////

function detectIntent(text) {
    const input = text.toLowerCase();

    for (const intent of BOT_INTENTS) {
        if (intent.keywords.some(k => input.includes(k))) {
            return intent;
        }
    }

    return null;
}

function handleBotMessage(text) {
    const intent = detectIntent(text);

    if (!intent) {
        return {
            message: "🤖 No entendí eso. Usa las opciones del menú.",
            route: null
        };
    }

    return {
        message: intent.responses[
            Math.floor(Math.random() * intent.responses.length)
        ],
        route: intent.route
    };
}

//////////////////////////////////////////////////
// 🎮 MENÚ RÁPIDO (OPCIONES UI)
//////////////////////////////////////////////////

const BOT_MENU = [
    { label: "🎮 Tienda", text: "quiero comprar merch" },
    { label: "⭐ Zona Exclusiva", text: "zona exclusiva" },
    { label: "📸 Cobertura", text: "cobertura de eventos" },
    { label: "🎟️ Eventos", text: "eventos" },
    { label: "💬 Contacto", text: "contacto equipo" }
];

function renderMenu(chatBody, chatInput) {

    const container = document.createElement("div");
    container.className = "chat-options";

    BOT_MENU.forEach(opt => {

        const btn = document.createElement("button");
        btn.innerText = opt.label;

        btn.onclick = () => {

            chatInput.value = opt.text;

            chatInput.dispatchEvent(
                new KeyboardEvent("keypress", { key: "Enter" })
            );
        };

        container.appendChild(btn);
    });

    chatBody.appendChild(container);
}

//////////////////////////////////////////////////
// 🐿️ CHATBOT UI + ARDILLA
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
                <h2>GamesAlone18 AI</h2>
                <p id="botStatus">Ardilla en espera...</p>
            </div>
        </div>

        <div class="chat-body" id="chatBody"></div>

        <div class="chat-footer">
            <input id="chatInput" placeholder="Escribe..." />
        </div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(box);

    const squirrel = box.querySelector("#squirrel");
    const botStatus = box.querySelector("#botStatus");
    const chatBody = box.querySelector("#chatBody");
    const chatInput = box.querySelector("#chatInput");

    function setSquirrelState(state) {

        squirrel.classList.remove(
            "state-idle",
            "state-happy",
            "state-thinking"
        );

        squirrel.classList.add(state);

        if (state === "state-thinking") botStatus.innerText = "Procesando...";
        if (state === "state-happy") botStatus.innerText = "Listo ✨";
        if (state === "state-idle") botStatus.innerText = "Ardilla en espera...";
    }

    function addMessage(text, type) {

        const div = document.createElement("div");

        div.className =
            type === "user" ? "user-message" : "bot-message";

        div.innerHTML = text;

        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function runBot(text) {

        setSquirrelState("state-thinking");

        const res = handleBotMessage(text);

        setTimeout(() => {

            addMessage(res.message, "bot");
            setSquirrelState("state-happy");

            if (res.route) {
                setTimeout(() => {
                    window.location.href = res.route;
                }, 900);
            }

            setTimeout(() => {
                setSquirrelState("state-idle");
            }, 2000);

        }, 400);
    }

    //////////////////////////////////////////////////
    // EVENTOS
    //////////////////////////////////////////////////

    btn.onclick = () => {
        box.style.display =
            box.style.display === "flex" ? "none" : "flex";
    };

    chatInput.addEventListener("keypress", (e) => {

        if (e.key !== "Enter") return;
        if (!chatInput.value.trim()) return;

        const text = chatInput.value;

        addMessage(text, "user");
        runBot(text);

        chatInput.value = "";
    });

    //////////////////////////////////////////////////
    // INICIO
    //////////////////////////////////////////////////

    addMessage("👋 Bienvenido a GamesAlone18 Universe. Elige una opción:", "bot");
    renderMenu(chatBody, chatInput);

    console.log("🐿️ CHATBOT READY");
}

document.addEventListener("DOMContentLoaded", initChatbot);
