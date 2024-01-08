import { Outlet, Navigate } from "react-router-dom";



const PrivateRoutes= ({user}) => {
  return (
    <main>
      {user ? <Outlet /> : <Navigate to="/sign-in" replace/>}
    </main>
  );
};

export default PrivateRoutes;
