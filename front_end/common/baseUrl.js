import axios from   "axios"
import { ACCESS_TOKEN } from './constant';

const ApiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
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