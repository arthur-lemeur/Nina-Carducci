import {createModal} from "../gallery.js";

export class Image {

    constructor(element, index) {
        this.index = index;
        this.id = element.id;
        this.image = element.image
        this.categoryName = element.tag;
        this.alt = element.alt;
        this.template = document.getElementById('gallery-image-layout');
        this.galleryContainer = document.querySelector('.gallery');
    }

    async createGallery() {
        try {
            const imageTemplate = this.template.content.cloneNode(true);
            const figure = imageTemplate.querySelector("figure");
            figure.setAttribute('category-id', this.categoryName);
            const img = imageTemplate.querySelector("img");
            img.src = this.image;
            img.id = this.id;
            let i = this.index;
            img.setAttribute("alt", this.alt);
            img.setAttribute('rel', "preload");
            img.setAttribute('fetchpriority', "high");
            img.setAttribute('as', "image");
            img.setAttribute('type', "image/webp");
            img.addEventListener('click', () => {
                createModal(img, i);
            });
            this.galleryContainer.appendChild(imageTemplate);
        } catch (e) {
            console.log(e);
        }
    };
}