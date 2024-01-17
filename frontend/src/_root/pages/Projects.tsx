
import { Button } from "@/components/ui/button";
import { getProjects } from "@/features/project-api/project-api"
import { LuGitCompare } from "react-icons/lu";

import { useQuery } from "react-query"
import { Link, NavLink } from "react-router-dom";

const Projects = () => {


  const {data:projects,isError,isLoading,isFetching}= useQuery("users",()=>getProjects())
  return (
    <main className="w-full h-full py-5 px-16 mx-auto my-12 custom-scrollbar overflow-scroll pb-20">
         <div  className="flex flex-col gap-6 md:gap-0 ">
<div className="flex justify-center gap-2 md:justify-start">
<LuGitCompare className="w-10 h-10"/>
     <h2 className='h2-bold md:h3-bold'>Projects</h2>
</div>
<div className="flex justify-center md:justify-end">
<Button className="px-40 shad-button_primary md:px-2 lg:px-2" variant="ghost">
  <Link to="/create-project">Add Project</Link>
</Button>
</div>
     </div>

      {projects&&projects?.results.map((project)=>{
        return(
          <div>
            {project.title}
          </div>
        )
      })
      }</main>
  )
}

export default Projects