export class Filter {
    constructor(button) {
        this.id = button.id;
        this.name = button.name;
    }

    async createFilters() {
        try {
            const filterGroup = document.querySelector('.btn-group');
            const filters = document.createElement('button');
            filters.setAttribute('type', 'button');
            filters.classList.add('btn-filter');
            filters.setAttribute('data-filter', this.name);
            filters.innerText = this.name;
            filterGroup.appendChild(filters);
        } catch (e) {

        }
    }

}