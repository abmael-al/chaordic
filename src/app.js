import { CreateUtilityToolElement } from './application/create-tool';

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