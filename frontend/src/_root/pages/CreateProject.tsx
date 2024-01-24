import ProjectForm from '@/components/forms/projectForm/ProjectForm'
import PostForm from '@/components/forms/projectForm/ProjectForm'
import { getUsers } from '@/features/user-api/user-api'
import React from 'react'
import { useQuery } from 'react-query'

const CreateProject = () => {


const {data:users,isLoading,isError}=useQuery(["users"],()=>getUsers())

  
  return (
    <div className='flex flex-1'>

<div className='common-container '>

<div className='max-w-5xl flex-start gap-3 justify-center'>
  <img src="/assets/icons/add-post.svg" alt="add" width={36} height={36}/>
  <h2 className='h3-bold md:h2-bold text-left w-full'>Create Project</h2>
</div>
<ProjectForm users={users} />
</div>

    </div>
  )
}

export default CreateProject