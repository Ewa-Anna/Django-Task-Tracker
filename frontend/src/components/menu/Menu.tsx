import "./menu.css";

import Icon from "../icon/Icon";
import {
  FaDelicious,
  FaShoppingCart,
  FaWallet,
  FaChartLine,
  FaRegClock,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useEffect } from "react";

export function Menu() {
  useEffect(() => {
    const mainMenuLi = document
      .getElementById("mainMenu")
      .querySelectorAll("li");

function changeActive(){
mainMenuLi.forEach((el)=>el.classList.remove('active'))
this.classList.add('active')
}

    mainMenuLi.forEach((el)=>{
      el.addEventListener("click",changeActive)
    })
  }, []);
  return (
    <menu>
      <img src='' alt="" />
      <ul id="mainMenu">
        <Icon icon={<FaDelicious />} />
        <Icon icon={<FaShoppingCart />} />
        <Icon icon={<FaWallet />} />
        <Icon icon={<FaChartLine />} />
        <Icon icon={<FaRegClock />} />
      </ul>
      <ul className="lastMenu">
        <Icon icon={<FaCog />} />
        <Icon icon={<FaSignOutAlt />} />
      </ul>
    </menu>
  );
}

 
