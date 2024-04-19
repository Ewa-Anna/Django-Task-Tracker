import { useQuery } from "@tanstack/react-query";
import ProjectCard from "./ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { getAllProjects } from "../services/projectsApi";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import ErrorMessage from "./ErrorMessage";

const ProjectsWrapper: React.FC = ({ projects, isLoading, isError }) => {
  return (
    <section className="flex flex-col    ">
      <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {isLoading ? (
          [...Array(6)].map((item, index) => {
            return (
              <ProjectCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            );
          })
        ) : isError ? (
          <ErrorMessage message="Something went wrong..." />
        ) : (
          projects?.results.map((project) => {
            return (
              <ProjectCard
                key={project.id}
                project={project}
                className="w-full md:w-[calc(50%-20px)] xl:w-[calc(33.33%-21px)] 2xl:w-[calc(24.33%-21px)] "
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default ProjectsWrapper;
