import axios from "axios";

// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.xsrfCookieName = "csrftoken";

const token = localStorage.getItem("token");
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const clientApi = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "X-CSRFToken": token,
    },
});



export default clientApi;
``;
