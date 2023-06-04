import axios from "axios";
import Cookies from "js-cookie";

const yttAxios = axios.create({
    baseURL: 'https://yttserver-production.up.railway.app',
    headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
    }
});

export default yttAxios;