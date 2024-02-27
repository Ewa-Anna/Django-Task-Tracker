import { Button } from "@/components/ui/button";
import { getTickets } from "@/features/ticket-api/ticket-api";
import React from "react";
import { LuGitCompare } from "react-icons/lu";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { ImTicket } from "react-icons/im";
import { DataTable } from "@/components/ui/data-table";
import { LuInspect } from "react-icons/lu";
import { cn } from "@/lib/utils";
import Loader from "@/components/ui/shared/Loader";


const Tickets = () => {
  const {
    data: tickets,
    error,
    isLoading,
  } = useQuery(["tickets"], () => getTickets());

  const location = useLocation();
  const currentLocation = location.pathname;

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "priority",
      cell:({row})=>{
        const ticket = row?.original
  
    
        return(
          <div className={cn("border-2 w-[56px] flex justify-center border-dark-4 items-center rounded-[7px] py-[.5] px-7  font-semibold",{
            
            "bg-priority-low border-2 border-priority-low text-blue-150": ticket.priority === "low",
            "bg-priority-medium border-2 border-priority-medium text-green-150": ticket.priority === "medium",
            "bg-priority-high border-2 border-priority-high text-orange-150": ticket.priority === "high",
            "bg-priority-critical border-2 border-priority-critical text-slate-250": ticket.priority === "critical",

          })}>{ticket.priority}</div>
        )
      }
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "action",
      cell: ({row})=>{
        const ticket = row?.original
        return(
       <Link className="hover:text-violet-400 transition-all cursor-pointer" to={`${currentLocation}/ticket/${ticket.id}`}>
       <LuInspect  size={21} />
       </Link>
        )
      }
    }
  ]

  if(isLoading){
  return(

<Loader/>
     

  )
}

  return (
    <main className="w-full h-full py-5 px-16 mx-auto my-12 custom-scrollbar overflow-scroll pb-20">
      <div className="flex flex-col gap-6 md:gap-0 ">
        <div className="flex justify-center gap-2 md:justify-start">
          <ImTicket className="w-10 h-10" />
          <h2 className="h2-bold md:h3-bold">Tickets</h2>
        </div>
        <div className="flex justify-center md:justify-end">
          <Button
            className="px-40 shad-button_primary md:px-2 lg:px-2"
            variant="ghost"
          >
            <Link to="/create-ticket">Add Ticket</Link>
          </Button>
        </div>
      </div>
{/* TABLE */}

{tickets&&<DataTable className="mt-6"  columns={columns} data={tickets?.results} />}

{/* TABLE */}
    </main>
  );
};

export default Tickets;
