import { post } from "../scripts/util";

class NotValidObjectException extends Error {
    constructor() {
        super('Not Valid Object Exception');
    }
}

export class CreateUtilityTool {
    async post(item) {
        try {
            const URL = `http://localhost:3000/tools`;
            const isAllowedObject = new ObjectValidator().validate(item);
            let response;

            if(!isAllowedObject) {
                throw new NotValidObjectException();
            }

            response = await post(URL, item);
        
            return response.data;
        }
        catch(error) {
            console.log(error);
        }
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
