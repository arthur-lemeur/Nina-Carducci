const createGallery = () => {

    const gallery = document.querySelector(".gallery");

    const fetchGallery = () => {
        fetch("../assets/gallery.json")
            .then((response) => response.json())
            .then((data) => {
                data.forEach((element, index) => {
                    const imageContainer = document.createElement("div");
                    imageContainer.classList.add('image-container')
                    imageContainer.setAttribute('data-gallery-tag', element.tag);

                    const images = document.createElement("img");
                    images.setAttribute('data-gallery-tag', element.tag);
                    images.classList.add("gallery-item");
                    images.src = element.image;
                    images.alt = element.alt;
                    images.setAttribute("loading", "lazy");

                    imageContainer.appendChild(images);
                    gallery.appendChild(imageContainer);

                    const createModal = () => {
                        const modalImage = document.querySelector(".modal-img")
                        const modalWindow = document.querySelector('#modal-window')
                        const modal = document.querySelector('.modal');
                        const modalBackGround = document.querySelector('.modal-backdrop')
                        let modalState = null;

                        images.addEventListener('click', function (e) {

                            e.preventDefault();
                            modalWindow.style.display = 'block';
                            modalImage.src = element.image;
                            modalImage.id = index;
                            modalWindow.style.opacity = "1";
                            modal.style.transform = 'none';
                            modalBackGround.style.opacity = "0.5";
                            modalBackGround.style.zIndex = "1050";
                            modalState = modal;
                        })
                    }
                    createModal();

                    const prevImage = document.querySelector('.g-prev');
                    let modalImage = document.querySelector('.modal-img')

                    prevImage.addEventListener('click', function(e) {
                        let i = index;
                        console.log(i)
                        modalImage.src = (data[i-1].image);
                        modalImage.id = i;
                    })
                })
            });

    }
    fetchGallery();
}

createGallery();
