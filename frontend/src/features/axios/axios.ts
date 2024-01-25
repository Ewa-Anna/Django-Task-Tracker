import axios from "axios";
import Cookies from 'js-cookie';
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "csrftoken"

const token = "kQ0i4v3yiNg35yAl0Y9Dlk1RJDmGsgkc"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";


const clientApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,

});

export default clientApi;
``