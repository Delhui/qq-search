import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: 'https://api.uomg.com/api',
    timeout: 3000,
    // headers: { 'X-Custom-Header': 'foobar' }
});

export default AxiosInstance
