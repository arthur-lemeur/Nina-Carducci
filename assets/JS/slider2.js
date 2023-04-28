const slides = [
    {
        "image": "./assets/images/small/slider/ryoji-iwata-wUZjnOv7t0g-unsplash_small.webp",
        "alt": "man in suit walking on pedestrian crossing",
        "id": "slide-1"
    },
    {
        "image": "./assets/images/small/slider/nicholas-green-nPz8akkUmDI-unsplash_small.webp",
        "alt": "crowd cheering at an event",
        "id": "slide-2"
    },
    {
        "image": "./assets/images/small/slider/edward-cisneros-3_h6-1NPDGw-unsplash_small.webp",
        "alt": "newly brides kissing in alley of guests at mariage",
        "id": "slide-3"
    }
]
//
// Configuration de l'interval
//

const intervalFunction = () => {
    const intervalRunning = () => {
        nextSlideFunction();
    }
    let currentInterval;
    return {
        start() {
            currentInterval = setInterval(intervalRunning, 5000)
        },
        stop() {
            clearInterval(currentInterval);
        }
    }
}
let interval = intervalFunction();

//
// Initialisation du slider, création de l'image
//

const initialisationSlider = () => {
    slides.map(element => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        item.id = element.id;
        const image = document.createElement("img");
        image.setAttribute('id', "image");
        image.alt = element.alt;
        image.src = element.image;

        let slide = document.querySelector('.carousel-inner');
        item.appendChild(image)
        slide.appendChild(item);

    })

    const firstSlide = document.getElementById("slide-1");
    firstSlide.classList.add("slide-active");

    interval.start();
}
//
// Initialisation des bullet points
//

const initialisationDots = () => {
    for (let i = 0; i < slides.length; i++) {
        let dots = document.createElement('button');
        dots.setAttribute('type', 'button');
        dots.classList.add('dot');

        let dotContainer = document.querySelector('.carousel-indicators');
        dotContainer.appendChild(dots);
    }

    let dotsArray = document.querySelectorAll(".dot");
    dotsArray[0].classList.add('dot-active');

}

initialisationSlider();
initialisationDots();



const sliderContainer = document.getElementById("carouselExampleIndicators");

//
// Création flèche de gauche
//

const arrowLeftElement = document.createElement("button");
arrowLeftElement.setAttribute("type", "button");
arrowLeftElement.classList.add("carousel-control-prev");
const arrowLeftIcon = document.createElement('span');
arrowLeftIcon.classList.add("carousel-control-prev-icon");

arrowLeftElement.appendChild(arrowLeftIcon);
sliderContainer.appendChild(arrowLeftElement);

//
//Création flèche de droite
//

const arrowRightElement = document.createElement("button");
arrowRightElement.setAttribute("type", "button");
arrowRightElement.classList.add("carousel-control-next");
const arrowRightIcon = document.createElement('span');
arrowRightIcon.classList.add("carousel-control-next-icon");

arrowRightElement.appendChild(arrowRightIcon);
sliderContainer.appendChild(arrowRightElement);


const container = document.getElementById('slide-container');
const amount = 33.33333;
let initial = 0;

let i = 0;
const item = document.querySelectorAll(".carousel-item");

//
// Mouvement des animations
//

const nextAnimation = () => {
    item[i].style.animation = "0.7s slideincurrent";
    if (i < (slides.length - 1)) {
        item[i+1].style.animation = "0.7s slideinnext";
    } else {
        item[0].style.animation = "0.7s slideinnext";
    }
}

const prevAnimation = () => {
    item[i].style.animation = "0.7s slideoutcurrent";
    if (i === 0) {
        item[item.length - 1].style.animation = "0.7s slideoutnext";
    } else {
        item[i - 1].style.animation = "0.7s slideoutnext";
    }
}

//
// Fonctions next et previous du slider
//

const nextSlideFunction = () => {
    if (i < (slides.length - 1)) {
        item[i+1].classList.add('slide-active');
        dot[i+1].classList.add('dot-active');
    } else {
        item[0].classList.add('slide-active');
        dot[0].classList.add('dot-active');
    }
    nextAnimation();
    setTimeout(() => {
        if (i < (slides.length - 1)) {
            i++;
            item[i-1].classList.remove('slide-active');
            dot[i-1].classList.remove('dot-active');
        } else {
            i = 0;
            item[item.length -1].classList.remove('slide-active');
            dot[dot.length -1].classList.remove('dot-active');
        }
    }, 600)
}

const prevSlideFunction = () => {
    if (i === 0) {
        item[item.length -1].classList.add('slide-active');
        dot[dot.length -1].classList.add('dot-active');
    } else {
        item[i-1].classList.add('slide-active');
        dot[i-1].classList.add('dot-active');
    }
    prevAnimation();
    setTimeout(() => {
        if (i === 0) {
            i = item.length - 1;
            item[0].classList.remove('slide-active');
            dot[0].classList.remove('dot-active');
        } else {
            i--;
            item[i+1].classList.remove('slide-active')
            dot[i+1].classList.remove('dot-active');
        }
    }, 600)
}

//
// Onclick des flèches
//

arrowRightElement.addEventListener('click', function() {
    interval.stop()
    nextSlideFunction()
    interval.start()
});

arrowLeftElement.addEventListener('click', function() {
    interval.stop()
    prevSlideFunction()
    interval.start()
});

//
// Onclick des bullet points
//

const dotsArray = document.querySelectorAll('.dot')
let dot = document.getElementsByClassName("dot");


dotsArray.forEach((el, n) => {
    el.addEventListener('click', function () {
        interval.stop();
        item[n].classList.add("slide-active")
        dot[n].classList.add("dot-active");
        if (n >= i) {
            nextAnimation();
        } else {
            prevAnimation();
        }
        setTimeout(() => {
            dot[i].classList.remove("dot-active");
            item[i].classList.remove("slide-active");
            i = n
        }, 600)
        interval.start();
    })
} );





