import axios from "axios";
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";



const clientApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'X-CSRFToken': "BAMDqaLoAYESRmZCZdybcNyru6j18XP4"
  },
});

export default clientApi;
