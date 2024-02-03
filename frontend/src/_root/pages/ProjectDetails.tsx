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
    <div className=" h-full w-full gap-12 flex flex-col   overflow-scroll py-10 px-6 md:px-7 md:py-20 lg:p-36 custom-scrollbar ">
      <div className="  h-auto flex flex-col gap-40   ">
        <div className="flex flex-col   lg:flex-row">
          <div className=" h-auto flex flex-1  flex-col gap-4 break-words ">
      
       <h1 className="text-2xl break-words w-auto ">
            {/* {project?.title} */}
            asdasfgdgdfgdfgdfgdfg
            </h1>
      
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
    
        </div>
        <div className="flex flex-col gap-5 h-full   lg:flex-row  ">
          <div className="w-100%  flex-col md:w-[100%] lg:w-[45%]   ">
            <div className="h-full px-2 flex flex-col gap-5  ">
              <h2 className="text-xl">Overall</h2>
              <span className="text-justify text-base">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi saepe nesciunt ut porro. Illo sit doloribus, enim fugit sed dolor dolorem neque? Non nemo, obcaecati eos nam natus inventore necessitatibus?
Laborum voluptatem magni eos modi corrupti itaque eius maiores vel dignissimos, maxime assumenda reprehenderit consequatur magnam illum libero. Est et beatae error molestias ex magni labore aliquam quae quis voluptatem.
Aliquid vitaptatibus quae deserunt! Ducimus pariatur, iste aut modi ut cumque placeat quam possimus, rem, excepturi eveniet tenetur!Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi saepe nesciunt ut porro. Illo sit doloribus, enim fugit sed dolor dolorem neque? Non nemo, obcaecati eos nam natus inventore necessitatibus?
Laborum voluptatem magni eos modi corrupti itaque eius maiores vel dignissimos, maxime assumenda reprehenderit consequatur magnam illum libero. Est et beatae error molestias ex magni labore aliquam quae quis voluptatem.
Aliquid vitaptatibus quae deserunt! Ducimus pariatur, iste aut modi ut cumque placeat quam possimus, rem, excepturi eveniet tenetur!Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi saepe nesciunt ut porro. Illo sit doloribus, enim fugit sed dolor dolorem neque? Non nemo, obcaecati eos nam natus inventore necessitatibus?
Laborum voluptatem magni eos modi corrupti itaque eius maiores vel dignissimos, maxime assumenda reprehenderit consequatur magnam illum libero. Est et beatae error molestias ex magni labore aliquam quae quis voluptatem.
Aliquid vitaptatibus quae deserunt! Ducimus pariatur, iste aut modi ut cumque placeat quam possimus, rem, excepturi eveniet tenetur!Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi saepe nesciunt ut porro. Illo sit doloribus, enim fugit sed dolor dolorem neque? Non nemo, obcaecati eos nam natus inventore necessitatibus?
Laborum voluptatem magni eos modi corrupti itaque eius maiores vel dignissimos, maxime assumenda reprehenderit consequatur magnam illum libero. Est et beatae error molestias ex magni labore aliquam quae quis voluptatem.
Aliquid vitaptatibus quae deserunt! Ducimus pariatur, iste aut modi ut cumque placeat quam possimus, rem, excepturi eveniet tenetur!Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi saepe nesciunt ut porro. Illo sit doloribus, enim fugit sed dolor dolorem neque? Non nemo, obcaecati eos nam natus inventore necessitatibus?
Laborum voluptatem magni eos modi corrupti itaque eius maiores vel dignissimos, maxime assumenda reprehenderit consequatur magnam illum libero. Est et beatae error molestias ex magni labore aliquam quae quis voluptatem.
Aliquid vitaptatibus quae deserunt! Ducimus pariatur, iste aut modi ut cumque placeat quam possimus, rem, excepturi eveniet tenetur!Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi saepe nesciunt ut porro. Illo sit doloribus, enim fugit sed dolor dolorem neque? Non nemo, obcaecati eos nam natus inventore necessitatibus?
Laborum voluptatem magni eos modi corrupti itaque eius maiores vel dignissimos, maxime assumenda reprehenderit consequatur magnam illum libero. Est et beatae error molestias ex magni labore aliquam quae quis voluptatem.
Aliquid vitaptatibus quae deserunt! Ducimus pariatur, iste aut modi ut cumque placeat quam possimus, rem, excepturi eveniet tenetur!
              </span>
            </div>
            <div>a</div>
          </div>
          <div className=" w-full h-auto flex-col md:flex  lg:flex-col px-6   lg:w-[55%] border-2  ">



         <div className="border-2 border-dark-4 flex flex-col bg-orange-600">
         <div className=" flex flex-col gap-3 px-2 ">
            <div className=" flex justify-center gap-2 w-full lg:justify-start ">
            <div className=" flex items-center">
              <MdOutlinePublic size={24}/>
            </div>
         <div >
         <h3>{project?.visibility.toUpperCase()}</h3>
          
         </div>
              </div>
              <div className=" flex justify-center gap-2 lg:justify-start">
            <div className=" flex items-center">
              <CiClock1 size={24}/>
            </div>
         <div >
         <h3>Created</h3>
                <span>{formatTimestamp(project?.created)}</span>
         </div>
              </div>
              <div className=" flex justify-center gap-2 lg:justify-start">
            <div className=" flex items-center">
              <LuAlarmClock size={24}/>
            </div>
         <div className="">
         <h3>Deadline</h3>
                <span>{formatTimestamp(project?.created)}</span>
         </div>
              </div>
            </div>
            <div className=" h-auto  py-3  ">
       
              <div className=" flex gap-2">
         
         <div >
         <h3>Leader</h3>
                <span>{"John Doe"}</span>
         </div>
              </div>
            </div>
         </div>
            


            <div className="flex-1  mt-5 flex flex-col gap-4 justify-center">
              <h4 className="text-basic font-semibold">Contributors</h4>
{project&&project.assignees.map((member)=>{
  return(
    <div className="flex items-center gap-2">
  
   <div>
   {member.email}
   </div>
    </div>
  )
})}
     </div>





          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default ProjectDetails;
