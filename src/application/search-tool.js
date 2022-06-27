import { Search } from "../domain/search";

export class SearchUtilityToolListener {
    constructor(searchField, checkboxElement, searchForm) {
        this.checkboxElement = checkboxElement;
        this.searchForm = searchForm;
        this.searchField = searchField;  
    }

    listen(handlerCallback) {
        this.searchForm.addEventListener('submit', (event) => {
            event.preventDefault();

            this.#callHandler(handlerCallback);
        })
    }

    #callHandler(handlerCallback) {
        if(this.checkboxElement.checked) {
            new SearchToolHandler(this.searchField.value, 'tag').search(handlerCallback);
        }
        else if (!this.checkboxElement.checked) {
            new SearchToolHandler(this.searchField.value, 'name').search(handlerCallback);
        }
    }
}

class SearchToolHandler {
    constructor(input, type) {
        this.input = input;
        this.type = type;
    }
    
    async search(callback) {
        try {
            const response = await new Search().search(this.input, this.type);

            callback(response);
        }
        catch(error) {
            console.log(error);
        }
    }
}