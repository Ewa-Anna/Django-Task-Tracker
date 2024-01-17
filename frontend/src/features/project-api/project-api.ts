import axios from "axios"
import clientApi from "../axios/axios"



export const getProjects = async()=>{


    const response = await clientApi.get("/task/projects/")
    return response.data
}

