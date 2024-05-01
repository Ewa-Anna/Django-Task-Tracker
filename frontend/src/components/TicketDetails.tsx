import React, { useState } from "react";

import { Link, useParams } from "react-router-dom";

import {
  addComment,
  deleteComment,
  getCommentsByTicketId,
  getTicketDetails,
  updateComment,
} from "../services/ticketsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { images } from "../constants";
import { FaFileArrowUp, FaPeopleGroup } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { MdOutlinePending, MdPublic } from "react-icons/md";
import CommentContainer from "./CommentContainer";
import CommentForm from "../pages/forms/CommentForm";
import toast from "react-hot-toast";
import { useAccountStore } from "../store";

const TicketDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [affectedComment, setAffectedComment] = useState(null);
  const userAccount = useAccountStore((state) => state.account);

  const { data: ticket } = useQuery({
    queryFn: () => getTicketDetails({ id }),
    queryKey: ["project", id],
    onSuccess: () => {
      setBreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Tickets", link: "/tickets" },
        { name: "Tickets", link: `/ticket/${ticket?.id}` },
      ]);
    },
  });

  const { data: comments } = useQuery({
    queryFn: () => getCommentsByTicketId({ id }),
    queryKey: ["comments", id],
  });

  const { mutate } = useMutation({
    mutationFn: ({ csrfToken, formData }) => {
      return addComment({ csrfToken, formData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      toast.success("Comment added sucessfully");
    },
  });
  const { mutate: updateMutate } = useMutation({
    mutationFn: ({ csrfToken, commentId, formData }) => {
      return updateComment({ csrfToken, commentId, formData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      setAffectedComment(null);
      toast.success("Comment updated sucessfully");
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: ({ csrfToken, commentId }) => {
      return deleteComment({ csrfToken, commentId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      setAffectedComment(null);
      toast.success("Comment deleted sucessfully");
    },
  });

  const handleSave = ({ csrfToken, formData }) => {
    mutate({ csrfToken, formData });
  };

  const handleUpdateComment = ({ csrfToken, commentId, formData }) => {
    updateMutate({ csrfToken, commentId, formData });
  };
  const handleDeleteComment = ({ csrfToken, commentId }) => {
    deleteMutate({ csrfToken, commentId });
  };

  return (
    <div className=" flex flex-col  h-screen w-full  flex-1  custom-scrollbar overflow-scroll">
      <div className="flex gap-2 md:gap-4 lg:gap-7  h-auto  flex-col-reverse w-[100%] md:w-[90%] py-8 xl:flex-row mx-auto ">
        {/* LEFT */}
        <div className="flex flex-col  gap-5 flex-grow px-4 lg:px-14 py-5 flex-1 h-auto  pb-20 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ">
          {userAccount && userAccount.role === "admin" && (
            <div className="flex justify-end">
              <Link to={`/ticket/edit/${id}`}>
                <button className="bg-blue-400 text-white py-1 px-3.5 font-semibold rounded">
                  Edit
                </button>
              </Link>
            </div>
          )}
          <div className="">
            <span className="text-sm font-semibold ">
              <span className="text-blue-500">ID:</span>
              {ticket?.id}
            </span>
            <h1 className="h1-bold">{ticket?.title}</h1>

            <div className="mt-6 flex flex-col gap-5 ">
              <h2 className="text-base font-semibold text-slate-500">
                Description
              </h2>
              <div className="   border bg-slate-100  rounded-[8px] lg:p-5 mt-1 min-h-[200px] ">
                <span> {ticket?.description}</span>
              </div>
              <h3 className="text-base font-semibold text-slate-500 mt-3">
                Attachments
              </h3>
              <div>
                {ticket?.attachments.map((attachment) => {
                  return (
                    <div className="flex items-center justify-between  px-2 border-b py-3 ">
                      <FaFileArrowUp className="w-5 h-auto" />
                      <span>{attachment?.filename_to_display}</span>
                      <a href={attachment?.url} download>
                        <IoMdDownload className="w-6 h-auto hover:text-blue-300 transition-all" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <CommentContainer
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            handleUpdateComment={handleUpdateComment}
            handleDeleteComment={handleDeleteComment}
            comments={comments}
          />
          <CommentForm
            projectId={ticket?.project}
            ticketId={ticket?.id}
            handleSave={handleSave}
            btnLabel={"Submit"}
          />
        </div>

        {/* LEFT */}
        {/* RIGHT */}
        <div
          className="mx-auto flex p-8 xs:mb-2  w-full  pb-4 rounded xl:flex flex-col gap-5 
                h-fit min-h-[430px] xl:min-w-[30%] xl:w-fit    xl:p-5 xl:sticky xl:top-8  shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]  "
        >
          <table className=" table-auto w-full  mt-2 rounded   border-separate border-spacing-y-10 ">
            <tbody className="">
              <tr className="">
                <th
                  scope="col"
                  className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                >
                  Project{" "}
                  <span className="text-blue-400 font-bold font-mono">ID</span>
                </th>
                <th scope="col" className="w-3/4 border-b pb-3">
                  {ticket?.project}
                </th>
              </tr>

              <tr>
                <th
                  scope="col"
                  className="text-base lg:text-xs text-slate-600 font-semibold w-1/4 border-b pb-3"
                >
                  Status
                </th>
                <th scope="col" className="w-1/2  border-b pb-3">
                  {ticket?.status}
                </th>
              </tr>
              <tr>
                <th
                  scope="col"
                  className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                >
                  Type
                </th>
                <th scope="col" className="w-1/2  border-b pb-3">
                  <span
                    className={`inline-block  text-white  rounded-full text-xs font-semibold uppercase mr-2 ${
                      ticket?.type === "question"
                        ? "bg-gray-500 px-2 py-1.5"
                        : ticket?.type === "bug"
                          ? "bg-rose-500 px-6 py-1.5"
                          : ticket?.type === "improvement"
                            ? "bg-pink-500 px-2 py-1.5"
                            : ticket?.type === "feature"
                              ? "bg-purple-400 px-2.5 py-1.5"
                              : ticket?.type === "other"
                                ? "bg-blue-400 px-2.5 py-1.5"
                                : ""
                    }`}
                  >
                    {ticket?.type}
                  </span>
                </th>
              </tr>
              <tr>
                <th
                  scope="col"
                  className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                >
                  Priority
                </th>
                <th scope="col" className="w-1/2  border-b pb-3 ">
                  <span
                    className={`inline-block  text-white  rounded-full text-xs font-semibold uppercase mr-2 ${
                      ticket?.priority === "low"
                        ? "bg-emerald-500 px-5 py-1.5"
                        : ticket?.priority === "medium"
                          ? "bg-amber-400 px-6 py-1.5"
                          : ticket?.priority === "high"
                            ? "bg-rose-500 px-4 py-1.5"
                            : ticket?.priority === "critical"
                              ? "bg-orange-400 px-2.5 py-1.5"
                              : ""
                    }`}
                  >
                    {ticket?.priority}
                  </span>
                </th>
              </tr>
              <tr>
                <th
                  scope="col"
                  className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                >
                  Created
                </th>
                <th scope="col" className="w-1/2  border-b pb-3">
                  <div className="flex flex-col">
                    <span>
                      {" "}
                      {new Date(ticket?.created).toLocaleString("en-US", {
                        month: "long",
                      })}{" "}
                      {new Date(ticket?.created).getDate()},{" "}
                      {new Date(ticket?.created).toLocaleString("en-US", {
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-xs">
                      {new Date(ticket?.created).toLocaleString("en-US", {
                        hour: "2-digit",
                      })}{" "}
                      {new Date(ticket?.created).toLocaleString("en-US", {
                        minute: "2-digit",
                      })}{" "}
                    </span>
                  </div>
                </th>
              </tr>

              <tr>
                <th
                  scope="col"
                  className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                >
                  Author
                </th>
                <th scope="col" className="w-1/2  border-b pb-3">
                  <div className="flex flex-col">
                    <img
                      src={ticket?.created_by?.photo || images.ProfileImage}
                      alt="avatar"
                      className="w-14 lg:w-12 h-auto mx-auto"
                    />
                    <span className="text-sm">
                      {ticket?.created_by?.first_name}
                    </span>
                    <span className="text-sm">
                      {ticket?.created_by?.last_name}
                    </span>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        {/* RIGHT */}
      </div>
    </div>
  );
};

export default TicketDetails;
