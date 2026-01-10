import RequestBody from '@/types/body';
import { Methods } from '@/types/methods';
import axios from 'axios';

export const urlBase = 'http://localhost:8000/';

const ApiCaller = async (url: string, method: string, body?: RequestBody) => {
  let result = null;

  if (method === Methods.GET) {
    result = await axios.get(`${urlBase}${url}`);
  } else if (method === Methods.POST) {
    result = await axios.post(`${urlBase}${url}`, body);
  } else if (method === Methods.DELETE) {
    result = await axios.delete(`${urlBase}${url}`);
  } else if (method === Methods.PATCH) {
    result = await axios.patch(`${urlBase}${url}`, body);
  } else if (method === Methods.PUT) {
    result = await axios.put(`${urlBase}${url}`, body);
  }
  return result;
};

export default ApiCaller;
