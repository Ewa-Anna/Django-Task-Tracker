import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { validateSession } from "../services/userApi";
import { images } from "../constants";

const AuthLayout = () => {
  const navigate = useNavigate();
  const {
    data: session,
    isError,
    isLoading,
  } = useQuery({
    queryFn: () => {
      return validateSession();
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      navigate("/login");
    },
    queryKey: ["session"],
    retry: false,
  });
  return (
    <div className="w-full flex h-full ">
      <Outlet />
      <section className="flex flex-1 h-full overflow-scroll custom-scrollbar ">
        <img src={images.LandingImage} alt="management-picture" />
      </section>
    </div>
  );
};

export default AuthLayout;
