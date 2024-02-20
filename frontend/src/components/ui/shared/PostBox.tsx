import React from 'react'
import { AiFillLike } from 'react-icons/ai'

const PostBox = ({...props}) => {



  return (
    <div>

<div className="  flex flex-col mt-5 gap-4 ">
              <div className="flex items-center gap-5 my-5 mx-0">
                <img
                  className="h-[50px] w-[50px] rounded-[50%] object-cover"
                  src={props?.created_by?.photo || "/assets/icons/profile-placeholder.svg"}
                  alt=""
                />
                <div className="flex flex-col gap-2 ">
            <div className='flex gap-1'>
            <span>{props?.created_by?.first_name}</span>
                  <span>{props?.created_by?.first_name}</span>
            </div>
                  <div className="flex items-center gap-2 text-slate-500 justify-center">
                
                    <span>Role</span>
                  </div>
                </div>
              </div>
       
              <p className=' px-2'>
         {props?.text}
              </p>
              <div className="flex items-center gap-2 px-2">
                <span>Helpful?</span>
               <AiFillLike/>
                <span>Yes</span>
                <AiFillLike/>
                <span>No</span>
              </div>
            </div>

            <hr className="mb-5 mt-5 h-0 border-2 border-dark-3" />
    </div>
  )
}

export default PostBox