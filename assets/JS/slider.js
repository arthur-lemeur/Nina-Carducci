const slides = [
    {
        "image": "./assets/images/slider/ryoji-iwata-wUZjnOv7t0g-unsplashX.avif",
        "alt": "man in suit walking on pedestrian crossing",
        "id": "slide-1"
    },
    {
        "image": "./assets/images/slider/nicholas-green-nPz8akkUmDI-unsplash.avif",
        "alt": "crowd cheering at an event",
        "id": "slide-2"
    },
    {
        "image": "./assets/images/slider/edward-cisneros-3_h6-1NPDGw-unsplashX.avif",
        "alt": "newly brides kissing in alley of guests at mariage",
        "id": "slide-3"
    }
]
//
// Configuration de l'interval
//

const intervalFunction = () => {
    const intervalRunning = () => {
        nextSlideFunction(1);
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
        image.setAttribute('rel', "preload");
        image.setAttribute('fetchpriority', "high");
        image.setAttribute('as', "image");
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
        dots.setAttribute("aria-label", "navigation button for slider")
        dots.classList.add('dot');

        let dotContainer = document.querySelector('.carousel-indicators');
        dotContainer.appendChild(dots);
    }

    let dotsArray = document.querySelectorAll(".dot");
    dotsArray[0].classList.add('dot-active');

}

initialisationSlider();
initialisationDots();



const sliderContainer = document.getElementById("slider");

//
// Création flèche de gauche
//

const arrowLeftElement = document.createElement("button");
arrowLeftElement.setAttribute("type", "button");
arrowLeftElement.setAttribute("aria-label", "button left arrow");
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
arrowRightElement.setAttribute("aria-label", "button right arrow");
arrowRightElement.classList.add("carousel-control-next");
const arrowRightIcon = document.createElement('span');
arrowRightIcon.classList.add("carousel-control-next-icon");

arrowRightElement.appendChild(arrowRightIcon);
sliderContainer.appendChild(arrowRightElement);

let i = 0;
const item = document.querySelectorAll(".carousel-item");

//
// Mouvement des animations
//

const nextAnimation = (x) => {
    item[i].style.animation = "0.7s slideincurrent";
    if (i < (slides.length - x)) {
        item[i+x].style.animation = "0.7s slideinnext";
    } else {
        item[0].style.animation = "0.7s slideinnext";
    }
}

const prevAnimation = (x) => {
    item[i].style.animation = "0.7s slideoutcurrent";
    if (i === 0) {
        item[item.length - x].style.animation = "0.7s slideoutnext";
    } else {
        item[i - x].style.animation = "0.7s slideoutnext";
    }
}

//
// Fonctions next et previous du slider
//

const nextSlideFunction = (x) => {
    if (i < (slides.length - 1)) {
        item[i+1].classList.add('slide-active');
        dot[i+1].classList.add('dot-active');
    } else {
        item[0].classList.add('slide-active');
        dot[0].classList.add('dot-active');
    }
    nextAnimation(x);
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

const prevSlideFunction = (x) => {
    if (i === 0) {
        item[item.length -1].classList.add('slide-active');
        dot[dot.length -1].classList.add('dot-active');
    } else {
        item[i-x].classList.add('slide-active');
        dot[i-x].classList.add('dot-active');
    }
    prevAnimation(x);
    setTimeout(() => {
        if (i === 0) {
            i = item.length - 1;
            item[0].classList.remove('slide-active');
            dot[0].classList.remove('dot-active');
        } else {
            i--;
            item[i+x].classList.remove('slide-active')
            dot[i+x].classList.remove('dot-active');
        }
    }, 600)
}

//
// Onclick des flèches
//

arrowRightElement.addEventListener('click', function() {
    interval.stop()
    nextSlideFunction(1)
    interval.start()
});

arrowLeftElement.addEventListener('click', function() {
    interval.stop()
    prevSlideFunction(1)
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
            nextAnimation(n-i);
        } else {
                prevAnimation(i-n);
            }
        setTimeout(() => {
            dot[i].classList.remove("dot-active");
            item[i].classList.remove("slide-active");
            i = n
        }, 600)
        interval.start();
    })
} );





