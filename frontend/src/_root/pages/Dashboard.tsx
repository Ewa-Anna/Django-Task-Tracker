import React, { useState,useRef } from "react";
import { MdCallMissedOutgoing } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Chart from "@/components/ui/shared/Chart";

const Dashboard = () => {
  const [sort, setSort] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

const resort = (type)=>{
  setSort(type)
  setIsOpen(false)
}
const containerRef= useRef<HTMLDivElement>(null)
  return (
    <div className=" w-full px-14 pt-3 mt-12 h-full overflow-scroll custom-scrollbar ">
      <div className="w-full h-auto grid grid-cols-60-40  ">
        <div className="flex flex-col border-r border-dark-3 pr-12  ">
          <h2 className="text-2xl mb-5">Dashboard</h2>

          <div className=" flex flex-col gap-5 ">
            <div className=" flex justify-between gap-5 ">
              <div className="flex-grow p-3  rounded-[12px] bg-orange-800">
                <div className="flex  justify-between">
                  <div className="flex-grow ">
                    <div className="flex flex-col">
                      <h3 className="text-xl">Locations</h3>
                      <p>CHart</p>
                    </div>
                  </div>
                  <div className="flex-grow  flex items-center justify-center">
                    <MdCallMissedOutgoing size={64} />
                  </div>
                </div>
              </div>
              <div className="flex-grow p-3  rounded-[12px]  bg-green-800">
                <div className="flex justify-between ">
                  <div className="flex-grow">
                    <div className="flex flex-col">
                      <div>
                        <h3 className="text-xl">Locations</h3>
                        <p className="text-sm">33</p>
                      </div>
                      <p>CHart</p>
                    </div>
                  </div>
                  <div className="flex-grow  flex items-center justify-center">
                    <MdCallMissedOutgoing size={64} />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-between gap-5">
              <div className="flex-grow p-3  rounded-[12px]  bg-blue-900">
                <div className="flex  justify-between">
                  <div className="flex-grow">
                    <div className="flex flex-col">
                      <div>
                        <h3 className="text-xl">Locations</h3>
                        <p className="text-sm">33</p>
                      </div>
                      <p>CHart</p>
                    </div>
                  </div>
                  <div className="flex-grow  flex items-center justify-center">
                    <MdCallMissedOutgoing size={64} />
                  </div>
                </div>
              </div>
              <div className="flex-grow p-3  rounded-[12px]  bg-yellow-800">
                <div className="flex justify-between">
                  <div className="flex-grow">
                    <div className="flex flex-col">
                      <div>
                        <h3 className="text-xl">Locations</h3>
                        <p className="text-sm">33</p>
                      </div>
                      <p>CHart</p>
                    </div>
                  </div>
                  <div className="flex-grow flex items-center justify-center">
                    <MdCallMissedOutgoing size={64} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOm */}
          <div className="flex justify-between mb-7 mt-12  ">
            <div className="flex gap-8 items-center">
              <h3 className="text-3xl font-semibold">Last Reports</h3>
              <span className="text-sm">View More</span>
            </div>

            <div className="flex  items-center gap-2 relative"
              tabIndex={0}    ref={containerRef}
              onBlur={()=>{
            
                setIsOpen(false)
              }} onClick={()=>setIsOpen((state)=>!state)}
            >
              <span className="mr-3 text-sm">sortBy</span>
              <span className="text-violet-400 border-2 w-[50px] py-1 px-8 flex justify-center  border-none bg-dark-3 rounded-[10px]">{sort === "all" ? "All" : "bug"}</span>
              
              <div className="cursor-pointer hover:bg-dark-4 rounded-[25%] transition"
             >
      <IoIosArrowDown size={21}
            /> 
              </div>
         
              {isOpen && (
                <div className="flex flex-col absolute top-10 cursor-pointer right-0 bg-dark-2 w-full p-2 gap-1">
                {sort!=="all"?(<span 
                onClick={(e)=>{
                  e.stopPropagation();
                  resort("all")
                }}
                className="hover:text-violet-600">All</span>):
                <span 
                           onClick={(e)=>{
                            e.stopPropagation();
                            resort("bugs")
                           }}
                  className="hover:text-violet-600">Bugs</span>}
                </div>
              )}
            </div>
          </div>

          <div className=" flex flex-col gap-5 h-auto ">
            <div className=" flex justify-between gap-5 items-center">
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-blue-300 p-4 rounded-[12px] mr-3">
                      <RiEdit2Fill />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">
                          {" "}
                          8:00 - 10:00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center ">
                    <IoEye size={22} className="cursor-pointer"  />
                  </div>
                </div>
              </div>

              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-blue-300 p-4 rounded-[12px] mr-3">
                      <RiEdit2Fill />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">
                          {" "}
                          8:00 - 10:00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoEye size={22}  className="cursor-pointer"/>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex justify-between gap-5">
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-blue-300 p-4 rounded-[12px] mr-3">
                      <RiEdit2Fill />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">
                          {" "}
                          8:00 - 10:00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoEye size={22}  className="cursor-pointer"/>
                  </div>
                </div>
              </div>
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-blue-300 p-4 rounded-[12px] mr-3">
                      <RiEdit2Fill />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">
                          {" "}
                          8:00 - 10:00
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
            <div className=" flex justify-between gap-5">
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-blue-300 p-4 rounded-[12px] mr-3">
                      <RiEdit2Fill />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">
                          {" "}
                          8:00 - 10:00
                        </span>
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
                    <div className="flex items-center bg-blue-300 p-4 rounded-[12px] mr-3">
                      <RiEdit2Fill />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">
                          {" "}
                          8:00 - 10:00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoEye size={22}  className="cursor-pointer"/>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-between gap-5">
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-blue-300 p-4 rounded-[12px] mr-3">
                      <RiEdit2Fill />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">
                          {" "}
                          8:00 - 10:00
                        </span>
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
                    <div className="flex items-center bg-blue-300 p-4 rounded-[12px] mr-3">
                      <RiEdit2Fill />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">
                          {" "}
                          8:00 - 10:00
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

            <div className=" flex justify-between gap-5">
              <div className="flex-grow p-3  rounded-[12px] bg-dark-4">
                <div className="flex  justify-between ">
                  <div className="flex">
                    <div className="flex items-center bg-blue-300 p-4 rounded-[12px] mr-3">
                      <RiEdit2Fill />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">
                          {" "}
                          8:00 - 10:00
                        </span>
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
                    <div className="flex items-center bg-blue-300 p-4 rounded-[12px] mr-3">
                      <RiEdit2Fill />
                    </div>
                    <div>
                      <div>
                        <span className="text-normal">Reding - Topic1</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-300">
                          {" "}
                          8:00 - 10:00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoEye size={22} className="cursor-pointer"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM END */}
        </div>
        <div>Right

       <Chart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
