import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import LeftSideBar from './LeftSideBar';


const RootLayout: React.FC = () => {
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const [isMobileMenuHidden, setIsMobileMenuHidden] = useState<boolean>(false);

    const handleMenuHide = (): void => {
        setIsHidden(!isHidden);
    };

    const handleMobileMenu = (): void => {
        setIsMobileMenuHidden(!isMobileMenuHidden);
    };

    return (
        <div className="w-full flex flex-col  ">
            <Header handleMenuHide={handleMenuHide} handleMobileMenu={handleMobileMenu} />
            <main className=" flex">
                <LeftSideBar />
                <section className="flex flex-1 h-full overflow-scroll custom-scrollbar  ">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default RootLayout;
