import Toast from "@/components/ui/shared/Toast";
import clientApi from "@/features/axios/axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AuthContext = {
  showToast: (toastMessage: ToastMessage) => void;
};

const AuthContext = React.createContext<AuthContext | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user,setUser]=useState({})
  const navigate = useNavigate();
  // const {isError}=useQuery("validateToken",clientApi)

  useEffect(() => {
    const notSignedIn = localStorage.getItem("token") === null;

    if (notSignedIn) {
      setIsAuthenticated(false)
      navigate("/sign-in");
    }

    else{
      setIsAuthenticated(true)
      navigate('/')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isAuthenticated,
        user,
        asignUser:(loggedUser)=>{
          setUser(loggedUser)
        }
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context as AuthContext;
};
