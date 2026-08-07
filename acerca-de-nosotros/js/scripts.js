/* =========================================================
GAMESALONE18 UNIVERSE
ACERCA DE NOSOTROS
========================================================= */

/* HEADER */

fetch("/header.html")
.then(res => res.text())
.then(data => {

    document.getElementById("header").innerHTML = data;

})
.catch(error => {

    console.error(
        "Error cargando header:",
        error
    );

});


/* FOOTER */

fetch("/footer.html")
.then(res => res.text())
.then(data => {

    document.getElementById("footer").innerHTML = data;

})
.catch(error => {

    console.error(
        "Error cargando footer:",
        error
    );

});

/* =========================================================
NAVBAR SCROLL
========================================================= */

window.addEventListener("scroll", function() {

const nav =
    document.querySelector(".custom-navbar");

if (!nav) return;

nav.classList.toggle(
    "scrolled",
    window.scrollY > 50
);


});

/* =========================================================
DEBUG
========================================================= */

console.log(
"GamesAlone18 Universe - Acerca de Nosotros cargado correctamente."
);
