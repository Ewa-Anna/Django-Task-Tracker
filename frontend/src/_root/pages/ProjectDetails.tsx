import { getProject } from "@/features/project-api/project-api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { FaScroll } from "react-icons/fa";
import { formatTimestamp } from "@/lib/utils";
import { CiClock1 } from "react-icons/ci";
import { LuAlarmClock } from "react-icons/lu";
import { MdOutlinePublic } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
import { MdPublic } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";

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
    <div className=" h-full w-full gap-12 flex flex-col    overflow-scroll py-10 px-6 md:px-7 md:py-20 lg:p-36 custom-scrollbar ">
      <div className="  h-auto flex flex-col gap-40   ">
        <div className="flex flex-col   lg:flex-row  ">
          <div className=" h-auto flex flex-1  flex-col gap-4  break-words  ">
            <div className="grid grid-rows-1 gird-cols-2 items-center py-2 border-b border-gray-200 md:grid-cols-60-40 ">
              <h1 className=" order-2 text-xl md:order-1 md:text-2xl lg:text-3xl xl:text-3xl font-bold overflow-hidden overflow-ellipsis ">
                {project?.title}
              </h1>
              <div className="order-1 flex justify-end gap-6">
                <button className=" justify-self-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Edit
                </button>
                <button className=" order-1 justify-self-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </div>
            </div>

            <div className="grid grid-rows-1 gird-cols-40-60 items-center py-2 lg:grid-cols-40-60  mb-10     ">
              <div className="flex gap-2 flex-wrap text-sm ">
                <div className="w-auto flex items-center bg-blue-400 rounded-[5px]">
                  <span className="px-2">React</span>
                </div>
                <div className="w-auto flex items-center bg-blue-400 rounded-[5px]">
                  <span className="px-2">Tailwind</span>
                </div>
                <div className="w-auto flex items-center bg-blue-400 rounded-[5px]">
                  <span className="px-2">Redux</span>
                </div>
                <div className="w-auto flex items-center bg-blue-400 rounded-[5px]">
                  <span className="px-2">Bootstrap</span>
                </div>
                <div className="w-auto flex items-center bg-blue-400 rounded-[5px]">
                  <span className="px-2">Django</span>
                </div>
              </div>
            </div>

            <div className=" mt-8  grid grid-cols-1  items-center py-2  border-gray-200 md:grid-cols-60-40 lg:grid-cols-60-40 xl:grid-cols-60-40">
              {/* column left */}

              <div className=" pr-3  h-full order-2 overflow-hidden overflow-ellipsis   ">
                <h2 className="mb-8 text-xl">Overview</h2>
                <p>{project?.description}</p>
              </div>

              {/* column right */}

              <div className=" h-full flex flex-col  order-1 md:order-2  ">
                <div className="flex flex-col gap-1">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 text-sm">
                    <div className="flex flex-col items-center gap-2  py-4 border-2 border-dark-2 rounded-[12px]">
                      <MdPublic size={20} />

                      <p className="text-base text-slate-300 font-bold">{project?.visibility}</p>
                      <p className="text-xs text-slate-400 font-semibold">Visibility</p>
                    </div>
                    <div className=" flex flex-col items-center gap-2 py-4 border-2 border-dark-2 rounded-[12px]">
                      <MdPublic size={20}/>
                      <p className="text-base text-slate-300  font-bold">{project?.status}</p>
                      <p className="text-xs text-slate-400 font-semibold">Status</p>
                    </div>
                    <div className=" flex flex-col items-center gap-2 py-4 border-2 border-dark-2 rounded-[12px]">
                      <MdPublic size={20} />
                      <p className="text-base text-slate-300  font-bold">{formatTimestamp(project?.created)}</p>
                      <p className="text-xs text-slate-400 font-semibold">Created</p>
                    </div>
                    <div className=" flex text-slate-300 flex-col items-center gap-2 py-4 border-2 border-dark-2 rounded-[10px]">
                      <MdPublic size={20}  />
                      <p className="text-base text-slate-300  font-bold">{formatTimestamp(project?.deadline)}</p>
                      <p className="text-xs text-slate-400 font-semibold">Deadline</p>
                    </div>
                  </div>

                  <div className=" flex flex-col gap-5 border-2 border-dark-2 p-4 rounded-[10px]">
                    <h3 className="text-xl">Leader</h3>
                    <div className="flex ">
                      <img
                        className="hidden lg:flex"
                        src="/assets/icons/profile-placeholder.svg"
                        alt="avatar"
                        height={44}
                        width={44}
                      />
                      <div className="flex flex-col pl-3 text-slate-300">
                        <div className="flex flex-col gap-2 lg:flex-row flex-wrap font-semibold ">
                          <p>{project?.owner?.first_name}</p>
                          <p>{project?.owner?.last_name}</p>
                        </div>
                        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap ">
                          <p className="text-xs">{project?.owner?.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 p-4 text-slate-300">
                  <h3 className="text-xl">Members</h3>
{project?.assignees.map((member)=>{
  return(
    <div className="flex gap-4 items-center py-2">
      <img src="/assets/icons/profile-placeholder.svg" alt="avatar" height={40} width={40} />
      <p className="text-sm">{member?.email}</p>
    </div>
  )
})}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
