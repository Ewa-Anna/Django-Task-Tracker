import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

const token = localStorage.getItem("token");
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const clientApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "X-CSRFToken": token,
  },
});

// clientApi.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default clientApi;
``;
