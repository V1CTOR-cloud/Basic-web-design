const Testimonials = [
    {
        rating: 5,
        testimonial: "Untilted has truly impressed me as a small business owner. Selling my digital products has never been easier and seamless integration with Xero is a huge plus. I highly recommend!",
        author: "Isabel Paige",
        image: "https://images.pexels.com/photos/10791309/pexels-photo-10791309.jpeg",
        role: "Owner",
        Enterprise: "Aselsan Analytics",
    },
    {
        rating: 5,
        testimonial: "La automatización de facturas nos ha ahorrado horas de trabajo manual a la semana. La interfaz es intuitiva y el soporte técnico respondió en minutos cuando tuvimos dudas.",
        author: "Carlos Mendoza",
        image: "https://images.pexels.com/photos/37676879/pexels-photo-37676879.jpeg",
        role: "Director de Operaciones",
        Enterprise: "Nova Tech Solutions",
    },
    {
        rating: 4,
        testimonial: "Migrar toda nuestra base de datos parecía una pesadilla, pero el proceso fue sumamente limpio. Excelente herramienta para escalar operaciones sin perder el control.",
        author: "Elena Rostova",
        image: "https://images.pexels.com/photos/32341902/pexels-photo-32341902.jpeg",
        role: "CTO",
        Enterprise: "Pixel & Code Studio",
    },
    {
        rating: 5,
        testimonial: "Como creador de contenido independiente, buscaba algo simple pero potente. Poder gestionar mis suscripciones y pagos en un solo lugar ha cambiado por completo mi negocio.",
        author: "Marcus Vance",
        image: "https://images.pexels.com/photos/13750530/pexels-photo-13750530.jpeg",
        role: "Creador Independiente",
        Enterprise: "Vance Media Group",
    },
    {
        rating: 5,
        testimonial: "La capacidad de análisis y los reportes en tiempo real son brutales. Nos ha permitido tomar decisiones estratégicas basadas en datos desde el primer día. 100% recomendados.",
        author: "Sofia Gallagher",
        image: "https://images.pexels.com/photos/18300771/pexels-photo-18300771.jpeg",
        role: "Head of Growth",
        Enterprise: "Lumina E-commerce",
    },
];

let currentIndex = 0;
let carouselTimer;

document.addEventListener("DOMContentLoaded", init);

function init() {
    const indicatorsContainer = document.getElementById("carousel-indicator");
    if (!indicatorsContainer) return;


    Testimonials.forEach((_, index) => {
        const indicator = document.createElement("div");
    
        indicator.className = `h-1 cursor-pointer rounded-sm w-full transition-colors duration-300 ${index === 0 ? "bg-white" : "bg-neutral-500"}`;
        indicator.id = `indicator-${index}`;

        indicator.addEventListener("click", () => {
            goToSlide(index);
        });

        indicatorsContainer.appendChild(indicator);
    });

    updateCarousel(true);
    startAutoPlay();
}

function updateCarousel(isFirstLoad = false) {
    const currentData = Testimonials[currentIndex];

    const carouselContent = document.getElementById("carousel-content");
    const testimonialText = document.getElementById("carousel-testimonial");
    const authorText = document.getElementById("carousel-author");
    const roleEnterpriseText = document.getElementById("carousel-role-enterprise");
    const ratingContainer = document.getElementById("carousel-rating");
    const testimonialImage = document.getElementById("carousel-indicator");

    const changeDOMContent = () => {
        if (testimonialText) testimonialText.textContent = currentData.testimonial;
        if (authorText) authorText.textContent = currentData.author;
        if (roleEnterpriseText) roleEnterpriseText.textContent = `${currentData.role}, ${currentData.Enterprise}`;
        if (testimonialImage) testimonialImage.style.backgroundImage = `url('${currentData.image}')`;

        if (ratingContainer) {
            const stars = ratingContainer.querySelectorAll("i");
            stars.forEach((star, index) => {
                star.style.opacity = index < currentData.rating ? "1" : "0.2";
            });
        }

        Testimonials.forEach((_, index) => {
            const indicator = document.getElementById(`indicator-${index}`);
            if (indicator) {
                indicator.className = `h-1 cursor-pointer rounded-sm w-full transition-colors duration-300 ${
                    index === currentIndex ? "bg-white" : "bg-neutral-500"
                }`;
            }
        });
    };

    if (isFirstLoad || !carouselContent) {
        changeDOMContent();
    } else {
        carouselContent.style.opacity = "0";

        setTimeout(() => {
            changeDOMContent();
            carouselContent.style.opacity = "1";
        }, 150);
    }
}

function startAutoPlay() {
    carouselTimer = setInterval(() => {
        currentIndex = (currentIndex + 1) % Testimonials.length;
        updateCarousel();
    }, 5000);
}

function goToSlide(index) {
    if (index === currentIndex) return;
    clearInterval(carouselTimer); 
    currentIndex = index;
    updateCarousel();
    startAutoPlay();
}