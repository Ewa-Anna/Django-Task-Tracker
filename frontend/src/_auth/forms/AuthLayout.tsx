import { Outlet, Navigate,useLocation  } from "react-router-dom";

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isAuthenticated = false;

 
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <img src={`${pathname==="/sign-in"?"/assets/images/signin-img_4.jpg":"/assets/images/signup-img_4.jpg"}`} alt="logo"
          className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" />
        </>
      )}
    </>
  );
};

export default AuthLayout;
