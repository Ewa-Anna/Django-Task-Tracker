import React from 'react'
import { Outlet } from 'react-router-dom'


const AuthLayout = () => {
    return (
        <div className="w-full flex h-full ">


            <Outlet />
            <section className="flex flex-1 h-full overflow-scroll custom-scrollbar  ">

            </section>

        </div>
    )
}

export default AuthLayout