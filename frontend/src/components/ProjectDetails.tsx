import React from 'react'
import MainLayout from './MainLayout'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';

const ProjectDetails: React.FC = () => {
    const { id } = useParams();

    const { data } = useQuery({
        queryFn: () => getProjectDetails({ id }),
        queryKey: ["projectDetails", id]
    })

    console.log(data)

    return (
        <MainLayout>
            <div
                className=' flex flex-col p-5 h-screen w-full  flex-1  custom-scrollbar overflow-scroll '
            >
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
                <h1>Project</h1>
            </div>
        </MainLayout>
    )
}

export default ProjectDetails