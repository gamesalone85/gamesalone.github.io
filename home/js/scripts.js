// Base para futuras funciones
console.log("Home cargado correctamente");
let angle = 0;
const carousel = document.querySelector(".carousel-3d");

document.getElementById("next").onclick = () => {
    angle -= 90;
    carousel.style.transform = `rotateY(${angle}deg)`;
};

document.getElementById("prev").onclick = () => {
    angle += 90;
    carousel.style.transform = `rotateY(${angle}deg)`;
};

/* CLICK EN IMAGEN */
document.querySelectorAll(".carousel-item").forEach(item => {
    item.addEventListener("click", () => {
        const link = item.getAttribute("data-link");
        if (link) window.location.href = link;
    });
});
