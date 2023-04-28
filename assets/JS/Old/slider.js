
// Initialisation du slider, création de l'image

const initialisationSlider = () => {
    fetch("../assets/slider.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                const item = document.createElement('div');
                item.classList.add('carousel-item');
                const image = document.createElement("img");
                image.setAttribute('id', 'image');
                image.alt = element.alt;
                image.src = element.image;

                let slide = document.querySelector('.carousel-inner');
                item.appendChild(image)
                slide.appendChild(item);

                let dots = document.createElement('button');
                dots.setAttribute('type', 'button');
                dots.classList.add('dot');

                let dotContainer = document.querySelector('.carousel-indicators');
                dotContainer.appendChild(dots);
            })
        })
}


const sliderContainer = document.getElementById("carouselExampleIndicators");

// Création flèche de gauche
const arrowLeftElement = document.createElement("button");
arrowLeftElement.setAttribute("type", "button");
arrowLeftElement.classList.add("carousel-control-prev");
const arrowLeftIcon = document.createElement('span');
arrowLeftIcon.classList.add("carousel-control-prev-icon");

arrowLeftElement.appendChild(arrowLeftIcon);
sliderContainer.appendChild(arrowLeftElement);


//Création flèche de droite
const arrowRightElement = document.createElement("button");
arrowRightElement.setAttribute("type", "button");
arrowRightElement.classList.add("carousel-control-next");
const arrowRightIcon = document.createElement('span');
arrowRightIcon.classList.add("carousel-control-next-icon");

arrowRightElement.appendChild(arrowRightIcon);
sliderContainer.appendChild(arrowRightElement);


initialisationSlider();

const container = document.getElementById('slide-container');
const amount = 33.33333;
let initial = 0;

arrowRightElement.addEventListener('click', function() {
    if (initial <= 60) {
        initial += amount;
    } else {
        initial = 0;
    }
    container.style.transform = "translateX(-" + initial + "%)";
})

arrowLeftElement.addEventListener('click', function() {
    if (initial >= -30) {
        initial = -66.66666;
    } else {
        initial += amount;
    }
    container.style.transform = "translateX(" + initial + "%)";
})




