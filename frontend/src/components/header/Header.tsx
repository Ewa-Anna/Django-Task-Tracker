import { BiSearchAlt } from "react-icons/bi";
import { FaBell, FaChevronDown } from "react-icons/fa";
import userAvatar from "../../img/women.jpg";
import { useEffect } from "react";
import { User } from "../../dummyData";
import "./header.css";

const Header = () => {
  useEffect(() => {
    const menuTarget = document.getElementById("menuChevron");
    const menuContainer = document.getElementById("menuContainer");

    menuTarget?.addEventListener("mouseenter", () => {
      menuTarget.style.transform = "rotate(180deg)";
      menuContainer.style.transform = "translateX(0px)";
    });
    menuContainer &&
      menuContainer.addEventListener("mouseleave", () => {
        menuTarget.style.transform = "rotate(0deg)";
        menuContainer.style.transform = "translateX(300px)";
      });
  }, []);

  return (
    <div className="header">
      <div className="inputBox">
        <input type="text" placeholder="Search item, collections" />
        <i>
          <BiSearchAlt />
        </i>
      </div>
      <div className="profileContainer">
        <i className="profileIcon">
          <FaBell />
        </i>
        <div className="profileImage">
          <img src={User.userAvatar} alt="" />
        </div>

        <p className="profileName">{`${User.firstName} ${User.lastName}`}</p>
        <i className="menuChevron" id="menuChevron">
          <FaChevronDown />
        </i>
        <div className="menuContainer" id="menuContainer">
          <ul>
            <li>History</li>
            <li>Help</li>
            <li>Account</li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
