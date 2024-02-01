import axios from "axios"
import clientApi from "../axios/axios"



export const getProjects = async()=>{


    const response = await clientApi.get("/task/projects/")
    return response.data
}

export const createProject = async(formData)=>{

const response = await clientApi.post("/task/projects/",formData,{
    // xsrfHeaderName: "X-CSRFToken",
})
return response.data
}


export const getUserProjects = async()=>{
const response = await clientApi.get("/task/list_of_prj_assignee/")
return response.data

}

export const getVisibilityOptions = async()=>{

    const response = await clientApi.get("task/dropdown-list/visibility",{
        // xsrfHeaderName: "X-CSRFToken",
    })
    return response.data
    }