//////////////////////////////////////////////////
// 🐿️ GAMESALONE18 CHATBOT - NIVEL 3 CLEAN
//////////////////////////////////////////////////

(function () {

    if (window.__GA18_CHATBOT_LOADED) return;
    window.__GA18_CHATBOT_LOADED = true;

    //////////////////////////////////////////////////
    // 🎯 CONFIG INTENTS
    //////////////////////////////////////////////////

    const INTENTS = {
        merch: {
            title: "🎮 Tienda / Merch",
            message: "🔥 Merch oficial y colecciones limitadas de GamesAlone18.",
            route: "/merch/"
        },
        zona: {
            title: "⭐ Zona Exclusiva",
            message: "👾 Acceso premium con beneficios, contenido y comunidad.",
            route: "/zona/"
        },
        contacto: {
            title: "💬 Contacto",
            message: "📩 Contacta al equipo para colaboraciones o soporte.",
            route: "/contactanos/"
        },
        prensa: {
            title: "📰 Sala de Prensa",
            message: "🎤 Cobertura de eventos, entrevistas y prensa oficial.",
            route: "/prensa/"
        }
    };

    //////////////////////////////////////////////////
    // 🧠 UI CREATION
    //////////////////////////////////////////////////

    function createChatbot() {

        // BOTÓN
        const btn = document.createElement("button");
        btn.className = "chat-toggle";
        btn.innerHTML = "🐿️";

        // CAJA
        const box = document.createElement("div");
        box.className = "chatbot";

        box.innerHTML = `
            <div class="chat-header">
                <div class="squirrel">🐿️</div>
                <div>
                    <h2>GamesAlone18 Assistant</h2>
                    <p id="ga18-status">Ardilla en espera...</p>
                </div>
            </div>

            <div class="chat-body" id="ga18-body"></div>

            <div class="chat-footer">
                <div id="ga18-options"></div>
            </div>
        `;

        document.body.appendChild(btn);
        document.body.appendChild(box);

        const body = box.querySelector("#ga18-body");
        const options = box.querySelector("#ga18-options");
        const status = box.querySelector("#ga18-status");

        let open = false;

        //////////////////////////////////////////////////
        // 🐿️ STATE
        //////////////////////////////////////////////////

        function setState(state) {
            if (state === "idle") status.innerText = "Ardilla en espera...";
            if (state === "thinking") status.innerText = "Procesando...";
            if (state === "ready") status.innerText = "Listo ✨";
        }

        //////////////////////////////////////////////////
        // 💬 MESSAGE
        //////////////////////////////////////////////////

        function addMessage(text, type = "bot") {
            const div = document.createElement("div");
            div.className = type === "user" ? "user-message" : "bot-message";
            div.innerHTML = text;
            body.appendChild(div);
            body.scrollTop = body.scrollHeight;
        }

        //////////////////////////////////////////////////
        // 🎯 MENU OPTIONS (UI PRINCIPAL)
        //////////////////////////////////////////////////

        function renderMenu() {

            options.innerHTML = "";

            const menu = [
                { key: "merch", label: "🎮 Tienda" },
                { key: "zona", label: "⭐ Zona Exclusiva" },
                { key: "prensa", label: "📰 Prensa" },
                { key: "contacto", label: "💬 Contacto" }
            ];

            menu.forEach(item => {

                const btn = document.createElement("button");
                btn.innerText = item.label;

                btn.onclick = () => handleSelection(item.key);

                options.appendChild(btn);
            });
        }

        //////////////////////////////////////////////////
        // 🧠 LOGIC
        //////////////////////////////////////////////////

        function handleSelection(key) {

            const intent = INTENTS[key];

            if (!intent) return;

            addMessage(intent.title, "user");

            setState("thinking");

            setTimeout(() => {

                addMessage(intent.message, "bot");

                setState("ready");

                renderAction(intent.route);

            }, 500);
        }

        //////////////////////////////////////////////////
        // 🚀 ACTION BUTTON
        //////////////////////////////////////////////////

        function renderAction(route) {

            const action = document.createElement("button");
            action.className = "chat-action";
            action.innerText = "👉 Ir ahora";

            action.onclick = () => {
                window.location.href = route;
            };

            options.innerHTML = "";
            options.appendChild(action);

            setTimeout(renderMenu, 4000);
        }

        //////////////////////////////////////////////////
        // TOGGLE
        //////////////////////////////////////////////////

        btn.onclick = () => {

            open = !open;

            box.style.display = open ? "flex" : "none";

            if (open && body.childElementCount === 0) {
                addMessage("👋 Bienvenido a GamesAlone18 Universe");
                renderMenu();
                setState("idle");
            }
        };

        console.log("🐿️ GA18 CHATBOT NIVEL 3 LISTO");
    }

    document.addEventListener("DOMContentLoaded", createChatbot);

})();
