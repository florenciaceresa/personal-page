//Barra de navegación visible al hacer scroll
window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY>0);
})


//Menú hamburguesa al hacer scroll
// Función para cambiar el color de las barras
function changeBarColor(scrollPosition) {
    const bars = document.querySelectorAll(".bar");

    if (scrollPosition > 100) {
        bars.forEach(bar => {
            bar.style.backgroundColor = "#808080";
        });
    } else {
        bars.forEach(bar => {
            bar.style.backgroundColor = "#808080";
        });
    }
}

// Evento de scroll para cambiar el color de las barras
window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    changeBarColor(scrollPosition);
});



// Evento de clic en el botón hamburguesa
const menuToggle = document.getElementById('menu-toggle');
const items = document.querySelector('#menu .items');

menuToggle.addEventListener('click', function() {
    if (items.style.display === 'block') {
        items.style.display = 'none';
    } else {
        items.style.display = 'block';
    }

    // Cambiar el color de las barras al abrir o cerrar el menú
    const scrollPosition = window.scrollY;
    changeBarColor(scrollPosition);

    // Alternar la clase 'clicked' en las barras
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.classList.toggle('clicked');
    });

    // Alternar la clase 'pressed' en el botón hamburguesa
    menuToggle.classList.toggle('pressed');
});








//Link activo
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section"); // Cambia a tu selector adecuado

    window.addEventListener("scroll", function() {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - sectionHeight / 2) {
                current = section.getAttribute("id");
            }
        });

        // Agrega la clase "active" al enlace correspondiente y retírala de los demás
        document.querySelectorAll(".header-list a, .header-list .items li a").forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });
});



//MODAL
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal-close");
const modalTitle = document.getElementById("modalTitle");
const modalParagraph = document.getElementById("modalParagraph");
const modalImg = document.getElementById("modalImg");
const modalLink = document.getElementById("modalLink");

// Función para abrir la ventana modal con datos personalizados
function openModal(title, paragraph, imgSrc, link) {
    modalTitle.textContent = title;
    modalParagraph.textContent = paragraph;
    modalImg.src = imgSrc;
    modalLink.href = link;

    modal.classList.add("modal--show");
}
// Evento para abrir la ventana modal cuando se hace clic en el botón "open-project-1"
document.querySelector(".open-project-1").addEventListener("click", (e) => {
    e.preventDefault();
    openModal("PROYECTO 1", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, repellat ipsa, ipsum iure dolores placeat temporibus architecto laboriosam, veniam est adipisci aliquid enim.", "assets/img/diseñoapp.jpg", "project1.html");
});

// Evento para abrir la ventana modal cuando se hace clic en el botón "open-project-2"
document.querySelector(".open-project-2").addEventListener("click", (e) => {
    e.preventDefault();
    openModal("PROYECTO 2", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, repellat ipsa, ipsum iure dolores placeat temporibus architecto laboriosam, veniam est adipisci aliquid enim.", "assets/img/diseñografico.jpg", "elemento2.html");
});

// Evento para abrir la ventana modal cuando se hace clic en el botón "open-project-3"
document.querySelector(".open-project-3").addEventListener("click", (e) => {
    e.preventDefault();
    openModal("PROYECTO 3", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, repellat ipsa, ipsum iure dolores placeat temporibus architecto laboriosam, veniam est adipisci aliquid enim.", "assets/img/diseñoweb.jpg", "elemento2.html");
});

// Evento para cerrar la ventana modal cuando se hace clic en el botón de cierre
closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("modal--show");
});



//VALIDACIÓN FORMULARIO
const d = document;

document.addEventListener("DOMContentLoaded", contactFormValidations);

function contactFormValidations() {
    const $form = d.querySelector(".contact-form"),
    $inputs = d.querySelectorAll(".contact-form [required]");

    console.log($inputs);

    $inputs.forEach((input) => {
        const $span = d.createElement("span");
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add("contact-form-error", "none");
        input.insertAdjacentElement("afterend", $span);
    });

    d.addEventListener("keyup", (e) => {
        if (e.target.matches(".contact-form [required]")) {
            let $input = e.target,
            pattern = $input.pattern || $input.dataset.pattern;

            if (pattern) {
                console.log("El input tiene patrón");
                let regex = new RegExp(pattern);
                return !regex.exec($input.value)
                ? d.getElementById($input.name).classList.add("is-active")
                : d.getElementById($input.name).classList.remove("is-active");
            }
        }
    });

    //ENVÍO DE FORMULARIO
    d.addEventListener("submit", (e) => {
        e.preventDefault();

        const $response = d.querySelector(".contact-form-response");

        fetch("https://formsubmit.co/ajax/soyflorenciaceresa@gmail.com", {
            method: "POST",
            body:new FormData(e.target)
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
            $response.classList.remove("none");
            $response.innerHTML = `<p>Los datos fueron enviados ¡Muchas gracias!</p>`;
            $form.reset();
        })
        .catch(err => {
            console.log(err);
            let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
            $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
        })
        .finally(() => setTimeout(() => {
            $response.classList.add("none");
            $response.innerHTML = "";
        }, 3000));  
});
}
















