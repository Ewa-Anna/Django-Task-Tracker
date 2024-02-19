import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjects } from "@/features/project-api/project-api";
import { cn, formatTimestamp } from "@/lib/utils";

import { LuGitCompare, LuInspect } from "react-icons/lu";

import { MdPublic } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";

import { useQuery } from "react-query";
import { Link, NavLink, useLocation } from "react-router-dom";

const Projects = () => {
  const {
    data: projects,
    isError,
    isLoading,
    isFetching,
  } = useQuery("users", () => getProjects());

  const location = useLocation();
  const currentLocation = location.pathname;

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "visibility",
      header: "visibility",
    },
    {
      accessorKey: "Leader",
      cell: ({ row }) => {
        const project = row?.original;

        return <div className="flex flex-col">
          <span className="text-xs">{project.owner?.first_name}</span>
          <span>{project.owner?.first_name}</span>
        </div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "View",
      cell: ({ row }) => {
        const project = row?.original;
        return (
          <Link
            className="hover:text-violet-400 transition-all cursor-pointer"
            to={`${currentLocation}/project/${project.id}`}
          >
            <LuInspect size={21} />
          </Link>
        );
      },
    },
  ];

  return (
    <main className="w-full h-full py-5 px-16 mx-auto custom-scrollbar overflow-scroll pb-20  ">
      <div className="flex flex-col gap-6 md:gap-0 ">
        <div className="flex justify-center gap-2 md:justify-start">
          <LuGitCompare className="w-10 h-10" />
          <h2 className="h2-bold md:h3-bold">Projects</h2>
        </div>
        <div className="flex justify-center md:justify-end ">
          <Button
            className="px-40 shad-button_primary md:px-2 lg:px-2"
            variant="ghost"
          >
            <Link to="/create-project">Add Project</Link>
          </Button>
        </div>
      </div>

      {/* TABLE */}

      {projects && <DataTable className="mt-4" columns={columns} data={projects?.results} />}

      <div className=" grid grid-cols-1 gap-8 md:grid-cols-2 px-18 md:gap-4 lg:grid-cols-2 lg:gap-6 px-22 xl:hidden">
        {projects &&
          projects.results.map((project) => {
            return (
              <Card key={project.id} className=" flex flex-col  border-dark-4">
                <CardHeader className="break-words">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  {/* <img src="/assets/avatars/person1.jpg" alt="background" className="w-20 h-20 rounded-[50%] object-cover" /> */}
                </CardHeader>
                {/* <CardContent className="break-words border-b"></CardContent> */}
                <CardFooter className="flex justify-evenly flex-wrap gap-2  ">
                  <div className="flex items-center gap-1 font-semibold">
                    {project?.visibility === "public" ? (
                      <MdPublic />
                    ) : (
                      <RiGitRepositoryPrivateLine />
                    )}
                    {project?.visibility}
                  </div>
                  <div className="flex items-center gap-1">
                    <MdAccessTime />
                    {formatTimestamp(project.created)}
                  </div>
                  <Button className="shad-button_primary" variant="ghost">
                    <Link to={`${currentLocation}/project/${project.id}`}>
                      view
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </div>

      {/* TABLE */}
    </main>
  );
};

export default Projects;
