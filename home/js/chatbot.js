//////////////////////////////////////////////////
// 🐿️ GAMESALONE18 CHATBOT - NIVEL 4 PRO CLEAN
//////////////////////////////////////////////////

(function () {

    if (window.__GA18_CHATBOT_V4) return;
    window.__GA18_CHATBOT_V4 = true;

    //////////////////////////////////////////////////
    // 🧠 DATA LAYER (MODOS)
    //////////////////////////////////////////////////

    const MODES = {
        home: {
            title: "🏠 Inicio",
            options: ["merch", "zona", "prensa", "contacto"]
        },
        merch: {
            title: "🎮 Tienda",
            message: "🔥 Merch oficial y colecciones limitadas.",
            route: "/merch/"
        },
        zona: {
            title: "⭐ Zona Exclusiva",
            message: "👾 Acceso premium, comunidad y beneficios.",
            route: "/zona/"
        },
        prensa: {
            title: "📰 Prensa",
            message: "🎤 Cobertura de eventos y medios oficiales.",
            route: "/prensa/"
        },
        contacto: {
            title: "💬 Contacto",
            message: "📩 Colaboraciones, eventos y soporte.",
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
                <div class="ga-squirrel" id="ga-squirrel">🐿️</div>
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
        let currentMode = "home";

        //////////////////////////////////////////////////
        // 🐿️ STATE SYSTEM
        //////////////////////////////////////////////////

        function setState(state) {

            squirrel.classList.remove("idle", "thinking", "happy");
            squirrel.classList.add(state);

            if (state === "idle") status.innerText = "Ardilla en espera...";
            if (state === "thinking") status.innerText = "Procesando...";
            if (state === "happy") status.innerText = "Listo ✨";
        }

        //////////////////////////////////////////////////
        // 💬 MESSAGE SYSTEM
        //////////////////////////////////////////////////

        function msg(text, type = "bot") {
            const div = document.createElement("div");
            div.className = type === "user" ? "user-message" : "bot-message";
            div.innerHTML = text;
            body.appendChild(div);
            body.scrollTop = body.scrollHeight;
        }

        //////////////////////////////////////////////////
        // 🎯 MENU RENDER
        //////////////////////////////////////////////////

        function renderMenu() {

            options.innerHTML = "";

            MODES.home.options.forEach(key => {

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
        // 🧠 HANDLER CORE
        //////////////////////////////////////////////////

        function handle(key) {

            const data = MODES[key];
            if (!data) return;

            currentMode = key;

            msg(data.title, "user");

            setState("thinking");

            setTimeout(() => {

                msg(data.message, "bot");

                setState("happy");

                renderAction(data.route);

            }, 500);
        }

        //////////////////////////////////////////////////
        // 🚀 ACTION BUTTON
        //////////////////////////////////////////////////

        function renderAction(route) {

            options.innerHTML = "";

            const a = document.createElement("button");
            a.className = "chat-action";
            a.innerText = "👉 Ir ahora";

            a.onclick = () => window.location.href = route;

            options.appendChild(a);

            setTimeout(() => {
                renderMenu();
                setState("idle");
            }, 3500);
        }

        //////////////////////////////////////////////////
        // 🧠 OPEN / CLOSE
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

        //////////////////////////////////////////////////
        // INIT LOG
        //////////////////////////////////////////////////

        console.log("🐿️ GA18 CHATBOT V4 READY");
    }

    document.addEventListener("DOMContentLoaded", init);

})();
