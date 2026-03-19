// Base para futuras funciones
console.log("Home cargado correctamente");

// Carrusel
document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".carousel-card");
    let index = 0;

    function updateCarousel() {
        const total = cards.length;

        cards.forEach((card, i) => {
            card.className = "carousel-card";

            let offset = i - index;

            // Loop infinito
            if (offset < -Math.floor(total / 2)) offset += total;
            if (offset > Math.floor(total / 2)) offset -= total;

            if (offset === 0) {
                card.classList.add("active");
            } else if (offset === -1) {
                card.classList.add("left");
            } else if (offset === 1) {
                card.classList.add("right");
            } else if (offset === -2) {
                card.classList.add("far-left");
            } else if (offset === 2) {
                card.classList.add("far-right");
            } else {
                card.classList.add("hidden");
            }
        });
    }

    document.getElementById("next").onclick = () => {
        index = (index + 1) % cards.length;
        updateCarousel();
    };

    document.getElementById("prev").onclick = () => {
        index = (index - 1 + cards.length) % cards.length;
        updateCarousel();
    };

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const link = card.getAttribute("data-link");
            if (link && link !== "#") {
                window.location.href = link;
            }
        });
    });

    updateCarousel();

});
<script>
const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,

    coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
    },
});

function go(link) {
    if(link !== "#") window.location.href = link;
}
</script>
