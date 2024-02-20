import { getTicketDetails } from "@/features/ticket-api/ticket-api";
import { formatTimestamp } from "@/lib/utils";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { CgSearchLoading } from "react-icons/cg";
import PostBox from "@/components/ui/shared/PostBox";
import Comment from "@/components/ui/shared/Comment";

const TicketDetails = () => {
  const { ticketId } = useParams();

  const { data: ticketDetails } = useQuery("ticketDetails", () =>
    getTicketDetails(ticketId)
  );



  return (
    <div className="flex justify-center h-[calc(100%-0px)]  overflow-scroll custom-scrollbar w-full ">
      <div className="w-[90%] md:w-[80%] lg:w-[85%] xl:w-[72%] pt-8 px-0 flex gap-20 h-full">
        <div className="w-3/4 flex flex-col gap-5 h-full">
        <div className="flex gap-2">
        <div className={`flex justify-center items-center font-semibold w-[70px] py-1 rounded-[5px] 
  ${ticketDetails?.type === "feature" ? "bg-green-500" : 
    ticketDetails?.type === "bug" ? "bg-rose-900" : 
    ticketDetails?.type === "question" ? "bg-blue-500" : "bg-gray-500"
  }`}>
  <span className="">{ticketDetails?.type}</span>
</div>
<div className={`flex justify-center items-center font-semibold w-[70px] py-1 rounded-[5px] 
  ${ticketDetails?.priority === "low" ? "bg-blue-500" : 
    ticketDetails?.priority === "medium" ? "bg-green-600" : 
    ticketDetails?.priority === "critical" ? "bg-rose-600" : "bg-gray-500"
  }`}>
  <span className="">{ticketDetails?.priority}</span>
</div>

        </div>
          <span className="font-semidbold uppercase text-sm text-slate-700"></span>
          <h1>{ticketDetails?.title}</h1>

          <div className="flex items-center gap-3">
            <img
              className="w-[32px] h-[32px] rounded-[50%] object-cover"
              src={ticketDetails?.created_by?.photo || "/assets/icons/profile-placeholder.svg"}
              alt=""
            />
            <span className="text-sm font-semibold">
              {ticketDetails?.created_by?.first_name}{" "}
              {ticketDetails?.created_by?.last_name}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-[#ffc108]">
                {formatTimestamp(ticketDetails?.created)}
              </span>
            </div>
          </div>

          <h2>Description</h2>
          <p className="break-all">
          {ticketDetails?.description}
          </p>

          <div className="mt-12 flex flex-col gap-5">
            <h2>Assigned to</h2>
    {  ticketDetails?.assigned?(<div className="flex items-center gap-5">
              <img
                src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="userAvatar"
                className="w-[100px] h-[100px] rounded-[50%] object-cover"
              />
              <div className="flex flex-col gap-2 items-center">
                <span>John Doe</span>
                <div className="flex items-center gap-1">
           
                  <span className="text-sm font-bold text-[#ffc108]">Role</span>
                </div>
         <Button>
          View
         </Button>
              </div>
            </div>):        <div className="flex justify-center items-center gap-5 py-3">
       <CgSearchLoading size={45}/><span>Not Asigned yet...</span>
 
            </div>}

    






            <div className="border-2 border-gray-400 rounded[5px] p-5 mt-4">
              <div className="flex justify-between flex-wrap">
                <div className="w-[300px] flex flex-col  gap-2 mb-2">
                  <span className="font-semibold">Ticket Id</span>
                  <span className="desc">{ticketDetails?.id}</span>
                </div>
                <div className="w-[300px] flex flex-col  gap-2">
                  <span className="title">Attachments</span>
                  <span className="desc">0</span>
                </div>
                <div className="w-[300px] flex flex-col  gap-2">
                  <span className="title">Avg response time</span>
                  <span className="desc">4 hours</span>
                </div>
       
      
              </div>
              <hr className="mb-5 mt-5 h-0" />
       
            </div>
          </div>

          <div className="mt-10">
<Comment ticketId={ticketDetails?.id} projectId={ticketDetails?.project} currentUserImg={'a'} currentUserId="1"/>

            <h2>Comments</h2>

         <PostBox/>
            <PostBox/>
            <PostBox/>
            <PostBox/>
            <PostBox/> 



        

       
            
       
   
            {/* <hr /> */}
    
     
          </div>
        </div>
        {/* asdddddddddddddddddddddddddddddddddddddddd */}
        <div className="w-1/4">
        
    
          <div className="">
            <div className="w-[300px] flex flex-col mt-5 gap-2 ">
              <img src="/images/clock.png" alt="clock" />
              <span>Status {ticketDetails?.status}</span>
            </div>
            <div className="w-[300px] flex flex-col mt-5 gap-2">
              <img src="/images/recycle.png" alt="recycle" />
              <span>Type : {ticketDetails?.type}</span>
            </div>
          </div>
          <div className="features">
            <div className="w-[300px] flex flex-col mt-5 gap-2">
              <img src="/images/greencheck.png" alt="checkmark" />
              <span>Priority: {ticketDetails?.priority}</span>
            </div>
            <div className="w-[300px] flex flex-col mt-5 gap-2">
              <img src="/images/greencheck.png" alt="checkmark" />
              <span>Project ID : {ticketDetails?.project}</span>
            </div>
            <div className="w-[300px] flex flex-col mt-5 gap-2">
              <img src="/images/greencheck.png" alt="checkmark" />
              <span>Created : {formatTimestamp(ticketDetails?.created)}</span>
            </div>
   
    
          </div>

          <button>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
