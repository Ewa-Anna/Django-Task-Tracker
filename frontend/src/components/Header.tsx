import React from "react";
import { images } from "../constants";
import { logout } from "../services/userApi";
import { FaUserCircle } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineArrowRight } from "react-icons/md";

import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAccountStore } from "../store";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const csrfToken = useAccountStore((state) => state.csrfToken);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ csrfToken }) => logout({ csrfToken }),
    onSuccess: (data) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  const logoutHandler = ({ csrfToken }) => {
    mutate({ csrfToken });
  };

  return (
    <header className="flex flex-1 justify-between border-b max-h-[200px] min-h-[50px] py-3 px-14 ">
      <NavLink to="/">
        <div className="flex items-center ">
          <img src={images.Logo} alt="logo" className="w-9 h-auto mr-1" />
          <span className="font-bold font-sans text-slate-600">Bug</span>

          <span className="font-bold font-sans text-violet-600">Bard</span>
          <MdOutlineArrowRight className="text-slate-400 w-6 h-auto " />
        </div>
      </NavLink>
      <div className=" flex gap-x-9 items-center">
        <ul className="flex gap-x-5 items-center font-semibold">
          <li>
            <IoIosNotifications className="w-7 h-auto text-slate-500 cursor-pointer hover:opacity-70  transition-all" />
          </li>
          <li>
            <FaMessage className="w-6 h-auto text-slate-500 cursor-pointer hover:opacity-70 transition-all" />
          </li>
          <li>
            <FaUserCircle className="w-8 h-auto text-slate-500 cursor-pointer hover:opacity-70  transition-all " />
          </li>
        </ul>
        <button
          onClick={() => logoutHandler({ csrfToken })}
          className="border-2 border-violet-600 px-6 py-2 rounded-full
                         text-violet-600 font-semibold hover:bg-violet-600 hover:text-slate-100 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
