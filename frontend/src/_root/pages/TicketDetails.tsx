import {
  getTicketCommentList,
  getTicketDetails,
} from "@/features/ticket-api/ticket-api";
import { formatTimestamp } from "@/lib/utils";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";
import { Button } from "@/components/ui/button";
import { CgSearchLoading } from "react-icons/cg";
import PostBox from "@/components/ui/shared/PostBox";
import Comment from "@/components/ui/shared/Comment";
import { FaQuestion } from "react-icons/fa";
import { FaBug } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { FaCalendarCheck } from "react-icons/fa";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbFileDownload } from "react-icons/tb";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: ticketDetails } = useQuery("ticketDetails", () =>
    getTicketDetails(id)
  );

  const { data: commentList } = useQuery("ticketCommentList", () =>
    getTicketCommentList(id)
  );

  console.log(commentList);

  return (
    <div className="flex justify-center h-[calc(100%-58px)]  overflow-scroll custom-scrollbar w-full   ">
      <div className="w-[90%] md:w-[80%] lg:w-[85%] xl:w-[75%] pt-8 px-0 flex gap-14 h-full  ">
        <div className="w-3/4 flex flex-col gap-5 h-full ">
          <div className="font-semidbold uppercase text-sm text-slate-200 flex justify-between gap-1  ">
            <IoMdArrowRoundBack
              className="cursor-pointer"
              size={34}
              onClick={() => navigate(-1)}
            />
            <Link to={`/edit-ticket/${id}`}>
            <Button variant="outline">Edit</Button>
            </Link>
          </div>
        
          <div className=" flex flex-col gap-6  rounded-[5px]">
            <h1 className="text-2xl font-semibold uppercase  w-[85%] break-all">
              {ticketDetails?.title}
            </h1>

            <div className="flex items-center gap-3 ">
              <img
                className="w-[45px] h-[45px] rounded-[50%] object-cover"
                src={
                  ticketDetails?.created_by?.photo ||
                  "/assets/icons/profile-placeholder.svg"
                }
                alt=""
              />
              <span className="text-sm text-slate-100">
                {ticketDetails?.created_by?.first_name}{" "}
                {ticketDetails?.created_by?.last_name}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                <span className="text-sm font-bold text-violet-400">
                  {formatTimestamp(ticketDetails?.created)}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <div
                className={`flex justify-center items-center font-semibold w-[65px] py-0.5 rounded-[5px] 
${
  ticketDetails?.type === "feature"
    ? "bg-green-500"
    : ticketDetails?.type === "bug"
    ? "bg-rose-900"
    : ticketDetails?.type === "question"
    ? "bg-blue-500"
    : "bg-gray-500"
}`}
              >
                <span className="">{ticketDetails?.type}</span>
              </div>
              <div
                className={`flex justify-center items-center font-semibold w-[65px] py-0.5 rounded-[5px] 
${
  ticketDetails?.priority === "low"
    ? "bg-blue-500"
    : ticketDetails?.priority === "medium"
    ? "bg-green-600"
    : ticketDetails?.priority === "critical"
    ? "bg-rose-600"
    : "bg-gray-500"
}`}
              >
                <span className="">{ticketDetails?.priority}</span>
              </div>
            </div>
          </div>

          <div className=" bg-dark-2 p-5 mt-5 rounded-[5px] ">
            <h2 className="mb-3 text-xl font-semibold">Description</h2>
            <p className="break-all p-1 text-slate-200">
              {ticketDetails?.description}
            </p>

            <div className="mt-12 flex flex-col gap-5">
              <h2 className="mb-3 text-xl font-semibold">Assigned to</h2>
              {ticketDetails?.assigned ? (
                <div className="flex items-center gap-5 mb-1">
                  <img
                    src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="userAvatar"
                    className="w-[100px] h-[100px] rounded-[50%] object-cover"
                  />
                  <div className="flex flex-col gap-2 items-center">
                    <span>John Doe</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-[#ffc108]">
                        Role
                      </span>
                    </div>
                    <Button>View</Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-5 py-3 mb-1">
                  <CgSearchLoading size={45} />
                  <span>Not Asigned yet...</span>
                </div>
              )}

              <div className="border-2 border-dark-4 rounded[5px] p-5 mt-4">
                <div className="flex justify-between flex-wrap">
                  <div className="w-[300px] flex flex-col  gap-2 mb-2">
                    <span className="font-semibold">Ticket Id</span>
                    <span className="desc">{ticketDetails?.id}</span>
                  </div>
                  <div className="w-[300px] flex flex-col  gap-2">
                    <span className="title">Attachments</span>
                    <span className="desc">{ticketDetails?.attachments.length}</span>
                  </div>
                  <div className="w-[300px] flex flex-col  gap-2">
                    <span className="title">Comments</span>
                    <span className="desc">{commentList?.length??"loading"}</span>
                  </div>
                </div>
                

                <hr className="mb-5 mt-5 h-0 border-[0.2] border-dark-3 " />
               
              <div>
                <h3>Files</h3>
                {ticketDetails?.attachments.length>0&& ticketDetails?.attachments.map((attachment)=>{

                  const url = attachment.file;
const parts = url.split('/');
const fileName = parts[parts.length -1];
                  return(
                      <div className="flex gap-2 p-2 mt-4" >
   <div className="flex gap-1 text-gray-400 font-semibold cursor-pointer w-fit group">
       <TbFileDownload size={24} className="group-hover:text-gray-300 transition ease-in-out delay-90 "/>
      <span className="group-hover:text-gray-300 transition ease-in-out delay-90">{fileName}</span>
   </div>
  
   
   
  </div>
                  )
                })}
              </div>
              </div>

            </div>
          </div>
          <div className="mt-10 pb-10 ">
            <Comment
              ticketId={ticketDetails?.id}
              projectId={ticketDetails?.project}
              currentUserImg={"a"}
              currentUserId="1"
            />

            <h2 className="mb-3 mt-8 text-xl font-semibold">Comments</h2>

            {commentList &&
              commentList.map((comment) => {
                return <PostBox {...comment} />;
              })}
          </div>
        </div>

        <div className="w-1/4 px-4 h-[450px] sticky top-20 border-2 border-dark-3 rounded-[6px] bg-dark-2 ">
          <div className="">
            <div className="w-[300px] flex flex-col   mt-5 gap-2 ">
              <span className="text-slate-400 text-sm">Status</span>
              <div className="flex flex-1 items-center gap-2  py-1 px-2 ">
                <span className="text-xl">{ticketDetails?.status}</span>
              </div>
            </div>
            <div className="w-[300px] flex flex-col   mt-5 gap-2  ">
              <span className="text-slate-400  text-sm">Type</span>
              <div className="flex flex-1 items-center gap-2  py-1 px-2">
                {ticketDetails?.type === "question" && <FaQuestion />}
                {ticketDetails?.type === "bug" && <FaBug />}
                {ticketDetails?.type === "feature" && <RiEdit2Fill />}
                <span className="text-xl">{ticketDetails?.type}</span>
              </div>
            </div>
          </div>

          <div className="features ">
            <div className="w-[300px] flex flex-col  mt-5 gap-2  ">
              <span className="text-slate-400 text-sm">Priority</span>
              <div className="flex flex-1 items-center gap-2  py-1 px-2 ">
                {ticketDetails?.priority === "low" && <FcLowPriority />}
                {ticketDetails?.priority === "medium" && <FcMediumPriority />}
                {ticketDetails?.priority === "high" && <FcHighPriority />}
                {ticketDetails?.priority === "critical" && (
                  <FcHighPriority color="white" />
                )}
                <span className="text-xl">{ticketDetails?.priority}</span>
              </div>
            </div>
            <div className="w-[300px] flex flex-col  mt-5 gap-2 ">
              <span className="text-slate-400 text-sm">Project Id</span>
              <div className="flex flex-1 items-center gap-2  py-1 px-2 ">
                <AiOutlineFieldNumber />
                <span className="text-xl">{ticketDetails?.project}</span>
              </div>
            </div>
            <div className="w-[300px] flex flex-col   mt-5 gap-2 ">
              <span className="text-slate-400 text-sm">Project Id</span>
              <div className="flex flex-1 items-center gap-2  py-1 px-2 ">
                <FaCalendarCheck />
                <span className="text-xl">
                  {formatTimestamp(ticketDetails?.created)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
