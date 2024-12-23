import axios from   "axios"
import { ACCESS_TOKEN } from './constant';

const ApiInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 50000,
    
   
})
ApiInstance.interceptors.request.use(
    (config) => {
      const token = window.localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  export default ApiInstance;