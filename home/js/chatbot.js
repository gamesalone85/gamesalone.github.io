//////////////////////////////////////////////////
// 🐿️ GAMESALONE18 CHATBOT - NIVEL 5 (ANIMATED)
//////////////////////////////////////////////////

(function () {

    if (window.__GA18_CHATBOT_V5) return;
    window.__GA18_CHATBOT_V5 = true;

    //////////////////////////////////////////////////
    // 🧠 DATA
    //////////////////////////////////////////////////

    const DATA = {
        merch: {
            title: "🎮 Tienda",
            message: "🔥 Merch oficial y colecciones limitadas.",
            route: "/merch/"
        },
        zona: {
            title: "⭐ Zona Exclusiva",
            message: "👾 Acceso premium y comunidad privada.",
            route: "/zona/"
        },
        prensa: {
            title: "📰 Prensa",
            message: "🎤 Cobertura de eventos y medios oficiales.",
            route: "/prensa/"
        },
        contacto: {
            title: "💬 Contacto",
            message: "📩 Colaboraciones y soporte directo.",
            route: "/contactanos/"
        }
    };

    //////////////////////////////////////////////////
    // 🐿️ CREATE UI
    //////////////////////////////////////////////////

    function init() {

        const btn = document.createElement("button");
        btn.className = "chat-toggle";
        btn.innerHTML = "🐿️";

        const box = document.createElement("div");
        box.className = "chatbot";

        box.innerHTML = `
            <div class="chat-header">
                <div class="squirrel-container">
                    <div id="ga-squirrel" class="squirrel idle"></div>
                </div>

                <div>
                    <h2>GA18 Assistant</h2>
                    <p id="ga-status">Ardilla en espera...</p>
                </div>
            </div>

            <div class="chat-body" id="ga-body"></div>

            <div class="chat-footer">
                <div id="ga-options"></div>
            </div>
        `;

        document.body.appendChild(btn);
        document.body.appendChild(box);

        const body = box.querySelector("#ga-body");
        const options = box.querySelector("#ga-options");
        const status = box.querySelector("#ga-status");
        const squirrel = box.querySelector("#ga-squirrel");

        let open = false;

        //////////////////////////////////////////////////
        // 🐿️ ANIMATION STATES
        //////////////////////////////////////////////////

        function setState(state) {

            squirrel.classList.remove("idle", "thinking", "happy");

            squirrel.classList.add(state);

            if (state === "idle") status.innerText = "Ardilla en espera...";
            if (state === "thinking") status.innerText = "Procesando...";
            if (state === "happy") status.innerText = "Listo ✨";
        }

        //////////////////////////////////////////////////
        // 💬 MESSAGES
        //////////////////////////////////////////////////

        function msg(text, type = "bot") {
            const div = document.createElement("div");
            div.className = type === "user" ? "user-message" : "bot-message";
            div.innerHTML = text;
            body.appendChild(div);
            body.scrollTop = body.scrollHeight;
        }

        //////////////////////////////////////////////////
        // 🎯 MENU
        //////////////////////////////////////////////////

        function renderMenu() {

            options.innerHTML = "";

            Object.keys(DATA).forEach(key => {

                const b = document.createElement("button");

                const labels = {
                    merch: "🎮 Tienda",
                    zona: "⭐ Zona",
                    prensa: "📰 Prensa",
                    contacto: "💬 Contacto"
                };

                b.innerText = labels[key];

                b.onclick = () => handle(key);

                options.appendChild(b);
            });
        }

        //////////////////////////////////////////////////
        // 🧠 CORE LOGIC
        //////////////////////////////////////////////////

        function handle(key) {

            const item = DATA[key];

            msg(item.title, "user");

            setState("thinking");

            setTimeout(() => {

                msg(item.message, "bot");

                setState("happy");

                showAction(item.route);

            }, 600);
        }

        //////////////////////////////////////////////////
        // 🚀 ACTION
        //////////////////////////////////////////////////

        function showAction(route) {

            options.innerHTML = "";

            const btn = document.createElement("button");
            btn.className = "chat-action";
            btn.innerText = "👉 Ir ahora";

            btn.onclick = () => window.location.href = route;

            options.appendChild(btn);

            setTimeout(() => {
                renderMenu();
                setState("idle");
            }, 3000);
        }

        //////////////////////////////////////////////////
        // 🧠 TOGGLE
        //////////////////////////////////////////////////

        btn.onclick = () => {

            open = !open;

            box.style.display = open ? "flex" : "none";

            if (open && body.childElementCount === 0) {
                msg("👋 Bienvenido a GamesAlone18 Universe");
                renderMenu();
                setState("idle");
            }
        };

        console.log("🐿️ GA18 CHATBOT V5 READY (ANIMATED)");
    }

    document.addEventListener("DOMContentLoaded", init);

})();
