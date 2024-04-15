import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getUsers } from '../services/userApi';
import { images } from '../constants';
import UserCard from '../components/UserCard';



const Users: React.FC = () => {




    const { data: users, isLoading, isError } = useQuery({
        queryFn: () => {
            return getUsers({ limit: 12 });
        },
        queryKey: ["users"],
        refetchOnWindowFocus: false
    });

    console.log(users)

    return (
        <div className=' flex flex-col pb-20 px-10  h-screen w-full  flex-1  custom-scrollbar overflow-scroll  '>
            <div className='flex flex-col gap-5 sm:flex-row justify-between py-12 px-4 md:px-16 flex-wrap'>



                {users && users?.results.map((user) => {
                    return (
                        <UserCard
                            user={user}
                        />
                    )
                })}

            </div>
        </div >
    )
}

export default Users