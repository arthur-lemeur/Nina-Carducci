import {Gallery} from "./Classes/GalleryClass.js";
import {Image} from "./Classes/ImagesClass.js";
import {Filter} from "./Classes/FiltersClass.js";

const gallery = new Gallery();
const galleryArray = await gallery.fetchGallery();
let array = galleryArray;


//
// CREATION GALLERIE
//

const createGalleryImage = () => {
        const images = galleryArray.map((img, index) => new Image(img, index));
        for (const image of images) {
            image.createGallery();
        }
        setTimeout(() => {
            const figures = document.querySelectorAll('.gallery figure');
            figures.forEach(f => f.style.opacity = '1');
        }, 300);
}
//
// CREATION FILTRES
//

const categoriesArray = [
    {name:"Concert",
        id: "0"
    },
    {name: "Entreprises",
        id: "1"
    },
    {
        name: "Mariages",
        id: "2"
    },
    {
        name: "Portrait",
        id: "3"
    }
];



const createGalleryCategories = () => {
    const categories = categoriesArray.map((btn) => new Filter(btn));
    for (const category of categories) {
        category.createFilters();
    }
    document.querySelectorAll('.btn-group button').forEach(button => {
        button.addEventListener('click', e => toggleFilter(e));
    });
}

const toggleFilter = (e) => {
    e.preventDefault();
    const filter = e.currentTarget.dataset.filter;
    e.currentTarget.parentElement.querySelector('.active').classList.remove('active');
    e.currentTarget.classList.add('active');
    const gallery = document.querySelector('.gallery');
    const figures = document.querySelectorAll('.image-container');
    figures.forEach(f => f.style.display = 'none');



    setTimeout(() => {
        gallery.innerHTML = '';
        figures.forEach(f => f.style.display = 'flex');
        const createFilteredGalleryImage = () => {
            /*const images = galleryArray.map((img) => new Image(img));
            const filteredImages = images.filter(image => image.categoryName === filter)*/
            const images = galleryArray.filter(image => image.tag === filter)
            const filteredGalleryArray = images.map((img, index) => new Image(img, index));
            array = images;
            for (const filteredImage of filteredGalleryArray) {
                filteredImage.createGallery();
            }
            };
        if (filter === 'all') {
            createGalleryImage();
            array = galleryArray;
        } else {
            createFilteredGalleryImage();
        }
    }, 100);
}


//
// CREATION MODAL
//

const modalWindow = document.querySelector('#modal-window');
const modal = document.querySelector('.modal');
const modalBackGround = document.querySelector('.modal-backdrop');
let modalState = null;
const prevImage = document.querySelector('.g-prev');
const nextImage = document.querySelector('.g-next');
let modalImage = document.querySelector('.modal-img');



export const createModal = (img, i) => {
    modalWindow.style.display = 'block';
    modalImage.src = img.src;
    modalWindow.style.opacity = "1";
    modal.style.transform = 'none';
    modalBackGround.style.opacity = "0.5";
    modalBackGround.style.zIndex = "1050";
    modalState = modal;

    let currentImageIndex = i;
    let nextImageIndex;
    let prevImageIndex;

    const previousImageFunction = () => {
        if (currentImageIndex === 0) {
            prevImageIndex = array.length - 1;
        } else {
            prevImageIndex = currentImageIndex - 1;

        }
        currentImageIndex = prevImageIndex;
        modalImage.src = array[currentImageIndex].image;
    }

    const nextImageFunction = () => {
        if (currentImageIndex === array.length - 1) {
            nextImageIndex = 0;
        } else {
            nextImageIndex = currentImageIndex + 1;
        }
        currentImageIndex = nextImageIndex;
        modalImage.src = array[currentImageIndex].image;
    }

    prevImage.addEventListener('click', previousImageFunction);
    nextImage.addEventListener('click', nextImageFunction);
}


const closeModal = (e) => {
    modalWindow.style.display = 'none';
    modalWindow.style.opacity = "0";
    modal.style.transform = '0 50px';
    modalBackGround.style.opacity = "0";
    modalBackGround.style.zIndex = "-1";
    modalState = null;

}


window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal(e)
    }
});

modalWindow.addEventListener('click', function(e) {
    closeModal(e);
});

modal.addEventListener('click', (e) => {
    e.stopPropagation();
})


//
// INITIALISATION
//

const init = () => {
    createGalleryCategories();
    createGalleryImage();
}

init();
