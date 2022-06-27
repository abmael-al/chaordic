import { CreateUtilityToolElement } from './application/create-tool';
import { UtilityToolRemovalListener } from './application/delete-tool';

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