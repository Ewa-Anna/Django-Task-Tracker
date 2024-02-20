import { INewTicket } from "@/components/forms/TicketForm";
import clientApi from "../axios/axios";

export const getTickets = async () => {
  const response = await clientApi.get("/task/tasks/");
  return response.data;
};

export const createTicket = async (formData:INewTicket) => {
  const response = await clientApi.post(`task/tasks/`, formData,{
    xsrfHeaderName: "X-CSRFToken"
  });
  return response.data;
};

export const getTicketPriorityOptions = async () => {
  const response = await clientApi.get("task/dropdown-list/priority");
  return response.data;
};


export const getReportStatistics= async()=>{

const response = await clientApi.get("adminx/task-statistics/?limit=22");
return response.data;
}

export const getTicketDetails= async(ticketId)=>{
const response = await clientApi.get(`task/tasks/${ticketId}`)
return response.data

}

export const addComment= async(formData)=>{
  const response = await clientApi.post('task/comments/',formData)
  return response.data
}