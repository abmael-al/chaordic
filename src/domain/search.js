import { fetch } from "../scripts/util";

class NotAllowedTypeOfSearchException extends Error {
    constructor() {
        super('Not Allowed Type of Search Exception');
    }
}

export class Search {
    async search(request, type) {
        let isAllowedType = this.#validate(type);

        if(!isAllowedType) {
            throw new NotAllowedTypeOfSearchException();
        }

        const params = this.#formatParams(request, type);
        const url = this.#buildUrl(params, type);

        return await fetch(url);
    }
    
    #validate(type) {
        let validation;

        switch(type) {
            case "name":
                validation = true;
                break;

            case "tag":
                validation = true;
                break;
    
            default:
                validation = false;
                break;
        }

        return validation;
    }

    #buildUrl(params, type) {
        const possibleUrls = {
            "name":`http://localhost:3000/tools?q=${params}`,
            "tag": `http://localhost:3000/tools?tags_like=${params}`,
        }

        return possibleUrls[type];
    }

    #formatParams(request, type) {
        const handlers = {
            "name": (name) => {
                return name;
            },
            "tag": (tags) => {
                return tags.split(' ').join('&');
            }
        }

        const formatHandler = handlers[type];

        return formatHandler(request);
    }

}
