import React from 'react'
import { sidebarLinks } from '../constants'

const LeftSideBar: React.FC = () => {



    return (
        <nav>
            <ul>
                {sidebarLinks.map(({ label, route, imgURL }) => {
                    return (
                        <li>
                            <span>      {label}</span>

                            <img src={imgURL} alt={label} />


                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default LeftSideBar