import axios from "axios"
import jsonApi from "../axios/axios-json"


export const getProjects = async()=>{


    const response = await jsonApi.get("/projects/")
    return response.data
}