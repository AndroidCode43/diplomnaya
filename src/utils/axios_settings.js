import axios from "axios";
import Cookies from "js-cookie";

const yttAxios = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
    }
});

export default yttAxios;