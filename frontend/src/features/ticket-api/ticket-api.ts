import clientApi from "../axios/axios"



export const getTickets= async()=>{

const response = await clientApi.get("/task/tasks/")
return response.data

}