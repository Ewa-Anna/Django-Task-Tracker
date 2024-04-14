import React from 'react'
import ProjectForm from './forms/ProjectForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createNewProject, getTags, getVisibilityOptions } from '../services/projectsApi'
import { getUsers } from '../services/userApi'
import { AiOutlineFundProjectionScreen } from "react-icons/ai";


const NewProject: React.FC = () => {

    const { data: tags } = useQuery({
        queryFn: () => getTags(),
        queryKey: ["tags"]
    })
    const { data: users } = useQuery({
        queryFn: () => getUsers(),
        queryKey: ["users"]
    })

    const { data: visibilityOptions } = useQuery({
        queryFn: () => getVisibilityOptions(),
        queryKey: ["visibilityOptions"]
    })

    const { mutate } = useMutation({
        mutationFn: ({ formData }) => {
            return createNewProject({
                formData
            })
        }
    })

    const handleSave = ({ formData }) => {
        mutate({ formData })
    }

    return (
        <div
            className="common-container h-fit ">
            <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl">
                <h1 className="pt-2 pb-10 h2-bold flex items-center justify-center gap-x-3 lg:justify-start lg:gap-x-2">
                    <AiOutlineFundProjectionScreen className='w-12 h-auto lg:w-9 lg:h-auto' />  New Project
                </h1>

                {visibilityOptions && tags && users &&
                    <ProjectForm
                        tags={tags}
                        users={users?.results}
                        visibilityOptions={visibilityOptions}
                        handleSave={handleSave}
                    />}
            </section>
        </div>
    )
}

export default NewProject