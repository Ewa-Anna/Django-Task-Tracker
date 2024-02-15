import { sidebarLinks } from "@/constants";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { INavLink } from "types";
import { Button } from "../button";
import { LuScroll } from "react-icons/lu";
import { useAuthContext } from "@/contexts/AuthContext";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  // const user = {
  //   id: 1,
  //   name: "Adam",
  //   role: "Admin",
  //   imageUrl: "",
  // };

const navigate = useNavigate()
  const {dispatch,user}= useAuthContext()

const logout = ()=>{
  localStorage.removeItem("token");
  dispatch({type:"LOGOUT",payload:null})
  navigate("/sign-in")
}


  return (
    <nav className="mobile_leftsidebar">
      <div className="flex flex-col gap-11">

 
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                  width={28}
                  height={28}
                    src={link.imgURL}
                    alt="link-label"
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                 
             
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => logout()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        
      </Button>
     x
    </nav>
  );
};

export default LeftSidebar;
