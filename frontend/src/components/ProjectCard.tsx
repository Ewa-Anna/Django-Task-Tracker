import React from 'react'
import { images } from "../constants"
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';


const ProjectCard: React.FC = ({ project, className }) => {

    return (
        <div
            className={`rounded-xl overflow-hidden 
        shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}
        
        `}>
            <Link to={`/project/${project?.id}`}>
                <img
                    src={project?.photo ? project?.photo : images.ProjectImage}
                    alt="title"
                    className='w-full object-cover object-center h-auto md:h-30 lg:h-35 xl:h-40' />
            </Link>

            <div className='p-5'>
                <Link to={`/project/${project?.id}`}>
                    <h2
                        className='font-roboto font-bold text-xl text-slate-500 md:text-2xl lg:text-[28px] text-nowrap '>
                        {project?.title}
                    </h2>
                    <span
                        className={`${project?.status === 'pending' ? "bg-[#FFEFCA] text-[#BC3803] border border-[#FFCC85]" : "bg-[#D9FBD0] text-[#1C6C09] border border-[#90D67F] "} py-0.25 px-2 rounded-[5px]  text-sm`}
                    >{project?.status}</span>
                </Link>

                <div className='flex justify-between flex-nowrap items-center mt-6'>

                    <div className='flex items-center gap-x-2 md:gap-x-2.5'>
                        <img
                            src={project?.owner?.profile?.photo ? project?.owner?.profile?.photo : images.ProfileImage}
                            alt="post profile"
                            className='w-9 h-9 md:w-10 md:h-10 rounded-full' />
                        <div className='flex flex-col'>
                            <div className=' flex flex-col font-bold italic text-slate-400 text-sm md:text-base '>
                                <span> {project?.owner?.first_name}</span>
                                <span>         {project?.owner?.last_name}</span>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <span
                                    className={`${project?.status !== 'pending' ? "bg-[#36B37E]" : "bg-red-600"} w-fit bg-opacity-20 p-1.5 rounded-full`}>
                                    {project?.status !== 'pending' ? (<BsCheckLg
                                        className='w-2 h-2 text-[#36B37E]' />) :
                                        <AiOutlineClose className='w-2 h-2 text-red-500' />
                                    }
                                </span>

                            </div>
                        </div>
                    </div>

                    <span
                        className='font-bold text-slate-400  italic text-sm md:text-base'>
                        {new Date(project?.created).getDate()}{" "}
                        {new Date(project?.created).toLocaleString("en-US", {

                            month: "long",


                        })}
                        <p className='text-xs text-slate-400 text-right  '>
                            {new Date(project?.created).toLocaleString("en-US", {

                                year: "numeric",


                            })}
                        </p>
                    </span>


                </div>
            </div>
        </div>
    )
}

export default ProjectCard