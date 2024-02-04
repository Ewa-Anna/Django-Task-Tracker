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
        <div className="flex flex-col   lg:flex-row ">
          <div className=" h-auto flex flex-1  flex-col gap-4  break-words ">
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

            <div className="grid grid-rows-1 gird-cols-40-60 items-center py-2 lg:grid-cols-40-60    ">
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
              <div className="flex flex-col gap-4 justify-evenly mt-14 lg:flex-row lg:mt-0 ">
              <div className="border-2 py-3  rounded-[10px] border-dark-3  flex flex-col items-center min-w-[90px] md:py-0  md:min-w-[40px] lg:min-w-[160px]">
                  <p>Visibility</p>
                  <p>{project?.visibility}</p>
                </div>
                <div className="border-2 py-3 rounded-[10px] border-dark-3  flex flex-col items-center min-w-[90px] md:py-0 md:text-sm md:min-w[0px] lg:min-w-[160px]">
                  <p>Created</p>
                  <p>{formatTimestamp(project?.created)}</p>
                </div>
                <div className="border-2 py-3  rounded-[10px] border-dark-3  flex flex-col items-center min-w-[90px] md:py-0 md:min-w-[40px] lg:min-w-[160px]">
                  <p>Deadline</p>
                  <p>{formatTimestamp(project?.deadline)}</p>
                </div>
             
              </div>
            </div>
            <div className="grid grid-rows-1 gird-cols-2 items-center py-2 gap-8 md:grid-cols-60-40 md:gap-6 lg:gap-10 xl:gap-14  ">
              <div className="order-2 text-base md:order-1 md:text-2xl lg:text-base xl:text-base font-bold overflow-hidden overflow-ellipsis ">
      <h3>Overview</h3>
      <p>        {project?.description}</p>
              </div>
              <div className="order-1 text-lg sm:text-xl md:order-1 md:text-2xl lg:text-3xl xl:text-4xl font-bold overflow-hidden overflow-ellipsis ">
             asdsa
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
