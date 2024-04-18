import React, { useEffect, useState } from "react";
import { sidebarLinks } from "../constants";
import {
  Link,
  Switch,
  Route,
  Redirect,
  useLocation,
  NavLink,
} from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";

const LeftSideBar: React.FC = () => {
  const { pathname } = useLocation();

  const [isMenuActive, setIsMenuActive] = useState(true);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  if (isMenuActive) {
    return (
      <nav
        className={
          "leftsidebar-hidden leftsidebar flex flex-col justify-between "
        }
      >
        <ul className="flex flex-col  ">
          {sidebarLinks.map(({ label, route, imgURL }) => {
            const isActive = pathname === route;
            return (
              <NavLink
                to={route}
                key={label}
                className={`flex gap-2 py-3 items-center leftsidebar-link group ${
                  isActive && "text-orange-600"
                }`}
              >
                <img className="w-5 h-auto" src={imgURL} alt={label} />
                <li>{label}</li>
              </NavLink>
            );
          })}
        </ul>
      </nav>
    );
  }
};

export default LeftSideBar;
