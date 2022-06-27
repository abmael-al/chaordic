class UtilityToolRemovalHandler {
    constructor(target) {
        this.target = target;
    }

    handle(callback) {
        try {
            const uTool = this.target.parentElement;
            const id = uTool.id;
                
            new DeleteUtilityTool().delete(id);
                
            callback(uTool);
        }
        catch(error) {
            console.log(error);
        }
    }
}
