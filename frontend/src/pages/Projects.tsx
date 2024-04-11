import React, { useState } from 'react';
import MainLayout from '../components/MainLayout'
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '../services/projectsApi';
import ProjectCard from '../components/ProjectCard';
import ProjectsWrapper from '../components/ProjectsWrapper';
import Pagination from '../components/Pagination';

const Projects: React.FC = () => {


    const token = localStorage.getItem("token")
    console.log(token)

    const { data: projects, isLoading, isError } = useQuery({
        queryFn: () => {
            return getAllProjects({ token: token });
        },
        queryKey: ["projects"],
        refetchOnWindowFocus: false
    });


    return (

        <div className=' flex flex-col pb-20   h-screen w-full  flex-1  custom-scrollbar overflow-scroll  '>
            <div className='flex flex-col gap-4 sm:flex-row justify-between py-12 px-16'>
                <h1 className='h1-bold text-center sm:text-left sm:h2-bold '>Projects</h1>
                <div className='flex gap-2' >
                    <input
                        className='placeholder:px-2 p-2 w-full rounded-lg mx-auto md:mx-0'
                        placeholder='project title...'
                        type="text" />
                    <button className='py-1 px-3 bg-violet-400 rounded-lg'>search</button>
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