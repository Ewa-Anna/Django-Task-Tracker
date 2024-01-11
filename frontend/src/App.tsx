import { Routes, Route, Navigate } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import { Home } from "./_root/pages";
import AuthLayout from "./_auth/forms/AuthLayout";
import RootLayout from "./_root/RootLayout"
import SignupForm from "./_auth/forms/SignupForm";
import { Toaster } from "./components/ui/toaster";

function App() {
  return(

    <main className="flex h-screen">

<Routes>
  {/* public routes */}

<Route element={<AuthLayout/>}>
<Route  path="/sign-in" element={<SigninForm/>}/>
<Route  path="/sign-up" element={<SignupForm/>}/>
</Route>



  {/* private routes */}
  <Route element={<RootLayout/>}>
  <Route index  element={<Home/>}/>
  </Route>

</Routes>
<Toaster/>
    </main>
  ) 
}

export default App;
