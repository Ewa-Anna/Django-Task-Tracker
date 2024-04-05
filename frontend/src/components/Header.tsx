import React from "react";
import { images } from "../constants";
export const Header: React.FC = () => {



    return (
        <section>
            <header
                className=" mx-auto px-8 flex justify-between py-4 ">
                <div>
                    <img
                        className="w-12 h-auto"
                        src={images.Logo}
                        alt="logo" />
                </div>
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
            </header>
        </section>
    )
}
