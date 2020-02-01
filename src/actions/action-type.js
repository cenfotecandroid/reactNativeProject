
import axios from 'axios';

const url = "https://jsonplaceholder.typicode.com/users";

export function getUsers(){
    const request = axios.get(url).then(res => res.data);
    return{
        type:'GET_USERS',
        payload: request
    };
}