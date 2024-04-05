import { Header } from "./Header"
import React from 'react';
import LeftSideBar from "./LeftSideBar";

const MainLayout: React.FC = ({ children }) => {
    return (
        <div className="border-2 flex flex-col">
            <Header />
            <section className="w-auto flex">
                <LeftSideBar />
                {children}
            </section>


        </div>
    )
}

export default MainLayout