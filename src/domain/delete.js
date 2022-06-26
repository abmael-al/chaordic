import { remove } from "../scripts/util";

export class DeleteUtilityTool {
    async delete(id) {
        try {
            const url = `http://localhost:3000/tools/${id}`
            const response = await remove(url);

            return response;
        }
        catch(error) {
            console.log(error);
        }
    }
}
