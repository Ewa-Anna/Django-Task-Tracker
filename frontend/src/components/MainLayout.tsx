import { Header } from "./Header"
import React from 'react';
import LeftSideBar from "./LeftSideBar";

const MainLayout: React.FC = ({ children }) => {
    return (
        <div className="border-2 flex flex-col h-full">
            <Header />

            <div className="flex h-full">
                <LeftSideBar />
                {children}
            </div>




        </div>
    )
}

export default MainLayout