import {Gallery} from "../Classes/GalleryClass.js";

const modalWindow = document.querySelector('#modal-window')
const modal = document.querySelector('.modal');
const modalBackGround = document.querySelector('.modal-backdrop')
let modalState = null;
const prevImage = document.querySelector('.g-prev');
let modalImage = document.querySelector('.modal-img')



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
            prevImageIndex = galleryArray.length - 1;
        } else {
            prevImageIndex = currentImageIndex - 1;

        }
        currentImageIndex = prevImageIndex;
        modalImage.src = galleryArray[currentImageIndex].image;
    }

    const nextImageFunction = () => {
        if (currentImageIndex === galleryArray.length - 1) {
            nextImageIndex = 0;
        } else {
            nextImageIndex = currentImageIndex + 1;
        }
        currentImageIndex = nextImageIndex;
        modalImage.src = galleryArray[currentImageIndex].image;
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


