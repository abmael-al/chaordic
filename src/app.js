import { CreateUtilityToolElement } from './application/create-tool';
import { SubmitUtilityToolListener } from './application/submit-tool';
import { SearchUtilityToolListener } from './application/search-tool';
import { UtilityToolRemovalListener } from './application/delete-tool';
import { ReadAll } from './domain/read-all';

export class App {
    #root = document.querySelector('[root]');
    
    start() { 
        new InitialScreenLoader(this.#root).start();

        new SubmitFunctionality(this.#root).start();

        new SearchFunctionality(this.#root).start();
        
        new RemovalFunctionality(this.#root).start();
    }
}

class InitialScreenLoader {
    constructor(root) {
        this.root = root;
    }

    async start() {
        const items = await new ReadAll().read();

        items.forEach(item => {
            const uTool = new CreateUtilityToolElement().create(item);
            
            this.root.appendChild(uTool);
        });
    }
} 

class SubmitFunctionality {
    #form = document.querySelector('[data-submit-form]');

    constructor(root) {
        this.root = root;        
    }

    start() {
        this.#modalControl();
        new SubmitUtilityToolListener(this.#form).listen(this.#callback.bind(this));
    }
    
    #modalControl() {
        const modal = document.querySelector('[data-submit-modal]');
        const openModal = document.querySelector('[data-open-submit-modal]');
        const closeModal = document.querySelector('[data-close-submit-modal]');
    
        openModal.addEventListener('click', () => {
            modal.showModal();
        });

        closeModal.addEventListener('click', () => {
            modal.close();
        });
    }

    #callback(item) {
        const uTool = new CreateUtilityToolElement().create(item);
        this.root.appendChild(uTool);
    }
}

class SearchFunctionality {
    #checkbox = document.querySelector('[data-checkbox]');
    #searchField = document.querySelector('[data-search-field]');
    #searchForm = document.querySelector('[data-search-form]');

    constructor(root) {
        this.root = root;
    }

    start() {
        new SearchUtilityToolListener(this.#searchField, this.#checkbox, this.#searchForm).listen(this.#callback.bind(this));
    }

    #callback(items) {
        let hasFoundSomething = (items.length) ? true : false;

        if(hasFoundSomething) {
            new UtilityToolRerender().rerender(this.root, items);
        }
    }
}

class RemovalFunctionality {
    constructor(root) {
        this.root = root;
    }

    start() {
        new UtilityToolRemovalListener(this.root).listen(this.#callback.bind(this));
    }

    #callback(utilityTool) {
        utilityTool.remove();
    }
}

class UtilityToolRerender {
    async rerender(root, items) {
        const loadedItems = new UtilityToolLoader().load(items);

        this.#repopulateRoot(root, loadedItems);
    }

    #repopulateRoot(recipient, items) {
        recipient.replaceChildren(...items);
    }
}

class UtilityToolLoader {
    load(items) {
        const batch = [];

        items.forEach((item) => {
            const batchedItem = new CreateUtilityToolElement().create(item);

            batch.push(batchedItem);
        })

        return batch;
    } 
}