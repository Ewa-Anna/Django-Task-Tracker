import React from 'react'
import ProjectForm from './forms/ProjectForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createNewProject, getTags, getVisibilityOptions } from '../services/projectsApi'
import { getUsers } from '../services/userApi'


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
        console.log("A")
        console.log(formData)
        mutate({ formData })
    }

    return (
        <div
            className="common-container h-fit ">
            <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl">
                <h1 className="h2-bold">
                    New Project
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