import React, { useState } from 'react'

import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { getProjectDetails } from '../services/projectsApi';
import { MdOutlinePending, MdPublic } from 'react-icons/md';
import { FaPeopleGroup } from "react-icons/fa6";

const ProjectDetails: React.FC = () => {
    const { id } = useParams();
    const [breadCrumbsData, setBreadCrumbsData] = useState([]);
    console.log(breadCrumbsData)
    const { data: project } = useQuery({
        queryFn: () => getProjectDetails({ id }),
        queryKey: ["project", id],
        onSuccess: () => {
            setBreadCrumbsData([
                { name: "Home", link: "/" },
                { name: "Projects", link: "/projects" },
                { name: "Project", link: `/project/${project?.id}` },
            ]);
        }
    })

    console.log(ProjectDetails)

    return (

        <div
            className=' flex flex-col  h-screen w-full  flex-1  custom-scrollbar overflow-scroll   '
        >

            <div className=" flex gap-12  h-auto  flex-col-reverse w-[90%] md:w-[94%] py-10 xl:flex-row mx-auto ">
                {/* LEFT */}
                <div className="flex flex-col  gap-5 flex-grow px-14 py-10 flex-1 h-auto shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ">
                    <h1 className="h2-bold">{project?.title}</h1>

                    <div className="flex items-center  gap-2 flex-wrap ">
                        {project?.tags.map((tag) => {
                            return (
                                <div className="border-[0.5px]  bg-blue-500 text-slate-50 py-0.5 px-1 rounded-[0.25em] ">
                                    {tag.name}
                                </div>
                            );
                        })}
                    </div>

                    <h2 className='text-lg font-semibold text-slate-500'>About project</h2>
                    <p>{project?.description}</p>

                    {/* seeller */}
                    <div className="mt-12 flex flex-col gap-5 ">
                        <div className=" border-2  rounded-[5px] p-5 mt-5 ">
                            <h3 className="font-semibold text-xl mb-6">Overall</h3>
                            <div className="flex justify-between flex-wrap text-slate-800">
                                <div className="w-[300px] flex flex-col gap-3 mb-5">
                                    <span className="font-normal">Total members</span>
                                    <span className="desc">{project?.assignees.length}</span>
                                </div>
                                <div className="w-[300px] flex flex-col gap-2 mb-5">
                                    <span className="font-normal">Created At</span>
                                    <span className="desc">
                                        {/* {formatTimestamp(project?.created)} */}
                                    </span>
                                </div>
                                <div className="w-[300px] flex flex-col gap-2 mb-5">
                                    <span className="font-normal">Avg response time</span>
                                    <span className="desc">4 hours</span>
                                </div>
                                <div className="w-[300px] flex flex-col gap-2 mb-5">
                                    <span className="font-normal">Created By</span>
                                    <span className="desc">{`${project?.created_by?.first_name} ${project?.created_by?.last_name}`}</span>
                                </div>
                                <div className="w-[300px] flex flex-col gap-2 mb-5">
                                    <span className="font-normal">Languages</span>
                                    <span className="desc">English</span>
                                </div>
                            </div>
                            <hr className="h-[0px]  mb-5" />

                            <h4 className="mb-10 text-xl font-semibold">Members</h4>

                            <div className='py-12 '>
                                {project?.assignees.length > 0 ? (
                                    project?.assignees.map((member) => (
                                        <div className="flex justify-evenly text-slate-800 mb-10 md:mb-5">
                                            <span className="flex-1 flex items-center">
                                                {member.first_name}
                                            </span>
                                            <span className="flex-1 flex items-center">
                                                {member.last_name}
                                            </span>
                                            <span className="flex-1 flex items-center">
                                                {member.role}
                                            </span>
                                            <Link to={`/profile/${member?.id}`}>
                                                <div className="flex-1 flex items-center">
                                                    <button className="hover:bg-violet-600 mt-1" variant={"ghost"}>
                                                        View
                                                    </button>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <div className='flex justify-center items-center gap-x-2'>
                                        <FaPeopleGroup className='w-16 h-auto' />
                                        <span className='text-slate-600 font-semibold'>
                                            No members yet...
                                        </span>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* LEFT */}

                {/* RIGHT */}
                <div className="mx-auto flex  xs:mb-2  w-full border-2 pb-4 rounded xl:flex flex-col gap-5 h-auto min-h-[430px]  xl:w-1/3    xl:p-5 xl:sticky xl:top-4 mt-32 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]  ">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Project Details</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className=" grid grid-cols-40-60 gird-rows-3 font-normal text-slate-400 mb-1 ">
                            <div className="p-2">
                                <span className="text-sm">Visibility</span>
                            </div>
                            <div className=" flex items-center gap-2 border-2 p-2 rounded-[10px] bg-green-900 text-slate-200">
                                {project?.visibility === "public" ? (
                                    <MdPublic />
                                ) : (
                                    <MdPublic />
                                )}
                                <span>{project?.visibility}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-40-60 gird-rows-3 font-normal text-slate-400 mb-1">
                            <div className="p-2">
                                <span className="text-sm">Status</span>
                            </div>
                            <div className="flex items-center gap-2 border-2 p-2  rounded-[10px] bg-green-900 text-slate-200">
                                {project?.status === "pending" ? (
                                    <MdOutlinePending />
                                ) : (
                                    <MdOutlinePending />
                                )}
                                <span>{project?.status}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-40-60 gird-rows-3 font-normal text-slate-400 mb-1">
                            <div className="p-2">
                                <span className="text-sm">Due time</span>
                            </div>
                            <div className="flex items-center gap-2 border-2 p-2  rounded-[10px] bg-green-900 text-slate-200">

                                <span>{(project?.deadline)}</span>
                            </div>
                        </div>
                    </div>

                    <h2>Project Leader</h2>
                    <div className="flex justify-evenly">
                        <Link to={`/profile/${project?.owner?.id}`}>
                            <img
                                className="w-[100px] h-[100px] rounded-[15%] object-cover xs:w-[200px] xs:h-[200px]"
                                src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                alt="userAvatar"
                            />
                        </Link>
                        <div className="flex flex-col h-full justify-center items-center">
                            <span className='text-xl xs:text-2xl font-semibold text-slate-700'>{project?.owner?.first_name}</span>
                            <span className='text-xl xs:text-2xl font-semibold text-slate-700'>{project?.owner?.last_name}</span>



                        </div>
                    </div>
                </div>
                {/* RIGHT */}
            </div>


        </div>

    )
}

export default ProjectDetails