// Base para futuras funciones
console.log("Home cargado correctamente");
let angle = 0;
const carousel = document.getElementById("carousel3d");

document.getElementById("next").addEventListener("click", () => {
    angle -= 90;
    carousel.style.transform = `rotateY(${angle}deg)`;
});

document.getElementById("prev").addEventListener("click", () => {
    angle += 90;
    carousel.style.transform = `rotateY(${angle}deg)`;
});

/* CLICK EN TARJETAS */
document.querySelectorAll(".carousel-item").forEach(item => {
    item.addEventListener("click", () => {
        const link = item.getAttribute("data-link");
        if (link && link !== "#") {
            window.location.href = link;
        }
    });
});
