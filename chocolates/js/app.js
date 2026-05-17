/* ===================================
   MODAL COTIZACIÓN
=================================== */

const modal = document.getElementById("cotizacionModal");
const openBtn = document.getElementById("openModal");
const openNavBtn = document.getElementById("openModalNav");
const closeBtn = document.getElementById("closeModal");

function openModal() {
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
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
"https://script.google.com/macros/s/AKfycbz6yJXPduACkrPlb8H-rLHP8Fl9wcZGzDQXDD6Jx5UUZQ5_yxlE_T2udMgi-_vPI_o/exec";

const form = document.getElementById("cotizacionForm");

if (form) {

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const submitBtn = document.querySelector(".submit-btn");

    /* loading UI */
    submitBtn.disabled = true;
    submitBtn.innerText = "Enviando...";

    /* VALIDACIÓN CHECKBOX */
    const consentimiento = document.getElementById("consentimiento");

    if (!consentimiento.checked) {
        alert("Debes aceptar términos y aviso de privacidad");
        submitBtn.disabled = false;
        submitBtn.innerText = "Enviar Solicitud";
        return;
    }

    /* DATA FORM */
    const data = {
        nombre: document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        evento: document.getElementById("evento").value,
        cantidad: document.getElementById("cantidad").value,
        fechaEvento: document.getElementById("fechaEvento").value,
        descripcion: document.getElementById("descripcion").value
    };

    try {

        await fetch(scriptURL, {

            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },

            body: new URLSearchParams({

                nombre: data.nombre,
                telefono: data.telefono,
                correo: data.correo,
                evento: data.evento,
                cantidad: data.cantidad,
                fecha_evento: data.fechaEvento,
                descripcion: data.descripcion

            })

        });

        alert("Solicitud enviada correctamente 🍫");

        form.reset();
        modal.classList.remove("active");

    } catch (error) {

        alert("Error al enviar solicitud. Intenta nuevamente.");
        console.error(error);

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
