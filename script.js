/* =========================================================
   PROJECT CAROUSELS
========================================================= */

const carousels =
    document.querySelectorAll(".carousel");


carousels.forEach((carousel) => {

    const track =
        carousel.querySelector(".carousel-track");

    const slides =
        Array.from(
            carousel.querySelectorAll(".carousel-slide")
        );

    const previousButton =
        carousel.querySelector(".previous");

    const nextButton =
        carousel.querySelector(".next");

    const caption =
        carousel.querySelector(".carousel-caption");

    const counter =
        carousel.querySelector(".carousel-counter");

    const dotsContainer =
        carousel.querySelector(".carousel-dots");


    let currentSlide = 0;


    /* CREATE NAVIGATION DOTS */

    slides.forEach((slide, index) => {

        const dot =
            document.createElement("button");

        dot.classList.add("carousel-dot");

        dot.setAttribute(
            "aria-label",
            `Go to image ${index + 1}`
        );

        dot.addEventListener("click", () => {

            currentSlide = index;

            updateCarousel();

        });

        dotsContainer.appendChild(dot);

    });


    const dots =
        Array.from(
            dotsContainer.querySelectorAll(".carousel-dot")
        );


    /* UPDATE CAROUSEL */

    function updateCarousel() {

        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;


        caption.style.opacity = "0";


        setTimeout(() => {

            caption.textContent =
                slides[currentSlide].dataset.caption || "";

            caption.style.opacity = "1";

        }, 140);


        const current =
            String(currentSlide + 1)
                .padStart(2, "0");

        const total =
            String(slides.length)
                .padStart(2, "0");


        counter.textContent =
            `${current} / ${total}`;


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });

    }


    /* PREVIOUS */

    previousButton.addEventListener("click", () => {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        updateCarousel();

    });


    /* NEXT */

    nextButton.addEventListener("click", () => {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        updateCarousel();

    });


    /* KEYBOARD NAVIGATION */

    carousel.setAttribute("tabindex", "0");


    carousel.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight") {

            currentSlide =
                (currentSlide + 1)
                % slides.length;

            updateCarousel();

        }


        if (event.key === "ArrowLeft") {

            currentSlide =
                (
                    currentSlide
                    - 1
                    + slides.length
                )
                % slides.length;

            updateCarousel();

        }

    });


    updateCarousel();

});


/* =========================================================
   SCROLL REVEALS
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-media"
    );


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});
