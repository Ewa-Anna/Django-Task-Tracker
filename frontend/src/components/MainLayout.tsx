import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import LeftSideBar from "./LeftSideBar";
import toast from "react-hot-toast";
import { validateSession } from "../services/userApi";
import { useQuery } from "@tanstack/react-query";
import { useAccountStore } from "../store";


const RootLayout: React.FC = () => {


    const setAccount = useAccountStore((state) => state.setAccount);
    const navigate = useNavigate()

    const { data: session, isError, isLoading } = useQuery({
        queryFn: () => {
            return validateSession();
        },
        onSuccess: (data) => {

            setAccount(JSON.stringify(data.message))
        },
        onError: () => {
            navigate("/login")
        },
        queryKey: ["session"],
        retry: false,

    })





    const [isHidden, setIsHidden] = useState<boolean>(false);
    const [isMobileMenuHidden, setIsMobileMenuHidden] = useState<boolean>(false);

    const handleMenuHide = (): void => {
        setIsHidden(!isHidden);
    };

    const handleMobileMenu = (): void => {
        setIsMobileMenuHidden(!isMobileMenuHidden);
    };

    return (
        <div className="w-full flex flex-col  h-screen">
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
