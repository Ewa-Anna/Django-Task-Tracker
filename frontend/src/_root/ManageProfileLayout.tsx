import { asideLinks } from '@/constants';
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const ManageProfileLayout = () => {
  const { pathname } = useLocation();



console.log(location)
  return (
   <div className=" w-full px-20 pt-14 pb-10 ">
      <h2 className="text-3xl font-bold mb-2">Settings</h2>
      <span className="text-gray-300">Manage your account settings and set e-mail preferences.</span>
<section className='border-2 border-dark-4 w-full flex p-4 rounded-md mt-5'>

<aside className='flex flex-col min-w-[300px]'>
{asideLinks.map((link)=>{
      const isActive = pathname === link.route;
    return(
        
   <Link to={`${link.route.toLowerCase()}`} key={link.label}         className={`manageAside-link group ${
                  isActive && "bg-primary-500"
                }`}>
{link.label}
            </Link>
    )
})}
</aside>
<Outlet/>
</section>


    </div>
  )
}

export default ManageProfileLayout