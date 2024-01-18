
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjects } from "@/features/project-api/project-api"
import { Badge } from "lucide-react";
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

     <div className="  grid grid-cols-1 gap-8 md:grid-cols-2 px-18 md:gap-4 lg:grid-cols-4 lg:gap-12 px-22">
        {projects &&
          projects.results.map((project) => {
            return (
              <Card key={project.id} className="flex flex-col justify-between  border-dark-4 ">
                <CardHeader className="flex-row gap-4 items-center justify-evenly flex flex-wrap-reverse">
          
             <div className="flex flex-col items-center gap-1">
          
             <Badge variant="secondary"> ROLE</Badge>
             </div>
               
                       <div>
                    <CardTitle>{project?.title}</CardTitle>
                    <CardTitle className="text-sm"></CardTitle>
                    {/* <CardDescription>{user.last_name}</CardDescription> */}
                  </div>
                </CardHeader>
                <CardContent>
                  <p></p>
                </CardContent>
                <CardFooter className="flex justify-evenly flex-wrap gap-2 ">
                <Badge variant="secondary"> ROLE</Badge>
                  <Button className="hover:bg-purple-700" variant="ghost">
                    View more
                  </Button>
                 
             
                </CardFooter>
              </Card>
            );
          })}
      </div></main>
  )
}

export default Projects