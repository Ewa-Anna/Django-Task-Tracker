import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../services/projectsApi";
import ProjectCard from "../components/ProjectCard";
import ProjectsWrapper from "../components/ProjectsWrapper";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import { useAccountStore } from "../store";

const Projects: React.FC = () => {
  const userAccount = useAccountStore((state) => state.account);

  console.log(userAccount);
  const token = localStorage.getItem("token");
  console.log(token);

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const userString = localStorage.getItem("user");
  const { role } = JSON.parse(userString as string);

  const {
    data: projects,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => {
      return getAllProjects({ title: searchKeyword, offset: currentPage });
    },
    queryKey: ["projects"],
    refetchOnWindowFocus: false,
  });

  console.log(projects?.next);
  const searchKeywordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  return (
    <div className=" flex flex-col pb-20 px-12  h-screen w-full  flex-1  custom-scrollbar overflow-scroll  ">
      <div className="flex flex-col gap-4  justify-between  lg:pr-6 2xl:pr-12  ">
        <h1 className="h1-bold text-center sm:text-left sm:h2-bold mt-4">
          Projects
        </h1>

        <div className="flex flex-col sm:flex-row justify-between gap-10 w-full  mb-6 ">
          {role === "admin" && (
            <Link
              to={"/project/new"}
              className="border-2 px-2 py-2.5 text-center bg-purple-500 text-white font-semibold rounded-lg hover:opacity-85"
            >
              + Add new project
            </Link>
          )}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              onChange={searchKeywordHandler}
              className="placeholder:px-2 p-2 w-full rounded-lg mx-auto md:mx-0"
              placeholder="project title..."
              type="text"
              value={searchKeyword}
            />
            <button
              onClick={submitSearchKeywordHandler}
              className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
              type="submit"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
      <ProjectsWrapper
        projects={projects}
        isLoading={isLoading}
        isError={isError}
      />
      <button>Next</button>
    </div>
  );
};

export default Projects;
