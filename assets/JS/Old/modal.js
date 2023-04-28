const gallery = document.querySelector(".gallery")
const modalWindow = document.querySelector('#modal-window')
const modal = document.querySelector('.modal');
const modalBackGround = document.querySelector('.modal-backdrop')
let modalState = null;

const createModal = () => {
    const modalImage = document.querySelector(".modal-img")
    const modalWindow = document.querySelector('#modal-window')
    const modal = document.querySelector('.modal');
    const modalBackGround = document.querySelector('.modal-backdrop')
    let modalState = null;


    images.forEach.addEventListener('click', function (e) {
        console.log('hello')
        e.preventDefault();
        modalWindow.style.display = 'block';
        modalImage.src = images.src;
        modalWindow.style.opacity = "1";
        modal.style.transform = 'none';
        modalBackGround.style.opacity = "0.5";
        modalBackGround.style.zIndex = "1050";
        modalState = modal;
    });
}
createModal();


const closeModal = (e) => {
    e.preventDefault();
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
    e.stopPropagation();
    closeModal(e);
});


