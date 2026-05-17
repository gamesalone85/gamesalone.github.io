//////////////////////////////////////////////////
// 🤖 GAMESALONE18 CHATBOT ENGINE (FINAL CLEAN)
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

function detectIntent(text){
    const input = text.toLowerCase();
    for(const intent of BOT_INTENTS){
        if(intent.keywords.some(k => input.includes(k))){
            return intent;
        }
    }
    return null;
}

function handleBotMessage(text){
    const intent = detectIntent(text);

    if(!intent){
        return {
            message: "🤖 No entendí eso. Prueba: tienda, zona o contacto.",
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
// 🧠 UI GENERADA AUTOMÁTICAMENTE
//////////////////////////////////////////////////

function initChatbot(){

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

    const chatBody = box.querySelector("#chatBody");
    const chatInput = box.querySelector("#chatInput");

    function addMessage(text,type){
        const div = document.createElement("div");
        div.className = type === "user" ? "user-message" : "bot-message";
        div.innerHTML = text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    btn.onclick = () => {
        box.style.display = box.style.display === "flex" ? "none" : "flex";
    };

    chatInput.addEventListener("keypress",(e)=>{
        if(e.key !== "Enter") return;
        if(!chatInput.value.trim()) return;

        const text = chatInput.value;

        addMessage(text,"user");

        const res = handleBotMessage(text);

        setTimeout(()=>{
            addMessage(res.message,"bot");

            if(res.route){
                setTimeout(()=>{
                    window.location.href = res.route;
                },800);
            }
        },400);

        chatInput.value = "";
    });

    console.log("🐿️ CHATBOT READY");
}

document.addEventListener("DOMContentLoaded", initChatbot);
