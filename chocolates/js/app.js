/* ===================================
   CHOCOLATES ARTÍSTICOS SARITA
   APP.JS PREMIUM FINAL
=================================== */

/* ===================================
   DOM READY
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===================================
       MODAL COTIZACIÓN
    ==================================== */

    const modal = document.getElementById("cotizacionModal");

    const openBtn = document.getElementById("openModal");

    const openNavBtn =
        document.getElementById("openModalNav");

    const closeBtn =
        document.getElementById("closeModal");

    function openModal() {

        if (!modal) return;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";
    }

    function closeModal() {

        if (!modal) return;

        modal.classList.remove("active");

        document.body.style.overflow = "auto";
    }

    /* BOTONES ABRIR */

    if (openBtn) {

        openBtn.addEventListener(
            "click",
            openModal
        );
    }

    if (openNavBtn) {

        openNavBtn.addEventListener(
            "click",
            (e) => {

                e.preventDefault();

                openModal();
            }
        );
    }

    /* BOTÓN CERRAR */

    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeModal
        );
    }

    /* CERRAR AL DAR CLICK AFUERA */

    if (modal) {

        modal.addEventListener(
            "click",
            (e) => {

                if (e.target === modal) {

                    closeModal();
                }
            }
        );
    }

    /* CERRAR CON ESC */

    document.addEventListener(
        "keydown",
        (e) => {

            if (
                e.key === "Escape" &&
                modal.classList.contains("active")
            ) {

                closeModal();
            }
        }
    );

    /* ===================================
       GOOGLE SHEETS FORM
    ==================================== */

    const scriptURL =
        "https://script.google.com/macros/s/AKfycbwnUhCbwnsoJHfFITA_3G43rmTvsQ2fZ6VLFVB1x_fBtf8a_MNE6IJa2XuwVAce-C8/exec";

    const form =
        document.getElementById("cotizacionForm");

    if (form) {

        form.addEventListener(
            "submit",
            async (e) => {

                e.preventDefault();

                const submitBtn =
                    document.querySelector(".submit-btn");

                const checkbox =
                    document.getElementById("consentimiento");

                if (
                    checkbox &&
                    !checkbox.checked
                ) {

                    alert(
                        "Debes aceptar términos y aviso de privacidad."
                    );

                    return;
                }

                submitBtn.disabled = true;

                submitBtn.innerText =
                    "Enviando...";

                const data = {

                    nombre:
                        document.getElementById("nombre")?.value || "",

                    telefono:
                        document.getElementById("telefono")?.value || "",

                    correo:
                        document.getElementById("correo")?.value || "",

                    evento:
                        document.getElementById("evento")?.value || "",

                    cantidad:
                        document.getElementById("cantidad")?.value || "",

                    fechaEvento:
                        document.getElementById("fechaEvento")?.value || "",

                    descripcion:
                        document.getElementById("descripcion")?.value || ""
                };

                try {

                    await fetch(scriptURL, {

                        method: "POST",

                        body: new URLSearchParams(data)
                    });

                    alert(
                        "Solicitud enviada correctamente 🍫"
                    );

                    form.reset();

                    closeModal();

                } catch (error) {

                    console.error(error);

                    alert(
                        "Error al enviar solicitud."
                    );

                } finally {

                    submitBtn.disabled = false;

                    submitBtn.innerText =
                        "Enviar Solicitud";
                }
            }
        );
    }

    /* ===================================
       HEADER DINÁMICO
    ==================================== */

    const header =
        document.querySelector(".header");

    window.addEventListener(
        "scroll",
        () => {

            if (!header) return;

            if (window.scrollY > 50) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");
            }
        }
    );

    /* ===================================
       WHATSAPP CHATBOT
    ==================================== */

    const whatsappBot =
        document.getElementById("whatsappBot");

    const toggleWhatsapp =
        document.getElementById("toggleWhatsapp");

    if (
        toggleWhatsapp &&
        whatsappBot
    ) {

        toggleWhatsapp.addEventListener(
            "click",
            () => {

                whatsappBot.classList.toggle("active");
            }
        );
    }
});
/* ======================
   POPUP PROMOCIONES
====================== */

const promoPopup = document.getElementById('promoPopup');
const closePromo = document.getElementById('closePromo');

closePromo.addEventListener('click', () => {
    promoPopup.style.display = 'none';
});

/* ======================
   CARRUSEL
====================== */

const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-track a');

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;

function moveCarousel(){
    track.style.transform =
    `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener('click', () => {

    index++;

    if(index >= slides.length){
        index = 0;
    }

    moveCarousel();

});

prevBtn.addEventListener('click', () => {

    index--;

    if(index < 0){
        index = slides.length - 1;
    }

    moveCarousel();

});

setInterval(() => {

    index++;

    if(index >= slides.length){
        index = 0;
    }

    moveCarousel();

}, 5000);

/* ==========================
   COOKIES SARITA
========================== */

document.addEventListener('DOMContentLoaded', () => {

    const cookieBar = document.getElementById('cookieBar');
    const acceptCookies = document.getElementById('acceptCookies');

    if (!cookieBar || !acceptCookies) {
        return;
    }

    if (localStorage.getItem('sarita_cookie_consent')) {
        cookieBar.style.display = 'none';
    }

    acceptCookies.addEventListener('click', () => {

        localStorage.setItem(
            'sarita_cookie_consent',
            'accepted'
        );

        cookieBar.style.display = 'none';

    });

});
