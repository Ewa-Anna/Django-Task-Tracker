import React, { useState, useRef } from "react";
import { MdCallMissedOutgoing } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import DonutChart from "@/components/ui/shared/DonutChart";
import { MdOutlineAssignmentLate } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import { FaBug } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { CiRead } from "react-icons/ci";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [sort, setSort] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  const resort = (type) => {
    setSort(type);
    setIsOpen(false);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className=" w-full px-14 pt-4 mt-12 h-full overflow-scroll custom-scrollbar ">
      <div className="w-full h-auto grid grid-cols-60-40  ">
        <div className="flex flex-col border-r border-dark-3 pr-12  ">
          <h2 className="text-2xl mb-6">Dashboard</h2>

          <div className=" flex flex-col gap-5 ">
            <div className=" flex justify-between gap-5 ">
              <div className="flex-1 p-4  rounded-[12px] bg-orange-800">
                <div className="flex  justify-between">
                  <div className="flex-grow ">
                    <div className="flex flex-col mb-2">
                      <h3 className="text-xl">Total Tickets</h3>
                    </div>
                    <p className="text-2xl font-semibold">33</p>
                  </div>
                  <div className="flex-grow  flex items-center justify-center">
                    <FaChartBar size={62} color="#ea580c" />
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4  rounded-[12px]  bg-green-800">
                <div className="flex justify-between ">
                  <div className="flex-grow">
                    <div className="flex flex-col">
                      <div className="mb-2">
                        <h3 className="text-xl">Open Tickets</h3>
                      </div>
                      <p className="text-2xl font-semibold">33</p>
                    </div>
                  </div>
                  <div className="flex-grow  flex items-center justify-center">
                    <MdCallMissedOutgoing size={62} color="#4ade80" />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-between gap-5">
              <div className="flex-1 p-4  rounded-[12px]  bg-blue-900">
                <div className="flex  justify-between">
                  <div className="flex-grow">
                    <div className="flex flex-col">
                      <div>
                        <h3 className="text-xl mb-2">Pending Tickets</h3>
                      </div>
                      <p className="text-2xl font-semibold">42</p>
                    </div>
                  </div>
                  <div className="flex-grow  flex items-center justify-center">
                    <MdOutlinePending size={62} color="#60a5fa" />
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4  rounded-[12px]  bg-yellow-800">
                <div className="flex justify-between">
                  <div className="flex-grow">
                    <div className="flex flex-col">
                      <div>
                        <h3 className="text-xl mb-2">Unassigned Tickets</h3>
                      </div>
                      <p className="text-2xl font-semibold">11</p>
                    </div>
                  </div>
                  <div className="flex-grow flex items-center justify-center">
                    <MdOutlineAssignmentLate size={62} color="#ca8a04" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOm */}
          <div className="flex justify-between mb-7 mt-14  ">
            <div className="flex gap-8 items-center">
              <h3 className="text-3xl font-semibold">Last Reports</h3>
              <span className="text-sm">View More</span>
            </div>

            <div
              className="flex  items-center gap-2 relative"
              tabIndex={0}
              ref={containerRef}
              onBlur={() => {
                setIsOpen(false);
              }}
              onClick={() => setIsOpen((state) => !state)}
            >
              <span className="mr-3 text-sm">sortBy</span>
              <span className="text-sm text-slate-100 font-semibold border-2 w-[120px] py-1  flex justify-center  border-none bg-dark-3 rounded-[10px]">
                {sort.charAt(0).toUpperCase() + sort.slice(1)}
              </span>

              <div className="cursor-pointer hover:bg-dark-4 rounded-[25%] transition">
                <IoIosArrowDown size={21} />
              </div>

              {isOpen && (
                <div className="flex flex-col absolute top-10 cursor-pointer right-0 bg-dark-2 w-full p-2 gap-1">
                  {sort !== "all" && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        resort("all");
                      }}
                      className="hover:text-violet-600"
                    >
                      All
                    </span>
                  )}

                  {sort !== "bug" && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        resort("bug");
                      }}
                      className="hover:text-violet-600"
                    >
                      Bug
                    </span>
                  )}

                  {sort !== "feature" && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        resort("feature");
                      }}
                      className="hover:text-violet-600"
                    >
                      Feature
                    </span>
                  )}

                  {sort !== "question" && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        resort("question");
                      }}
                      className="hover:text-violet-600"
                    >
                      Question
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className=" flex flex-col gap-3 h-auto ">
            <div className=" flex justify-between gap-5 items-center">
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-rose-900 p-4 rounded-[12px] mr-3">
                      <FaBug />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">open</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center ">
                    <IoEye size={22} className="cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-rose-900 p-4 rounded-[12px] mr-3">
                      <FaBug />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">
                          Unassigned
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoEye size={22} className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-between gap-5 items-center">
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-[#8d6333] p-4 rounded-[12px] mr-3">
                      <RiEdit2Fill />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center ">
                    <IoEye size={22} className="cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-[#0e7490] p-4 rounded-[12px] mr-3">
                      <FaQuestion />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoEye size={22} className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex justify-between gap-5">
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-[#0e7490] p-4 rounded-[12px] mr-3">
                      <FaQuestion />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoEye size={22} className="cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-[#8d6333]  p-4 rounded-[12px] mr-3">
                      <RiEdit2Fill />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoEye size={22} className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-between gap-5">
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-[#0e7490] p-4 rounded-[12px] mr-3">
                      <FaQuestion />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoEye size={22} className="cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-rose-900 p-4 rounded-[12px] mr-3">
                      <FaBug />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoEye size={22} className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-between gap-5">
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-[#0e7490]  p-4 rounded-[12px] mr-3">
                      <FaQuestion />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoEye size={22} className="cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-rose-900 p-4 rounded-[12px] mr-3">
                      <FaBug />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoEye size={22} className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex justify-between gap-5">
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-[#0e7490]  p-4 rounded-[12px] mr-3">
                      <FaQuestion />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoEye size={22} className="cursor-pointer" />
                  </div>
                </div>
              </div>
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-[#8d6333] p-4 rounded-[12px] mr-3">
                      <RiEdit2Fill />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoEye size={22} className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM END */}
        </div>
        <div className="px-6">
          <DonutChart header={"Report statistics"} />

          <div className="h-3/5 py-2 px-3 mt-2">
            <div className="">
              <h3 className="text-2xl">Activity</h3>
            </div>
            <p className="mt-1">Recent activity across all projects</p>
            <div className=" flex flex-col gap-1 mt-3">
              <div className="border-2 border-dark-3 rounded-[6px] py-3 flex justify-between">
                <div className="w-1/4 flex items-center justify-center text-slate-300">
                  2hrs ago
                </div>
                <div className="flex-1">
                  <div>
                    <h4 className="font-semibold">Ticket Title</h4>
                    <p>
                      by{" "}
                      <span className="text-blue-300 font-semibold">
                        Jhon Doe
                      </span>
                    </p>
                  </div>
                  <div className="">
                    <p className="text-slate-400">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Voluptatum, eligendi.
                    </p>
                  </div>
                </div>
                <div className="w-auto flex items-start px-3">
                  <Button >View</Button>
                </div>
              </div>

              <div className="border-2 border-dark-3 rounded-[6px] py-3 flex justify-between">
                <div className="w-1/4 flex items-center justify-center text-slate-300">
                  2hrs ago
                </div>
                <div className="flex-1">
                  <div>
                    <h4 className="font-semibold">Ticket Title</h4>
                    <p>
                      by{" "}
                      <span className="text-blue-300 font-semibold">
                        Jhon Doe
                      </span>
                    </p>
                  </div>
                  <div className="">
                    <p className="text-slate-400">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Voluptatum, eligendi.
                    </p>
                  </div>
                </div>
                <div className="w-auto flex items-start px-3">
                  <Button >View</Button>
                </div>
              </div>

              <div className="border-2 border-dark-3 rounded-[6px] py-3 flex justify-between">
                <div className="w-1/4 flex items-center justify-center text-slate-300">
                  2hrs ago
                </div>
                <div className="flex-1">
                  <div>
                    <h4 className="font-semibold">Ticket Title</h4>
                    <p>
                      by{" "}
                      <span className="text-blue-300 font-semibold">
                        Jhon Doe
                      </span>
                    </p>
                  </div>
                  <div className="">
                    <p className="text-slate-400">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Voluptatum, eligendi.
                    </p>
                  </div>
                </div>
                <div className="w-auto flex items-start px-3">
                  <Button >View</Button>
                </div>
              </div>

              <div className="border-2 border-dark-3 rounded-[6px] py-3 flex justify-between">
                <div className="w-1/4 flex items-center justify-center text-slate-300">
                  2hrs ago
                </div>
                <div className="flex-1">
                  <div>
                    <h4 className="font-semibold">Ticket Title</h4>
                    <p>
                      by
                      <span className="text-blue-300 font-semibold">
                        Jhon Doe
                      </span>
                    </p>
                  </div>
                  <div className="">
                    <p className="text-slate-400">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Voluptatum, eligendi.
                    </p>
                  </div>
                </div>
                <div className="w-auto flex items-start px-3">
                  <Button >View</Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
