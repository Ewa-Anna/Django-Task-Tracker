import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../services/projectsApi";
import ProjectCard from "../components/ProjectCard";
import ProjectsWrapper from "../components/ProjectsWrapper";
import { getAllTickets } from "../services/ticketsApi";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { BiErrorAlt } from "react-icons/bi";
import { MdOutlineWidgets } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useAccountStore } from "../store";

const Tickets: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [paginationLimit, setPaginationLimit] = useState(10);

  const userAccount = useAccountStore((state) => state.account);

  const {
    data: tickets,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => {
      return getAllTickets({
        limit: paginationLimit,
        title: searchKeyword,
        offset: currentPage,
      });
    },
    queryKey: ["tickets", currentPage],
    refetchOnWindowFocus: false,
  });

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
    <div className="  common-container">
      <div className="w-full mx-auto  px-10   ">
        <div className="flex flex-col gap-4  justify-between  lg:pr-6 2xl:pr-12  ">
          <h1 className="h1-bold text-center sm:text-left sm:h2-bold mt-4">
            Tickets
          </h1>

          <div className="flex flex-col sm:flex-row justify-between gap-10 w-full  mb-6 ">
            {userAccount && userAccount.role === "admin" && (
              <Link
                to={"/ticket/new"}
                className="border-2 px-2 py-2.5 text-center bg-purple-500 text-white font-semibold rounded-lg hover:opacity-85"
              >
                + Add new ticket
              </Link>
            )}
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
                className="placeholder:px-2 p-2 w-full rounded-lg mx-auto md:mx-0"
                placeholder="Ticket title..."
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

        <div className="px-4  -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Created
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {isLoading || isFetching ? (
                  <tr>
                    <td className="text-center py-10 w-full" colSpan={5}>
                      Loading...
                    </td>
                  </tr>
                ) : tickets?.results?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 w-full">
                      No posts found
                    </td>
                  </tr>
                ) : (
                  tickets?.results?.map((ticket) => {
                    return (
                      <tr>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {ticket?.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex flex-col gap-x-1.5 gap-y-1.5 flex-wrap">
                            <p className="text-gray-900 whitespace-no-wrap text-xs">
                              {ticket?.status}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          {ticket?.type === "question" && (
                            <div className="flex items-center gap-x-1 ">
                              <span className="  rounded-full text-white text-xs font-semibold uppercase bg-zinc-400 px-2 py-1 ">
                                {ticket?.type}
                              </span>
                            </div>
                          )}
                          {ticket?.type === "bug" && (
                            <div className="flex items-center gap-x-1  ">
                              <span className="  rounded-full text-white text-xs font-semibold uppercase bg-rose-500 px-6 py-1 ">
                                {ticket?.type}
                              </span>
                            </div>
                          )}
                          {ticket?.type === "feature" && (
                            <div className="flex items-center gap-x-1 ">
                              <span className="  rounded-full text-white text-xs font-semibold uppercase bg-purple-400 px-3 py-1 ">
                                {ticket?.type}
                              </span>
                            </div>
                          )}
                          {ticket?.type === "improvement" && (
                            <div className="flex items-center gap-x-1 ">
                              <span className="  rounded-full text-white text-xs font-semibold uppercase bg-pink-500 px-2 py-1 ">
                                {ticket?.type}
                              </span>
                            </div>
                          )}
                          {ticket?.type === "other" && (
                            <div className="flex items-center gap-x-1 ">
                              <span className="  rounded-full text-white text-xs font-semibold uppercase bg-blue-400 px-4 py-1 ">
                                {ticket?.type}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex gap-x-1.5 gap-y-1.5 flex-wrap">
                            {new Date(ticket?.created).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                          <Link
                            to={`/ticket/${ticket.id}`}
                            className="text-green-600 hover:text-green-900"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {!isLoading && (
              <Pagination
                onPageChange={(page) => setCurrentPage(page)}
                currentPage={currentPage}
                totalPageCount={parseInt(tickets?.count / paginationLimit)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
