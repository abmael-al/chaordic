import axios from "axios";

export const post = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        
        return response;
    }
    catch(error) {
        console.log(error);
    }
}

// "delete" is a reserved word.
export const remove = async (url, config) => {
    try {
        const response = await axios.delete(url, config);

        return response;
    }
    catch(error) {
        console.log(error);
    }
}

export const fetch = async function(url) {
    try {
        const response = await axios.get(url);

        return response.data;
    }
    catch(error) {
        console.log(error);
    }
}