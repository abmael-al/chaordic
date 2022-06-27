import { CreateUtilityToolElement } from './application/create-tool';
import { SearchUtilityToolListener } from './application/search-tool';

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