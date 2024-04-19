import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUserById } from "../services/userApi";
import { useParams } from "react-router-dom";
import { images } from "../constants";

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useQuery({
    queryFn: () => {
      return getUserById({ id });
    },
    queryKey: ["user", id],
  });
  console.log(user);
  return (
    <div className=" flex flex-col  h-screen w-full  flex-1  custom-scrollbar overflow-scroll  p-14   ">
      <div className=" px-14 py-8 flex flex-col sm:flex-row justify-center gap-5 sm:justify-between ">
        <div>
          <h1 className="h2-bold">User profile</h1>
        </div>
        <button>Edit</button>
      </div>
      <div className="flex flex-col xl:flex-row mt-10 gap-6 xl:px-20  ">
        {/* left */}
        <div
          className="mx-auto flex p-8 xs:mb-2    pb-4 rounded xl:flex flex-col gap-5  sm:shadow-md
                h-fit w-[100%] md:w-[90%] min-h-[430px]  xl:min-w-[20%] xl:w-fit    xl:p-5 xl:sticky xl:top-8 border-2 items-center  "
        >
          <img
            src={user?.profile?.photo || images.ProfileImage}
            alt="avatar"
            className="w-48 h-auto"
          />
          <div className="flex gap-x-1 font-semibold text-xl text-slate-800">
            <span>{user?.first_name}</span>
            <span>{user?.last_name}</span>
          </div>
          <span
            className={`mt-10 font-bold text-xl border-2 py-2 px-4 rounded-xl uppercase  ${
              user?.role === "guest"
                ? "bg-blue-400 text-slate-200"
                : user?.role === "admin"
                ? "bg-violet-400 text-slate-100"
                : "bg-transparent"
            }`}
          >
            {user?.role}
          </span>
        </div>

        <div className=" flex gap-12  h-auto  flex-col-reverse w-[100%] md:w-[90%]  xl:flex-row mx-auto  sm:shadow-sm">
          <div className="flex flex-col  gap-5 flex-grow px-2 xl:px-14 py-8 flex-1 h-auto border-2  ">
            <h2>Introduction</h2>

            <div
              className=" flex  xs:mb-2  w-full  pb-4 rounded xl:flex  gap-5 
                h-fit  xl:min-w-[100%] xl:w-fit    xl:p-5    "
            >
              <table className=" table-auto w-full  mt-2 rounded   border-separate border-spacing-y-10 ">
                <tbody className="">
                  <tr className="">
                    <th
                      scope="col"
                      className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                    >
                      First name
                    </th>
                    <th scope="col" className="w-3/4 border-b pb-3">
                      {user?.first_name}
                    </th>
                  </tr>

                  <tr>
                    <th
                      scope="col"
                      className="text-base lg:text-xs text-slate-600 font-semibold w-1/4 border-b pb-3"
                    >
                      Last name
                    </th>
                    <th scope="col" className="w-1/2  border-b pb-3">
                      {user?.last_name}
                    </th>
                  </tr>
                  <tr>
                    <th
                      scope="col"
                      className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold "
                    >
                      <div
                        className={
                          "inline-block  rounded-full text-base lg:text-xs text-slate-800 font-bold uppercase mr-2  "
                        }
                      >
                        {user?.email}
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th
                      scope="col"
                      className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                    >
                      Gedner
                    </th>
                    <th scope="col" className="w-1/2  border-b pb-3 ">
                      <span
                        className={
                          "inline-block  text-slate-800  rounded-full lg:text-sm font-semibold uppercase mr-2 "
                        }
                      >
                        Male
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      scope="col"
                      className="w-1/4 border-b pb-3 text-base lg:text-xs text-slate-600 font-semibold"
                    >
                      Joined
                    </th>
                    <th scope="col" className="w-1/2  border-b pb-3">
                      <div className="flex flex-col">
                        <div className="inline-block  text-slate-800  rounded-full lg:text-sm font-semibold uppercase mr-2 ">
                          <span>
                            {" "}
                            {new Date(user?.profile?.created).toLocaleString(
                              "en-US",
                              {
                                month: "long",
                              }
                            )}{" "}
                            {new Date(user?.profile?.created).getDate()},{" "}
                            {new Date(user?.profile?.created).toLocaleString(
                              "en-US",
                              {
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-5">
              <h2>bio</h2>
              <span>{user?.profile?.bio}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
