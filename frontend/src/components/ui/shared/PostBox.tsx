import React from 'react'
import { AiFillLike } from 'react-icons/ai'

const PostBox = () => {
  return (
    <div>

<div className="  flex flex-col mt-5 gap-4 ">
              <div className="flex items-center gap-5 my-5 mx-0">
                <img
                  className="h-[50px] w-[50px] rounded-[50%] object-cover"
                  src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="flex flex-col gap-2">
                  <span>John Doe</span>
                  <div className="flex items-center gap-2 text-slate-500">
                
                    <span>Role</span>
                  </div>
                </div>
              </div>
       
              <p className=' px-2'>
                I just want to say that art_with_ai was the first, and after
                this, the only artist Ill be using on Fiverr. Communication was
                amazing, each and every day he sent me images that I was free to
                request changes to. They listened, understood, and delivered
                above and beyond my expectations. I absolutely recommend this
                gig, and know already that Ill be using it again very very soon
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