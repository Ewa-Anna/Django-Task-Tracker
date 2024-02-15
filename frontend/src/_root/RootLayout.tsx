import Bottombar from "@/components/ui/shared/Bottombar";
import LeftSidebar from "@/components/ui/shared/LeftSidebar";
import MobileLeftSidebar from "@/components/ui/shared/MobileLeftSidebar";
import Topbar from "@/components/ui/shared/Topbar";
import { Outlet } from "react-router-dom";



const RootLayout = () => {
  return (
    <div className="w-full md:flex flex-col ">
      <Topbar />
     

      <section className="flex flex-1 h-full ">
        <MobileLeftSidebar/>
      <LeftSidebar />
        <Outlet />
      </section>

      {/* <Bottombar /> */}
    </div>
  );
};

export default RootLayout;