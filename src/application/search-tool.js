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