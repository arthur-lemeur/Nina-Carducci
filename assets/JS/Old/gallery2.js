import {Image} from "../Classes/ImagesClass.js";
import {Filter} from "../Classes/FiltersClass.js";

async function fetchGallery() {
    const r = await fetch('../assets/gallery.json', {
        method: 'GET',
        headers: {
            "Accept": "application/json",
        },
    });
    if (r.ok === true) {
        return r.json();
    }
    throw new Error('Impossible de contacter le serveur');
}

const createGalleryImage = () => {
    fetchGallery().then(async i => {
        const images = i.map((img, index) => new Image(img, index));
        for (const image of images) {
            await image.createGallery();
        }
        setTimeout(() => {
            const figures = document.querySelectorAll('.gallery figure');
            figures.forEach(f => f.style.opacity = '1');
        }, 300);
    });
}

// Filters

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
    const figures = document.querySelectorAll('.gallery figure');
    figures.forEach(f => f.style.opacity = '0');



    setTimeout(() => {
            gallery.innerHTML = '';

            const createFilteredGalleryImage = () => {
                fetchGallery().then(async i => {
                    const images = i.map((img) => new Image(img));
                    const filteredImages = images.filter(image => image.categoryName === filter)
                    for (const filteredImage of filteredImages) {
                        await filteredImage.createGallery();
                    }
                    setTimeout(() => {
                        const figures = document.querySelectorAll('.gallery figure');
                        figures.forEach(f => f.style.opacity = '1');

                    }, 300);
                });
            }
            if (filter === 'all') {
                createGalleryImage();
                container.style.width = "100%";
                container.style.height = "100%";
            } else {
                createFilteredGalleryImage();
            }
            ;
        }, 400
    );
}

const init = () => {
    createGalleryCategories();
    createGalleryImage();
}

init();