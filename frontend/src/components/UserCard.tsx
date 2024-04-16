import React from "react"
import { images } from "../constants"

const UserCard: React.FC = ({ user }) => {
    return (
        <div className='flex flex-col justify-between 
                        items-center min-w-[60.35%] xs:min-w-[46%] md:min-w-[45.35%] lg:min-w-[44%] xl:min-w-[23.88%] 2xl:min-w-[23%]
                        shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]
                        rounded-xl py-10 gap-1
                        '>
            <img src={user?.profile?.photo || images.ProfileImage} alt="avatar" className='w-[120px] h-auto' />
            <span className='w-full text-center font-semibold text-slate-800'>{user?.first_name}</span>
            <span className='w-full text-center font-semibold text-slate-800' >{user?.last_name}</span>
            <span className='w-full text-center mt-1 mb-2 font-semibold text-slate-500'>  {user?.role && user.role.toUpperCase()}</span>
            <button className='py-2 px-3 rounded-lg lg:px-8 bg-blue-400 text-slate-100 font-bold'>See more</button>
        </div>
    )
}

export default UserCard