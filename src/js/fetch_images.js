import axios from 'axios';

export default async function fetchImages(baseURL, key, name, page, per_page) {
    try {
        const response = await axios.get(`${baseURL}?key=${key}&q=${name}&image_type=photo&safesearch=true&page=${page}&per_page=${per_page}`);
        return response;
    } catch (error) {
        console.log(error.message)
    }
}

