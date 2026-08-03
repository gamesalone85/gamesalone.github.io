"use strict";

/* =========================================================
GAMESALONE18 UNIVERSE
MAIN JAVASCRIPT
========================================================= */

document.addEventListener(
"DOMContentLoaded",
function () {
    console.log(
        "GamesAlone18 Universe: scripts.js cargado correctamente."
    );


    /* =================================================
       SWIPER
    ================================================== */


    const swiperElement =
        document.querySelector(
            ".mySwiper"
        );


    if (
        swiperElement &&
        typeof Swiper !== "undefined"
    ) {


        new Swiper(
            ".mySwiper",
            {

                loop: true,

                centeredSlides: true,

                grabCursor: true,

                watchOverflow: true,

                speed: 700,


                spaceBetween: 16,


                autoplay: {

                    delay: 4500,

                    disableOnInteraction: false,

                    pauseOnMouseEnter: true

                },


                keyboard: {

                    enabled: true,

                    onlyInViewport: true

                },


                pagination: {

                    el:
                        ".swiper-pagination",

                    clickable: true

                },


                navigation: {

                    nextEl:
                        ".swiper-button-next",

                    prevEl:
                        ".swiper-button-prev"

                },


                breakpoints: {


                    0: {

                        slidesPerView: 1,

                        spaceBetween: 10

                    },


                    576: {

                        slidesPerView: 1,

                        spaceBetween: 12

                    },


                    768: {

                        slidesPerView: 1,

                        spaceBetween: 16

                    },


                    992: {

                        slidesPerView: 1,

                        spaceBetween: 18

                    },


                    1200: {

                        slidesPerView: 1,

                        spaceBetween: 20

                    }

                }

            }
        );

    }


    /* =================================================
       TRACKING WHATSAPP
    ================================================== */


    window.trackClick =
        function (origen) {


            console.log(
                "GamesAlone18: click registrado:",
                origen
            );


            if (
                typeof gtag === "function"
            ) {


                gtag(
                    "event",
                    "click_whatsapp",
                    {

                        event_category:
                            "conversion",

                        event_label:
                            origen

                    }
                );

            }

        };


}


);
