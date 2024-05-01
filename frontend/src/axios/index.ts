import axios from "axios";

// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.xsrfCookieName = "csrftoken";

const token = localStorage.getItem("token");

const clientApi = ({ csrfToken }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  const clientApi = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
      "X-CSRFToken": csrfToken,
    },
  });

  return clientApi;
};
export default clientApi;
``;
