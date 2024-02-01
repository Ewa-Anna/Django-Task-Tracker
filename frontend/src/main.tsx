import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import { QueryProvider } from "./lib/react-query/QueryProvider.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <BrowserRouter>
    <AuthContextProvider>
    <QueryProvider>
      
    <App />
 
    </QueryProvider>
    </AuthContextProvider>
    </BrowserRouter>

  </React.StrictMode>
);
