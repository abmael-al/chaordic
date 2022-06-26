class NotValidObjectException extends Error {
    constructor() {
        super('Not Valid Object Exception');
    }
}

class ObjectValidator {
    validate(item) {
        const allowedProperties = ['title', 'tags', 'link', 'description'];
        
        let hasProperty;
        let validation = true;

        for(let prop of allowedProperties) {
            hasProperty = Object.prototype.hasOwnProperty.call(item, prop);
            
            if(!hasProperty) {
                validation = false;
                
                break;
            }
        }

        return validation;
    }
}
