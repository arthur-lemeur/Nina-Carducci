import {Image} from "./ImagesClass.js";

export class Gallery {

    async fetchGallery() {
        const r = await fetch('/assets/gallery.json', {
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
}

