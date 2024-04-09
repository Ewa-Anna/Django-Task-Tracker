import React from 'react'
import { sidebarLinks } from '../constants'
import { Link, Switch, Route, Redirect, useLocation, NavLink } from "react-router-dom";


const LeftSideBar: React.FC = () => {
    const { pathname } = useLocation();


    return (
        <nav className='bg-white w-[200px] '>
            <ul className=' h-1/2 flex flex-col justify-evenly  '>
                {sidebarLinks.map(({ label, route, imgURL }, index) => {
                    const isActive = pathname === route;
                    return (
                        <li className='group py-2.5 px-3 hover:bg-blue-500 '
                            key={index}
                        >


                            <NavLink
                                to={route}
                                className='text-slate-700 group-hover:invert-white font-semibold flex items-center gap-x-2'
                            >

                                <img
                                    color='white'
                                    className='w-7 h-auto group-hover:invert-white '
                                    src={imgURL}
                                    alt={label}
                                />
                                {label}
                            </NavLink>

                        </li>
                    )
                })}

            </ul>
        </nav>
    )
}

export default LeftSideBar