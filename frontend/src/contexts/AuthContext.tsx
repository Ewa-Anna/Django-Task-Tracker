import Toast from "@/components/ui/shared/Toast";
import clientApi from "@/features/axios/axios";
import { authReducer } from "@/reducers/authReducer";
import React, { useEffect, useReducer, useState } from "react";
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
  const navigate=useNavigate()
  const [state,dispatch]=useReducer(authReducer,{user:null})
  const checkUserToken = () => {
    const userToken = localStorage.getItem("token");

    if (userToken) {
      dispatch({ type: "LOGIN", payload: { userToken} });
    }
else if(!userToken|| userToken==="null"|| userToken==="undefined"){
  dispatch({type:"LOGOUT",payload:{user:null}})
  navigate("/sign-in")
}

 
  };

  useEffect(() => {
    checkUserToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  return (
    <AuthContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        ...state,dispatch
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
