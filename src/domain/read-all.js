import { fetch } from "../scripts/util";

export class ReadAll {
    async read() {
        try {
            const URL = `http://localhost:3000/tools`;

            return await fetch(URL);
        }
        catch(error) {
            console.log(error);
        }
    }
}