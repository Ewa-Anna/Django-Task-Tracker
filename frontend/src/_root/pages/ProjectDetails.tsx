import { getProject } from "@/features/project-api/project-api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaScroll } from "react-icons/fa";
import { formatTimestamp, timeUntilDeadline } from "@/lib/utils";
import { CiClock1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdOutlinePending } from "react-icons/md";
import { LuAlarmClock } from "react-icons/lu";
import { MdOutlinePublic } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
import { GoClockFill } from "react-icons/go";
import { MdPublic } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { Accessibility } from "lucide-react";

const ProjectDetails = () => {
  const { projectId } = useParams();

  const {
    data: project,
    isError,
    isLoading,
    isFetching,
  } = useQuery("projectDetails", () => getProject(projectId), {
    refetchOnWindowFocus: false,
  });

  return (
    <div className=" h-auto w-full gap-12 flex justify-center    overflow-scroll  custom-scrollbar  ">
      <div className=" flex gap-12  h-auto  flex-col-reverse w-[90%] md:w-[77%] py-10 xl:flex-row">
        {/* LEFT */}
        <div className="flex flex-col  gap-5 flex-grow  flex-1 h-auto ">
          <h1 className="text-2xl">{project?.title}</h1>

          <div className="flex items-center  gap-2 flex-wrap">
            {project?.tags.map((tag) => {
              return (
                <div className="border-[0.5px] border-dark-1 bg-blue-500 text-slate-50 py-0.5 px-1 rounded-[0.25em] ">
                  {tag.name}
                </div>
              );
            })}
          </div>

          <h2>About Project</h2>
          <p>{project?.description}</p>

          {/* seeller */}
          <div className="mt-12 flex flex-col gap-5">
            <div className=" border-2 border-dark-4 rounded-[5px] p-5 mt-5 ">
              <h3 className="font-semibold text-xl mb-6">Overall</h3>
              <div className="flex justify-between flex-wrap text-slate-300">
                <div className="w-[300px] flex flex-col gap-3 mb-5">
                  <span className="font-normal">Total members</span>
                  <span className="desc">{project?.assignees.length}</span>
                </div>
                <div className="w-[300px] flex flex-col gap-2 mb-5">
                  <span className="font-normal">Created At</span>
                  <span className="desc">
                    {formatTimestamp(project?.created)}
                  </span>
                </div>
                <div className="w-[300px] flex flex-col gap-2 mb-5">
                  <span className="font-normal">Avg response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="w-[300px] flex flex-col gap-2 mb-5">
                  <span className="font-normal">Created By</span>
                  <span className="desc">{`${project?.created_by?.first_name} ${project?.created_by?.last_name}`}</span>
                </div>
                <div className="w-[300px] flex flex-col gap-2 mb-5">
                  <span className="font-normal">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr className="h-[0px] border-dark-4 mb-5" />

              <h4 className="mb-10 text-xl font-semibold">Members</h4>
              {project?.assignees.map((member) => {
                return (
                  <div className=" flex justify-evenly text-slate-300">
                    <span className="flex-1 flex items-center">
                      {member.first_name}
                    </span>
                    <span className="flex-1 flex items-center">
                      {member.last_name}
                    </span>
                    <span className="flex-1 flex items-center">
                      {member.role}
                    </span>
                    <Link to={`/profile/${member?.id}`}>
                      <div className="flex-1 flex items-center">
                        <Button
                          className="hover:bg-violet-600 mt-1 "
                          variant={"ghost"}
                        >
                          View
                        </Button>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* LEFT */}

        {/* RIGHT */}
        <div className="hidden xl:flex flex-col gap-5 h-auto max-h-[430px]    border-2 w-1/3 border-dark-4 p-5 sticky top-4 mt-32 rounded-[0.35em] ">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Project Details</h3>
          </div>
          <div className="flex flex-col gap-2">
            <div className=" grid grid-cols-40-60 gird-rows-3 font-normal text-slate-400 mb-1 ">
              <div className="p-2">
                <span className="text-sm">Visibility</span>
              </div>
              <div className=" flex items-center gap-2 border-2 p-2 border-dark-4 rounded-[10px] bg-green-900 text-slate-200">
                {project?.visibility === "public" ? (
                  <MdPublic />
                ) : (
                  <RiGitRepositoryPrivateFill />
                )}
                <span>{project?.visibility}</span>
              </div>
            </div>
            <div className="grid grid-cols-40-60 gird-rows-3 font-normal text-slate-400 mb-1">
              <div className="p-2">
                <span className="text-sm">Status</span>
              </div>
              <div className="flex items-center gap-2 border-2 p-2 border-dark-4 rounded-[10px] bg-green-900 text-slate-200">
                {project?.status === "pending" ? (
                  <MdOutlinePending />
                ) : (
                  <MdOutlinePending />
                )}
                <span>{project?.status}</span>
              </div>
            </div>
            <div className="grid grid-cols-40-60 gird-rows-3 font-normal text-slate-400 mb-1">
              <div className="p-2">
                <span className="text-sm">Due time</span>
              </div>
              <div className="flex items-center gap-2 border-2 p-2 border-dark-4 rounded-[10px] bg-green-900 text-slate-200">
                <GoClockFill />
                <span>{timeUntilDeadline(project?.deadline)}</span>
              </div>
            </div>
          </div>

          <h2>Project Leader</h2>
          <div className="flex items-center gap-5">
            <img
              className="w-[100px] h-[100px] rounded-[15%] object-cover"
              src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="userAvatar"
            />
            <div className="flex flex-col h-full ">
              <span>{`${project?.owner?.first_name} ${project?.owner?.last_name}`}</span>

              <div className="flex items-center gap-1 justify-center">
                <span className="text-center ">{project?.owner?.role}</span>
              </div>
              <Link to={`/profile/${project?.owner?.id}`}>
                <Button
                  className="hover:bg-violet-600 mt-1  w-full"
                  variant={"ghost"}
                >
                  View
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* RIGHT */}
      </div>
    </div>
  );
};

export default ProjectDetails;
