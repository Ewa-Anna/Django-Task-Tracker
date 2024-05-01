import React, { useState } from "react";

import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectDetails } from "../services/projectsApi";
import { MdOutlinePending, MdPublic } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { images } from "../constants";
import { FaFileArrowUp } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { useAccountStore } from "../store";

const ProjectDetails: React.FC = () => {
  const userAccount = useAccountStore((state) => state.account);
  const { role } = userAccount;
  const { id } = useParams();
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);

  const { data: project } = useQuery({
    queryFn: () => getProjectDetails({ id }),
    queryKey: ["project", id],
    onSuccess: () => {
      setBreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Projects", link: "/projects" },
        { name: "Project", link: `/project/${project?.id}` },
      ]);
    },
  });

  return (
    <div className=" flex flex-col  h-screen w-full  flex-1  custom-scrollbar overflow-scroll   ">
      <div className=" flex gap-12  h-auto  flex-col-reverse w-[100%] md:w-[90%] py-10 xl:flex-row mx-auto ">
        {/* LEFT */}
        <div className="flex flex-col  gap-5 flex-grow px-14 py-10 flex-1 h-auto shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ">
          {role === "admin" && (
            <div className="flex justify-end">
              <Link to={`/project/edit/${id}`}>
                <button className="bg-blue-400 text-white py-1 px-3.5 font-semibold rounded">
                  Edit
                </button>
              </Link>
            </div>
          )}
          <h1 className="h2-bold">{project?.title}</h1>

          <div className="flex items-center  gap-2 flex-wrap ">
            {project?.tags.map((tag) => {
              return (
                <div className="border-[0.5px]  bg-blue-500 text-slate-50 py-0.5 px-1 rounded-[0.25em] ">
                  {tag.name}
                </div>
              );
            })}
          </div>

          <h2 className="text-lg font-semibold text-slate-500">
            About project
          </h2>
          <p>{project?.description}</p>

          {/* seeller */}
          <div className="mt-12 flex flex-col  gap-5 ">
            <div className=" border-2  rounded-[5px] p-5 mt-5 ">
              <h3 className="font-semibold text-xl mb-6">Overall</h3>
              <div className="flex justify-between flex-wrap text-slate-800">
                <div className="w-[300px] flex flex-col gap-3 mb-5 mx-auto sm:mx-0">
                  <span className="font-semibold text-sm text-gray-500">
                    Created
                  </span>

                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {new Date(project?.created).toLocaleString("en-US", {
                        month: "long",
                      })}{" "}
                      {new Date(project?.created).getDate()},{" "}
                      {new Date(project?.created).toLocaleString("en-US", {
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {new Date(project?.created).toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>
                <div className="w-[300px] flex flex-col gap-2 mb-5 mx-auto sm:mx-0">
                  <span className="font-semibold text-sm text-gray-500">
                    Due time
                  </span>
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {" "}
                      {new Date(project?.deadline).toLocaleString("en-US", {
                        month: "long",
                      })}{" "}
                      {new Date(project?.deadline).getDate()},{" "}
                      {new Date(project?.deadline).toLocaleString("en-US", {
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="w-[300px] flex  gap-2 mb-5 mx-auto sm:mx-0">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-gray-500">
                      Project Leader
                    </span>
                    <span className="font-semibold">{`${project?.created_by?.first_name} ${project?.created_by?.last_name}`}</span>
                  </div>
                  <img
                    src={project?.owner?.profile?.photo || images.ProfileImage}
                    alt=""
                  />
                </div>
              </div>
              <hr className="h-[0px]  mb-5" />

              <h4 className=" mb-3 text-xl font-semibold">Members</h4>

              <div className="py-2 md:py-10 ">
                {project?.assignees.length > 0 ? (
                  project?.assignees.map((member) => (
                    <div className="border-b p-2 flex flex-col items-center   md:flex-row md:justify-evenly text-slate-800 mb-10 md:mb-5">
                      <img
                        src={member?.profile?.photo || images.ProfileImage}
                        alt=""
                      />
                      <div className="flex flex-1  flex-col items-center">
                        <span className=" flex items-center ml-2 ">
                          {member.first_name}
                        </span>
                        <span className=" flex items-center ml-2">
                          {member.last_name}
                        </span>
                      </div>
                      <span className="flex-1 flex items-center">
                        {member.role}
                      </span>
                      <Link to={`/profile/${member?.id}`}>
                        <div className="flex-1 flex items-center">
                          <button
                            className=" py-1.5 px-3 rounded mt-1"
                            variant={"ghost"}
                          >
                            <IoEye className="text-blue-400 w-6 h-auto" />
                          </button>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center gap-x-2">
                    <FaPeopleGroup className="w-16 h-auto" />
                    <span className="text-slate-600 font-semibold">
                      No members yet...
                    </span>
                  </div>
                )}
              </div>
              <div className="pb-10">
                <span className="text-xl font-semibold text-slate-700">
                  Files
                </span>
                <div className="mt-5">
                  {project?.attachments?.map((attachment) => {
                    return (
                      <div className="  flex justify-between items-center">
                        <div className="flex items-center gap-x-1">
                          <FaFileArrowUp className="w-6 h-auto" />
                          <span>{attachment?.filename_to_display}</span>
                        </div>

                        <a href={attachment?.url} download>
                          <IoMdDownload className="w-6 h-auto hover:text-blue-300 transition-all" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
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
                  {project?.id}
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
                  {project?.status}
                </th>
              </tr>
              <tr>
                <th
                  scope="col"
                  className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                >
                  Visibility
                </th>
                <th scope="col" className="w-1/2  border-b pb-3">
                  <div
                    className={`inline-block  rounded-full text-xs font-semibold uppercase mr-2 ${
                      project?.visibility === "public"
                        ? " bg-emerald-500 px-2 py-1 text-white"
                        : "bg-pink-600 px-2 py-1 text-white"
                    } `}
                  >
                    {project?.visibility}
                  </div>
                </th>
              </tr>
              <tr>
                <th
                  scope="col"
                  className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                >
                  Contributors
                </th>
                <th scope="col" className="w-1/2  border-b pb-3 ">
                  <span
                    className={
                      "inline-block  text-slate-800  rounded-full lg:text-sm font-semibold uppercase mr-2 "
                    }
                  >
                    {project?.assignees?.length}
                  </span>
                </th>
              </tr>
              <tr>
                <th
                  scope="col"
                  className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                >
                  Attachments
                </th>
                <th scope="col" className="w-1/2  border-b pb-3">
                  <div className="flex flex-col">
                    <span className="inline-block  text-slate-800  rounded-full lg:text-sm font-semibold uppercase mr-2 ">
                      {project?.attachments?.length}
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

export default ProjectDetails;
