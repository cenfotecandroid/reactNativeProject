
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
const url = "https://jsonplaceholder.typicode.com/users";

export async function getUsers(){
    const request = await axios.get(url).then(res => res.data);
    return{
        type:'GET_USERS',
        payload: request
    };
}