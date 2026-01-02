import RequestBody from '@/types/body';
import { Methods } from '@/types/methods';
import axios from 'axios';

export const urlBase = 'http://localhost:8000/';

const ApiCaller = async (url:string, method:string, body?:RequestBody) => {

    let result = null;

    if (method === Methods.GET){
        result = await axios.get(`${urlBase}${url}`);
    }
    return result;
};

export default ApiCaller;