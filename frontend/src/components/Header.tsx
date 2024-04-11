import React, { useEffect, useState } from "react";
import { images } from "../constants";
import { useWindowSize } from "@uidotdev/usehooks";

export const Header: React.FC = () => {


    return (

        < header
            className="flex flex-1 justify-end border-b max-h-[200px] min-h-[50px] py-3 px-14 "
        >

            <div className=" flex gap-x-9 items-center">
                <ul className="flex gap-x-5 items-center font-semibold">
                    <li>
                        <a href="/">
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            config
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            more
                        </a>
                    </li>
                </ul>
                <button
                    className="border-2 border-violet-600 px-6 py-2 rounded-full
                         text-violet-600 font-semibold hover:bg-violet-600 hover:text-slate-100 transition-all duration-200"
                >
                    Logout
                </button>
            </div>
        </header >

    )
}
