import axios from 'axios'

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseURL);

    return request.then((response) => {
        console.log('getall response', response)
        return response.data;
    })
}

const create = (newObject) => {
    const request = axios.post(baseURL, newObject);

    return request.then((response) => {
        return response.data;
    })
}

export default { getAll, create }