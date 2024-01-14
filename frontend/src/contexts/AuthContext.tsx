import Toast from "@/components/ui/shared/Toast";
import React, { useState } from "react";
import { useContext } from "react";

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

  return (
    <AuthContext.Provider
      value={{
        showToast: (toastMessage) => {
         setToast(toastMessage)
        },
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
