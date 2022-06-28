class UtilityTool extends HTMLElement {
    constructor() {
        super();

        this.#build();
    }

    #build() {
        this.shadow = this.attachShadow({ mode: 'open' });

        const wrapperElements = [
            this.#setTitle(),
            this.#setDeleteButton(),
        ]

        const elements = [
            this.#setWrapper(wrapperElements),
            this.#setDescription(),
            this.#setTags(),
        ];
      
        this.shadow.appendChild(this.#style());
        this.shadow.appendChild(this.#setContainer(elements));
    }

    #style() {
        const style = document.createElement('style');

        style.textContent = `
            .content {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .wrapper {
                min-width: 100%;
                
                display: flex;
                justify-content: space-between;
                align-items: start;
            }
        `;

        return style;
    }

    #setTitle() {
        const slot = document.createElement('slot');

        slot.name = 'title';
        slot.classList.add('title');       

        return slot;
    }

    #setDescription() {
        const slot = document.createElement('slot');

        slot.name = 'description';
        slot.classList.add('description');

        return slot;
    }

    #setTags() {
        const slot = document.createElement('slot');

        slot.name = 'tags';
        slot.classList.add('tags');

        return slot;
    }

    #setDeleteButton() {
        const slot = document.createElement('slot');

        slot.name = 'button';
        slot.classList.add('button');
        slot.textContent = 'X';

        return slot;
    }

    #setContainer(elements) {
        const container = document.createElement('div');

        container.classList.add('content');

        elements.forEach((element) => {
            container.appendChild(element);
        });

        return container;
    }

    #setWrapper(elements) {
        const wrapper = document.createElement('div');

        wrapper.classList.add('wrapper');

        elements.forEach((element) => {
            wrapper.appendChild(element);
        });

        return wrapper;
    }
}

window.customElements.define('utility-tool', UtilityTool);