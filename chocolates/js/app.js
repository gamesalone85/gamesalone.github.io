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

/* ===================================
   GOOGLE SHEETS
=================================== */

const scriptURL =
"https://script.google.com/macros/s/AKfycbz6yJXPduACkrPlb8H-rLHP8Fl9wcZGzDQXDD6Jx5UUZQ5_yxlE_T2udMgi-_vPI_o/exec";

document
.getElementById(
    "cotizacionForm"
)
.addEventListener(
    "submit",
    async(e) => {

        e.preventDefault();

        const submitBtn =
            document.querySelector(
                ".submit-btn"
            );

        submitBtn.disabled = true;

        submitBtn.innerText =
            "Enviando...";

        const data = {

            nombre:
            document.getElementById(
                "nombre"
            ).value,

            telefono:
            document.getElementById(
                "telefono"
            ).value,

            correo:
            document.getElementById(
                "correo"
            ).value,

            evento:
            document.getElementById(
                "evento"
            ).value,

            cantidad:
            document.getElementById(
                "cantidad"
            ).value,

            fechaEvento:
            document.getElementById(
                "fechaEvento"
            ).value,

            descripcion:
            document.getElementById(
                "descripcion"
            ).value
        };

        try{

            await fetch(
                scriptURL,
                {

                    method:"POST",

                    body:JSON.stringify(
                        data
                    )
                }
            );

            alert(
                "Solicitud enviada correctamente"
            );

            document
            .getElementById(
                "cotizacionForm"
            )
            .reset();

            modal.classList.remove(
                "active"
            );

        }catch(error){

            alert(
                "Error al enviar solicitud"
            );

            console.error(
                error
            );
        }

        submitBtn.disabled = false;

        submitBtn.innerText =
            "Enviar Solicitud";
    }
);

/* ===================================
   HEADER DINÁMICO
=================================== */

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
