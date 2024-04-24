import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getUsers } from "../services/userApi";
import { images } from "../constants";
import UserCard from "../components/UserCard";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

const Users: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginationLimit, setPaginationLimit] = useState(5);
  const userString = localStorage.getItem("user");
  const { role } = JSON.parse(userString as string);

  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => {
      return getUsers({
        limit: paginationLimit,
        name: searchKeyword,
        offset: currentPage,
      });
    },
    queryKey: ["users", currentPage],
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
    setCurrentPage(1);
    refetch();
  };
  console.log(users?.results?.map((user) => user?.first_name));
  return (
    <div className=" flex flex-col pb-20 px-10  h-screen w-full  flex-1  custom-scrollbar overflow-scroll  ">
      <div className="px-10 flex flex-col gap-4  justify-between  lg:pr-6 2xl:pr-12  ">
        <div className="flex flex-col sm:flex-row justify-between gap-10 w-full mt-6   ">
          <h1 className="h1-bold text-center sm:text-left sm:h2-bold ">
            Users
          </h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              onChange={searchKeywordHandler}
              className="placeholder:px-2 p-2 w-full rounded-lg mx-auto md:mx-0"
              placeholder="search by name..."
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
      <div
        className={`flex flex-col gap-5 sm:flex-row py-9 px-4 md:px-16 flex-wrap ${users?.results?.length < 3 ? "justify-start" : "justify-between "}`}
      >
        {users &&
          users?.results.map((user) => {
            return <UserCard user={user} />;
          })}
      </div>

      {!isLoading && (
        <Pagination
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
          totalPageCount={parseInt(users?.count / paginationLimit)}
        />
      )}
    </div>
  );
};

export default Users;
