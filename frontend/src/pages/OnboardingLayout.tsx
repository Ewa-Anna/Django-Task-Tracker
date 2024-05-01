import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import LeftSideBar from "./LeftSideBar";

import { validateSession } from "../services/userApi";
import { useQuery } from "@tanstack/react-query";
import { useAccountStore } from "../store";
import { images } from "../constants";

const OnboardingLayout: React.FC = () => {
  const setAccount = useAccountStore((state) => state.setAccount);
  const setCsrfToken = useAccountStore((state) => state.setCsrfToken);
  const navigate = useNavigate();

  const {
    data: session,
    isError,
    isLoading,
  } = useQuery({
    queryFn: () => {
      return validateSession();
    },
    onSuccess: (data) => {
      setAccount(data);
      setCsrfToken(data?.csrf_token);
    },
    onError: () => {
      navigate("/login");
    },
    queryKey: ["session"],
    retry: false,
  });

  return (
    <div className="w-full flex flex-col max-w-7xl mx-auto  h-screen overflow-scroll custom-scrollbar ">
      <section className="flex  h-full  ">
        <Outlet />
      </section>
    </div>
  );
};

export default OnboardingLayout;
