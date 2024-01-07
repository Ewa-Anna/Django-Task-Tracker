import Header from "../components/header/Header";
import { Menu } from "../components/menu/Menu";
import "./layout.css";

interface Props{
  children:React.ReactNode;
}

const Layout = ({ children }:Props) => {
  return (
    <div className="layout">
      <div className="layout-sidebar"></div>
<Menu/>
      <div className="layout-main">
        <Header />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
