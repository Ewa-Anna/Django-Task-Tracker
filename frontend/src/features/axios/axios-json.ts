import axios from "axios";

const API_BASE_URL= import.meta.env.VITE_API_JSON_BASE_URL|| "";

const jsonApi= axios.create({
  baseURL: API_BASE_URL,
  


})


export default jsonApi