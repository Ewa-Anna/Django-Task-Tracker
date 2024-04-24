import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../services/projectsApi";
import ProjectCard from "../components/ProjectCard";
import { IoClose } from "react-icons/io5";
import ProjectsWrapper from "../components/ProjectsWrapper";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import { useAccountStore } from "../store";

const Archive: React.FC = () => {
  const userAccount = useAccountStore((state) => state.account);

  console.log(userAccount);
  const token = localStorage.getItem("token");
  console.log(token);

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginationLimit, setPaginationLimit] = useState(12);

  console.log("paginationLimit");
  console.log(paginationLimit);
  const userString = localStorage.getItem("user");
  const { role } = JSON.parse(userString as string);

  const {
    data: projects,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => {
      return getAllProjects({
        limit: paginationLimit,
        title: searchKeyword,
        offset: currentPage,
      });
    },
    queryKey: ["projects", currentPage, paginationLimit],
    refetchOnWindowFocus: false,
  });

  console.log(projects?.count);
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
    setCurrentPage(0);
    refetch();
  };

  const resetSearchFilterHandler = (): void => {
    setSearchKeyword("");
    setCurrentPage(1);
  };

  return (
    <div className=" flex flex-col pb-20 px-12  h-screen w-full  flex-1  custom-scrollbar overflow-scroll  ">
      <div className="flex flex-col gap-4  justify-between  lg:pr-6 2xl:pr-12  ">
        <h1 className="h1-bold text-center sm:text-left sm:h2-bold mt-4">
          Archive
        </h1>

        <div className="flex flex-col sm:flex-row justify-end gap-10 w-full  mb-6 ">
          <div className="flex flex-col sm:flex-row gap-2 relative">
            <button
              disabled={searchKeyword.length < 1}
              onClick={resetSearchFilterHandler}
              className="absolute top-2 right-[27%] "
            >
              <IoClose
                className="text-slate-300 cursor-pointer 
            rounded-full hover:bg-slate-100 hover:text-slate-500  w-7 h-auto transition-all duration-100 "
              />
            </button>
            <input
              onChange={searchKeywordHandler}
              className="placeholder:px-2 p-2 w-full rounded-lg mx-auto md:mx-0 "
              placeholder="project title..."
              type="text"
              value={searchKeyword}
            />
            <button
              disabled={searchKeyword.length < 1}
              onClick={submitSearchKeywordHandler}
              className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 
              rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 
              focus:ring-offset-2 focus:ring-offset-purple-200 disabled:opacity-70"
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

      {!isLoading && (
        <Pagination
          paginationLimit={paginationLimit}
          setPaginationLimit={setPaginationLimit}
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
          totalPageCount={parseInt(projects?.count / paginationLimit)}
        />
      )}
    </div>
  );
};

export default Archive;
