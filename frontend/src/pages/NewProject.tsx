import React from 'react'
import ProjectForm from './forms/ProjectForm'
import { useQuery } from '@tanstack/react-query'
import { getTags } from '../services/projectsApi'
import { getUsers } from '../services/userApi'



const categories = [
    { id: 1, name: "Frontend" },
    { id: 2, name: "Backend" },
    { id: 3, name: "Frontend" },
    { id: 4, name: "Frontend" },
    { id: 5, name: "Frontend" },
    { id: 6, name: "Frontend" },
]

const visibilityOptions = [
    { id: 1, name: "Public", value: "public" },
    { id: 2, name: "Private", value: "private" },
]



const NewProject = () => {

    const { data: tags } = useQuery({
        queryFn: () => getTags(),
        queryKey: ["tags"]
    })
    const { data: users } = useQuery({
        queryFn: () => getUsers(),
        queryKey: ["users"]
    })

    return (
        <div
            className='common-container'
        >
            <section className="container   mx-auto max-w-5xl flex flex-col px-5 py-5 md:max-w-3xl   lg:gap-x-5 lg:max-w-5xl xl:max-w-4xl ">
                <h1 className='h2-bold'>
                    New Project
                </h1>
                <ProjectForm
                    tags={tags}
                    users={users?.results}
                    visibilityOptions={visibilityOptions}
                />
            </section>
        </div>
    )
}

export default NewProject