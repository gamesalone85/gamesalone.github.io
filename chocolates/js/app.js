const modal =
    document.getElementById(
        "cotizacionModal"
    );

const openBtn =
    document.getElementById(
        "openModal"
    );

const closeBtn =
    document.getElementById(
        "closeModal"
    );

openBtn.addEventListener(
    "click",
    () => {

        modal.classList.add(
            "active"
        );
    }
);

closeBtn.addEventListener(
    "click",
    () => {

        modal.classList.remove(
            "active"
        );
    }
);

/* EVITAR RECARGA */

document
.getElementById(
    "cotizacionForm"
)
.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();

        alert(
            "Solicitud enviada correctamente"
        );

        modal.classList.remove(
            "active"
        );
    }
);

/* HEADER DINÁMICO */

window.addEventListener(
    "scroll",
    () => {

        const header =
            document.querySelector(
                ".header"
            );

        if(window.scrollY > 50){

            header.style.background =
                "rgba(0,0,0,.75)";

        }else{

            header.style.background =
                "rgba(0,0,0,.2)";
        }
    }
);
