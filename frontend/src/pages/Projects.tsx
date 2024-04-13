import React, { useState } from 'react';
import MainLayout from '../components/MainLayout'
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '../services/projectsApi';
import ProjectCard from '../components/ProjectCard';
import ProjectsWrapper from '../components/ProjectsWrapper';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';
import { useAccountStore } from '../store';

const Projects: React.FC = () => {

    const userAccount = useAccountStore((state) => state.account);


    console.log(userAccount)
    const token = localStorage.getItem("token")
    console.log(token)

    const userString = localStorage.getItem("user")
    const { role } = JSON.parse(userString as string);



    const { data: projects, isLoading, isError } = useQuery({
        queryFn: () => {
            return getAllProjects({ token: token });
        },
        queryKey: ["projects"],
        refetchOnWindowFocus: false
    });


    return (

        <div className=' flex flex-col pb-20 px-10  h-screen w-full  flex-1  custom-scrollbar overflow-scroll  '>
            <div className='flex flex-col gap-4 sm:flex-row justify-between py-12 px-16'>
                <h1 className='h1-bold text-center sm:text-left sm:h2-bold '>Projects</h1>
                <div className='flex flex-col gap-8 py-2' >



                    <div className='flex gap-2'>
                        <input
                            className='placeholder:px-2 p-2 w-full rounded-lg mx-auto md:mx-0'
                            placeholder='project title...'
                            type="text" />
                        <button
                            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                            type="submit"
                        >
                            Filter
                        </button>
                    </div>
                    {role === 'admin' &&
                        <Link
                            to={"/project/new"}
                            className='border-2 py-2 text-center bg-purple-500 text-white text-bold rounded-lg hover:opacity-85'

                        >
                            New project
                        </Link>}
                </div>
            </div>
            <ProjectsWrapper
                projects={projects}
                isLoading={isLoading}
                isError={isError}
            />



        </div>

    )
}

export default Projects