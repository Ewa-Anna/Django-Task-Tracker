
import { getProjects } from "@/features/project-api/project-api"
import { useQuery } from "react-query"

const Projects = () => {


  const {data:projects,isError,isLoading,isFetching}= useQuery("users",()=>getProjects())
  return (
    <div>{
      projects&&projects.map((project)=>{
        return(
          <div>
            {project.title}
          </div>
        )
      })
      }</div>
  )
}

export default Projects