/* ===================================
   MODAL COTIZACIÓN
=================================== */

const modal = document.getElementById("cotizacionModal");
const openBtn = document.getElementById("openModal");
const openNavBtn = document.getElementById("openModalNav");
const closeBtn = document.getElementById("closeModal");

function openModal() {
    if (modal) modal.classList.add("active");
}

function closeModal() {
    if (modal) modal.classList.remove("active");
}

if (openBtn) openBtn.addEventListener("click", openModal);

if (openNavBtn) {
    openNavBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
    });
}

if (closeBtn) closeBtn.addEventListener("click", closeModal);


/* ===================================
   GOOGLE SHEETS - COTIZACIONES
=================================== */

const scriptURL =
"https://script.google.com/macros/s/AKfycbw0AIdjQWEqgdtH6_t9Xn5KDoH7Lz8kyuVJ3FVwL9r-AE8fG-kajRYFxJ4Dio35wgQ/exec";

const form = document.getElementById("cotizacionForm");

if (form) {

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = document.querySelector(".submit-btn");
        const checkbox = document.getElementById("consentimiento");

        /* =========================
           VALIDACIÓN CHECKBOX
        ========================= */
        if (checkbox && !checkbox.checked) {
            alert("Debes aceptar términos y aviso de privacidad");
            return;
        }

        /* UI LOADING */
        submitBtn.disabled = true;
        submitBtn.innerText = "Enviando...";

        /* DATA */
        const data = {
            nombre: document.getElementById("nombre")?.value || "",
            telefono: document.getElementById("telefono")?.value || "",
            correo: document.getElementById("correo")?.value || "",
            evento: document.getElementById("evento")?.value || "",
            cantidad: document.getElementById("cantidad")?.value || "",
            fechaEvento: document.getElementById("fechaEvento")?.value || "",
            descripcion: document.getElementById("descripcion")?.value || ""
        };

        try {

            await fetch(scriptURL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            alert("Solicitud enviada correctamente 🍫");

            form.reset();
            closeModal();

        } catch (error) {

            console.error(error);
            alert("Error al enviar solicitud. Intenta nuevamente.");

        } finally {

            submitBtn.disabled = false;
            submitBtn.innerText = "Enviar Solicitud";
        }
    });
}


/* ===================================
   HEADER DINÁMICO
=================================== */

window.addEventListener("scroll", () => {

    const header = document.querySelector(".header");
    if (!header) return;

    header.style.background =
        window.scrollY > 50
            ? "rgba(0,0,0,.75)"
            : "rgba(0,0,0,.2)";
});


/* ===================================
   WHATSAPP CHATBOT
=================================== */

const whatsappBot = document.getElementById("whatsappBot");
const toggleWhatsapp = document.getElementById("toggleWhatsapp");

if (toggleWhatsapp && whatsappBot) {

    toggleWhatsapp.addEventListener("click", () => {
        whatsappBot.classList.toggle("active");
    });

}
