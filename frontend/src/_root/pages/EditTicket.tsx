import TicketForm from "@/components/forms/TicketForm";
import { IactionType } from "@/enums/enums";
import { getTicketDetails } from "@/features/ticket-api/ticket-api";
import { Loader } from "lucide-react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"


const EditTicket:React.FC = () => {

 const { id }=useParams();
const {data:ticket,isLoading,isError}= useQuery(["ticket"],()=>getTicketDetails(id))

if(isLoading){
  return(
    <div className="flex-center h-full w-full">
      <Loader/>
    </div>
  )
}

  return (
    <div className="common-container">
      {isLoading?<Loader/>:<TicketForm ticket={ticket} action={IactionType.update}/>}
    </div>
  )
}

export default EditTicket